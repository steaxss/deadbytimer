Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── electron
│   ├── main.ts
│   └── preload.ts
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
   1 | import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
   2 | import { join, dirname } from 'path';
   3 | import { fileURLToPath } from 'url';
   4 | import Store from 'electron-store';
   5 | 
   6 | const __filename = fileURLToPath(import.meta.url);
   7 | const __dirname = dirname(__filename);
   8 | 
   9 | interface WindowState {
  10 |   x?: number;
  11 |   y?: number;
  12 |   width?: number;
  13 |   height?: number;
  14 | }
  15 | 
  16 | class TimerOverlayApp {
  17 |   private mainWindow: BrowserWindow | null = null;
  18 |   private overlayWindow: BrowserWindow | null = null;
  19 |   private store: Store;
  20 |   private isDev: boolean;
  21 | 
  22 |   constructor() {
  23 |     this.store = new Store();
  24 |     this.isDev = process.env.NODE_ENV === 'development';
  25 |     this.initializeApp();
  26 |   }
  27 | 
  28 |   private initializeApp(): void {
  29 |     app.whenReady().then(() => {
  30 |       this.createMainWindow();
  31 |       this.setupIPC();
  32 |       this.setupGlobalShortcuts();
  33 |     });
  34 | 
  35 |     app.on('window-all-closed', () => {
  36 |       if (process.platform !== 'darwin') {
  37 |         globalShortcut.unregisterAll();
  38 |         app.quit();
  39 |       }
  40 |     });
  41 | 
  42 |     app.on('activate', () => {
  43 |       if (BrowserWindow.getAllWindows().length === 0) {
  44 |         this.createMainWindow();
  45 |       }
  46 |     });
  47 |   }
  48 | 
  49 |   private createMainWindow(): void {
  50 |     const savedState = this.store.get('windowState') as WindowState;
  51 | 
  52 |     this.mainWindow = new BrowserWindow({
  53 |       width: savedState?.width || 800,
  54 |       height: savedState?.height || 600,
  55 |       x: savedState?.x,
  56 |       y: savedState?.y,
  57 |       minWidth: 600,
  58 |       minHeight: 400,
  59 |       show: false,
  60 |       autoHideMenuBar: true,
  61 |       webPreferences: {
  62 |         nodeIntegration: false,
  63 |         contextIsolation: true,
  64 |         preload: join(__dirname, 'preload.js')
  65 |       }
  66 |     });
  67 | 
  68 |     if (this.isDev) {
  69 |       this.mainWindow.loadURL('http://localhost:5173');
  70 |       this.mainWindow.webContents.openDevTools();
  71 |     } else {
  72 |       this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  73 |     }
  74 | 
  75 |     this.mainWindow.once('ready-to-show', () => {
  76 |       this.mainWindow?.show();
  77 |       this.mainWindow?.focus();
  78 |     });
  79 | 
  80 |     this.mainWindow.on('close', () => {
  81 |       const bounds = this.mainWindow?.getBounds();
  82 |       if (bounds) {
  83 |         this.store.set('windowState', bounds);
  84 |       }
  85 |     });
  86 |   }
  87 | 
  88 |   private createOverlayWindow(): void {
  89 |     if (this.overlayWindow) {
  90 |       this.overlayWindow.focus();
  91 |       return;
  92 |     }
  93 | 
  94 |     const overlaySettings = this.store.get('overlaySettings', {
  95 |       x: 100,
  96 |       y: 100,
  97 |       scale: 100,
  98 |       locked: false,
  99 |       alwaysOnTop: true
 100 |     }) as any;
 101 | 
 102 |     this.overlayWindow = new BrowserWindow({
 103 |       width: 520,
 104 |       height: 120,
 105 |       x: overlaySettings.x,
 106 |       y: overlaySettings.y,
 107 |       frame: false,
 108 |       transparent: true,
 109 |       alwaysOnTop: overlaySettings.alwaysOnTop,
 110 |       skipTaskbar: true,
 111 |       resizable: false,
 112 |       focusable: false,
 113 |       webPreferences: {
 114 |         nodeIntegration: false,
 115 |         contextIsolation: true,
 116 |         preload: join(__dirname, 'preload.js')
 117 |       }
 118 |     });
 119 | 
 120 |     if (overlaySettings.locked) {
 121 |       this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
 122 |     }
 123 | 
 124 |     if (this.isDev) {
 125 |       this.overlayWindow.loadURL('http://localhost:5173/overlay.html');
 126 |     } else {
 127 |       this.overlayWindow.loadFile(join(__dirname, '../dist/overlay.html'));
 128 |     }
 129 | 
 130 |     this.overlayWindow.on('closed', () => {
 131 |       this.overlayWindow = null;
 132 |     });
 133 | 
 134 |     this.overlayWindow.on('move', () => {
 135 |       const bounds = this.overlayWindow?.getBounds();
 136 |       if (bounds) {
 137 |         this.store.set('overlaySettings.x', bounds.x);
 138 |         this.store.set('overlaySettings.y', bounds.y);
 139 |       }
 140 |     });
 141 |   }
 142 | 
 143 |   private setupIPC(): void {
 144 |     ipcMain.handle('store-get', (_, key: string) => {
 145 |       return this.store.get(key);
 146 |     });
 147 | 
 148 |     ipcMain.handle('store-set', (_, key: string, value: any) => {
 149 |       this.store.set(key, value);
 150 |     });
 151 | 
 152 |     ipcMain.handle('overlay-show', () => {
 153 |       this.createOverlayWindow();
 154 |     });
 155 | 
 156 |     ipcMain.handle('overlay-hide', () => {
 157 |       if (this.overlayWindow) {
 158 |         this.overlayWindow.close();
 159 |         this.overlayWindow = null;
 160 |       }
 161 |     });
 162 | 
 163 |     ipcMain.handle('overlay-settings-update', (_, settings: any) => {
 164 |       if (!this.overlayWindow) return;
 165 | 
 166 |       if (settings.locked !== undefined) {
 167 |         this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 168 |       }
 169 | 
 170 |       if (settings.alwaysOnTop !== undefined) {
 171 |         this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 172 |       }
 173 | 
 174 |       if (settings.x !== undefined || settings.y !== undefined) {
 175 |         this.overlayWindow.setPosition(settings.x || 0, settings.y || 0);
 176 |       }
 177 | 
 178 |       this.store.set('overlaySettings', {
 179 |         ...this.store.get('overlaySettings', {}),
 180 |         ...settings
 181 |       });
 182 |     });
 183 | 
 184 |     ipcMain.handle('timer-update-display', (_, data: any) => {
 185 |       if (this.overlayWindow) {
 186 |         this.overlayWindow.webContents.send('timer-update-display', data);
 187 |       }
 188 |     });
 189 | 
 190 |     ipcMain.handle('timer-data-sync', (_, data: any) => {
 191 |       if (this.overlayWindow) {
 192 |         this.overlayWindow.webContents.send('timer-data-sync', data);
 193 |       }
 194 |     });
 195 | 
 196 |     ipcMain.handle('overlay-style-change', (_, style: string) => {
 197 |       if (this.overlayWindow) {
 198 |         this.overlayWindow.webContents.send('overlay-style-change', style);
 199 |       }
 200 |     });
 201 |   }
 202 | 
 203 |   private setupGlobalShortcuts(): void {
 204 |     const registerShortcut = (key: string, action: string) => {
 205 |       try {
 206 |         globalShortcut.register(key, () => {
 207 |           this.mainWindow?.webContents.send('hotkey-pressed', action);
 208 |         });
 209 |       } catch (error) {
 210 |         console.warn(`Failed to register shortcut ${key}:`, error);
 211 |       }
 212 |     };
 213 | 
 214 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 215 |       start: 'F1',
 216 |       swap: 'F2'
 217 |     }) as any;
 218 | 
 219 |     registerShortcut(savedHotkeys.start, 'start');
 220 |     registerShortcut(savedHotkeys.swap, 'swap');
 221 | 
 222 |     ipcMain.handle('hotkey-register', (_, hotkeys: { start: string; swap: string }) => {
 223 |       globalShortcut.unregisterAll();
 224 |       registerShortcut(hotkeys.start, 'start');
 225 |       registerShortcut(hotkeys.swap, 'swap');
 226 |       
 227 |       this.store.set('timerData.hotkeys', hotkeys);
 228 |     });
 229 |   }
 230 | }
 231 | 
 232 | new TimerOverlayApp();

```

`dbdoverlaytools-free/electron\preload.ts`:

```ts
   1 | // electron/preload.ts
   2 | import { contextBridge, ipcRenderer } from 'electron';
   3 | import type { IPCEvents } from '../src/types';
   4 | 
   5 | const api = {
   6 |   store: {
   7 |     get: (key: string) => ipcRenderer.invoke('store-get', key),
   8 |     set: (key: string, value: any) => ipcRenderer.invoke('store-set', key, value),
   9 |   },
  10 |   
  11 |   overlay: {
  12 |     show: () => ipcRenderer.invoke('overlay-show'),
  13 |     hide: () => ipcRenderer.invoke('overlay-hide'),
  14 |     updateSettings: (settings: any) => ipcRenderer.invoke('overlay-settings-update', settings),
  15 |     styleChange: (style: string) => ipcRenderer.invoke('overlay-style-change', style),
  16 |     
  17 |     onTimerUpdate: (callback: (data: any) => void) => {
  18 |       ipcRenderer.on('timer-update-display', (_, data) => callback(data));
  19 |     },
  20 |     
  21 |     onDataSync: (callback: (data: any) => void) => {
  22 |       ipcRenderer.on('timer-data-sync', (_, data) => callback(data));
  23 |     },
  24 |     
  25 |     onStyleChange: (callback: (style: string) => void) => {
  26 |       ipcRenderer.on('overlay-style-change', (_, style) => callback(style));
  27 |     },
  28 |   },
  29 |   
  30 |   timer: {
  31 |     updateDisplay: (data: any) => ipcRenderer.invoke('timer-update-display', data),
  32 |     syncData: (data: any) => ipcRenderer.invoke('timer-data-sync', data),
  33 |   },
  34 |   
  35 |   hotkeys: {
  36 |     register: (hotkeys: { start: string; swap: string }) => 
  37 |       ipcRenderer.invoke('hotkey-register', hotkeys),
  38 |     
  39 |     onPressed: (callback: (action: string) => void) => {
  40 |       ipcRenderer.on('hotkey-pressed', (_, action) => callback(action));
  41 |     },
  42 |   },
  43 |   
  44 |   removeAllListeners: () => {
  45 |     ipcRenderer.removeAllListeners('timer-update-display');
  46 |     ipcRenderer.removeAllListeners('timer-data-sync');
  47 |     ipcRenderer.removeAllListeners('overlay-style-change');
  48 |     ipcRenderer.removeAllListeners('hotkey-pressed');
  49 |   },
  50 | };
  51 | 
  52 | contextBridge.exposeInMainWorld('electronAPI', api);
  53 | 
  54 | declare global {
  55 |   interface Window {
  56 |     electronAPI: typeof api;
  57 |   }
  58 | }

```

`dbdoverlaytools-free/index.html`:

```html
   1 | <!doctype html>
   2 | <html lang="en">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   7 |     <title>DBD Timer Overlay - Control Panel</title>
   8 |   </head>
   9 |   <body>
  10 |     <div id="root"></div>
  11 |     <script type="module" src="/src/main.tsx"></script>
  12 |   </body>
  13 | </html>

```

`dbdoverlaytools-free/overlay.html`:

```html
   1 | <!doctype html>
   2 | <html lang="en">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   7 |     <title>DBD Timer Overlay</title>
   8 |     <style>
   9 |       body {
  10 |         margin: 0;
  11 |         padding: 0;
  12 |         background: transparent;
  13 |         overflow: hidden;
  14 |         user-select: none;
  15 |       }
  16 |     </style>
  17 |   </head>
  18 |   <body>
  19 |     <div id="overlay-root"></div>
  20 |     <script type="module" src="/src/overlay.tsx"></script>
  21 |   </body>
  22 | </html>

```

`dbdoverlaytools-free/package.json`:

```json
   1 | {
   2 |   "name": "dbd-timer-overlay",
   3 |   "version": "1.0.0",
   4 |   "description": "Dead by Daylight 1v1 Timer Overlay - Lightweight and performant desktop application",
   5 |   "main": "dist-electron/main.js",
   6 |   "type": "module",
   7 |   "scripts": {
   8 |     "dev": "vite",
   9 |     "build": "tsc && vite build && electron-builder",
  10 |     "electron": "wait-on tcp:5173 && wait-on file:./dist-electron/main.js && cross-env NODE_ENV=development electron .",
  11 |     "electron:pack": "electron-builder",
  12 |     "electron:dev": "node scripts/start.js",
  13 |     "electron:dev:old": "concurrently \"npm run dev\" \"npm run electron\"",
  14 |     "preview": "vite preview",
  15 |     "postinstall": "electron-builder install-app-deps",
  16 |     "clean": "rimraf dist dist-electron release",
  17 |     "setup": "node scripts/setup.js",
  18 |     "debug": "node scripts/debug.js",
  19 |     "fix": "node scripts/fix.js"
  20 |   },
  21 |   "keywords": [
  22 |     "electron",
  23 |     "react",
  24 |     "typescript",
  25 |     "vite",
  26 |     "dead-by-daylight",
  27 |     "overlay",
  28 |     "timer"
  29 |   ],
  30 |   "author": "Doc & Steaxs",
  31 |   "license": "MIT",
  32 |   "devDependencies": {
  33 |     "@types/node": "^20.10.0",
  34 |     "@types/react": "^18.2.43",
  35 |     "@types/react-dom": "^18.2.17",
  36 |     "@typescript-eslint/eslint-plugin": "^6.14.0",
  37 |     "@typescript-eslint/parser": "^6.14.0",
  38 |     "@vitejs/plugin-react": "^4.2.1",
  39 |     "autoprefixer": "^10.4.16",
  40 |     "concurrently": "^8.2.2",
  41 |     "cross-env": "^7.0.3",
  42 |     "electron": "^28.1.0",
  43 |     "electron-builder": "^24.9.1",
  44 |     "eslint": "^8.55.0",
  45 |     "eslint-plugin-react-hooks": "^4.6.0",
  46 |     "eslint-plugin-react-refresh": "^0.4.5",
  47 |     "postcss": "^8.4.32",
  48 |     "rimraf": "^5.0.5",
  49 |     "tailwindcss": "^3.3.6",
  50 |     "typescript": "^5.2.2",
  51 |     "vite": "^5.0.8",
  52 |     "vite-plugin-electron": "^0.28.1",
  53 |     "vite-plugin-electron-renderer": "^0.14.5",
  54 |     "wait-on": "^7.2.0"
  55 |   },
  56 |   "dependencies": {
  57 |     "electron-store": "^8.2.0",
  58 |     "react": "^18.2.0",
  59 |     "react-dom": "^18.2.0",
  60 |     "zustand": "^4.4.7"
  61 |   },
  62 |   "build": {
  63 |     "appId": "com.dbdtools.timer-overlay",
  64 |     "productName": "DBD Timer Overlay",
  65 |     "directories": {
  66 |       "output": "release"
  67 |     },
  68 |     "files": [
  69 |       "dist/**/*",
  70 |       "dist-electron/**/*",
  71 |       "node_modules/**/*",
  72 |       "package.json"
  73 |     ],
  74 |     "mac": {
  75 |       "icon": "resources/icon.icns",
  76 |       "target": [
  77 |         {
  78 |           "target": "dmg",
  79 |           "arch": [
  80 |             "arm64",
  81 |             "x64"
  82 |           ]
  83 |         }
  84 |       ]
  85 |     },
  86 |     "win": {
  87 |       "icon": "resources/icon.ico",
  88 |       "target": [
  89 |         {
  90 |           "target": "nsis",
  91 |           "arch": [
  92 |             "x64"
  93 |           ]
  94 |         }
  95 |       ]
  96 |     },
  97 |     "linux": {
  98 |       "icon": "resources/icon.png",
  99 |       "target": [
 100 |         {
 101 |           "target": "AppImage",
 102 |           "arch": [
 103 |             "x64"
 104 |           ]
 105 |         }
 106 |       ]
 107 |     }
 108 |   }
 109 | }

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
  77 |     // Start Vite dev server
  78 |     console.log('📦 Starting Vite dev server...');
  79 |     const viteProcess = spawn('npm', ['run', 'dev'], {
  80 |       stdio: 'pipe',
  81 |       shell: true
  82 |     });
  83 |     
  84 |     let viteReady = false;
  85 |     viteProcess.stdout.on('data', (data) => {
  86 |       const output = data.toString();
  87 |       process.stdout.write(`[VITE] ${output}`);
  88 |       
  89 |       if (output.includes('ready in') || output.includes('Local:')) {
  90 |         viteReady = true;
  91 |       }
  92 |     });
  93 |     
  94 |     viteProcess.stderr.on('data', (data) => {
  95 |       process.stderr.write(`[VITE ERROR] ${data}`);
  96 |     });
  97 |     
  98 |     // Wait for Vite server
  99 |     await waitForServer(5173);
 100 |     
 101 |     // Wait for main.js to be built
 102 |     const mainJsPath = path.join(__dirname, '..', 'dist-electron', 'main.js');
 103 |     console.log('⏳ Waiting for Electron main process to be built...');
 104 |     await waitForFile(mainJsPath);
 105 |     
 106 |     // Start Electron
 107 |     console.log('⚡ Starting Electron...');
 108 |     const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
 109 |       stdio: 'pipe',
 110 |       shell: true
 111 |     });
 112 |     
 113 |     electronProcess.stdout.on('data', (data) => {
 114 |       process.stdout.write(`[ELECTRON] ${data}`);
 115 |     });
 116 |     
 117 |     electronProcess.stderr.on('data', (data) => {
 118 |       process.stderr.write(`[ELECTRON] ${data}`);
 119 |     });
 120 |     
 121 |     // Handle process cleanup
 122 |     process.on('SIGINT', () => {
 123 |       console.log('\n🛑 Shutting down...');
 124 |       viteProcess.kill();
 125 |       electronProcess.kill();
 126 |       process.exit(0);
 127 |     });
 128 |     
 129 |     electronProcess.on('close', (code) => {
 130 |       console.log(`\n📱 Electron exited with code ${code}`);
 131 |       viteProcess.kill();
 132 |       process.exit(code);
 133 |     });
 134 |     
 135 |     viteProcess.on('close', (code) => {
 136 |       console.log(`\n📦 Vite exited with code ${code}`);
 137 |       electronProcess.kill();
 138 |       process.exit(code);
 139 |     });
 140 |     
 141 |   } catch (error) {
 142 |     console.error('❌ Error starting application:', error.message);
 143 |     process.exit(1);
 144 |   }
 145 | }
 146 | 
 147 | startApp();

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
   2 | import React from 'react';
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
  16 |     toggleOverlayVisibility,
  17 |     saveToStorage,
  18 |   } = useTimerStore();
  19 | 
  20 |   const { formattedTime1, formattedTime2, isRunning } = useTimer();
  21 | 
  22 |   const handleToggleOverlay = async () => {
  23 |     if (!window.electronAPI) return;
  24 | 
  25 |     try {
  26 |       if (isOverlayVisible) {
  27 |         await window.electronAPI.overlay.hide();
  28 |         setOverlayVisible(false);
  29 |       } else {
  30 |         await window.electronAPI.overlay.show();
  31 |         setOverlayVisible(true);
  32 |       }
  33 |       saveToStorage();
  34 |     } catch (error) {
  35 |       console.error('Failed to toggle overlay:', error);
  36 |     }
  37 |   };
  38 | 
  39 |   return (
  40 |     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  41 |       <div className="space-y-6">
  42 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  43 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
  44 |             Timer Control
  45 |           </h2>
  46 |           
  47 |           <div className="mb-6">
  48 |             <div className="grid grid-cols-2 gap-4 mb-4">
  49 |               <div className="text-center">
  50 |                 <div className="text-sm text-gray-400 mb-1">
  51 |                   {timerData.player1Name}
  52 |                 </div>
  53 |                 <div className={`text-2xl font-mono font-bold ${
  54 |                   timerData.currentTimer === 1 && isRunning 
  55 |                     ? 'text-primary-400 timer-glow' 
  56 |                     : 'text-white'
  57 |                 }`}>
  58 |                   {formattedTime1}
  59 |                 </div>
  60 |               </div>
  61 |               
  62 |               <div className="text-center">
  63 |                 <div className="text-sm text-gray-400 mb-1">
  64 |                   {timerData.player2Name}
  65 |                 </div>
  66 |                 <div className={`text-2xl font-mono font-bold ${
  67 |                   timerData.currentTimer === 2 && isRunning 
  68 |                     ? 'text-primary-400 timer-glow' 
  69 |                     : 'text-white'
  70 |                 }`}>
  71 |                   {formattedTime2}
  72 |                 </div>
  73 |               </div>
  74 |             </div>
  75 |             
  76 |             <div className="text-center text-lg font-semibold">
  77 |               Score: {timerData.player1Score} - {timerData.player2Score}
  78 |             </div>
  79 |           </div>
  80 |           
  81 |           <TimerControls />
  82 |         </div>
  83 | 
  84 |         <PlayerSettings />
  85 |       </div>
  86 | 
  87 |       <div className="space-y-6">
  88 |         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
  89 |           <h2 className="text-xl font-semibold text-primary-400 mb-4">
  90 |             Overlay Control
  91 |           </h2>
  92 |           
  93 |           <div className="space-y-4">
  94 |             <button
  95 |               onClick={handleToggleOverlay}
  96 |               className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
  97 |                 isOverlayVisible
  98 |                   ? 'bg-success-600 hover:bg-success-700 text-white'
  99 |                   : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
 100 |               }`}
 101 |             >
 102 |               {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
 103 |             </button>
 104 |             
 105 |             <div className="text-sm text-gray-400">
 106 |               Status: {isOverlayVisible ? 'Visible' : 'Hidden'}
 107 |             </div>
 108 |           </div>
 109 |         </div>
 110 | 
 111 |         <OverlaySettings />
 112 |         <HotkeySettings />
 113 |       </div>
 114 |     </div>
 115 |   );
 116 | };
 117 | 
 118 | export default ControlPanel;

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
   5 |   const { updateTimerData, updateOverlaySettings, saveToStorage } = useTimerStore();
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
  28 |   }, [updateTimerData, updateOverlaySettings]);
  29 | 
  30 |   const saveToElectronStore = async () => {
  31 |     if (!window.electronAPI) return;
  32 | 
  33 |     try {
  34 |       const { timerData, overlaySettings } = useTimerStore.getState();
  35 |       await window.electronAPI.store.set('timerData', timerData);
  36 |       await window.electronAPI.store.set('overlaySettings', overlaySettings);
  37 |       
  38 |       console.log('Data saved to electron store');
  39 |     } catch (error) {
  40 |       console.warn('Failed to save data to electron store:', error);
  41 |     }
  42 |   };
  43 | 
  44 |   useEffect(() => {
  45 |     const store = useTimerStore.getState();
  46 |     const unsubscribe = useTimerStore.subscribe((state) => {
  47 |       if (state !== store) {
  48 |         saveToElectronStore();
  49 |       }
  50 |     });
  51 | 
  52 |     return unsubscribe;
  53 |   }, []);
  54 | 
  55 |   return { saveToElectronStore };
  56 | };
  57 | 
  58 | export default useElectronStore;

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
  20 |   const syncToOverlay = useCallback((data: any) => {
  21 |     if (window.electronAPI) {
  22 |       window.electronAPI.timer.updateDisplay(data);
  23 |     }
  24 |   }, []);
  25 | 
  26 |   useEffect(() => {
  27 |     if (!timer1Ref.current) {
  28 |       timer1Ref.current = new PreciseTimer((value) => {
  29 |         setTimerValue(1, value);
  30 |         const formatted = formatTime(value);
  31 |         setFormattedTime1(formatted);
  32 |         
  33 |         syncToOverlay({
  34 |           timer1: formatted,
  35 |           timer2: formatTime(timerData.timer2Value),
  36 |           currentTimer: timerData.currentTimer,
  37 |           isRunning: timerData.isRunning,
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
  48 |         syncToOverlay({
  49 |           timer1: formatTime(timerData.timer1Value),
  50 |           timer2: formatted,
  51 |           currentTimer: timerData.currentTimer,
  52 |           isRunning: timerData.isRunning,
  53 |         });
  54 |       });
  55 |     }
  56 | 
  57 |     return () => {
  58 |       timer1Ref.current?.stop();
  59 |       timer2Ref.current?.stop();
  60 |     };
  61 |   }, [setTimerValue, syncToOverlay]);
  62 | 
  63 |   useEffect(() => {
  64 |     setFormattedTime1(formatTime(timerData.timer1Value));
  65 |     setFormattedTime2(formatTime(timerData.timer2Value));
  66 |   }, [timerData.timer1Value, timerData.timer2Value]);
  67 | 
  68 |   const startTimer = useCallback(() => {
  69 |     const currentTimer = timerData.currentTimer;
  70 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
  71 |     const initialValue = currentTimer === 1 ? timerData.timer1Value : timerData.timer2Value;
  72 | 
  73 |     if (timerRef && !timerRef.running) {
  74 |       timerRef.start(initialValue);
  75 |       setTimerRunning(true);
  76 |     }
  77 |   }, [timerData.currentTimer, timerData.timer1Value, timerData.timer2Value, setTimerRunning]);
  78 | 
  79 |   const pauseTimer = useCallback(() => {
  80 |     const currentTimer = timerData.currentTimer;
  81 |     const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
  82 | 
  83 |     if (timerRef && timerRef.running) {
  84 |       const finalValue = timerRef.pause();
  85 |       setTimerValue(currentTimer, finalValue);
  86 |       setTimerRunning(false);
  87 |     }
  88 |   }, [timerData.currentTimer, setTimerValue, setTimerRunning]);
  89 | 
  90 |   const swapTimer = useCallback(() => {
  91 |     if (timerData.isRunning) {
  92 |       pauseTimer();
  93 |     }
  94 |     
  95 |     const newTimer = timerData.currentTimer === 1 ? 2 : 1;
  96 |     setCurrentTimer(newTimer);
  97 | 
  98 |     if (window.electronAPI) {
  99 |       window.electronAPI.timer.syncData({
 100 |         ...timerData,
 101 |         currentTimer: newTimer,
 102 |         isRunning: false,
 103 |       });
 104 |     }
 105 |   }, [timerData, pauseTimer, setCurrentTimer]);
 106 | 
 107 |   const resetCurrentTimer = useCallback(() => {
 108 |     if (timerData.isRunning) {
 109 |       pauseTimer();
 110 |     }
 111 |     
 112 |     resetTimer();
 113 |     
 114 |     const timerRef = timerData.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 115 |     timerRef?.reset();
 116 |   }, [timerData.isRunning, timerData.currentTimer, pauseTimer, resetTimer]);
 117 | 
 118 |   const resetAllTimers = useCallback(() => {
 119 |     timer1Ref.current?.reset();
 120 |     timer2Ref.current?.reset();
 121 |     setTimerRunning(false);
 122 |   }, [setTimerRunning]);
 123 | 
 124 |   return {
 125 |     formattedTime1,
 126 |     formattedTime2,
 127 |     isRunning: timerData.isRunning,
 128 |     currentTimer: timerData.currentTimer,
 129 |     startTimer,
 130 |     pauseTimer,
 131 |     swapTimer,
 132 |     resetCurrentTimer,
 133 |     resetAllTimers,
 134 |   };
 135 | };
 136 | 
 137 | export default useTimer;

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
  31 | }
  32 | 
  33 | export const useTimerStore = create<TimerStore>((set, get) => ({
  34 |   timerData: { ...DEFAULT_TIMER_DATA },
  35 |   overlaySettings: { ...DEFAULT_OVERLAY_SETTINGS },
  36 |   isOverlayVisible: false,
  37 |   
  38 |   updateTimerData: (data) => 
  39 |     set((state) => ({
  40 |       timerData: { ...state.timerData, ...data }
  41 |     })),
  42 |   
  43 |   updatePlayerName: (player, name) =>
  44 |     set((state) => ({
  45 |       timerData: {
  46 |         ...state.timerData,
  47 |         [player === 1 ? 'player1Name' : 'player2Name']: name
  48 |       }
  49 |     })),
  50 |   
  51 |   updatePlayerScore: (player, delta) =>
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
  62 |     }),
  63 |   
  64 |   setTimerValue: (timer, value) =>
  65 |     set((state) => ({
  66 |       timerData: {
  67 |         ...state.timerData,
  68 |         [timer === 1 ? 'timer1Value' : 'timer2Value']: Math.max(0, value)
  69 |       }
  70 |     })),
  71 |   
  72 |   setCurrentTimer: (timer) =>
  73 |     set((state) => ({
  74 |       timerData: { ...state.timerData, currentTimer: timer }
  75 |     })),
  76 |   
  77 |   setTimerRunning: (running) =>
  78 |     set((state) => ({
  79 |       timerData: { ...state.timerData, isRunning: running }
  80 |     })),
  81 |   
  82 |   swapTimer: () =>
  83 |     set((state) => ({
  84 |       timerData: {
  85 |         ...state.timerData,
  86 |         currentTimer: state.timerData.currentTimer === 1 ? 2 : 1,
  87 |         isRunning: false
  88 |       }
  89 |     })),
  90 |   
  91 |   resetTimer: (timer) =>
  92 |     set((state) => {
  93 |       if (timer) {
  94 |         return {
  95 |           timerData: {
  96 |             ...state.timerData,
  97 |             [timer === 1 ? 'timer1Value' : 'timer2Value']: 0,
  98 |             isRunning: false
  99 |           }
 100 |         };
 101 |       } else {
 102 |         return {
 103 |           timerData: {
 104 |             ...state.timerData,
 105 |             [state.timerData.currentTimer === 1 ? 'timer1Value' : 'timer2Value']: 0,
 106 |             isRunning: false
 107 |           }
 108 |         };
 109 |       }
 110 |     }),
 111 |   
 112 |   resetAllTimers: () =>
 113 |     set((state) => ({
 114 |       timerData: {
 115 |         ...state.timerData,
 116 |         timer1Value: 0,
 117 |         timer2Value: 0,
 118 |         player1Score: 0,
 119 |         player2Score: 0,
 120 |         currentTimer: 1,
 121 |         isRunning: false
 122 |       }
 123 |     })),
 124 |   
 125 |   updateHotkeys: (hotkeys) =>
 126 |     set((state) => ({
 127 |       timerData: {
 128 |         ...state.timerData,
 129 |         ...(hotkeys.start && { startHotkey: hotkeys.start }),
 130 |         ...(hotkeys.swap && { swapHotkey: hotkeys.swap })
 131 |       }
 132 |     })),
 133 |   
 134 |   updateStyle: (style) =>
 135 |     set((state) => ({
 136 |       timerData: { ...state.timerData, style }
 137 |     })),
 138 |   
 139 |   updateOverlaySettings: (settings) =>
 140 |     set((state) => ({
 141 |       overlaySettings: { ...state.overlaySettings, ...settings }
 142 |     })),
 143 |   
 144 |   toggleOverlayVisibility: () =>
 145 |     set((state) => ({
 146 |       isOverlayVisible: !state.isOverlayVisible
 147 |     })),
 148 |   
 149 |   setOverlayVisible: (visible) =>
 150 |     set({ isOverlayVisible: visible }),
 151 |   
 152 |   toggleOverlayLock: () =>
 153 |     set((state) => ({
 154 |       overlaySettings: {
 155 |         ...state.overlaySettings,
 156 |         locked: !state.overlaySettings.locked
 157 |       }
 158 |     })),
 159 |   
 160 |   updateOverlayScale: (scale) =>
 161 |     set((state) => ({
 162 |       overlaySettings: { ...state.overlaySettings, scale }
 163 |     })),
 164 |   
 165 |   updateOverlayPosition: (x, y) =>
 166 |     set((state) => ({
 167 |       overlaySettings: { ...state.overlaySettings, x, y }
 168 |     })),
 169 |   
 170 |   loadFromStorage: () => {
 171 |     if (typeof window === 'undefined') return;
 172 |     
 173 |     try {
 174 |       const savedData = localStorage.getItem('dbd-timer-data');
 175 |       const savedSettings = localStorage.getItem('dbd-overlay-settings');
 176 |       
 177 |       if (savedData) {
 178 |         const timerData = JSON.parse(savedData);
 179 |         set((state) => ({
 180 |           timerData: { ...state.timerData, ...timerData }
 181 |         }));
 182 |       }
 183 |       
 184 |       if (savedSettings) {
 185 |         const overlaySettings = JSON.parse(savedSettings);
 186 |         set((state) => ({
 187 |           overlaySettings: { ...state.overlaySettings, ...overlaySettings }
 188 |         }));
 189 |       }
 190 |     } catch (error) {
 191 |       console.warn('Failed to load data from storage:', error);
 192 |     }
 193 |   },
 194 |   
 195 |   saveToStorage: () => {
 196 |     if (typeof window === 'undefined') return;
 197 |     
 198 |     try {
 199 |       const { timerData, overlaySettings } = get();
 200 |       localStorage.setItem('dbd-timer-data', JSON.stringify(timerData));
 201 |       localStorage.setItem('dbd-overlay-settings', JSON.stringify(overlaySettings));
 202 |     } catch (error) {
 203 |       console.warn('Failed to save data to storage:', error);
 204 |     }
 205 |   }
 206 | }));

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
  14 |           if (process.env.NODE_ENV === 'development') {
  15 |             options.startup()
  16 |           }
  17 |         },
  18 |         vite: {
  19 |           build: {
  20 |             sourcemap: process.env.NODE_ENV === 'development',
  21 |             minify: process.env.NODE_ENV !== 'development',
  22 |             outDir: 'dist-electron',
  23 |             rollupOptions: {
  24 |               external: ['electron']
  25 |             }
  26 |           }
  27 |         }
  28 |       },
  29 |       {
  30 |         entry: 'electron/preload.ts',
  31 |         onstart(options) {
  32 |           options.reload()
  33 |         },
  34 |         vite: {
  35 |           build: {
  36 |             sourcemap: process.env.NODE_ENV === 'development',
  37 |             minify: process.env.NODE_ENV !== 'development',
  38 |             outDir: 'dist-electron',
  39 |             rollupOptions: {
  40 |               external: ['electron']
  41 |             }
  42 |           }
  43 |         }
  44 |       }
  45 |     ]),
  46 |     renderer()
  47 |   ],
  48 |   resolve: {
  49 |     alias: {
  50 |       '@': resolve(__dirname, 'src'),
  51 |       '@/components': resolve(__dirname, 'src/components'),
  52 |       '@/stores': resolve(__dirname, 'src/stores'),
  53 |       '@/types': resolve(__dirname, 'src/types'),
  54 |       '@/utils': resolve(__dirname, 'src/utils')
  55 |     }
  56 |   },
  57 |   base: './',
  58 |   build: {
  59 |     outDir: 'dist',
  60 |     assetsDir: 'assets',
  61 |     emptyOutDir: true,
  62 |     rollupOptions: {
  63 |       input: {
  64 |         main: resolve(__dirname, 'index.html'),
  65 |         overlay: resolve(__dirname, 'overlay.html')
  66 |       }
  67 |     }
  68 |   },
  69 |   server: {
  70 |     port: 5173
  71 |   }
  72 | })

```