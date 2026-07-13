/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */
/** @typedef {{ start: number | HotkeyChord | null, reset: number | HotkeyChord | null, swap: number | HotkeyChord | null }} HotkeyCodes */
/** @typedef {{ start: string | null, reset: string | null, swap: string | null }} HotkeyLabels */
/** @typedef {{ x: number, y: number, scale: number, locked: boolean, alwaysOnTop: boolean, nameTheme: string, accentKey: string, autoScoreEnabled: boolean, autoScoreThresholdSec: number }} OverlaySettings */
/** @typedef {{ player1: { name: string, score: number }, player2: { name: string, score: number } }} TimerData */
const { createSenderGuard } = require("./security.cjs");
const { parseOverlayPatch, parseTimerData, parseHotkeyPatch, parseDimensions, parsePointer } = require("./validation.cjs");

/**
 * @typedef {object} IpcContext
 * @property {typeof import("electron").ipcMain} ipcMain
 * @property {typeof import("electron").app} app
 * @property {typeof import("electron").shell} shell
 * @property {typeof import("../windows/windows.cjs")} windows
 * @property {typeof import("../input/uiohook.cjs")} uio
 * @property {typeof import("../hotkeys/capture.cjs")} capture
 * @property {{ get: <T>(key: string, fallback: T) => T, set: (key: string, value: unknown) => void }} store
 * @property {boolean} isDev
 * @property {() => Electron.BrowserWindow | null} getMainWindow
 * @property {(window: Electron.BrowserWindow | null) => void} setMainWindow
 * @property {() => Electron.BrowserWindow | null} getOverlayWindow
 * @property {(window: Electron.BrowserWindow | null) => void} setOverlayWindow
 * @property {() => OverlaySettings} getOverlaySettings
 * @property {(settings: OverlaySettings) => void} setOverlaySettings
 * @property {() => TimerData} getTimerData
 * @property {(data: TimerData) => void} setTimerData
 * @property {() => { width: number, height: number }} getBaseDims
 * @property {(dims: { width: number, height: number }) => void} setBaseDims
 * @property {() => HotkeyCodes} getHotkeys
 * @property {(codes: HotkeyCodes) => void} setHotkeys
 * @property {() => HotkeyLabels} getHotkeyLabels
 * @property {(labels: HotkeyLabels) => void} setHotkeyLabels
 * @property {() => HotkeyLabels} getMouseBinds
 * @property {(binds: HotkeyLabels) => void} setMouseBinds
 * @property {() => boolean} getUsingUiohook
 * @property {() => boolean} runtimeNeedsUiohook
 * @property {() => void} refreshInputRuntime
 * @property {() => { toggle: string[], swap: string[] }} getGamepadMapping
 * @property {(action: "toggle" | "swap") => void} clearGamepadMapping
 * @property {(settings: OverlaySettings) => void} persistOverlaySettings
 * @property {(data: TimerData) => void} persistTimerData
 * @property {(codes: HotkeyCodes) => void} persistHotkeys
 * @property {(labels: HotkeyLabels) => void} persistHotkeyLabels
 * @property {(binds: HotkeyLabels) => void} persistMouseBinds
 * @property {(assertSender: (event: Electron.IpcMainInvokeEvent) => void) => void} registerUpdaterIpc
 */

/** @param {IpcContext} context */
function registerAppIpc(context) {
  const { ipcMain } = context;
  const assertSender = createSenderGuard(context);
  ipcMain.handle("overlay-show", (event) => {
    assertSender(event, "panel");
    const overlay = context.windows.createOverlayWindow(context.getOverlayWindow(), context.getMainWindow());
    context.setOverlayWindow(overlay);
    return true;
  });
  ipcMain.handle("overlay-hide", (event) => {
    assertSender(event, "panel");
    const overlay = context.getOverlayWindow();
    if (overlay && !overlay.isDestroyed()) overlay.close();
    context.setOverlayWindow(null);
    context.getMainWindow()?.webContents.send("overlay-ready", false);
    return true;
  });
  ipcMain.handle("overlay-settings-update", (event, settings) => {
    assertSender(event, "panel");
    const patch = /** @type {Partial<OverlaySettings>} */ (parseOverlayPatch(settings));
    const next = { ...context.getOverlaySettings(), ...patch };
    context.setOverlaySettings(next);
    context.persistOverlaySettings(next);
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed()) return true;
    if (patch.locked !== undefined) {
      overlay.setIgnoreMouseEvents(next.locked);
      overlay.setFocusable(true);
    }
    if (patch.alwaysOnTop !== undefined) context.windows.applyAlwaysOnTop(overlay, next.alwaysOnTop);
    if (patch.x !== undefined || patch.y !== undefined) {
      const bounds = overlay.getBounds();
      overlay.setPosition(patch.x ?? bounds.x, patch.y ?? bounds.y);
    }
    if (patch.scale !== undefined || patch.locked !== undefined)
      context.windows.recomputeOverlaySize(overlay, context.store, context.getBaseDims);
    context.windows.sendOverlaySettings(overlay, context.store, context.isDev);
    return true;
  });
  ipcMain.handle("overlay-measure", (event, value) => {
    assertSender(event, "overlay");
    const dims = parseDimensions(value);
    const next = { width: Math.max(1, Math.floor(dims.width)), height: Math.max(1, Math.floor(dims.height)) };
    const current = context.getBaseDims();
    if (current.width !== next.width || current.height !== next.height) {
      context.setBaseDims(next);
      context.windows.recomputeOverlaySize(context.getOverlayWindow(), context.store, context.getBaseDims);
    }
    return true;
  });
  ipcMain.handle("overlay-drag-start", (event, value) => {
    assertSender(event, "overlay");
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed() || context.getOverlaySettings().locked) return null;
    return context.windows.beginOverlayDrag(overlay, parsePointer(value));
  });
  ipcMain.handle("overlay-drag-move", (event, value) => {
    assertSender(event, "overlay");
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed() || context.getOverlaySettings().locked) return null;
    return context.windows.updateOverlayDrag(overlay, parsePointer(value));
  });
  ipcMain.handle("overlay-drag-end", (event) => {
    assertSender(event, "overlay");
    const overlay = context.getOverlayWindow();
    if (!overlay || overlay.isDestroyed()) return null;
    return context.windows.endOverlayDrag(overlay);
  });
  ipcMain.handle("overlay-edit-scale", (event, direction) => {
    assertSender(event, "overlay");
    if (direction !== -1 && direction !== 1) throw new TypeError("Invalid scale direction");
    const current = context.getOverlaySettings();
    if (current.locked) return current.scale;
    const scale = Math.min(200, Math.max(50, Math.round(current.scale / 5) * 5 + direction * 5));
    if (scale === current.scale) return scale;
    const next = { ...current, scale };
    context.setOverlaySettings(next); context.persistOverlaySettings(next);
    const overlay = context.getOverlayWindow();
    context.windows.recomputeOverlaySize(overlay, context.store, context.getBaseDims);
    return scale;
  });
  ipcMain.handle("overlay-edit-lock", (event) => {
    assertSender(event, "overlay");
    const current = context.getOverlaySettings();
    const next = { ...current, locked: true };
    context.setOverlaySettings(next); context.persistOverlaySettings(next);
    const overlay = context.getOverlayWindow();
    if (overlay && !overlay.isDestroyed()) {
      context.windows.endOverlayDrag(overlay);
      overlay.setIgnoreMouseEvents(true);
      context.windows.sendOverlaySettings(overlay, context.store, context.isDev);
    }
    return true;
  });
  ipcMain.handle("timer-data-get", (event) => { assertSender(event, "both"); return context.getTimerData(); });
  ipcMain.handle("timer-data-set", (event, data) => {
    assertSender(event, "both");
    const timerData = parseTimerData(data);
    context.setTimerData(timerData);
    context.persistTimerData(timerData);
    context.getOverlayWindow()?.webContents.send("timer-data-sync", timerData);
    return true;
  });
  ipcMain.handle("hotkeys-get", (event) => { assertSender(event, "panel"); return { ...context.getHotkeys(), startLabel: context.getHotkeyLabels().start, resetLabel: context.getHotkeyLabels().reset, swapLabel: context.getHotkeyLabels().swap, mode: context.getUsingUiohook() ? "pass-through" : "fallback", uiohookLoaded: context.uio.isLoaded() }; });
  ipcMain.handle("gamepad-mapping-get", (event) => { assertSender(event, "panel"); return context.getGamepadMapping(); });
  ipcMain.handle("gamepad-mapping-clear", (event, action) => {
    assertSender(event, "panel");
    if (action !== "toggle" && action !== "swap") throw new TypeError("Invalid gamepad action");
    context.clearGamepadMapping(action === "swap" ? "swap" : "toggle");
    return context.getGamepadMapping();
  });
  ipcMain.handle("hotkeys-set", (event, patch) => {
    assertSender(event, "panel");
    const next = { ...context.getHotkeys(), ...parseHotkeyPatch(patch) };
    context.setHotkeys(next); context.persistHotkeys(next); context.refreshInputRuntime();
    return true;
  });
  ipcMain.handle("hotkeys-clear", (event, action) => {
    assertSender(event, "panel");
    if (action !== "start" && action !== "reset" && action !== "swap") throw new TypeError("Invalid hotkey action");
    const key = action;
    const codes = { ...context.getHotkeys(), [key]: null };
    const labels = { ...context.getHotkeyLabels(), [key]: key === "start" ? "F1" : key === "swap" ? "F2" : null };
    const binds = { ...context.getMouseBinds(), [key]: null };
    context.setHotkeys(codes); context.setHotkeyLabels(labels); context.setMouseBinds(binds);
    context.persistHotkeys(codes); context.persistHotkeyLabels(labels); context.persistMouseBinds(binds);
    context.refreshInputRuntime();
    return { ...codes, startLabel: labels.start, resetLabel: labels.reset, swapLabel: labels.swap };
  });
  ipcMain.handle("hotkeys-restart-hooks", (event) => {
    assertSender(event, "panel");
    if (!context.capture.isCapturing() && context.runtimeNeedsUiohook()) {
      if (context.uio.isRunning()) context.uio.restart();
      else context.uio.enable("runtime");
    }
    return true;
  });
  context.capture.setupCaptureIPC((event) => assertSender(event, "panel"));
  ipcMain.handle("win-minimize", (event) => { assertSender(event, "panel"); context.getMainWindow()?.minimize(); return true; });
  ipcMain.handle("win-maximize", (event) => {
    assertSender(event, "panel");
    const window = context.getMainWindow();
    if (!window || window.isDestroyed()) return false;
    if (window.isMaximized()) window.unmaximize(); else window.maximize();
    return window.isMaximized();
  });
  ipcMain.handle("win-close", (event) => { assertSender(event, "panel"); context.getMainWindow()?.close(); return true; });
  ipcMain.handle("win-is-maximized", (event) => { assertSender(event, "panel"); return context.getMainWindow()?.isMaximized() ?? false; });
  ipcMain.handle("app-version", (event) => { assertSender(event, "panel"); return context.app.getVersion(); });
  ipcMain.handle("open-premium", (event) => { assertSender(event, "panel"); return context.shell.openExternal("https://dbdoverlaytools.com/"); });
  ipcMain.handle("open-log-folder", (event) => { assertSender(event, "panel"); context.shell.openPath(context.app.getPath("logs")); return true; });
  context.registerUpdaterIpc((event) => assertSender(event, "panel"));
}

module.exports = { registerAppIpc };
