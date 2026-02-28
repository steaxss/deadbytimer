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
  clearGamepadMapping; // conservé pour compat

let captureState = null; // { type: 'start'|'swap', source: 'any'|'desktop'|'gamepad', label, code, primaryTimer, secondaryTimer }
let captureWaitUntil = 0;
let offGamepadRaw = null;

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
    clearGamepadMapping,
  } = ctx);
}

// Helpers label
function isMouseLabel(label) {
  return typeof label === "string" && /^(MOUSE\d+|WHEEL_(UP|DOWN))$/i.test(label);
}
function isKeyboardLabel(label) {
  if (typeof label !== "string") return false;
  if (/^F([1-9]|1[0-9]|2[0-4])$/i.test(label)) return true;
  if (/^[A-Z0-9]$/.test(label)) return true;
  return /^(ESC|TAB|ENTER|BACKSPACE|SHIFT|CTRL|ALT|SPACE|UP|DOWN|LEFT|RIGHT)$/i.test(label);
}
function isGamepadLabel(label) {
  return typeof label === "string" && !isKeyboardLabel(label) && !isMouseLabel(label);
}

function isCapturing() { return !!captureState; }
function getCaptureBlockUntil() { return captureWaitUntil; }

// Hooks appelés par uIOhook pendant capture
function onKeyboardCode(code) {
  if (!captureState) return;
  if (captureState.source === "gamepad") return; // capture manette: ignorer clavier
  captureState.code = code;
  if (captureState.label) finalizeCapture("have both");
  else {
    if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
    captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-code-wait"), 600);
  }
}

function onMouseLabel(label) {
  if (!captureState) return;
  if (captureState.source === "gamepad") return; // capture manette: ignorer souris

  const { type } = captureState;
  captureState.label = label;

  // Desktop = maj labels + binds souris
  const labels = { ...getHotkeysLabel(), [type]: label };
  setHotkeysLabel(labels);
  const binds = { ...getMouseBinds(), [type]: label };
  setMouseBinds(binds);

  const mw = getMainWindow();
  mw?.webContents.send("hotkeys-captured", { type, label, source: "desktop" });

  finalizeCapture("mouse");
}

// helpers capture
function clearCaptureTimers() {
  if (!captureState) return;
  if (captureState.primaryTimer) { clearTimeout(captureState.primaryTimer); captureState.primaryTimer = null; }
  if (captureState.secondaryTimer) { clearTimeout(captureState.secondaryTimer); captureState.secondaryTimer = null; }
}

// Exclusivité “desktop” : clavier OU souris (manette coexiste)
function enforceDesktopExclusivityAfter(label, code, type) {
  const isKb = isKeyboardLabel(label) || typeof code === "number";
  const isMs = isMouseLabel(label);

  if (isKb) {
    const mb = { ...getMouseBinds() };
    if (mb[type]) { mb[type] = null; setMouseBinds(mb); logHK && logHK("Desktop exclusivity: cleared MOUSE for", type); }
  } else if (isMs) {
    const hk = { ...getHotkeys() };
    if (hk[type] != null) { hk[type] = null; setHotkeys(hk); logHK && logHK("Desktop exclusivity: cleared KEYCODE for", type); }
  }
}

function finalizeCapture(reason = "done") {
  if (!captureState) return;

  if (offGamepadRaw) { try { offGamepadRaw(); } catch {} offGamepadRaw = null; }

  const { type, source, label, code } = captureState;
  clearCaptureTimers();
  logHK && logHK("CAPTURE FINALIZE", { reason, type, source, label, code });

  // Persistance : seulement pour “desktop” on écrit dans hotkeys/hotkeysLabel
  if (source !== "gamepad") {
    if (label) {
      const labels = { ...getHotkeysLabel(), [type]: label };
      setHotkeysLabel(labels);
    }
    if (typeof code === "number") {
      const codes = { ...getHotkeys(), [type]: code };
      setHotkeys(codes);
    }
    if (label || typeof code === "number") {
      enforceDesktopExclusivityAfter(label, code, type);
      // si on n’a reçu qu’un label clavier (pas de code), retirer tout ancien code stale
      if (label && isKeyboardLabel(label) && typeof code !== "number") {
        const hk = { ...getHotkeys() };
        if (hk[type] != null) { hk[type] = null; setHotkeys(hk); logHK && logHK("Cleared stale KEYCODE (keyboard label only)", type); }
      }
    }
  }

  // Notifier panel (avec source)
  const mw = getMainWindow();
  if (mw && !mw.isDestroyed() && (label || typeof code === "number")) {
    const payload = { type, source: source === "gamepad" ? "gamepad" : "desktop" };
    if (label) payload.label = label;
    if (typeof code === "number") payload.keycode = code;
    mw.webContents.send("hotkeys-captured", payload);
  }

  // Alerte VC++ (desktop uniquement)
  if (source !== "gamepad" && !getUsingUiohook() && label && isAlphaNumLabel(label) && !hasVCRedist()) {
    dialog.showMessageBox({
      type: "info",
      title: "Pass-Through unavailable",
      message: "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
      detail: "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, then recapture your hotkeys.",
      buttons: ["Install runtime (x64)", "OK"],
      defaultId: 0, cancelId: 1, noLink: true,
    }).then(({ response }) => { if (response === 0) shell.openExternal(VC_REDIST_X64_URL); });
  }

  // Pass-through si 2 codes capturés (desktop)
  const codes = getHotkeys();
  const haveBoth = Number.isFinite(codes.start) && Number.isFinite(codes.swap);
  if (haveBoth && getUsingUiohook() === false) {
    setUsingUiohook(true);
    try { globalShortcut.unregisterAll(); } catch {}
    sendHotkeysMode("pass-through");
  }

  // Reset
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

function parseCaptureArgs(arg1, arg2) {
  if (typeof arg1 === "object" && arg1) return { type: arg1.type, source: arg1.source || "any" };
  return { type: arg1, source: arg2 || "any" };
}

function setupCaptureIPC() {
  ipcMain.handle("hotkeys-capture", (_evt, arg1, arg2) => {
    const { type, source } = parseCaptureArgs(arg1, arg2);
    if (!(type === "start" || type === "swap")) { finalizeCapture("cancel"); return true; }

    logHK && logHK("CAPTURE BEGIN", { type, source, mode: getUsingUiohook() ? "pass-through" : "fallback" });

    captureWaitUntil = Date.now() + 15000;
    if (captureState) { clearCaptureTimers(); captureState = null; }

    const captureId = Date.now() + Math.random();

    captureState = {
      type,
      source: source || "any",
      label: null,
      code: null,
      captureId,
      primaryTimer: setTimeout(() => { logHK && logHK("CAPTURE PRIMARY TIMEOUT — cancel"); finalizeCapture("primary-timeout"); }, 15000),
      secondaryTimer: null,
    };

    try { const mw = getMainWindow(); mw?.focus(); } catch {}

    if (!getUsingUiohook()) { try { globalShortcut.unregisterAll(); } catch {} }

    const mw = getMainWindow();
    const once = (event, input) => {
      if (!captureState || captureState.captureId !== captureId) {
        mw?.webContents.removeListener("before-input-event", once);
        return;
      }
      if (captureState.source === "gamepad") return; // capture gamepad: ignorer clavier
      if (input.type !== "keyDown" || input.isAutoRepeat) return;

      const label = makeLabelFromBeforeInput(input);

      captureState.label = label;
      const labels = { ...getHotkeysLabel(), [type]: label };
      setHotkeysLabel(labels);

      mw?.webContents.send("hotkeys-captured", { type, label, source: "desktop" });
      logHK && logHK("label captured (instant)", { type, label });

      if (typeof captureState.code === "number") finalizeCapture("have both");
      else {
        if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
        captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-label-wait"), 500);
      }

      mw?.webContents.removeListener("before-input-event", once);
    };
    mw?.webContents.on("before-input-event", once);

    // RAW manette → uniquement mapping + event source: 'gamepad'
    offGamepadRaw = onGamepadRaw((evLabel) => {
      if (!captureState) return;
      if (captureState.source === "desktop") return; // capture desktop: ignorer manette
      const { type } = captureState;

      captureState.label = evLabel; // pour la fin de capture; on NE stockera pas dans hotkeysLabel
      mw?.webContents.send("hotkeys-captured", { type, label: evLabel, source: "gamepad" });

      setGamepadMapping(type, evLabel, { append: false }); // remplace
      finalizeCapture("gamepad");
    });

    return true;
  });

  // ✅ Annulation explicite (clic utilisateur)
  ipcMain.handle("hotkeys-capture-cancel", () => {
    if (!captureState) return true;
    logHK && logHK("CAPTURE CANCELLED BY USER");
    finalizeCapture("cancel-by-user");
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
  try { globalShortcut.unregisterAll(); } catch {}
  const RATE = 180;
  let lastT = 0, lastS = 0;

  const sKey = hotkeysLabel.start || "F1";
  const wKey = hotkeysLabel.swap || "F2";
  const canUse = (label) => /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);

  if (canUse(sKey)) {
    try {
      globalShortcut.register(sKey, () => {
        if (Date.now() < getCaptureBlockUntil()) return;
        const now = Date.now();
        if (now - lastT < RATE) return;
        lastT = now;
        dispatchHotkey("toggle");
      });
    } catch {}
  }
  if (canUse(wKey)) {
    try {
      globalShortcut.register(wKey, () => {
        if (Date.now() < getCaptureBlockUntil()) return;
        const now = Date.now();
        if (now - lastS < RATE) return;
        lastS = now;
        dispatchHotkey("swap");
      });
    } catch {}
  }
}

/* -------------------- API complémentaire -------------------- */
function attachWindowsAPI({ sendOverlaySettings }) {
  module.exports._sendOverlaySettings = sendOverlaySettings;
}

module.exports = {
  initCapture,
  setupCaptureIPC,
  refreshHotkeyEngine,
  isCapturing,
  getCaptureBlockUntil,
  onKeyboardCode,
  onMouseLabel,
  attachWindowsAPI,
};