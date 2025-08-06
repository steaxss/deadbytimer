Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── electron
│   ├── main.ts
│   ├── preload.ts
│   └── tsconfig.json
├── index.html
├── overlay.html
├── package.json
├── postcss.config.js
├── scripts
│   ├── debug.js
│   ├── fix.js
│   ├── setup.js
│   └── start.js
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── ControlPanel.tsx
│   │   ├── HotkeySettings.tsx
│   │   ├── OverlayApp.tsx
│   │   ├── OverlaySettings.tsx
│   │   ├── PlayerSettings.tsx
│   │   ├── TimerControls.tsx
│   │   └── overlay
│   │       ├── DragHandle.tsx
│   │       ├── PlayerName.tsx
│   │       ├── ScoreDisplay.tsx
│   │       ├── Timer.tsx
│   │       ├── TimerOverlay.tsx
│   │       └── styles
│   │           ├── CircularStyle.tsx
│   │           ├── DefaultStyle.tsx
│   │           ├── MinimalStyle.tsx
│   │           └── NostalgiaStyle.tsx
│   ├── hooks
│   │   ├── useElectronStore.ts
│   │   ├── useGlobalHotkeys.ts
│   │   └── useTimer.ts
│   ├── index.css
│   ├── main.tsx
│   ├── overlay.tsx
│   ├── store
│   │   └── timerStore.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       ├── cn.ts
│       └── timer.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

`dbdoverlaytools-free/README.md`:

```md
   1 | # DBD Timer Overlay
   2 | 
   3 | A lightweight and performant desktop application for Dead by Daylight 1v1 competitive matches. Features a transparent overlay with dual timers, customizable styles, and global hotkeys.
   4 | 
   5 | ## Features
   6 | 
   7 | - **Dual Timer System**: Independent timers for each player with precise millisecond accuracy
   8 | - **Multiple Overlay Styles**: Default, Minimal, Circular, and Nostalgia themes
   9 | - **Global Hotkeys**: Control timers from anywhere without focusing the app
  10 | - **Transparent Overlay**: Click-through overlay when locked, draggable when unlocked
  11 | - **Player Management**: Customizable player names and score tracking
  12 | - **Persistent Settings**: All configurations saved automatically
  13 | - **Low Resource Usage**: Optimized for gaming performance
  14 | 
  15 | ## Installation
  16 | 
  17 | ### Development Setup
  18 | 
  19 | 1. Clone the repository:
  20 | ```bash
  21 | git clone <repository-url>
  22 | cd dbdoverlaytools-free
  23 | ```
  24 | 
  25 | 2. Install dependencies:
  26 | ```bash
  27 | npm install
  28 | ```
  29 | 
  30 | 3. Start development mode:
  31 | ```bash
  32 | npm run electron:dev
  33 | ```
  34 | 
  35 | ### Building for Production
  36 | 
  37 | Build the application:
  38 | ```bash
  39 | npm run build
  40 | ```
  41 | 
  42 | This will create executables in the `release` folder.
  43 | 
  44 | ## Usage
  45 | 
  46 | ### Control Panel
  47 | 
  48 | The main control panel allows you to:
  49 | - Start, pause, and reset timers
  50 | - Switch between active timers
  51 | - Modify player names and scores
  52 | - Configure overlay settings
  53 | - Set custom hotkeys
  54 | - Show/hide the overlay
  55 | 
  56 | ### Overlay Controls
  57 | 
  58 | - **Drag Handle**: Appears when overlay is unlocked for repositioning
  59 | - **Lock Toggle**: Enable click-through mode for gaming
  60 | - **Style Selection**: Choose from 4 different visual themes
  61 | - **Scale Adjustment**: Resize overlay from 50% to 200%
  62 | 
  63 | ### Default Hotkeys
  64 | 
  65 | - **F1**: Start/Pause active timer
  66 | - **F2**: Swap to other timer
  67 | 
  68 | ## Overlay Styles
  69 | 
  70 | ### Default
  71 | Clean layout with player names, timers, and score display. Ideal for streaming.
  72 | 
  73 | ### Minimal
  74 | Compact design with essential information only. Perfect for limited screen space.
  75 | 
  76 | ### Circular
  77 | Unique circular design with timer circles. Eye-catching for viewers.
  78 | 
  79 | ### Nostalgia
  80 | Retro terminal-style green text on black background. Classic gaming aesthetic.
  81 | 
  82 | ## Technical Specifications
  83 | 
  84 | - **Framework**: Electron + React + TypeScript
  85 | - **Styling**: Tailwind CSS
  86 | - **State Management**: Zustand
  87 | - **Build Tool**: Vite
  88 | - **Storage**: electron-store for persistence
  89 | - **Hotkeys**: electron-localshortcut for global shortcuts
  90 | 
  91 | ## Performance Optimization
  92 | 
  93 | - Precise timer using requestAnimationFrame
  94 | - Minimal re-renders with optimized React components
  95 | - Efficient IPC communication between main and overlay windows
  96 | - Low memory footprint (<100MB typical usage)
  97 | 
  98 | ## Configuration
  99 | 
 100 | All settings are automatically saved to:
 101 | - **Windows**: `%APPDATA%/dbd-timer-overlay/config.json`
 102 | - **macOS**: `~/Library/Preferences/dbd-timer-overlay/config.json`
 103 | - **Linux**: `~/.config/dbd-timer-overlay/config.json`
 104 | 
 105 | ## Development
 106 | 
 107 | ### Project Structure
 108 | 
 109 | ```
 110 | src/
 111 | ├── components/           # React components
 112 | │   ├── overlay/         # Overlay-specific components
 113 | │   └── ControlPanel.tsx # Main control interface
 114 | ├── hooks/               # Custom React hooks
 115 | ├── store/               # Zustand state management
 116 | ├── types/               # TypeScript type definitions
 117 | ├── utils/               # Utility functions
 118 | └── main.tsx            # Application entry point
 119 | 
 120 | electron/
 121 | ├── main.ts             # Electron main process
 122 | └── preload.ts          # IPC preload script
 123 | ```
 124 | 
 125 | ### Architecture
 126 | 
 127 | - **Multi-window**: Separate main control panel and overlay window
 128 | - **IPC Communication**: Secure communication via preload scripts
 129 | - **State Synchronization**: Real-time sync between windows
 130 | - **Persistent Storage**: Automatic saving of user preferences
 131 | 
 132 | ## License
 133 | 
 134 | MIT License - see LICENSE file for details
 135 | 
 136 | ## Contributing
 137 | 
 138 | 1. Fork the repository
 139 | 2. Create a feature branch
 140 | 3. Make your changes
 141 | 4. Test thoroughly
 142 | 5. Submit a pull request
 143 | 
 144 | ## Support
 145 | 
 146 | For issues, feature requests, or questions, please create an issue in the GitHub repository.

```

`dbdoverlaytools-free/electron\main.ts`:

```ts
   1 | const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
   2 | const { join } = require('path');
   3 | const Store = require('electron-store');
   4 | 
   5 | interface WindowState {
   6 |   x?: number;
   7 |   y?: number;
   8 |   width?: number;
   9 |   height?: number;
  10 | }
  11 | 
  12 | class TimerOverlayApp {
  13 |   private mainWindow: BrowserWindow | null = null;
  14 |   private overlayWindow: BrowserWindow | null = null;
  15 |   private store: Store;
  16 |   private isDev: boolean;
  17 | 
  18 |   constructor() {
  19 |     this.store = new Store();
  20 |     this.isDev = process.env.NODE_ENV === 'development';
  21 |     console.log(`App started in ${this.isDev ? 'development' : 'production'} mode`);
  22 |     this.initializeApp();
  23 |   }
  24 | 
  25 |   private initializeApp(): void {
  26 |     app.whenReady().then(() => {
  27 |       this.createMainWindow();
  28 |       this.setupIPC();
  29 |       this.setupGlobalShortcuts();
  30 |       
  31 |       // Auto-show overlay on startup
  32 |       setTimeout(() => {
  33 |         this.createOverlayWindow();
  34 |       }, 2000);
  35 |     });
  36 | 
  37 |     app.on('window-all-closed', () => {
  38 |       if (process.platform !== 'darwin') {
  39 |         globalShortcut.unregisterAll();
  40 |         app.quit();
  41 |       }
  42 |     });
  43 | 
  44 |     app.on('activate', () => {
  45 |       if (BrowserWindow.getAllWindows().length === 0) {
  46 |         this.createMainWindow();
  47 |       }
  48 |     });
  49 |   }
  50 | 
  51 |   private createMainWindow(): void {
  52 |     const savedState = this.store.get('windowState') as WindowState;
  53 | 
  54 |     this.mainWindow = new BrowserWindow({
  55 |       width: savedState?.width || 800,
  56 |       height: savedState?.height || 600,
  57 |       x: savedState?.x,
  58 |       y: savedState?.y,
  59 |       minWidth: 600,
  60 |       minHeight: 400,
  61 |       show: false,
  62 |       autoHideMenuBar: true,
  63 |       webPreferences: {
  64 |         nodeIntegration: false,
  65 |         contextIsolation: true,
  66 |         preload: join(__dirname, 'preload.js'),
  67 |         webSecurity: false
  68 |       }
  69 |     });
  70 | 
  71 |     if (this.isDev) {
  72 |       this.mainWindow.loadURL('http://localhost:5173');
  73 |       this.mainWindow.webContents.openDevTools();
  74 |     } else {
  75 |       this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  76 |     }
  77 | 
  78 |     this.mainWindow.once('ready-to-show', () => {
  79 |       this.mainWindow?.show();
  80 |       this.mainWindow?.focus();
  81 |       console.log('Main window ready and shown');
  82 |     });
  83 | 
  84 |     this.mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
  85 |       console.error('Main window failed to load:', errorCode, errorDescription);
  86 |     });
  87 | 
  88 |     this.mainWindow.on('close', () => {
  89 |       const bounds = this.mainWindow?.getBounds();
  90 |       if (bounds) {
  91 |         this.store.set('windowState', bounds);
  92 |       }
  93 |     });
  94 |   }
  95 | 
  96 |   private createOverlayWindow(): void {
  97 |     if (this.overlayWindow) {
  98 |       console.log('Overlay window already exists, focusing...');
  99 |       this.overlayWindow.show();
 100 |       this.overlayWindow.focus();
 101 |       return;
 102 |     }
 103 | 
 104 |     console.log('Creating overlay window...');
 105 | 
 106 |     const overlaySettings = this.store.get('overlaySettings', {
 107 |       x: 100,
 108 |       y: 100,
 109 |       scale: 100,
 110 |       locked: false,
 111 |       alwaysOnTop: true
 112 |     }) as any;
 113 | 
 114 |     console.log('Overlay settings:', overlaySettings);
 115 | 
 116 |     this.overlayWindow = new BrowserWindow({
 117 |       width: 520,
 118 |       height: 120,
 119 |       x: overlaySettings.x,
 120 |       y: overlaySettings.y,
 121 |       frame: false,
 122 |       transparent: true,
 123 |       alwaysOnTop: overlaySettings.alwaysOnTop,
 124 |       skipTaskbar: true,
 125 |       resizable: false,
 126 |       focusable: !overlaySettings.locked,
 127 |       show: false,
 128 |       webPreferences: {
 129 |         nodeIntegration: false,
 130 |         contextIsolation: true,
 131 |         preload: join(__dirname, 'preload.js'),
 132 |         webSecurity: false
 133 |       }
 134 |     });
 135 | 
 136 |     if (overlaySettings.locked) {
 137 |       this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
 138 |     }
 139 | 
 140 |     const overlayUrl = this.isDev 
 141 |       ? 'http://localhost:5173/overlay.html' 
 142 |       : join(__dirname, '../dist/overlay.html');
 143 |     
 144 |     console.log('Loading overlay URL:', overlayUrl);
 145 | 
 146 |     if (this.isDev) {
 147 |       this.overlayWindow.loadURL(overlayUrl);
 148 |     } else {
 149 |       this.overlayWindow.loadFile(overlayUrl);
 150 |     }
 151 | 
 152 |     this.overlayWindow.webContents.on('did-finish-load', () => {
 153 |       console.log('Overlay window loaded successfully');
 154 |       this.overlayWindow?.show();
 155 |       
 156 |       // Notify main window that overlay is ready and visible
 157 |       if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 158 |         this.mainWindow.webContents.send('overlay-ready', true);
 159 |       }
 160 |       
 161 |       // Synchronize initial data
 162 |       const timerData = this.store.get('timerData');
 163 |       if (timerData && this.overlayWindow) {
 164 |         console.log('Syncing initial timer data to overlay');
 165 |         setTimeout(() => {
 166 |           this.overlayWindow?.webContents.send('timer-data-sync', timerData);
 167 |         }, 100);
 168 |       }
 169 |     });
 170 | 
 171 |     this.overlayWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
 172 |       console.error('Overlay window failed to load:', errorCode, errorDescription);
 173 |     });
 174 | 
 175 |     this.overlayWindow.on('closed', () => {
 176 |       console.log('Overlay window closed');
 177 |       this.overlayWindow = null;
 178 |       
 179 |       // Notify main window that overlay is closed
 180 |       if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 181 |         this.mainWindow.webContents.send('overlay-ready', false);
 182 |       }
 183 |     });
 184 | 
 185 |     this.overlayWindow.on('move', () => {
 186 |       const bounds = this.overlayWindow?.getBounds();
 187 |       if (bounds) {
 188 |         this.store.set('overlaySettings.x', bounds.x);
 189 |         this.store.set('overlaySettings.y', bounds.y);
 190 |       }
 191 |     });
 192 | 
 193 |     if (this.isDev) {
 194 |       this.overlayWindow.webContents.openDevTools();
 195 |     }
 196 | 
 197 |     console.log('Overlay window created and configured');
 198 |   }
 199 | 
 200 |   private setupIPC(): void {
 201 |     ipcMain.handle('store-get', (_, key: string) => {
 202 |       const value = this.store.get(key);
 203 |       console.log(`Store get: ${key} =`, value);
 204 |       return value;
 205 |     });
 206 | 
 207 |     ipcMain.handle('store-set', (_, key: string, value: any) => {
 208 |       console.log(`Store set: ${key} =`, value);
 209 |       this.store.set(key, value);
 210 |       
 211 |       // Auto-sync timer data changes to overlay
 212 |       if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 213 |         this.overlayWindow.webContents.send('timer-data-sync', value);
 214 |       }
 215 |     });
 216 | 
 217 |     ipcMain.handle('overlay-show', async () => {
 218 |       console.log('IPC: overlay-show called');
 219 |       try {
 220 |         this.createOverlayWindow();
 221 |         return { success: true };
 222 |       } catch (error) {
 223 |         console.error('Error showing overlay:', error);
 224 |         return { success: false, error: (error as Error).message };
 225 |       }
 226 |     });
 227 | 
 228 |     ipcMain.handle('overlay-hide', async () => {
 229 |       console.log('IPC: overlay-hide called');
 230 |       if (this.overlayWindow) {
 231 |         this.overlayWindow.close();
 232 |         this.overlayWindow = null;
 233 |         return { success: true };
 234 |       }
 235 |       return { success: false, error: 'No overlay window to hide' };
 236 |     });
 237 | 
 238 |     ipcMain.handle('overlay-settings-update', async (_, settings: any) => {
 239 |       console.log('IPC: overlay-settings-update called with:', settings);
 240 |       
 241 |       if (!this.overlayWindow) {
 242 |         console.log('No overlay window to update');
 243 |         return;
 244 |       }
 245 | 
 246 |       try {
 247 |         if (settings.locked !== undefined) {
 248 |           this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 249 |           this.overlayWindow.setFocusable(!settings.locked);
 250 |         }
 251 | 
 252 |         if (settings.alwaysOnTop !== undefined) {
 253 |           this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 254 |         }
 255 | 
 256 |         if (settings.x !== undefined || settings.y !== undefined) {
 257 |           this.overlayWindow.setPosition(settings.x || 0, settings.y || 0);
 258 |         }
 259 | 
 260 |         this.store.set('overlaySettings', {
 261 |           ...this.store.get('overlaySettings', {}),
 262 |           ...settings
 263 |         });
 264 |       } catch (error) {
 265 |         console.error('Error updating overlay settings:', error);
 266 |       }
 267 |     });
 268 | 
 269 |     ipcMain.handle('timer-update-display', async (_, data: any) => {
 270 |       console.log('IPC: timer-update-display called with:', data);
 271 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 272 |         this.overlayWindow.webContents.send('timer-update-display', data);
 273 |       }
 274 |     });
 275 | 
 276 |     ipcMain.handle('timer-data-sync', async (_, data: any) => {
 277 |       console.log('IPC: timer-data-sync called with:', data);
 278 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 279 |         this.overlayWindow.webContents.send('timer-data-sync', data);
 280 |       }
 281 |       
 282 |       // Also save to store for persistence
 283 |       this.store.set('timerData', data);
 284 |     });
 285 | 
 286 |     ipcMain.handle('overlay-style-change', async (_, style: string) => {
 287 |       console.log('IPC: overlay-style-change called with:', style);
 288 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 289 |         this.overlayWindow.webContents.send('overlay-style-change', style);
 290 |       }
 291 |     });
 292 |   }
 293 | 
 294 |   private setupGlobalShortcuts(): void {
 295 |     const registerShortcut = (key: string, action: string) => {
 296 |       try {
 297 |         globalShortcut.register(key, () => {
 298 |           console.log(`Global shortcut pressed: ${key} -> ${action}`);
 299 |           this.mainWindow?.webContents.send('hotkey-pressed', action);
 300 |         });
 301 |       } catch (error) {
 302 |         console.warn(`Failed to register shortcut ${key}:`, error);
 303 |       }
 304 |     };
 305 | 
 306 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 307 |       start: 'F1',
 308 |       swap: 'F2'
 309 |     }) as any;
 310 | 
 311 |     console.log('Registering global shortcuts:', savedHotkeys);
 312 | 
 313 |     registerShortcut(savedHotkeys.start, 'start');
 314 |     registerShortcut(savedHotkeys.swap, 'swap');
 315 | 
 316 |     ipcMain.handle('hotkey-register', async (_, hotkeys: { start: string; swap: string }) => {
 317 |       console.log('Re-registering hotkeys:', hotkeys);
 318 |       globalShortcut.unregisterAll();
 319 |       registerShortcut(hotkeys.start, 'start');
 320 |       registerShortcut(hotkeys.swap, 'swap');
 321 |       
 322 |       this.store.set('timerData.hotkeys', hotkeys);
 323 |     });
 324 |   }
 325 | }
 326 | 
 327 | new TimerOverlayApp();

```

`dbdoverlaytools-free/electron\preload.ts`:

```ts
   1 | // electron/preload.ts
   2 | const { contextBridge, ipcRenderer } = require('electron');
   3 | 
   4 | const api = {
   5 |   store: {
   6 |     get: (key: string) => ipcRenderer.invoke('store-get', key),
   7 |     set: (key: string, value: any) => ipcRenderer.invoke('store-set', key, value),
   8 |   },
   9 |   
  10 |   overlay: {
  11 |     show: () => ipcRenderer.invoke('overlay-show'),
  12 |     hide: () => ipcRenderer.invoke('overlay-hide'),
  13 |     updateSettings: (settings: any) => ipcRenderer.invoke('overlay-settings-update', settings),
  14 |     styleChange: (style: string) => ipcRenderer.invoke('overlay-style-change', style),
  15 |     
  16 |     onTimerUpdate: (callback: (data: any) => void) => {
  17 |       ipcRenderer.on('timer-update-display', (_, data) => callback(data));
  18 |       return () => ipcRenderer.removeAllListeners('timer-update-display');
  19 |     },
  20 |     
  21 |     onDataSync: (callback: (data: any) => void) => {
  22 |       ipcRenderer.on('timer-data-sync', (_, data) => callback(data));
  23 |       return () => ipcRenderer.removeAllListeners('timer-data-sync');
  24 |     },
  25 |     
  26 |     onStyleChange: (callback: (style: string) => void) => {
  27 |       ipcRenderer.on('overlay-style-change', (_, style) => callback(style));
  28 |       return () => ipcRenderer.removeAllListeners('overlay-style-change');
  29 |     },
  30 |     
  31 |     onReady: (callback: (isReady: boolean) => void) => {
  32 |       ipcRenderer.on('overlay-ready', (_, isReady) => callback(isReady));
  33 |       return () => ipcRenderer.removeAllListeners('overlay-ready');
  34 |     },
  35 |   },
  36 |   
  37 |   timer: {
  38 |     updateDisplay: (data: any) => ipcRenderer.invoke('timer-update-display', data),
  39 |     syncData: (data: any) => ipcRenderer.invoke('timer-data-sync', data),
  40 |   },
  41 |   
  42 |   hotkeys: {
  43 |     register: (hotkeys: { start: string; swap: string }) => 
  44 |       ipcRenderer.invoke('hotkey-register', hotkeys),
  45 |     
  46 |     onPressed: (callback: (action: string) => void) => {
  47 |       ipcRenderer.on('hotkey-pressed', (_, action) => callback(action));
  48 |       return () => ipcRenderer.removeAllListeners('hotkey-pressed');
  49 |     },
  50 |   },
  51 |   
  52 |   removeAllListeners: () => {
  53 |     ipcRenderer.removeAllListeners('timer-update-display');
  54 |     ipcRenderer.removeAllListeners('timer-data-sync');
  55 |     ipcRenderer.removeAllListeners('overlay-style-change');
  56 |     ipcRenderer.removeAllListeners('hotkey-pressed');
  57 |     ipcRenderer.removeAllListeners('overlay-ready');
  58 |   },
  59 | };
  60 | 
  61 | contextBridge.exposeInMainWorld('electronAPI', api);
  62 | 
  63 | declare global {
  64 |   interface Window {
  65 |     electronAPI: typeof api;
  66 |   }
  67 | }

```

`dbdoverlaytools-free/electron\tsconfig.json`:

```json
   1 | {
   2 |   "compilerOptions": {
   3 |     "target": "ES2020",
   4 |     "module": "CommonJS",
   5 |     "lib": ["ES2020"],
   6 |     "strict": true,
   7 |     "esModuleInterop": true,
   8 |     "skipLibCheck": true,
   9 |     "forceConsistentCasingInFileNames": true,
  10 |     "moduleResolution": "node",
  11 |     "types": ["node"]
  12 |   },
  13 |   "include": ["./**/*"],
  14 |   "exclude": ["node_modules", "dist"]
  15 | }

```

`dbdoverlaytools-free/index.html`:

```html
   1 | <!doctype html>
   2 | <html lang="en">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; connect-src 'self' http://localhost:* ws://localhost:*;" />
   6 |     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   7 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   8 |     <title>DBD Timer Overlay - Control Panel</title>
   9 |   </head>
  10 |   <body>
  11 |     <div id="root"></div>
  12 |     <script type="module" src="/src/main.tsx"></script>
  13 |   </body>
  14 | </html>

```

`dbdoverlaytools-free/overlay.html`:

```html
   1 | <!doctype html>
   2 | <html lang="en">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; connect-src 'self' http://localhost:* ws://localhost:*;" />
   6 |     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   7 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   8 |     <title>DBD Timer Overlay</title>
   9 |     <style>
  10 |       body {
  11 |         margin: 0;
  12 |         padding: 0;
  13 |         background: transparent;
  14 |         overflow: hidden;
  15 |         user-select: none;
  16 |       }
  17 |     </style>
  18 |   </head>
  19 |   <body>
  20 |     <div id="overlay-root"></div>
  21 |     <script type="module" src="/src/overlay.tsx"></script>
  22 |   </body>
  23 | </html>

```

`dbdoverlaytools-free/package.json`:

```json
   1 | {
   2 |   "name": "dbd-timer-overlay",
   3 |   "version": "1.0.0",
   4 |   "description": "Dead by Daylight 1v1 Timer Overlay - Lightweight and performant desktop application",
   5 |   "main": "dist-electron/main.js",
   6 |   "scripts": {
   7 |     "dev": "vite",
   8 |     "build": "tsc && vite build && electron-builder",
   9 |     "build-only": "vite build",
  10 |     "build-electron": "vite build --config vite.config.ts",
  11 |     "electron": "wait-on tcp:5173 && wait-on file:./dist-electron/main.js && cross-env NODE_ENV=development electron .",
  12 |     "electron:pack": "electron-builder",
  13 |     "electron:dev": "node scripts/start.js",
  14 |     "electron:build": "npm run build-electron && cross-env NODE_ENV=development electron .",
  15 |     "preview": "vite preview",
  16 |     "postinstall": "electron-builder install-app-deps",
  17 |     "clean": "rimraf dist dist-electron release",
  18 |     "setup": "node scripts/setup.js",
  19 |     "debug": "node scripts/debug.js",
  20 |     "fix": "node scripts/fix.js"
  21 |   },
  22 |   "keywords": [
  23 |     "electron",
  24 |     "react",
  25 |     "typescript",
  26 |     "vite",
  27 |     "dead-by-daylight",
  28 |     "overlay",
  29 |     "timer"
  30 |   ],
  31 |   "author": "Doc & Steaxs",
  32 |   "license": "MIT",
  33 |   "devDependencies": {
  34 |     "@types/node": "^20.10.0",
  35 |     "@types/react": "^18.2.43",
  36 |     "@types/react-dom": "^18.2.17",
  37 |     "@typescript-eslint/eslint-plugin": "^6.14.0",
  38 |     "@typescript-eslint/parser": "^6.14.0",
  39 |     "@vitejs/plugin-react": "^4.2.1",
  40 |     "autoprefixer": "^10.4.16",
  41 |     "concurrently": "^8.2.2",
  42 |     "cross-env": "^7.0.3",
  43 |     "electron": "^28.1.0",
  44 |     "electron-builder": "^24.9.1",
  45 |     "eslint": "^8.55.0",
  46 |     "eslint-plugin-react-hooks": "^4.6.0",
  47 |     "eslint-plugin-react-refresh": "^0.4.5",
  48 |     "postcss": "^8.4.32",
  49 |     "rimraf": "^5.0.5",
  50 |     "tailwindcss": "^3.3.6",
  51 |     "typescript": "^5.2.2",
  52 |     "vite": "^5.0.8",
  53 |     "vite-plugin-electron": "^0.28.1",
  54 |     "vite-plugin-electron-renderer": "^0.14.5",
  55 |     "wait-on": "^7.2.0"
  56 |   },
  57 |   "dependencies": {
  58 |     "electron-store": "^8.2.0",
  59 |     "react": "^18.2.0",
  60 |     "react-dom": "^18.2.0",
  61 |     "zustand": "^4.4.7"
  62 |   },
  63 |   "build": {
  64 |     "appId": "com.dbdtools.timer-overlay",
  65 |     "productName": "DBD Timer Overlay",
  66 |     "directories": {
  67 |       "output": "release"
  68 |     },
  69 |     "files": [
  70 |       "dist/**/*",
  71 |       "dist-electron/**/*",
  72 |       "node_modules/**/*",
  73 |       "package.json"
  74 |     ],
  75 |     "mac": {
  76 |       "icon": "resources/icon.icns",
  77 |       "target": [
  78 |         {
  79 |           "target": "dmg",
  80 |           "arch": [
  81 |             "arm64",
  82 |             "x64"
  83 |           ]
  84 |         }
  85 |       ]
  86 |     },
  87 |     "win": {
  88 |       "icon": "resources/icon.ico",
  89 |       "target": [
  90 |         {
  91 |           "target": "nsis",
  92 |           "arch": [
  93 |             "x64"
  94 |           ]
  95 |         }
  96 |       ]
  97 |     },
  98 |     "linux": {
  99 |       "icon": "resources/icon.png",
 100 |       "target": [
 101 |         {
 102 |           "target": "AppImage",
 103 |           "arch": [
 104 |             "x64"
 105 |           ]
 106 |         }
 107 |       ]
 108 |     }
 109 |   }
 110 | }

```

`dbdoverlaytools-free/postcss.config.js`:

```js
   1 | export default {
   2 |   plugins: {
   3 |     tailwindcss: {},
   4 |     autoprefixer: {},
   5 |   },
   6 | }

```

`dbdoverlaytools-free/scripts\debug.js`:

```js
   1 | import fs from 'fs';
   2 | import path from 'path';
   3 | import { fileURLToPath } from 'url';
   4 | 
   5 | const __filename = fileURLToPath(import.meta.url);
   6 | const __dirname = path.dirname(__filename);
   7 | 
   8 | console.log('🔍 Checking project structure...\n');
   9 | 
  10 | // Check required files
  11 | const requiredFiles = [
  12 |   'package.json',
  13 |   'tsconfig.json',
  14 |   'vite.config.ts',
  15 |   'tailwind.config.js',
  16 |   'src/App.tsx',
  17 |   'src/main.tsx',
  18 |   'src/overlay.tsx',
  19 |   'electron/main.ts',
  20 |   'electron/preload.ts',
  21 |   'index.html',
  22 |   'overlay.html'
  23 | ];
  24 | 
  25 | requiredFiles.forEach(file => {
  26 |   const exists = fs.existsSync(path.join(__dirname, '..', file));
  27 |   console.log(`${exists ? '✅' : '❌'} ${file}`);
  28 | });
  29 | 
  30 | // Check dependencies
  31 | console.log('\n📦 Checking package.json...');
  32 | try {
  33 |   const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  34 |   console.log(`Name: ${pkg.name}`);
  35 |   console.log(`Version: ${pkg.version}`);
  36 |   console.log(`Main: ${pkg.main}`);
  37 |   
  38 |   const requiredDeps = ['react', 'react-dom', 'zustand', 'electron-store'];
  39 |   const requiredDevDeps = ['electron', 'vite', 'typescript', '@vitejs/plugin-react'];
  40 |   
  41 |   console.log('\n📋 Required dependencies:');
  42 |   requiredDeps.forEach(dep => {
  43 |     const exists = pkg.dependencies && pkg.dependencies[dep];
  44 |     console.log(`${exists ? '✅' : '❌'} ${dep}`);
  45 |   });
  46 |   
  47 |   console.log('\n🛠️ Required dev dependencies:');
  48 |   requiredDevDeps.forEach(dep => {
  49 |     const exists = pkg.devDependencies && pkg.devDependencies[dep];
  50 |     console.log(`${exists ? '✅' : '❌'} ${dep}`);
  51 |   });
  52 |   
  53 | } catch (error) {
  54 |   console.log('❌ Failed to read package.json');
  55 | }
  56 | 
  57 | console.log('\n🎯 Debug complete!');

```

`dbdoverlaytools-free/scripts\fix.js`:

```js
   1 | import fs from 'fs';
   2 | import path from 'path';
   3 | import { fileURLToPath } from 'url';
   4 | 
   5 | const __filename = fileURLToPath(import.meta.url);
   6 | const __dirname = path.dirname(__filename);
   7 | 
   8 | console.log('🔧 Fixing common DBD Timer Overlay issues...\n');
   9 | 
  10 | // Create missing directories
  11 | const dirs = ['dist', 'dist-electron', 'resources'];
  12 | dirs.forEach(dir => {
  13 |   const dirPath = path.join(__dirname, '..', dir);
  14 |   if (!fs.existsSync(dirPath)) {
  15 |     fs.mkdirSync(dirPath, { recursive: true });
  16 |     console.log(`✅ Created directory: ${dir}`);
  17 |   }
  18 | });
  19 | 
  20 | // Create resources and dummy icons
  21 | const resourcesDir = path.join(__dirname, '..', 'resources');
  22 | const iconFiles = [
  23 |   { name: 'icon.ico', content: 'ICON_PLACEHOLDER' },
  24 |   { name: 'icon.icns', content: 'ICON_PLACEHOLDER' },
  25 |   { name: 'icon.png', content: 'ICON_PLACEHOLDER' }
  26 | ];
  27 | 
  28 | iconFiles.forEach(icon => {
  29 |   const iconPath = path.join(resourcesDir, icon.name);
  30 |   if (!fs.existsSync(iconPath)) {
  31 |     fs.writeFileSync(iconPath, icon.content);
  32 |     console.log(`✅ Created dummy ${icon.name}`);
  33 |   }
  34 | });
  35 | 
  36 | // Check main entry points
  37 | const entryPoints = [
  38 |   'electron/main.ts',
  39 |   'electron/preload.ts',
  40 |   'src/main.tsx',
  41 |   'src/overlay.tsx',
  42 |   'index.html',
  43 |   'overlay.html'
  44 | ];
  45 | 
  46 | console.log('\n📋 Checking entry points:');
  47 | let allGood = true;
  48 | entryPoints.forEach(file => {
  49 |   const exists = fs.existsSync(path.join(__dirname, '..', file));
  50 |   console.log(`${exists ? '✅' : '❌'} ${file}`);
  51 |   if (!exists) allGood = false;
  52 | });
  53 | 
  54 | // Check package.json
  55 | console.log('\n📦 Checking package.json...');
  56 | try {
  57 |   const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  58 |   console.log(`✅ Package name: ${pkg.name}`);
  59 |   console.log(`✅ Main entry: ${pkg.main}`);
  60 |   
  61 |   const requiredDeps = ['react', 'react-dom', 'zustand', 'electron-store'];
  62 |   const missingDeps = requiredDeps.filter(dep => !pkg.dependencies || !pkg.dependencies[dep]);
  63 |   
  64 |   if (missingDeps.length > 0) {
  65 |     console.log('❌ Missing dependencies:', missingDeps.join(', '));
  66 |     allGood = false;
  67 |   } else {
  68 |     console.log('✅ All required dependencies present');
  69 |   }
  70 | } catch (error) {
  71 |   console.log('❌ Failed to read package.json');
  72 |   allGood = false;
  73 | }
  74 | 
  75 | // Check node_modules
  76 | console.log('\n📁 Checking node_modules...');
  77 | const nodeModulesExists = fs.existsSync(path.join(__dirname, '..', 'node_modules'));
  78 | if (!nodeModulesExists) {
  79 |   console.log('❌ node_modules not found - run "npm install"');
  80 |   allGood = false;
  81 | } else {
  82 |   console.log('✅ node_modules exists');
  83 | }
  84 | 
  85 | if (allGood) {
  86 |   console.log('\n🎉 All checks passed! You can now run:');
  87 |   console.log('   npm run electron:dev');
  88 | } else {
  89 |   console.log('\n⚠️  Some issues found. Try running:');
  90 |   console.log('   npm install');
  91 |   console.log('   npm run clean');
  92 |   console.log('   npm run electron:dev');
  93 | }
  94 | 
  95 | console.log('\n🎯 Fix complete!');

```

`dbdoverlaytools-free/scripts\setup.js`:

```js
   1 | import fs from 'fs';
   2 | import path from 'path';
   3 | import { fileURLToPath } from 'url';
   4 | 
   5 | const __filename = fileURLToPath(import.meta.url);
   6 | const __dirname = path.dirname(__filename);
   7 | 
   8 | console.log('🔧 Setting up DBD Timer Overlay project...\n');
   9 | 
  10 | // Create resources directory for icons
  11 | const resourcesDir = path.join(__dirname, '..', 'resources');
  12 | if (!fs.existsSync(resourcesDir)) {
  13 |   fs.mkdirSync(resourcesDir);
  14 |   console.log('✅ Created resources directory');
  15 | }
  16 | 
  17 | // Create dummy icon files if they don't exist
  18 | const iconFiles = [
  19 |   { name: 'icon.ico', content: 'Dummy Windows icon' },
  20 |   { name: 'icon.icns', content: 'Dummy macOS icon' },
  21 |   { name: 'icon.png', content: 'Dummy Linux icon' }
  22 | ];
  23 | 
  24 | iconFiles.forEach(icon => {
  25 |   const iconPath = path.join(resourcesDir, icon.name);
  26 |   if (!fs.existsSync(iconPath)) {
  27 |     fs.writeFileSync(iconPath, icon.content);
  28 |     console.log(`✅ Created dummy ${icon.name}`);
  29 |   }
  30 | });
  31 | 
  32 | // Check if main entry points exist
  33 | const entryPoints = [
  34 |   'electron/main.ts',
  35 |   'electron/preload.ts',
  36 |   'src/main.tsx',
  37 |   'src/overlay.tsx',
  38 |   'index.html',
  39 |   'overlay.html'
  40 | ];
  41 | 
  42 | console.log('\n📋 Checking entry points:');
  43 | entryPoints.forEach(file => {
  44 |   const exists = fs.existsSync(path.join(__dirname, '..', file));
  45 |   console.log(`${exists ? '✅' : '❌'} ${file}`);
  46 | });
  47 | 
  48 | // Check dist-electron directory
  49 | const distElectronDir = path.join(__dirname, '..', 'dist-electron');
  50 | console.log(`\n📁 dist-electron exists: ${fs.existsSync(distElectronDir) ? '✅' : '❌'}`);
  51 | 
  52 | if (fs.existsSync(distElectronDir)) {
  53 |   const files = fs.readdirSync(distElectronDir);
  54 |   console.log('Files in dist-electron:', files);
  55 |   
  56 |   // Check if main.js exists
  57 |   const mainJsExists = files.includes('main.js');
  58 |   console.log(`main.js exists: ${mainJsExists ? '✅' : '❌'}`);
  59 | }
  60 | 
  61 | console.log('\n🎯 Setup complete! Try running: npm run electron:dev');

```

`dbdoverlaytools-free/scripts\start.js`:

```js
   1 | import { spawn } from 'child_process';
   2 | import path from 'path';
   3 | import fs from 'fs';
   4 | import net from 'net';
   5 | import { fileURLToPath } from 'url';
   6 | 
   7 | const __filename = fileURLToPath(import.meta.url);
   8 | const __dirname = path.dirname(__filename);
   9 | 
  10 | console.log('🚀 Starting DBD Timer Overlay in development mode...\n');
  11 | 
  12 | // Function to wait for file existence
  13 | function waitForFile(filepath, timeout = 30000) {
  14 |   return new Promise((resolve, reject) => {
  15 |     const startTime = Date.now();
  16 |     
  17 |     const checkFile = () => {
  18 |       if (fs.existsSync(filepath)) {
  19 |         console.log(`✅ Found ${filepath}`);
  20 |         resolve(true);
  21 |         return;
  22 |       }
  23 |       
  24 |       if (Date.now() - startTime > timeout) {
  25 |         reject(new Error(`Timeout waiting for ${filepath}`));
  26 |         return;
  27 |       }
  28 |       
  29 |       setTimeout(checkFile, 100);
  30 |     };
  31 |     
  32 |     checkFile();
  33 |   });
  34 | }
  35 | 
  36 | // Function to wait for server
  37 | function waitForServer(port, timeout = 30000) {
  38 |   return new Promise((resolve, reject) => {
  39 |     const startTime = Date.now();
  40 |     
  41 |     const checkServer = () => {
  42 |       const socket = new net.Socket();
  43 |       
  44 |       socket.setTimeout(1000);
  45 |       socket.on('connect', () => {
  46 |         socket.destroy();
  47 |         console.log(`✅ Server ready on port ${port}`);
  48 |         resolve(true);
  49 |       });
  50 |       
  51 |       socket.on('timeout', () => {
  52 |         socket.destroy();
  53 |         checkAgain();
  54 |       });
  55 |       
  56 |       socket.on('error', () => {
  57 |         checkAgain();
  58 |       });
  59 |       
  60 |       const checkAgain = () => {
  61 |         if (Date.now() - startTime > timeout) {
  62 |           reject(new Error(`Timeout waiting for server on port ${port}`));
  63 |           return;
  64 |         }
  65 |         setTimeout(checkServer, 500);
  66 |       };
  67 |       
  68 |       socket.connect(port, 'localhost');
  69 |     };
  70 |     
  71 |     checkServer();
  72 |   });
  73 | }
  74 | 
  75 | async function startApp() {
  76 |   try {
  77 |     // Nettoyer les anciens builds
  78 |     console.log('🧹 Cleaning old builds...');
  79 |     const distElectronPath = path.join(__dirname, '..', 'dist-electron');
  80 |     if (fs.existsSync(distElectronPath)) {
  81 |       fs.rmSync(distElectronPath, { recursive: true, force: true });
  82 |     }
  83 |     
  84 |     // Étape 1: Build Electron en premier
  85 |     console.log('🔧 Building Electron main process...');
  86 |     const buildElectron = spawn('npx', ['vite', 'build', '--config', 'vite.config.ts', '--mode', 'development'], {
  87 |       stdio: 'pipe',
  88 |       shell: true,
  89 |       env: { ...process.env, NODE_ENV: 'development' }
  90 |     });
  91 |     
  92 |     buildElectron.stdout.on('data', (data) => {
  93 |       process.stdout.write(`[BUILD] ${data}`);
  94 |     });
  95 |     
  96 |     buildElectron.stderr.on('data', (data) => {
  97 |       process.stderr.write(`[BUILD ERROR] ${data}`);
  98 |     });
  99 |     
 100 |     await new Promise((resolve, reject) => {
 101 |       buildElectron.on('close', (code) => {
 102 |         if (code === 0) {
 103 |           console.log('✅ Electron build completed');
 104 |           resolve(null);
 105 |         } else {
 106 |           reject(new Error(`Electron build failed with code ${code}`));
 107 |         }
 108 |       });
 109 |     });
 110 |     
 111 |     // Vérifier que main.js existe
 112 |     const mainJsPath = path.join(__dirname, '..', 'dist-electron', 'main.js');
 113 |     await waitForFile(mainJsPath);
 114 |     
 115 |     // Étape 2: Démarrer Vite dev server
 116 |     console.log('📦 Starting Vite dev server...');
 117 |     const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
 118 |       stdio: 'pipe',
 119 |       shell: true
 120 |     });
 121 |     
 122 |     viteProcess.stdout.on('data', (data) => {
 123 |       const output = data.toString();
 124 |       process.stdout.write(`[VITE] ${output}`);
 125 |     });
 126 |     
 127 |     viteProcess.stderr.on('data', (data) => {
 128 |       process.stderr.write(`[VITE ERROR] ${data}`);
 129 |     });
 130 |     
 131 |     // Attendre que le serveur Vite soit prêt
 132 |     await waitForServer(5173);
 133 |     
 134 |     // Petite pause pour s'assurer que tout est stable
 135 |     await new Promise(resolve => setTimeout(resolve, 1000));
 136 |     
 137 |     // Étape 3: Démarrer Electron
 138 |     console.log('⚡ Starting Electron...');
 139 |     const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
 140 |       stdio: 'pipe',
 141 |       shell: true,
 142 |       cwd: path.join(__dirname, '..')
 143 |     });
 144 |     
 145 |     electronProcess.stdout.on('data', (data) => {
 146 |       process.stdout.write(`[ELECTRON] ${data}`);
 147 |     });
 148 |     
 149 |     electronProcess.stderr.on('data', (data) => {
 150 |       const output = data.toString();
 151 |       // Ignorer les erreurs de cache GPU qui sont normales
 152 |       if (output.includes('cache') || output.includes('Cache') || output.includes('GPU')) {
 153 |         return;
 154 |       }
 155 |       process.stderr.write(`[ELECTRON] ${data}`);
 156 |     });
 157 |     
 158 |     // Gestion de la fermeture
 159 |     process.on('SIGINT', () => {
 160 |       console.log('\n🛑 Shutting down...');
 161 |       viteProcess.kill('SIGTERM');
 162 |       electronProcess.kill('SIGTERM');
 163 |       setTimeout(() => {
 164 |         process.exit(0);
 165 |       }, 1000);
 166 |     });
 167 |     
 168 |     electronProcess.on('close', (code) => {
 169 |       console.log(`\n📱 Electron exited with code ${code}`);
 170 |       viteProcess.kill('SIGTERM');
 171 |       process.exit(code);
 172 |     });
 173 |     
 174 |     viteProcess.on('close', (code) => {
 175 |       console.log(`\n📦 Vite exited with code ${code}`);
 176 |       electronProcess.kill('SIGTERM');
 177 |       process.exit(code);
 178 |     });
 179 |     
 180 |     console.log('🎉 Application started successfully!');
 181 |     
 182 |   } catch (error) {
 183 |     console.error('❌ Error starting application:', error.message);
 184 |     process.exit(1);
 185 |   }
 186 | }
 187 | 
 188 | startApp();

```

`dbdoverlaytools-free/src\App.tsx`:

```tsx
   1 | // src/App.tsx
   2 | import React, { useEffect } from 'react';
   3 | import { useTimerStore } from './store/timerStore';
   4 | import ControlPanel from './components/ControlPanel';
   5 | import useElectronStore from './hooks/useElectronStore';
   6 | import useGlobalHotkeys from './hooks/useGlobalHotkeys';
   7 | 
   8 | const App: React.FC = () => {
   9 |   const { loadFromStorage, saveToStorage } = useTimerStore();
  10 |   
  11 |   useElectronStore();
  12 |   useGlobalHotkeys();
  13 | 
  14 |   useEffect(() => {
  15 |     loadFromStorage();
  16 | 
  17 |     const handleBeforeUnload = () => {
  18 |       saveToStorage();
  19 |     };
  20 | 
  21 |     window.addEventListener('beforeunload', handleBeforeUnload);
  22 | 
  23 |     return () => {
  24 |       window.removeEventListener('beforeunload', handleBeforeUnload);
  25 |       if (window.electronAPI) {
  26 |         window.electronAPI.removeAllListeners();
  27 |       }
  28 |     };
  29 |   }, [loadFromStorage, saveToStorage]);
  30 | 
  31 |   return (
  32 |     <div className="min-h-screen bg-gray-900 text-white">
  33 |       <div className="container mx-auto p-6">
  34 |         <header className="mb-8">
  35 |           <h1 className="text-3xl font-bold text-primary-400 mb-2">
  36 |             DBD Timer Overlay
  37 |           </h1>
  38 |           <p className="text-gray-400">
  39 |             Lightweight 1v1 timer for Dead by Daylight competitive matches
  40 |           </p>
  41 |         </header>
  42 |         
  43 |         <ControlPanel />
  44 |       </div>
  45 |     </div>
  46 |   );
  47 | };
  48 | 
  49 | export default App;

```

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | // src/components/ControlPanel.tsx
   2 | import React, { useEffect } from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | import useTimer from '../hooks/useTimer';
   5 | import TimerControls from './TimerControls';
   6 | import PlayerSettings from './PlayerSettings';
   7 | import OverlaySettings from './OverlaySettings';
   8 | import HotkeySettings from './HotkeySettings';
   9 | 
  10 | const ControlPanel: React.FC = () => {
  11 |   const {
  12 |     timerData,
  13 |     overlaySettings,
  14 |     isOverlayVisible,
  15 |     setOverlayVisible,
  16 |     saveToStorage,
  17 |   } = useTimerStore();
  18 | 
  19 |   const { formattedTime1, formattedTime2, isRunning } = useTimer();
  20 | 
  21 |   // Listen for overlay status changes
  22 |   useEffect(() => {
  23 |     if (!window.electronAPI) return;
  24 | 
  25 |     const unsubscribeOverlayReady = window.electronAPI.overlay.onReady((isReady: boolean) => {
  26 |       setOverlayVisible(isReady);
  27 |     });
  28 | 
  29 |     return () => {
  30 |       unsubscribeOverlayReady();
  31 |     };
  32 |   }, [setOverlayVisible]);
  33 | 
  34 |   const handleToggleOverlay = async () => {
  35 |     if (!window.electronAPI) return;
  36 | 
  37 |     try {
  38 |       if (isOverlayVisible) {
  39 |         await window.electronAPI.overlay.hide();
  40 |         setOverlayVisible(false);
  41 |       } else {
  42 |         await window.electronAPI.overlay.show();
  43 |         setOverlayVisible(true);
  44 |       }
  45 |       saveToStorage();
  46 |     } catch (error) {
  47 |       console.error('Failed to toggle overlay:', error);
  48 |     }
  49 |   };
  50 | 
  51 |   return (
  52 |     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  53 |       <div className="space-y-6">
  54 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  55 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
  56 |             Timer Control
  57 |           </h2>
  58 |           
  59 |           <div className="mb-6">
  60 |             <div className="grid grid-cols-2 gap-4 mb-4">
  61 |               <div className="text-center">
  62 |                 <div className="text-sm text-gray-400 mb-1">
  63 |                   {timerData.player1Name}
  64 |                 </div>
  65 |                 <div className={`text-2xl font-mono font-bold ${
  66 |                   timerData.currentTimer === 1 && isRunning 
  67 |                     ? 'text-primary-400 timer-glow' 
  68 |                     : 'text-white'
  69 |                 }`}>
  70 |                   {formattedTime1}
  71 |                 </div>
  72 |               </div>
  73 |               
  74 |               <div className="text-center">
  75 |                 <div className="text-sm text-gray-400 mb-1">
  76 |                   {timerData.player2Name}
  77 |                 </div>
  78 |                 <div className={`text-2xl font-mono font-bold ${
  79 |                   timerData.currentTimer === 2 && isRunning 
  80 |                     ? 'text-primary-400 timer-glow' 
  81 |                     : 'text-white'
  82 |                 }`}>
  83 |                   {formattedTime2}
  84 |                 </div>
  85 |               </div>
  86 |             </div>
  87 |             
  88 |             <div className="text-center text-lg font-semibold">
  89 |               Score: {timerData.player1Score} - {timerData.player2Score}
  90 |             </div>
  91 |           </div>
  92 |           
  93 |           <TimerControls />
  94 |         </div>
  95 | 
  96 |         <PlayerSettings />
  97 |       </div>
  98 | 
  99 |       <div className="space-y-6">
 100 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
 101 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
 102 |             Overlay Control
 103 |           </h2>
 104 |           
 105 |           <div className="space-y-4">
 106 |             <button
 107 |               onClick={handleToggleOverlay}
 108 |               className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
 109 |                 isOverlayVisible
 110 |                   ? 'bg-success-600 hover:bg-success-700 text-white'
 111 |                   : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
 112 |               }`}
 113 |             >
 114 |               {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
 115 |             </button>
 116 |             
 117 |             <div className="text-sm text-gray-400">
 118 |               Status: {isOverlayVisible ? 'Visible' : 'Hidden'}
 119 |             </div>
 120 |           </div>
 121 |         </div>
 122 | 
 123 |         <OverlaySettings />
 124 |         <HotkeySettings />
 125 |       </div>
 126 |     </div>
 127 |   );
 128 | };
 129 | 
 130 | export default ControlPanel;

```

`dbdoverlaytools-free/src\components\HotkeySettings.tsx`:

```tsx
   1 | // src/components/HotkeySettings.tsx
   2 | import React, { useState } from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | 
   5 | const HotkeySettings: React.FC = () => {
   6 |   const { timerData, updateHotkeys, saveToStorage } = useTimerStore();
   7 |   
   8 |   const [startKey, setStartKey] = useState(timerData.startHotkey);
   9 |   const [swapKey, setSwapKey] = useState(timerData.swapHotkey);
  10 |   const [isListening, setIsListening] = useState<'start' | 'swap' | null>(null);
  11 | 
  12 |   const handleKeyCapture = (type: 'start' | 'swap') => {
  13 |     setIsListening(type);
  14 |     
  15 |     const handleKeyDown = (e: KeyboardEvent) => {
  16 |       e.preventDefault();
  17 |       e.stopPropagation();
  18 |       
  19 |       let key = '';
  20 |       
  21 |       if (e.code.startsWith('F') && /^F\d+$/.test(e.code)) {
  22 |         key = e.code;
  23 |       } else if (e.code.startsWith('Key')) {
  24 |         key = e.code.slice(3);
  25 |       } else if (e.code.startsWith('Digit')) {
  26 |         key = e.code.slice(5);
  27 |       } else {
  28 |         key = e.code;
  29 |       }
  30 |       
  31 |       if (type === 'start') {
  32 |         setStartKey(key);
  33 |       } else {
  34 |         setSwapKey(key);
  35 |       }
  36 |       
  37 |       setIsListening(null);
  38 |       document.removeEventListener('keydown', handleKeyDown);
  39 |     };
  40 |     
  41 |     document.addEventListener('keydown', handleKeyDown);
  42 |     
  43 |     setTimeout(() => {
  44 |       if (isListening === type) {
  45 |         setIsListening(null);
  46 |         document.removeEventListener('keydown', handleKeyDown);
  47 |       }
  48 |     }, 5000);
  49 |   };
  50 | 
  51 |   const handleSave = async () => {
  52 |     const hotkeys = {
  53 |       start: startKey,
  54 |       swap: swapKey,
  55 |     };
  56 |     
  57 |     updateHotkeys(hotkeys);
  58 |     
  59 |     if (window.electronAPI) {
  60 |       await window.electronAPI.hotkeys.register(hotkeys);
  61 |     }
  62 |     
  63 |     saveToStorage();
  64 |   };
  65 | 
  66 |   const handleReset = () => {
  67 |     setStartKey('F1');
  68 |     setSwapKey('F2');
  69 |   };
  70 | 
  71 |   return (
  72 |     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  73 |       <h2 className="text-xl font-semibold text-primary-400 mb-4">
  74 |         Hotkey Settings
  75 |       </h2>
  76 |       
  77 |       <div className="space-y-4">
  78 |         <div>
  79 |           <label className="block text-sm font-medium text-gray-300 mb-2">
  80 |             Start/Pause Timer
  81 |           </label>
  82 |           <button
  83 |             onClick={() => handleKeyCapture('start')}
  84 |             className={`w-full py-2 px-4 rounded-md border text-left transition-colors ${
  85 |               isListening === 'start'
  86 |                 ? 'bg-primary-600 border-primary-500 text-white'
  87 |                 : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
  88 |             }`}
  89 |           >
  90 |             {isListening === 'start' ? 'Press any key...' : startKey}
  91 |           </button>
  92 |         </div>
  93 | 
  94 |         <div>
  95 |           <label className="block text-sm font-medium text-gray-300 mb-2">
  96 |             Swap Timer
  97 |           </label>
  98 |           <button
  99 |             onClick={() => handleKeyCapture('swap')}
 100 |             className={`w-full py-2 px-4 rounded-md border text-left transition-colors ${
 101 |               isListening === 'swap'
 102 |                 ? 'bg-primary-600 border-primary-500 text-white'
 103 |                 : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
 104 |             }`}
 105 |           >
 106 |             {isListening === 'swap' ? 'Press any key...' : swapKey}
 107 |           </button>
 108 |         </div>
 109 | 
 110 |         <div className="flex gap-3">
 111 |           <button
 112 |             onClick={handleSave}
 113 |             disabled={isListening !== null}
 114 |             className="flex-1 py-2 px-4 bg-success-600 hover:bg-success-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
 115 |           >
 116 |             Save Hotkeys
 117 |           </button>
 118 |           
 119 |           <button
 120 |             onClick={handleReset}
 121 |             disabled={isListening !== null}
 122 |             className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-300 rounded-md font-medium transition-colors"
 123 |           >
 124 |             Reset
 125 |           </button>
 126 |         </div>
 127 | 
 128 |         <div className="text-xs text-gray-500">
 129 |           Global hotkeys work even when the app is not focused. Current: Start ({timerData.startHotkey}), Swap ({timerData.swapHotkey})
 130 |         </div>
 131 |       </div>
 132 |     </div>
 133 |   );
 134 | };
 135 | 
 136 | export default HotkeySettings;

```

`dbdoverlaytools-free/src\components\OverlayApp.tsx`:

```tsx
   1 | // src/components/OverlayApp.tsx
   2 | import React, { useEffect, useState } from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | import TimerOverlay from './overlay/TimerOverlay';
   5 | import DragHandle from './overlay/DragHandle';
   6 | import type { TimerData, TimerStyle } from '../types';
   7 | 
   8 | const OverlayApp: React.FC = () => {
   9 |   const { timerData, overlaySettings } = useTimerStore();
  10 |   const [localTimerData, setLocalTimerData] = useState<TimerData>(timerData);
  11 |   const [currentStyle, setCurrentStyle] = useState<TimerStyle>(timerData.style);
  12 | 
  13 |   useEffect(() => {
  14 |     if (!window.electronAPI) return;
  15 | 
  16 |     const handleTimerUpdate = (data: any) => {
  17 |       setLocalTimerData(prev => ({ ...prev, ...data }));
  18 |     };
  19 | 
  20 |     const handleDataSync = (data: TimerData) => {
  21 |       setLocalTimerData(data);
  22 |     };
  23 | 
  24 |     const handleStyleChange = (style: TimerStyle) => {
  25 |       setCurrentStyle(style);
  26 |     };
  27 | 
  28 |     window.electronAPI.overlay.onTimerUpdate(handleTimerUpdate);
  29 |     window.electronAPI.overlay.onDataSync(handleDataSync);
  30 |     window.electronAPI.overlay.onStyleChange(handleStyleChange);
  31 | 
  32 |     return () => {
  33 |       window.electronAPI.removeAllListeners();
  34 |     };
  35 |   }, []);
  36 | 
  37 |   const containerStyle: React.CSSProperties = {
  38 |     transform: `scale(${overlaySettings.scale / 100})`,
  39 |     transformOrigin: 'top left',
  40 |     position: 'fixed',
  41 |     top: 0,
  42 |     left: 0,
  43 |     width: '100%',
  44 |     height: '100%',
  45 |     pointerEvents: overlaySettings.locked ? 'none' : 'auto',
  46 |     userSelect: 'none',
  47 |   };
  48 | 
  49 |   return (
  50 |     <div style={containerStyle}>
  51 |       {!overlaySettings.locked && <DragHandle />}
  52 |       <TimerOverlay
  53 |         timerData={localTimerData}
  54 |         style={currentStyle}
  55 |         isActive={localTimerData.isRunning}
  56 |       />
  57 |     </div>
  58 |   );
  59 | };
  60 | 
  61 | export default OverlayApp;

```

`dbdoverlaytools-free/src\components\OverlaySettings.tsx`:

```tsx
   1 | // src/components/OverlaySettings.tsx
   2 | import React from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | import type { TimerStyle } from '../types';
   5 | 
   6 | const OverlaySettings: React.FC = () => {
   7 |   const {
   8 |     timerData,
   9 |     overlaySettings,
  10 |     updateStyle,
  11 |     toggleOverlayLock,
  12 |     updateOverlayScale,
  13 |     saveToStorage,
  14 |   } = useTimerStore();
  15 | 
  16 |   const styles: { value: TimerStyle; label: string }[] = [
  17 |     { value: 'default', label: 'Default' },
  18 |     { value: 'minimal', label: 'Minimal' },
  19 |     { value: 'circular', label: 'Circular' },
  20 |     { value: 'nostalgia', label: 'Nostalgia' },
  21 |   ];
  22 | 
  23 |   const handleStyleChange = (style: TimerStyle) => {
  24 |     updateStyle(style);
  25 |     if (window.electronAPI) {
  26 |       window.electronAPI.overlay.styleChange(style);
  27 |     }
  28 |     saveToStorage();
  29 |   };
  30 | 
  31 |   const handleLockToggle = async () => {
  32 |     const newLocked = !overlaySettings.locked;
  33 |     toggleOverlayLock();
  34 |     
  35 |     if (window.electronAPI) {
  36 |       await window.electronAPI.overlay.updateSettings({ locked: newLocked });
  37 |     }
  38 |     saveToStorage();
  39 |   };
  40 | 
  41 |   const handleScaleChange = async (scale: number) => {
  42 |     updateOverlayScale(scale);
  43 |     
  44 |     if (window.electronAPI) {
  45 |       await window.electronAPI.overlay.updateSettings({ scale });
  46 |     }
  47 |     saveToStorage();
  48 |   };
  49 | 
  50 |   return (
  51 |     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  52 |       <h2 className="text-xl font-semibold text-primary-400 mb-4">
  53 |         Overlay Settings
  54 |       </h2>
  55 |       
  56 |       <div className="space-y-4">
  57 |         <div>
  58 |           <label className="block text-sm font-medium text-gray-300 mb-2">
  59 |             Style
  60 |           </label>
  61 |           <div className="grid grid-cols-2 gap-2">
  62 |             {styles.map(({ value, label }) => (
  63 |               <button
  64 |                 key={value}
  65 |                 onClick={() => handleStyleChange(value)}
  66 |                 className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
  67 |                   timerData.style === value
  68 |                     ? 'bg-primary-600 text-white'
  69 |                     : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  70 |                 }`}
  71 |               >
  72 |                 {label}
  73 |               </button>
  74 |             ))}
  75 |           </div>
  76 |         </div>
  77 | 
  78 |         <div>
  79 |           <label className="block text-sm font-medium text-gray-300 mb-2">
  80 |             Scale: {overlaySettings.scale}%
  81 |           </label>
  82 |           <input
  83 |             type="range"
  84 |             min="50"
  85 |             max="200"
  86 |             step="10"
  87 |             value={overlaySettings.scale}
  88 |             onChange={(e) => handleScaleChange(parseInt(e.target.value))}
  89 |             className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
  90 |           />
  91 |           <div className="flex justify-between text-xs text-gray-500 mt-1">
  92 |             <span>50%</span>
  93 |             <span>100%</span>
  94 |             <span>200%</span>
  95 |           </div>
  96 |         </div>
  97 | 
  98 |         <div className="flex items-center justify-between">
  99 |           <span className="text-sm font-medium text-gray-300">
 100 |             Lock Position
 101 |           </span>
 102 |           <button
 103 |             onClick={handleLockToggle}
 104 |             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
 105 |               overlaySettings.locked ? 'bg-primary-600' : 'bg-gray-700'
 106 |             }`}
 107 |           >
 108 |             <span
 109 |               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
 110 |                 overlaySettings.locked ? 'translate-x-6' : 'translate-x-1'
 111 |               }`}
 112 |             />
 113 |           </button>
 114 |         </div>
 115 | 
 116 |         <div className="text-xs text-gray-500">
 117 |           {overlaySettings.locked 
 118 |             ? 'Overlay position is locked and click-through is enabled'
 119 |             : 'Overlay can be moved by dragging'}
 120 |         </div>
 121 | 
 122 |         <div className="text-xs text-gray-500">
 123 |           Position: X: {overlaySettings.x}, Y: {overlaySettings.y}
 124 |         </div>
 125 |       </div>
 126 |     </div>
 127 |   );
 128 | };
 129 | 
 130 | export default OverlaySettings;

```

`dbdoverlaytools-free/src\components\PlayerSettings.tsx`:

```tsx
   1 | // src/components/PlayerSettings.tsx
   2 | import React, { useState } from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | 
   5 | const PlayerSettings: React.FC = () => {
   6 |   const {
   7 |     timerData,
   8 |     updatePlayerName,
   9 |     updatePlayerScore,
  10 |     saveToStorage,
  11 |   } = useTimerStore();
  12 | 
  13 |   const [player1Input, setPlayer1Input] = useState(timerData.player1Name);
  14 |   const [player2Input, setPlayer2Input] = useState(timerData.player2Name);
  15 | 
  16 |   const handlePlayer1NameSubmit = (e: React.FormEvent) => {
  17 |     e.preventDefault();
  18 |     updatePlayerName(1, player1Input.trim() || 'PLAYER 1');
  19 |     saveToStorage();
  20 |   };
  21 | 
  22 |   const handlePlayer2NameSubmit = (e: React.FormEvent) => {
  23 |     e.preventDefault();
  24 |     updatePlayerName(2, player2Input.trim() || 'PLAYER 2');
  25 |     saveToStorage();
  26 |   };
  27 | 
  28 |   const handleScoreChange = (player: 1 | 2, delta: number) => {
  29 |     updatePlayerScore(player, delta);
  30 |     saveToStorage();
  31 |   };
  32 | 
  33 |   return (
  34 |     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  35 |       <h2 className="text-xl font-semibold text-primary-400 mb-4">
  36 |         Player Settings
  37 |       </h2>
  38 |       
  39 |       <div className="space-y-6">
  40 |         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  41 |           <div>
  42 |             <label className="block text-sm font-medium text-gray-300 mb-2">
  43 |               Player 1 Name
  44 |             </label>
  45 |             <form onSubmit={handlePlayer1NameSubmit} className="space-y-2">
  46 |               <input
  47 |                 type="text"
  48 |                 value={player1Input}
  49 |                 onChange={(e) => setPlayer1Input(e.target.value)}
  50 |                 maxLength={20}
  51 |                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
  52 |                 placeholder="Enter player 1 name"
  53 |               />
  54 |               <button
  55 |                 type="submit"
  56 |                 className="w-full py-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
  57 |               >
  58 |                 Update
  59 |               </button>
  60 |             </form>
  61 |             
  62 |             <div className="mt-3">
  63 |               <label className="block text-sm font-medium text-gray-300 mb-2">
  64 |                 Score: {timerData.player1Score}
  65 |               </label>
  66 |               <div className="flex gap-2">
  67 |                 <button
  68 |                   onClick={() => handleScoreChange(1, -1)}
  69 |                   className="flex-1 py-1 px-2 bg-danger-600 hover:bg-danger-700 text-white rounded text-sm font-medium transition-colors"
  70 |                 >
  71 |                   -1
  72 |                 </button>
  73 |                 <button
  74 |                   onClick={() => handleScoreChange(1, 1)}
  75 |                   className="flex-1 py-1 px-2 bg-success-600 hover:bg-success-700 text-white rounded text-sm font-medium transition-colors"
  76 |                 >
  77 |                   +1
  78 |                 </button>
  79 |               </div>
  80 |             </div>
  81 |           </div>
  82 | 
  83 |           <div>
  84 |             <label className="block text-sm font-medium text-gray-300 mb-2">
  85 |               Player 2 Name
  86 |             </label>
  87 |             <form onSubmit={handlePlayer2NameSubmit} className="space-y-2">
  88 |               <input
  89 |                 type="text"
  90 |                 value={player2Input}
  91 |                 onChange={(e) => setPlayer2Input(e.target.value)}
  92 |                 maxLength={20}
  93 |                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
  94 |                 placeholder="Enter player 2 name"
  95 |               />
  96 |               <button
  97 |                 type="submit"
  98 |                 className="w-full py-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
  99 |               >
 100 |                 Update
 101 |               </button>
 102 |             </form>
 103 |             
 104 |             <div className="mt-3">
 105 |               <label className="block text-sm font-medium text-gray-300 mb-2">
 106 |                 Score: {timerData.player2Score}
 107 |               </label>
 108 |               <div className="flex gap-2">
 109 |                 <button
 110 |                   onClick={() => handleScoreChange(2, -1)}
 111 |                   className="flex-1 py-1 px-2 bg-danger-600 hover:bg-danger-700 text-white rounded text-sm font-medium transition-colors"
 112 |                 >
 113 |                   -1
 114 |                 </button>
 115 |                 <button
 116 |                   onClick={() => handleScoreChange(2, 1)}
 117 |                   className="flex-1 py-1 px-2 bg-success-600 hover:bg-success-700 text-white rounded text-sm font-medium transition-colors"
 118 |                 >
 119 |                   +1
 120 |                 </button>
 121 |               </div>
 122 |             </div>
 123 |           </div>
 124 |         </div>
 125 |       </div>
 126 |     </div>
 127 |   );
 128 | };
 129 | 
 130 | export default PlayerSettings;

```

`dbdoverlaytools-free/src\components\TimerControls.tsx`:

```tsx
   1 | // src/components/TimerControls.tsx
   2 | import React from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | import useTimer from '../hooks/useTimer';
   5 | 
   6 | const TimerControls: React.FC = () => {
   7 |   const {
   8 |     timerData,
   9 |     setCurrentTimer,
  10 |     resetTimer,
  11 |     resetAllTimers,
  12 |     saveToStorage,
  13 |   } = useTimerStore();
  14 | 
  15 |   const { isRunning, startTimer, pauseTimer, swapTimer } = useTimer();
  16 | 
  17 |   const handleStartPause = () => {
  18 |     if (isRunning) {
  19 |       pauseTimer();
  20 |     } else {
  21 |       startTimer();
  22 |     }
  23 |     saveToStorage();
  24 |   };
  25 | 
  26 |   const handleSwap = () => {
  27 |     swapTimer();
  28 |     saveToStorage();
  29 |   };
  30 | 
  31 |   const handleResetCurrent = () => {
  32 |     resetTimer();
  33 |     saveToStorage();
  34 |   };
  35 | 
  36 |   const handleResetAll = () => {
  37 |     resetAllTimers();
  38 |     saveToStorage();
  39 |   };
  40 | 
  41 |   const handleTimerSelect = (timer: 1 | 2) => {
  42 |     setCurrentTimer(timer);
  43 |     saveToStorage();
  44 |   };
  45 | 
  46 |   return (
  47 |     <div className="space-y-4">
  48 |       <div className="grid grid-cols-2 gap-3">
  49 |         <button
  50 |           onClick={() => handleTimerSelect(1)}
  51 |           className={`py-2 px-4 rounded-md font-medium transition-colors ${
  52 |             timerData.currentTimer === 1
  53 |               ? 'bg-primary-600 text-white'
  54 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  55 |           }`}
  56 |         >
  57 |           Timer 1
  58 |         </button>
  59 |         
  60 |         <button
  61 |           onClick={() => handleTimerSelect(2)}
  62 |           className={`py-2 px-4 rounded-md font-medium transition-colors ${
  63 |             timerData.currentTimer === 2
  64 |               ? 'bg-primary-600 text-white'
  65 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  66 |           }`}
  67 |         >
  68 |           Timer 2
  69 |         </button>
  70 |       </div>
  71 | 
  72 |       <div className="grid grid-cols-2 gap-3">
  73 |         <button
  74 |           onClick={handleStartPause}
  75 |           className={`py-3 px-4 rounded-md font-semibold transition-colors ${
  76 |             isRunning
  77 |               ? 'bg-danger-600 hover:bg-danger-700 text-white'
  78 |               : 'bg-success-600 hover:bg-success-700 text-white'
  79 |           }`}
  80 |         >
  81 |           {isRunning ? 'Pause' : 'Start'}
  82 |         </button>
  83 |         
  84 |         <button
  85 |           onClick={handleSwap}
  86 |           className="py-3 px-4 bg-info-600 hover:bg-info-700 text-white rounded-md font-semibold transition-colors"
  87 |         >
  88 |           Swap
  89 |         </button>
  90 |       </div>
  91 | 
  92 |       <div className="grid grid-cols-2 gap-3">
  93 |         <button
  94 |           onClick={handleResetCurrent}
  95 |           className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
  96 |         >
  97 |           Reset Current
  98 |         </button>
  99 |         
 100 |         <button
 101 |           onClick={handleResetAll}
 102 |           className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
 103 |         >
 104 |           Reset All
 105 |         </button>
 106 |       </div>
 107 | 
 108 |       <div className="text-sm text-gray-400 text-center">
 109 |         Active Timer: {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
 110 |       </div>
 111 |     </div>
 112 |   );
 113 | };
 114 | 
 115 | export default TimerControls;

```

`dbdoverlaytools-free/src\components\overlay\DragHandle.tsx`:

```tsx
   1 | import React from 'react';
   2 | 
   3 | const DragHandle: React.FC = () => {
   4 |   return (
   5 |     <div className="drag-handle absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-primary-600 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 rounded-b-md flex items-center justify-center cursor-move">
   6 |       <div className="flex space-x-1">
   7 |         <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
   8 |         <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
   9 |         <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
  10 |       </div>
  11 |     </div>
  12 |   );
  13 | };
  14 | 
  15 | export default DragHandle;

```

`dbdoverlaytools-free/src\components\overlay\PlayerName.tsx`:

```tsx
   1 | import React, { useEffect, useState } from 'react';
   2 | import { cn } from '../../utils/cn';
   3 | 
   4 | interface PlayerNameProps {
   5 |   name: string;
   6 |   isActive: boolean;
   7 |   className?: string;
   8 | }
   9 | 
  10 | const PlayerName: React.FC<PlayerNameProps> = ({ name, isActive, className }) => {
  11 |   const [shouldScroll, setShouldScroll] = useState(false);
  12 | 
  13 |   useEffect(() => {
  14 |     setShouldScroll(name.length > 12);
  15 |   }, [name]);
  16 | 
  17 |   return (
  18 |     <div
  19 |       className={cn(
  20 |         'font-semibold transition-colors duration-200',
  21 |         isActive ? 'text-primary-300' : 'text-gray-300',
  22 |         shouldScroll ? 'scrolling-text' : '',
  23 |         className
  24 |       )}
  25 |     >
  26 |       <div className={shouldScroll ? 'scrolling-text active' : ''}>
  27 |         {name}
  28 |       </div>
  29 |     </div>
  30 |   );
  31 | };
  32 | 
  33 | export default PlayerName;

```

`dbdoverlaytools-free/src\components\overlay\ScoreDisplay.tsx`:

```tsx
   1 | import React from 'react';
   2 | import { cn } from '../../utils/cn';
   3 | 
   4 | interface ScoreDisplayProps {
   5 |   player1Score: number;
   6 |   player2Score: number;
   7 |   className?: string;
   8 | }
   9 | 
  10 | const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ player1Score, player2Score, className }) => {
  11 |   return (
  12 |     <div className={cn('text-white font-bold', className)}>
  13 |       <span className={player1Score > player2Score ? 'text-success-400' : ''}>
  14 |         {player1Score}
  15 |       </span>
  16 |       <span className="mx-2 text-gray-400">-</span>
  17 |       <span className={player2Score > player1Score ? 'text-success-400' : ''}>
  18 |         {player2Score}
  19 |       </span>
  20 |     </div>
  21 |   );
  22 | };
  23 | 
  24 | export default ScoreDisplay;

```

`dbdoverlaytools-free/src\components\overlay\Timer.tsx`:

```tsx
   1 | import React from 'react';
   2 | import { cn } from '../../utils/cn';
   3 | 
   4 | interface TimerProps {
   5 |   value: string;
   6 |   isActive: boolean;
   7 |   className?: string;
   8 | }
   9 | 
  10 | const Timer: React.FC<TimerProps> = ({ value, isActive, className }) => {
  11 |   return (
  12 |     <div
  13 |       className={cn(
  14 |         'font-mono font-bold transition-all duration-200',
  15 |         isActive 
  16 |           ? 'text-primary-400 timer-glow animate-pulse' 
  17 |           : 'text-white',
  18 |         className
  19 |       )}
  20 |     >
  21 |       {value}
  22 |     </div>
  23 |   );
  24 | };
  25 | 
  26 | export default Timer;

```

`dbdoverlaytools-free/src\components\overlay\TimerOverlay.tsx`:

```tsx
   1 | import React from 'react';
   2 | import { formatTime } from '../../utils/timer';
   3 | import type { TimerData, TimerStyle } from '../../types';
   4 | import DefaultStyle from './styles/DefaultStyle';
   5 | import MinimalStyle from './styles/MinimalStyle';
   6 | import CircularStyle from './styles/CircularStyle';
   7 | import NostalgiaStyle from './styles/NostalgiaStyle';
   8 | 
   9 | interface TimerOverlayProps {
  10 |   timerData: TimerData;
  11 |   style: TimerStyle;
  12 |   isActive: boolean;
  13 | }
  14 | 
  15 | const TimerOverlay: React.FC<TimerOverlayProps> = ({ timerData, style, isActive }) => {
  16 |   const timer1Display = formatTime(timerData.timer1Value);
  17 |   const timer2Display = formatTime(timerData.timer2Value);
  18 |   
  19 |   const overlayData = {
  20 |     player1Name: timerData.player1Name,
  21 |     player2Name: timerData.player2Name,
  22 |     player1Score: timerData.player1Score,
  23 |     player2Score: timerData.player2Score,
  24 |     timer1: timer1Display,
  25 |     timer2: timer2Display,
  26 |     currentTimer: timerData.currentTimer,
  27 |     isRunning: isActive,
  28 |   };
  29 | 
  30 |   switch (style) {
  31 |     case 'minimal':
  32 |       return <MinimalStyle {...overlayData} />;
  33 |     case 'circular':
  34 |       return <CircularStyle {...overlayData} />;
  35 |     case 'nostalgia':
  36 |       return <NostalgiaStyle {...overlayData} />;
  37 |     case 'default':
  38 |     default:
  39 |       return <DefaultStyle {...overlayData} />;
  40 |   }
  41 | };
  42 | 
  43 | export default TimerOverlay;

```

`dbdoverlaytools-free/src\components\overlay\styles\CircularStyle.tsx`:

```tsx
   1 | import React from 'react';
   2 | import Timer from '../Timer';
   3 | import PlayerName from '../PlayerName';
   4 | import ScoreDisplay from '../ScoreDisplay';
   5 | 
   6 | interface CircularStyleProps {
   7 |   player1Name: string;
   8 |   player2Name: string;
   9 |   player1Score: number;
  10 |   player2Score: number;
  11 |   timer1: string;
  12 |   timer2: string;
  13 |   currentTimer: 1 | 2;
  14 |   isRunning: boolean;
  15 | }
  16 | 
  17 | const CircularStyle: React.FC<CircularStyleProps> = ({
  18 |   player1Name,
  19 |   player2Name,
  20 |   player1Score,
  21 |   player2Score,
  22 |   timer1,
  23 |   timer2,
  24 |   currentTimer,
  25 |   isRunning,
  26 | }) => {
  27 |   return (
  28 |     <div className="w-[420px] h-[160px] relative">
  29 |       <div className="absolute inset-0 bg-gray-900 bg-opacity-90 rounded-full border-2 border-gray-700"></div>
  30 |       
  31 |       <div className="relative flex items-center justify-center h-full">
  32 |         <div className="absolute left-8 text-center">
  33 |           <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 ${
  34 |             currentTimer === 1 && isRunning
  35 |               ? 'border-primary-400 bg-primary-900 bg-opacity-50'
  36 |               : 'border-gray-600 bg-gray-800 bg-opacity-50'
  37 |           }`}>
  38 |             <Timer 
  39 |               value={timer1}
  40 |               isActive={currentTimer === 1 && isRunning}
  41 |               className="text-sm font-mono"
  42 |             />
  43 |           </div>
  44 |           <PlayerName 
  45 |             name={player1Name} 
  46 |             isActive={currentTimer === 1 && isRunning}
  47 |             className="text-xs"
  48 |           />
  49 |         </div>
  50 | 
  51 |         <div className="text-center">
  52 |           <ScoreDisplay 
  53 |             player1Score={player1Score}
  54 |             player2Score={player2Score}
  55 |             className="text-2xl font-bold"
  56 |           />
  57 |         </div>
  58 | 
  59 |         <div className="absolute right-8 text-center">
  60 |           <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 ${
  61 |             currentTimer === 2 && isRunning
  62 |               ? 'border-primary-400 bg-primary-900 bg-opacity-50'
  63 |               : 'border-gray-600 bg-gray-800 bg-opacity-50'
  64 |           }`}>
  65 |             <Timer 
  66 |               value={timer2}
  67 |               isActive={currentTimer === 2 && isRunning}
  68 |               className="text-sm font-mono"
  69 |             />
  70 |           </div>
  71 |           <PlayerName 
  72 |             name={player2Name} 
  73 |             isActive={currentTimer === 2 && isRunning}
  74 |             className="text-xs"
  75 |           />
  76 |         </div>
  77 |       </div>
  78 |     </div>
  79 |   );
  80 | };
  81 | 
  82 | export default CircularStyle;

```

`dbdoverlaytools-free/src\components\overlay\styles\DefaultStyle.tsx`:

```tsx
   1 | import React from 'react';
   2 | import Timer from '../Timer';
   3 | import PlayerName from '../PlayerName';
   4 | import ScoreDisplay from '../ScoreDisplay';
   5 | 
   6 | interface DefaultStyleProps {
   7 |   player1Name: string;
   8 |   player2Name: string;
   9 |   player1Score: number;
  10 |   player2Score: number;
  11 |   timer1: string;
  12 |   timer2: string;
  13 |   currentTimer: 1 | 2;
  14 |   isRunning: boolean;
  15 | }
  16 | 
  17 | const DefaultStyle: React.FC<DefaultStyleProps> = ({
  18 |   player1Name,
  19 |   player2Name,
  20 |   player1Score,
  21 |   player2Score,
  22 |   timer1,
  23 |   timer2,
  24 |   currentTimer,
  25 |   isRunning,
  26 | }) => {
  27 |   return (
  28 |     <div className="w-[520px] h-[120px] bg-gray-900 bg-opacity-95 border border-gray-700 rounded-lg p-4">
  29 |       <div className="flex items-center justify-between h-full">
  30 |         <div className="flex-1 text-center">
  31 |           <PlayerName 
  32 |             name={player1Name} 
  33 |             isActive={currentTimer === 1 && isRunning}
  34 |             className="mb-2"
  35 |           />
  36 |           <Timer 
  37 |             value={timer1}
  38 |             isActive={currentTimer === 1 && isRunning}
  39 |             className="text-2xl"
  40 |           />
  41 |         </div>
  42 |         
  43 |         <div className="px-6">
  44 |           <ScoreDisplay 
  45 |             player1Score={player1Score}
  46 |             player2Score={player2Score}
  47 |             className="text-xl font-bold"
  48 |           />
  49 |         </div>
  50 |         
  51 |         <div className="flex-1 text-center">
  52 |           <PlayerName 
  53 |             name={player2Name} 
  54 |             isActive={currentTimer === 2 && isRunning}
  55 |             className="mb-2"
  56 |           />
  57 |           <Timer 
  58 |             value={timer2}
  59 |             isActive={currentTimer === 2 && isRunning}
  60 |             className="text-2xl"
  61 |           />
  62 |         </div>
  63 |       </div>
  64 |     </div>
  65 |   );
  66 | };
  67 | 
  68 | export default DefaultStyle;

```

`dbdoverlaytools-free/src\components\overlay\styles\MinimalStyle.tsx`:

```tsx
   1 | import React from 'react';
   2 | import Timer from '../Timer';
   3 | import ScoreDisplay from '../ScoreDisplay';
   4 | 
   5 | interface MinimalStyleProps {
   6 |   player1Name: string;
   7 |   player2Name: string;
   8 |   player1Score: number;
   9 |   player2Score: number;
  10 |   timer1: string;
  11 |   timer2: string;
  12 |   currentTimer: 1 | 2;
  13 |   isRunning: boolean;
  14 | }
  15 | 
  16 | const MinimalStyle: React.FC<MinimalStyleProps> = ({
  17 |   player1Name,
  18 |   player2Name,
  19 |   player1Score,
  20 |   player2Score,
  21 |   timer1,
  22 |   timer2,
  23 |   currentTimer,
  24 |   isRunning,
  25 | }) => {
  26 |   return (
  27 |     <div className="w-[400px] h-[110px] bg-black bg-opacity-80 border border-gray-800 rounded p-3">
  28 |       <div className="flex items-center justify-between h-full">
  29 |         <div className="text-center">
  30 |           <div className="text-xs text-gray-400 mb-1">
  31 |             {player1Name.slice(0, 8)}
  32 |           </div>
  33 |           <Timer 
  34 |             value={timer1}
  35 |             isActive={currentTimer === 1 && isRunning}
  36 |             className="text-xl font-mono"
  37 |           />
  38 |         </div>
  39 |         
  40 |         <div className="px-4">
  41 |           <ScoreDisplay 
  42 |             player1Score={player1Score}
  43 |             player2Score={player2Score}
  44 |             className="text-lg font-semibold"
  45 |           />
  46 |         </div>
  47 |         
  48 |         <div className="text-center">
  49 |           <div className="text-xs text-gray-400 mb-1">
  50 |             {player2Name.slice(0, 8)}
  51 |           </div>
  52 |           <Timer 
  53 |             value={timer2}
  54 |             isActive={currentTimer === 2 && isRunning}
  55 |             className="text-xl font-mono"
  56 |           />
  57 |         </div>
  58 |       </div>
  59 |     </div>
  60 |   );
  61 | };
  62 | 
  63 | export default MinimalStyle;

```

`dbdoverlaytools-free/src\components\overlay\styles\NostalgiaStyle.tsx`:

```tsx
   1 | import React from 'react';
   2 | import Timer from '../Timer';
   3 | import ScoreDisplay from '../ScoreDisplay';
   4 | 
   5 | interface NostalgiaStyleProps {
   6 |   player1Name: string;
   7 |   player2Name: string;
   8 |   player1Score: number;
   9 |   player2Score: number;
  10 |   timer1: string;
  11 |   timer2: string;
  12 |   currentTimer: 1 | 2;
  13 |   isRunning: boolean;
  14 | }
  15 | 
  16 | const NostalgiaStyle: React.FC<NostalgiaStyleProps> = ({
  17 |   player1Name,
  18 |   player2Name,
  19 |   player1Score,
  20 |   player2Score,
  21 |   timer1,
  22 |   timer2,
  23 |   currentTimer,
  24 |   isRunning,
  25 | }) => {
  26 |   return (
  27 |     <div className="w-[360px] h-[80px] bg-black border border-green-500 font-mono p-2">
  28 |       <div className="flex items-center justify-between h-full text-green-400">
  29 |         <div className="text-center">
  30 |           <div className="text-xs mb-1">
  31 |             {player1Name.slice(0, 6).toUpperCase()}
  32 |           </div>
  33 |           <Timer 
  34 |             value={timer1}
  35 |             isActive={currentTimer === 1 && isRunning}
  36 |             className={`text-lg ${currentTimer === 1 && isRunning ? 'text-green-300' : 'text-green-600'}`}
  37 |           />
  38 |         </div>
  39 |         
  40 |         <div className="px-3">
  41 |           <ScoreDisplay 
  42 |             player1Score={player1Score}
  43 |             player2Score={player2Score}
  44 |             className="text-lg font-bold text-green-400"
  45 |           />
  46 |         </div>
  47 |         
  48 |         <div className="text-center">
  49 |           <div className="text-xs mb-1">
  50 |             {player2Name.slice(0, 6).toUpperCase()}
  51 |           </div>
  52 |           <Timer 
  53 |             value={timer2}
  54 |             isActive={currentTimer === 2 && isRunning}
  55 |             className={`text-lg ${currentTimer === 2 && isRunning ? 'text-green-300' : 'text-green-600'}`}
  56 |           />
  57 |         </div>
  58 |       </div>
  59 |     </div>
  60 |   );
  61 | };
  62 | 
  63 | export default NostalgiaStyle;

```

`dbdoverlaytools-free/src\hooks\useElectronStore.ts`:

```ts
   1 | import { useEffect } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | 
   4 | const useElectronStore = () => {
   5 |   const { updateTimerData, updateOverlaySettings, setOverlayVisible } = useTimerStore();
   6 | 
   7 |   useEffect(() => {
   8 |     if (!window.electronAPI) return;
   9 | 
  10 |     const loadElectronData = async () => {
  11 |       try {
  12 |         const timerData = await window.electronAPI.store.get('timerData');
  13 |         const overlaySettings = await window.electronAPI.store.get('overlaySettings');
  14 | 
  15 |         if (timerData) {
  16 |           updateTimerData(timerData);
  17 |         }
  18 | 
  19 |         if (overlaySettings) {
  20 |           updateOverlaySettings(overlaySettings);
  21 |         }
  22 |       } catch (error) {
  23 |         console.warn('Failed to load data from electron store:', error);
  24 |       }
  25 |     };
  26 | 
  27 |     loadElectronData();
  28 | 
  29 |     // Listen for overlay ready status
  30 |     const unsubscribeOverlayReady = window.electronAPI.overlay.onReady((isReady: boolean) => {
  31 |       console.log('Overlay ready status changed:', isReady);
  32 |       setOverlayVisible(isReady);
  33 |     });
  34 | 
  35 |     return () => {
  36 |       unsubscribeOverlayReady();
  37 |     };
  38 |   }, [updateTimerData, updateOverlaySettings, setOverlayVisible]);
  39 | 
  40 |   const saveToElectronStore = async () => {
  41 |     if (!window.electronAPI) return;
  42 | 
  43 |     try {
  44 |       const { timerData, overlaySettings } = useTimerStore.getState();
  45 |       await window.electronAPI.store.set('timerData', timerData);
  46 |       await window.electronAPI.store.set('overlaySettings', overlaySettings);
  47 |       
  48 |       console.log('Data saved to electron store');
  49 |     } catch (error) {
  50 |       console.warn('Failed to save data to electron store:', error);
  51 |     }
  52 |   };
  53 | 
  54 |   return { saveToElectronStore };
  55 | };
  56 | 
  57 | export default useElectronStore;

```

`dbdoverlaytools-free/src\hooks\useGlobalHotkeys.ts`:

```ts
   1 | import { useEffect } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | import useTimer from './useTimer';
   4 | 
   5 | const useGlobalHotkeys = () => {
   6 |   const { saveToStorage } = useTimerStore();
   7 |   const { isRunning, startTimer, pauseTimer, swapTimer } = useTimer();
   8 | 
   9 |   useEffect(() => {
  10 |     if (!window.electronAPI) return;
  11 | 
  12 |     const handleHotkeyPress = (action: string) => {
  13 |       console.log('Hotkey pressed:', action);
  14 |       
  15 |       switch (action) {
  16 |         case 'start':
  17 |           if (isRunning) {
  18 |             pauseTimer();
  19 |           } else {
  20 |             startTimer();
  21 |           }
  22 |           saveToStorage();
  23 |           break;
  24 |           
  25 |         case 'swap':
  26 |           swapTimer();
  27 |           saveToStorage();
  28 |           break;
  29 |           
  30 |         default:
  31 |           console.warn('Unknown hotkey action:', action);
  32 |       }
  33 |     };
  34 | 
  35 |     window.electronAPI.hotkeys.onPressed(handleHotkeyPress);
  36 | 
  37 |     return () => {
  38 |       if (window.electronAPI?.removeAllListeners) {
  39 |         window.electronAPI.removeAllListeners();
  40 |       }
  41 |     };
  42 |   }, [isRunning, startTimer, pauseTimer, swapTimer, saveToStorage]);
  43 | 
  44 |   const registerHotkeys = async (startKey: string, swapKey: string) => {
  45 |     if (!window.electronAPI) {
  46 |       console.warn('Electron API not available');
  47 |       return;
  48 |     }
  49 | 
  50 |     try {
  51 |       await window.electronAPI.hotkeys.register({
  52 |         start: startKey,
  53 |         swap: swapKey,
  54 |       });
  55 |       console.log('Hotkeys registered:', { start: startKey, swap: swapKey });
  56 |     } catch (error) {
  57 |       console.error('Failed to register hotkeys:', error);
  58 |     }
  59 |   };
  60 | 
  61 |   return { registerHotkeys };
  62 | };
  63 | 
  64 | export default useGlobalHotkeys;

```

`dbdoverlaytools-free/src\hooks\useTimer.ts`:

```ts
   1 | import { useEffect, useRef, useState, useCallback } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | import { formatTime, PreciseTimer } from '../utils/timer';
   4 | 
   5 | const useTimer = () => {
   6 |   const {
   7 |     timerData,
   8 |     setTimerValue,
   9 |     setTimerRunning,
  10 |     setCurrentTimer,
  11 |     resetTimer,
  12 |     saveToStorage,
  13 |   } = useTimerStore();
  14 | 
  15 |   const timer1Ref = useRef<PreciseTimer | null>(null);
  16 |   const timer2Ref = useRef<PreciseTimer | null>(null);
  17 |   const [formattedTime1, setFormattedTime1] = useState('0:00.0');
  18 |   const [formattedTime2, setFormattedTime2] = useState('0:00.0');
  19 | 
  20 |   const syncToOverlay = useCallback((updateData: any) => {
  21 |     if (window.electronAPI) {
  22 |       window.electronAPI.timer.updateDisplay(updateData);
  23 |       
  24 |       // Also sync complete timer data
  25 |       window.electronAPI.timer.syncData({
  26 |         ...timerData,
  27 |         ...updateData,
  28 |         timer1Value: updateData.timer1Value || timerData.timer1Value,
  29 |         timer2Value: updateData.timer2Value || timerData.timer2Value,
  30 |       });
  31 |     }
  32 |   }, [timerData]);
  33 | 
  34 |   useEffect(() => {
  35 |     if (!timer1Ref.current) {
  36 |       timer1Ref.current = new PreciseTimer((value) => {
  37 |         setTimerValue(1, value);
  38 |         const formatted = formatTime(value);
  39 |         setFormattedTime1(formatted);
  40 |         
  41 |         syncToOverlay({
  42 |           timer1: formatted,
  43 |           timer2: formatTime(timerData.timer2Value),
  44 |           timer1Value: value,
  45 |           timer2Value: timerData.timer2Value,
  46 |           currentTimer: timerData.currentTimer,
  47 |           isRunning: timerData.isRunning,
  48 |           player1Name: timerData.player1Name,
  49 |           player2Name: timerData.player2Name,
  50 |           player1Score: timerData.player1Score,
  51 |           player2Score: timerData.player2Score,
  52 |         });
  53 |       });
  54 |     }
  55 | 
  56 |     if (!timer2Ref.current) {
  57 |       timer2Ref.current = new PreciseTimer((value) => {
  58 |         setTimerValue(2, value);
  59 |         const formatted = formatTime(value);
  60 |         setFormattedTime2(formatted);
  61 |         
  62 |         syncToOverlay({
  63 |           timer1: formatTime(timerData.timer1Value),
  64 |           timer2: formatted,
  65 |           timer1Value: timerData.timer1Value,
  66 |           timer2Value: value,
  67 |           currentTimer: timerData.currentTimer,
  68 |           isRunning: timerData.isRunning,
  69 |           player1Name: timerData.player1Name,
  70 |           player2Name: timerData.player2Name,
  71 |           player1Score: timerData.player1Score,
  72 |           player2Score: timerData.player2Score,
  73 |         });
  74 |       });
  75 |     }
  76 | 
  77 |     return () => {
  78 |       timer1Ref.current?.stop();
  79 |       timer2Ref.current?.stop();
  80 |     };
  81 |   }, [setTimerValue, syncToOverlay]);
  82 | 
  83 |   useEffect(() => {
  84 |     setFormattedTime1(formatTime(timerData.timer1Value));
  85 |     setFormattedTime2(formatTime(timerData.timer2Value));
  86 |     
  87 |     // Sync any timer data changes to overlay
  88 |     syncToOverlay({
  89 |       timer1: formatTime(timerData.timer1Value),
  90 |       timer2: formatTime(timerData.timer2Value),
  91 |       timer1Value: timerData.timer1Value,
  92 |       timer2Value: timerData.timer2Value,
  93 |       currentTimer: timerData.currentTimer,
  94 |       isRunning: timerData.isRunning,
  95 |       player1Name: timerData.player1Name,
  96 |       player2Name: timerData.player2Name,
  97 |       player1Score: timerData.player1Score,
  98 |       player2Score: timerData.player2Score,
  99 |     });
 100 |   }, [timerData, syncToOverlay]);
 101 | 
 102 |   const startTimer = useCallback(() => {
 103 |     const currentTimer = timerData.currentTimer;
 104 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 105 |     const initialValue = currentTimer === 1 ? timerData.timer1Value : timerData.timer2Value;
 106 | 
 107 |     if (timerRef && !timerRef.running) {
 108 |       timerRef.start(initialValue);
 109 |       setTimerRunning(true);
 110 |     }
 111 |   }, [timerData.currentTimer, timerData.timer1Value, timerData.timer2Value, setTimerRunning]);
 112 | 
 113 |   const pauseTimer = useCallback(() => {
 114 |     const currentTimer = timerData.currentTimer;
 115 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 116 | 
 117 |     if (timerRef && timerRef.running) {
 118 |       const finalValue = timerRef.pause();
 119 |       setTimerValue(currentTimer, finalValue);
 120 |       setTimerRunning(false);
 121 |     }
 122 |   }, [timerData.currentTimer, setTimerValue, setTimerRunning]);
 123 | 
 124 |   const swapTimer = useCallback(() => {
 125 |     if (timerData.isRunning) {
 126 |       pauseTimer();
 127 |     }
 128 |     
 129 |     const newTimer = timerData.currentTimer === 1 ? 2 : 1;
 130 |     setCurrentTimer(newTimer);
 131 | 
 132 |     // Immediate sync to overlay
 133 |     if (window.electronAPI) {
 134 |       window.electronAPI.timer.syncData({
 135 |         ...timerData,
 136 |         currentTimer: newTimer,
 137 |         isRunning: false,
 138 |       });
 139 |     }
 140 |   }, [timerData, pauseTimer, setCurrentTimer]);
 141 | 
 142 |   const resetCurrentTimer = useCallback(() => {
 143 |     if (timerData.isRunning) {
 144 |       pauseTimer();
 145 |     }
 146 |     
 147 |     resetTimer();
 148 |     
 149 |     const timerRef = timerData.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 150 |     timerRef?.reset();
 151 |   }, [timerData.isRunning, timerData.currentTimer, pauseTimer, resetTimer]);
 152 | 
 153 |   const resetAllTimers = useCallback(() => {
 154 |     timer1Ref.current?.reset();
 155 |     timer2Ref.current?.reset();
 156 |     setTimerRunning(false);
 157 |   }, [setTimerRunning]);
 158 | 
 159 |   return {
 160 |     formattedTime1,
 161 |     formattedTime2,
 162 |     isRunning: timerData.isRunning,
 163 |     currentTimer: timerData.currentTimer,
 164 |     startTimer,
 165 |     pauseTimer,
 166 |     swapTimer,
 167 |     resetCurrentTimer,
 168 |     resetAllTimers,
 169 |   };
 170 | };
 171 | 
 172 | export default useTimer;

```

`dbdoverlaytools-free/src\index.css`:

```css
   1 | /* src/index.css */
   2 | @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Russo+One&display=swap');
   3 | @tailwind base;
   4 | @tailwind components;
   5 | @tailwind utilities;
   6 | 
   7 | @font-face {
   8 |   font-family: 'SquareFont';
   9 |   src: url('./assets/fonts/SquareFont.ttf') format('truetype');
  10 |   font-weight: normal;
  11 |   font-style: normal;
  12 | }
  13 | 
  14 | * {
  15 |   box-sizing: border-box;
  16 | }
  17 | 
  18 | body {
  19 |   margin: 0;
  20 |   font-family: 'Poppins', sans-serif;
  21 |   -webkit-font-smoothing: antialiased;
  22 |   -moz-osx-font-smoothing: grayscale;
  23 |   color: #ffffff;
  24 |   background: #1a1a1a;
  25 | }
  26 | 
  27 | #root, #overlay-root {
  28 |   width: 100%;
  29 |   height: 100%;
  30 | }
  31 | 
  32 | .drag-handle {
  33 |   -webkit-app-region: drag;
  34 |   cursor: move;
  35 | }
  36 | 
  37 | .no-drag {
  38 |   -webkit-app-region: no-drag;
  39 | }
  40 | 
  41 | .timer-glow {
  42 |   text-shadow: 0 0 10px currentColor;
  43 | }
  44 | 
  45 | .scrolling-text {
  46 |   white-space: nowrap;
  47 |   overflow: hidden;
  48 | }
  49 | 
  50 | .scrolling-text.active {
  51 |   animation: scroll-text 6s linear infinite;
  52 | }
  53 | 
  54 | @keyframes pulse-active {
  55 |   0%, 100% { 
  56 |     background: rgba(181, 121, 255, 0.2);
  57 |     border-color: rgba(181, 121, 255, 0.5);
  58 |   }
  59 |   50% { 
  60 |     background: rgba(181, 121, 255, 0.3);
  61 |     border-color: rgba(181, 121, 255, 0.7);
  62 |   }
  63 | }
  64 | 
  65 | .timer-active {
  66 |   animation: pulse-active 2s ease-in-out infinite;
  67 | }

```

`dbdoverlaytools-free/src\main.tsx`:

```tsx
   1 | // src/main.tsx
   2 | import React from 'react';
   3 | import ReactDOM from 'react-dom/client';
   4 | import App from './App';
   5 | import './index.css';
   6 | 
   7 | ReactDOM.createRoot(document.getElementById('root')!).render(
   8 |   <React.StrictMode>
   9 |     <App />
  10 |   </React.StrictMode>
  11 | );

```

`dbdoverlaytools-free/src\overlay.tsx`:

```tsx
   1 | // src/overlay.tsx
   2 | import React from 'react';
   3 | import ReactDOM from 'react-dom/client';
   4 | import OverlayApp from './components/OverlayApp';
   5 | import './index.css';
   6 | 
   7 | ReactDOM.createRoot(document.getElementById('overlay-root')!).render(
   8 |   <React.StrictMode>
   9 |     <OverlayApp />
  10 |   </React.StrictMode>
  11 | );

```

`dbdoverlaytools-free/src\store\timerStore.ts`:

```ts
   1 | // src/store/timerStore.ts - Store Zustand
   2 | import { create } from 'zustand';
   3 | import { TimerData, OverlaySettings, TimerStyle, DEFAULT_TIMER_DATA, DEFAULT_OVERLAY_SETTINGS } from '../types';
   4 | 
   5 | interface TimerStore {
   6 |   timerData: TimerData;
   7 |   overlaySettings: OverlaySettings;
   8 |   isOverlayVisible: boolean;
   9 |   
  10 |   updateTimerData: (data: Partial<TimerData>) => void;
  11 |   updatePlayerName: (player: 1 | 2, name: string) => void;
  12 |   updatePlayerScore: (player: 1 | 2, delta: number) => void;
  13 |   setTimerValue: (timer: 1 | 2, value: number) => void;
  14 |   setCurrentTimer: (timer: 1 | 2) => void;
  15 |   setTimerRunning: (running: boolean) => void;
  16 |   swapTimer: () => void;
  17 |   resetTimer: (timer?: 1 | 2) => void;
  18 |   resetAllTimers: () => void;
  19 |   updateHotkeys: (hotkeys: { start?: string; swap?: string }) => void;
  20 |   updateStyle: (style: TimerStyle) => void;
  21 |   
  22 |   updateOverlaySettings: (settings: Partial<OverlaySettings>) => void;
  23 |   toggleOverlayVisibility: () => void;
  24 |   setOverlayVisible: (visible: boolean) => void;
  25 |   toggleOverlayLock: () => void;
  26 |   updateOverlayScale: (scale: number) => void;
  27 |   updateOverlayPosition: (x: number, y: number) => void;
  28 |   
  29 |   loadFromStorage: () => void;
  30 |   saveToStorage: () => void;
  31 |   syncToElectron: () => void;
  32 | }
  33 | 
  34 | export const useTimerStore = create<TimerStore>((set, get) => ({
  35 |   timerData: { ...DEFAULT_TIMER_DATA },
  36 |   overlaySettings: { ...DEFAULT_OVERLAY_SETTINGS },
  37 |   isOverlayVisible: false,
  38 |   
  39 |   updateTimerData: (data) => {
  40 |     set((state) => ({
  41 |       timerData: { ...state.timerData, ...data }
  42 |     }));
  43 |     get().syncToElectron();
  44 |   },
  45 |   
  46 |   updatePlayerName: (player, name) => {
  47 |     set((state) => ({
  48 |       timerData: {
  49 |         ...state.timerData,
  50 |         [player === 1 ? 'player1Name' : 'player2Name']: name
  51 |       }
  52 |     }));
  53 |     get().syncToElectron();
  54 |   },
  55 |   
  56 |   updatePlayerScore: (player, delta) => {
  57 |     set((state) => {
  58 |       const currentScore = player === 1 ? state.timerData.player1Score : state.timerData.player2Score;
  59 |       const newScore = Math.max(0, currentScore + delta);
  60 |       
  61 |       return {
  62 |         timerData: {
  63 |           ...state.timerData,
  64 |           [player === 1 ? 'player1Score' : 'player2Score']: newScore
  65 |         }
  66 |       };
  67 |     });
  68 |     get().syncToElectron();
  69 |   },
  70 |   
  71 |   setTimerValue: (timer, value) => {
  72 |     set((state) => ({
  73 |       timerData: {
  74 |         ...state.timerData,
  75 |         [timer === 1 ? 'timer1Value' : 'timer2Value']: Math.max(0, value)
  76 |       }
  77 |     }));
  78 |     get().syncToElectron();
  79 |   },
  80 |   
  81 |   setCurrentTimer: (timer) => {
  82 |     set((state) => ({
  83 |       timerData: { ...state.timerData, currentTimer: timer }
  84 |     }));
  85 |     get().syncToElectron();
  86 |   },
  87 |   
  88 |   setTimerRunning: (running) => {
  89 |     set((state) => ({
  90 |       timerData: { ...state.timerData, isRunning: running }
  91 |     }));
  92 |     get().syncToElectron();
  93 |   },
  94 |   
  95 |   swapTimer: () => {
  96 |     set((state) => ({
  97 |       timerData: {
  98 |         ...state.timerData,
  99 |         currentTimer: state.timerData.currentTimer === 1 ? 2 : 1,
 100 |         isRunning: false
 101 |       }
 102 |     }));
 103 |     get().syncToElectron();
 104 |   },
 105 |   
 106 |   resetTimer: (timer) => {
 107 |     set((state) => {
 108 |       if (timer) {
 109 |         return {
 110 |           timerData: {
 111 |             ...state.timerData,
 112 |             [timer === 1 ? 'timer1Value' : 'timer2Value']: 0,
 113 |             isRunning: false
 114 |           }
 115 |         };
 116 |       } else {
 117 |         return {
 118 |           timerData: {
 119 |             ...state.timerData,
 120 |             [state.timerData.currentTimer === 1 ? 'timer1Value' : 'timer2Value']: 0,
 121 |             isRunning: false
 122 |           }
 123 |         };
 124 |       }
 125 |     });
 126 |     get().syncToElectron();
 127 |   },
 128 |   
 129 |   resetAllTimers: () => {
 130 |     set((state) => ({
 131 |       timerData: {
 132 |         ...state.timerData,
 133 |         timer1Value: 0,
 134 |         timer2Value: 0,
 135 |         player1Score: 0,
 136 |         player2Score: 0,
 137 |         currentTimer: 1,
 138 |         isRunning: false
 139 |       }
 140 |     }));
 141 |     get().syncToElectron();
 142 |   },
 143 |   
 144 |   updateHotkeys: (hotkeys) => {
 145 |     set((state) => ({
 146 |       timerData: {
 147 |         ...state.timerData,
 148 |         ...(hotkeys.start && { startHotkey: hotkeys.start }),
 149 |         ...(hotkeys.swap && { swapHotkey: hotkeys.swap })
 150 |       }
 151 |     }));
 152 |     get().syncToElectron();
 153 |   },
 154 |   
 155 |   updateStyle: (style) => {
 156 |     set((state) => ({
 157 |       timerData: { ...state.timerData, style }
 158 |     }));
 159 |     get().syncToElectron();
 160 |   },
 161 |   
 162 |   updateOverlaySettings: (settings) => {
 163 |     set((state) => ({
 164 |       overlaySettings: { ...state.overlaySettings, ...settings }
 165 |     }));
 166 |     get().saveToStorage();
 167 |   },
 168 |   
 169 |   toggleOverlayVisibility: () => {
 170 |     set((state) => ({
 171 |       isOverlayVisible: !state.isOverlayVisible
 172 |     }));
 173 |   },
 174 |   
 175 |   setOverlayVisible: (visible) => {
 176 |     set({ isOverlayVisible: visible });
 177 |   },
 178 |   
 179 |   toggleOverlayLock: () => {
 180 |     set((state) => ({
 181 |       overlaySettings: {
 182 |         ...state.overlaySettings,
 183 |         locked: !state.overlaySettings.locked
 184 |       }
 185 |     }));
 186 |     get().saveToStorage();
 187 |   },
 188 |   
 189 |   updateOverlayScale: (scale) => {
 190 |     set((state) => ({
 191 |       overlaySettings: { ...state.overlaySettings, scale }
 192 |     }));
 193 |     get().saveToStorage();
 194 |   },
 195 |   
 196 |   updateOverlayPosition: (x, y) => {
 197 |     set((state) => ({
 198 |       overlaySettings: { ...state.overlaySettings, x, y }
 199 |     }));
 200 |     get().saveToStorage();
 201 |   },
 202 |   
 203 |   loadFromStorage: () => {
 204 |     if (typeof window === 'undefined') return;
 205 |     
 206 |     try {
 207 |       const savedData = localStorage.getItem('dbd-timer-data');
 208 |       const savedSettings = localStorage.getItem('dbd-overlay-settings');
 209 |       
 210 |       if (savedData) {
 211 |         const timerData = JSON.parse(savedData);
 212 |         set((state) => ({
 213 |           timerData: { ...state.timerData, ...timerData }
 214 |         }));
 215 |       }
 216 |       
 217 |       if (savedSettings) {
 218 |         const overlaySettings = JSON.parse(savedSettings);
 219 |         set((state) => ({
 220 |           overlaySettings: { ...state.overlaySettings, ...overlaySettings }
 221 |         }));
 222 |       }
 223 |     } catch (error) {
 224 |       console.warn('Failed to load data from storage:', error);
 225 |     }
 226 |   },
 227 |   
 228 |   saveToStorage: () => {
 229 |     if (typeof window === 'undefined') return;
 230 |     
 231 |     try {
 232 |       const { timerData, overlaySettings } = get();
 233 |       localStorage.setItem('dbd-timer-data', JSON.stringify(timerData));
 234 |       localStorage.setItem('dbd-overlay-settings', JSON.stringify(overlaySettings));
 235 |     } catch (error) {
 236 |       console.warn('Failed to save data to storage:', error);
 237 |     }
 238 |   },
 239 |   
 240 |   syncToElectron: () => {
 241 |     if (window.electronAPI) {
 242 |       const { timerData } = get();
 243 |       window.electronAPI.timer.syncData(timerData);
 244 |     }
 245 |   }
 246 | }));

```

`dbdoverlaytools-free/src\types\index.ts`:

```ts
   1 | // src/types/index.ts - Types TypeScript
   2 | export interface TimerData {
   3 |   player1Name: string;
   4 |   player2Name: string;
   5 |   player1Score: number;
   6 |   player2Score: number;
   7 |   timer1Value: number; // milliseconds
   8 |   timer2Value: number; // milliseconds
   9 |   currentTimer: 1 | 2;
  10 |   isRunning: boolean;
  11 |   startHotkey: string;
  12 |   swapHotkey: string;
  13 |   style: TimerStyle;
  14 | }
  15 | 
  16 | export type TimerStyle = 'default' | 'minimal' | 'circular' | 'nostalgia';
  17 | 
  18 | export interface OverlaySettings {
  19 |   baseWidth: number;
  20 |   baseHeight: number;
  21 |   scale: number;
  22 |   x: number;
  23 |   y: number;
  24 |   locked: boolean;
  25 |   alwaysOnTop: boolean;
  26 | }
  27 | 
  28 | export interface TimerDisplayData {
  29 |   timer1: string; // formatted time string
  30 |   timer2: string; // formatted time string  
  31 |   currentTimer: 1 | 2;
  32 |   running: boolean;
  33 | }
  34 | 
  35 | export interface AppState {
  36 |   timerData: TimerData;
  37 |   overlaySettings: OverlaySettings;
  38 |   isOverlayVisible: boolean;
  39 | }
  40 | 
  41 | // IPC Event types
  42 | export interface IPCEvents {
  43 |   // Timer events
  44 |   'timer-start': () => void;
  45 |   'timer-pause': () => void;
  46 |   'timer-reset': () => void;
  47 |   'timer-swap': () => void;
  48 |   'timer-update-data': (data: Partial<TimerData>) => void;
  49 |   'timer-update-display': (data: TimerDisplayData) => void;
  50 |   'timer-style-change': (style: TimerStyle) => void;
  51 |   
  52 |   // Overlay events
  53 |   'overlay-show': () => void;
  54 |   'overlay-hide': () => void;
  55 |   'overlay-settings-update': (settings: Partial<OverlaySettings>) => void;
  56 |   'overlay-lock-toggle': (locked: boolean) => void;
  57 |   
  58 |   // Hotkey events
  59 |   'hotkey-register': (hotkeys: { start: string; swap: string }) => void;
  60 |   'hotkey-pressed': (action: 'start' | 'swap') => void;
  61 |   
  62 |   // Window events
  63 |   'window-ready': () => void;
  64 |   'app-quit': () => void;
  65 | }
  66 | 
  67 | // Style-specific dimensions
  68 | export interface StyleDimensions {
  69 |   width: number;
  70 |   height: number;
  71 | }
  72 | 
  73 | export const STYLE_DIMENSIONS: Record<TimerStyle, StyleDimensions> = {
  74 |   default: { width: 520, height: 120 },
  75 |   minimal: { width: 400, height: 110 },
  76 |   circular: { width: 420, height: 160 },
  77 |   nostalgia: { width: 360, height: 80 }
  78 | };
  79 | 
  80 | // Default values
  81 | export const DEFAULT_TIMER_DATA: TimerData = {
  82 |   player1Name: 'PLAYER 1',
  83 |   player2Name: 'PLAYER 2', 
  84 |   player1Score: 0,
  85 |   player2Score: 0,
  86 |   timer1Value: 0,
  87 |   timer2Value: 0,
  88 |   currentTimer: 1,
  89 |   isRunning: false,
  90 |   startHotkey: 'F1',
  91 |   swapHotkey: 'F2',
  92 |   style: 'default'
  93 | };
  94 | 
  95 | export const DEFAULT_OVERLAY_SETTINGS: OverlaySettings = {
  96 |   baseWidth: 520,
  97 |   baseHeight: 120,
  98 |   scale: 100,
  99 |   x: 100,
 100 |   y: 100,
 101 |   locked: false,
 102 |   alwaysOnTop: true
 103 | };

```

`dbdoverlaytools-free/src\utils\cn.ts`:

```ts
   1 | export function cn(...inputs: string[]) {
   2 |   return inputs.filter(Boolean).join(' ');
   3 | }

```

`dbdoverlaytools-free/src\utils\timer.ts`:

```ts
   1 | // src/utils/timer.ts - Utilitaires Timer
   2 | 
   3 | /**
   4 |  * Formats milliseconds to MM:SS.T format
   5 |  * @param milliseconds - Time in milliseconds
   6 |  * @returns Formatted time string (e.g., "1:23.4")
   7 |  */
   8 | export function formatTime(milliseconds: number): string {
   9 |   const totalSeconds = Math.floor(milliseconds / 1000);
  10 |   const minutes = Math.floor(totalSeconds / 60);
  11 |   const seconds = totalSeconds % 60;
  12 |   const tenths = Math.floor((milliseconds % 1000) / 100);
  13 |   
  14 |   return `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  15 | }
  16 | 
  17 | /**
  18 |  * Parses a formatted time string to milliseconds
  19 |  * @param timeString - Time string in MM:SS.T format
  20 |  * @returns Time in milliseconds
  21 |  */
  22 | export function parseTimeToMs(timeString: string): number {
  23 |   const parts = timeString.match(/(\d+):(\d{2})\.(\d)/);
  24 |   if (!parts) return 0;
  25 |   
  26 |   const minutes = parseInt(parts[1]);
  27 |   const seconds = parseInt(parts[2]);
  28 |   const tenths = parseInt(parts[3]);
  29 |   
  30 |   return (minutes * 60 * 1000) + (seconds * 1000) + (tenths * 100);
  31 | }
  32 | 
  33 | /**
  34 |  * Timer hook for managing precise timing with requestAnimationFrame
  35 |  */
  36 | export class PreciseTimer {
  37 |   private startTime: number = 0;
  38 |   private initialValue: number = 0;
  39 |   private animationId: number | null = null;
  40 |   private intervalId: number | null = null;
  41 |   private isRunning: boolean = false;
  42 |   private onUpdate: (value: number) => void;
  43 |   private lastUpdateTime: number = 0;
  44 | 
  45 |   constructor(onUpdate: (value: number) => void) {
  46 |     this.onUpdate = onUpdate;
  47 |   }
  48 | 
  49 |   start(initialValue: number = 0) {
  50 |     if (this.isRunning) return;
  51 |     
  52 |     this.startTime = Date.now();
  53 |     this.initialValue = initialValue;
  54 |     this.isRunning = true;
  55 |     this.lastUpdateTime = 0;
  56 | 
  57 |     // Use requestAnimationFrame for smooth updates
  58 |     const updateTimer = () => {
  59 |       if (!this.isRunning) return;
  60 | 
  61 |       const now = Date.now();
  62 |       const elapsed = now - this.startTime;
  63 |       const currentValue = this.initialValue + elapsed;
  64 | 
  65 |       // Only update display every 100ms to avoid excessive updates
  66 |       if (now - this.lastUpdateTime >= 100) {
  67 |         this.onUpdate(currentValue);
  68 |         this.lastUpdateTime = now;
  69 |       }
  70 | 
  71 |       this.animationId = requestAnimationFrame(updateTimer);
  72 |     };
  73 | 
  74 |     updateTimer();
  75 | 
  76 |     // Backup interval for when window is minimized
  77 |     this.intervalId = window.setInterval(() => {
  78 |       if (this.isRunning) {
  79 |         const now = Date.now();
  80 |         const elapsed = now - this.startTime;
  81 |         const currentValue = this.initialValue + elapsed;
  82 |         this.onUpdate(currentValue);
  83 |       }
  84 |     }, 100);
  85 |   }
  86 | 
  87 |   pause(): number {
  88 |     if (!this.isRunning) return this.initialValue;
  89 | 
  90 |     const now = Date.now();
  91 |     const elapsed = now - this.startTime;
  92 |     const finalValue = this.initialValue + elapsed;
  93 | 
  94 |     this.stop();
  95 |     return finalValue;
  96 |   }
  97 | 
  98 |   stop() {
  99 |     this.isRunning = false;
 100 | 
 101 |     if (this.animationId) {
 102 |       cancelAnimationFrame(this.animationId);
 103 |       this.animationId = null;
 104 |     }
 105 | 
 106 |     if (this.intervalId) {
 107 |       clearInterval(this.intervalId);
 108 |       this.intervalId = null;
 109 |     }
 110 |   }
 111 | 
 112 |   reset() {
 113 |     this.stop();
 114 |     this.initialValue = 0;
 115 |     this.onUpdate(0);
 116 |   }
 117 | 
 118 |   get running(): boolean {
 119 |     return this.isRunning;
 120 |   }
 121 | 
 122 |   get currentValue(): number {
 123 |     if (!this.isRunning) return this.initialValue;
 124 |     
 125 |     const now = Date.now();
 126 |     const elapsed = now - this.startTime;
 127 |     return this.initialValue + elapsed;
 128 |   }
 129 | }
 130 | 
 131 | /**
 132 |  * Validates and normalizes hotkey string
 133 |  * @param hotkey - Raw hotkey string
 134 |  * @returns Normalized hotkey string
 135 |  */
 136 | export function normalizeHotkey(hotkey: string): string {
 137 |   const key = hotkey.trim().toLowerCase();
 138 |   
 139 |   // Handle function keys
 140 |   if (key.startsWith('f') && key.length <= 3) {
 141 |     const num = key.slice(1);
 142 |     if (/^\d{1,2}$/.test(num)) {
 143 |       return key.toUpperCase();
 144 |     }
 145 |   }
 146 |   
 147 |   // Handle single character keys
 148 |   if (key.length === 1 && /[a-z0-9]/.test(key)) {
 149 |     return key.toUpperCase();
 150 |   }
 151 |   
 152 |   // Handle special keys
 153 |   const specialKeys = ['space', 'enter', 'tab', 'escape', 'backspace'];
 154 |   if (specialKeys.includes(key)) {
 155 |     return key.charAt(0).toUpperCase() + key.slice(1);
 156 |   }
 157 |   
 158 |   // Default return
 159 |   return hotkey.toUpperCase();
 160 | }

```

`dbdoverlaytools-free/tailwind.config.js`:

```js
   1 | /** @type {import('tailwindcss').Config} */
   2 | export default {
   3 |   content: [
   4 |     "./index.html",
   5 |     "./overlay.html",
   6 |     "./src/**/*.{js,ts,jsx,tsx}",
   7 |   ],
   8 |   theme: {
   9 |     extend: {
  10 |       colors: {
  11 |         primary: {
  12 |           50: '#f3f0ff',
  13 |           100: '#e9e2ff',
  14 |           200: '#d6cbff',
  15 |           300: '#b8a4ff',
  16 |           400: '#9571ff',
  17 |           500: '#7046da',
  18 |           600: '#5c37b8',
  19 |           700: '#4c2e96',
  20 |           800: '#3e2577',
  21 |           900: '#2a175e',
  22 |         },
  23 |         success: {
  24 |           50: '#f0fdf4',
  25 |           100: '#dcfce7',
  26 |           200: '#bbf7d0',
  27 |           300: '#86efac',
  28 |           400: '#4ade80',
  29 |           500: '#44ff41',
  30 |           600: '#16a34a',
  31 |           700: '#15803d',
  32 |           800: '#166534',
  33 |           900: '#14532d',
  34 |         },
  35 |         info: {
  36 |           50: '#f0f9ff',
  37 |           100: '#e0f2fe',
  38 |           200: '#bae6fd',
  39 |           300: '#7dd3fc',
  40 |           400: '#38bdf8',
  41 |           500: '#5ac8ff',
  42 |           600: '#0284c7',
  43 |           700: '#0369a1',
  44 |           800: '#075985',
  45 |           900: '#0c4a6e',
  46 |         },
  47 |         danger: {
  48 |           50: '#fef2f2',
  49 |           100: '#fee2e2',
  50 |           200: '#fecaca',
  51 |           300: '#fca5a5',
  52 |           400: '#f87171',
  53 |           500: '#ff4141',
  54 |           600: '#dc2626',
  55 |           700: '#b91c1c',
  56 |           800: '#991b1b',
  57 |           900: '#7f1d1d',
  58 |         }
  59 |       },
  60 |       fontFamily: {
  61 |         'square': ['SquareFont', 'monospace'],
  62 |         'poppins': ['Poppins', 'sans-serif'],
  63 |         'russo': ['Russo One', 'sans-serif'],
  64 |       },
  65 |       animation: {
  66 |         'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  67 |         'scroll-text': 'scroll-text 6s linear infinite',
  68 |         'warning-pulse': 'warning-pulse 0.5s ease-in-out infinite',
  69 |       },
  70 |       keyframes: {
  71 |         'pulse-glow': {
  72 |           '0%, 100%': { 
  73 |             'background': 'linear-gradient(90deg, rgba(181, 121, 255, 0.15) 0%, rgba(181, 121, 255, 0.25) 50%, rgba(181, 121, 255, 0.15) 100%)',
  74 |             'border-color': 'rgba(181, 121, 255, 0.4)'
  75 |           },
  76 |           '50%': { 
  77 |             'background': 'linear-gradient(90deg, rgba(181, 121, 255, 0.25) 0%, rgba(181, 121, 255, 0.35) 50%, rgba(181, 121, 255, 0.25) 100%)',
  78 |             'border-color': 'rgba(181, 121, 255, 0.6)'
  79 |           }
  80 |         },
  81 |         'scroll-text': {
  82 |           '0%': { transform: 'translateX(80%)' },
  83 |           '100%': { transform: 'translateX(-80%)' }
  84 |         },
  85 |         'warning-pulse': {
  86 |           '0%, 100%': { opacity: '1' },
  87 |           '50%': { opacity: '0.7' }
  88 |         }
  89 |       }
  90 |     },
  91 |   },
  92 |   plugins: [],
  93 | }

```

`dbdoverlaytools-free/tsconfig.json`:

```json
   1 | {
   2 |   "compilerOptions": {
   3 |     "target": "ES2020",
   4 |     "useDefineForClassFields": true,
   5 |     "lib": ["ES2020", "DOM", "DOM.Iterable"],
   6 |     "module": "ESNext",
   7 |     "skipLibCheck": true,
   8 | 
   9 |     /* Bundler mode */
  10 |     "moduleResolution": "bundler",
  11 |     "allowImportingTsExtensions": true,
  12 |     "resolveJsonModule": true,
  13 |     "isolatedModules": true,
  14 |     "noEmit": true,
  15 |     "jsx": "react-jsx",
  16 | 
  17 |     /* Linting */
  18 |     "strict": true,
  19 |     "noUnusedLocals": true,
  20 |     "noUnusedParameters": true,
  21 |     "noFallthroughCasesInSwitch": true,
  22 | 
  23 |     /* Path mapping */
  24 |     "baseUrl": ".",
  25 |     "paths": {
  26 |       "@/*": ["src/*"],
  27 |       "@/components/*": ["src/components/*"],
  28 |       "@/stores/*": ["src/stores/*"],
  29 |       "@/types/*": ["src/types/*"],
  30 |       "@/utils/*": ["src/utils/*"]
  31 |     }
  32 |   },
  33 |   "include": [
  34 |     "src",
  35 |     "electron",
  36 |     "vite.config.ts"
  37 |   ],
  38 |   "references": [{ "path": "./tsconfig.node.json" }]
  39 | }

```

`dbdoverlaytools-free/tsconfig.node.json`:

```json
   1 | {
   2 |   "compilerOptions": {
   3 |     "composite": true,
   4 |     "skipLibCheck": true,
   5 |     "module": "ESNext",
   6 |     "moduleResolution": "bundler",
   7 |     "allowSyntheticDefaultImports": true,
   8 |     "target": "ES2022",
   9 |     "lib": ["ES2022"]
  10 |   },
  11 |   "include": ["vite.config.ts", "electron/**/*", "scripts/**/*"]
  12 | }

```

`dbdoverlaytools-free/vite.config.ts`:

```ts
   1 | import { defineConfig } from 'vite'
   2 | import react from '@vitejs/plugin-react'
   3 | import electron from 'vite-plugin-electron'
   4 | import renderer from 'vite-plugin-electron-renderer'
   5 | import { resolve } from 'path'
   6 | 
   7 | export default defineConfig({
   8 |   plugins: [
   9 |     react(),
  10 |     electron([
  11 |       {
  12 |         entry: 'electron/main.ts',
  13 |         onstart(options) {
  14 |           console.log('Electron main process built')
  15 |         },
  16 |         vite: {
  17 |           build: {
  18 |             sourcemap: process.env.NODE_ENV === 'development',
  19 |             minify: process.env.NODE_ENV !== 'development',
  20 |             outDir: 'dist-electron',
  21 |             lib: {
  22 |               entry: 'electron/main.ts',
  23 |               formats: ['cjs'],
  24 |               fileName: () => 'main.js'
  25 |             },
  26 |             rollupOptions: {
  27 |               external: ['electron', 'electron-store']
  28 |             }
  29 |           }
  30 |         }
  31 |       },
  32 |       {
  33 |         entry: 'electron/preload.ts',
  34 |         onstart(options) {
  35 |           console.log('Electron preload script built')
  36 |         },
  37 |         vite: {
  38 |           build: {
  39 |             sourcemap: process.env.NODE_ENV === 'development',
  40 |             minify: process.env.NODE_ENV !== 'development',
  41 |             outDir: 'dist-electron',
  42 |             lib: {
  43 |               entry: 'electron/preload.ts',
  44 |               formats: ['cjs'],
  45 |               fileName: () => 'preload.js'
  46 |             },
  47 |             rollupOptions: {
  48 |               external: ['electron']
  49 |             }
  50 |           }
  51 |         }
  52 |       }
  53 |     ]),
  54 |     renderer()
  55 |   ],
  56 |   resolve: {
  57 |     alias: {
  58 |       '@': resolve(__dirname, 'src'),
  59 |       '@/components': resolve(__dirname, 'src/components'),
  60 |       '@/stores': resolve(__dirname, 'src/stores'),
  61 |       '@/types': resolve(__dirname, 'src/types'),
  62 |       '@/utils': resolve(__dirname, 'src/utils')
  63 |     }
  64 |   },
  65 |   base: './',
  66 |   build: {
  67 |     outDir: 'dist',
  68 |     assetsDir: 'assets',
  69 |     emptyOutDir: true,
  70 |     rollupOptions: {
  71 |       input: {
  72 |         main: resolve(__dirname, 'index.html'),
  73 |         overlay: resolve(__dirname, 'overlay.html')
  74 |       }
  75 |     }
  76 |   },
  77 |   server: {
  78 |     port: 5173,
  79 |     strictPort: true,
  80 |     cors: true,
  81 |     hmr: {
  82 |       port: 5174
  83 |     }
  84 |   }
  85 | })

```