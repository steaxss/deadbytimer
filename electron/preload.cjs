const { contextBridge, ipcRenderer } = require('electron');

const api = {
  store: {
    get: (key) => ipcRenderer.invoke('store-get', key),
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
  },
  
  overlay: {
    show: () => ipcRenderer.invoke('overlay-show'),
    hide: () => ipcRenderer.invoke('overlay-hide'),
    updateSettings: (settings) => ipcRenderer.invoke('overlay-settings-update', settings),
    styleChange: (style) => ipcRenderer.invoke('overlay-style-change', style),
    
    onDataSync: (callback) => {
      ipcRenderer.on('timer-data-sync', (_, data) => callback(data));
      return () => ipcRenderer.removeAllListeners('timer-data-sync');
    },
    
    onStyleChange: (callback) => {
      ipcRenderer.on('overlay-style-change', (_, style) => callback(style));
      return () => ipcRenderer.removeAllListeners('overlay-style-change');
    },
    
    onReady: (callback) => {
      ipcRenderer.on('overlay-ready', (_, isReady) => callback(isReady));
      return () => ipcRenderer.removeAllListeners('overlay-ready');
    },
  },
  
  timer: {
    syncData: (data) => ipcRenderer.invoke('timer-data-sync', data),
  },
  
  hotkeys: {
    register: (hotkeys) => ipcRenderer.invoke('hotkey-register', hotkeys),
    
    onPressed: (callback) => {
      ipcRenderer.on('hotkey-pressed', (_, action) => callback(action));
      return () => ipcRenderer.removeAllListeners('hotkey-pressed');
    },
  },
  
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('timer-data-sync');
    ipcRenderer.removeAllListeners('overlay-style-change');
    ipcRenderer.removeAllListeners('hotkey-pressed');
    ipcRenderer.removeAllListeners('overlay-ready');
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);