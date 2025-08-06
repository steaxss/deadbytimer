const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { join } = require('path');
const Store = require('electron-store');

class TimerOverlayApp {
  constructor() {
    this.mainWindow = null;
    this.overlayWindow = null;
    this.store = new Store();
    this.isDev = process.env.NODE_ENV === 'development';
    this.initializeApp();
  }

  initializeApp() {
    app.whenReady().then(() => {
      this.createMainWindow();
      this.setupIPC();
      this.setupGlobalShortcuts();
    });

    app.on('window-all-closed', () => {
      globalShortcut.unregisterAll();
      app.quit();
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  createMainWindow() {
    const savedState = this.store.get('windowState') || {};

    this.mainWindow = new BrowserWindow({
      width: savedState.width || 800,
      height: savedState.height || 600,
      x: savedState.x,
      y: savedState.y,
      minWidth: 600,
      minHeight: 400,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.cjs'),
        webSecurity: false
      }
    });

    if (this.isDev) {
      this.mainWindow.loadURL('http://localhost:5173');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
    }

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      this.mainWindow.focus();
      setTimeout(() => this.createOverlayWindow(), 1000);
    });

    this.mainWindow.on('close', () => {
      const bounds = this.mainWindow.getBounds();
      if (bounds) {
        this.store.set('windowState', bounds);
      }
    });

    this.mainWindow.on('closed', () => {
      if (this.overlayWindow) {
        this.overlayWindow.close();
      }
      app.quit();
    });
  }

  createOverlayWindow() {
    if (this.overlayWindow) {
      this.overlayWindow.show();
      return;
    }

    const overlaySettings = this.store.get('overlaySettings', {
      x: 100,
      y: 100,
      scale: 100,
      locked: false,
      alwaysOnTop: true
    });

    this.overlayWindow = new BrowserWindow({
      width: 520,
      height: 120,
      x: overlaySettings.x,
      y: overlaySettings.y,
      frame: false,
      transparent: true,
      alwaysOnTop: overlaySettings.alwaysOnTop,
      skipTaskbar: true,
      resizable: false,
      focusable: !overlaySettings.locked,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.cjs'),
        webSecurity: false
      }
    });

    if (overlaySettings.locked) {
      this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
    }

    const overlayUrl = this.isDev 
      ? 'http://localhost:5173/overlay.html' 
      : join(__dirname, '../dist/overlay.html');

    if (this.isDev) {
      this.overlayWindow.loadURL(overlayUrl);
      this.overlayWindow.webContents.openDevTools();
    } else {
      this.overlayWindow.loadFile(overlayUrl);
    }

    this.overlayWindow.webContents.on('did-finish-load', () => {
      this.overlayWindow.show();
      
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('overlay-ready', true);
      }
      
      const timerData = this.store.get('timerData');
      if (timerData && this.overlayWindow) {
        setTimeout(() => {
          this.overlayWindow.webContents.send('timer-data-sync', timerData);
        }, 100);
      }
    });

    this.overlayWindow.on('closed', () => {
      this.overlayWindow = null;
      
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('overlay-ready', false);
      }
    });

    this.overlayWindow.on('move', () => {
      const bounds = this.overlayWindow.getBounds();
      if (bounds) {
        this.store.set('overlaySettings.x', bounds.x);
        this.store.set('overlaySettings.y', bounds.y);
      }
    });
  }

  setupIPC() {
    ipcMain.handle('store-get', (_, key) => this.store.get(key));
    
    ipcMain.handle('store-set', (_, key, value) => {
      this.store.set(key, value);
      
      if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('timer-data-sync', value);
      }
    });

    ipcMain.handle('overlay-show', async () => {
      try {
        this.createOverlayWindow();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('overlay-hide', async () => {
      if (this.overlayWindow) {
        this.overlayWindow.close();
        this.overlayWindow = null;
        return { success: true };
      }
      return { success: false, error: 'No overlay window to hide' };
    });

    ipcMain.handle('overlay-settings-update', async (_, settings) => {
      if (!this.overlayWindow) return;

      try {
        if (settings.locked !== undefined) {
          this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
          this.overlayWindow.setFocusable(!settings.locked);
        }

        if (settings.alwaysOnTop !== undefined) {
          this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
        }

        if (settings.x !== undefined || settings.y !== undefined) {
          this.overlayWindow.setPosition(settings.x || 0, settings.y || 0);
        }

        this.store.set('overlaySettings', {
          ...this.store.get('overlaySettings', {}),
          ...settings
        });
      } catch (error) {
        console.error('Error updating overlay settings:', error);
      }
    });

    ipcMain.handle('timer-data-sync', async (_, data) => {
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('timer-data-sync', data);
      }
      this.store.set('timerData', data);
    });

    ipcMain.handle('overlay-style-change', async (_, style) => {
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('overlay-style-change', style);
      }
    });
  }

  setupGlobalShortcuts() {
    const registerShortcut = (key, action) => {
      try {
        globalShortcut.register(key, () => {
          this.mainWindow.webContents.send('hotkey-pressed', action);
        });
      } catch (error) {
        console.warn(`Failed to register shortcut ${key}:`, error);
      }
    };

    const savedHotkeys = this.store.get('timerData.hotkeys', {
      start: 'F1',
      swap: 'F2'
    });

    registerShortcut(savedHotkeys.start, 'start');
    registerShortcut(savedHotkeys.swap, 'swap');

    ipcMain.handle('hotkey-register', async (_, hotkeys) => {
      globalShortcut.unregisterAll();
      registerShortcut(hotkeys.start, 'start');
      registerShortcut(hotkeys.swap, 'swap');
      this.store.set('timerData.hotkeys', hotkeys);
    });
  }
}

new TimerOverlayApp();