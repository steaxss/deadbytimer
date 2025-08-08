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
    on: (cb) => ipcRenderer.on('global-hotkey', (_, payload) => cb(payload))
  }
});
