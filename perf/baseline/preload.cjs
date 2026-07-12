const { contextBridge, ipcRenderer } = require("electron");

let cachedState = null;
const settingsListeners = new Set();
const timerListeners = new Set();
const hotkeyListeners = new Set();

const stateReady = ipcRenderer.invoke("perf:get-state").then((state) => {
  cachedState = state;
  return state;
});

function subscribe(listeners, callback, initialValue) {
  listeners.add(callback);
  if (initialValue !== undefined) queueMicrotask(() => callback(initialValue));
  return () => listeners.delete(callback);
}

ipcRenderer.on("perf:settings", (_event, settings) => {
  cachedState = { ...cachedState, settings };
  for (const listener of settingsListeners) listener(settings);
});

ipcRenderer.on("perf:timer-data", (_event, timerData) => {
  cachedState = { ...cachedState, timerData };
  for (const listener of timerListeners) listener(timerData);
});

ipcRenderer.on("perf:hotkey", (_event, payload) => {
  for (const listener of hotkeyListeners) listener(payload);
});

contextBridge.exposeInMainWorld("api", {
  overlay: {
    show: async () => true,
    hide: async () => true,
    updateSettings: async () => true,
    onReady: () => () => {},
    onSettings: (callback) =>
      subscribe(settingsListeners, callback, cachedState?.settings),
    measure: (width, height) =>
      ipcRenderer.invoke("perf:measure", { width, height }),
  },
  timer: {
    get: async () => (await stateReady).timerData,
    set: async () => true,
    onSync: (callback) =>
      subscribe(timerListeners, callback, cachedState?.timerData),
  },
  hotkeys: {
    get: async () => ({
      start: null,
      swap: null,
      startLabel: "F1",
      swapLabel: "F2",
      mode: "fallback",
      uiohookLoaded: false,
    }),
    set: async () => true,
    clear: async () => ({
      start: null,
      swap: null,
      startLabel: "F1",
      swapLabel: "F2",
    }),
    restartHooks: async () => true,
    capture: async () => true,
    cancel: async () => true,
    onCaptured: () => () => {},
    on: (callback) => subscribe(hotkeyListeners, callback),
    onMode: () => () => {},
  },
  gamepad: {
    get: async () => ({ toggle: [], swap: [] }),
    clear: async () => ({ toggle: [], swap: [] }),
  },
  updater: {
    startDownload: async () => {},
    installNow: async () => {},
    openReleases: async () => {},
    onAvailable: () => () => {},
    onProgress: () => () => {},
    onDownloaded: () => () => {},
    onError: () => () => {},
  },
  win: {
    minimize: async () => {},
    maximize: async () => {},
    close: async () => {},
    isMaximized: async () => false,
    onMaximizeChange: () => () => {},
    getVersion: () => ipcRenderer.invoke("perf:get-version"),
    openPremium: async () => {},
    openLogFolder: async () => true,
  },
});
