// electron/input/uiohook.cjs
// Charge uIOhook et gère clavier + souris (capture & runtime)

const log = require("electron-log");

let _uIOhook = null;
let _loaded = false;
let _handlers = null; // refs des handlers actifs pour pouvoir les retirer

let requireFn,
  FORCE_NO_UIOHOOK,
  hasVCRedist,
  dialog,
  shell,
  VC_REDIST_X64_URL,
  logHK,
  getOverlayWindow,
  dispatchHotkey,
  // capture API
  isCapturing,
  getCaptureBlockUntil,
  onCaptureKeyboardCode,
  onCaptureMouseLabel,
  // binds & codes
  getHotkeys,
  getMouseBinds,
  setUsingUiohook;

function setupUiohook(ctx) {
  ({
    require: requireFn,
    FORCE_NO_UIOHOOK,
    hasVCRedist,
    dialog,
    shell,
    VC_REDIST_X64_URL,
    logHK,
    getOverlayWindow,
    dispatchHotkey,
    isCapturing,
    getCaptureBlockUntil,
    onCaptureKeyboardCode,
    onCaptureMouseLabel,
    getHotkeys,
    getMouseBinds,
    setUsingUiohook,
  } = ctx);

  // essaie de charger uiohook immédiatement (mais ne démarre qu'avec start())
  try {
    if (FORCE_NO_UIOHOOK) throw new Error("uIOhook forcibly disabled via .env");
    const lib = requireFn("uiohook-napi");
    _uIOhook = lib.uIOhook;
    _loaded = true;
    logHK && logHK("uiohook loaded OK");
    log.info("[UIOHOOK] Loaded OK");
  } catch (e) {
    _uIOhook = null;
    _loaded = false;
    logHK && logHK("uiohook FAILED to load -> fallback", e?.message || e);
    log.warn(`[UIOHOOK] Failed to load — ${e?.message ?? e}`);
  }
}

function isLoaded() {
  return !!_loaded && !!_uIOhook;
}

// Retire tous les handlers actifs de l'instance uIOhook
function _removeHandlers() {
  if (!_uIOhook || !_handlers) return;
  try { _uIOhook.removeListener("keydown", _handlers.keydown); } catch {}
  try { _uIOhook.removeListener("mousedown", _handlers.mousedown); } catch {}
  try { _uIOhook.removeListener("wheel", _handlers.wheel); } catch {}
  _handlers = null;
}

function stop() {
  _removeHandlers();
  try {
    if (_uIOhook) _uIOhook.stop();
  } catch {}
}

function start() {
  if (!_uIOhook) {
    // Prompt éventuel si non chargé
    const vcPresent = hasVCRedist();
    (async () => {
      if (!vcPresent) {
        const { response } = await dialog.showMessageBox({
          type: "warning",
          title: "Pass-Through unavailable",
          message: "uIOhook couldn't start because the Microsoft C++ runtime is missing.",
          detail:
            `Install the \u201cMicrosoft Visual C++ Redistributable 2015\u20132022 (x64)\u201d. ` +
            "It provides the system libraries (MSVCP140 / VCRUNTIME140) required to listen to A\u2013Z / 0\u20139 without stealing them from other apps. " +
            "After installing, restart the app and recapture your hotkeys to enable pass-through.",
          buttons: ["Install runtime (x64)", "Continue in limited mode"],
          defaultId: 0,
          cancelId: 1,
          noLink: true,
        });
        if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
      } else {
        await dialog.showMessageBox({
          type: "warning",
          title: "Pass-Through unavailable",
          message: "uIOhook couldn't start even though the C++ runtime is present.",
          detail:
            "Possible causes: antivirus/anti-cheat blocking global hooks, architecture mismatch, native module not rebuilt, or asar not unpacked.\n\n" +
            "You can still use function keys (F1/F2) in limited mode. " +
            "To use A–Z / 0–9 with pass-through, ensure uIOhook loads successfully.",
          buttons: ["OK"],
          noLink: true,
        });
      }
      // fallback mode
      setUsingUiohook(false);
    })();
    return;
  }

  // Retirer les anciens handlers avant d'en ajouter de nouveaux (évite duplicates sur restart)
  _removeHandlers();

  // Handlers
  const RATE = 180;
  let lastToggle = 0,
    lastSwap = 0;

  const keydownHandler = (e) => {
    logHK &&
      logHK("uiohook keydown", {
        keycode: e.keycode,
        captureState: isCapturing(),
        now: Date.now(),
        blockUntil: getCaptureBlockUntil(),
      });

    // Capture: récupérer le keycode
    if (isCapturing()) {
      onCaptureKeyboardCode(e.keycode);
      return;
    }

    // Runtime: déclenchement si codes définis
    if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
    if (Date.now() < getCaptureBlockUntil()) return;

    const now = Date.now();
    const hk = getHotkeys();
    if (Number.isFinite(hk.start) && e.keycode === hk.start) {
      if (now - lastToggle < RATE) return;
      lastToggle = now;
      dispatchHotkey("toggle");
    } else if (Number.isFinite(hk.swap) && e.keycode === hk.swap) {
      if (now - lastSwap < RATE) return;
      lastSwap = now;
      dispatchHotkey("swap");
    }
  };

  // Souris
  let lastMouseToggle = 0,
    lastMouseSwap = 0;

  function mouseLabelFromEvent(e, kind) {
    if (kind === "wheel") {
      const rot =
        typeof e.rotation === "number"
          ? e.rotation
          : typeof e.amount === "number"
          ? e.amount
          : typeof e.deltaY === "number"
          ? e.deltaY
          : 0;
      return rot < 0 ? "WHEEL_UP" : "WHEEL_DOWN";
    }
    const b = e.button; // 1=left,2=right,3=middle,>=4 extra
    if (b === 1 || b === 2) return null; // exclure gauche/droit
    if (b === 3) return "MOUSE3";
    if (b >= 4) return `MOUSE${b}`;
    return null;
  }

  const mousedownHandler = (e) => {
    const label = mouseLabelFromEvent(e, "mousedown");
    if (!label) return;

    // Capture: on pousse le label
    if (isCapturing()) {
      onCaptureMouseLabel(label);
      return;
    }

    // Runtime
    if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
    if (Date.now() < getCaptureBlockUntil()) return;

    const now = Date.now();
    const mb = getMouseBinds();
    if (mb.start && label === mb.start) {
      if (now - lastMouseToggle < RATE) return;
      lastMouseToggle = now;
      dispatchHotkey("toggle");
    } else if (mb.swap && label === mb.swap) {
      if (now - lastMouseSwap < RATE) return;
      lastMouseSwap = now;
      dispatchHotkey("swap");
    }
  };

  const wheelHandler = (e) => {
    const label = mouseLabelFromEvent(e, "wheel");

    if (isCapturing()) {
      onCaptureMouseLabel(label);
      return;
    }

    if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
    if (Date.now() < getCaptureBlockUntil()) return;

    const now = Date.now();
    const mb = getMouseBinds();
    if (mb.start && label === mb.start) {
      if (now - lastMouseToggle < RATE) return;
      lastMouseToggle = now;
      dispatchHotkey("toggle");
    } else if (mb.swap && label === mb.swap) {
      if (now - lastMouseSwap < RATE) return;
      lastMouseSwap = now;
      dispatchHotkey("swap");
    }
  };

  // Stocker les refs pour pouvoir les retirer sur restart
  _handlers = { keydown: keydownHandler, mousedown: mousedownHandler, wheel: wheelHandler };

  _uIOhook.on("keydown", keydownHandler);
  _uIOhook.on("mousedown", mousedownHandler);
  _uIOhook.on("wheel", wheelHandler);

  // Démarrer
  try {
    _uIOhook.start();
    logHK && logHK("uiohook started (capture enabled)");
  } catch (e) {
    logHK && logHK("uiohook START failed -> fallback", e?.message || e);
    log.warn(`[UIOHOOK] Start failed — ${e?.message ?? e}`);
    _removeHandlers();
    setUsingUiohook(false);
    return;
  }

  // Mode d'entrée : fallback tant que les deux codes ne sont pas définis
  const hk = getHotkeys();
  const haveCodes = Number.isFinite(hk.start) && Number.isFinite(hk.swap);
  setUsingUiohook(!!haveCodes);
  log.info(`[UIOHOOK] Started — mode: ${haveCodes ? "pass-through" : "fallback"} | start:${hk.start ?? "null"} swap:${hk.swap ?? "null"}`);
}

// Restart propre : stop → retire handlers → start
// Appelé par le watchdog dans main.mjs quand uIOhook semble mort
function restart() {
  if (!_uIOhook) return;
  logHK && logHK("uiohook RESTART requested");
  log.info("[UIOHOOK] Restart initiated");
  try { _uIOhook.stop(); } catch {}
  _removeHandlers();
  // Petit délai pour laisser le thread natif se terminer proprement
  setTimeout(() => {
    try {
      start();
      logHK && logHK("uiohook RESTART done");
    } catch (e) {
      logHK && logHK("uiohook RESTART failed", e?.message || e);
      log.warn(`[UIOHOOK] Restart failed — ${e?.message ?? e}`);
    }
  }, 300);
}

module.exports = {
  setupUiohook,
  start,
  stop,
  restart,
  isLoaded,
};
