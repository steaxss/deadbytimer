// electron/input/uiohook.cjs
// Charge uIOhook et gère clavier + souris (capture & runtime)

let _uIOhook = null;
let _loaded = false;

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
  } catch (e) {
    _uIOhook = null;
    _loaded = false;
    logHK && logHK("uiohook FAILED to load -> fallback", e?.message || e);
  }
}

function isLoaded() {
  return !!_loaded && !!_uIOhook;
}

function stop() {
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
          message: "uIOhook couldn’t start because the Microsoft C++ runtime is missing.",
          detail:
            "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”. " +
            "It provides the system libraries (MSVCP140 / VCRUNTIME140) required to listen to A–Z / 0–9 without stealing them from other apps. " +
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
          message: "uIOhook couldn’t start even though the C++ runtime is present.",
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

  // Handlers
  const RATE = 180;
  let lastToggle = 0,
    lastSwap = 0;

  _uIOhook.on("keydown", (e) => {
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
  });

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

  _uIOhook.on("mousedown", (e) => {
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
  });

  _uIOhook.on("wheel", (e) => {
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
  });

  // Démarrer
  try {
    _uIOhook.start();
    logHK && logHK("uiohook started (capture enabled)");
  } catch (e) {
    logHK && logHK("uiohook START failed -> fallback", e?.message || e);
    setUsingUiohook(false);
    return;
  }

  // Mode d'entrée : fallback tant que les deux codes ne sont pas définis
  const hk = getHotkeys();
  const haveCodes = Number.isFinite(hk.start) && Number.isFinite(hk.swap);
  setUsingUiohook(!!haveCodes);
}

module.exports = {
  setupUiohook,
  start,
  stop,
  isLoaded,
};
