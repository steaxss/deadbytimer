const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { join } = require('path');
const Store = require('electron-store');

interface WindowState {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

class TimerOverlayApp {
  private mainWindow: BrowserWindow | null = null;
  private overlayWindow: BrowserWindow | null = null;
  private store: Store;
  private isDev: boolean;

  constructor() {
    this.store = new Store();
    this.isDev = process.env.NODE_ENV === 'development';
    console.log(`App started in ${this.isDev ? 'development' : 'production'} mode`);
    this.initializeApp();
  }

  private initializeApp(): void {
    app.whenReady().then(() => {
      this.createMainWindow();
      this.setupIPC();
      this.setupGlobalShortcuts();
      
      // Auto-show overlay on startup
      setTimeout(() => {
        this.createOverlayWindow();
      }, 2000);
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        globalShortcut.unregisterAll();
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  private createMainWindow(): void {
    const savedState = this.store.get('windowState') as WindowState;

    this.mainWindow = new BrowserWindow({
      width: savedState?.width || 800,
      height: savedState?.height || 600,
      x: savedState?.x,
      y: savedState?.y,
      minWidth: 600,
      minHeight: 400,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
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
      this.mainWindow?.show();
      this.mainWindow?.focus();
      console.log('Main window ready and shown');
    });

    this.mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Main window failed to load:', errorCode, errorDescription);
    });

    this.mainWindow.on('close', () => {
      const bounds = this.mainWindow?.getBounds();
      if (bounds) {
        this.store.set('windowState', bounds);
      }
    });
  }

  private createOverlayWindow(): void {
    if (this.overlayWindow) {
      console.log('Overlay window already exists, focusing...');
      this.overlayWindow.show();
      this.overlayWindow.focus();
      return;
    }

    console.log('Creating overlay window...');

    const overlaySettings = this.store.get('overlaySettings', {
      x: 100,
      y: 100,
      scale: 100,
      locked: false,
      alwaysOnTop: true
    }) as any;

    console.log('Overlay settings:', overlaySettings);

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
        preload: join(__dirname, 'preload.js'),
        webSecurity: false
      }
    });

    if (overlaySettings.locked) {
      this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
    }

    const overlayUrl = this.isDev 
      ? 'http://localhost:5173/overlay.html' 
      : join(__dirname, '../dist/overlay.html');
    
    console.log('Loading overlay URL:', overlayUrl);

    if (this.isDev) {
      this.overlayWindow.loadURL(overlayUrl);
    } else {
      this.overlayWindow.loadFile(overlayUrl);
    }

    this.overlayWindow.webContents.on('did-finish-load', () => {
      console.log('Overlay window loaded successfully');
      this.overlayWindow?.show();
      
      // Notify main window that overlay is ready and visible
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('overlay-ready', true);
      }
      
      // Synchronize initial data
      const timerData = this.store.get('timerData');
      if (timerData && this.overlayWindow) {
        console.log('Syncing initial timer data to overlay');
        setTimeout(() => {
          this.overlayWindow?.webContents.send('timer-data-sync', timerData);
        }, 100);
      }
    });

    this.overlayWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Overlay window failed to load:', errorCode, errorDescription);
    });

    this.overlayWindow.on('closed', () => {
      console.log('Overlay window closed');
      this.overlayWindow = null;
      
      // Notify main window that overlay is closed
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('overlay-ready', false);
      }
    });

    this.overlayWindow.on('move', () => {
      const bounds = this.overlayWindow?.getBounds();
      if (bounds) {
        this.store.set('overlaySettings.x', bounds.x);
        this.store.set('overlaySettings.y', bounds.y);
      }
    });

    if (this.isDev) {
      this.overlayWindow.webContents.openDevTools();
    }

    console.log('Overlay window created and configured');
  }

  private setupIPC(): void {
    ipcMain.handle('store-get', (_, key: string) => {
      const value = this.store.get(key);
      console.log(`Store get: ${key} =`, value);
      return value;
    });

    ipcMain.handle('store-set', (_, key: string, value: any) => {
      console.log(`Store set: ${key} =`, value);
      this.store.set(key, value);
      
      // Auto-sync timer data changes to overlay
      if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('timer-data-sync', value);
      }
    });

    ipcMain.handle('overlay-show', async () => {
      console.log('IPC: overlay-show called');
      try {
        this.createOverlayWindow();
        return { success: true };
      } catch (error) {
        console.error('Error showing overlay:', error);
        return { success: false, error: (error as Error).message };
      }
    });

    ipcMain.handle('overlay-hide', async () => {
      console.log('IPC: overlay-hide called');
      if (this.overlayWindow) {
        this.overlayWindow.close();
        this.overlayWindow = null;
        return { success: true };
      }
      return { success: false, error: 'No overlay window to hide' };
    });

    ipcMain.handle('overlay-settings-update', async (_, settings: any) => {
      console.log('IPC: overlay-settings-update called with:', settings);
      
      if (!this.overlayWindow) {
        console.log('No overlay window to update');
        return;
      }

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

    ipcMain.handle('timer-update-display', async (_, data: any) => {
      console.log('IPC: timer-update-display called with:', data);
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('timer-update-display', data);
      }
    });

    ipcMain.handle('timer-data-sync', async (_, data: any) => {
      console.log('IPC: timer-data-sync called with:', data);
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('timer-data-sync', data);
      }
      
      // Also save to store for persistence
      this.store.set('timerData', data);
    });

    ipcMain.handle('overlay-style-change', async (_, style: string) => {
      console.log('IPC: overlay-style-change called with:', style);
      if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
        this.overlayWindow.webContents.send('overlay-style-change', style);
      }
    });
  }

  private setupGlobalShortcuts(): void {
    const registerShortcut = (key: string, action: string) => {
      try {
        globalShortcut.register(key, () => {
          console.log(`Global shortcut pressed: ${key} -> ${action}`);
          this.mainWindow?.webContents.send('hotkey-pressed', action);
        });
      } catch (error) {
        console.warn(`Failed to register shortcut ${key}:`, error);
      }
    };

    const savedHotkeys = this.store.get('timerData.hotkeys', {
      start: 'F1',
      swap: 'F2'
    }) as any;

    console.log('Registering global shortcuts:', savedHotkeys);

    registerShortcut(savedHotkeys.start, 'start');
    registerShortcut(savedHotkeys.swap, 'swap');

    ipcMain.handle('hotkey-register', async (_, hotkeys: { start: string; swap: string }) => {
      console.log('Re-registering hotkeys:', hotkeys);
      globalShortcut.unregisterAll();
      registerShortcut(hotkeys.start, 'start');
      registerShortcut(hotkeys.swap, 'swap');
      
      this.store.set('timerData.hotkeys', hotkeys);
    });
  }
}

new TimerOverlayApp();