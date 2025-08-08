// ========== 1. CORRECTION DU MAIN.CJS (electron/main.cjs) ==========
// Problème principal : La sauvegarde de position était mal gérée
// Voici la version corrigée :

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
      
      // Auto-show overlay in dev mode
      if (this.isDev) {
        setTimeout(() => {
          this.createOverlayWindow();
        }, 2000);
      }
    });

    app.on('window-all-closed', () => {
      globalShortcut.unregisterAll();
      app.quit();
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
      width: savedState.width || 600,
      height: savedState.height || 500,
      x: savedState.x,
      y: savedState.y,
      minWidth: 500,
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

      // Validation des positions
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
        skipTaskbar: true,
        resizable: false,
        minimizable: false,
        maximizable: false,
        focusable: !overlaySettings.locked,
        show: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#00000000',
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: join(__dirname, 'preload.cjs'),
          webSecurity: false,
          backgroundThrottling: false
        }
      });

      this.overlayWindow.setBackgroundColor('#00000000');

      if (overlaySettings.locked) {
        this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
      }

      const overlayUrl = this.isDev 
        ? 'http://localhost:5173/overlay.html' 
        : `file://${join(__dirname, '../dist/overlay.html')}`;

      if (this.isDev) {
        this.overlayWindow.loadURL(overlayUrl);
      } else {
        this.overlayWindow.loadFile(join(__dirname, '../dist/overlay.html'));
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
          }, 500);
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
            // Toujours sauvegarder la position
            this.store.set('overlaySettings.x', bounds.x);
            this.store.set('overlaySettings.y', bounds.y);
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
      if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return { success: true };

      try {
        const currentSettings = this.store.get('overlaySettings', {});
        const newSettings = { ...currentSettings, ...settings };

        if (settings.locked !== undefined) {
          const newDragHandleHeight = settings.locked ? 0 : 30;
          const newOverlayHeight = Math.ceil((120 + newDragHandleHeight) * (newSettings.scale || 100) / 100);
          const newOverlayWidth = Math.ceil(520 * (newSettings.scale || 100) / 100);
          
          this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
          this.overlayWindow.setFocusable(!settings.locked);
          this.overlayWindow.setSize(newOverlayWidth, newOverlayHeight);
        }

        if (settings.scale !== undefined) {
          const dragHandleHeight = newSettings.locked ? 0 : 30;
          const newWidth = Math.ceil(520 * settings.scale / 100);
          const newHeight = Math.ceil((120 + dragHandleHeight) * settings.scale / 100);
          this.overlayWindow.setSize(newWidth, newHeight);
        }

        if (settings.alwaysOnTop !== undefined) {
          this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
        }

        this.store.set('overlaySettings', newSettings);
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