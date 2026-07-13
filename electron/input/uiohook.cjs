// electron/input/uiohook.cjs
// Charge uIOhook et gère clavier + souris (capture & runtime)

const log = require("electron-log");
const { chordFromEvent, describeBinding, matchesKeyboardEvent } = require("../hotkeys/binding.cjs");
/** @typedef {"toggle" | "reset" | "swap"} HotkeyAction */
/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */
/** @typedef {{ start: number | HotkeyChord | null, reset: number | HotkeyChord | null, swap: number | HotkeyChord | null }} HotkeyCodes */
/** @typedef {{ start: string | null, reset: string | null, swap: string | null }} MouseBinds */
/** @typedef {import("uiohook-napi").UiohookKeyboardEvent} KeyboardEvent */
/** @typedef {import("uiohook-napi").UiohookMouseEvent} MouseEvent */
/** @typedef {import("uiohook-napi").UiohookWheelEvent} WheelEvent */
/** @typedef {{ rotation?: number, amount?: number, deltaY?: number, button?: unknown }} MouseInput */
/** @typedef {{ keydown: (event: KeyboardEvent) => void, keyup: (event: KeyboardEvent) => void, mousedown: (event: MouseEvent) => void, mouseup: (event: MouseEvent) => void, wheel: (event: WheelEvent) => void }} HookHandlers */
/** @typedef {{ require: NodeRequire, FORCE_NO_UIOHOOK: boolean, hasVCRedist: () => boolean, dialog: typeof import("electron").dialog, shell: typeof import("electron").shell, VC_REDIST_X64_URL: string, logHK: (message: string, details?: unknown) => void, getOverlayWindow: () => Electron.BrowserWindow | null, dispatchHotkey: (action: HotkeyAction) => void, isCapturing: () => boolean, getCaptureBlockUntil: () => number, onCaptureKeyboardBinding: (binding: number | HotkeyChord) => void, onCaptureMouseLabel: (label: string) => void, getHotkeys: () => HotkeyCodes, getMouseBinds: () => MouseBinds, setUsingUiohook: (usingHook: boolean) => void }} UiohookContext */
const VERBOSE_LOGS =
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_HK === "1" ||
  process.env.DEBUG_LOGS === "1";

/** @type {typeof import("uiohook-napi").uIOhook | null} */
let _uIOhook = null;
let _loaded = false;
let _loadAttempted = false;
/** @type {HookHandlers | null} */
let _handlers = null; // refs des handlers actifs pour pouvoir les retirer
let _running = false;
/** @type {Set<string>} */
const _reasons = new Set();
/** @type {ReturnType<typeof setTimeout> | null} */
let _restartTimer = null;

/** @type {UiohookContext} */
let context;

/** @param {UiohookContext} ctx */
function setupUiohook(ctx) {
  context = ctx;
}

function _loadHook() {
  if (_loadAttempted) return isLoaded();
  _loadAttempted = true;
  const {
    require: requireFn,
    FORCE_NO_UIOHOOK,
    logHK,
  } = context;
  // essaie de charger uiohook immédiatement (mais ne démarre qu'avec start())
  try {
    if (FORCE_NO_UIOHOOK) throw new Error("uIOhook forcibly disabled via .env");
    const lib = requireFn("uiohook-napi");
    const hook = /** @type {typeof import("uiohook-napi").uIOhook} */ (lib.uIOhook);
    _uIOhook = hook;
    _loaded = true;
    logHK && logHK("uiohook loaded OK");
    if (VERBOSE_LOGS) log.info("[UIOHOOK] Loaded OK");

    // Listener permanent : détecte quand le hook natif meurt (antivirus, EAC, G Hub, etc.)
    hook.addListener("error", /** @param {Error} error */ (error) => {
      log.error(`[UIOHOOK] Hook died — ${errorMessage(error)} — attempting auto-restart`);
      _running = false;
      _removeHandlers();
      if (_reasons.size === 0) {
        context.setUsingUiohook(false);
        return;
      }
      if (_restartTimer) clearTimeout(_restartTimer);
      _restartTimer = setTimeout(() => {
        _restartTimer = null;
        try { _startHook(); } catch (error) { log.error(`[UIOHOOK] Auto-restart failed — ${errorMessage(error)}`); }
      }, 500);
    });
    return true;
  } catch (error) {
    _uIOhook = null;
    _loaded = false;
    logHK && logHK("uiohook FAILED to load -> fallback", errorMessage(error));
    log.warn(`[UIOHOOK] Failed to load — ${errorMessage(error)}`);
    return false;
  }
}

/** @param {unknown} error */
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function isLoaded() {
  return !!_loaded && !!_uIOhook;
}

function isRunning() {
  return _running;
}

/** @param {keyof HookHandlers} eventName @param {HookHandlers[keyof HookHandlers]} listener */
function removeHookListener(eventName, listener) {
  try {
    _uIOhook?.removeListener(eventName, listener);
  } catch (error) {
    log.warn(`[UIOHOOK] Failed to remove ${eventName} listener â€” ${errorMessage(error)}`);
  }
}

// Retire tous les handlers actifs de l'instance uIOhook
function _removeHandlers() {
  if (!_uIOhook || !_handlers) return;
  removeHookListener("keydown", _handlers.keydown);
  removeHookListener("keyup", _handlers.keyup);
  removeHookListener("mousedown", _handlers.mousedown);
  removeHookListener("mouseup", _handlers.mouseup);
  removeHookListener("wheel", _handlers.wheel);
  _handlers = null;
}

function stop() {
  if (_restartTimer) clearTimeout(_restartTimer);
  _restartTimer = null;
  _removeHandlers();
  try {
    if (_uIOhook && _running) _uIOhook.stop();
  } catch (error) {
    log.warn(`[UIOHOOK] Failed to stop native hook â€” ${errorMessage(error)}`);
  }
  _running = false;
  context.setUsingUiohook(false);
}

function _startHook() {
  if (!_uIOhook) _loadHook();
  if (!_uIOhook) {
    // Prompt éventuel si non chargé
    const vcPresent = context.hasVCRedist();
    (async () => {
      if (!vcPresent) {
        const { response } = await context.dialog.showMessageBox({
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
        if (response === 0) context.shell.openExternal(context.VC_REDIST_X64_URL);
      } else {
        await context.dialog.showMessageBox({
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
      context.setUsingUiohook(false);
    })();
    return false;
  }

  if (_running) {
    context.setUsingUiohook(_reasons.has("runtime"));
    return true;
  }

  // Retirer les anciens handlers avant d'en ajouter de nouveaux (évite duplicates sur restart)
  _removeHandlers();

  // Handlers
  /** @type {Set<number>} */
  const pressedKeys = new Set();
  /** @type {Set<string>} */
  const pressedMouse = new Set();

  /** @param {KeyboardEvent} e */
  const keydownHandler = (e) => {
    const keycode = e.keycode;
    const isRepeat = pressedKeys.has(keycode);
    if (!isRepeat) pressedKeys.add(keycode);
    context.logHK &&
      context.logHK("uiohook keydown", {
        keycode,
        repeat: isRepeat,
        captureState: context.isCapturing(),
        now: performance.now(),
        blockUntil: context.getCaptureBlockUntil(),
      });

    // Capture: récupérer le keycode
    if (context.isCapturing()) {
      if (!isRepeat) {
        const chord = chordFromEvent(e);
        context.onCaptureKeyboardBinding(chord.modifiers ? chord : keycode);
      }
      return;
    }

    // Runtime: déclenchement si codes définis
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed()) return;
    if (performance.now() < context.getCaptureBlockUntil()) return;
    if (isRepeat) return;

    const hk = context.getHotkeys();
    if (matchesKeyboardEvent(hk.start, e)) {
      context.dispatchHotkey("toggle");
    } else if (matchesKeyboardEvent(hk.reset, e)) {
      context.dispatchHotkey("reset");
    } else if (matchesKeyboardEvent(hk.swap, e)) {
      context.dispatchHotkey("swap");
    }
  };

  /** @param {KeyboardEvent} e */
  const keyupHandler = (e) => {
    pressedKeys.delete(e.keycode);
  };

  // Souris
  /** @param {MouseInput} e @param {"mousedown" | "mouseup" | "wheel"} kind */
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
    const b = Number(e.button); // 1=left,2=right,3=middle,>=4 extra
    if (b === 1 || b === 2) return null; // exclure gauche/droit
    if (b === 3) return "MOUSE3";
    if (b >= 4) return `MOUSE${b}`;
    return null;
  }

  /** @param {MouseEvent} e */
  const mousedownHandler = (e) => {
    const label = mouseLabelFromEvent(e, "mousedown");
    if (!label) return;
    const isRepeat = pressedMouse.has(label);
    if (!isRepeat) pressedMouse.add(label);

    // Capture: on pousse le label
    if (context.isCapturing()) {
      if (!isRepeat) context.onCaptureMouseLabel(label);
      return;
    }

    // Runtime
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed()) return;
    if (performance.now() < context.getCaptureBlockUntil()) return;
    if (isRepeat) return;

    const mb = context.getMouseBinds();
    if (mb.start && label === mb.start) {
      context.dispatchHotkey("toggle");
    } else if (mb.reset && label === mb.reset) {
      context.dispatchHotkey("reset");
    } else if (mb.swap && label === mb.swap) {
      context.dispatchHotkey("swap");
    }
  };

  /** @param {MouseEvent} e */
  const mouseupHandler = (e) => {
    const label = mouseLabelFromEvent(e, "mouseup");
    if (!label) return;
    pressedMouse.delete(label);
  };

  /** @param {WheelEvent} e */
  const wheelHandler = (e) => {
    const label = mouseLabelFromEvent(e, "wheel");
    if (!label) return;

    if (context.isCapturing()) {
      context.onCaptureMouseLabel(label);
      return;
    }

    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed()) return;
    if (performance.now() < context.getCaptureBlockUntil()) return;

    const mb = context.getMouseBinds();
    if (mb.start && label === mb.start) {
      context.dispatchHotkey("toggle");
    } else if (mb.reset && label === mb.reset) {
      context.dispatchHotkey("reset");
    } else if (mb.swap && label === mb.swap) {
      context.dispatchHotkey("swap");
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
    context.logHK && context.logHK("uiohook started (capture enabled)");
  } catch (error) {
    context.logHK && context.logHK("uiohook START failed -> fallback", errorMessage(error));
    log.warn(`[UIOHOOK] Start failed — ${errorMessage(error)}`);
    _removeHandlers();
    _running = false;
    context.setUsingUiohook(false);
    return false;
  }

  _running = true;
  // Mode d'entrée : "pass-through" seulement si le runtime dépend effectivement du hook
  const hk = context.getHotkeys();
  const mb = context.getMouseBinds();
  const runtimeActive = _reasons.has("runtime");
  context.setUsingUiohook(runtimeActive);
  if (VERBOSE_LOGS) {
    log.info(`[UIOHOOK] Started — runtime: ${runtimeActive ? "on" : "off"} | reasons: [${[..._reasons].join(", ") || "none"}] | keyboard: toggle=${describeBinding(hk.start)}, reset=${describeBinding(hk.reset)}, swap=${describeBinding(hk.swap)} | mouse: toggle=${mb.start ?? "none"}, reset=${mb.reset ?? "none"}, swap=${mb.swap ?? "none"}`);
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
  context.setUsingUiohook(_reasons.has("runtime"));
}

// Restart propre : stop → retire handlers → start
// Appelé par le watchdog dans main.mjs quand uIOhook semble mort
function restart() {
  if (!_uIOhook || _reasons.size === 0) return;
  context.logHK && context.logHK("uiohook RESTART requested");
  if (VERBOSE_LOGS) log.info("[UIOHOOK] Restart initiated");
  stop();
  // Petit délai pour laisser le thread natif se terminer proprement
  _restartTimer = setTimeout(() => {
    _restartTimer = null;
    try {
      _startHook();
      context.logHK && context.logHK("uiohook RESTART done");
    } catch (error) {
      context.logHK && context.logHK("uiohook RESTART failed", errorMessage(error));
      log.warn(`[UIOHOOK] Restart failed — ${errorMessage(error)}`);
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
