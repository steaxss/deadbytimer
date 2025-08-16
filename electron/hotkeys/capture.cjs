// electron/hotkeys/capture.cjs
// Gère la capture transactionnelle (IPC), le stockage labels/codes, le fallback globalShortcut.

let ipcMain,
  store,
  globalShortcut,
  dialog,
  shell,
  VC_REDIST_X64_URL,
  hasVCRedist,
  logHK,
  getMainWindow,
  getOverlayWindow,
  getUsingUiohook,
  setUsingUiohook,
  getHotkeys,
  setHotkeys,
  getHotkeysLabel,
  setHotkeysLabel,
  getMouseBinds,
  setMouseBinds,
  makeLabelFromBeforeInput,
  isAlphaNumLabel,
  sendHotkeysMode,
  dispatchHotkey,
  onGamepadRaw,
  setGamepadMapping,
  clearGamepadMapping; // 👈 nouveau

let captureState = null; // { type, label, code, primaryTimer, secondaryTimer }
let captureWaitUntil = 0; // block timers dispatch during capture
let offGamepadRaw = null; // ✅ NO SHADOWING BUG

function initCapture(ctx) {
  ({
    ipcMain,
    store,
    globalShortcut,
    dialog,
    shell,
    VC_REDIST_X64_URL,
    hasVCRedist,
    logHK,
    getMainWindow,
    getOverlayWindow,
    getUsingUiohook,
    setUsingUiohook,
    getHotkeys,
    setHotkeys,
    getHotkeysLabel,
    setHotkeysLabel,
    getMouseBinds,
    setMouseBinds,
    makeLabelFromBeforeInput,
    isAlphaNumLabel,
    sendHotkeysMode,
    dispatchHotkey,
    onGamepadRaw,
    setGamepadMapping,
    clearGamepadMapping, // 👈 récupéré
  } = ctx);
}

// Helpers label
function isMouseLabel(label) {
  return (
    typeof label === "string" && /^(MOUSE\d+|WHEEL_(UP|DOWN))$/i.test(label)
  );
}
function isKeyboardLabel(label) {
  // F-keys, lettres/chiffres, et quelques noms courants
  if (typeof label !== "string") return false;
  if (/^F([1-9]|1[0-9]|2[0-4])$/i.test(label)) return true;
  if (/^[A-Z0-9]$/.test(label)) return true;
  return /^(ESC|TAB|ENTER|BACKSPACE|SHIFT|CTRL|ALT|SPACE|UP|DOWN|LEFT|RIGHT)$/i.test(
    label
  );
}
function isGamepadLabel(label) {
  // tout ce qui n'est ni clavier ni souris est considéré manette (ex: "BTN A", "BTN X", "DPAD UP"…)
  return typeof label === "string" && !isKeyboardLabel(label) && !isMouseLabel(label);
}

function isCapturing() {
  return !!captureState;
}
function getCaptureBlockUntil() {
  return captureWaitUntil;
}

// --- Hooks appelés par uIOhook pendant capture ---
function onKeyboardCode(code) {
  if (!captureState) return;
  captureState.code = code;
  if (captureState.label) finalizeCapture("have both");
  else {
    if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
    captureState.secondaryTimer = setTimeout(
      () => finalizeCapture("after-code-wait"),
      600
    );
  }
}

function onMouseLabel(label) {
  if (!captureState) return;
  const { type } = captureState;
  captureState.label = label;
  const labels = { ...getHotkeysLabel(), [type]: label };
  setHotkeysLabel(labels);

  // persist binds souris (au runtime)
  const binds = { ...getMouseBinds(), [type]: label };
  setMouseBinds(binds);

  const mw = getMainWindow();
  mw?.webContents.send("hotkeys-captured", { type, label });

  finalizeCapture("mouse");
}

// --- helpers capture ---
function clearCaptureTimers() {
  if (!captureState) return;
  if (captureState.primaryTimer) {
    clearTimeout(captureState.primaryTimer);
    captureState.primaryTimer = null;
  }
  if (captureState.secondaryTimer) {
    clearTimeout(captureState.secondaryTimer);
    captureState.secondaryTimer = null;
  }
}

function finalizeCapture(reason = "done") {
  if (!captureState) return;

  // unbind manette raw
  if (offGamepadRaw) {
    try {
      offGamepadRaw();
    } catch {}
    offGamepadRaw = null;
  }

  const { type, label, code } = captureState;
  clearCaptureTimers();

  logHK && logHK("CAPTURE FINALIZE", { reason, type, label, code });

  // Persistance si on a reçu des infos
  if (label) {
    const labels = { ...getHotkeysLabel(), [type]: label };
    setHotkeysLabel(labels);
  }
  if (typeof code === "number") {
    const codes = { ...getHotkeys(), [type]: code };
    setHotkeys(codes);
  }

  // 🔒 Exclusivité par action (start/swap)
  if (label && isKeyboardLabel(label)) {
    // Si on a capturé un clavier : 1) vider bind souris, 2) vider mapping manette
    const mb = { ...getMouseBinds() };
    if (mb[type]) {
      mb[type] = null;
      setMouseBinds(mb);
      logHK && logHK("Cleared previous MOUSE bind for", type);
    }
    clearGamepadMapping && clearGamepadMapping(type);
    logHK && logHK("Cleared GAMEPAD mapping for", type);
  }
  if (label && isMouseLabel(label)) {
    // Si on a capturé une souris : 1) vider code clavier, 2) vider mapping manette
    const codes = { ...getHotkeys() };
    if (codes[type] != null) {
      codes[type] = null;
      setHotkeys(codes);
      logHK && logHK("Cleared previous KEYBOARD code for", type);
    }
    clearGamepadMapping && clearGamepadMapping(type);
    logHK && logHK("Cleared GAMEPAD mapping for", type);
  }
  if (label && isGamepadLabel(label)) {
    // Si on a capturé une manette : 1) vider code clavier, 2) vider bind souris
    const codes = { ...getHotkeys() };
    if (codes[type] != null) {
      codes[type] = null;
      setHotkeys(codes);
      logHK && logHK("Cleared previous KEYBOARD code for", type);
    }
    const mb = { ...getMouseBinds() };
    if (mb[type]) {
      mb[type] = null;
      setMouseBinds(mb);
      logHK && logHK("Cleared previous MOUSE bind for", type);
    }
  }

  // Notifier le panel si on a label ou code
  const mw = getMainWindow();
  if (mw && !mw.isDestroyed() && (label || typeof code === "number")) {
    const payload = { type };
    if (label) payload.label = label;
    if (typeof code === "number") payload.keycode = code;
    mw.webContents.send("hotkeys-captured", payload);
  }

  // Alerte uniquement si VC++ manquant ET alphanum tenté sans uIOhook
  if (!getUsingUiohook() && label && isAlphaNumLabel(label) && !hasVCRedist()) {
    dialog
      .showMessageBox({
        type: "info",
        title: "Pass-Through unavailable",
        message:
          "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
        detail:
          "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, " +
          "then recapture your hotkeys to enable pass-through (so you can still type those letters in Discord, etc.).",
        buttons: ["Install runtime (x64)", "OK"],
        defaultId: 0,
        cancelId: 1,
        noLink: true,
      })
      .then(({ response }) => {
        if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
      });
  }

  // Si, après cette capture, on a les 2 codes et uIOhook tourne -> passer en pass-through
  const codes = getHotkeys();
  const haveBoth = Number.isFinite(codes.start) && Number.isFinite(codes.swap);
  if (haveBoth && getUsingUiohook() === false) {
    setUsingUiohook(true);
    try {
      globalShortcut.unregisterAll();
    } catch {}
    sendHotkeysMode("pass-through");
  }

  // Reset capture
  captureState = null;
  captureWaitUntil = 0;

  // Réarmer fallback si nécessaire
  if (!getUsingUiohook()) {
    refreshHotkeyEngine({
      globalShortcut,
      hotkeysLabel: getHotkeysLabel(),
      isAlphaNumLabel,
      logHK,
      getCaptureBlockUntil,
      dispatchHotkey,
    });
  }
}

function setupCaptureIPC() {
  ipcMain.handle("hotkeys-capture", (_evt, type) => {
    if (!(type === "start" || type === "swap")) {
      finalizeCapture("cancel");
      return true;
    }

    logHK &&
      logHK("CAPTURE BEGIN", {
        type,
        mode: getUsingUiohook() ? "pass-through" : "fallback",
      });

    // Bloquer le dispatch vers les timers pendant la capture
    captureWaitUntil = Date.now() + 15000;

    // Reset/annule capture précédente si elle existe
    if (captureState) {
      clearCaptureTimers();
      captureState = null;
    }

    // État de capture : pas de timer court au début; on attend la première frappe
    captureState = {
      type,
      label: null,
      code: null,
      primaryTimer: setTimeout(() => {
        logHK && logHK("CAPTURE PRIMARY TIMEOUT — cancel");
        finalizeCapture("primary-timeout");
      }, 15000),
      secondaryTimer: null,
    };

    // focus le panneau
    try {
      const mw = getMainWindow();
      mw?.focus();
      logHK && logHK("focused mainWindow?", mw?.isFocused());
    } catch (e) {
      logHK && logHK("focus error", e?.message || e);
    }

    // en fallback, libérer les shortcuts pour laisser passer la frappe
    if (!getUsingUiohook()) {
      try {
        globalShortcut.unregisterAll();
        logHK && logHK("fallback: unregistered to let key through");
      } catch {}
    }

    // écouter une fois la prochaine touche (pour le label layout-aware)
    const mw = getMainWindow();
    const once = (event, input) => {
      if (!captureState) return;
      if (input.type !== "keyDown" || input.isAutoRepeat) return;
      logHK &&
        logHK("before-input-event keyDown", {
          key: input.key,
          code: input.code,
        });
      const label = makeLabelFromBeforeInput(input);

      captureState.label = label;
      const labels = { ...getHotkeysLabel(), [type]: label };
      setHotkeysLabel(labels);

      mw?.webContents.send("hotkeys-captured", { type, label });
      logHK && logHK("label captured (instant)", { type, label });

      if (typeof captureState.code === "number") {
        finalizeCapture("have both");
      } else {
        if (captureState.secondaryTimer)
          clearTimeout(captureState.secondaryTimer);
        captureState.secondaryTimer = setTimeout(
          () => finalizeCapture("after-label-wait"),
          500
        );
      }

      mw?.webContents.removeListener("before-input-event", once);
    };
    mw?.webContents.on("before-input-event", once);

    // Écoute RAW manette (✅ pas de shadowing : variable module-scope)
    offGamepadRaw = onGamepadRaw((evLabel) => {
      if (!captureState) return;
      const { type } = captureState;

      captureState.label = evLabel;
      const labels = { ...getHotkeysLabel(), [type]: evLabel };
      setHotkeysLabel(labels);
      mw?.webContents.send("hotkeys-captured", { type, label: evLabel });

      // mapping manette
      setGamepadMapping(type, evLabel, { append: false });

      finalizeCapture("gamepad");
    });

    logHK && logHK("before-input-event listener ARMED");

    return true;
  });
}

/* -------------------- Fallback engine (globalShortcut) -------------------- */
function refreshHotkeyEngine({
  globalShortcut,
  hotkeysLabel,
  isAlphaNumLabel,
  logHK,
  getCaptureBlockUntil,
  dispatchHotkey,
}) {
  try {
    globalShortcut.unregisterAll();
    logHK && logHK("globalShortcut: unregistered all");
  } catch {}

  const RATE = 180;
  let lastT = 0,
    lastS = 0;

  const sKey = hotkeysLabel.start || "F1";
  const wKey = hotkeysLabel.swap || "F2";

  // En fallback, on n'essaie de binder que des F-keys (F1..F24).
  const canUse = (label) => /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);

  logHK &&
    logHK("globalShortcut: registering (fallback)", {
      start: canUse(sKey) ? sKey : "(skipped: alnum passthrough-only)",
      swap: canUse(wKey) ? wKey : "(skipped: alnum passthrough-only)",
    });

  if (canUse(sKey)) {
    try {
      globalShortcut.register(sKey, () => {
        if (Date.now() < getCaptureBlockUntil()) {
          logHK && logHK("fallback toggle skipped (capturing)");
          return;
        }
        const now = Date.now();
        if (now - lastT < RATE) return;
        lastT = now;
        dispatchHotkey("toggle");
      });
    } catch (e) {
      logHK && logHK("register start failed", e?.message || e);
    }
  }

  if (canUse(wKey)) {
    try {
      globalShortcut.register(wKey, () => {
        if (Date.now() < getCaptureBlockUntil()) {
          logHK && logHK("fallback swap skipped (capturing)");
          return;
        }
        const now = Date.now();
        if (now - lastS < RATE) return;
        lastS = now;
        dispatchHotkey("swap");
      });
    } catch (e) {
      logHK && logHK("register swap failed", e?.message || e);
    }
  }
}

/* -------------------- API complémentaire -------------------- */
function attachWindowsAPI({ sendOverlaySettings }) {
  // optionnel: expose si besoin
  module.exports._sendOverlaySettings = sendOverlaySettings;
}

module.exports = {
  initCapture,
  setupCaptureIPC,
  refreshHotkeyEngine,
  isCapturing,
  getCaptureBlockUntil: getCaptureBlockUntil,
  onKeyboardCode,
  onMouseLabel,
  attachWindowsAPI,
};