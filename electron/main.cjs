// electron/main.cjs
const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const { join } = require('path');
const Store = require('electron-store');

class TimerOverlayApp {
  constructor() {
    this.mainWindow = null;
    this.overlayWindow = null;
    this.store = new Store();
    this.isDev = process.env.NODE_ENV === 'development';
    this.isOverlayBeingCreated = false;
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

    app.on('before-quit', () => {
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        const bounds = this.overlayWindow.getBounds();
        this.store.set('overlaySettings.x', bounds.x);
        this.store.set('overlaySettings.y', bounds.y);
      }
    });
  }

  createMainWindow() {
    const savedState = this.store.get('windowState') || {};

    this.mainWindow = new BrowserWindow({
      width: savedState.width || 900,
      height: savedState.height || 700,
      x: savedState.x,
      y: savedState.y,
      minWidth: 600,
      minHeight: 400,
      show: false,
      autoHideMenuBar: true,
      icon: this.isDev ? null : join(__dirname, '../assets/icon.ico'),
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.cjs'),
        webSecurity: false
      }
    });

    if (this.isDev) {
      this.mainWindow.loadURL('http://localhost:5173');
      this.mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
      this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
    }

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      this.mainWindow.focus();
    });

    this.mainWindow.on('close', () => {
      const bounds = this.mainWindow.getBounds();
      if (bounds && !this.mainWindow.isMaximized() && !this.mainWindow.isMinimized()) {
        this.store.set('windowState', bounds);
      }
    });

    this.mainWindow.on('closed', () => {
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.close();
      }
      this.mainWindow = null;
    });
  }

  createOverlayWindow() {
    if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
      this.overlayWindow.show();
      this.overlayWindow.focus();
      return;
    }

    if (this.isOverlayBeingCreated) {
      return;
    }

    this.isOverlayBeingCreated = true;

    try {
      const overlaySettings = this.store.get('overlaySettings', {
        x: 100,
        y: 100,
        scale: 100,
        locked: false,
        alwaysOnTop: true
      });

      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      const dragHandleHeight = overlaySettings.locked ? 0 : 30;
      const overlayWidth = Math.ceil(520 * (overlaySettings.scale || 100) / 100);
      const overlayHeight = Math.ceil((120 + dragHandleHeight) * (overlaySettings.scale || 100) / 100);

      let x = overlaySettings.x || Math.floor((width - overlayWidth) / 2);
      let y = overlaySettings.y || Math.floor(height * 0.1);

      if (x < 0 || x > width - overlayWidth) x = Math.floor((width - overlayWidth) / 2);
      if (y < 0 || y > height - overlayHeight) y = Math.floor(height * 0.1);

      this.overlayWindow = new BrowserWindow({
        width: overlayWidth,
        height: overlayHeight,
        x: x,
        y: y,
        frame: false,
        transparent: true,
        alwaysOnTop: overlaySettings.alwaysOnTop !== false,
        skipTaskbar: overlaySettings.locked === true,
        resizable: false,
        minimizable: !overlaySettings.locked,
        maximizable: false,
        focusable: !overlaySettings.locked,
        show: false,
        titleBarStyle: 'hidden',
        backgroundColor: 'transparent',
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: join(__dirname, 'preload.cjs'),
          webSecurity: false,
          backgroundThrottling: false
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
      } else {
        this.overlayWindow.loadFile(overlayUrl);
      }

      this.overlayWindow.webContents.on('did-finish-load', () => {
        this.overlayWindow.show();
        
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
          this.mainWindow.webContents.send('overlay-ready', true);
        }
        
        const timerData = this.store.get('timerData');
        if (timerData && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          setTimeout(() => {
            this.overlayWindow.webContents.send('timer-data-sync', timerData);
          }, 100);
        }

        this.isOverlayBeingCreated = false;
      });

      this.overlayWindow.on('closed', () => {
        this.overlayWindow = null;
        this.isOverlayBeingCreated = false;
        
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
          this.mainWindow.webContents.send('overlay-ready', false);
        }
      });

      this.overlayWindow.on('move', () => {
        if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          const bounds = this.overlayWindow.getBounds();
          if (bounds) {
            this.store.set('overlaySettings.x', bounds.x);
            this.store.set('overlaySettings.y', bounds.y);
          }
        }
      });

      this.overlayWindow.on('resize', () => {
        if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          const bounds = this.overlayWindow.getBounds();
          if (bounds) {
            this.store.set('overlaySettings.width', bounds.width);
            this.store.set('overlaySettings.height', bounds.height);
          }
        }
      });

    } catch (error) {
      console.error('Error creating overlay window:', error);
      this.isOverlayBeingCreated = false;
    }
  }

  setupIPC() {
    ipcMain.handle('store-get', (_, key) => {
      try {
        return this.store.get(key);
      } catch (error) {
        console.error('Store get error:', error);
        return null;
      }
    });
    
    ipcMain.handle('store-set', (_, key, value) => {
      try {
        this.store.set(key, value);
        
        if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          this.overlayWindow.webContents.send('timer-data-sync', value);
        }
        
        return true;
      } catch (error) {
        console.error('Store set error:', error);
        return false;
      }
    });

    ipcMain.handle('overlay-show', async () => {
      try {
        this.createOverlayWindow();
        return { success: true };
      } catch (error) {
        console.error('Error showing overlay:', error);
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('overlay-hide', async () => {
      try {
        if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          this.overlayWindow.close();
          this.overlayWindow = null;
        }
        return { success: true };
      } catch (error) {
        console.error('Error hiding overlay:', error);
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('overlay-settings-update', async (_, settings) => {
      if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return;

      try {
        if (settings.locked !== undefined) {
          const newDragHandleHeight = settings.locked ? 0 : 30;
          const newOverlayHeight = Math.ceil((120 + newDragHandleHeight) * (settings.scale || this.store.get('overlaySettings.scale') || 100) / 100);
          
          this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
          this.overlayWindow.setFocusable(!settings.locked);
          this.overlayWindow.setSkipTaskbar(settings.locked);
          this.overlayWindow.setMinimizable(!settings.locked);
          this.overlayWindow.setSize(this.overlayWindow.getBounds().width, newOverlayHeight);
        }

        if (settings.scale !== undefined) {
          const currentSettings = this.store.get('overlaySettings', {});
          const dragHandleHeight = currentSettings.locked ? 0 : 30;
          const newWidth = Math.ceil(520 * settings.scale / 100);
          const newHeight = Math.ceil((120 + dragHandleHeight) * settings.scale / 100);
          this.overlayWindow.setSize(newWidth, newHeight);
        }

        if (settings.alwaysOnTop !== undefined) {
          this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
        }

        if (settings.x !== undefined || settings.y !== undefined) {
          const currentBounds = this.overlayWindow.getBounds();
          this.overlayWindow.setPosition(
            settings.x !== undefined ? settings.x : currentBounds.x,
            settings.y !== undefined ? settings.y : currentBounds.y
          );
        }

        if (settings.scale !== undefined) {
          this.overlayWindow.webContents.send('overlay-scale-change', settings.scale);
        }

        this.store.set('overlaySettings', {
          ...this.store.get('overlaySettings', {}),
          ...settings
        });

        return { success: true };
      } catch (error) {
        console.error('Error updating overlay settings:', error);
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('timer-data-sync', async (_, data) => {
      try {
        if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          this.overlayWindow.webContents.send('timer-data-sync', data);
        }
        this.store.set('timerData', data);
        return { success: true };
      } catch (error) {
        console.error('Error syncing timer data:', error);
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('overlay-style-change', async (_, style) => {
      try {
        if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
          this.overlayWindow.webContents.send('overlay-style-change', style);
        }
        return { success: true };
      } catch (error) {
        console.error('Error changing overlay style:', error);
        return { success: false, error: error.message };
      }
    });
  }

  setupGlobalShortcuts() {
    const registerShortcut = (key, action) => {
      try {
        const success = globalShortcut.register(key, () => {
          if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            this.mainWindow.webContents.send('hotkey-pressed', action);
          }
        });
        
        if (!success) {
          console.warn(`Failed to register shortcut: ${key}`);
        }
      } catch (error) {
        console.warn(`Error registering shortcut ${key}:`, error);
      }
    };

    const savedHotkeys = this.store.get('timerData.hotkeys', {
      start: 'F1',
      swap: 'F2'
    });

    registerShortcut(savedHotkeys.start, 'start');
    registerShortcut(savedHotkeys.swap, 'swap');

    ipcMain.handle('hotkey-register', async (_, hotkeys) => {
      try {
        globalShortcut.unregisterAll();
        registerShortcut(hotkeys.start, 'start');
        registerShortcut(hotkeys.swap, 'swap');
        this.store.set('timerData.hotkeys', hotkeys);
        return { success: true };
      } catch (error) {
        console.error('Error registering hotkeys:', error);
        return { success: false, error: error.message };
      }
    });
  }
}

new TimerOverlayApp();