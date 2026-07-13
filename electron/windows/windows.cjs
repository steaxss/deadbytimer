// electron/windows/windows.cjs
const { BrowserWindow, shell, screen } = require("electron");
const { join } = require("node:path");
const log = require("electron-log");
const { clampToDisplay, findBestDisplay, snapBounds } = require("./overlay-layout.cjs");

/** @typedef {{ width: number, height: number }} Dimensions */
/** @typedef {{ x?: number, y?: number, width?: number, height?: number }} WindowState */
/** @typedef {{ x: number, y: number, scale: number, locked: boolean, alwaysOnTop: boolean, nameTheme?: string, accentKey?: string, autoScoreEnabled?: boolean, autoScoreThresholdSec?: number }} OverlaySettings */
/** @typedef {{ player1: { name: string, score: number }, player2: { name: string, score: number } }} TimerData */
/** @typedef {{ get: <T>(key: string, fallback: T) => T, set: (key: string, value: unknown) => void }} StoreLike */

/** @type {StoreLike | null} */
let store = null;
let iconPath = "";
let isDev = false;
let baseDims = { width: 520, height: 120 };
/** @type {() => Dimensions} */
let _getBaseDims = () => baseDims;
/** @type {(width: number, height: number) => void} */
let _setBaseDims = (w, h) => (baseDims = { width: w, height: h });
/** @type {((x: number, y: number) => void) | null} */
let _onOverlayMove = null;
/** @type {((ready: boolean) => void) | null} */
let _onOverlayReadyChange = null;

/** @type {Electron.BrowserWindow | null} */
let mainWindow = null;
/** @type {Electron.BrowserWindow | null} */
let overlayWindow = null;
let sessionSecurityConfigured = false;
/** @type {{ bounds: Electron.Rectangle, pointer: { x: number, y: number } } | null} */
let overlayDragSession = null;

/** @param {Electron.Session} targetSession */
function configureSessionSecurity(targetSession) {
  if (sessionSecurityConfigured) return;
  sessionSecurityConfigured = true;
  targetSession.setPermissionCheckHandler(() => false);
  targetSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  targetSession.setDevicePermissionHandler(() => false);
}

/** @param {StoreLike | null} [candidate] */
function requireStore(candidate = store) {
  if (!candidate) throw new Error("Windows store is not initialized");
  return candidate;
}

/** @param {{ store: StoreLike, iconPath: string, isDev: boolean, baseDims?: Dimensions, getBaseDims?: () => Dimensions, setBaseDims?: (width: number, height: number) => void, onOverlayMove?: (x: number, y: number) => void, onOverlayReadyChange?: (ready: boolean) => void }} ctx */
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

/** @param {Electron.BrowserWindow} win @param {boolean} on */
function applyAlwaysOnTop(win, on) {
  try {
    win.setAlwaysOnTop(!!on, "screen-saver");
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setFullScreenable(false);
  } catch (error) {
    log.warn("Failed to apply overlay workspace policy", error);
  }
}

/** @param {Electron.BrowserWindow | null} win */
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

/** @param {Electron.BrowserWindow | null} ov @param {StoreLike | null} storeRef @param {boolean} _isDevFlag */
function sendOverlaySettings(ov, storeRef, _isDevFlag) {
  const s = requireStore(storeRef).get("overlaySettings", {
    x: 0,
    y: 0,
    scale: 100,
    locked: true,
    alwaysOnTop: true,
    nameTheme: 'default',
    accentKey: 'default',
    autoScoreEnabled: true,
    autoScoreThresholdSec: 25,
  });
  if (ov && !ov.isDestroyed()) {
    ov.webContents.send("overlay-settings", s);
  }
  // Also push to main window so the control panel always reflects persisted settings
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("overlay-settings", s);
  }
}

/** @param {Electron.BrowserWindow | null} ov @param {StoreLike | null} storeRef @param {(() => Dimensions) | null} getBaseDims */
function recomputeOverlaySize(ov, storeRef, getBaseDims) {
  if (!ov || ov.isDestroyed()) return;
  const s =
    requireStore(storeRef).get("overlaySettings", { scale: 100, locked: true });
  const scale = (s.scale || 100) / 100;
  const dims = (getBaseDims || _getBaseDims)();
  const w = Math.round(dims.width * scale);
  const h = Math.round(dims.height * scale);
  const [cw, ch] = typeof ov.getContentSize === 'function' ? ov.getContentSize() : ov.getSize();
  if (cw !== w || ch !== h) {
    ov.setContentSize(w, h);
  }
  sendOverlaySettings(ov, storeRef, isDev);
}

/** @param {StoreLike} storeRef @param {string} icoPath @param {boolean} isDevFlag */
function createMainWindow(storeRef, icoPath, isDevFlag) {
  const saved = requireStore(storeRef).get("windowState", /** @type {WindowState} */ ({}));
  const width = Math.max(saved.width || 1120, 980);
  const height = Math.max(saved.height || 820, 720);
  const position = typeof saved.x === "number" && typeof saved.y === "number"
    ? { x: saved.x, y: saved.y } : {};

  const window = new BrowserWindow({
    width,
    height,
    ...position,
    minWidth: 980,
    minHeight: 720,
    show: false,
    frame: false,
    icon: icoPath || iconPath,
    autoHideMenuBar: true,
    backgroundColor: '#09090b',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: join(__dirname, "../preload.cjs"),
      devTools: !!isDevFlag || isDev,
    },
  });
  mainWindow = window;
  configureSessionSecurity(window.webContents.session);

  window.setMenuBarVisibility(false);
  enforceExternalLinks(window);

  // Bloque Alt menu (évite le flash de barre menu)
  window.webContents.on("before-input-event", (event, input) => {
    if (
      input.type === "keyDown" &&
      (input.key === "Alt" || input.code === "AltLeft" || input.code === "AltRight")
    ) {
      event.preventDefault();
    }
  });

  if (!!isDevFlag || isDev) {
    window.loadURL("http://localhost:5173");
    window.webContents.openDevTools({ mode: "detach" });
  } else {
    window.loadFile(join(__dirname, "../../dist/index.html"));
    // Bloque F12 / Ctrl+Shift+I en prod (existant côté panel)
    window.webContents.on("before-input-event", (e, input) => {
      const combo =
        (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
      if (combo || input.key === "F12") e.preventDefault();
    });
  }

  window.once("ready-to-show", () => window.show());
  window.on("close", () => {
    const b = window.getBounds();
    requireStore(storeRef).set("windowState", b);
  });
  window.on("closed", () => {
    mainWindow = null;
    if (overlayWindow) overlayWindow.close();
  });

  // Notify renderer of maximize state changes (for custom titlebar icon)
  window.on("maximize", () => {
    if (!window.isDestroyed())
      window.webContents.send("win-maximize-change", true);
  });
  window.on("unmaximize", () => {
    if (!window.isDestroyed())
      window.webContents.send("win-maximize-change", false);
  });

  return window;
}

/** @param {Electron.BrowserWindow | null} currentOverlay @param {Electron.BrowserWindow | null} _currentMain */
function createOverlayWindow(currentOverlay, _currentMain) {
  if (currentOverlay && !currentOverlay.isDestroyed()) {
    currentOverlay.show();
    currentOverlay.focus();
    overlayWindow = currentOverlay;
    return overlayWindow;
  }

  const activeStore = requireStore();
  const s = activeStore.get("overlaySettings", /** @type {OverlaySettings} */ ({
    x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true,
  }));
  const pd = screen.getPrimaryDisplay();
  const origin = pd.bounds;

  if (!Number.isFinite(s.x)) s.x = origin.x;
  if (!Number.isFinite(s.y)) s.y = origin.y;
  if (typeof s.scale !== "number") s.scale = 100;
  if (typeof s.locked !== "boolean") s.locked = true;
  if (typeof s.alwaysOnTop !== "boolean") s.alwaysOnTop = true;
  activeStore.set("overlaySettings", s);

  const scale = (s.scale || 100) / 100;
  const dims = _getBaseDims();

  const window = new BrowserWindow({
    width: Math.ceil(dims.width * scale),
    height: Math.ceil(dims.height * scale),
    x: s.x,
    y: s.y,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,
    title: "DBD Timer Overlay by Steaxs & Doc",
    icon: iconPath,
    acceptFirstMouse: true,
    backgroundColor: "#00000000",
    useContentSize: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: join(__dirname, "../preload.cjs"),
      backgroundThrottling: false,
      devTools: !!isDev,
      webgl: false,
      enableWebSQL: false,
    },
  });
  overlayWindow = window;

  window.setIgnoreMouseEvents(!!s.locked);
  applyAlwaysOnTop(window, s.alwaysOnTop);

  const url = isDev
    ? "http://localhost:5173/overlay.html"
    : join(__dirname, "../../dist/overlay.html");
  if (isDev) {
    window.loadURL(url);
    // Open DevTools automatically in dev mode
    window.webContents.once('did-finish-load', () => {
      window.webContents.openDevTools({ mode: "detach" });
    });
  } else {
    window.loadFile(url);
  }

  enforceExternalLinks(window);

  if (!isDev) {
    window.webContents.on("before-input-event", (e, input) => {
      const combo =
        (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
      if (combo || input.key === "F12") e.preventDefault();
    });
  }

  window.on("closed", () => {
    overlayWindow = null;
    _onOverlayReadyChange && _onOverlayReadyChange(false);
  });
  window.on("move", () => {
    const b = window.getBounds();
    _onOverlayMove && _onOverlayMove(b.x, b.y);
  });

  window.webContents.on("did-finish-load", () => {
    const data =
      activeStore.get("timerData", /** @type {TimerData} */ ({
        player1: { name: "Player 1", score: 0 },
        player2: { name: "Player 2", score: 0 },
      }));
    window.webContents.send("timer-data-sync", data);

    sendOverlaySettings(window, activeStore, isDev);
    recomputeOverlaySize(window, activeStore, _getBaseDims);

    _onOverlayReadyChange && _onOverlayReadyChange(true);
    window.show();
  });

  return window;
}

/** @param {Electron.BrowserWindow} window @param {{ x: number, y: number }} pointer */
function beginOverlayDrag(window, pointer) {
  const bounds = window.getBounds();
  overlayDragSession = { bounds, pointer };
  return { bounds, snapTarget: null };
}

/** @param {Electron.BrowserWindow} window @param {{ x: number, y: number }} pointer */
function updateOverlayDrag(window, pointer) {
  if (!overlayDragSession) return null;
  const bounds = {
    ...overlayDragSession.bounds,
    x: overlayDragSession.bounds.x + pointer.x - overlayDragSession.pointer.x,
    y: overlayDragSession.bounds.y + pointer.y - overlayDragSession.pointer.y,
  };
  const result = snapBounds(bounds, pointer, screen.getAllDisplays(), screen.getPrimaryDisplay());
  window.setBounds(result.bounds, false);
  return result;
}

/** @param {Electron.BrowserWindow} window */
function endOverlayDrag(window) {
  overlayDragSession = null;
  const current = window.getBounds();
  const displays = screen.getAllDisplays();
  const display = findBestDisplay(current, displays) || screen.getPrimaryDisplay();
  const bounds = clampToDisplay(current, display);
  window.setBounds(bounds, false);
  _onOverlayMove && _onOverlayMove(bounds.x, bounds.y);
  return { bounds, snapTarget: null };
}

module.exports = {
  initWindows,
  createMainWindow,
  createOverlayWindow,
  enforceExternalLinks,
  applyAlwaysOnTop,
  sendOverlaySettings,
  recomputeOverlaySize,
  beginOverlayDrag,
  updateOverlayDrag,
  endOverlayDrag,

  getMainWindow: () => mainWindow,
  getOverlayWindow: () => overlayWindow,
};
