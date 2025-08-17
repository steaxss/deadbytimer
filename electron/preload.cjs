const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  overlay: {
    show: () => ipcRenderer.invoke('overlay-show'),
    hide: () => ipcRenderer.invoke('overlay-hide'),
    updateSettings: (s) => ipcRenderer.invoke('overlay-settings-update', s),
    onReady: (cb) => ipcRenderer.on('overlay-ready', (_, v) => cb(v)),
    onSettings: (cb) => ipcRenderer.on('overlay-settings', (_, s) => cb(s)),
    measure: (w, h) => ipcRenderer.invoke('overlay-measure', { width: w, height: h })
  },
  timer: {
    get: () => ipcRenderer.invoke('timer-data-get'),
    set: (data) => ipcRenderer.invoke('timer-data-set', data),
    onSync: (cb) => ipcRenderer.on('timer-data-sync', (_, d) => cb(d))
  },
  hotkeys: {
    get: () => ipcRenderer.invoke('hotkeys-get'),
    set: (hk) => ipcRenderer.invoke('hotkeys-set', hk),
    capture: (arg1, arg2) => ipcRenderer.invoke('hotkeys-capture', arg1, arg2),
    onCaptured: (cb) => ipcRenderer.on('hotkeys-captured', (_, p) => cb(p)),
    on: (cb) => ipcRenderer.on('global-hotkey', (_, payload) => cb(payload)),
    onMode: (cb) => ipcRenderer.on('hotkeys-mode', (_, mode) => cb(mode))
  },
  gamepad: {
    get: () => ipcRenderer.invoke('gamepad-mapping-get'),
    clear: (action) => ipcRenderer.invoke('gamepad-mapping-clear', action),
  }
});