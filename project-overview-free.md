Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── electron
│   ├── main.cjs
│   ├── preload.cjs
│   └── tsconfig.json
├── index.html
├── overlay.html
├── package.json
├── postcss.config.js
├── scripts
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

`dbdoverlaytools-free/electron\main.cjs`:

```cjs
   1 | const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
   2 | const { join } = require('path');
   3 | const Store = require('electron-store');
   4 | 
   5 | class TimerOverlayApp {
   6 |   constructor() {
   7 |     this.mainWindow = null;
   8 |     this.overlayWindow = null;
   9 |     this.store = new Store();
  10 |     this.isDev = process.env.NODE_ENV === 'development';
  11 |     this.initializeApp();
  12 |   }
  13 | 
  14 |   initializeApp() {
  15 |     app.whenReady().then(() => {
  16 |       this.createMainWindow();
  17 |       this.setupIPC();
  18 |       this.setupGlobalShortcuts();
  19 |     });
  20 | 
  21 |     app.on('window-all-closed', () => {
  22 |       globalShortcut.unregisterAll();
  23 |       app.quit();
  24 |     });
  25 | 
  26 |     app.on('activate', () => {
  27 |       if (BrowserWindow.getAllWindows().length === 0) {
  28 |         this.createMainWindow();
  29 |       }
  30 |     });
  31 |   }
  32 | 
  33 |   createMainWindow() {
  34 |     const savedState = this.store.get('windowState') || {};
  35 | 
  36 |     this.mainWindow = new BrowserWindow({
  37 |       width: savedState.width || 800,
  38 |       height: savedState.height || 600,
  39 |       x: savedState.x,
  40 |       y: savedState.y,
  41 |       minWidth: 600,
  42 |       minHeight: 400,
  43 |       show: false,
  44 |       autoHideMenuBar: true,
  45 |       webPreferences: {
  46 |         nodeIntegration: false,
  47 |         contextIsolation: true,
  48 |         preload: join(__dirname, 'preload.cjs'),
  49 |         webSecurity: false
  50 |       }
  51 |     });
  52 | 
  53 |     if (this.isDev) {
  54 |       this.mainWindow.loadURL('http://localhost:5173');
  55 |       this.mainWindow.webContents.openDevTools();
  56 |     } else {
  57 |       this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  58 |     }
  59 | 
  60 |     this.mainWindow.once('ready-to-show', () => {
  61 |       this.mainWindow.show();
  62 |       this.mainWindow.focus();
  63 |       setTimeout(() => this.createOverlayWindow(), 1000);
  64 |     });
  65 | 
  66 |     this.mainWindow.on('close', () => {
  67 |       const bounds = this.mainWindow.getBounds();
  68 |       if (bounds) {
  69 |         this.store.set('windowState', bounds);
  70 |       }
  71 |     });
  72 | 
  73 |     this.mainWindow.on('closed', () => {
  74 |       if (this.overlayWindow) {
  75 |         this.overlayWindow.close();
  76 |       }
  77 |       app.quit();
  78 |     });
  79 |   }
  80 | 
  81 |   createOverlayWindow() {
  82 |     if (this.overlayWindow) {
  83 |       this.overlayWindow.show();
  84 |       return;
  85 |     }
  86 | 
  87 |     const overlaySettings = this.store.get('overlaySettings', {
  88 |       x: 100,
  89 |       y: 100,
  90 |       scale: 100,
  91 |       locked: false,
  92 |       alwaysOnTop: true
  93 |     });
  94 | 
  95 |     this.overlayWindow = new BrowserWindow({
  96 |       width: 520,
  97 |       height: 120,
  98 |       x: overlaySettings.x,
  99 |       y: overlaySettings.y,
 100 |       frame: false,
 101 |       transparent: true,
 102 |       alwaysOnTop: overlaySettings.alwaysOnTop,
 103 |       skipTaskbar: true,
 104 |       resizable: false,
 105 |       focusable: !overlaySettings.locked,
 106 |       show: false,
 107 |       webPreferences: {
 108 |         nodeIntegration: false,
 109 |         contextIsolation: true,
 110 |         preload: join(__dirname, 'preload.cjs'),
 111 |         webSecurity: false
 112 |       }
 113 |     });
 114 | 
 115 |     if (overlaySettings.locked) {
 116 |       this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
 117 |     }
 118 | 
 119 |     const overlayUrl = this.isDev 
 120 |       ? 'http://localhost:5173/overlay.html' 
 121 |       : join(__dirname, '../dist/overlay.html');
 122 | 
 123 |     if (this.isDev) {
 124 |       this.overlayWindow.loadURL(overlayUrl);
 125 |       this.overlayWindow.webContents.openDevTools();
 126 |     } else {
 127 |       this.overlayWindow.loadFile(overlayUrl);
 128 |     }
 129 | 
 130 |     this.overlayWindow.webContents.on('did-finish-load', () => {
 131 |       this.overlayWindow.show();
 132 |       
 133 |       if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 134 |         this.mainWindow.webContents.send('overlay-ready', true);
 135 |       }
 136 |       
 137 |       const timerData = this.store.get('timerData');
 138 |       if (timerData && this.overlayWindow) {
 139 |         setTimeout(() => {
 140 |           this.overlayWindow.webContents.send('timer-data-sync', timerData);
 141 |         }, 100);
 142 |       }
 143 |     });
 144 | 
 145 |     this.overlayWindow.on('closed', () => {
 146 |       this.overlayWindow = null;
 147 |       
 148 |       if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 149 |         this.mainWindow.webContents.send('overlay-ready', false);
 150 |       }
 151 |     });
 152 | 
 153 |     this.overlayWindow.on('move', () => {
 154 |       const bounds = this.overlayWindow.getBounds();
 155 |       if (bounds) {
 156 |         this.store.set('overlaySettings.x', bounds.x);
 157 |         this.store.set('overlaySettings.y', bounds.y);
 158 |       }
 159 |     });
 160 |   }
 161 | 
 162 |   setupIPC() {
 163 |     ipcMain.handle('store-get', (_, key) => this.store.get(key));
 164 |     
 165 |     ipcMain.handle('store-set', (_, key, value) => {
 166 |       this.store.set(key, value);
 167 |       
 168 |       if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 169 |         this.overlayWindow.webContents.send('timer-data-sync', value);
 170 |       }
 171 |     });
 172 | 
 173 |     ipcMain.handle('overlay-show', async () => {
 174 |       try {
 175 |         this.createOverlayWindow();
 176 |         return { success: true };
 177 |       } catch (error) {
 178 |         return { success: false, error: error.message };
 179 |       }
 180 |     });
 181 | 
 182 |     ipcMain.handle('overlay-hide', async () => {
 183 |       if (this.overlayWindow) {
 184 |         this.overlayWindow.close();
 185 |         this.overlayWindow = null;
 186 |         return { success: true };
 187 |       }
 188 |       return { success: false, error: 'No overlay window to hide' };
 189 |     });
 190 | 
 191 |     ipcMain.handle('overlay-settings-update', async (_, settings) => {
 192 |       if (!this.overlayWindow) return;
 193 | 
 194 |       try {
 195 |         if (settings.locked !== undefined) {
 196 |           this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 197 |           this.overlayWindow.setFocusable(!settings.locked);
 198 |         }
 199 | 
 200 |         if (settings.alwaysOnTop !== undefined) {
 201 |           this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 202 |         }
 203 | 
 204 |         if (settings.x !== undefined || settings.y !== undefined) {
 205 |           this.overlayWindow.setPosition(settings.x || 0, settings.y || 0);
 206 |         }
 207 | 
 208 |         this.store.set('overlaySettings', {
 209 |           ...this.store.get('overlaySettings', {}),
 210 |           ...settings
 211 |         });
 212 |       } catch (error) {
 213 |         console.error('Error updating overlay settings:', error);
 214 |       }
 215 |     });
 216 | 
 217 |     ipcMain.handle('timer-data-sync', async (_, data) => {
 218 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 219 |         this.overlayWindow.webContents.send('timer-data-sync', data);
 220 |       }
 221 |       this.store.set('timerData', data);
 222 |     });
 223 | 
 224 |     ipcMain.handle('overlay-style-change', async (_, style) => {
 225 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 226 |         this.overlayWindow.webContents.send('overlay-style-change', style);
 227 |       }
 228 |     });
 229 |   }
 230 | 
 231 |   setupGlobalShortcuts() {
 232 |     const registerShortcut = (key, action) => {
 233 |       try {
 234 |         globalShortcut.register(key, () => {
 235 |           this.mainWindow.webContents.send('hotkey-pressed', action);
 236 |         });
 237 |       } catch (error) {
 238 |         console.warn(`Failed to register shortcut ${key}:`, error);
 239 |       }
 240 |     };
 241 | 
 242 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 243 |       start: 'F1',
 244 |       swap: 'F2'
 245 |     });
 246 | 
 247 |     registerShortcut(savedHotkeys.start, 'start');
 248 |     registerShortcut(savedHotkeys.swap, 'swap');
 249 | 
 250 |     ipcMain.handle('hotkey-register', async (_, hotkeys) => {
 251 |       globalShortcut.unregisterAll();
 252 |       registerShortcut(hotkeys.start, 'start');
 253 |       registerShortcut(hotkeys.swap, 'swap');
 254 |       this.store.set('timerData.hotkeys', hotkeys);
 255 |     });
 256 |   }
 257 | }
 258 | 
 259 | new TimerOverlayApp();

```

`dbdoverlaytools-free/electron\preload.cjs`:

```cjs
   1 | const { contextBridge, ipcRenderer } = require('electron');
   2 | 
   3 | const api = {
   4 |   store: {
   5 |     get: (key) => ipcRenderer.invoke('store-get', key),
   6 |     set: (key, value) => ipcRenderer.invoke('store-set', key, value),
   7 |   },
   8 |   
   9 |   overlay: {
  10 |     show: () => ipcRenderer.invoke('overlay-show'),
  11 |     hide: () => ipcRenderer.invoke('overlay-hide'),
  12 |     updateSettings: (settings) => ipcRenderer.invoke('overlay-settings-update', settings),
  13 |     styleChange: (style) => ipcRenderer.invoke('overlay-style-change', style),
  14 |     
  15 |     onDataSync: (callback) => {
  16 |       ipcRenderer.on('timer-data-sync', (_, data) => callback(data));
  17 |       return () => ipcRenderer.removeAllListeners('timer-data-sync');
  18 |     },
  19 |     
  20 |     onStyleChange: (callback) => {
  21 |       ipcRenderer.on('overlay-style-change', (_, style) => callback(style));
  22 |       return () => ipcRenderer.removeAllListeners('overlay-style-change');
  23 |     },
  24 |     
  25 |     onReady: (callback) => {
  26 |       ipcRenderer.on('overlay-ready', (_, isReady) => callback(isReady));
  27 |       return () => ipcRenderer.removeAllListeners('overlay-ready');
  28 |     },
  29 |   },
  30 |   
  31 |   timer: {
  32 |     syncData: (data) => ipcRenderer.invoke('timer-data-sync', data),
  33 |   },
  34 |   
  35 |   hotkeys: {
  36 |     register: (hotkeys) => ipcRenderer.invoke('hotkey-register', hotkeys),
  37 |     
  38 |     onPressed: (callback) => {
  39 |       ipcRenderer.on('hotkey-pressed', (_, action) => callback(action));
  40 |       return () => ipcRenderer.removeAllListeners('hotkey-pressed');
  41 |     },
  42 |   },
  43 |   
  44 |   removeAllListeners: () => {
  45 |     ipcRenderer.removeAllListeners('timer-data-sync');
  46 |     ipcRenderer.removeAllListeners('overlay-style-change');
  47 |     ipcRenderer.removeAllListeners('hotkey-pressed');
  48 |     ipcRenderer.removeAllListeners('overlay-ready');
  49 |   },
  50 | };
  51 | 
  52 | contextBridge.exposeInMainWorld('electronAPI', api);

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
   5 |   "main": "electron/main.cjs",
   6 |   "type": "module",
   7 |   "scripts": {
   8 |     "dev": "vite",
   9 |     "build": "vite build",
  10 |     "electron:dev": "node scripts/start.js",
  11 |     "electron:build": "npm run build && electron-builder",
  12 |     "clean": "rimraf dist dist-electron release"
  13 |   },
  14 |   "keywords": [
  15 |     "electron",
  16 |     "react",
  17 |     "typescript",
  18 |     "dead-by-daylight",
  19 |     "overlay",
  20 |     "timer"
  21 |   ],
  22 |   "author": "Doc & Steaxs",
  23 |   "license": "MIT",
  24 |   "devDependencies": {
  25 |     "@types/node": "^20.10.0",
  26 |     "@types/react": "^18.2.43",
  27 |     "@types/react-dom": "^18.2.17",
  28 |     "@vitejs/plugin-react": "^4.2.1",
  29 |     "autoprefixer": "^10.4.16",
  30 |     "cross-env": "^7.0.3",
  31 |     "electron": "^28.1.0",
  32 |     "electron-builder": "^24.9.1",
  33 |     "postcss": "^8.4.32",
  34 |     "rimraf": "^5.0.5",
  35 |     "tailwindcss": "^3.3.6",
  36 |     "typescript": "^5.2.2",
  37 |     "vite": "^5.0.8",
  38 |     "vite-plugin-electron": "^0.28.1",
  39 |     "vite-plugin-electron-renderer": "^0.14.5"
  40 |   },
  41 |   "dependencies": {
  42 |     "electron-store": "^8.2.0",
  43 |     "react": "^18.2.0",
  44 |     "react-dom": "^18.2.0",
  45 |     "zustand": "^4.4.7"
  46 |   },
  47 |   "build": {
  48 |     "appId": "com.dbdtools.timer-overlay",
  49 |     "productName": "DBD Timer Overlay",
  50 |     "directories": {
  51 |       "output": "release"
  52 |     },
  53 |     "files": [
  54 |       "dist/**/*",
  55 |       "dist-electron/**/*",
  56 |       "node_modules/**/*",
  57 |       "package.json"
  58 |     ],
  59 |     "mac": {
  60 |       "target": [
  61 |         {
  62 |           "target": "dmg",
  63 |           "arch": [
  64 |             "arm64",
  65 |             "x64"
  66 |           ]
  67 |         }
  68 |       ]
  69 |     },
  70 |     "win": {
  71 |       "target": [
  72 |         {
  73 |           "target": "nsis",
  74 |           "arch": [
  75 |             "x64"
  76 |           ]
  77 |         }
  78 |       ]
  79 |     },
  80 |     "linux": {
  81 |       "target": [
  82 |         {
  83 |           "target": "AppImage",
  84 |           "arch": [
  85 |             "x64"
  86 |           ]
  87 |         }
  88 |       ]
  89 |     }
  90 |   }
  91 | }

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
  10 | console.log('🚀 Starting DBD Timer Overlay...\n');
  11 | 
  12 | function waitForServer(port, timeout = 30000) {
  13 |   return new Promise((resolve, reject) => {
  14 |     const startTime = Date.now();
  15 |     
  16 |     const checkServer = () => {
  17 |       const socket = new net.Socket();
  18 |       
  19 |       socket.setTimeout(1000);
  20 |       socket.on('connect', () => {
  21 |         socket.destroy();
  22 |         console.log(`✅ Server ready on port ${port}`);
  23 |         resolve(true);
  24 |       });
  25 |       
  26 |       socket.on('timeout', () => {
  27 |         socket.destroy();
  28 |         checkAgain();
  29 |       });
  30 |       
  31 |       socket.on('error', () => {
  32 |         checkAgain();
  33 |       });
  34 |       
  35 |       const checkAgain = () => {
  36 |         if (Date.now() - startTime > timeout) {
  37 |           reject(new Error(`Timeout waiting for server on port ${port}`));
  38 |           return;
  39 |         }
  40 |         setTimeout(checkServer, 500);
  41 |       };
  42 |       
  43 |       socket.connect(port, 'localhost');
  44 |     };
  45 |     
  46 |     checkServer();
  47 |   });
  48 | }
  49 | 
  50 | async function startApp() {
  51 |   try {
  52 |     console.log('📦 Starting Vite dev server...');
  53 |     const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
  54 |       stdio: 'pipe',
  55 |       shell: true
  56 |     });
  57 |     
  58 |     viteProcess.stdout.on('data', (data) => {
  59 |       process.stdout.write(`[VITE] ${data}`);
  60 |     });
  61 |     
  62 |     await waitForServer(5173);
  63 |     await new Promise(resolve => setTimeout(resolve, 1000));
  64 |     
  65 |     console.log('⚡ Starting Electron...');
  66 |     const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
  67 |       stdio: 'inherit',
  68 |       shell: true,
  69 |       cwd: path.join(__dirname, '..')
  70 |     });
  71 |     
  72 |     process.on('SIGINT', () => {
  73 |       console.log('\n🛑 Shutting down...');
  74 |       viteProcess.kill('SIGTERM');
  75 |       electronProcess.kill('SIGTERM');
  76 |       setTimeout(() => process.exit(0), 1000);
  77 |     });
  78 |     
  79 |     electronProcess.on('close', (code) => {
  80 |       console.log(`\n📱 Electron exited with code ${code}`);
  81 |       viteProcess.kill('SIGTERM');
  82 |       process.exit(code);
  83 |     });
  84 |     
  85 |     console.log('🎉 Application started successfully!');
  86 |     
  87 |   } catch (error) {
  88 |     console.error('❌ Error starting application:', error.message);
  89 |     process.exit(1);
  90 |   }
  91 | }
  92 | 
  93 | startApp();

```

`dbdoverlaytools-free/src\App.tsx`:

```tsx
   1 | import React, { useEffect, useState } from 'react';
   2 | import { useTimerStore } from './store/timerStore';
   3 | import ControlPanel from './components/ControlPanel';
   4 | import useGlobalHotkeys from './hooks/useGlobalHotkeys';
   5 | import type { TimerData } from './types';
   6 | 
   7 | declare global {
   8 |   interface Window {
   9 |     electronAPI?: {
  10 |       store: {
  11 |         get: (key: string) => Promise<any>;
  12 |         set: (key: string, value: any) => Promise<void>;
  13 |       };
  14 |       overlay: {
  15 |         show: () => Promise<{ success: boolean; error?: string }>;
  16 |         hide: () => Promise<{ success: boolean; error?: string }>;
  17 |         updateSettings: (settings: any) => Promise<void>;
  18 |         styleChange: (style: any) => Promise<void>;
  19 |         onDataSync: (callback: (data: TimerData) => void) => () => void;
  20 |         onStyleChange: (callback: (style: any) => void) => () => void;
  21 |         onReady: (callback: (isReady: boolean) => void) => () => void;
  22 |       };
  23 |       timer: {
  24 |         syncData: (data: TimerData) => Promise<void>;
  25 |       };
  26 |       hotkeys: {
  27 |         register: (hotkeys: { start: string; swap: string }) => Promise<void>;
  28 |         onPressed: (callback: (action: string) => void) => () => void;
  29 |       };
  30 |       removeAllListeners: () => void;
  31 |     };
  32 |   }
  33 | }
  34 | 
  35 | const App: React.FC = () => {
  36 |   const { loadFromStorage, timerData } = useTimerStore();
  37 |   const [isInitialized, setIsInitialized] = useState(false);
  38 | 
  39 |   useGlobalHotkeys();
  40 | 
  41 |   useEffect(() => {
  42 |     const initializeApp = async () => {
  43 |       try {
  44 |         await loadFromStorage();
  45 |         setIsInitialized(true);
  46 |         console.log('App initialized with data:', timerData);
  47 |       } catch (error) {
  48 |         console.error('Failed to initialize app:', error);
  49 |         setIsInitialized(true);
  50 |       }
  51 |     };
  52 | 
  53 |     initializeApp();
  54 |   }, [loadFromStorage]);
  55 | 
  56 |   if (!isInitialized) {
  57 |     return (
  58 |       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  59 |         <div className="text-white text-lg">Loading...</div>
  60 |       </div>
  61 |     );
  62 |   }
  63 | 
  64 |   return (
  65 |     <div className="min-h-screen bg-gray-900 text-white">
  66 |       <div className="container mx-auto p-6">
  67 |         <header className="text-center mb-8">
  68 |           <h1 className="text-4xl font-bold text-primary-400 mb-2">
  69 |             DBD Timer Overlay
  70 |           </h1>
  71 |           <p className="text-gray-400">
  72 |             Professional timer overlay for Dead by Daylight 1v1 matches
  73 |           </p>
  74 |         </header>
  75 | 
  76 |         <main>
  77 |           <ControlPanel />
  78 |         </main>
  79 | 
  80 |         <footer className="text-center mt-8 text-gray-500 text-sm">
  81 |           <p>Press your configured hotkeys to control timers globally</p>
  82 |         </footer>
  83 |       </div>
  84 |     </div>
  85 |   );
  86 | };
  87 | 
  88 | export default App;

```

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | import React, { useEffect } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | import useTimer from '../hooks/useTimer';
   4 | import TimerControls from './TimerControls';
   5 | import PlayerSettings from './PlayerSettings';
   6 | import OverlaySettings from './OverlaySettings';
   7 | import HotkeySettings from './HotkeySettings';
   8 | 
   9 | const ControlPanel: React.FC = () => {
  10 |   const {
  11 |     timerData,
  12 |     overlaySettings,
  13 |     isOverlayVisible,
  14 |     setOverlayVisible,
  15 |     saveToStorage,
  16 |   } = useTimerStore();
  17 | 
  18 |   const { formattedTime1, formattedTime2, isRunning } = useTimer();
  19 | 
  20 |   useEffect(() => {
  21 |     if (!window.electronAPI) return;
  22 | 
  23 |     const unsubscribeOverlayReady = window.electronAPI.overlay.onReady((isReady: boolean) => {
  24 |       setOverlayVisible(isReady);
  25 |     });
  26 | 
  27 |     return () => {
  28 |       unsubscribeOverlayReady();
  29 |     };
  30 |   }, [setOverlayVisible]);
  31 | 
  32 |   const handleToggleOverlay = async () => {
  33 |     if (!window.electronAPI) return;
  34 | 
  35 |     try {
  36 |       if (isOverlayVisible) {
  37 |         await window.electronAPI.overlay.hide();
  38 |         setOverlayVisible(false);
  39 |       } else {
  40 |         await window.electronAPI.overlay.show();
  41 |         setOverlayVisible(true);
  42 |       }
  43 |       saveToStorage();
  44 |     } catch (error) {
  45 |       console.error('Failed to toggle overlay:', error);
  46 |     }
  47 |   };
  48 | 
  49 |   return (
  50 |     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  51 |       <div className="space-y-6">
  52 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  53 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
  54 |             Timer Control
  55 |           </h2>
  56 |           
  57 |           <div className="mb-6">
  58 |             <div className="grid grid-cols-2 gap-4 mb-4">
  59 |               <div className="text-center">
  60 |                 <div className="text-sm text-gray-400 mb-1">
  61 |                   {timerData.player1Name}
  62 |                 </div>
  63 |                 <div className={`text-2xl font-mono font-bold ${
  64 |                   timerData.currentTimer === 1 && isRunning 
  65 |                     ? 'text-primary-400 timer-glow' 
  66 |                     : 'text-white'
  67 |                 }`}>
  68 |                   {formattedTime1}
  69 |                 </div>
  70 |               </div>
  71 |               
  72 |               <div className="text-center">
  73 |                 <div className="text-sm text-gray-400 mb-1">
  74 |                   {timerData.player2Name}
  75 |                 </div>
  76 |                 <div className={`text-2xl font-mono font-bold ${
  77 |                   timerData.currentTimer === 2 && isRunning 
  78 |                     ? 'text-primary-400 timer-glow' 
  79 |                     : 'text-white'
  80 |                 }`}>
  81 |                   {formattedTime2}
  82 |                 </div>
  83 |               </div>
  84 |             </div>
  85 |             
  86 |             <div className="text-center text-lg font-semibold">
  87 |               Score: {timerData.player1Score} - {timerData.player2Score}
  88 |             </div>
  89 |           </div>
  90 |           
  91 |           <TimerControls />
  92 |         </div>
  93 | 
  94 |         <PlayerSettings />
  95 |       </div>
  96 | 
  97 |       <div className="space-y-6">
  98 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  99 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
 100 |             Overlay Control
 101 |           </h2>
 102 |           
 103 |           <div className="space-y-4">
 104 |             <button
 105 |               onClick={handleToggleOverlay}
 106 |               className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
 107 |                 isOverlayVisible
 108 |                   ? 'bg-success-600 hover:bg-success-700 text-white'
 109 |                   : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
 110 |               }`}
 111 |             >
 112 |               {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
 113 |             </button>
 114 |             
 115 |             <div className="text-sm text-gray-400">
 116 |               Status: {isOverlayVisible ? 'Visible' : 'Hidden'}
 117 |             </div>
 118 |           </div>
 119 |         </div>
 120 | 
 121 |         <OverlaySettings />
 122 |         <HotkeySettings />
 123 |       </div>
 124 |     </div>
 125 |   );
 126 | };
 127 | 
 128 | export default ControlPanel;

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
  18 |     console.log('Start/Pause clicked. Current running state:', isRunning);
  19 |     
  20 |     if (isRunning) {
  21 |       pauseTimer();
  22 |     } else {
  23 |       startTimer();
  24 |     }
  25 |     
  26 |     // Sauvegarder après un délai pour laisser le temps aux états de se mettre à jour
  27 |     setTimeout(() => {
  28 |       saveToStorage();
  29 |     }, 100);
  30 |   };
  31 | 
  32 |   const handleSwap = () => {
  33 |     console.log('Swap clicked. Current timer:', timerData.currentTimer);
  34 |     swapTimer();
  35 |     
  36 |     setTimeout(() => {
  37 |       saveToStorage();
  38 |     }, 100);
  39 |   };
  40 | 
  41 |   const handleResetCurrent = () => {
  42 |     console.log('Reset current clicked. Current timer:', timerData.currentTimer);
  43 |     resetTimer();
  44 |     
  45 |     setTimeout(() => {
  46 |       saveToStorage();
  47 |     }, 100);
  48 |   };
  49 | 
  50 |   const handleResetAll = () => {
  51 |     console.log('Reset all clicked');
  52 |     resetAllTimers();
  53 |     
  54 |     setTimeout(() => {
  55 |       saveToStorage();
  56 |     }, 100);
  57 |   };
  58 | 
  59 |   const handleTimerSelect = (timer: 1 | 2) => {
  60 |     console.log('Timer selected:', timer);
  61 |     setCurrentTimer(timer);
  62 |     
  63 |     setTimeout(() => {
  64 |       saveToStorage();
  65 |     }, 100);
  66 |   };
  67 | 
  68 |   return (
  69 |     <div className="space-y-4">
  70 |       <div className="grid grid-cols-2 gap-3">
  71 |         <button
  72 |           onClick={() => handleTimerSelect(1)}
  73 |           className={`py-2 px-4 rounded-md font-medium transition-colors ${
  74 |             timerData.currentTimer === 1
  75 |               ? 'bg-primary-600 text-white'
  76 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  77 |           }`}
  78 |         >
  79 |           Timer 1 {timerData.currentTimer === 1 && isRunning && '●'}
  80 |         </button>
  81 |         
  82 |         <button
  83 |           onClick={() => handleTimerSelect(2)}
  84 |           className={`py-2 px-4 rounded-md font-medium transition-colors ${
  85 |             timerData.currentTimer === 2
  86 |               ? 'bg-primary-600 text-white'
  87 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  88 |           }`}
  89 |         >
  90 |           Timer 2 {timerData.currentTimer === 2 && isRunning && '●'}
  91 |         </button>
  92 |       </div>
  93 | 
  94 |       <div className="grid grid-cols-2 gap-3">
  95 |         <button
  96 |           onClick={handleStartPause}
  97 |           className={`py-3 px-4 rounded-md font-semibold transition-colors ${
  98 |             isRunning
  99 |               ? 'bg-danger-600 hover:bg-danger-700 text-white'
 100 |               : 'bg-success-600 hover:bg-success-700 text-white'
 101 |           }`}
 102 |         >
 103 |           {isRunning ? 'Pause' : 'Start'}
 104 |         </button>
 105 |         
 106 |         <button
 107 |           onClick={handleSwap}
 108 |           className="py-3 px-4 bg-info-600 hover:bg-info-700 text-white rounded-md font-semibold transition-colors"
 109 |         >
 110 |           Swap
 111 |         </button>
 112 |       </div>
 113 | 
 114 |       <div className="grid grid-cols-2 gap-3">
 115 |         <button
 116 |           onClick={handleResetCurrent}
 117 |           className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
 118 |         >
 119 |           Reset Current
 120 |         </button>
 121 |         
 122 |         <button
 123 |           onClick={handleResetAll}
 124 |           className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
 125 |         >
 126 |           Reset All
 127 |         </button>
 128 |       </div>
 129 | 
 130 |       <div className="text-sm text-gray-400 text-center">
 131 |         Active Timer: {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
 132 |         {isRunning && <span className="text-success-400 ml-2">● Running</span>}
 133 |       </div>
 134 |     </div>
 135 |   );
 136 | };
 137 | 
 138 | export default TimerControls;

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
  13 |       console.log('Global hotkey pressed:', action, 'Current running state:', isRunning);
  14 |       
  15 |       switch (action) {
  16 |         case 'start':
  17 |           if (isRunning) {
  18 |             console.log('Pausing via hotkey');
  19 |             pauseTimer();
  20 |           } else {
  21 |             console.log('Starting via hotkey');
  22 |             startTimer();
  23 |           }
  24 |           
  25 |           // Sauvegarder après un délai
  26 |           setTimeout(() => {
  27 |             saveToStorage();
  28 |           }, 200);
  29 |           break;
  30 |           
  31 |         case 'swap':
  32 |           console.log('Swapping via hotkey');
  33 |           swapTimer();
  34 |           
  35 |           setTimeout(() => {
  36 |             saveToStorage();
  37 |           }, 200);
  38 |           break;
  39 |           
  40 |         default:
  41 |           console.warn('Unknown hotkey action:', action);
  42 |       }
  43 |     };
  44 | 
  45 |     window.electronAPI.hotkeys.onPressed(handleHotkeyPress);
  46 | 
  47 |     return () => {
  48 |       if (window.electronAPI?.removeAllListeners) {
  49 |         window.electronAPI.removeAllListeners();
  50 |       }
  51 |     };
  52 |   }, [isRunning, startTimer, pauseTimer, swapTimer, saveToStorage]);
  53 | 
  54 |   const registerHotkeys = async (startKey: string, swapKey: string) => {
  55 |     if (!window.electronAPI) {
  56 |       console.warn('Electron API not available');
  57 |       return;
  58 |     }
  59 | 
  60 |     try {
  61 |       await window.electronAPI.hotkeys.register({
  62 |         start: startKey,
  63 |         swap: swapKey,
  64 |       });
  65 |       console.log('Hotkeys registered:', { start: startKey, swap: swapKey });
  66 |     } catch (error) {
  67 |       console.error('Failed to register hotkeys:', error);
  68 |     }
  69 |   };
  70 | 
  71 |   return { registerHotkeys };
  72 | };
  73 | 
  74 | export default useGlobalHotkeys;

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
  12 |   } = useTimerStore();
  13 | 
  14 |   const timer1Ref = useRef<PreciseTimer | null>(null);
  15 |   const timer2Ref = useRef<PreciseTimer | null>(null);
  16 |   const [formattedTime1, setFormattedTime1] = useState('0:00.0');
  17 |   const [formattedTime2, setFormattedTime2] = useState('0:00.0');
  18 | 
  19 |   const syncToOverlay = useCallback((data: any) => {
  20 |     if (window.electronAPI) {
  21 |       window.electronAPI.timer.syncData(data);
  22 |     }
  23 |   }, []);
  24 | 
  25 |   useEffect(() => {
  26 |     if (!timer1Ref.current) {
  27 |       timer1Ref.current = new PreciseTimer((value) => {
  28 |         setTimerValue(1, value);
  29 |         const formatted = formatTime(value);
  30 |         setFormattedTime1(formatted);
  31 |         
  32 |         const currentData = useTimerStore.getState().timerData;
  33 |         syncToOverlay({
  34 |           ...currentData,
  35 |           timer1Value: value,
  36 |           timer1: formatted,
  37 |           timer2: formatTime(currentData.timer2Value),
  38 |         });
  39 |       });
  40 |     }
  41 | 
  42 |     if (!timer2Ref.current) {
  43 |       timer2Ref.current = new PreciseTimer((value) => {
  44 |         setTimerValue(2, value);
  45 |         const formatted = formatTime(value);
  46 |         setFormattedTime2(formatted);
  47 |         
  48 |         const currentData = useTimerStore.getState().timerData;
  49 |         syncToOverlay({
  50 |           ...currentData,
  51 |           timer2Value: value,
  52 |           timer2: formatted,
  53 |           timer1: formatTime(currentData.timer1Value),
  54 |         });
  55 |       });
  56 |     }
  57 | 
  58 |     return () => {
  59 |       timer1Ref.current?.stop();
  60 |       timer2Ref.current?.stop();
  61 |     };
  62 |   }, [setTimerValue, syncToOverlay]);
  63 | 
  64 |   useEffect(() => {
  65 |     const newTime1 = formatTime(timerData.timer1Value);
  66 |     const newTime2 = formatTime(timerData.timer2Value);
  67 |     
  68 |     setFormattedTime1(newTime1);
  69 |     setFormattedTime2(newTime2);
  70 |     
  71 |     syncToOverlay({
  72 |       ...timerData,
  73 |       timer1: newTime1,
  74 |       timer2: newTime2,
  75 |     });
  76 |   }, [
  77 |     timerData.timer1Value,
  78 |     timerData.timer2Value,
  79 |     timerData.player1Name,
  80 |     timerData.player2Name,
  81 |     timerData.player1Score,
  82 |     timerData.player2Score,
  83 |     timerData.currentTimer,
  84 |     timerData.isRunning,
  85 |     timerData.style,
  86 |     syncToOverlay
  87 |   ]);
  88 | 
  89 |   const startTimer = useCallback(() => {
  90 |     const currentTimer = timerData.currentTimer;
  91 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
  92 |     const initialValue = currentTimer === 1 ? timerData.timer1Value : timerData.timer2Value;
  93 | 
  94 |     if (timerRef && !timerRef.running) {
  95 |       timerRef.start(initialValue);
  96 |       setTimerRunning(true);
  97 |     }
  98 |   }, [timerData.currentTimer, timerData.timer1Value, timerData.timer2Value, setTimerRunning]);
  99 | 
 100 |   const pauseTimer = useCallback(() => {
 101 |     const currentTimer = timerData.currentTimer;
 102 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 103 | 
 104 |     if (timerRef && timerRef.running) {
 105 |       const finalValue = timerRef.pause();
 106 |       setTimerValue(currentTimer, finalValue);
 107 |       setTimerRunning(false);
 108 |     }
 109 |   }, [timerData.currentTimer, setTimerValue, setTimerRunning]);
 110 | 
 111 |   const swapTimer = useCallback(() => {
 112 |     if (timerData.isRunning) {
 113 |       pauseTimer();
 114 |     }
 115 |     
 116 |     const newTimer = timerData.currentTimer === 1 ? 2 : 1;
 117 |     setCurrentTimer(newTimer);
 118 |   }, [timerData.currentTimer, timerData.isRunning, pauseTimer, setCurrentTimer]);
 119 | 
 120 |   const resetCurrentTimer = useCallback(() => {
 121 |     if (timerData.isRunning) {
 122 |       pauseTimer();
 123 |     }
 124 |     
 125 |     resetTimer();
 126 |     
 127 |     const timerRef = timerData.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 128 |     if (timerRef) {
 129 |       timerRef.reset();
 130 |     }
 131 |   }, [timerData.isRunning, timerData.currentTimer, pauseTimer, resetTimer]);
 132 | 
 133 |   const resetAllTimers = useCallback(() => {
 134 |     timer1Ref.current?.reset();
 135 |     timer2Ref.current?.reset();
 136 |     setTimerRunning(false);
 137 |   }, [setTimerRunning]);
 138 | 
 139 |   return {
 140 |     formattedTime1,
 141 |     formattedTime2,
 142 |     isRunning: timerData.isRunning,
 143 |     currentTimer: timerData.currentTimer,
 144 |     startTimer,
 145 |     pauseTimer,
 146 |     swapTimer,
 147 |     resetCurrentTimer,
 148 |     resetAllTimers,
 149 |   };
 150 | };
 151 | 
 152 | export default useTimer;

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
   5 | import { useTimerStore } from './store/timerStore';
   6 | import './index.css';
   7 | 
   8 | // Initialize store for overlay
   9 | const initializeOverlay = async () => {
  10 |   const store = useTimerStore.getState();
  11 |   await store.loadFromStorage();
  12 |   console.log('Overlay initialized with data:', store.timerData);
  13 | };
  14 | 
  15 | // Initialize store
  16 | initializeOverlay().catch(console.error);
  17 | 
  18 | ReactDOM.createRoot(document.getElementById('overlay-root')!).render(
  19 |   <React.StrictMode>
  20 |     <OverlayApp />
  21 |   </React.StrictMode>
  22 | );

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
  23 |   setOverlayVisible: (visible: boolean) => void;
  24 |   toggleOverlayLock: () => void;
  25 |   updateOverlayScale: (scale: number) => void;
  26 |   
  27 |   loadFromStorage: () => void;
  28 |   saveToStorage: () => void;
  29 | }
  30 | 
  31 | export const useTimerStore = create<TimerStore>((set, get) => ({
  32 |   timerData: { ...DEFAULT_TIMER_DATA },
  33 |   overlaySettings: { ...DEFAULT_OVERLAY_SETTINGS },
  34 |   isOverlayVisible: false,
  35 |   
  36 |   updateTimerData: (data) => {
  37 |     set((state) => ({
  38 |       timerData: { ...state.timerData, ...data }
  39 |     }));
  40 |   },
  41 |   
  42 |   updatePlayerName: (player, name) => {
  43 |     set((state) => ({
  44 |       timerData: {
  45 |         ...state.timerData,
  46 |         [player === 1 ? 'player1Name' : 'player2Name']: name
  47 |       }
  48 |     }));
  49 |   },
  50 |   
  51 |   updatePlayerScore: (player, delta) => {
  52 |     set((state) => {
  53 |       const currentScore = player === 1 ? state.timerData.player1Score : state.timerData.player2Score;
  54 |       const newScore = Math.max(0, currentScore + delta);
  55 |       
  56 |       return {
  57 |         timerData: {
  58 |           ...state.timerData,
  59 |           [player === 1 ? 'player1Score' : 'player2Score']: newScore
  60 |         }
  61 |       };
  62 |     });
  63 |   },
  64 |   
  65 |   setTimerValue: (timer, value) => {
  66 |     set((state) => ({
  67 |       timerData: {
  68 |         ...state.timerData,
  69 |         [timer === 1 ? 'timer1Value' : 'timer2Value']: Math.max(0, value)
  70 |       }
  71 |     }));
  72 |   },
  73 |   
  74 |   setCurrentTimer: (timer) => {
  75 |     set((state) => ({
  76 |       timerData: { ...state.timerData, currentTimer: timer }
  77 |     }));
  78 |   },
  79 |   
  80 |   setTimerRunning: (running) => {
  81 |     set((state) => ({
  82 |       timerData: { ...state.timerData, isRunning: running }
  83 |     }));
  84 |   },
  85 |   
  86 |   swapTimer: () => {
  87 |     set((state) => ({
  88 |       timerData: {
  89 |         ...state.timerData,
  90 |         currentTimer: state.timerData.currentTimer === 1 ? 2 : 1,
  91 |         isRunning: false
  92 |       }
  93 |     }));
  94 |   },
  95 |   
  96 |   resetTimer: (timer) => {
  97 |     set((state) => {
  98 |       if (timer) {
  99 |         return {
 100 |           timerData: {
 101 |             ...state.timerData,
 102 |             [timer === 1 ? 'timer1Value' : 'timer2Value']: 0,
 103 |             isRunning: false
 104 |           }
 105 |         };
 106 |       } else {
 107 |         return {
 108 |           timerData: {
 109 |             ...state.timerData,
 110 |             [state.timerData.currentTimer === 1 ? 'timer1Value' : 'timer2Value']: 0,
 111 |             isRunning: false
 112 |           }
 113 |         };
 114 |       }
 115 |     });
 116 |   },
 117 |   
 118 |   resetAllTimers: () => {
 119 |     set((state) => ({
 120 |       timerData: {
 121 |         ...state.timerData,
 122 |         timer1Value: 0,
 123 |         timer2Value: 0,
 124 |         player1Score: 0,
 125 |         player2Score: 0,
 126 |         currentTimer: 1,
 127 |         isRunning: false
 128 |       }
 129 |     }));
 130 |   },
 131 |   
 132 |   updateHotkeys: (hotkeys) => {
 133 |     set((state) => ({
 134 |       timerData: {
 135 |         ...state.timerData,
 136 |         ...(hotkeys.start && { startHotkey: hotkeys.start }),
 137 |         ...(hotkeys.swap && { swapHotkey: hotkeys.swap })
 138 |       }
 139 |     }));
 140 |   },
 141 |   
 142 |   updateStyle: (style) => {
 143 |     set((state) => ({
 144 |       timerData: { ...state.timerData, style }
 145 |     }));
 146 |   },
 147 |   
 148 |   updateOverlaySettings: (settings) => {
 149 |     set((state) => ({
 150 |       overlaySettings: { ...state.overlaySettings, ...settings }
 151 |     }));
 152 |   },
 153 |   
 154 |   setOverlayVisible: (visible) => {
 155 |     set({ isOverlayVisible: visible });
 156 |   },
 157 |   
 158 |   toggleOverlayLock: () => {
 159 |     set((state) => ({
 160 |       overlaySettings: {
 161 |         ...state.overlaySettings,
 162 |         locked: !state.overlaySettings.locked
 163 |       }
 164 |     }));
 165 |   },
 166 |   
 167 |   updateOverlayScale: (scale) => {
 168 |     set((state) => ({
 169 |       overlaySettings: { ...state.overlaySettings, scale }
 170 |     }));
 171 |   },
 172 |   
 173 |   loadFromStorage: async () => {
 174 |     if (typeof window === 'undefined') return;
 175 |     
 176 |     try {
 177 |       // Load from localStorage first
 178 |       const savedData = localStorage.getItem('dbd-timer-data');
 179 |       const savedSettings = localStorage.getItem('dbd-overlay-settings');
 180 |       
 181 |       if (savedData) {
 182 |         const timerData = JSON.parse(savedData);
 183 |         set((state) => ({
 184 |           timerData: { ...state.timerData, ...timerData }
 185 |         }));
 186 |       }
 187 |       
 188 |       if (savedSettings) {
 189 |         const overlaySettings = JSON.parse(savedSettings);
 190 |         set((state) => ({
 191 |           overlaySettings: { ...state.overlaySettings, ...overlaySettings }
 192 |         }));
 193 |       }
 194 | 
 195 |       // Load from Electron store if available
 196 |       if (window.electronAPI) {
 197 |         try {
 198 |           const electronTimerData = await window.electronAPI.store.get('timerData');
 199 |           const electronOverlaySettings = await window.electronAPI.store.get('overlaySettings');
 200 |           
 201 |           if (electronTimerData) {
 202 |             set((state) => ({
 203 |               timerData: { ...state.timerData, ...electronTimerData }
 204 |             }));
 205 |           }
 206 |           
 207 |           if (electronOverlaySettings) {
 208 |             set((state) => ({
 209 |               overlaySettings: { ...state.overlaySettings, ...electronOverlaySettings }
 210 |             }));
 211 |           }
 212 |         } catch (error) {
 213 |           console.warn('Failed to load from Electron store:', error);
 214 |         }
 215 |       }
 216 |     } catch (error) {
 217 |       console.warn('Failed to load data from storage:', error);
 218 |     }
 219 |   },
 220 |   
 221 |   saveToStorage: () => {
 222 |     if (typeof window === 'undefined') return;
 223 |     
 224 |     try {
 225 |       const { timerData, overlaySettings } = get();
 226 |       localStorage.setItem('dbd-timer-data', JSON.stringify(timerData));
 227 |       localStorage.setItem('dbd-overlay-settings', JSON.stringify(overlaySettings));
 228 |       
 229 |       if (window.electronAPI) {
 230 |         window.electronAPI.timer.syncData(timerData);
 231 |         window.electronAPI.store.set('timerData', timerData);
 232 |         window.electronAPI.store.set('overlaySettings', overlaySettings);
 233 |       }
 234 |     } catch (error) {
 235 |       console.warn('Failed to save data to storage:', error);
 236 |     }
 237 |   }
 238 | }));

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
   1 | export function cn(...inputs: (string | undefined | null | boolean)[]): string {
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
   3 | import { resolve } from 'path'
   4 | 
   5 | export default defineConfig({
   6 |   plugins: [react()],
   7 |   base: './',
   8 |   build: {
   9 |     outDir: 'dist',
  10 |     assetsDir: 'assets',
  11 |     emptyOutDir: true,
  12 |     rollupOptions: {
  13 |       input: {
  14 |         main: resolve(__dirname, 'index.html'),
  15 |         overlay: resolve(__dirname, 'overlay.html')
  16 |       }
  17 |     }
  18 |   },
  19 |   server: {
  20 |     port: 5173,
  21 |     strictPort: true,
  22 |     cors: true
  23 |   }
  24 | })

```