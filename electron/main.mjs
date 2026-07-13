import {
  app,
  ipcMain,
  globalShortcut,
  shell,
  Menu,
  dialog,
} from "electron";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Store from "electron-store";
import { createRequire } from "node:module";
import fs from "node:fs";
import log from "electron-log";

const require = createRequire(import.meta.url);
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
require("./logging/configure.cjs").configureLogging(log, { development: isDev });

/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */
/** @typedef {{ start: number | HotkeyChord | null, reset: number | HotkeyChord | null, swap: number | HotkeyChord | null }} HotkeyCodes */
/** @typedef {{ start: string | null, reset: string | null, swap: string | null }} HotkeyLabels */
/** @typedef {{ x: number, y: number, scale: number, locked: boolean, alwaysOnTop: boolean, nameTheme: string, accentKey: string, autoScoreEnabled: boolean, autoScoreThresholdSec: number }} OverlaySettings */
/** @typedef {{ player1: { name: string, score: number }, player2: { name: string, score: number } }} TimerData */
/** @typedef {{ windowState: { x?: number, y?: number, width?: number, height?: number }, overlaySettings: OverlaySettings, timerData: TimerData, hotkeys: HotkeyCodes, hotkeysLabel: HotkeyLabels, mouseBinds: HotkeyLabels, _appVersion: string }} AppStore */

// Modules CJS
const windows = require("./windows/windows.cjs");
const capture = require("./hotkeys/capture.cjs");
const uio = require("./input/uiohook.cjs");
const updates = require("./updates/updater.cjs");
const { registerAppIpc } = require("./ipc/register.cjs");
const { isAlphaNumLabel, makeChordLabelFromBeforeInput } = require("./hotkeys/labels.cjs");
const { describeBinding } = require("./hotkeys/binding.cjs");
const { createDeferredWriter } = require("./persistence/deferred-writer.cjs");
const { createRateLimiter } = require("./input/rate-limiter.cjs");
const {
  normalizeInputBindings: normalizeRuntimeBindings,
  runtimeNeedsUiohook: runtimeNeedsUiohookPolicy,
} = require("./input/runtime-policy.cjs");
const {
  setupGamepadExe,
  onGamepadRaw,
  setGamepadMapping,
  clearGamepadMapping,
  getGamepadMapping,
} = require("./input/gamepad-exe.cjs");

/* -------------------- auto-updater config -------------------- */
const isPortable = !!process.env.PORTABLE_EXECUTABLE_DIR;
const RELEASES_URL = 'https://github.com/steaxss/deadbytimer/releases/latest';

/** Charge .env/.env.development UNIQUEMENT en dev, si "dotenv" est présent. */
(function loadDevEnv() {
  if (app.isPackaged) return; // en prod: ne rien charger
  let dotenv;
  try {
    dotenv = require("dotenv");
  } catch {
    return;
  }
  const root = process.cwd();
  for (const name of [".env", ".env.development"]) {
    const p = join(root, name);
    if (fs.existsSync(p)) dotenv.config({ path: p, override: true });
  }
})();

/* -------------------- flags via .env -------------------- */
const FORCE_NO_UIOHOOK = process.env.FORCE_NO_UIOHOOK === "1";
const FORCE_NO_VCREDIST = process.env.FORCE_NO_VCREDIST === "1";
const DEBUG_HK = process.env.DEBUG_HK === "1";
const DEBUG_LOGS = process.env.DEBUG_LOGS === "1";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VERBOSE_LOGS = isDev || DEBUG_HK || DEBUG_LOGS;

// Build mode flag injected by set-build-mode.mjs before electron-builder
let buildMode = 'prod';
try {
  buildMode = require('./build-flags.cjs').buildMode || 'prod';
} catch (error) { log.debug("Build mode flag unavailable; using production mode", error); }
const isTestBuild = !isDev && buildMode === 'test';
const isSimulateMode = isTestBuild || (isDev && process.env.SIMULATE_UPDATE === '1');

if (process.platform === "win32") {
  app.setAppUserModelId("com.steaxs.dbdtimer.free");
}

const iconPath = isDev
  ? join(__dirname, "../build/icon.ico")
  : join(process.resourcesPath, "icon.ico");

/** @type {Store<AppStore>} */
const store = new Store();
const timerDataWriter = createDeferredWriter({ write: (data) => store.set(K.TIMER, data) });

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

/* -------------------- store keys & defaults -------------------- */
const K = /** @type {const} */ ({
  WINDOW: "windowState",
  OVERLAY: "overlaySettings",
  TIMER: "timerData",
  HK_CODES: "hotkeys",
  HK_LABELS: "hotkeysLabel",
  MOUSE_BINDS: "mouseBinds",
});
/** @type {Pick<AppStore, "overlaySettings" | "timerData" | "hotkeys" | "hotkeysLabel" | "mouseBinds">} */
const defaults = {
  [K.OVERLAY]: {
    x: 0,
    y: 0,
    scale: 100,
    locked: true,
    alwaysOnTop: true,
    nameTheme: 'default',
    accentKey: 'default',
    autoScoreEnabled: true,
    autoScoreThresholdSec: 25,
  },
  [K.TIMER]: {
    player1: { name: "Player 1", score: 0 },
    player2: { name: "Player 2", score: 0 },
  },
  [K.HK_CODES]: { start: null, reset: null, swap: null },
  [K.HK_LABELS]: { start: "F1", reset: null, swap: "F2" },
  [K.MOUSE_BINDS]: { start: null, reset: null, swap: null },
};

/** @template {keyof typeof defaults} T @param {T} key @returns {(typeof defaults)[T]} */
const getStore = (key) => store.get(key) ?? defaults[key];

/* -------------------- keep config stable across versions -------------------- */
{
  const storedVersion = store.get("_appVersion");
  const currentVersion = app.getVersion();
  for (const [key, value] of Object.entries(defaults)) {
    const current = store.get(key);
    if (current === undefined) {
      store.set(key, value);
      continue;
    }
    if (current && typeof current === "object" && !Array.isArray(current)) {
      store.set(key, { ...value, ...current });
    }
  }
  if (storedVersion && storedVersion !== currentVersion && VERBOSE_LOGS) {
    log.info(`[update] Version changed ${storedVersion} → ${currentVersion} — keeping user config and applying missing defaults only`);
  }
  store.set("_appVersion", currentVersion);
}

/* -------------------- état runtime -------------------- */
/** @type {Electron.BrowserWindow | null} */
let mainWindow = null;
/** @type {Electron.BrowserWindow | null} */
let overlayWindow = null;
let usingUiohook = false;

// dimensions non-scalées du contenu (hors drag bar)
let baseDims = { width: 520, height: 120 };

// hotkeys: codes (uiohook) + labels (affichage & fallback)
let hotkeys = getStore(K.HK_CODES);
let hotkeysLabel = getStore(K.HK_LABELS);
let mouseBinds = getStore(K.MOUSE_BINDS);

updates.initializeUpdater({
  getMainWindow: () => mainWindow,
  isPortable,
  verboseLogs: VERBOSE_LOGS,
});

// ===== debug =====
/** @param {...unknown} args */
const logHK = (...args) => {
  if (DEBUG_HK) console.log("[HK]", ...args);
};

/* -------------------- helpers communs -------------------- */
const VC_REDIST_X64_URL = "https://aka.ms/vs/17/release/vc_redist.x64.exe";

// Détection VC++ 2015–2022 (x64)
function hasVCRedist() {
  if (FORCE_NO_VCREDIST) return false;
  if (process.platform !== "win32") return true;
  const win = process.env.windir || "C:\\Windows";
  const sys32 = join(win, "System32");
  const dlls = ["vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll"];
  try {
    return dlls.every((d) => fs.existsSync(join(sys32, d)));
  } catch {
    return false;
  }
}

// Dédup unifié
const canFire = createRateLimiter(220);


/** @param {"pass-through" | "fallback"} mode */
function sendHotkeysMode(mode) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("hotkeys-mode", mode);
  }
}

function normalizeInputBindings() {
  const { hotkeys: nextHotkeys, mouseBinds: nextMouseBinds, changed } =
    normalizeRuntimeBindings({
      hotkeys,
      hotkeysLabel,
      mouseBinds,
    });
  if (changed) {
    hotkeys = { ...defaults[K.HK_CODES], ...nextHotkeys };
    mouseBinds = { ...defaults[K.MOUSE_BINDS], ...nextMouseBinds };
    store.set(K.HK_CODES, hotkeys);
    store.set(K.MOUSE_BINDS, mouseBinds);
  }
}

function runtimeNeedsUiohook() {
  return runtimeNeedsUiohookPolicy({ hotkeys, hotkeysLabel, mouseBinds });
}

function refreshInputRuntime() {
  normalizeInputBindings();

  const needsUiohook = runtimeNeedsUiohook();
  usingUiohook = needsUiohook ? uio.enable("runtime") : false;
  if (!needsUiohook) uio.disable("runtime");
  if (usingUiohook) {
    try {
      globalShortcut.unregisterAll();
    } catch (error) { log.warn("Failed to unregister global shortcuts before uIOhook activation", error); }
  } else {
    capture.refreshHotkeyEngine({
      globalShortcut,
      hotkeysLabel,
      getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
      dispatchHotkey,
    });
  }
  sendHotkeysMode(usingUiohook ? "pass-through" : "fallback");
}

/* -------------------- dispatch centralisé vers l’overlay -------------------- */
/** @param {"toggle" | "reset" | "swap"} type */
function dispatchHotkey(type) {
  if (!overlayWindow || overlayWindow.isDestroyed()) return;
  if (!canFire(type, 220)) return;
  overlayWindow.webContents.send("global-hotkey", { type });
  logHK("DISPATCH", type);
}

/* -------------------- wiring modules -------------------- */
// Initialiser le module fenêtres
/** @type {ReturnType<typeof setTimeout> | null} */
let overlayMoveTimer = null;

windows.initWindows({
  store,
  iconPath,
  isDev,
  baseDims,
  getBaseDims: () => baseDims,
  setBaseDims: (w, h) => {
    baseDims = { width: Math.max(1, Math.floor(w)), height: Math.max(1, Math.floor(h)) };
  },
  onOverlayMove: (x, y) => {
    // débounce léger (100ms)
    if (overlayMoveTimer) clearTimeout(overlayMoveTimer);
    overlayMoveTimer = setTimeout(() => {
      store.set("overlaySettings.x", x);
      store.set("overlaySettings.y", y);
    }, 120);
  },
  onOverlayReadyChange: (ready) => {
    if (mainWindow && !mainWindow.isDestroyed())
      mainWindow.webContents.send("overlay-ready", !!ready);
  },
});

// Initialiser le module capture
capture.initCapture({
  ipcMain,
  globalShortcut,
  dialog,
  shell,
  VC_REDIST_X64_URL,
  hasVCRedist,
  logHK,
  getMainWindow: () => mainWindow,
  getUsingUiohook: () => usingUiohook,
  getHotkeys: () => hotkeys,
  setHotkeys: (next) => {
    hotkeys = next;
    store.set(K.HK_CODES, hotkeys);
  },
  getHotkeysLabel: () => hotkeysLabel,
  setHotkeysLabel: (next) => {
    hotkeysLabel = next;
    store.set(K.HK_LABELS, hotkeysLabel);
  },
  getMouseBinds: () => mouseBinds,
  setMouseBinds: (next) => {
    mouseBinds = next;
    store.set(K.MOUSE_BINDS, mouseBinds);
  },
  makeChordLabelFromBeforeInput,
  isAlphaNumLabel,
  refreshInputRuntime,
  enableUiohookCapture: () => uio.enable("capture"),
  disableUiohookCapture: () => uio.disable("capture"),
  onGamepadRaw,
  setGamepadMapping: (action, label, options) =>
    setGamepadMapping(action === "swap" ? "swap" : "toggle", label, options),
});

// Initialiser le module uIOhook (clavier + souris)
uio.setupUiohook({
  require,            // pour charger uiohook-napi
  FORCE_NO_UIOHOOK,
  hasVCRedist,
  dialog,
  shell,
  VC_REDIST_X64_URL,
  logHK,
  getOverlayWindow: () => overlayWindow,
  dispatchHotkey,
  // capture integration:
  isCapturing: () => capture.isCapturing(),
  getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
  onCaptureKeyboardBinding: (binding) => capture.onKeyboardCode(binding),
  onCaptureMouseLabel: (label) => capture.onMouseLabel(label),
  // binds & codes
  getHotkeys: () => hotkeys,
  getMouseBinds: () => mouseBinds,
  setUsingUiohook: (v) => {
    usingUiohook = !!v;
    sendHotkeysMode(usingUiohook ? "pass-through" : "fallback");
  },
});

/* -------------------- IPC (panneau ↔ main) -------------------- */
function setupIPC() {
  registerAppIpc({
    ipcMain, app, shell, windows, uio, capture, store, isDev,
    getMainWindow: () => mainWindow,
    setMainWindow: (window) => { mainWindow = window; },
    getOverlayWindow: () => overlayWindow,
    setOverlayWindow: (window) => { overlayWindow = window; },
    getOverlaySettings: () => getStore(K.OVERLAY),
    setOverlaySettings: () => {},
    persistOverlaySettings: (settings) => store.set(K.OVERLAY, settings),
    getTimerData: () => getStore(K.TIMER),
    setTimerData: () => {},
    persistTimerData: timerDataWriter.schedule,
    getBaseDims: () => baseDims,
    setBaseDims: (dims) => { baseDims = dims; },
    getHotkeys: () => hotkeys,
    setHotkeys: (codes) => { hotkeys = codes; },
    getHotkeyLabels: () => hotkeysLabel,
    setHotkeyLabels: (labels) => { hotkeysLabel = labels; },
    getMouseBinds: () => mouseBinds,
    setMouseBinds: (binds) => { mouseBinds = binds; },
    getUsingUiohook: () => usingUiohook,
    runtimeNeedsUiohook, refreshInputRuntime, getGamepadMapping, clearGamepadMapping,
    persistHotkeys: (codes) => store.set(K.HK_CODES, codes),
    persistHotkeyLabels: (labels) => store.set(K.HK_LABELS, labels),
    persistMouseBinds: (binds) => store.set(K.MOUSE_BINDS, binds),
    registerUpdaterIpc: (assertSender) => updates.registerUpdaterIpc({ ipcMain, simulate: isSimulateMode, releasesUrl: RELEASES_URL, assertSender }),
  });
}

/* -------------------- lifecycle -------------------- */
Menu.setApplicationMenu(null);
app.whenReady().then(() => {
  if (VERBOSE_LOGS) {
    log.info(`App start | v${app.getVersion()} | Electron ${process.versions.electron} | Node ${process.versions.node}`);
  }

  mainWindow = windows.createMainWindow(store, iconPath, isDev);
  setupIPC();
  setupGamepadExe(dispatchHotkey);
  refreshInputRuntime();
  setTimeout(() => {
    overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
  }, 800);

  if (VERBOSE_LOGS) {
    setTimeout(() => {
      const hkCodes = getStore(K.HK_CODES);
      const hkLabels = getStore(K.HK_LABELS);
      const mb = getStore(K.MOUSE_BINDS);
      const gm = getGamepadMapping();
      const mode = usingUiohook ? "pass-through" : "fallback";
      log.info(`[CONFIG] Input mode: ${mode} | uiohook: ${uio.isLoaded() ? (uio.isRunning() ? "running" : "loaded-idle") : "unavailable"}`);
      log.info(`[CONFIG] Keyboard — toggle: "${hkLabels.start}" (${describeBinding(hkCodes.start)}) | reset: "${hkLabels.reset ?? "none"}" (${describeBinding(hkCodes.reset)}) | swap: "${hkLabels.swap}" (${describeBinding(hkCodes.swap)})`);
      log.info(`[CONFIG] Mouse — toggle: ${mb.start ?? "null"} | reset: ${mb.reset ?? "null"} | swap: ${mb.swap ?? "null"}`);
      log.info(`[CONFIG] Gamepad — toggle: [${(gm.toggle ?? []).join(", ") || "none"}] | swap: [${(gm.swap ?? []).join(", ") || "none"}]`);
    }, 1200);
  }

  updates.scheduleUpdateCheck({
    isDev, isTestBuild, isPortable,
    simulateDevelopment: process.env.SIMULATE_UPDATE === "1",
  });
}).catch(err => log.error("[Electron] whenReady error:", err));

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

app.on("will-quit", () => {
  timerDataWriter.flush();
  try {
    if (uio.isLoaded()) uio.stop();
  } catch (error) { log.warn("Failed to stop uIOhook during shutdown", error); }
  try {
    globalShortcut.unregisterAll();
  } catch (error) { log.warn("Failed to unregister global shortcuts during shutdown", error); }
});

app.on("window-all-closed", () => {
  app.quit();
});
