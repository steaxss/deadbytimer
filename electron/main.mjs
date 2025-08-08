import { app, BrowserWindow, ipcMain, screen, globalShortcut, session } from "electron";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Store from "electron-store";
import { createRequire } from "node:module";

const isDev = process.env.NODE_ENV === "development";
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const store = new Store();

let uIOhook = null;
let mainWindow = null;
let overlayWindow = null;
let usingUiohook = false;

// dimensions non-scalées du contenu (hors drag bar)
let baseDims = { width: 520, height: 120 };

// hotkeys: codes (uiohook) + labels (affichage & fallback)
let hotkeys = store.get("hotkeys") || { start: null, swap: null };
let hotkeysLabel = store.get("hotkeysLabel") || { start: "F1", swap: "F2" };

// état de capture transactionnelle
let captureState = null; // { type:'start'|'swap', label:null|string, code:null|number, primaryTimer:any, secondaryTimer:any }
let captureWaitUntil = 0; // time (ms) jusqu’auquel on ne dispatch pas aux timers (évite side-effects pendant capture)

// ===== debug =====

const DEBUG_HK = !!(isDev && process.env.DEBUG_HK === "1"); // logs uiohook off par défaut
const logHK = (...args) => {
  if (DEBUG_HK) console.log("[HK]", ...args);
};

/* -------------------- utils -------------------- */
function applyAlwaysOnTop(win, on) {
  try {
    win.setAlwaysOnTop(!!on, "screen-saver");
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setFullScreenable(false);
  } catch {}
}
function sendOverlaySettings() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    const s = store.get("overlaySettings", {
      x: 0,
      y: 0,
      scale: 100,
      locked: true,
      alwaysOnTop: true,
    });
    overlayWindow.webContents.send("overlay-settings", s);
  }
}
function recomputeOverlaySize() {
  if (!overlayWindow || overlayWindow.isDestroyed()) return;
  const s = store.get("overlaySettings", { scale: 100, locked: true });
  const dragH = s.locked ? 0 : 30;
  const scale = (s.scale || 100) / 100;
  const w = Math.ceil(baseDims.width * scale);
  const h = Math.ceil((baseDims.height + dragH) * scale);
  overlayWindow.setContentSize(w, h);
  sendOverlaySettings();
}
function sendHotkeysMode() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(
      "hotkeys-mode",
      usingUiohook ? "pass-through" : "fallback"
    );
  }
}
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
  if (map[k]) return map[k];
  const code = input.code || "";
  if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
}

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
  const { type, label, code } = captureState;
  clearCaptureTimers();

  logHK("CAPTURE FINALIZE", { reason, type, label, code });

  // Persistance si on a reçu des infos
  if (label) {
    hotkeysLabel = { ...hotkeysLabel, [type]: label };
    store.set("hotkeysLabel", hotkeysLabel);
  }
  if (typeof code === "number") {
    hotkeys = { ...hotkeys, [type]: code };
    store.set("hotkeys", hotkeys);
  }

  // Notifie le panel uniquement si on a reçu label ou code (sinon on ne change rien à l’UI)
  if (
    mainWindow &&
    !mainWindow.isDestroyed() &&
    (label || typeof code === "number")
  ) {
    const payload = { type };
    if (label) payload.label = label;
    if (typeof code === "number") payload.keycode = code;
    mainWindow.webContents.send("hotkeys-captured", payload);
  }

  // Reset capture
  captureState = null;
  captureWaitUntil = 0;

  // Réarmer fallback si nécessaire
  if (!usingUiohook) refreshHotkeyEngine();
}

/* -------------------- windows -------------------- */
function createMainWindow() {
  const saved = store.get("windowState") || {};
  const width = Math.max(saved.width || 1120, 980);
  const height = Math.max(saved.height || 820, 720);

  mainWindow = new BrowserWindow({
    width,
    height,
    x: saved.x,
    y: saved.y,
    minWidth: 980,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.cjs"),
      devTools: isDev,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (e) => e.preventDefault());

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(join(__dirname, "../dist/index.html"));
    mainWindow.webContents.on("before-input-event", (e, input) => {
      const combo =
        (input.control || input.meta) &&
        input.shift &&
        input.key?.toLowerCase() === "i";
      if (combo || input.key === "F12") e.preventDefault();
    });
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("close", () => {
    const b = mainWindow.getBounds();
    store.set("windowState", b);
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (overlayWindow) overlayWindow.close();
  });
}

function createOverlayWindow() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.show();
    overlayWindow.focus();
    return;
  }
  const display = screen.getPrimaryDisplay().workAreaSize;
  const s = store.get("overlaySettings", {
    x: Math.floor(display.width / 2 - 260),
    y: 100,
    scale: 100,
    locked: true,
    alwaysOnTop: true,
  });
  const dragH = s.locked ? 0 : 30;
  const scale = (s.scale || 100) / 100;

  overlayWindow = new BrowserWindow({
    width: Math.ceil(baseDims.width * scale),
    height: Math.ceil((baseDims.height + dragH) * scale),
    x: s.x,
    y: s.y,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,
    title: "DBD Timer Overlay",
    acceptFirstMouse: true,
    backgroundColor: "#00000000",
    useContentSize: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.cjs"),
      backgroundThrottling: false,
    },
  });

  overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
  applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);

  const url = isDev
    ? "http://localhost:5173/overlay.html"
    : join(__dirname, "../dist/overlay.html");
  if (isDev) overlayWindow.loadURL(url);
  else overlayWindow.loadFile(url);

  overlayWindow.on("closed", () => {
    overlayWindow = null;
    if (mainWindow && !mainWindow.isDestroyed())
      mainWindow.webContents.send("overlay-ready", false);
  });
  overlayWindow.on("move", () => {
    const b = overlayWindow.getBounds();
    store.set("overlaySettings.x", b.x);
    store.set("overlaySettings.y", b.y);
  });

  overlayWindow.webContents.on("did-finish-load", () => {
    const data = store.get("timerData") || {
      player1: { name: "Player 1", score: 0 },
      player2: { name: "Player 2", score: 0 },
    };
    overlayWindow.webContents.send("timer-data-sync", data);
    sendOverlaySettings();
    if (mainWindow) mainWindow.webContents.send("overlay-ready", true);
    setTimeout(() => recomputeOverlaySize(), 50);
  });
}

/* -------------------- IPC -------------------- */
function setupIPC() {
  ipcMain.handle("overlay-show", () => {
    createOverlayWindow();
    return true;
  });
  ipcMain.handle("overlay-hide", () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
    overlayWindow = null;
    if (mainWindow && !mainWindow.isDestroyed())
      mainWindow.webContents.send("overlay-ready", false);
    return true;
  });

ipcMain.handle("overlay-settings-update", (_evt, s = {}) => {
  const allow = {};
  if (typeof s.x === "number")   allow.x = Math.round(s.x);
  if (typeof s.y === "number")   allow.y = Math.round(s.y);
  if (typeof s.locked === "boolean") allow.locked = s.locked;
  if (typeof s.alwaysOnTop === "boolean") allow.alwaysOnTop = s.alwaysOnTop;
  if (typeof s.scale === "number") allow.scale = Math.min(200, Math.max(50, Math.round(s.scale)));

  const current = store.get("overlaySettings", {});
  const next = { ...current, ...allow };
  store.set("overlaySettings", next);

  if (overlayWindow && !overlayWindow.isDestroyed()) {
    if ("locked" in allow) overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
    if ("alwaysOnTop" in allow) applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
    if ("x" in allow || "y" in allow) {
      const b = overlayWindow.getBounds();
      overlayWindow.setPosition(allow.x ?? b.x, allow.y ?? b.y);
    }
    if ("scale" in allow || "locked" in allow) recomputeOverlaySize();
    sendOverlaySettings();
  }
  return true;
});

  ipcMain.handle("overlay-measure", (_evt, dims) => {
    if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
      return false;
    baseDims = {
      width: Math.max(1, Math.floor(dims.width)),
      height: Math.max(1, Math.floor(dims.height)),
    };
    recomputeOverlaySize();
    return true;
  });

  // Timer data
  ipcMain.handle(
    "timer-data-get",
    () =>
      store.get("timerData") || {
        player1: { name: "Player 1", score: 0 },
        player2: { name: "Player 2", score: 0 },
      }
  );
  ipcMain.handle("timer-data-set", (_evt, data) => {
    store.set("timerData", data);
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
    store.set("hotkeys", hotkeys);
    refreshHotkeyEngine();
    return true;
  });

  // 🚀 capture 100% main-process, transactionnelle (pas de timeout tant qu'aucune touche n'a été frappée)
  ipcMain.handle("hotkeys-capture", (_evt, type) => {
    if (!(type === "start" || type === "swap")) {
      finalizeCapture("cancel");
      return true;
    }

    logHK("CAPTURE BEGIN", {
      type,
      mode: usingUiohook ? "pass-through" : "fallback",
    });

    // Bloquer le dispatch vers les timers pendant la capture (long pour te laisser le temps)
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
        // Annule la capture si l'utilisateur oublie (15s)
        logHK("CAPTURE PRIMARY TIMEOUT — cancel");
        finalizeCapture("primary-timeout");
      }, 15000),
      secondaryTimer: null,
    };

    // focus le panneau
    try {
      mainWindow?.focus();
      logHK("focused mainWindow?", mainWindow?.isFocused());
    } catch (e) {
      logHK("focus error", e?.message || e);
    }

    // en fallback, libérer les shortcuts pour laisser passer la frappe
    if (!usingUiohook) {
      try {
        globalShortcut.unregisterAll();
        logHK("fallback: unregistered to let key through");
      } catch {}
    }

    // écouter une fois la prochaine touche (pour le label layout-aware)
    const once = (event, input) => {
      if (!captureState) return;
      if (input.type !== "keyDown" || input.isAutoRepeat) return;
      logHK("before-input-event keyDown", { key: input.key, code: input.code });
      const label = makeLabelFromBeforeInput(input);

      captureState.label = label;
      hotkeysLabel = { ...hotkeysLabel, [type]: label };
      store.set("hotkeysLabel", hotkeysLabel);

      // notifie instantanément le panel (affichage immédiat)
      mainWindow?.webContents.send("hotkeys-captured", { type, label });
      logHK("label captured (instant)", { type, label });

      // Si le code est déjà là -> on finalise; sinon, petite fenêtre pour le laisser arriver
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

      mainWindow?.webContents.removeListener("before-input-event", once);
    };
    mainWindow?.webContents.on("before-input-event", once);
    logHK("before-input-event listener ARMED");

    return true;
  });
}

/* -------------------- Hotkeys engines -------------------- */
function refreshHotkeyEngine() {
  if (usingUiohook) {
    logHK("refreshHotkeyEngine: pass-through (no globalShortcut)");
    return;
  }
  try {
    globalShortcut.unregisterAll();
    logHK("globalShortcut: unregistered all");
  } catch {}
  const RATE = 180;
  let lastT = 0,
    lastS = 0;

  const sKey = hotkeysLabel.start || "F1";
  const wKey = hotkeysLabel.swap || "F2";
  logHK("globalShortcut: registering", { start: sKey, swap: wKey });

  try {
    globalShortcut.register(sKey, () => {
      if (Date.now() < captureWaitUntil) {
        logHK("fallback toggle skipped (capturing)");
        return;
      }
      const now = Date.now();
      if (now - lastT < RATE) return;
      lastT = now;
      logHK("DISPATCH toggle via globalShortcut");
      overlayWindow?.webContents.send("global-hotkey", { type: "toggle" });
    });
  } catch (e) {
    logHK("register start failed", e?.message || e);
  }

  try {
    globalShortcut.register(wKey, () => {
      if (Date.now() < captureWaitUntil) {
        logHK("fallback swap skipped (capturing)");
        return;
      }
      const now = Date.now();
      if (now - lastS < RATE) return;
      lastS = now;
      logHK("DISPATCH swap via globalShortcut");
      overlayWindow?.webContents.send("global-hotkey", { type: "swap" });
    });
  } catch (e) {
    logHK("register swap failed", e?.message || e);
  }
}

// uiohook global (pass-through)
function setupUiohook() {
  try {
    logHK("Trying to load uiohook-napi…");
    const lib = require("uiohook-napi");
    uIOhook = lib.uIOhook;
    logHK("uiohook loaded OK");
  } catch (e) {
    logHK("uiohook FAILED to load -> fallback", e?.message || e);
    usingUiohook = false;
    sendHotkeysMode();
    refreshHotkeyEngine();
    return;
  }

  usingUiohook = true;
  sendHotkeysMode();

  let lastToggle = 0;
  let lastSwap = 0;
  const RATE = 180;

  uIOhook.on("keydown", (e) => {
    logHK("uiohook keydown", {
      keycode: e.keycode,
      captureState: !!captureState,
      now: Date.now(),
      blockUntil: captureWaitUntil,
    });

    // si on est en capture : stocker le code; finaliser si label déjà là, sinon attendre un chouïa
    if (captureState) {
      captureState.code = e.keycode;
      logHK("code captured (uiohook)", {
        type: captureState.type,
        code: e.keycode,
      });
      if (captureState.label) {
        finalizeCapture("have both");
      } else {
        if (captureState.secondaryTimer)
          clearTimeout(captureState.secondaryTimer);
        captureState.secondaryTimer = setTimeout(
          () => finalizeCapture("after-code-wait"),
          600
        );
      }
      return;
    }

    // normal: déclenchement (pass-through)
    if (!overlayWindow || overlayWindow.isDestroyed()) return;
    if (Date.now() < captureWaitUntil) {
      logHK("DISPATCH BLOCKED (capturing)");
      return;
    }

    const now = Date.now();
    if (hotkeys.start && e.keycode === hotkeys.start) {
      if (now - lastToggle < RATE) return;
      lastToggle = now;
      logHK("DISPATCH toggle via uiohook");
      overlayWindow.webContents.send("global-hotkey", { type: "toggle" });
    } else if (hotkeys.swap && e.keycode === hotkeys.swap) {
      if (now - lastSwap < RATE) return;
      lastSwap = now;
      logHK("DISPATCH swap via uiohook");
      overlayWindow.webContents.send("global-hotkey", { type: "swap" });
    }
  });

  try {
    uIOhook.start();
    logHK("uiohook started");
  } catch (e) {
    logHK("uiohook START failed -> fallback", e?.message || e);
    usingUiohook = false;
    sendHotkeysMode();
    refreshHotkeyEngine();
  }
}

if (!app.requestSingleInstanceLock()) { app.quit(); } 
else {
  app.on('second-instance', () => {
    if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); }
  });
}

function applyProdCSP(){
  if (isDev) return;
  session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    const csp = "default-src 'self' data: blob:; img-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self';";
    cb({ responseHeaders: { ...details.responseHeaders, "Content-Security-Policy": [csp] } });
  });
}

/* -------------------- lifecycle -------------------- */
app.whenReady().then(() => {
  applyProdCSP();
  createMainWindow();
  setupIPC();
  setupUiohook();
  if (isDev) setTimeout(createOverlayWindow, 800);
});
app.on("will-quit", () => {
  try {
    if (usingUiohook) uIOhook.stop();
  } catch {}
  try {
    globalShortcut.unregisterAll();
  } catch {}
});
app.on("window-all-closed", () => {
  app.quit();
});
