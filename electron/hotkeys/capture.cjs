// electron/hotkeys/capture.cjs
// Gère la capture transactionnelle (IPC), le stockage labels/codes, le fallback globalShortcut.

const log = require("electron-log");
const { describeBinding } = require("./binding.cjs");
/** @typedef {"start" | "reset" | "swap"} CaptureAction */
/** @typedef {"any" | "desktop" | "gamepad"} CaptureSource */
/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */
/** @typedef {number | HotkeyChord} HotkeyBinding */
/** @typedef {Record<CaptureAction, HotkeyBinding | null>} HotkeyCodes */
/** @typedef {Record<CaptureAction, string | null>} HotkeyLabels */
/** @typedef {{ type: CaptureAction, source: CaptureSource, label: string | null, code: HotkeyBinding | null, captureId: number, primaryTimer: ReturnType<typeof setTimeout> | null, secondaryTimer: ReturnType<typeof setTimeout> | null, beforeInputListener?: ((event: Electron.Event, input: Electron.Input) => void) | null }} CaptureState */
/** @typedef {{ ipcMain: typeof import("electron").ipcMain, globalShortcut: typeof import("electron").globalShortcut, dialog: typeof import("electron").dialog, shell: typeof import("electron").shell, VC_REDIST_X64_URL: string, hasVCRedist: () => boolean, logHK: (message: string, details?: unknown) => void, getMainWindow: () => Electron.BrowserWindow | null, getUsingUiohook: () => boolean, getHotkeys: () => HotkeyCodes, setHotkeys: (codes: HotkeyCodes) => void, getHotkeysLabel: () => HotkeyLabels, setHotkeysLabel: (labels: HotkeyLabels) => void, getMouseBinds: () => HotkeyLabels, setMouseBinds: (labels: HotkeyLabels) => void, makeChordLabelFromBeforeInput: (input: Electron.Input) => string, isAlphaNumLabel: (label: unknown) => boolean, refreshInputRuntime: () => void, enableUiohookCapture: () => void, disableUiohookCapture: () => void, onGamepadRaw: (callback: (label: string) => void) => () => void, setGamepadMapping: (action: CaptureAction, label: string, options: { append: boolean }) => void }} CaptureContext */
const VERBOSE_LOGS =
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_HK === "1" ||
  process.env.DEBUG_LOGS === "1";

/** @type {typeof import("electron").ipcMain} */ let ipcMain;
/** @type {typeof import("electron").globalShortcut} */ let globalShortcut;
/** @type {typeof import("electron").dialog} */ let dialog;
/** @type {typeof import("electron").shell} */ let shell;
/** @type {string} */ let VC_REDIST_X64_URL;
/** @type {() => boolean} */ let hasVCRedist;
/** @type {(message: string, details?: unknown) => void} */ let logHK;
/** @type {() => Electron.BrowserWindow | null} */ let getMainWindow;
/** @type {() => boolean} */ let getUsingUiohook;
/** @type {() => HotkeyCodes} */ let getHotkeys;
/** @type {(codes: HotkeyCodes) => void} */ let setHotkeys;
/** @type {() => HotkeyLabels} */ let getHotkeysLabel;
/** @type {(labels: HotkeyLabels) => void} */ let setHotkeysLabel;
/** @type {() => HotkeyLabels} */ let getMouseBinds;
/** @type {(labels: HotkeyLabels) => void} */ let setMouseBinds;
/** @type {(input: Electron.Input) => string} */ let makeChordLabelFromBeforeInput;
/** @type {(label: unknown) => boolean} */ let isAlphaNumLabel;
/** @type {() => void} */ let refreshInputRuntime;
/** @type {() => void} */ let enableUiohookCapture;
/** @type {() => void} */ let disableUiohookCapture;
/** @type {(callback: (label: string) => void) => () => void} */ let onGamepadRaw;
/** @type {(action: CaptureAction, label: string, options: { append: boolean }) => void} */ let setGamepadMapping;

/** @type {CaptureState | null} */
let captureState = null; // { type: 'start'|'swap', source: 'any'|'desktop'|'gamepad', label, code, primaryTimer, secondaryTimer }
let captureWaitUntil = 0;
/** @type {(() => void) | null} */
let offGamepadRaw = null;

/** @param {CaptureContext} ctx */
function initCapture(ctx) {
  ({
    ipcMain,
    globalShortcut,
    dialog,
    shell,
    VC_REDIST_X64_URL,
    hasVCRedist,
    logHK,
    getMainWindow,
    getUsingUiohook,
    getHotkeys,
    setHotkeys,
    getHotkeysLabel,
    setHotkeysLabel,
    getMouseBinds,
    setMouseBinds,
    makeChordLabelFromBeforeInput,
    isAlphaNumLabel,
    refreshInputRuntime,
    enableUiohookCapture,
    disableUiohookCapture,
    onGamepadRaw,
    setGamepadMapping,
  } = ctx);
}

// Helpers label
/** @param {unknown} label */
function isMouseLabel(label) {
  return typeof label === "string" && /^(MOUSE\d+|WHEEL_(UP|DOWN))$/i.test(label);
}
/** @param {unknown} label */
function isKeyboardLabel(label) {
  if (typeof label !== "string") return false;
  if (label.includes("+")) {
    const parts = label.toUpperCase().split("+");
    const modifiers = new Set(["CTRL", "ALT", "SHIFT", "META"]);
    const terminal = parts.at(-1) || "";
    const terminalIsKey = /^[A-Z0-9]$|^F(?:[1-9]|1[0-9]|2[0-4])$|^(?:ESC|TAB|ENTER|BACKSPACE|SPACE|UP|DOWN|LEFT|RIGHT)$/.test(terminal);
    return parts.length >= 2
      && parts.slice(0, -1).every((part) => modifiers.has(part))
      && (modifiers.has(terminal) || terminalIsKey)
      && new Set(parts).size === parts.length;
  }
  if (/^F([1-9]|1[0-9]|2[0-4])$/i.test(label)) return true;
  if (/^[A-Z0-9]$/.test(label)) return true;
  return /^(ESC|TAB|ENTER|BACKSPACE|SHIFT|CTRL|ALT|SPACE|UP|DOWN|LEFT|RIGHT)$/i.test(label);
}
function isCapturing() { return !!captureState; }
function getCaptureBlockUntil() { return captureWaitUntil; }

// Hooks appelés par uIOhook pendant capture
/** @param {HotkeyBinding} code */
function onKeyboardCode(code) {
  if (!captureState) return;
  if (captureState.source === "gamepad") return; // capture manette: ignorer clavier
  captureState.code = code;
  if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
  captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-code-wait"), 650);
}

/** @param {string} label */
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

function clearBeforeInputListener(state = captureState) {
  const listener = state?.beforeInputListener;
  const mw = getMainWindow();
  if (!listener || !mw?.webContents) return;
  try {
    mw.webContents.removeListener("before-input-event", listener);
  } catch (error) {
    logHK?.("Failed to remove before-input listener", error);
  }
  if (state) state.beforeInputListener = null;
}

// Exclusivité “desktop” : clavier OU souris (manette coexiste)
/** @param {string | null} label @param {HotkeyBinding | null} code @param {CaptureAction} type */
function enforceDesktopExclusivityAfter(label, code, type) {
  const isKb = isKeyboardLabel(label) || code !== null;
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

  const currentCapture = captureState;
  if (offGamepadRaw) {
    try { offGamepadRaw(); } catch (error) {
      logHK?.("Failed to unsubscribe gamepad capture", error);
    }
    offGamepadRaw = null;
  }

  const { type, source, label, code } = currentCapture;
  clearCaptureTimers();
  clearBeforeInputListener(currentCapture);
  logHK && logHK("CAPTURE FINALIZE", { reason, type, source, label, code });
  // Log permanent (même sans DEBUG_HK)
  if (reason !== "cancel" && reason !== "cancel-by-user" && reason !== "primary-timeout") {
    const codeStr = describeBinding(code);
    const labelStr  = label ?? "no-label";
    if (VERBOSE_LOGS) {
      log.info(`[HOTKEY] Captured — action: ${type} | source: ${source} | label: "${labelStr}" | ${codeStr}`);
    }
  } else {
    if (VERBOSE_LOGS) {
      log.info(`[HOTKEY] Capture cancelled — action: ${type} | reason: ${reason}`);
    }
  }

  // Persistance : seulement pour “desktop” on écrit dans hotkeys/hotkeysLabel
  if (source !== "gamepad") {
    const persistedCode = code;

    if (label) {
      const labels = { ...getHotkeysLabel(), [type]: label };
      setHotkeysLabel(labels);
    }
    if (persistedCode !== null) {
      const codes = { ...getHotkeys(), [type]: persistedCode };
      setHotkeys(codes);
    }
    if (label || persistedCode !== null) {
      enforceDesktopExclusivityAfter(label, persistedCode, type);
      // si on n’a reçu qu’un label clavier (pas de code), retirer tout ancien code stale
      if (label && isKeyboardLabel(label) && persistedCode === null) {
        const hk = { ...getHotkeys() };
        if (hk[type] != null) { hk[type] = null; setHotkeys(hk); logHK && logHK("Cleared stale KEYCODE (keyboard label only)", type); }
      }
    }
  }

  // Notifier panel (avec source)
  const mw = getMainWindow();
  if (mw && !mw.isDestroyed() && (label || code !== null)) {
    /** @type {{ type: CaptureAction, source: "desktop" | "gamepad", label?: string, keycode?: number }} */
    const payload = { type, source: source === "gamepad" ? "gamepad" : "desktop" };
    if (label) payload.label = label;
    if (typeof code === "number") payload.keycode = code;
    else if (code?.keycode !== null && code?.keycode !== undefined) payload.keycode = code.keycode;
    mw.webContents.send("hotkeys-captured", payload);
  }

  // Alerte VC++ (desktop uniquement)
  if (source !== "gamepad" && label && isAlphaNumLabel(label) && typeof code !== "number" && !hasVCRedist()) {
    dialog.showMessageBox({
      type: "info",
      title: "Pass-Through unavailable",
      message: "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
      detail: "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, then recapture your hotkeys.",
      buttons: ["Install runtime (x64)", "OK"],
      defaultId: 0, cancelId: 1, noLink: true,
    }).then(({ response }) => { if (response === 0) shell.openExternal(VC_REDIST_X64_URL); });
  }

  // Reset
  captureState = null;
  captureWaitUntil = 0;
  disableUiohookCapture?.();
  refreshInputRuntime?.();
}

/** @param {unknown} arg1 @param {unknown} arg2 */
function parseCaptureArgs(arg1, arg2) {
  if (typeof arg1 === "object" && arg1) {
    const value = /** @type {{ type?: unknown, source?: unknown }} */ (arg1);
    return { type: value.type, source: value.source };
  }
  return { type: arg1, source: arg2 };
}

/** @param {(event: Electron.IpcMainInvokeEvent) => void} assertSender */
function setupCaptureIPC(assertSender) {
  ipcMain.handle("hotkeys-capture", (event, arg1, arg2) => {
    assertSender(event);
    const parsed = parseCaptureArgs(arg1, arg2);
    const { type } = parsed;
    const source = parsed.source === "desktop" || parsed.source === "gamepad" ? parsed.source : "any";
    if (!(type === "start" || type === "reset" || type === "swap")) { finalizeCapture("cancel"); return true; }

    logHK && logHK("CAPTURE BEGIN", { type, source, mode: getUsingUiohook() ? "pass-through" : "fallback" });

    captureWaitUntil = performance.now() + 15000;
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

    try { const mw = getMainWindow(); mw?.focus(); } catch (error) {
      logHK?.("Failed to focus panel for hotkey capture", error);
    }

    try { globalShortcut.unregisterAll(); } catch (error) {
      logHK?.("Failed to unregister shortcuts for capture", error);
    }
    if (source !== "gamepad") enableUiohookCapture?.();

    const mw = getMainWindow();
    /** @param {Electron.Event} event @param {Electron.Input} input */
    const once = (event, input) => {
      if (!captureState || captureState.captureId !== captureId) {
        mw?.webContents.removeListener("before-input-event", once);
        return;
      }
      if (captureState.source === "gamepad") return; // Gamepad: ignorer clavier
      if (input.type !== "keyDown" || input.isAutoRepeat) return;

      const label = makeChordLabelFromBeforeInput(input);

      captureState.label = label;
      logHK && logHK("capture candidate", { type, label });

      if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
      captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-label-wait"), 650);
    };
    if (source !== "gamepad") {
      captureState.beforeInputListener = once;
      mw?.webContents.on("before-input-event", once);
    }

    offGamepadRaw = onGamepadRaw((evLabel) => {
      if (!captureState) return;
      if (captureState.source === "desktop") return;
      const { type } = captureState;

      captureState.label = evLabel;
      mw?.webContents.send("hotkeys-captured", { type, label: evLabel, source: "gamepad" });

      if (type === "reset") return;
      setGamepadMapping(type, evLabel, { append: false });
      finalizeCapture("gamepad");
    });

    return true;
  });

  // Annulation explicite.
  ipcMain.handle("hotkeys-capture-cancel", (event) => {
    assertSender(event);
    if (!captureState) return true;
    logHK && logHK("CAPTURE CANCELLED BY USER");
    finalizeCapture("cancel-by-user");
    return true;
  });
}

/* -------------------- Fallback engine (globalShortcut) -------------------- */
/** @param {{ globalShortcut: typeof import("electron").globalShortcut, hotkeysLabel: HotkeyLabels, getCaptureBlockUntil: () => number, dispatchHotkey: (action: "toggle" | "reset" | "swap") => void }} engine */
function refreshHotkeyEngine({
  globalShortcut,
  hotkeysLabel,
  getCaptureBlockUntil,
  dispatchHotkey,
}) {
  try { globalShortcut.unregisterAll(); } catch (error) {
    logHK?.("Failed to reset global shortcuts", error);
  }
  const sKey = hotkeysLabel.start || "F1";
  const resetKey = hotkeysLabel.reset;
  const wKey = hotkeysLabel.swap || "F2";
  /** @param {string} label */
  const canUse = (label) => /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);

  if (canUse(sKey)) {
    try {
      globalShortcut.register(sKey, () => {
        if (performance.now() < getCaptureBlockUntil()) return;
        dispatchHotkey("toggle");
      });
    } catch (error) {
      logHK?.("Failed to register toggle shortcut", error);
    }
  }
  if (canUse(wKey)) {
    try {
      globalShortcut.register(wKey, () => {
        if (performance.now() < getCaptureBlockUntil()) return;
        dispatchHotkey("swap");
      });
    } catch (error) {
      logHK?.("Failed to register swap shortcut", error);
    }
  }
  if (resetKey && canUse(resetKey)) {
    try {
      globalShortcut.register(resetKey, () => {
        if (performance.now() < getCaptureBlockUntil()) return;
        dispatchHotkey("reset");
      });
    } catch (error) {
      logHK?.("Failed to register reset shortcut", error);
    }
  }
}

/* -------------------- API complémentaire -------------------- */
module.exports = {
  initCapture,
  setupCaptureIPC,
  refreshHotkeyEngine,
  isCapturing,
  getCaptureBlockUntil,
  onKeyboardCode,
  onMouseLabel,
};
