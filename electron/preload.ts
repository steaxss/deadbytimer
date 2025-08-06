// electron/preload.ts
const { contextBridge, ipcRenderer } = require('electron');

const api = {
  store: {
    get: (key: string) => ipcRenderer.invoke('store-get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('store-set', key, value),
  },
  
  overlay: {
    show: () => ipcRenderer.invoke('overlay-show'),
    hide: () => ipcRenderer.invoke('overlay-hide'),
    updateSettings: (settings: any) => ipcRenderer.invoke('overlay-settings-update', settings),
    styleChange: (style: string) => ipcRenderer.invoke('overlay-style-change', style),
    
    onTimerUpdate: (callback: (data: any) => void) => {
      ipcRenderer.on('timer-update-display', (_, data) => callback(data));
      return () => ipcRenderer.removeAllListeners('timer-update-display');
    },
    
    onDataSync: (callback: (data: any) => void) => {
      ipcRenderer.on('timer-data-sync', (_, data) => callback(data));
      return () => ipcRenderer.removeAllListeners('timer-data-sync');
    },
    
    onStyleChange: (callback: (style: string) => void) => {
      ipcRenderer.on('overlay-style-change', (_, style) => callback(style));
      return () => ipcRenderer.removeAllListeners('overlay-style-change');
    },
  },
  
  timer: {
    updateDisplay: (data: any) => ipcRenderer.invoke('timer-update-display', data),
    syncData: (data: any) => ipcRenderer.invoke('timer-data-sync', data),
  },
  
  hotkeys: {
    register: (hotkeys: { start: string; swap: string }) => 
      ipcRenderer.invoke('hotkey-register', hotkeys),
    
    onPressed: (callback: (action: string) => void) => {
      ipcRenderer.on('hotkey-pressed', (_, action) => callback(action));
      return () => ipcRenderer.removeAllListeners('hotkey-pressed');
    },
  },
  
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('timer-update-display');
    ipcRenderer.removeAllListeners('timer-data-sync');
    ipcRenderer.removeAllListeners('overlay-style-change');
    ipcRenderer.removeAllListeners('hotkey-pressed');
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);

// Types pour TypeScript (ne seront pas compilés dans le JS final)
declare global {
  interface Window {
    electronAPI: typeof api;
  }
}