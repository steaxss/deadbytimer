// electron/windows/windows.cjs
const { BrowserWindow, shell, screen, Menu } = require("electron");
const { join } = require("node:path");

let store = null;
let iconPath = "";
let isDev = false;
let baseDims = { width: 520, height: 120 };
let _getBaseDims = () => baseDims;
let _setBaseDims = (w, h) => (baseDims = { width: w, height: h });
let _onOverlayMove = null;
let _onOverlayReadyChange = null;

let mainWindow = null;
let overlayWindow = null;

function initWindows(ctx) {
  store = ctx.store;
  iconPath = ctx.iconPath;
  isDev = !!ctx.isDev;
  baseDims = ctx.baseDims || baseDims;
  _getBaseDims = ctx.getBaseDims || _getBaseDims;
  _setBaseDims = ctx.setBaseDims || _setBaseDims;
  _onOverlayMove = ctx.onOverlayMove || null;
  _onOverlayReadyChange = ctx.onOverlayReadyChange || null;
}

function applyAlwaysOnTop(win, on) {
  try {
    win.setAlwaysOnTop(!!on, "screen-saver");
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setFullScreenable(false);
  } catch {}
}

function enforceExternalLinks(win) {
  if (!win || win.isDestroyed()) return;

  // window.open / target=_blank
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "deny" };
  });

  // Drag’n’drop/lien cliqué qui tenterait une navigation
  win.webContents.on("will-navigate", (e, url) => {
    const isLocal = url.startsWith("file:") || url.startsWith("http://localhost");
    if (!isLocal && /^https?:\/\//i.test(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  // Pas de menu « Inspecter » en prod
  if (!isDev) win.webContents.on("context-menu", (e) => e.preventDefault());
}

function sendOverlaySettings(ov, storeRef, isDevFlag) {
  if (ov && !ov.isDestroyed()) {
    const s = (storeRef || store).get("overlaySettings", {
      x: 0,
      y: 0,
      scale: 100,
      locked: true,
      alwaysOnTop: true,
      nameTheme: 'default',
      accentKey: 'default',
      autoScoreEnabled: true,    // ← NEW
      autoScoreThresholdSec: 25, // ← NEW
    });
    ov.webContents.send("overlay-settings", s);
  }
}

function recomputeOverlaySize(ov, storeRef, getBaseDims) {
  if (!ov || ov.isDestroyed()) return;
  const s =
    (storeRef || store).get("overlaySettings", { scale: 100, locked: true });
  const dragH = s.locked ? 0 : 30;
  const scale = (s.scale || 100) / 100;
  const dims = (getBaseDims || _getBaseDims)();
  const w = Math.round(dims.width * scale);
  const h = Math.round((dims.height + dragH) * scale);
  const [cw, ch] = typeof ov.getContentSize === 'function' ? ov.getContentSize() : ov.getSize();
  if (cw !== w || ch !== h) {
    ov.setContentSize(w, h);
  }
  sendOverlaySettings(ov, storeRef, isDev);
}

function createMainWindow(storeRef, icoPath, isDevFlag) {
  const saved = (storeRef || store).get("windowState") || {};
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
    icon: icoPath || iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "../preload.cjs"),
      devTools: !!isDevFlag || isDev,
    },
  });

  Menu.setApplicationMenu?.(null);
  mainWindow.setMenuBarVisibility(false);
  enforceExternalLinks(mainWindow);

  // Bloque Alt menu (évite le flash de barre menu)
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (
      input.type === "keyDown" &&
      (input.key === "Alt" || input.code === "AltLeft" || input.code === "AltRight")
    ) {
      event.preventDefault();
    }
  });

  if (!!isDevFlag || isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(join(__dirname, "../../dist/index.html"));
    // Bloque F12 / Ctrl+Shift+I en prod (existant côté panel)
    mainWindow.webContents.on("before-input-event", (e, input) => {
      const combo =
        (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
      if (combo || input.key === "F12") e.preventDefault();
    });
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("close", () => {
    const b = mainWindow.getBounds();
    (storeRef || store).set("windowState", b);
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (overlayWindow) overlayWindow.close();
  });

  return mainWindow;
}

function createOverlayWindow(currentOverlay, currentMain) {
  if (currentOverlay && !currentOverlay.isDestroyed()) {
    currentOverlay.show();
    currentOverlay.focus();
    overlayWindow = currentOverlay;
    return overlayWindow;
  }

  // --- INIT ROBUSTE ---
  let s = (store || {}).get?.("overlaySettings") || {};
  const pd = screen.getPrimaryDisplay();
  const origin = pd.bounds;

  if (!Number.isFinite(s.x)) s.x = origin.x;
  if (!Number.isFinite(s.y)) s.y = origin.y;
  if (typeof s.scale !== "number") s.scale = 100;
  if (typeof s.locked !== "boolean") s.locked = true;
  if (typeof s.alwaysOnTop !== "boolean") s.alwaysOnTop = true;
  store.set("overlaySettings", s);
  // --- FIN INIT ROBUSTE

  const dragH = s.locked ? 0 : 30;
  const scale = (s.scale || 100) / 100;
  const dims = _getBaseDims();

  overlayWindow = new BrowserWindow({
    width: Math.ceil(dims.width * scale),
    height: Math.ceil((dims.height + dragH) * scale),
    x: s.x,
    y: s.y,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,
    title: "DBD Timer Overlay by Steaxs & Doc",
    acceptFirstMouse: true,
    backgroundColor: "#00000000",
    useContentSize: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "../preload.cjs"),
      backgroundThrottling: false,
      devTools: !!isDev,
    },
  });

  overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
  applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);

  const url = isDev
    ? "http://localhost:5173/overlay.html"
    : join(__dirname, "../../dist/overlay.html");
  if (isDev) overlayWindow.loadURL(url);
  else overlayWindow.loadFile(url);

  enforceExternalLinks(overlayWindow);

  if (!isDev) {
    overlayWindow.webContents.on("before-input-event", (e, input) => {
      const combo =
        (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
      if (combo || input.key === "F12") e.preventDefault();
    });
  }

  overlayWindow.on("closed", () => {
    overlayWindow = null;
    _onOverlayReadyChange && _onOverlayReadyChange(false);
  });
  overlayWindow.on("move", () => {
    const b = overlayWindow.getBounds();
    _onOverlayMove && _onOverlayMove(b.x, b.y);
  });

  overlayWindow.webContents.on("did-finish-load", () => {
    const data =
      store.get("timerData") || {
        player1: { name: "Player 1", score: 0 },
        player2: { name: "Player 2", score: 0 },
      };
    overlayWindow.webContents.send("timer-data-sync", data);

    sendOverlaySettings(overlayWindow, store, isDev);
    recomputeOverlaySize(overlayWindow, store, _getBaseDims);

    _onOverlayReadyChange && _onOverlayReadyChange(true);
    overlayWindow.show();
  });

  return overlayWindow;
}

module.exports = {
  initWindows,
  createMainWindow,
  createOverlayWindow,
  enforceExternalLinks,
  applyAlwaysOnTop,
  sendOverlaySettings,
  recomputeOverlaySize,

  // (utiles si besoin)
  getMainWindow: () => mainWindow,
  getOverlayWindow: () => overlayWindow,
};
