// electron/input/uiohook.cjs
// Charge uIOhook et gère clavier + souris (capture & runtime)

const log = require("electron-log");
const VERBOSE_LOGS =
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_HK === "1" ||
  process.env.DEBUG_LOGS === "1";

let _uIOhook = null;
let _loaded = false;
let _handlers = null; // refs des handlers actifs pour pouvoir les retirer
let _running = false;
const _reasons = new Set();
let _restartTimer = null;

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
    if (VERBOSE_LOGS) log.info("[UIOHOOK] Loaded OK");

    // Listener permanent : détecte quand le hook natif meurt (antivirus, EAC, G Hub, etc.)
    _uIOhook.on("error", (e) => {
      log.error(`[UIOHOOK] Hook died — ${e?.message ?? e} — attempting auto-restart`);
      _running = false;
      _removeHandlers();
      if (_reasons.size === 0) {
        setUsingUiohook(false);
        return;
      }
      clearTimeout(_restartTimer);
      _restartTimer = setTimeout(() => {
        _restartTimer = null;
        try { _startHook(); } catch (err) { log.error(`[UIOHOOK] Auto-restart failed — ${err?.message ?? err}`); }
      }, 500);
    });
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

function isRunning() {
  return _running;
}

// Retire tous les handlers actifs de l'instance uIOhook
function _removeHandlers() {
  if (!_uIOhook || !_handlers) return;
  try { _uIOhook.removeListener("keydown", _handlers.keydown); } catch {}
  try { _uIOhook.removeListener("keyup", _handlers.keyup); } catch {}
  try { _uIOhook.removeListener("mousedown", _handlers.mousedown); } catch {}
  try { _uIOhook.removeListener("mouseup", _handlers.mouseup); } catch {}
  try { _uIOhook.removeListener("wheel", _handlers.wheel); } catch {}
  _handlers = null;
}

function stop() {
  clearTimeout(_restartTimer);
  _restartTimer = null;
  _removeHandlers();
  try {
    if (_uIOhook && _running) _uIOhook.stop();
  } catch {}
  _running = false;
  setUsingUiohook(false);
}

function _startHook() {
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
    return false;
  }

  if (_running) {
    setUsingUiohook(_reasons.has("runtime"));
    return true;
  }

  // Retirer les anciens handlers avant d'en ajouter de nouveaux (évite duplicates sur restart)
  _removeHandlers();

  // Handlers
  const RATE = 180;
  let lastToggle = 0,
    lastSwap = 0;
  const pressedKeys = new Set();
  const pressedMouse = new Set();

  const keydownHandler = (e) => {
    const keycode = e.keycode;
    const isRepeat = pressedKeys.has(keycode);
    if (!isRepeat) pressedKeys.add(keycode);
    logHK &&
      logHK("uiohook keydown", {
        keycode,
        repeat: isRepeat,
        captureState: isCapturing(),
        now: Date.now(),
        blockUntil: getCaptureBlockUntil(),
      });

    // Capture: récupérer le keycode
    if (isCapturing()) {
      if (!isRepeat) onCaptureKeyboardCode(keycode);
      return;
    }

    // Runtime: déclenchement si codes définis
    if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
    if (Date.now() < getCaptureBlockUntil()) return;
    if (isRepeat) return;

    const now = Date.now();
    const hk = getHotkeys();
    if (Number.isFinite(hk.start) && keycode === hk.start) {
      if (now - lastToggle < RATE) return;
      lastToggle = now;
      dispatchHotkey("toggle");
    } else if (Number.isFinite(hk.swap) && keycode === hk.swap) {
      if (now - lastSwap < RATE) return;
      lastSwap = now;
      dispatchHotkey("swap");
    }
  };

  const keyupHandler = (e) => {
    pressedKeys.delete(e.keycode);
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
    const isRepeat = pressedMouse.has(label);
    if (!isRepeat) pressedMouse.add(label);

    // Capture: on pousse le label
    if (isCapturing()) {
      if (!isRepeat) onCaptureMouseLabel(label);
      return;
    }

    // Runtime
    if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
    if (Date.now() < getCaptureBlockUntil()) return;
    if (isRepeat) return;

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

  const mouseupHandler = (e) => {
    const label = mouseLabelFromEvent(e, "mouseup");
    if (!label) return;
    pressedMouse.delete(label);
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
  _handlers = {
    keydown: keydownHandler,
    keyup: keyupHandler,
    mousedown: mousedownHandler,
    mouseup: mouseupHandler,
    wheel: wheelHandler,
  };

  _uIOhook.on("keydown", keydownHandler);
  _uIOhook.on("keyup", keyupHandler);
  _uIOhook.on("mousedown", mousedownHandler);
  _uIOhook.on("mouseup", mouseupHandler);
  _uIOhook.on("wheel", wheelHandler);

  // Démarrer
  try {
    _uIOhook.start();
    logHK && logHK("uiohook started (capture enabled)");
  } catch (e) {
    logHK && logHK("uiohook START failed -> fallback", e?.message || e);
    log.warn(`[UIOHOOK] Start failed — ${e?.message ?? e}`);
    _removeHandlers();
    _running = false;
    setUsingUiohook(false);
    return false;
  }

  _running = true;
  // Mode d'entrée : "pass-through" seulement si le runtime dépend effectivement du hook
  const hk = getHotkeys();
  const mb = getMouseBinds();
  const runtimeActive = _reasons.has("runtime");
  setUsingUiohook(runtimeActive);
  if (VERBOSE_LOGS) {
    log.info(`[UIOHOOK] Started — runtime: ${runtimeActive ? "on" : "off"} | reasons: [${[..._reasons].join(", ") || "none"}] | kb-start: ${hk.start ?? "null"} | kb-swap: ${hk.swap ?? "null"} | mouse-start: ${mb.start ?? "null"} | mouse-swap: ${mb.swap ?? "null"}`);
  }
  return true;
}

function start() {
  _reasons.add("runtime");
  return _startHook();
}

function enable(reason = "runtime") {
  _reasons.add(reason);
  return _startHook();
}

function disable(reason = "runtime") {
  _reasons.delete(reason);
  if (_reasons.size === 0) {
    stop();
    return;
  }
  setUsingUiohook(_reasons.has("runtime"));
}

// Restart propre : stop → retire handlers → start
// Appelé par le watchdog dans main.mjs quand uIOhook semble mort
function restart() {
  if (!_uIOhook || _reasons.size === 0) return;
  logHK && logHK("uiohook RESTART requested");
  if (VERBOSE_LOGS) log.info("[UIOHOOK] Restart initiated");
  stop();
  // Petit délai pour laisser le thread natif se terminer proprement
  _restartTimer = setTimeout(() => {
    _restartTimer = null;
    try {
      _startHook();
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
  enable,
  disable,
  isLoaded,
  isRunning,
};
