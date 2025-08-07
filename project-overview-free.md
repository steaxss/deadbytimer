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
│   │       ├── TimerOverlay.tsx
│   │       └── styles
│   │           └── DefaultStyle.tsx
│   ├── hooks
│   │   ├── useGlobalHotkeys.ts
│   │   └── useTimer.ts
│   ├── index.css
│   ├── main.tsx
│   ├── overlay.tsx
│   ├── store
│   │   └── timerStore.ts
│   ├── types
│   │   ├── global.d.ts
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
   1 | // electron/main.cjs
   2 | const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
   3 | const { join } = require('path');
   4 | const Store = require('electron-store');
   5 | 
   6 | class TimerOverlayApp {
   7 |   constructor() {
   8 |     this.mainWindow = null;
   9 |     this.overlayWindow = null;
  10 |     this.store = new Store();
  11 |     this.isDev = process.env.NODE_ENV === 'development';
  12 |     this.isOverlayBeingCreated = false;
  13 |     this.initializeApp();
  14 |   }
  15 | 
  16 |   initializeApp() {
  17 |     app.whenReady().then(() => {
  18 |       this.createMainWindow();
  19 |       this.setupIPC();
  20 |       this.setupGlobalShortcuts();
  21 |     });
  22 | 
  23 |     app.on('window-all-closed', () => {
  24 |       globalShortcut.unregisterAll();
  25 |       app.quit();
  26 |     });
  27 | 
  28 |     app.on('activate', () => {
  29 |       if (BrowserWindow.getAllWindows().length === 0) {
  30 |         this.createMainWindow();
  31 |       }
  32 |     });
  33 | 
  34 |     app.on('before-quit', () => {
  35 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
  36 |         const bounds = this.overlayWindow.getBounds();
  37 |         this.store.set('overlaySettings.x', bounds.x);
  38 |         this.store.set('overlaySettings.y', bounds.y);
  39 |       }
  40 |     });
  41 |   }
  42 | 
  43 |   createMainWindow() {
  44 |     const savedState = this.store.get('windowState') || {};
  45 | 
  46 |     this.mainWindow = new BrowserWindow({
  47 |       width: savedState.width || 900,
  48 |       height: savedState.height || 700,
  49 |       x: savedState.x,
  50 |       y: savedState.y,
  51 |       minWidth: 600,
  52 |       minHeight: 400,
  53 |       show: false,
  54 |       autoHideMenuBar: true,
  55 |       icon: this.isDev ? null : join(__dirname, '../assets/icon.ico'),
  56 |       webPreferences: {
  57 |         nodeIntegration: false,
  58 |         contextIsolation: true,
  59 |         preload: join(__dirname, 'preload.cjs'),
  60 |         webSecurity: false
  61 |       }
  62 |     });
  63 | 
  64 |     if (this.isDev) {
  65 |       this.mainWindow.loadURL('http://localhost:5173');
  66 |       this.mainWindow.webContents.openDevTools({ mode: 'detach' });
  67 |     } else {
  68 |       this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  69 |     }
  70 | 
  71 |     this.mainWindow.once('ready-to-show', () => {
  72 |       this.mainWindow.show();
  73 |       this.mainWindow.focus();
  74 |     });
  75 | 
  76 |     this.mainWindow.on('close', () => {
  77 |       const bounds = this.mainWindow.getBounds();
  78 |       if (bounds && !this.mainWindow.isMaximized() && !this.mainWindow.isMinimized()) {
  79 |         this.store.set('windowState', bounds);
  80 |       }
  81 |     });
  82 | 
  83 |     this.mainWindow.on('closed', () => {
  84 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
  85 |         this.overlayWindow.close();
  86 |       }
  87 |       this.mainWindow = null;
  88 |     });
  89 |   }
  90 | 
  91 |   createOverlayWindow() {
  92 |     if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
  93 |       this.overlayWindow.show();
  94 |       this.overlayWindow.focus();
  95 |       return;
  96 |     }
  97 | 
  98 |     if (this.isOverlayBeingCreated) {
  99 |       return;
 100 |     }
 101 | 
 102 |     this.isOverlayBeingCreated = true;
 103 | 
 104 |     try {
 105 |       const overlaySettings = this.store.get('overlaySettings', {
 106 |         x: 100,
 107 |         y: 100,
 108 |         scale: 100,
 109 |         locked: false,
 110 |         alwaysOnTop: true
 111 |       });
 112 | 
 113 |       const { width, height } = screen.getPrimaryDisplay().workAreaSize;
 114 |       const dragHandleHeight = overlaySettings.locked ? 0 : 30;
 115 |       const overlayWidth = Math.ceil(520 * (overlaySettings.scale || 100) / 100);
 116 |       const overlayHeight = Math.ceil((120 + dragHandleHeight) * (overlaySettings.scale || 100) / 100);
 117 | 
 118 |       let x = overlaySettings.x || Math.floor((width - overlayWidth) / 2);
 119 |       let y = overlaySettings.y || Math.floor(height * 0.1);
 120 | 
 121 |       if (x < 0 || x > width - overlayWidth) x = Math.floor((width - overlayWidth) / 2);
 122 |       if (y < 0 || y > height - overlayHeight) y = Math.floor(height * 0.1);
 123 | 
 124 |       this.overlayWindow = new BrowserWindow({
 125 |         width: overlayWidth,
 126 |         height: overlayHeight,
 127 |         x: x,
 128 |         y: y,
 129 |         frame: false,
 130 |         transparent: true,
 131 |         alwaysOnTop: overlaySettings.alwaysOnTop !== false,
 132 |         skipTaskbar: overlaySettings.locked === true,
 133 |         resizable: false,
 134 |         minimizable: !overlaySettings.locked,
 135 |         maximizable: false,
 136 |         focusable: !overlaySettings.locked,
 137 |         show: false,
 138 |         titleBarStyle: 'hidden',
 139 |         backgroundColor: 'transparent',
 140 |         webPreferences: {
 141 |           nodeIntegration: false,
 142 |           contextIsolation: true,
 143 |           preload: join(__dirname, 'preload.cjs'),
 144 |           webSecurity: false,
 145 |           backgroundThrottling: false
 146 |         }
 147 |       });
 148 | 
 149 |       if (overlaySettings.locked) {
 150 |         this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
 151 |       }
 152 | 
 153 |       const overlayUrl = this.isDev 
 154 |         ? 'http://localhost:5173/overlay.html' 
 155 |         : join(__dirname, '../dist/overlay.html');
 156 | 
 157 |       if (this.isDev) {
 158 |         this.overlayWindow.loadURL(overlayUrl);
 159 |       } else {
 160 |         this.overlayWindow.loadFile(overlayUrl);
 161 |       }
 162 | 
 163 |       this.overlayWindow.webContents.on('did-finish-load', () => {
 164 |         this.overlayWindow.show();
 165 |         
 166 |         if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 167 |           this.mainWindow.webContents.send('overlay-ready', true);
 168 |         }
 169 |         
 170 |         const timerData = this.store.get('timerData');
 171 |         if (timerData && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 172 |           setTimeout(() => {
 173 |             this.overlayWindow.webContents.send('timer-data-sync', timerData);
 174 |           }, 100);
 175 |         }
 176 | 
 177 |         this.isOverlayBeingCreated = false;
 178 |       });
 179 | 
 180 |       this.overlayWindow.on('closed', () => {
 181 |         this.overlayWindow = null;
 182 |         this.isOverlayBeingCreated = false;
 183 |         
 184 |         if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 185 |           this.mainWindow.webContents.send('overlay-ready', false);
 186 |         }
 187 |       });
 188 | 
 189 |       this.overlayWindow.on('move', () => {
 190 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 191 |           const bounds = this.overlayWindow.getBounds();
 192 |           if (bounds) {
 193 |             this.store.set('overlaySettings.x', bounds.x);
 194 |             this.store.set('overlaySettings.y', bounds.y);
 195 |           }
 196 |         }
 197 |       });
 198 | 
 199 |       this.overlayWindow.on('resize', () => {
 200 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 201 |           const bounds = this.overlayWindow.getBounds();
 202 |           if (bounds) {
 203 |             this.store.set('overlaySettings.width', bounds.width);
 204 |             this.store.set('overlaySettings.height', bounds.height);
 205 |           }
 206 |         }
 207 |       });
 208 | 
 209 |     } catch (error) {
 210 |       console.error('Error creating overlay window:', error);
 211 |       this.isOverlayBeingCreated = false;
 212 |     }
 213 |   }
 214 | 
 215 |   setupIPC() {
 216 |     ipcMain.handle('store-get', (_, key) => {
 217 |       try {
 218 |         return this.store.get(key);
 219 |       } catch (error) {
 220 |         console.error('Store get error:', error);
 221 |         return null;
 222 |       }
 223 |     });
 224 |     
 225 |     ipcMain.handle('store-set', (_, key, value) => {
 226 |       try {
 227 |         this.store.set(key, value);
 228 |         
 229 |         if (key === 'timerData' && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 230 |           this.overlayWindow.webContents.send('timer-data-sync', value);
 231 |         }
 232 |         
 233 |         return true;
 234 |       } catch (error) {
 235 |         console.error('Store set error:', error);
 236 |         return false;
 237 |       }
 238 |     });
 239 | 
 240 |     ipcMain.handle('overlay-show', async () => {
 241 |       try {
 242 |         this.createOverlayWindow();
 243 |         return { success: true };
 244 |       } catch (error) {
 245 |         console.error('Error showing overlay:', error);
 246 |         return { success: false, error: error.message };
 247 |       }
 248 |     });
 249 | 
 250 |     ipcMain.handle('overlay-hide', async () => {
 251 |       try {
 252 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 253 |           this.overlayWindow.close();
 254 |           this.overlayWindow = null;
 255 |         }
 256 |         return { success: true };
 257 |       } catch (error) {
 258 |         console.error('Error hiding overlay:', error);
 259 |         return { success: false, error: error.message };
 260 |       }
 261 |     });
 262 | 
 263 |     ipcMain.handle('overlay-settings-update', async (_, settings) => {
 264 |       if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return;
 265 | 
 266 |       try {
 267 |         if (settings.locked !== undefined) {
 268 |           const newDragHandleHeight = settings.locked ? 0 : 30;
 269 |           const newOverlayHeight = Math.ceil((120 + newDragHandleHeight) * (settings.scale || this.store.get('overlaySettings.scale') || 100) / 100);
 270 |           
 271 |           this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 272 |           this.overlayWindow.setFocusable(!settings.locked);
 273 |           this.overlayWindow.setSkipTaskbar(settings.locked);
 274 |           this.overlayWindow.setMinimizable(!settings.locked);
 275 |           this.overlayWindow.setSize(this.overlayWindow.getBounds().width, newOverlayHeight);
 276 |         }
 277 | 
 278 |         if (settings.scale !== undefined) {
 279 |           const currentSettings = this.store.get('overlaySettings', {});
 280 |           const dragHandleHeight = currentSettings.locked ? 0 : 30;
 281 |           const newWidth = Math.ceil(520 * settings.scale / 100);
 282 |           const newHeight = Math.ceil((120 + dragHandleHeight) * settings.scale / 100);
 283 |           this.overlayWindow.setSize(newWidth, newHeight);
 284 |         }
 285 | 
 286 |         if (settings.alwaysOnTop !== undefined) {
 287 |           this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 288 |         }
 289 | 
 290 |         if (settings.x !== undefined || settings.y !== undefined) {
 291 |           const currentBounds = this.overlayWindow.getBounds();
 292 |           this.overlayWindow.setPosition(
 293 |             settings.x !== undefined ? settings.x : currentBounds.x,
 294 |             settings.y !== undefined ? settings.y : currentBounds.y
 295 |           );
 296 |         }
 297 | 
 298 |         if (settings.scale !== undefined) {
 299 |           this.overlayWindow.webContents.send('overlay-scale-change', settings.scale);
 300 |         }
 301 | 
 302 |         this.store.set('overlaySettings', {
 303 |           ...this.store.get('overlaySettings', {}),
 304 |           ...settings
 305 |         });
 306 | 
 307 |         return { success: true };
 308 |       } catch (error) {
 309 |         console.error('Error updating overlay settings:', error);
 310 |         return { success: false, error: error.message };
 311 |       }
 312 |     });
 313 | 
 314 |     ipcMain.handle('timer-data-sync', async (_, data) => {
 315 |       try {
 316 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 317 |           this.overlayWindow.webContents.send('timer-data-sync', data);
 318 |         }
 319 |         this.store.set('timerData', data);
 320 |         return { success: true };
 321 |       } catch (error) {
 322 |         console.error('Error syncing timer data:', error);
 323 |         return { success: false, error: error.message };
 324 |       }
 325 |     });
 326 | 
 327 |     ipcMain.handle('overlay-style-change', async (_, style) => {
 328 |       try {
 329 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 330 |           this.overlayWindow.webContents.send('overlay-style-change', style);
 331 |         }
 332 |         return { success: true };
 333 |       } catch (error) {
 334 |         console.error('Error changing overlay style:', error);
 335 |         return { success: false, error: error.message };
 336 |       }
 337 |     });
 338 |   }
 339 | 
 340 |   setupGlobalShortcuts() {
 341 |     const registerShortcut = (key, action) => {
 342 |       try {
 343 |         const success = globalShortcut.register(key, () => {
 344 |           if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 345 |             this.mainWindow.webContents.send('hotkey-pressed', action);
 346 |           }
 347 |         });
 348 |         
 349 |         if (!success) {
 350 |           console.warn(`Failed to register shortcut: ${key}`);
 351 |         }
 352 |       } catch (error) {
 353 |         console.warn(`Error registering shortcut ${key}:`, error);
 354 |       }
 355 |     };
 356 | 
 357 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 358 |       start: 'F1',
 359 |       swap: 'F2'
 360 |     });
 361 | 
 362 |     registerShortcut(savedHotkeys.start, 'start');
 363 |     registerShortcut(savedHotkeys.swap, 'swap');
 364 | 
 365 |     ipcMain.handle('hotkey-register', async (_, hotkeys) => {
 366 |       try {
 367 |         globalShortcut.unregisterAll();
 368 |         registerShortcut(hotkeys.start, 'start');
 369 |         registerShortcut(hotkeys.swap, 'swap');
 370 |         this.store.set('timerData.hotkeys', hotkeys);
 371 |         return { success: true };
 372 |       } catch (error) {
 373 |         console.error('Error registering hotkeys:', error);
 374 |         return { success: false, error: error.message };
 375 |       }
 376 |     });
 377 |   }
 378 | }
 379 | 
 380 | new TimerOverlayApp();

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
   5 | 
   6 | const App: React.FC = () => {
   7 |   const { loadFromStorage } = useTimerStore();
   8 |   const [isInitialized, setIsInitialized] = useState(false);
   9 | 
  10 |   useGlobalHotkeys();
  11 | 
  12 |   useEffect(() => {
  13 |     const initializeApp = async () => {
  14 |       try {
  15 |         await loadFromStorage();
  16 |         setIsInitialized(true);
  17 |         console.log('App initialized successfully');
  18 |       } catch (error) {
  19 |         console.error('Failed to initialize app:', error);
  20 |         setIsInitialized(true);
  21 |       }
  22 |     };
  23 | 
  24 |     initializeApp();
  25 |   }, [loadFromStorage]);
  26 | 
  27 |   if (!isInitialized) {
  28 |     return (
  29 |       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  30 |         <div className="text-white text-lg">Loading...</div>
  31 |       </div>
  32 |     );
  33 |   }
  34 | 
  35 |   return (
  36 |     <div className="min-h-screen bg-gray-900 text-white">
  37 |       <div className="container mx-auto p-6">
  38 |         <header className="text-center mb-8">
  39 |           <h1 className="text-4xl font-bold text-primary-400 mb-2">
  40 |             DBD Timer Overlay
  41 |           </h1>
  42 |           <p className="text-gray-400">
  43 |             Professional timer overlay for Dead by Daylight 1v1 matches
  44 |           </p>
  45 |         </header>
  46 | 
  47 |         <main>
  48 |           <ControlPanel />
  49 |         </main>
  50 | 
  51 |         <footer className="text-center mt-8 text-gray-500 text-sm">
  52 |           <p>Press your configured hotkeys to control timers globally</p>
  53 |         </footer>
  54 |       </div>
  55 |     </div>
  56 |   );
  57 | };
  58 | 
  59 | export default App;

```

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | // src/components/ControlPanel.tsx
   2 | import React, { useEffect, useState } from 'react';
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
  20 |   const [activeTab, setActiveTab] = useState<'timer' | 'players' | 'overlay' | 'hotkeys'>('timer');
  21 | 
  22 |   useEffect(() => {
  23 |     const interval = setInterval(() => {
  24 |       saveToStorage();
  25 |     }, 5000);
  26 | 
  27 |     return () => clearInterval(interval);
  28 |   }, [saveToStorage]);
  29 | 
  30 |   const tabs = [
  31 |     { id: 'timer' as const, name: 'Timer Controls', icon: '⏱️' },
  32 |     { id: 'players' as const, name: 'Players', icon: '👥' },
  33 |     { id: 'overlay' as const, name: 'Overlay', icon: '🎨' },
  34 |     { id: 'hotkeys' as const, name: 'Hotkeys', icon: '⌨️' },
  35 |   ];
  36 | 
  37 |   const renderTabContent = () => {
  38 |     switch (activeTab) {
  39 |       case 'timer':
  40 |         return <TimerControls />;
  41 |       case 'players':
  42 |         return <PlayerSettings />;
  43 |       case 'overlay':
  44 |         return <OverlaySettings />;
  45 |       case 'hotkeys':
  46 |         return <HotkeySettings />;
  47 |       default:
  48 |         return <TimerControls />;
  49 |     }
  50 |   };
  51 | 
  52 |   return (
  53 |     <div className="max-w-6xl mx-auto">
  54 |       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  55 |         <div className="lg:col-span-2">
  56 |           <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
  57 |             <div className="flex border-b border-gray-700">
  58 |               {tabs.map((tab) => (
  59 |                 <button
  60 |                   key={tab.id}
  61 |                   onClick={() => setActiveTab(tab.id)}
  62 |                   className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 ${
  63 |                     activeTab === tab.id
  64 |                       ? 'bg-primary-600 text-white border-b-2 border-primary-400'
  65 |                       : 'text-gray-300 hover:text-white hover:bg-gray-700'
  66 |                   }`}
  67 |                 >
  68 |                   <div className="flex items-center justify-center space-x-2">
  69 |                     <span className="text-lg">{tab.icon}</span>
  70 |                     <span className="hidden sm:inline">{tab.name}</span>
  71 |                   </div>
  72 |                 </button>
  73 |               ))}
  74 |             </div>
  75 | 
  76 |             <div className="p-6">
  77 |               {renderTabContent()}
  78 |             </div>
  79 |           </div>
  80 |         </div>
  81 | 
  82 |         <div className="space-y-6">
  83 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
  84 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
  85 |               <span className="mr-2">📊</span>
  86 |               Current Status
  87 |             </h3>
  88 |             
  89 |             <div className="space-y-4">
  90 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
  91 |                 <span className="text-gray-300">Active Timer</span>
  92 |                 <span className={`font-bold ${
  93 |                   timerData.currentTimer === 1 ? 'text-green-400' : 'text-blue-400'
  94 |                 }`}>
  95 |                   Player {timerData.currentTimer}
  96 |                 </span>
  97 |               </div>
  98 | 
  99 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 100 |                 <span className="text-gray-300">Timer Status</span>
 101 |                 <div className="flex items-center space-x-2">
 102 |                   <div className={`w-2 h-2 rounded-full ${
 103 |                     isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'
 104 |                   }`} />
 105 |                   <span className={`font-medium ${
 106 |                     isRunning ? 'text-green-400' : 'text-red-400'
 107 |                   }`}>
 108 |                     {isRunning ? 'Running' : 'Stopped'}
 109 |                   </span>
 110 |                 </div>
 111 |               </div>
 112 | 
 113 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 114 |                 <span className="text-gray-300">Overlay</span>
 115 |                 <div className="flex items-center space-x-2">
 116 |                   <div className={`w-2 h-2 rounded-full ${
 117 |                     isOverlayVisible ? 'bg-green-400' : 'bg-gray-400'
 118 |                   }`} />
 119 |                   <span className={`font-medium ${
 120 |                     isOverlayVisible ? 'text-green-400' : 'text-gray-400'
 121 |                   }`}>
 122 |                     {isOverlayVisible ? 'Visible' : 'Hidden'}
 123 |                   </span>
 124 |                 </div>
 125 |               </div>
 126 | 
 127 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 128 |                 <span className="text-gray-300">Position Lock</span>
 129 |                 <span className={`font-medium ${
 130 |                   overlaySettings.locked ? 'text-red-400' : 'text-green-400'
 131 |                 }`}>
 132 |                   {overlaySettings.locked ? 'Locked' : 'Unlocked'}
 133 |                 </span>
 134 |               </div>
 135 |             </div>
 136 |           </div>
 137 | 
 138 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
 139 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
 140 |               <span className="mr-2">⏰</span>
 141 |               Live Timers
 142 |             </h3>
 143 |             
 144 |             <div className="space-y-3">
 145 |               <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
 146 |                 timerData.currentTimer === 1 
 147 |                   ? 'border-green-400 bg-green-400/10' 
 148 |                   : 'border-gray-600 bg-gray-700'
 149 |               }`}>
 150 |                 <div className="flex justify-between items-center mb-2">
 151 |                   <span className="text-sm text-gray-300">{timerData.player1Name}</span>
 152 |                   <span className="text-lg font-bold text-green-400">
 153 |                     {timerData.player1Score}
 154 |                   </span>
 155 |                 </div>
 156 |                 <div className="text-2xl font-mono font-bold text-white">
 157 |                   {formattedTime1}
 158 |                 </div>
 159 |               </div>
 160 | 
 161 |               <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
 162 |                 timerData.currentTimer === 2 
 163 |                   ? 'border-blue-400 bg-blue-400/10' 
 164 |                   : 'border-gray-600 bg-gray-700'
 165 |               }`}>
 166 |                 <div className="flex justify-between items-center mb-2">
 167 |                   <span className="text-sm text-gray-300">{timerData.player2Name}</span>
 168 |                   <span className="text-lg font-bold text-blue-400">
 169 |                     {timerData.player2Score}
 170 |                   </span>
 171 |                 </div>
 172 |                 <div className="text-2xl font-mono font-bold text-white">
 173 |                   {formattedTime2}
 174 |                 </div>
 175 |               </div>
 176 |             </div>
 177 |           </div>
 178 | 
 179 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
 180 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
 181 |               <span className="mr-2">🔧</span>
 182 |               Quick Actions
 183 |             </h3>
 184 |             
 185 |             <div className="space-y-3">
 186 |               <button
 187 |                 onClick={() => setOverlayVisible(!isOverlayVisible)}
 188 |                 className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
 189 |                   isOverlayVisible
 190 |                     ? 'bg-red-600 hover:bg-red-700 text-white'
 191 |                     : 'bg-primary-600 hover:bg-primary-700 text-white'
 192 |                 }`}
 193 |               >
 194 |                 {isOverlayVisible ? '👁️ Hide Overlay' : '👁️ Show Overlay'}
 195 |               </button>
 196 | 
 197 |               <button
 198 |                 onClick={() => {
 199 |                   const { resetTimer } = useTimerStore.getState();
 200 |                   resetTimer();
 201 |                 }}
 202 |                 className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-all duration-200"
 203 |               >
 204 |                 🔄 Reset Timers
 205 |               </button>
 206 | 
 207 |               <button
 208 |                 onClick={() => {
 209 |                   const { setOverlaySettings } = useTimerStore.getState();
 210 |                   setOverlaySettings({ 
 211 |                     locked: !overlaySettings.locked 
 212 |                   });
 213 |                 }}
 214 |                 className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
 215 |                   overlaySettings.locked
 216 |                     ? 'bg-green-600 hover:bg-green-700 text-white'
 217 |                     : 'bg-orange-600 hover:bg-orange-700 text-white'
 218 |                 }`}
 219 |               >
 220 |                 {overlaySettings.locked ? '🔓 Unlock Position' : '🔒 Lock Position'}
 221 |               </button>
 222 |             </div>
 223 |           </div>
 224 |         </div>
 225 |       </div>
 226 |     </div>
 227 |   );
 228 | };
 229 | 
 230 | export default ControlPanel;

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
   5 | import useTimer from '../hooks/useTimer';
   6 | 
   7 | const OverlayApp: React.FC = () => {
   8 |   const { loadFromStorage, timerData, overlaySettings } = useTimerStore();
   9 |   const [isInitialized, setIsInitialized] = useState(false);
  10 |   
  11 |   useTimer();
  12 | 
  13 |   useEffect(() => {
  14 |     const initializeOverlay = async () => {
  15 |       try {
  16 |         await loadFromStorage();
  17 |         setIsInitialized(true);
  18 |         console.log('Overlay initialized successfully');
  19 |       } catch (error) {
  20 |         console.error('Failed to initialize overlay:', error);
  21 |         setIsInitialized(true);
  22 |       }
  23 |     };
  24 | 
  25 |     initializeOverlay();
  26 |   }, [loadFromStorage]);
  27 | 
  28 |   useEffect(() => {
  29 |     if (!window.electronAPI?.overlay) return;
  30 | 
  31 |     const cleanupDataSync = window.electronAPI.overlay.onDataSync((data) => {
  32 |       console.log('Received timer data sync:', data);
  33 |     });
  34 | 
  35 |     return cleanupDataSync;
  36 |   }, []);
  37 | 
  38 |   useEffect(() => {
  39 |     if (window.electronAPI?.overlay?.updateSettings) {
  40 |       window.electronAPI.overlay.updateSettings(overlaySettings);
  41 |     }
  42 |   }, [overlaySettings]);
  43 | 
  44 |   useEffect(() => {
  45 |     document.body.style.background = 'transparent';
  46 |     document.body.style.margin = '0';
  47 |     document.body.style.padding = '0';
  48 |     document.body.style.overflow = 'hidden';
  49 |     
  50 |     const htmlElement = document.documentElement;
  51 |     htmlElement.style.background = 'transparent';
  52 |     htmlElement.style.margin = '0';
  53 |     htmlElement.style.padding = '0';
  54 |     htmlElement.style.overflow = 'hidden';
  55 |   }, []);
  56 | 
  57 |   if (!isInitialized) {
  58 |     return null;
  59 |   }
  60 | 
  61 |   return (
  62 |     <div 
  63 |       className="w-full h-full"
  64 |       style={{ 
  65 |         background: 'transparent',
  66 |         margin: 0,
  67 |         padding: 0,
  68 |         overflow: 'hidden'
  69 |       }}
  70 |     >
  71 |       <TimerOverlay />
  72 |     </div>
  73 |   );
  74 | };
  75 | 
  76 | export default OverlayApp;

```

`dbdoverlaytools-free/src\components\OverlaySettings.tsx`:

```tsx
   1 | // src/components/OverlaySettings.tsx
   2 | import React from 'react';
   3 | import { useTimerStore } from '../store/timerStore';
   4 | 
   5 | const OverlaySettings: React.FC = () => {
   6 |   const {
   7 |     overlaySettings,
   8 |     isOverlayVisible,
   9 |     setOverlayVisible,
  10 |     setOverlaySettings
  11 |   } = useTimerStore();
  12 | 
  13 |   const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  14 |     const scale = parseInt(e.target.value);
  15 |     setOverlaySettings({ scale });
  16 |   };
  17 | 
  18 |   const handleLockToggle = () => {
  19 |     setOverlaySettings({ locked: !overlaySettings.locked });
  20 |   };
  21 | 
  22 |   const handleAlwaysOnTopToggle = () => {
  23 |     setOverlaySettings({ alwaysOnTop: !overlaySettings.alwaysOnTop });
  24 |   };
  25 | 
  26 |   return (
  27 |     <div className="space-y-6">
  28 |       <div className="flex items-center justify-between">
  29 |         <h3 className="text-xl font-semibold text-white">Overlay Settings</h3>
  30 |         <button
  31 |           onClick={() => setOverlayVisible(!isOverlayVisible)}
  32 |           className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
  33 |             isOverlayVisible
  34 |               ? 'bg-red-600 hover:bg-red-700 text-white'
  35 |               : 'bg-primary-600 hover:bg-primary-700 text-white'
  36 |           }`}
  37 |         >
  38 |           {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
  39 |         </button>
  40 |       </div>
  41 | 
  42 |       <div className="bg-gray-800 rounded-lg p-6 space-y-6">
  43 |         <div>
  44 |           <div className="flex items-center justify-between mb-3">
  45 |             <label className="text-white font-medium">Scale</label>
  46 |             <span className="text-primary-400 font-mono">{overlaySettings.scale}%</span>
  47 |           </div>
  48 |           <input
  49 |             type="range"
  50 |             min="50"
  51 |             max="200"
  52 |             step="10"
  53 |             value={overlaySettings.scale}
  54 |             onChange={handleScaleChange}
  55 |             className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
  56 |           />
  57 |           <div className="flex justify-between text-xs text-gray-400 mt-1">
  58 |             <span>50%</span>
  59 |             <span>100%</span>
  60 |             <span>200%</span>
  61 |           </div>
  62 |         </div>
  63 | 
  64 |         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  65 |           <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
  66 |             <div>
  67 |               <div className="text-white font-medium">Lock Position</div>
  68 |               <div className="text-sm text-gray-400">
  69 |                 {overlaySettings.locked ? 'Overlay is click-through' : 'Overlay can be dragged'}
  70 |               </div>
  71 |             </div>
  72 |             <button
  73 |               onClick={handleLockToggle}
  74 |               className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
  75 |                 overlaySettings.locked ? 'bg-primary-600' : 'bg-gray-600'
  76 |               }`}
  77 |             >
  78 |               <div
  79 |                 className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
  80 |                   overlaySettings.locked ? 'translate-x-6' : 'translate-x-0.5'
  81 |                 }`}
  82 |               />
  83 |             </button>
  84 |           </div>
  85 | 
  86 |           <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
  87 |             <div>
  88 |               <div className="text-white font-medium">Always on Top</div>
  89 |               <div className="text-sm text-gray-400">
  90 |                 {overlaySettings.alwaysOnTop ? 'Overlay stays above other windows' : 'Normal window behavior'}
  91 |               </div>
  92 |             </div>
  93 |             <button
  94 |               onClick={handleAlwaysOnTopToggle}
  95 |               className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
  96 |                 overlaySettings.alwaysOnTop ? 'bg-primary-600' : 'bg-gray-600'
  97 |               }`}
  98 |             >
  99 |               <div
 100 |                 className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
 101 |                   overlaySettings.alwaysOnTop ? 'translate-x-6' : 'translate-x-0.5'
 102 |                 }`}
 103 |               />
 104 |             </button>
 105 |           </div>
 106 |         </div>
 107 | 
 108 |         <div className="bg-gray-700 rounded-lg p-4">
 109 |           <div className="flex items-center gap-2 mb-2">
 110 |             <div className={`w-3 h-3 rounded-full ${overlaySettings.locked ? 'bg-red-500' : 'bg-green-500'}`} />
 111 |             <span className="text-white font-medium">
 112 |               {overlaySettings.locked ? 'Overlay Locked' : 'Overlay Unlocked'}
 113 |             </span>
 114 |           </div>
 115 |           <p className="text-sm text-gray-400">
 116 |             {overlaySettings.locked
 117 |               ? 'The overlay is now click-through and cannot be moved. Unlock to reposition.'
 118 |               : 'Drag the purple bar at the top of the overlay to reposition it.'}
 119 |           </p>
 120 |         </div>
 121 |       </div>
 122 |     </div>
 123 |   );
 124 | };
 125 | 
 126 | export default OverlaySettings;

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
   1 | // src/components/overlay/DragHandle.tsx
   2 | import React from 'react';
   3 | import { cn } from '../../utils/cn';
   4 | 
   5 | interface DragHandleProps {
   6 |   isVisible: boolean;
   7 |   className?: string;
   8 | }
   9 | 
  10 | const DragHandle: React.FC<DragHandleProps> = ({ isVisible, className }) => {
  11 |   return (
  12 |     <div
  13 |       className={cn(
  14 |         'absolute top-0 left-0 right-0 h-8 z-50 transition-all duration-300',
  15 |         'bg-gradient-to-r from-purple-500/20 via-purple-400/30 to-purple-500/20',
  16 |         'border-b-2 border-purple-400/40',
  17 |         'shadow-lg shadow-purple-500/30',
  18 |         'flex items-center justify-center',
  19 |         'select-none cursor-move',
  20 |         'animate-pulse-glow',
  21 |         isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
  22 |         className
  23 |       )}
  24 |       style={{
  25 |         WebkitAppRegion: 'drag'
  26 |       } as React.CSSProperties}
  27 |     >
  28 |       <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
  29 |         <div className="flex space-x-1">
  30 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
  31 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
  32 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
  33 |         </div>
  34 |         <span>Drag to Move</span>
  35 |         <div className="flex space-x-1">
  36 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
  37 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
  38 |           <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
  39 |         </div>
  40 |       </div>
  41 |     </div>
  42 |   );
  43 | };
  44 | 
  45 | export default DragHandle;

```

`dbdoverlaytools-free/src\components\overlay\TimerOverlay.tsx`:

```tsx
   1 | // src/components/overlay/TimerOverlay.tsx
   2 | import React from 'react';
   3 | import { useTimerStore } from '../../store/timerStore';
   4 | import DragHandle from './DragHandle';
   5 | import DefaultStyle from './styles/DefaultStyle';
   6 | import useTimer from '../../hooks/useTimer';
   7 | 
   8 | const TimerOverlay: React.FC = () => {
   9 |   const { timerData, overlaySettings } = useTimerStore();
  10 |   const { formattedTime1, formattedTime2 } = useTimer();
  11 | 
  12 |   const scaleFactor = overlaySettings.scale / 100;
  13 | 
  14 |   return (
  15 |     <div
  16 |       style={{
  17 |         width: '520px',
  18 |         height: overlaySettings.locked ? '120px' : '150px',
  19 |         transform: `scale(${scaleFactor})`,
  20 |         transformOrigin: 'top left',
  21 |         background: 'transparent',
  22 |         position: 'relative',
  23 |         userSelect: 'none',
  24 |         WebkitUserSelect: 'none'
  25 |       }}
  26 |     >
  27 |       <DragHandle isVisible={!overlaySettings.locked} />
  28 |       
  29 |       <div 
  30 |         style={{
  31 |           width: '520px',
  32 |           height: '120px',
  33 |           position: overlaySettings.locked ? 'static' : 'absolute',
  34 |           top: overlaySettings.locked ? '0px' : '30px',
  35 |           left: '0px',
  36 |           pointerEvents: overlaySettings.locked ? 'none' : 'auto'
  37 |         }}
  38 |       >
  39 |         <DefaultStyle
  40 |           player1Name={timerData.player1Name}
  41 |           player2Name={timerData.player2Name}
  42 |           player1Score={timerData.player1Score}
  43 |           player2Score={timerData.player2Score}
  44 |           timer1={formattedTime1}
  45 |           timer2={formattedTime2}
  46 |           currentTimer={timerData.currentTimer}
  47 |           isRunning={timerData.isRunning}
  48 |         />
  49 |       </div>
  50 |     </div>
  51 |   );
  52 | };
  53 | 
  54 | export default TimerOverlay;

```

`dbdoverlaytools-free/src\components\overlay\styles\DefaultStyle.tsx`:

```tsx
   1 | // src/components/overlay/styles/DefaultStyle.tsx
   2 | import React, { useEffect, useState } from 'react';
   3 | import { cn } from '../../../utils/cn';
   4 | 
   5 | interface DefaultStyleProps {
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
  16 | const DefaultStyle: React.FC<DefaultStyleProps> = ({
  17 |   player1Name,
  18 |   player2Name,
  19 |   player1Score,
  20 |   player2Score,
  21 |   timer1,
  22 |   timer2,
  23 |   currentTimer,
  24 |   isRunning
  25 | }) => {
  26 |   const [player1Scrolling, setPlayer1Scrolling] = useState(false);
  27 |   const [player2Scrolling, setPlayer2Scrolling] = useState(false);
  28 | 
  29 |   useEffect(() => {
  30 |     setPlayer1Scrolling(player1Name.length > 12);
  31 |     setPlayer2Scrolling(player2Name.length > 12);
  32 |   }, [player1Name, player2Name]);
  33 | 
  34 |   const formatTimerChars = (timeStr: string) => {
  35 |     const chars = timeStr.padStart(6, '0').split('');
  36 |     return {
  37 |       minutes: chars[0] || '0',
  38 |       colon: ':',
  39 |       seconds1: chars[2] || '0',
  40 |       seconds2: chars[3] || '0',
  41 |       dot: '.',
  42 |       tenths: chars[5] || '0'
  43 |     };
  44 |   };
  45 | 
  46 |   const timer1Chars = formatTimerChars(timer1);
  47 |   const timer2Chars = formatTimerChars(timer2);
  48 | 
  49 |   return (
  50 |     <div className="timer-overlay">
  51 |       <div className="name left">
  52 |         <span className={cn("name-scroll", player1Scrolling && "scrolling")}>
  53 |           {player1Name.toUpperCase()}
  54 |         </span>
  55 |       </div>
  56 |       
  57 |       <div className="score-value">
  58 |         {player1Score} – {player2Score}
  59 |       </div>
  60 |       
  61 |       <div className="name right">
  62 |         <span className={cn("name-scroll", player2Scrolling && "scrolling")}>
  63 |           {player2Name.toUpperCase()}
  64 |         </span>
  65 |       </div>
  66 |       
  67 |       <div className={cn("timer left", currentTimer === 1 && "active")}>
  68 |         <span className="timer-text">
  69 |           <span className="timer-char">{timer1Chars.minutes}</span>
  70 |           <span className="timer-char separator">{timer1Chars.colon}</span>
  71 |           <span className="timer-char">{timer1Chars.seconds1}</span>
  72 |           <span className="timer-char">{timer1Chars.seconds2}</span>
  73 |           <span className="timer-char separator">{timer1Chars.dot}</span>
  74 |           <span className="timer-char">{timer1Chars.tenths}</span>
  75 |         </span>
  76 |       </div>
  77 |       
  78 |       <div className={cn("timer right", currentTimer === 2 && "active")}>
  79 |         <span className="timer-text">
  80 |           <span className="timer-char">{timer2Chars.minutes}</span>
  81 |           <span className="timer-char separator">{timer2Chars.colon}</span>
  82 |           <span className="timer-char">{timer2Chars.seconds1}</span>
  83 |           <span className="timer-char">{timer2Chars.seconds2}</span>
  84 |           <span className="timer-char separator">{timer2Chars.dot}</span>
  85 |           <span className="timer-char">{timer2Chars.tenths}</span>
  86 |         </span>
  87 |       </div>
  88 |     </div>
  89 |   );
  90 | };
  91 | 
  92 | export default DefaultStyle;

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
  68 | 
  69 | @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
  70 | 
  71 | @font-face {
  72 |   font-family: 'SquareFont';
  73 |   src: url('../assets/fonts/square-font.ttf') format('truetype');
  74 |   font-weight: normal;
  75 |   font-style: normal;
  76 | }
  77 | 
  78 | /* Default overlay container */
  79 | .timer-overlay {
  80 |   display: grid;
  81 |   grid-template-columns: minmax(160px, 1fr) auto minmax(160px, 1fr);
  82 |   grid-template-rows: 50px 1fr;
  83 |   width: 520px;
  84 |   height: 120px;
  85 |   position: relative;
  86 |   font-family: 'Poppins', sans-serif;
  87 | }
  88 | 
  89 | /* Names and score styling */
  90 | .name,
  91 | .score-value {
  92 |   border-bottom: 1px solid rgba(255,255,255,0.32);
  93 |   background: linear-gradient(
  94 |     90deg,
  95 |     #4B4B4B 0%,
  96 |     #3A3A3A 50%,
  97 |     #3A3A3A 100%
  98 |   );
  99 |   display: flex;
 100 |   align-items: center;
 101 |   justify-content: center;
 102 |   font-family: "Poppins", sans-serif;
 103 |   font-size: 22px;
 104 |   font-weight: 500;
 105 |   color: #FFF;
 106 |   position: relative;
 107 |   overflow: hidden;
 108 | }
 109 | 
 110 | /* Scrolling text animation */
 111 | .name-scroll {
 112 |   display: inline-block;
 113 |   white-space: nowrap;
 114 |   padding: 0 15px;
 115 | }
 116 | 
 117 | .name-scroll.scrolling {
 118 |   animation: scroll-text 6s linear infinite;
 119 |   padding: 0 50px;
 120 | }
 121 | 
 122 | @keyframes scroll-text {
 123 |   0% {
 124 |     transform: translateX(80%);
 125 |   }
 126 |   100% {
 127 |     transform: translateX(-80%);
 128 |   }
 129 | }
 130 | 
 131 | /* Grid positioning */
 132 | .name.left {
 133 |   grid-row: 1;
 134 |   grid-column: 1;
 135 |   font-size: 24px;
 136 |   text-transform: uppercase;
 137 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
 138 | }
 139 | 
 140 | .score-value {
 141 |   grid-row: 1;
 142 |   grid-column: 2;
 143 |   font-size: 24px;
 144 |   background: linear-gradient(
 145 |     90deg,
 146 |     #274B90 0.06%,
 147 |     #09327E 40.01%,
 148 |     #04296F 79.97%
 149 |   );
 150 |   padding: 0 15px;
 151 |   text-transform: uppercase;
 152 |   min-width: 90px;
 153 |   max-width: 120px;
 154 | }
 155 | 
 156 | .name.right {
 157 |   font-size: 24px;
 158 |   grid-row: 1;
 159 |   grid-column: 3;
 160 |   text-transform: uppercase;
 161 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
 162 | }
 163 | 
 164 | /* Timer styling */
 165 | .timer {
 166 |   display: flex;
 167 |   align-items: center;
 168 |   justify-content: center;
 169 |   font-family: "SquareFont", "Consolas", "Monaco", "Courier New", monospace;
 170 |   font-size: 32px;
 171 |   font-weight: 400;
 172 |   text-shadow: 0 0 6px rgba(190,190,190,0.50);
 173 |   position: relative;
 174 |   height: 100%;
 175 |   text-align: center;
 176 |   min-width: 160px;
 177 | }
 178 | 
 179 | .timer-text {
 180 |   display: inline-flex;
 181 |   align-items: center;
 182 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 183 |   -webkit-background-clip: text;
 184 |   background-clip: text;
 185 |   -webkit-text-fill-color: transparent;
 186 | }
 187 | 
 188 | .timer-char {
 189 |   display: inline-block;
 190 |   width: 22px;
 191 |   text-align: center;
 192 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 193 |   -webkit-background-clip: text;
 194 |   background-clip: text;
 195 |   -webkit-text-fill-color: transparent;
 196 | }
 197 | 
 198 | .timer-char.separator {
 199 |   width: 11px;
 200 | }
 201 | 
 202 | /* Active timer indicator */
 203 | .timer.active::before {
 204 |   content: '';
 205 |   position: absolute;
 206 |   bottom: 0;
 207 |   left: 0;
 208 |   right: 0;
 209 |   height: 3px;
 210 |   background: linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%);
 211 |   animation: pulseBar 1s ease-in-out infinite;
 212 | }
 213 | 
 214 | @keyframes pulseBar {
 215 |   0%, 100% { opacity: 0.5; }
 216 |   50% { opacity: 1; }
 217 | }
 218 | 
 219 | .timer.left {
 220 |   grid-row: 2;
 221 |   grid-column: 1;
 222 | }
 223 | 
 224 | .timer.right {
 225 |   grid-row: 2;
 226 |   grid-column: 3;
 227 | }
 228 | 
 229 | /* Drag handle styles */
 230 | .drag-handle {
 231 |   -webkit-app-region: drag;
 232 |   cursor: move;
 233 | }
 234 | 
 235 | /* Custom slider styles */
 236 | .slider {
 237 |   -webkit-appearance: none;
 238 |   appearance: none;
 239 |   background: transparent;
 240 |   cursor: pointer;
 241 | }
 242 | 
 243 | .slider::-webkit-slider-track {
 244 |   background: #374151;
 245 |   height: 8px;
 246 |   border-radius: 4px;
 247 | }
 248 | 
 249 | .slider::-webkit-slider-thumb {
 250 |   -webkit-appearance: none;
 251 |   appearance: none;
 252 |   background: #8b5cf6;
 253 |   height: 20px;
 254 |   width: 20px;
 255 |   border-radius: 50%;
 256 |   cursor: pointer;
 257 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
 258 |   transition: all 0.2s ease;
 259 | }
 260 | 
 261 | .slider::-webkit-slider-thumb:hover {
 262 |   background: #7c3aed;
 263 |   box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
 264 |   transform: scale(1.1);
 265 | }
 266 | 
 267 | .slider::-moz-range-track {
 268 |   background: #374151;
 269 |   height: 8px;
 270 |   border-radius: 4px;
 271 |   border: none;
 272 | }
 273 | 
 274 | .slider::-moz-range-thumb {
 275 |   background: #8b5cf6;
 276 |   height: 20px;
 277 |   width: 20px;
 278 |   border-radius: 50%;
 279 |   cursor: pointer;
 280 |   border: none;
 281 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
 282 | }
 283 | 
 284 | /* Pulse glow animation */
 285 | @keyframes pulse-glow {
 286 |   0%, 100% {
 287 |     opacity: 0.6;
 288 |     box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
 289 |   }
 290 |   50% {
 291 |     opacity: 1;
 292 |     box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
 293 |   }
 294 | }
 295 | 
 296 | .animate-pulse-glow {
 297 |   animation: pulse-glow 2s ease-in-out infinite;
 298 | }
 299 | 
 300 | /* Global overlay styles */
 301 | .overlay-container {
 302 |   -webkit-user-select: none;
 303 |   user-select: none;
 304 |   -webkit-app-region: no-drag;
 305 | }

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
   1 | // src/store/timerStore.ts
   2 | import { create } from 'zustand';
   3 | import type { TimerData, OverlaySettings } from '../types';
   4 | 
   5 | interface TimerState {
   6 |   timerData: TimerData;
   7 |   overlaySettings: OverlaySettings;
   8 |   isOverlayVisible: boolean;
   9 |   
  10 |   setTimerData: (data: Partial<TimerData>) => void;
  11 |   setOverlaySettings: (settings: Partial<OverlaySettings>) => void;
  12 |   setOverlayVisible: (visible: boolean) => void;
  13 |   
  14 |   startTimer: () => void;
  15 |   pauseTimer: () => void;
  16 |   resetTimer: () => void;
  17 |   swapTimer: () => void;
  18 |   
  19 |   setTimerValue: (player: 1 | 2, value: number) => void;
  20 |   setTimerRunning: (running: boolean) => void;
  21 |   setCurrentTimer: (timer: 1 | 2) => void;
  22 |   
  23 |   updatePlayerScore: (player: 1 | 2, score: number) => void;
  24 |   updatePlayerName: (player: 1 | 2, name: string) => void;
  25 |   
  26 |   loadFromStorage: () => Promise<void>;
  27 |   saveToStorage: () => Promise<void>;
  28 | }
  29 | 
  30 | const defaultTimerData: TimerData = {
  31 |   player1Name: 'Player 1',
  32 |   player2Name: 'Player 2',
  33 |   player1Score: 0,
  34 |   player2Score: 0,
  35 |   timer1Value: 0,
  36 |   timer2Value: 0,
  37 |   currentTimer: 1,
  38 |   isRunning: false,
  39 |   startHotkey: 'F1',
  40 |   swapHotkey: 'F2'
  41 | };
  42 | 
  43 | const defaultOverlaySettings: OverlaySettings = {
  44 |   baseWidth: 520,
  45 |   baseHeight: 120,
  46 |   scale: 100,
  47 |   x: 100,
  48 |   y: 100,
  49 |   locked: false,
  50 |   alwaysOnTop: true
  51 | };
  52 | 
  53 | export const useTimerStore = create<TimerState>((set, get) => ({
  54 |   timerData: defaultTimerData,
  55 |   overlaySettings: defaultOverlaySettings,
  56 |   isOverlayVisible: false,
  57 | 
  58 |   setTimerData: (data) => {
  59 |     set((state) => ({
  60 |       timerData: { ...state.timerData, ...data }
  61 |     }));
  62 |     get().saveToStorage();
  63 |   },
  64 | 
  65 |   setOverlaySettings: (settings) => {
  66 |     set((state) => ({
  67 |       overlaySettings: { ...state.overlaySettings, ...settings }
  68 |     }));
  69 |     
  70 |     const { overlaySettings: newSettings } = get();
  71 |     
  72 |     if (window.electronAPI?.overlay?.updateSettings) {
  73 |       window.electronAPI.overlay.updateSettings(newSettings);
  74 |     }
  75 |     
  76 |     get().saveToStorage();
  77 |   },
  78 | 
  79 |   setOverlayVisible: async (visible) => {
  80 |     set({ isOverlayVisible: visible });
  81 |     
  82 |     if (window.electronAPI?.overlay) {
  83 |       try {
  84 |         if (visible) {
  85 |           await window.electronAPI.overlay.show();
  86 |         } else {
  87 |           await window.electronAPI.overlay.hide();
  88 |         }
  89 |       } catch (error) {
  90 |         console.error('Error toggling overlay:', error);
  91 |         set({ isOverlayVisible: !visible });
  92 |       }
  93 |     }
  94 |   },
  95 | 
  96 |   startTimer: () => {
  97 |     const { timerData } = get();
  98 |     set({
  99 |       timerData: { ...timerData, isRunning: !timerData.isRunning }
 100 |     });
 101 |     get().saveToStorage();
 102 |   },
 103 | 
 104 |   pauseTimer: () => {
 105 |     const { timerData } = get();
 106 |     set({
 107 |       timerData: { ...timerData, isRunning: false }
 108 |     });
 109 |     get().saveToStorage();
 110 |   },
 111 | 
 112 |   resetTimer: () => {
 113 |     const { timerData } = get();
 114 |     const resetData = {
 115 |       ...timerData,
 116 |       timer1Value: 0,
 117 |       timer2Value: 0,
 118 |       isRunning: false
 119 |     };
 120 |     set({ timerData: resetData });
 121 |     get().saveToStorage();
 122 |   },
 123 | 
 124 |   swapTimer: () => {
 125 |     const { timerData } = get();
 126 |     const newCurrentTimer = timerData.currentTimer === 1 ? 2 : 1;
 127 |     set({
 128 |       timerData: { ...timerData, currentTimer: newCurrentTimer }
 129 |     });
 130 |     get().saveToStorage();
 131 |   },
 132 | 
 133 |   setTimerValue: (player, value) => {
 134 |     const { timerData } = get();
 135 |     const valueKey = player === 1 ? 'timer1Value' : 'timer2Value';
 136 |     set({
 137 |       timerData: { ...timerData, [valueKey]: value }
 138 |     });
 139 |   },
 140 | 
 141 |   setTimerRunning: (running) => {
 142 |     const { timerData } = get();
 143 |     set({
 144 |       timerData: { ...timerData, isRunning: running }
 145 |     });
 146 |     get().saveToStorage();
 147 |   },
 148 | 
 149 |   setCurrentTimer: (timer) => {
 150 |     const { timerData } = get();
 151 |     set({
 152 |       timerData: { ...timerData, currentTimer: timer }
 153 |     });
 154 |     get().saveToStorage();
 155 |   },
 156 | 
 157 |   updatePlayerScore: (player, score) => {
 158 |     const { timerData } = get();
 159 |     const scoreKey = player === 1 ? 'player1Score' : 'player2Score';
 160 |     set({
 161 |       timerData: { ...timerData, [scoreKey]: score }
 162 |     });
 163 |     get().saveToStorage();
 164 |   },
 165 | 
 166 |   updatePlayerName: (player, name) => {
 167 |     const { timerData } = get();
 168 |     const nameKey = player === 1 ? 'player1Name' : 'player2Name';
 169 |     set({
 170 |       timerData: { ...timerData, [nameKey]: name }
 171 |     });
 172 |     get().saveToStorage();
 173 |   },
 174 | 
 175 |   loadFromStorage: async () => {
 176 |     try {
 177 |       if (!window.electronAPI?.store) return;
 178 | 
 179 |       const [storedTimerData, storedOverlaySettings] = await Promise.all([
 180 |         window.electronAPI.store.get('timerData'),
 181 |         window.electronAPI.store.get('overlaySettings')
 182 |       ]);
 183 | 
 184 |       set({
 185 |         timerData: storedTimerData ? { ...defaultTimerData, ...storedTimerData } : defaultTimerData,
 186 |         overlaySettings: storedOverlaySettings ? { ...defaultOverlaySettings, ...storedOverlaySettings } : defaultOverlaySettings
 187 |       });
 188 | 
 189 |       console.log('Timer store loaded from storage');
 190 |     } catch (error) {
 191 |       console.error('Error loading from storage:', error);
 192 |     }
 193 |   },
 194 | 
 195 |   saveToStorage: async () => {
 196 |     try {
 197 |       if (!window.electronAPI?.store) return;
 198 | 
 199 |       const { timerData, overlaySettings } = get();
 200 |       
 201 |       await Promise.all([
 202 |         window.electronAPI.store.set('timerData', timerData),
 203 |         window.electronAPI.store.set('overlaySettings', overlaySettings)
 204 |       ]);
 205 | 
 206 |       if (window.electronAPI.timer?.syncData) {
 207 |         window.electronAPI.timer.syncData(timerData);
 208 |       }
 209 |     } catch (error) {
 210 |       console.error('Error saving to storage:', error);
 211 |     }
 212 |   }
 213 | }));

```

`dbdoverlaytools-free/src\types\global.d.ts`:

```ts
   1 | import type { TimerData } from './index';
   2 | 
   3 | declare global {
   4 |   interface Window {
   5 |     electronAPI?: {
   6 |       store: {
   7 |         get: (key: string) => Promise<any>;
   8 |         set: (key: string, value: any) => Promise<void>;
   9 |       };
  10 |       overlay: {
  11 |         show: () => Promise<{ success: boolean; error?: string }>;
  12 |         hide: () => Promise<{ success: boolean; error?: string }>;
  13 |         updateSettings: (settings: any) => Promise<void>;
  14 |         styleChange: (style: any) => Promise<void>;
  15 |         onDataSync: (callback: (data: TimerData) => void) => () => void;
  16 |         onStyleChange: (callback: (style: any) => void) => () => void;
  17 |         onReady: (callback: (isReady: boolean) => void) => () => void;
  18 |       };
  19 |       timer: {
  20 |         syncData: (data: TimerData) => Promise<void>;
  21 |       };
  22 |       hotkeys: {
  23 |         register: (hotkeys: { start: string; swap: string }) => Promise<void>;
  24 |         onPressed: (callback: (action: string) => void) => () => void;
  25 |       };
  26 |       removeAllListeners: () => void;
  27 |     };
  28 |   }
  29 | }

```

`dbdoverlaytools-free/src\types\index.ts`:

```ts
   1 | // src/types/index.ts
   2 | export interface TimerData {
   3 |   player1Name: string;
   4 |   player2Name: string;
   5 |   player1Score: number;
   6 |   player2Score: number;
   7 |   timer1Value: number;
   8 |   timer2Value: number;
   9 |   currentTimer: 1 | 2;
  10 |   isRunning: boolean;
  11 |   startHotkey: string;
  12 |   swapHotkey: string;
  13 |   hotkeys?: {
  14 |     start: string;
  15 |     swap: string;
  16 |   };
  17 | }
  18 | 
  19 | export interface OverlaySettings {
  20 |   baseWidth: number;
  21 |   baseHeight: number;
  22 |   scale: number;
  23 |   x: number;
  24 |   y: number;
  25 |   locked: boolean;
  26 |   alwaysOnTop: boolean;
  27 |   width?: number;
  28 |   height?: number;
  29 | }
  30 | 
  31 | export interface TimerDisplayData {
  32 |   timer1: string;
  33 |   timer2: string;
  34 |   currentTimer: 1 | 2;
  35 |   running: boolean;
  36 | }
  37 | 
  38 | export interface AppState {
  39 |   timerData: TimerData;
  40 |   overlaySettings: OverlaySettings;
  41 |   isOverlayVisible: boolean;
  42 | }
  43 | 
  44 | export interface IPCResponse {
  45 |   success: boolean;
  46 |   error?: string;
  47 |   data?: any;
  48 | }
  49 | 
  50 | export interface ElectronAPI {
  51 |   store: {
  52 |     get: (key: string) => Promise<any>;
  53 |     set: (key: string, value: any) => Promise<void>;
  54 |   };
  55 |   
  56 |   overlay: {
  57 |     show: () => Promise<IPCResponse>;
  58 |     hide: () => Promise<IPCResponse>;
  59 |     updateSettings: (settings: Partial<OverlaySettings>) => Promise<IPCResponse>;
  60 |     
  61 |     onDataSync: (callback: (data: TimerData) => void) => () => void;
  62 |     onScaleChange: (callback: (scale: number) => void) => () => void;
  63 |     onReady: (callback: (isReady: boolean) => void) => () => void;
  64 |   };
  65 |   
  66 |   timer: {
  67 |     syncData: (data: TimerData) => Promise<IPCResponse>;
  68 |   };
  69 |   
  70 |   hotkeys: {
  71 |     register: (hotkeys: { start: string; swap: string }) => Promise<IPCResponse>;
  72 |     onPressed: (callback: (action: 'start' | 'swap') => void) => () => void;
  73 |   };
  74 |   
  75 |   removeAllListeners: () => void;
  76 | }
  77 | 
  78 | declare global {
  79 |   interface Window {
  80 |     electronAPI?: ElectronAPI;
  81 |   }
  82 | }

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
   1 | // tailwind.config.js
   2 | /** @type {import('tailwindcss').Config} */
   3 | export default {
   4 |   content: [
   5 |     "./index.html",
   6 |     "./overlay.html",
   7 |     "./src/**/*.{js,ts,jsx,tsx}",
   8 |   ],
   9 |   theme: {
  10 |     extend: {
  11 |       colors: {
  12 |         primary: {
  13 |           300: '#a855f7',
  14 |           400: '#9333ea',
  15 |           500: '#8b5cf6',
  16 |           600: '#7c3aed',
  17 |           700: '#6d28d9',
  18 |         },
  19 |         success: {
  20 |           400: '#10b981',
  21 |         },
  22 |         gray: {
  23 |           800: '#1f2937',
  24 |           900: '#111827',
  25 |         }
  26 |       },
  27 |       animation: {
  28 |         'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  29 |         'scrolling-text': 'scrolling-text 8s linear infinite',
  30 |       },
  31 |       keyframes: {
  32 |         'pulse-glow': {
  33 |           '0%, 100%': { 
  34 |             opacity: '0.6',
  35 |             boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
  36 |           },
  37 |           '50%': { 
  38 |             opacity: '1',
  39 |             boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
  40 |           }
  41 |         },
  42 |         'scrolling-text': {
  43 |           '0%': { transform: 'translateX(100%)' },
  44 |           '100%': { transform: 'translateX(-100%)' }
  45 |         }
  46 |       },
  47 |       fontFamily: {
  48 |         'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
  49 |       },
  50 |       backdropBlur: {
  51 |         'xs': '2px',
  52 |       }
  53 |     },
  54 |   },
  55 |   plugins: [],
  56 | }

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
  36 |     "vite.config.ts",
  37 |     "src/types/global.d.ts"
  38 |   ],
  39 |   "references": [{ "path": "./tsconfig.node.json" }]
  40 | }

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