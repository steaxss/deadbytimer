const { contextBridge, ipcRenderer } = require('electron');

/** @typedef {import('../src/types/ipc').RendererApi} RendererApi */

/**
 * @template T
 * @param {string} channel
 * @param {(value: T) => void} callback
 */
function subscribe(channel, callback) {
  /** @param {Electron.IpcRendererEvent} _event @param {T} value */
  const handler = (_event, value) => callback(value);
  ipcRenderer.on(channel, handler);
  return () => ipcRenderer.removeListener(channel, handler);
}

/** @type {RendererApi} */
const api = {
  overlay: {
    show: () => ipcRenderer.invoke('overlay-show'),
    hide: () => ipcRenderer.invoke('overlay-hide'),
    updateSettings: (s) => ipcRenderer.invoke('overlay-settings-update', s),
    onReady: (cb) => subscribe('overlay-ready', cb),
    onSettings: (cb) => subscribe('overlay-settings', cb),
    measure: (w, h) => ipcRenderer.invoke('overlay-measure', { width: w, height: h }),
    beginDrag: (pointer) => ipcRenderer.invoke('overlay-drag-start', pointer),
    moveDrag: (pointer) => ipcRenderer.invoke('overlay-drag-move', pointer),
    endDrag: () => ipcRenderer.invoke('overlay-drag-end'),
    scaleBy: (direction) => ipcRenderer.invoke('overlay-edit-scale', direction),
    lock: () => ipcRenderer.invoke('overlay-edit-lock')
  },
  timer: {
    get: () => ipcRenderer.invoke('timer-data-get'),
    set: (data) => ipcRenderer.invoke('timer-data-set', data),
    onSync: (cb) => subscribe('timer-data-sync', cb)
  },
  hotkeys: {
    get: () => ipcRenderer.invoke('hotkeys-get'),
    set: (hk) => ipcRenderer.invoke('hotkeys-set', hk),
    clear: (action) => ipcRenderer.invoke('hotkeys-clear', action),
    restartHooks: () => ipcRenderer.invoke('hotkeys-restart-hooks'),
    capture: (arg1, arg2) => ipcRenderer.invoke('hotkeys-capture', arg1, arg2),
    cancel: () => ipcRenderer.invoke('hotkeys-capture-cancel'),
    onCaptured: (cb) => subscribe('hotkeys-captured', cb),
    on: (cb) => subscribe('global-hotkey', cb),
    onMode: (cb) => subscribe('hotkeys-mode', cb)
  },
  gamepad: {
    get: () => ipcRenderer.invoke('gamepad-mapping-get'),
    clear: (action) => ipcRenderer.invoke('gamepad-mapping-clear', action),
  },
  updater: {
    startDownload: () => ipcRenderer.invoke('updater-start-download'),
    installNow: () => ipcRenderer.invoke('updater-install-now'),
    onAvailable: (cb) => subscribe('update-available', cb),
    onProgress: (cb) => subscribe('update-download-progress', cb),
    onDownloaded: (cb) => subscribe('update-downloaded', cb),
    onError: (cb) => subscribe('update-error', cb),
    openReleases: () => ipcRenderer.invoke('updater-open-releases'),
  },
  win: {
    minimize: () => ipcRenderer.invoke('win-minimize'),
    maximize: () => ipcRenderer.invoke('win-maximize'),
    close: () => ipcRenderer.invoke('win-close'),
    isMaximized: () => ipcRenderer.invoke('win-is-maximized'),
    onMaximizeChange: (cb) => subscribe('win-maximize-change', cb),
    getVersion: () => ipcRenderer.invoke('app-version'),
    openPremium: () => ipcRenderer.invoke('open-premium'),
    openLogFolder: () => ipcRenderer.invoke('open-log-folder'),
    openDbdConfigFolder: () => ipcRenderer.invoke('open-dbd-config-folder'),
    copySetupText: (kind) => ipcRenderer.invoke('copy-setup-text', kind),
  }
};

contextBridge.exposeInMainWorld('api', api);
