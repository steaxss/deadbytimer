import {
  app,
  BrowserWindow,
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

const require = createRequire(import.meta.url);

// Modules CJS
const windows = require("./windows/windows.cjs");
const capture = require("./hotkeys/capture.cjs");
const uio = require("./input/uiohook.cjs");
const {
  setupGamepadExe,
  onGamepadRaw,
  setGamepadMapping,
  clearGamepadMapping,
} = require("./input/gamepad-exe.cjs");

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

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

if (process.platform === "win32") {
  app.setAppUserModelId("com.steaxs.dbdtimer.free");
}

const iconPath = isDev
  ? join(__dirname, "../build/icon.ico")
  : join(process.resourcesPath, "icon.ico");

const store = new Store();

// single-instance (évite hooks dupliqués)
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

/* -------------------- store keys & defaults -------------------- */
const K = {
  WINDOW: "windowState",
  OVERLAY: "overlaySettings",
  TIMER: "timerData",
  HK_CODES: "hotkeys",
  HK_LABELS: "hotkeysLabel",
  MOUSE_BINDS: "mouseBinds",
};
const defaults = {
  [K.OVERLAY]: {
    x: 0,
    y: 0,
    scale: 100,
    locked: true,
    alwaysOnTop: true,
    nameTheme: 'default',
    accentKey: 'default',
    autoScoreEnabled: true,         // ← NEW
    autoScoreThresholdSec: 25,      // ← NEW
  },
  [K.TIMER]: {
    player1: { name: "Player 1", score: 0 },
    player2: { name: "Player 2", score: 0 },
  },
  [K.HK_CODES]: { start: null, swap: null },
  [K.HK_LABELS]: { start: "F1", swap: "F2" },
  [K.MOUSE_BINDS]: { start: null, swap: null },
};

const getStore = (key) => store.get(key) ?? defaults[key];

/* -------------------- état runtime -------------------- */
let mainWindow = null;
let overlayWindow = null;
let usingUiohook = false;

// dimensions non-scalées du contenu (hors drag bar)
let baseDims = { width: 520, height: 120 };

// hotkeys: codes (uiohook) + labels (affichage & fallback)
let hotkeys = getStore(K.HK_CODES);
let hotkeysLabel = getStore(K.HK_LABELS);
let mouseBinds = getStore(K.MOUSE_BINDS);

// ===== debug =====
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
function createRateLimiter(defaultMs = 200) {
  const last = new Map();
  return (key, ms = defaultMs) => {
    const now = Date.now();
    const t = last.get(key) || 0;
    if (now - t < ms) return false;
    last.set(key, now);
    return true;
  };
}
const canFire = createRateLimiter(220);

function isAlphaNumLabel(k) {
  return typeof k === "string" && /^[A-Z0-9]$/.test(k);
}

// Normalise un label depuis before-input-event (fallback)
function makeLabelFromBeforeInput(input) {
  let k = input.key || "";
  if (/^F\d{1,2}$/.test(k)) return k;
  if (/^[a-z]$/.test(k)) return k.toUpperCase();
  if (/^\d$/.test(k)) return k;
  if (k === " ") return "SPACE";
  const map = {
    Escape: "ESC",
    Tab: "TAB",
    Enter: "ENTER",
    Backspace: "BACKSPACE",
    Shift: "SHIFT",
    Control: "CTRL",
    Alt: "ALT",
    Meta: "META",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
  };
  if (map[k]) return k;
  const code = input.code || "";
  if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
}

/* -------------------- dispatch centralisé vers l’overlay -------------------- */
function dispatchHotkey(type) {
  if (!overlayWindow || overlayWindow.isDestroyed()) return;
  if (!canFire(type, 220)) return;
  overlayWindow.webContents.send("global-hotkey", { type });
  logHK("DISPATCH", type);
}

/* -------------------- wiring modules -------------------- */
// Initialiser le module fenêtres
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
    if (windows._moveDebounce) clearTimeout(windows._moveDebounce);
    windows._moveDebounce = setTimeout(() => {
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
  store,
  globalShortcut,
  dialog,
  shell,
  VC_REDIST_X64_URL,
  hasVCRedist,
  logHK,
  getMainWindow: () => mainWindow,
  getOverlayWindow: () => overlayWindow,
  getUsingUiohook: () => usingUiohook,
  setUsingUiohook: (v) => (usingUiohook = !!v),
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
  makeLabelFromBeforeInput,
  isAlphaNumLabel,
  sendHotkeysMode: (mode) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("hotkeys-mode", mode);
    }
  },
  dispatchHotkey,
  onGamepadRaw,         // ↔️ gamepad
  setGamepadMapping,
  clearGamepadMapping,    // ↔️ gamepad
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
  onCaptureKeyboardCode: (code) => capture.onKeyboardCode(code),
  onCaptureMouseLabel: (label) => capture.onMouseLabel(label),
  // binds & codes
  getHotkeys: () => hotkeys,
  getMouseBinds: () => mouseBinds,
  setUsingUiohook: (v) => {
    usingUiohook = !!v;
    const mode = usingUiohook ? "pass-through" : "fallback";
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("hotkeys-mode", mode);
    }
    if (!usingUiohook) {
      // (re)activer globalShortcut fallback
      capture.refreshHotkeyEngine({
        globalShortcut,
        hotkeysLabel,
        isAlphaNumLabel,
        logHK,
        getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
        dispatchHotkey,
      });
    } else {
      try {
        globalShortcut.unregisterAll();
      } catch {}
    }
  },
});

// Expose quelques helpers Windows au module capture
capture.attachWindowsAPI({
  sendOverlaySettings: () => windows.sendOverlaySettings(overlayWindow, store, isDev),
});

/* -------------------- IPC (panneau ↔ main) -------------------- */
function setupIPC() {
  ipcMain.handle("overlay-show", () => {
    overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
    return true;
  });
  ipcMain.handle("overlay-hide", () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
    overlayWindow = null;
    if (mainWindow && !mainWindow.isDestroyed())
      mainWindow.webContents.send("overlay-ready", false);
    return true;
  });

  ipcMain.handle("overlay-settings-update", (_evt, settings) => {
    const current = getStore(K.OVERLAY);
    const next = { ...current, ...settings };
    store.set(K.OVERLAY, next);
    if (!overlayWindow || overlayWindow.isDestroyed()) return true;

    if (settings.locked !== undefined) {
      overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
      overlayWindow.setFocusable(true); // OBS/Alt-Tab
    }
    if (settings.alwaysOnTop !== undefined)
      windows.applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
    if (settings.x !== undefined || settings.y !== undefined) {
      const b = overlayWindow.getBounds();
      overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y);
    }
    if (settings.scale !== undefined || settings.locked !== undefined)
      windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
    windows.sendOverlaySettings(overlayWindow, store, isDev);
    return true;
  });

  ipcMain.handle("overlay-measure", (_evt, dims) => {
    if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
      return false;
    baseDims = {
      width: Math.max(1, Math.floor(dims.width)),
      height: Math.max(1, Math.floor(dims.height)),
    };
    windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
    return true;
  });

  // Timer data
  ipcMain.handle("timer-data-get", () => getStore(K.TIMER));
  ipcMain.handle("timer-data-set", (_evt, data) => {
    store.set(K.TIMER, data);
    if (overlayWindow && !overlayWindow.isDestroyed())
      overlayWindow.webContents.send("timer-data-sync", data);
    return true;
  });

  // Hotkeys API
  ipcMain.handle("hotkeys-get", () => ({
    start: hotkeys.start,
    swap: hotkeys.swap,
    startLabel: hotkeysLabel.start,
    swapLabel: hotkeysLabel.swap,
    mode: usingUiohook ? "pass-through" : "fallback",
  }));

  ipcMain.handle("hotkeys-set", (_evt, hk) => {
    hotkeys = { ...hotkeys, ...hk }; // codes uiohook si fournis
    store.set(K.HK_CODES, hotkeys);

    const haveCodes =
      Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);

    if (haveCodes && uio.isLoaded()) {
      // on bascule en pass-through
      try {
        globalShortcut.unregisterAll();
      } catch {}
      usingUiohook = true;
      if (mainWindow && !mainWindow.isDestroyed())
        mainWindow.webContents.send("hotkeys-mode", "pass-through");
    } else if (!haveCodes) {
      usingUiohook = false;
      capture.refreshHotkeyEngine({
        globalShortcut,
        hotkeysLabel,
        isAlphaNumLabel,
        logHK,
        getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
        dispatchHotkey,
      });
      if (mainWindow && !mainWindow.isDestroyed())
        mainWindow.webContents.send("hotkeys-mode", "fallback");
    }
    return true;
  });

  // 🚀 Capture: tout le workflow (IPC) déplacé dans le module capture
  capture.setupCaptureIPC();
}

/* -------------------- lifecycle -------------------- */
app.commandLine.appendSwitch("enable-zero-copy");
app.commandLine.appendSwitch("ignore-gpu-blocklist");

app.whenReady().then(() => {
  mainWindow = windows.createMainWindow(store, iconPath, isDev);
  setupIPC();
  uio.start(); // lance uIOhook (si possible) et configure mode fallback/pass-through
  setTimeout(() => {
    overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
  }, 800);
  setupGamepadExe();
}).catch(err => console.error("[Electron] whenReady error:", err));

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

app.on("will-quit", () => {
  try {
    if (uio.isLoaded()) uio.stop();
  } catch {}
  try {
    globalShortcut.unregisterAll();
  } catch {}
});

app.on("window-all-closed", () => {
  app.quit();
});
