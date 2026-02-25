const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  overlay: {
    show: () => ipcRenderer.invoke('overlay-show'),
    hide: () => ipcRenderer.invoke('overlay-hide'),
    updateSettings: (s) => ipcRenderer.invoke('overlay-settings-update', s),
    onReady: (cb) => {
      const handler = (_, v) => cb(v);
      ipcRenderer.on('overlay-ready', handler);
      return () => ipcRenderer.removeListener('overlay-ready', handler);
    },
    onSettings: (cb) => {
      const handler = (_, s) => cb(s);
      ipcRenderer.on('overlay-settings', handler);
      return () => ipcRenderer.removeListener('overlay-settings', handler);
    },
    measure: (w, h) => ipcRenderer.invoke('overlay-measure', { width: w, height: h })
  },
  timer: {
    get: () => ipcRenderer.invoke('timer-data-get'),
    set: (data) => ipcRenderer.invoke('timer-data-set', data),
    onSync: (cb) => {
      const handler = (_, d) => cb(d);
      ipcRenderer.on('timer-data-sync', handler);
      return () => ipcRenderer.removeListener('timer-data-sync', handler);
    }
  },
  hotkeys: {
    get: () => ipcRenderer.invoke('hotkeys-get'),
    set: (hk) => ipcRenderer.invoke('hotkeys-set', hk),
    clear: (action) => ipcRenderer.invoke('hotkeys-clear', action),
    capture: (arg1, arg2) => ipcRenderer.invoke('hotkeys-capture', arg1, arg2),
    cancel: () => ipcRenderer.invoke('hotkeys-capture-cancel'),
    onCaptured: (cb) => {
      const handler = (_, p) => cb(p);
      ipcRenderer.on('hotkeys-captured', handler);
      return () => ipcRenderer.removeListener('hotkeys-captured', handler);
    },
    on: (cb) => {
      const handler = (_, payload) => cb(payload);
      ipcRenderer.on('global-hotkey', handler);
      return () => ipcRenderer.removeListener('global-hotkey', handler);
    },
    onMode: (cb) => {
      const handler = (_, mode) => cb(mode);
      ipcRenderer.on('hotkeys-mode', handler);
      return () => ipcRenderer.removeListener('hotkeys-mode', handler);
    }
  },
  gamepad: {
    get: () => ipcRenderer.invoke('gamepad-mapping-get'),
    clear: (action) => ipcRenderer.invoke('gamepad-mapping-clear', action),
  },
  updater: {
    startDownload: () => ipcRenderer.invoke('updater-start-download'),
    installNow: () => ipcRenderer.invoke('updater-install-now'),
    onAvailable: (cb) => {
      const handler = (_, data) => cb(data);
      ipcRenderer.on('update-available', handler);
      return () => ipcRenderer.removeListener('update-available', handler);
    },
    onProgress: (cb) => {
      const handler = (_, data) => cb(data);
      ipcRenderer.on('update-download-progress', handler);
      return () => ipcRenderer.removeListener('update-download-progress', handler);
    },
    onDownloaded: (cb) => {
      const handler = (_, data) => cb(data);
      ipcRenderer.on('update-downloaded', handler);
      return () => ipcRenderer.removeListener('update-downloaded', handler);
    },
    onError: (cb) => {
      const handler = (_, data) => cb(data);
      ipcRenderer.on('update-error', handler);
      return () => ipcRenderer.removeListener('update-error', handler);
    },
  },
  win: {
    minimize: () => ipcRenderer.invoke('win-minimize'),
    maximize: () => ipcRenderer.invoke('win-maximize'),
    close: () => ipcRenderer.invoke('win-close'),
    isMaximized: () => ipcRenderer.invoke('win-is-maximized'),
    onMaximizeChange: (cb) => {
      const handler = (_, v) => cb(v);
      ipcRenderer.on('win-maximize-change', handler);
      return () => ipcRenderer.removeListener('win-maximize-change', handler);
    },
    getVersion: () => ipcRenderer.invoke('app-version'),
  }
});
