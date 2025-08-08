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
   1 | const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
   2 | const { join } = require('path');
   3 | const Store = require('electron-store');
   4 | 
   5 | class TimerOverlayApp {
   6 |   constructor() {
   7 |     this.mainWindow = null;
   8 |     this.overlayWindow = null;
   9 |     this.store = new Store();
  10 |     this.isDev = process.env.NODE_ENV === 'development';
  11 |     this.isOverlayBeingCreated = false;
  12 |     this.overlayPosition = null;
  13 |     this.initializeApp();
  14 |   }
  15 | 
  16 |   initializeApp() {
  17 |     app.whenReady().then(() => {
  18 |       this.createMainWindow();
  19 |       this.setupIPC();
  20 |       this.setupGlobalShortcuts();
  21 |       
  22 |       if (this.isDev) {
  23 |         setTimeout(() => {
  24 |           this.createOverlayWindow();
  25 |         }, 2000);
  26 |       }
  27 |     });
  28 | 
  29 |     app.on('window-all-closed', () => {
  30 |       globalShortcut.unregisterAll();
  31 |       app.quit();
  32 |     });
  33 | 
  34 |     app.on('activate', () => {
  35 |       if (BrowserWindow.getAllWindows().length === 0) {
  36 |         this.createMainWindow();
  37 |       }
  38 |     });
  39 | 
  40 |     app.on('before-quit', () => {
  41 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
  42 |         const bounds = this.overlayWindow.getBounds();
  43 |         this.store.set('overlaySettings.x', bounds.x);
  44 |         this.store.set('overlaySettings.y', bounds.y);
  45 |       }
  46 |     });
  47 |   }
  48 | 
  49 |   createMainWindow() {
  50 |     const savedState = this.store.get('windowState') || {};
  51 | 
  52 |     this.mainWindow = new BrowserWindow({
  53 |       width: savedState.width || 900,
  54 |       height: savedState.height || 700,
  55 |       x: savedState.x,
  56 |       y: savedState.y,
  57 |       minWidth: 600,
  58 |       minHeight: 400,
  59 |       show: false,
  60 |       autoHideMenuBar: true,
  61 |       icon: this.isDev ? null : join(__dirname, '../assets/icon.ico'),
  62 |       webPreferences: {
  63 |         nodeIntegration: false,
  64 |         contextIsolation: true,
  65 |         preload: join(__dirname, 'preload.cjs'),
  66 |         webSecurity: false
  67 |       }
  68 |     });
  69 | 
  70 |     if (this.isDev) {
  71 |       this.mainWindow.loadURL('http://localhost:5173');
  72 |       this.mainWindow.webContents.openDevTools();
  73 |     } else {
  74 |       this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  75 |     }
  76 | 
  77 |     this.mainWindow.once('ready-to-show', () => {
  78 |       this.mainWindow.show();
  79 |       this.mainWindow.focus();
  80 |     });
  81 | 
  82 |     this.mainWindow.webContents.on('before-input-event', (event, input) => {
  83 |       if (input.control && input.shift && input.key.toLowerCase() === 'i') {
  84 |         this.mainWindow.webContents.openDevTools();
  85 |       }
  86 |     });
  87 | 
  88 |     this.mainWindow.on('close', () => {
  89 |       const bounds = this.mainWindow.getBounds();
  90 |       if (bounds && !this.mainWindow.isMaximized() && !this.mainWindow.isMinimized()) {
  91 |         this.store.set('windowState', bounds);
  92 |       }
  93 |     });
  94 | 
  95 |     this.mainWindow.on('closed', () => {
  96 |       if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
  97 |         this.overlayWindow.close();
  98 |       }
  99 |       this.mainWindow = null;
 100 |     });
 101 |   }
 102 | 
 103 |   createOverlayWindow() {
 104 |     if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 105 |       this.overlayWindow.show();
 106 |       this.overlayWindow.focus();
 107 |       return;
 108 |     }
 109 | 
 110 |     if (this.isOverlayBeingCreated) {
 111 |       return;
 112 |     }
 113 | 
 114 |     this.isOverlayBeingCreated = true;
 115 | 
 116 |     try {
 117 |       const overlaySettings = this.store.get('overlaySettings', {
 118 |         x: 100,
 119 |         y: 100,
 120 |         scale: 100,
 121 |         locked: false,
 122 |         alwaysOnTop: true
 123 |       });
 124 | 
 125 |       const { width, height } = screen.getPrimaryDisplay().workAreaSize;
 126 |       const dragHandleHeight = overlaySettings.locked ? 0 : 30;
 127 |       
 128 |       const overlayWidth = Math.ceil(520 * (overlaySettings.scale || 100) / 100);
 129 |       const overlayHeight = Math.ceil((120 + dragHandleHeight) * (overlaySettings.scale || 100) / 100);
 130 | 
 131 |       let x = overlaySettings.x || Math.floor((width - overlayWidth) / 2);
 132 |       let y = overlaySettings.y || Math.floor(height * 0.1);
 133 | 
 134 |       if (overlaySettings.locked && this.overlayPosition) {
 135 |         x = this.overlayPosition.x;
 136 |         y = this.overlayPosition.y;
 137 |       }
 138 | 
 139 |       if (x < 0 || x > width - overlayWidth) x = Math.floor((width - overlayWidth) / 2);
 140 |       if (y < 0 || y > height - overlayHeight) y = Math.floor(height * 0.1);
 141 | 
 142 |       this.overlayWindow = new BrowserWindow({
 143 |         width: overlayWidth,
 144 |         height: overlayHeight,
 145 |         x: x,
 146 |         y: y,
 147 |         frame: false,
 148 |         transparent: true,
 149 |         alwaysOnTop: overlaySettings.alwaysOnTop !== false,
 150 |         skipTaskbar: overlaySettings.locked === true,
 151 |         resizable: false,
 152 |         minimizable: !overlaySettings.locked,
 153 |         maximizable: false,
 154 |         focusable: !overlaySettings.locked,
 155 |         show: false,
 156 |         titleBarStyle: 'hidden',
 157 |         backgroundColor: '#00000000',
 158 |         webPreferences: {
 159 |           nodeIntegration: false,
 160 |           contextIsolation: true,
 161 |           preload: join(__dirname, 'preload.cjs'),
 162 |           webSecurity: false,
 163 |           backgroundThrottling: false,
 164 |           offscreen: false
 165 |         }
 166 |       });
 167 | 
 168 |       this.overlayWindow.setBackgroundColor('#00000000');
 169 | 
 170 |       if (overlaySettings.locked) {
 171 |         this.overlayWindow.setIgnoreMouseEvents(true, { forward: true });
 172 |       }
 173 | 
 174 |       this.overlayWindow.webContents.on('before-input-event', (event, input) => {
 175 |         if (input.control && input.shift && input.key.toLowerCase() === 'i') {
 176 |           this.overlayWindow.webContents.openDevTools({ mode: 'detach' });
 177 |         }
 178 |       });
 179 | 
 180 |       const overlayUrl = this.isDev 
 181 |         ? 'http://localhost:5173/overlay.html' 
 182 |         : join(__dirname, '../dist/overlay.html');
 183 | 
 184 |       if (this.isDev) {
 185 |         this.overlayWindow.loadURL(overlayUrl);
 186 |         setTimeout(() => {
 187 |           if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 188 |             this.overlayWindow.webContents.openDevTools({ mode: 'detach' });
 189 |           }
 190 |         }, 1000);
 191 |       } else {
 192 |         this.overlayWindow.loadFile(overlayUrl);
 193 |       }
 194 | 
 195 |       this.overlayWindow.webContents.on('did-finish-load', () => {
 196 |         this.overlayWindow.show();
 197 |         
 198 |         if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 199 |           this.mainWindow.webContents.send('overlay-ready', true);
 200 |         }
 201 |         
 202 |         const timerData = this.store.get('timerData');
 203 |         if (timerData && this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 204 |           setTimeout(() => {
 205 |             this.overlayWindow.webContents.send('timer-data-sync', timerData);
 206 |           }, 500);
 207 |         }
 208 | 
 209 |         this.isOverlayBeingCreated = false;
 210 |       });
 211 | 
 212 |       this.overlayWindow.on('closed', () => {
 213 |         this.overlayWindow = null;
 214 |         this.isOverlayBeingCreated = false;
 215 |         
 216 |         if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 217 |           this.mainWindow.webContents.send('overlay-ready', false);
 218 |         }
 219 |       });
 220 | 
 221 |       this.overlayWindow.on('move', () => {
 222 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 223 |           const bounds = this.overlayWindow.getBounds();
 224 |           if (bounds) {
 225 |             this.overlayPosition = { x: bounds.x, y: bounds.y };
 226 |             if (!this.store.get('overlaySettings.locked', false)) {
 227 |               this.store.set('overlaySettings.x', bounds.x);
 228 |               this.store.set('overlaySettings.y', bounds.y);
 229 |             }
 230 |           }
 231 |         }
 232 |       });
 233 | 
 234 |     } catch (error) {
 235 |       console.error('Error creating overlay window:', error);
 236 |       this.isOverlayBeingCreated = false;
 237 |     }
 238 |   }
 239 | 
 240 |   setupIPC() {
 241 |     ipcMain.handle('store-get', (_, key) => {
 242 |       try {
 243 |         return this.store.get(key);
 244 |       } catch (error) {
 245 |         console.error('Store get error:', error);
 246 |         return null;
 247 |       }
 248 |     });
 249 |     
 250 |     ipcMain.handle('store-set', (_, key, value) => {
 251 |       try {
 252 |         this.store.set(key, value);
 253 |         return true;
 254 |       } catch (error) {
 255 |         console.error('Store set error:', error);
 256 |         return false;
 257 |       }
 258 |     });
 259 | 
 260 |     ipcMain.handle('overlay-show', async () => {
 261 |       try {
 262 |         this.createOverlayWindow();
 263 |         return { success: true };
 264 |       } catch (error) {
 265 |         console.error('Error showing overlay:', error);
 266 |         return { success: false, error: error.message };
 267 |       }
 268 |     });
 269 | 
 270 |     ipcMain.handle('overlay-hide', async () => {
 271 |       try {
 272 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 273 |           this.overlayWindow.close();
 274 |           this.overlayWindow = null;
 275 |         }
 276 |         return { success: true };
 277 |       } catch (error) {
 278 |         console.error('Error hiding overlay:', error);
 279 |         return { success: false, error: error.message };
 280 |       }
 281 |     });
 282 | 
 283 |     ipcMain.handle('overlay-settings-update', async (_, settings) => {
 284 |       if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return { success: true };
 285 | 
 286 |       try {
 287 |         const currentSettings = this.store.get('overlaySettings', {});
 288 |         const newSettings = { ...currentSettings, ...settings };
 289 | 
 290 |         if (settings.locked !== undefined) {
 291 |           const wasPreviouslyLocked = currentSettings.locked;
 292 |           const newDragHandleHeight = settings.locked ? 0 : 30;
 293 |           const newOverlayHeight = Math.ceil((120 + newDragHandleHeight) * (newSettings.scale || 100) / 100);
 294 |           const newOverlayWidth = Math.ceil(520 * (newSettings.scale || 100) / 100);
 295 |           
 296 |           if (!wasPreviouslyLocked && settings.locked) {
 297 |             this.overlayPosition = this.overlayWindow.getBounds();
 298 |           }
 299 |           
 300 |           this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 301 |           this.overlayWindow.setFocusable(!settings.locked);
 302 |           this.overlayWindow.setSkipTaskbar(settings.locked);
 303 |           this.overlayWindow.setMinimizable(!settings.locked);
 304 |           this.overlayWindow.setSize(newOverlayWidth, newOverlayHeight);
 305 |           
 306 |           if (!settings.locked && this.overlayPosition) {
 307 |             this.overlayWindow.setPosition(this.overlayPosition.x, this.overlayPosition.y);
 308 |           }
 309 |         }
 310 | 
 311 |         if (settings.scale !== undefined) {
 312 |           const dragHandleHeight = newSettings.locked ? 0 : 30;
 313 |           const newWidth = Math.ceil(520 * settings.scale / 100);
 314 |           const newHeight = Math.ceil((120 + dragHandleHeight) * settings.scale / 100);
 315 |           this.overlayWindow.setSize(newWidth, newHeight);
 316 |         }
 317 | 
 318 |         if (settings.alwaysOnTop !== undefined) {
 319 |           this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 320 |         }
 321 | 
 322 |         if (settings.x !== undefined || settings.y !== undefined) {
 323 |           const currentBounds = this.overlayWindow.getBounds();
 324 |           this.overlayWindow.setPosition(
 325 |             settings.x !== undefined ? settings.x : currentBounds.x,
 326 |             settings.y !== undefined ? settings.y : currentBounds.y
 327 |           );
 328 |         }
 329 | 
 330 |         this.store.set('overlaySettings', newSettings);
 331 | 
 332 |         return { success: true };
 333 |       } catch (error) {
 334 |         console.error('Error updating overlay settings:', error);
 335 |         return { success: false, error: error.message };
 336 |       }
 337 |     });
 338 | 
 339 |     ipcMain.handle('timer-data-sync', async (_, data) => {
 340 |       try {
 341 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 342 |           this.overlayWindow.webContents.send('timer-data-sync', data);
 343 |         }
 344 |         this.store.set('timerData', data);
 345 |         return { success: true };
 346 |       } catch (error) {
 347 |         console.error('Error syncing timer data:', error);
 348 |         return { success: false, error: error.message };
 349 |       }
 350 |     });
 351 | 
 352 |     ipcMain.handle('overlay-style-change', async (_, style) => {
 353 |       try {
 354 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 355 |           this.overlayWindow.webContents.send('overlay-style-change', style);
 356 |         }
 357 |         return { success: true };
 358 |       } catch (error) {
 359 |         console.error('Error changing overlay style:', error);
 360 |         return { success: false, error: error.message };
 361 |       }
 362 |     });
 363 |   }
 364 | 
 365 |   setupGlobalShortcuts() {
 366 |     const registerShortcut = (key, action) => {
 367 |       try {
 368 |         const success = globalShortcut.register(key, () => {
 369 |           if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 370 |             this.mainWindow.webContents.send('hotkey-pressed', action);
 371 |           }
 372 |         });
 373 |         
 374 |         if (!success) {
 375 |           console.warn(`Failed to register shortcut: ${key}`);
 376 |         }
 377 |       } catch (error) {
 378 |         console.warn(`Error registering shortcut ${key}:`, error);
 379 |       }
 380 |     };
 381 | 
 382 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 383 |       start: 'F1',
 384 |       swap: 'F2'
 385 |     });
 386 | 
 387 |     registerShortcut(savedHotkeys.start, 'start');
 388 |     registerShortcut(savedHotkeys.swap, 'swap');
 389 | 
 390 |     ipcMain.handle('hotkey-register', async (_, hotkeys) => {
 391 |       try {
 392 |         globalShortcut.unregisterAll();
 393 |         registerShortcut(hotkeys.start, 'start');
 394 |         registerShortcut(hotkeys.swap, 'swap');
 395 |         this.store.set('timerData.hotkeys', hotkeys);
 396 |         return { success: true };
 397 |       } catch (error) {
 398 |         console.error('Error registering hotkeys:', error);
 399 |         return { success: false, error: error.message };
 400 |       }
 401 |     });
 402 |   }
 403 | }
 404 | 
 405 | new TimerOverlayApp();

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
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; connect-src 'self' http://localhost:* ws://localhost:*; font-src 'self' https://fonts.gstatic.com data:;" />
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
   2 | <html lang="en" style="background: transparent !important;">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; connect-src 'self' http://localhost:* ws://localhost:*; font-src 'self' https://fonts.gstatic.com data:;" />
   6 |     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   7 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   8 |     <title>DBD Timer Overlay</title>
   9 |     <style>
  10 |       html, body {
  11 |         margin: 0 !important;
  12 |         padding: 0 !important;
  13 |         background: transparent !important;
  14 |         overflow: hidden !important;
  15 |         user-select: none !important;
  16 |         width: 100% !important;
  17 |         height: 100% !important;
  18 |       }
  19 |       
  20 |       #overlay-root {
  21 |         background: transparent !important;
  22 |         margin: 0 !important;
  23 |         padding: 0 !important;
  24 |         width: 100% !important;
  25 |         height: 100% !important;
  26 |       }
  27 |     </style>
  28 |   </head>
  29 |   <body>
  30 |     <div id="overlay-root"></div>
  31 |     <script type="module" src="/src/overlay.tsx"></script>
  32 |   </body>
  33 | </html>

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
   1 | import React, { useEffect, useState } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | import TimerControls from './TimerControls';
   4 | import PlayerSettings from './PlayerSettings';
   5 | import OverlaySettings from './OverlaySettings';
   6 | import HotkeySettings from './HotkeySettings';
   7 | 
   8 | const ControlPanel: React.FC = () => {
   9 |   const {
  10 |     timerData,
  11 |     overlaySettings,
  12 |     isOverlayVisible,
  13 |     setOverlayVisible,
  14 |     setOverlaySettings,
  15 |     saveToStorage,
  16 |   } = useTimerStore();
  17 | 
  18 |   const [activeTab, setActiveTab] = useState<'timer' | 'players' | 'overlay' | 'hotkeys'>('timer');
  19 | 
  20 |   useEffect(() => {
  21 |     const interval = setInterval(() => {
  22 |       saveToStorage();
  23 |     }, 5000);
  24 | 
  25 |     return () => clearInterval(interval);
  26 |   }, [saveToStorage]);
  27 | 
  28 |   const handleLockToggle = () => {
  29 |     setOverlaySettings({ locked: !overlaySettings.locked });
  30 |   };
  31 | 
  32 |   const tabs = [
  33 |     { id: 'timer' as const, name: 'Timer Controls', icon: '⏱️' },
  34 |     { id: 'players' as const, name: 'Players', icon: '👥' },
  35 |     { id: 'overlay' as const, name: 'Overlay', icon: '🎨' },
  36 |     { id: 'hotkeys' as const, name: 'Hotkeys', icon: '⌨️' },
  37 |   ];
  38 | 
  39 |   const renderTabContent = () => {
  40 |     switch (activeTab) {
  41 |       case 'timer':
  42 |         return <TimerControls />;
  43 |       case 'players':
  44 |         return <PlayerSettings />;
  45 |       case 'overlay':
  46 |         return <OverlaySettings />;
  47 |       case 'hotkeys':
  48 |         return <HotkeySettings />;
  49 |       default:
  50 |         return <TimerControls />;
  51 |     }
  52 |   };
  53 | 
  54 |   return (
  55 |     <div className="max-w-6xl mx-auto">
  56 |       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  57 |         <div className="lg:col-span-2">
  58 |           <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
  59 |             <div className="flex border-b border-gray-700">
  60 |               {tabs.map((tab) => (
  61 |                 <button
  62 |                   key={tab.id}
  63 |                   onClick={() => setActiveTab(tab.id)}
  64 |                   className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 ${
  65 |                     activeTab === tab.id
  66 |                       ? 'bg-primary-600 text-white border-b-2 border-primary-400'
  67 |                       : 'text-gray-300 hover:text-white hover:bg-gray-700'
  68 |                   }`}
  69 |                 >
  70 |                   <div className="flex items-center justify-center space-x-2">
  71 |                     <span className="text-lg">{tab.icon}</span>
  72 |                     <span className="hidden sm:inline">{tab.name}</span>
  73 |                   </div>
  74 |                 </button>
  75 |               ))}
  76 |             </div>
  77 | 
  78 |             <div className="p-6">
  79 |               {renderTabContent()}
  80 |             </div>
  81 |           </div>
  82 |         </div>
  83 | 
  84 |         <div className="space-y-6">
  85 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
  86 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
  87 |               <span className="mr-2">📊</span>
  88 |               Current Status
  89 |             </h3>
  90 |             
  91 |             <div className="space-y-4">
  92 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
  93 |                 <span className="text-gray-300">Active Timer</span>
  94 |                 <span className={`font-bold ${
  95 |                   timerData.currentTimer === 1 ? 'text-green-400' : 'text-blue-400'
  96 |                 }`}>
  97 |                   {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
  98 |                 </span>
  99 |               </div>
 100 | 
 101 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 102 |                 <span className="text-gray-300">Timer Status</span>
 103 |                 <div className="flex items-center space-x-2">
 104 |                   <div className={`w-2 h-2 rounded-full ${
 105 |                     timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'
 106 |                   }`} />
 107 |                   <span className={`font-medium ${
 108 |                     timerData.isRunning ? 'text-green-400' : 'text-red-400'
 109 |                   }`}>
 110 |                     {timerData.isRunning ? 'Running' : 'Stopped'}
 111 |                   </span>
 112 |                 </div>
 113 |               </div>
 114 | 
 115 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 116 |                 <span className="text-gray-300">Overlay</span>
 117 |                 <div className="flex items-center space-x-2">
 118 |                   <div className={`w-2 h-2 rounded-full ${
 119 |                     isOverlayVisible ? 'bg-green-400' : 'bg-gray-400'
 120 |                   }`} />
 121 |                   <span className={`font-medium ${
 122 |                     isOverlayVisible ? 'text-green-400' : 'text-gray-400'
 123 |                   }`}>
 124 |                     {isOverlayVisible ? 'Visible' : 'Hidden'}
 125 |                   </span>
 126 |                 </div>
 127 |               </div>
 128 | 
 129 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 130 |                 <span className="text-gray-300">Position Lock</span>
 131 |                 <span className={`font-medium ${
 132 |                   overlaySettings.locked ? 'text-red-400' : 'text-green-400'
 133 |                 }`}>
 134 |                   {overlaySettings.locked ? 'Locked' : 'Unlocked'}
 135 |                 </span>
 136 |               </div>
 137 |             </div>
 138 |           </div>
 139 | 
 140 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
 141 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
 142 |               <span className="mr-2">🎯</span>
 143 |               Scores
 144 |             </h3>
 145 |             
 146 |             <div className="space-y-3">
 147 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 148 |                 <span className="text-gray-300">{timerData.player1Name}</span>
 149 |                 <span className="text-lg font-bold text-green-400">
 150 |                   {timerData.player1Score}
 151 |                 </span>
 152 |               </div>
 153 |               
 154 |               <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
 155 |                 <span className="text-gray-300">{timerData.player2Name}</span>
 156 |                 <span className="text-lg font-bold text-blue-400">
 157 |                   {timerData.player2Score}
 158 |                 </span>
 159 |               </div>
 160 |             </div>
 161 |           </div>
 162 | 
 163 |           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
 164 |             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
 165 |               <span className="mr-2">🔧</span>
 166 |               Quick Actions
 167 |             </h3>
 168 |             
 169 |             <div className="space-y-3">
 170 |               <button
 171 |                 onClick={() => setOverlayVisible(!isOverlayVisible)}
 172 |                 className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
 173 |                   isOverlayVisible
 174 |                     ? 'bg-red-600 hover:bg-red-700 text-white'
 175 |                     : 'bg-primary-600 hover:bg-primary-700 text-white'
 176 |                 }`}
 177 |               >
 178 |                 {isOverlayVisible ? '👁️ Hide Overlay' : '👁️ Show Overlay'}
 179 |               </button>
 180 | 
 181 |               <button
 182 |                 onClick={handleLockToggle}
 183 |                 disabled={!isOverlayVisible}
 184 |                 className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
 185 |                   !isOverlayVisible
 186 |                     ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
 187 |                     : overlaySettings.locked
 188 |                       ? 'bg-orange-600 hover:bg-orange-700 text-white'
 189 |                       : 'bg-green-600 hover:bg-green-700 text-white'
 190 |                 }`}
 191 |               >
 192 |                 {overlaySettings.locked ? '🔒 Unlock Position' : '🔓 Lock Position'}
 193 |               </button>
 194 |             </div>
 195 |           </div>
 196 |         </div>
 197 |       </div>
 198 |     </div>
 199 |   );
 200 | };
 201 | 
 202 | export default ControlPanel;

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
   1 | import React, { useEffect, useState, useRef } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | import TimerOverlay from './overlay/TimerOverlay';
   4 | import { PreciseTimer } from '../utils/timer';
   5 | 
   6 | const OverlayApp: React.FC = () => {
   7 |   const { 
   8 |     loadFromStorage, 
   9 |     timerData, 
  10 |     setTimerValue
  11 |   } = useTimerStore();
  12 |   const [isInitialized, setIsInitialized] = useState(false);
  13 |   const [localTimerData, setLocalTimerData] = useState(timerData);
  14 |   
  15 |   const timer1Ref = useRef<PreciseTimer | null>(null);
  16 |   const timer2Ref = useRef<PreciseTimer | null>(null);
  17 |   const lastStateRef = useRef({ 
  18 |     isRunning: false, 
  19 |     currentTimer: 1,
  20 |     timer1Value: 0,
  21 |     timer2Value: 0
  22 |   });
  23 |   const syncingRef = useRef(false);
  24 | 
  25 |   useEffect(() => {
  26 |     const initializeOverlay = async () => {
  27 |       try {
  28 |         await loadFromStorage();
  29 |         setIsInitialized(true);
  30 |         console.log('Overlay initialized successfully');
  31 |       } catch (error) {
  32 |         console.error('Failed to initialize overlay:', error);
  33 |         setIsInitialized(true);
  34 |       }
  35 |     };
  36 | 
  37 |     initializeOverlay();
  38 |   }, [loadFromStorage]);
  39 | 
  40 |   useEffect(() => {
  41 |     if (!timer1Ref.current) {
  42 |       timer1Ref.current = new PreciseTimer((value) => {
  43 |         if (!syncingRef.current) {
  44 |           setLocalTimerData(prev => ({ ...prev, timer1Value: value }));
  45 |         }
  46 |       });
  47 |     }
  48 | 
  49 |     if (!timer2Ref.current) {
  50 |       timer2Ref.current = new PreciseTimer((value) => {
  51 |         if (!syncingRef.current) {
  52 |           setLocalTimerData(prev => ({ ...prev, timer2Value: value }));
  53 |         }
  54 |       });
  55 |     }
  56 | 
  57 |     return () => {
  58 |       timer1Ref.current?.stop();
  59 |       timer2Ref.current?.stop();
  60 |     };
  61 |   }, []);
  62 | 
  63 |   useEffect(() => {
  64 |     if (!isInitialized) return;
  65 | 
  66 |     const lastState = lastStateRef.current;
  67 |     const currentState = {
  68 |       isRunning: localTimerData.isRunning,
  69 |       currentTimer: localTimerData.currentTimer,
  70 |       timer1Value: localTimerData.timer1Value,
  71 |       timer2Value: localTimerData.timer2Value
  72 |     };
  73 | 
  74 |     console.log('State change detected:', {
  75 |       lastState,
  76 |       currentState,
  77 |       stateChanges: {
  78 |         runningChanged: lastState.isRunning !== currentState.isRunning,
  79 |         timerChanged: lastState.currentTimer !== currentState.currentTimer,
  80 |         timer1ValueChanged: lastState.timer1Value !== currentState.timer1Value,
  81 |         timer2ValueChanged: lastState.timer2Value !== currentState.timer2Value
  82 |       }
  83 |     });
  84 | 
  85 |     // Handle timer swap AVANT tout le reste
  86 | if (lastState.currentTimer !== currentState.currentTimer) {
  87 |   console.log('SWAP DETECTED: from timer', lastState.currentTimer, 'to timer', currentState.currentTimer);
  88 | 
  89 |   if (timer1Ref.current?.running) {
  90 |     const finalValue1 = timer1Ref.current.pause();
  91 |     console.log('SWAP: Pausing timer 1 at value:', finalValue1);
  92 |     setTimerValue(1, finalValue1); // <<< ajout
  93 |   }
  94 |   if (timer2Ref.current?.running) {
  95 |     const finalValue2 = timer2Ref.current.pause();
  96 |     console.log('SWAP: Pausing timer 2 at value:', finalValue2);
  97 |     setTimerValue(2, finalValue2); // <<< ajout
  98 |   }
  99 | 
 100 |   console.log('SWAP: Timer', currentState.currentTimer, 'is now selected');
 101 | }
 102 | 
 103 |     // Handle running state changes
 104 |     if (lastState.isRunning !== currentState.isRunning) {
 105 |       if (currentState.isRunning) {
 106 |         // Démarrer SEULEMENT le timer actuel
 107 |         console.log('Starting timer', currentState.currentTimer);
 108 |         const timerRef = currentState.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
 109 |         const resumeValue = currentState.currentTimer === 1 ? currentState.timer1Value : currentState.timer2Value;
 110 |         
 111 |         // S'assurer que l'autre timer est arrêté
 112 |         const otherTimerRef = currentState.currentTimer === 1 ? timer2Ref.current : timer1Ref.current;
 113 |         if (otherTimerRef?.running) {
 114 |           console.log('Stopping other timer before starting current one');
 115 |           otherTimerRef.pause();
 116 |         }
 117 |         
 118 |         console.log('Resuming timer with value:', resumeValue);
 119 |         if (timerRef) {
 120 |           timerRef.start(resumeValue);
 121 |         }
 122 |       } else {
 123 |         // Pause TOUS les timers
 124 |         console.log('Pausing all timers');
 125 |         if (timer1Ref.current?.running) {
 126 |           const finalValue1 = timer1Ref.current.pause();
 127 |           console.log('Paused timer 1 at value:', finalValue1);
 128 |           setLocalTimerData(prev => ({ ...prev, timer1Value: finalValue1 }));
 129 |         }
 130 |         if (timer2Ref.current?.running) {
 131 |           const finalValue2 = timer2Ref.current.pause();
 132 |           console.log('Paused timer 2 at value:', finalValue2);
 133 |           setLocalTimerData(prev => ({ ...prev, timer2Value: finalValue2 }));
 134 |         }
 135 |       }
 136 |     }
 137 | 
 138 |     lastStateRef.current = currentState;
 139 |   }, [localTimerData, isInitialized]);
 140 | 
 141 |   useEffect(() => {
 142 |     if (!window.electronAPI?.overlay) return;
 143 | 
 144 |     const cleanupDataSync = window.electronAPI.overlay.onDataSync((data) => {
 145 |       console.log('Received timer data sync in overlay:', data);
 146 |       syncingRef.current = true;
 147 |       
 148 |       // Mettre à jour l'état local avec les nouvelles données
 149 |       setLocalTimerData(data);
 150 |       
 151 |       // Si les timers tournent, les arrêter d'abord
 152 |       if (timer1Ref.current?.running) {
 153 |         timer1Ref.current.stop();
 154 |       }
 155 |       if (timer2Ref.current?.running) {
 156 |         timer2Ref.current.stop();
 157 |       }
 158 |       
 159 |       setTimeout(() => {
 160 |         syncingRef.current = false;
 161 |       }, 100);
 162 |     });
 163 | 
 164 |     return cleanupDataSync;
 165 |   }, []);
 166 | 
 167 |   useEffect(() => {
 168 |     const forceTransparency = () => {
 169 |       const elements = [
 170 |         document.body,
 171 |         document.documentElement,
 172 |         document.getElementById('overlay-root')
 173 |       ].filter(Boolean);
 174 | 
 175 |       elements.forEach(el => {
 176 |         if (el) {
 177 |           el.style.background = 'transparent';
 178 |           el.style.backgroundColor = 'transparent';
 179 |           el.style.margin = '0';
 180 |           el.style.padding = '0';
 181 |           el.style.overflow = 'hidden';
 182 |           el.style.border = 'none';
 183 |           el.style.outline = 'none';
 184 |         }
 185 |       });
 186 |     };
 187 | 
 188 |     forceTransparency();
 189 |     const interval = setInterval(forceTransparency, 1000);
 190 | 
 191 |     return () => clearInterval(interval);
 192 |   }, []);
 193 | 
 194 |   if (!isInitialized) {
 195 |     return (
 196 |       <div style={{ 
 197 |         background: 'transparent', 
 198 |         color: 'white', 
 199 |         padding: '20px',
 200 |         fontFamily: 'monospace'
 201 |       }}>
 202 |         Loading overlay...
 203 |       </div>
 204 |     );
 205 |   }
 206 | 
 207 |   return (
 208 |     <div 
 209 |       className="w-full h-full"
 210 |       style={{ 
 211 |         background: 'transparent',
 212 |         backgroundColor: 'transparent',
 213 |         margin: 0,
 214 |         padding: 0,
 215 |         overflow: 'hidden',
 216 |         border: 'none',
 217 |         outline: 'none'
 218 |       }}
 219 |     >
 220 |       <TimerOverlay timerData={localTimerData} />
 221 |     </div>
 222 |   );
 223 | };
 224 | 
 225 | export default OverlayApp;

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
   1 | import React from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | 
   4 | const TimerControls: React.FC = () => {
   5 |   const {
   6 |     timerData,
   7 |     startTimer,
   8 |     pauseTimer,
   9 |     swapTimer,
  10 |     resetTimer,
  11 |     resetAllTimers,
  12 |     setCurrentTimer,
  13 |     saveToStorage
  14 |   } = useTimerStore();
  15 | 
  16 |   const handleStartPause = () => {
  17 |     if (timerData.isRunning) {
  18 |       pauseTimer();
  19 |     } else {
  20 |       startTimer();
  21 |     }
  22 |     setTimeout(() => saveToStorage(), 100);
  23 |   };
  24 | 
  25 |   const handleSwap = () => {
  26 |     // Juste swap, sans pause automatique
  27 |     swapTimer();
  28 |     setTimeout(() => saveToStorage(), 100);
  29 |   };
  30 | 
  31 |   const handleResetCurrent = () => {
  32 |     resetTimer();
  33 |     setTimeout(() => saveToStorage(), 100);
  34 |   };
  35 | 
  36 |   const handleResetAll = () => {
  37 |     resetAllTimers();
  38 |     setTimeout(() => saveToStorage(), 100);
  39 |   };
  40 | 
  41 |   const handleTimerSelect = (timer: 1 | 2) => {
  42 |     // Si on sélectionne le même timer, ne rien faire
  43 |     if (timerData.currentTimer === timer) {
  44 |       return;
  45 |     }
  46 |     
  47 |     // Changer de timer sans pause automatique
  48 |     setCurrentTimer(timer);
  49 |     setTimeout(() => saveToStorage(), 100);
  50 |   };
  51 | 
  52 |   return (
  53 |     <div className="space-y-6">
  54 |       <div className="text-center mb-6">
  55 |         <h3 className="text-xl font-semibold text-white mb-2">Timer Controls</h3>
  56 |         <p className="text-gray-400">All timer actions are displayed on the overlay</p>
  57 |       </div>
  58 | 
  59 |       <div className="grid grid-cols-2 gap-4">
  60 |         <button
  61 |           onClick={() => handleTimerSelect(1)}
  62 |           className={`py-3 px-4 rounded-md font-medium transition-colors ${
  63 |             timerData.currentTimer === 1
  64 |               ? 'bg-primary-600 text-white ring-2 ring-primary-400'
  65 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  66 |           }`}
  67 |         >
  68 |           Select {timerData.player1Name}
  69 |           {timerData.currentTimer === 1 && timerData.isRunning && (
  70 |             <div className="text-xs text-green-400 mt-1">● ACTIVE</div>
  71 |           )}
  72 |         </button>
  73 |         
  74 |         <button
  75 |           onClick={() => handleTimerSelect(2)}
  76 |           className={`py-3 px-4 rounded-md font-medium transition-colors ${
  77 |             timerData.currentTimer === 2
  78 |               ? 'bg-primary-600 text-white ring-2 ring-primary-400'
  79 |               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
  80 |           }`}
  81 |         >
  82 |           Select {timerData.player2Name}
  83 |           {timerData.currentTimer === 2 && timerData.isRunning && (
  84 |             <div className="text-xs text-green-400 mt-1">● ACTIVE</div>
  85 |           )}
  86 |         </button>
  87 |       </div>
  88 | 
  89 |       <div className="grid grid-cols-2 gap-4">
  90 |         <button
  91 |           onClick={handleStartPause}
  92 |           className={`py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
  93 |             timerData.isRunning
  94 |               ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30'
  95 |               : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30'
  96 |           }`}
  97 |         >
  98 |           {timerData.isRunning ? '⏸️ PAUSE' : '▶️ START'}
  99 |         </button>
 100 |         
 101 |         <button
 102 |           onClick={handleSwap}
 103 |           className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-blue-500/30"
 104 |         >
 105 |           🔄 SWAP
 106 |         </button>
 107 |       </div>
 108 | 
 109 |       <div className="grid grid-cols-2 gap-4">
 110 |         <button
 111 |           onClick={handleResetCurrent}
 112 |           className="py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
 113 |         >
 114 |           Reset Current
 115 |         </button>
 116 |         
 117 |         <button
 118 |           onClick={handleResetAll}
 119 |           className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors"
 120 |         >
 121 |           Reset All
 122 |         </button>
 123 |       </div>
 124 | 
 125 |       <div className="bg-gray-700 rounded-lg p-4 mt-6">
 126 |         <div className="flex items-center justify-between mb-2">
 127 |           <span className="text-white font-medium">Current Active Timer</span>
 128 |           <div className="flex items-center space-x-2">
 129 |             <div className={`w-3 h-3 rounded-full ${
 130 |               timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
 131 |             }`} />
 132 |             <span className={`font-medium ${
 133 |               timerData.isRunning ? 'text-green-400' : 'text-gray-400'
 134 |             }`}>
 135 |               {timerData.isRunning ? 'Running' : 'Stopped'}
 136 |             </span>
 137 |           </div>
 138 |         </div>
 139 |         <p className="text-center text-lg font-semibold text-primary-400">
 140 |           {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
 141 |         </p>
 142 |       </div>
 143 | 
 144 |       <div className="text-sm text-gray-400 text-center bg-gray-800 p-3 rounded-lg">
 145 |         <p>💡 Use your configured hotkeys to control timers globally:</p>
 146 |         <p><kbd className="bg-gray-700 px-2 py-1 rounded">{timerData.startHotkey}</kbd> Start/Pause • <kbd className="bg-gray-700 px-2 py-1 rounded">{timerData.swapHotkey}</kbd> Swap</p>
 147 |       </div>
 148 |     </div>
 149 |   );
 150 | };
 151 | 
 152 | export default TimerControls;

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
   1 | import React, { useEffect, useState } from 'react';
   2 | import { useTimerStore } from '../../store/timerStore';
   3 | import DragHandle from './DragHandle';
   4 | import DefaultStyle from './styles/DefaultStyle';
   5 | import { formatTime } from '../../utils/timer';
   6 | import type { TimerData } from '../../types';
   7 | 
   8 | interface TimerOverlayProps {
   9 |   timerData?: TimerData;
  10 | }
  11 | 
  12 | const TimerOverlay: React.FC<TimerOverlayProps> = ({ timerData: propTimerData }) => {
  13 |   const { timerData: storeTimerData, overlaySettings } = useTimerStore();
  14 |   const [formattedTime1, setFormattedTime1] = useState('0.00');
  15 |   const [formattedTime2, setFormattedTime2] = useState('0.00');
  16 | 
  17 |   const timerData = propTimerData || storeTimerData;
  18 | 
  19 |   useEffect(() => {
  20 |     setFormattedTime1(formatTime(timerData.timer1Value || 0));
  21 |     setFormattedTime2(formatTime(timerData.timer2Value || 0));
  22 |   }, [timerData.timer1Value, timerData.timer2Value]);
  23 | 
  24 |   const scaleFactor = overlaySettings.scale / 100;
  25 |   const dragHandleHeight = overlaySettings.locked ? 0 : 30;
  26 | 
  27 |   console.log('TimerOverlay render:', {
  28 |     currentTimer: timerData.currentTimer,
  29 |     isRunning: timerData.isRunning,
  30 |     timer1Value: timerData.timer1Value,
  31 |     timer2Value: timerData.timer2Value,
  32 |     formattedTime1,
  33 |     formattedTime2
  34 |   });
  35 | 
  36 |   return (
  37 |     <div
  38 |       style={{
  39 |         width: '520px',
  40 |         height: `${120 + dragHandleHeight}px`,
  41 |         transform: `scale(${scaleFactor})`,
  42 |         transformOrigin: 'top left',
  43 |         background: 'transparent',
  44 |         position: 'relative',
  45 |         userSelect: 'none',
  46 |         WebkitUserSelect: 'none',
  47 |         margin: 0,
  48 |         padding: 0,
  49 |         overflow: 'hidden'
  50 |       }}
  51 |     >
  52 |       <DragHandle 
  53 |         isVisible={!overlaySettings.locked} 
  54 |         className={overlaySettings.locked ? 'opacity-0 pointer-events-none h-0' : ''}
  55 |       />
  56 |       
  57 |       <div 
  58 |         style={{
  59 |           width: '520px',
  60 |           height: '120px',
  61 |           position: 'absolute',
  62 |           top: overlaySettings.locked ? '0px' : '30px',
  63 |           left: '0px',
  64 |           pointerEvents: overlaySettings.locked ? 'none' : 'auto',
  65 |           background: 'transparent',
  66 |           margin: 0,
  67 |           padding: 0
  68 |         }}
  69 |       >
  70 |         <DefaultStyle
  71 |           player1Name={timerData.player1Name}
  72 |           player2Name={timerData.player2Name}
  73 |           player1Score={timerData.player1Score}
  74 |           player2Score={timerData.player2Score}
  75 |           timer1={formattedTime1}
  76 |           timer2={formattedTime2}
  77 |           currentTimer={timerData.currentTimer}
  78 |           isRunning={timerData.isRunning}
  79 |         />
  80 |       </div>
  81 |     </div>
  82 |   );
  83 | };
  84 | 
  85 | export default TimerOverlay;

```

`dbdoverlaytools-free/src\components\overlay\styles\DefaultStyle.tsx`:

```tsx
   1 | import React, { useEffect, useState } from 'react';
   2 | import { cn } from '../../../utils/cn';
   3 | 
   4 | interface DefaultStyleProps {
   5 |   player1Name: string;
   6 |   player2Name: string;
   7 |   player1Score: number;
   8 |   player2Score: number;
   9 |   timer1: string;
  10 |   timer2: string;
  11 |   currentTimer: 1 | 2;
  12 |   isRunning: boolean;
  13 | }
  14 | 
  15 | const DefaultStyle: React.FC<DefaultStyleProps> = ({
  16 |   player1Name,
  17 |   player2Name,
  18 |   player1Score,
  19 |   player2Score,
  20 |   timer1,
  21 |   timer2,
  22 |   currentTimer,
  23 |   isRunning
  24 | }) => {
  25 |   const [player1Scrolling, setPlayer1Scrolling] = useState(false);
  26 |   const [player2Scrolling, setPlayer2Scrolling] = useState(false);
  27 | 
  28 |   useEffect(() => {
  29 |     setPlayer1Scrolling(player1Name.length > 12);
  30 |     setPlayer2Scrolling(player2Name.length > 12);
  31 |   }, [player1Name, player2Name]);
  32 | 
  33 |   const formatTimerChars = (timeStr: string) => {
  34 |     // Handle HH:MM:SS.HH format
  35 |     if (timeStr.includes(':') && timeStr.split(':').length === 3) {
  36 |       const [hoursPart, minutesPart, secondsCentiseconds] = timeStr.split(':');
  37 |       const [secondsPart, centiseconds] = secondsCentiseconds.split('.');
  38 |       
  39 |       return {
  40 |         hours: hoursPart || '00',
  41 |         colon1: ':',
  42 |         minutes: minutesPart || '00',
  43 |         colon2: ':',
  44 |         seconds1: secondsPart?.[0] || '0',
  45 |         seconds2: secondsPart?.[1] || '0',
  46 |         dot: '.',
  47 |         centis1: centiseconds?.[0] || '0',
  48 |         centis2: centiseconds?.[1] || '0',
  49 |         hasHours: true,
  50 |         hasMinutes: true,
  51 |         singleDigitSeconds: false
  52 |       };
  53 |     }
  54 |     // Handle M:SS.HH format
  55 |     else if (timeStr.includes(':') && timeStr.split(':').length === 2) {
  56 |       const [minutesPart, secondsCentiseconds] = timeStr.split(':');
  57 |       const [secondsPart, centiseconds] = secondsCentiseconds.split('.');
  58 |       
  59 |       return {
  60 |         minutes: minutesPart || '0',
  61 |         colon: ':',
  62 |         seconds1: secondsPart?.[0] || '0',
  63 |         seconds2: secondsPart?.[1] || '0',
  64 |         dot: '.',
  65 |         centis1: centiseconds?.[0] || '0',
  66 |         centis2: centiseconds?.[1] || '0',
  67 |         hasHours: false,
  68 |         hasMinutes: true,
  69 |         singleDigitSeconds: false
  70 |       };
  71 |     } 
  72 |     // Handle SS.HH format (including single digit seconds)
  73 |     else {
  74 |       const [secondsPart, centiseconds] = timeStr.split('.');
  75 |       
  76 |       // Pour les secondes à un seul chiffre (0-9), on affiche juste le chiffre
  77 |       if (secondsPart && secondsPart.length === 1) {
  78 |         return {
  79 |           seconds1: secondsPart,
  80 |           seconds2: null,
  81 |           dot: '.',
  82 |           centis1: centiseconds?.[0] || '0',
  83 |           centis2: centiseconds?.[1] || '0',
  84 |           hasHours: false,
  85 |           hasMinutes: false,
  86 |           singleDigitSeconds: true
  87 |         };
  88 |       } else {
  89 |         return {
  90 |           seconds1: secondsPart?.[0] || '0',
  91 |           seconds2: secondsPart?.[1] || '0',
  92 |           dot: '.',
  93 |           centis1: centiseconds?.[0] || '0',
  94 |           centis2: centiseconds?.[1] || '0',
  95 |           hasHours: false,
  96 |           hasMinutes: false,
  97 |           singleDigitSeconds: false
  98 |         };
  99 |       }
 100 |     }
 101 |   };
 102 | 
 103 |   const timer1Chars = formatTimerChars(timer1 || '0.00');
 104 |   const timer2Chars = formatTimerChars(timer2 || '0.00');
 105 | 
 106 |   return (
 107 |     <div className="timer-overlay">
 108 |       <div className="name left">
 109 |         <span className={cn("name-scroll", player1Scrolling && "scrolling")}>
 110 |           {player1Name.toUpperCase()}
 111 |         </span>
 112 |       </div>
 113 |       
 114 |       <div className="score-value">
 115 |         {player1Score} – {player2Score}
 116 |       </div>
 117 |       
 118 |       <div className="name right">
 119 |         <span className={cn("name-scroll", player2Scrolling && "scrolling")}>
 120 |           {player2Name.toUpperCase()}
 121 |         </span>
 122 |       </div>
 123 |       
 124 |       <div className={cn(
 125 |         "timer left",
 126 |         currentTimer === 1 && "active"
 127 |       )}>
 128 |         <span className="timer-text">
 129 |           {timer1Chars.hasHours && (
 130 |             <>
 131 |               <span className="timer-char">{timer1Chars.hours}</span>
 132 |               <span className="timer-char separator">{timer1Chars.colon1}</span>
 133 |               <span className="timer-char">{timer1Chars.minutes}</span>
 134 |               <span className="timer-char separator">{timer1Chars.colon2}</span>
 135 |             </>
 136 |           )}
 137 |           {timer1Chars.hasMinutes && !timer1Chars.hasHours && (
 138 |             <>
 139 |               <span className="timer-char">{timer1Chars.minutes}</span>
 140 |               <span className="timer-char separator">{timer1Chars.colon}</span>
 141 |             </>
 142 |           )}
 143 |           <span className="timer-char">{timer1Chars.seconds1}</span>
 144 |           {!timer1Chars.singleDigitSeconds && timer1Chars.seconds2 && (
 145 |             <span className="timer-char">{timer1Chars.seconds2}</span>
 146 |           )}
 147 |           <span className="timer-char separator">{timer1Chars.dot}</span>
 148 |           <span className="timer-char centis">{timer1Chars.centis1}</span>
 149 |           <span className="timer-char centis">{timer1Chars.centis2}</span>
 150 |         </span>
 151 |       </div>
 152 |       
 153 |       <div className={cn(
 154 |         "timer right",
 155 |         currentTimer === 2 && "active"
 156 |       )}>
 157 |         <span className="timer-text">
 158 |           {timer2Chars.hasHours && (
 159 |             <>
 160 |               <span className="timer-char">{timer2Chars.hours}</span>
 161 |               <span className="timer-char separator">{timer2Chars.colon1}</span>
 162 |               <span className="timer-char">{timer2Chars.minutes}</span>
 163 |               <span className="timer-char separator">{timer2Chars.colon2}</span>
 164 |             </>
 165 |           )}
 166 |           {timer2Chars.hasMinutes && !timer2Chars.hasHours && (
 167 |             <>
 168 |               <span className="timer-char">{timer2Chars.minutes}</span>
 169 |               <span className="timer-char separator">{timer2Chars.colon}</span>
 170 |             </>
 171 |           )}
 172 |           <span className="timer-char">{timer2Chars.seconds1}</span>
 173 |           {!timer2Chars.singleDigitSeconds && timer2Chars.seconds2 && (
 174 |             <span className="timer-char">{timer2Chars.seconds2}</span>
 175 |           )}
 176 |           <span className="timer-char separator">{timer2Chars.dot}</span>
 177 |           <span className="timer-char centis">{timer2Chars.centis1}</span>
 178 |           <span className="timer-char centis">{timer2Chars.centis2}</span>
 179 |         </span>
 180 |       </div>
 181 |     </div>
 182 |   );
 183 | };
 184 | 
 185 | export default DefaultStyle;

```

`dbdoverlaytools-free/src\hooks\useGlobalHotkeys.ts`:

```ts
   1 | import { useEffect } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | 
   4 | const useGlobalHotkeys = () => {
   5 |   const { 
   6 |     timerData,
   7 |     startTimer,
   8 |     pauseTimer,
   9 |     swapTimer,
  10 |     saveToStorage 
  11 |   } = useTimerStore();
  12 | 
  13 |   useEffect(() => {
  14 |     if (!window.electronAPI) return;
  15 | 
  16 |     const handleHotkeyPress = (action: string) => {
  17 |       console.log('Global hotkey pressed:', action, 'Current running state:', timerData.isRunning);
  18 |       
  19 |       switch (action) {
  20 |         case 'start':
  21 |           if (timerData.isRunning) {
  22 |             console.log('Pausing via hotkey');
  23 |             pauseTimer();
  24 |           } else {
  25 |             console.log('Starting via hotkey');
  26 |             startTimer();
  27 |           }
  28 |           
  29 |           setTimeout(() => {
  30 |             saveToStorage();
  31 |           }, 200);
  32 |           break;
  33 |           
  34 |         case 'swap':
  35 |           console.log('Swapping via hotkey');
  36 |           swapTimer();
  37 |           
  38 |           setTimeout(() => {
  39 |             saveToStorage();
  40 |           }, 200);
  41 |           break;
  42 |           
  43 |         default:
  44 |           console.warn('Unknown hotkey action:', action);
  45 |       }
  46 |     };
  47 | 
  48 |     const cleanup = window.electronAPI.hotkeys.onPressed(handleHotkeyPress);
  49 | 
  50 |     return () => {
  51 |       if (cleanup) {
  52 |         cleanup();
  53 |       }
  54 |     };
  55 |   }, [timerData.isRunning, startTimer, pauseTimer, swapTimer, saveToStorage]);
  56 | 
  57 |   const registerHotkeys = async (startKey: string, swapKey: string) => {
  58 |     if (!window.electronAPI) {
  59 |       console.warn('Electron API not available');
  60 |       return;
  61 |     }
  62 | 
  63 |     try {
  64 |       await window.electronAPI.hotkeys.register({
  65 |         start: startKey,
  66 |         swap: swapKey,
  67 |       });
  68 |       console.log('Hotkeys registered:', { start: startKey, swap: swapKey });
  69 |     } catch (error) {
  70 |       console.error('Failed to register hotkeys:', error);
  71 |     }
  72 |   };
  73 | 
  74 |   return { registerHotkeys };
  75 | };
  76 | 
  77 | export default useGlobalHotkeys;

```

`dbdoverlaytools-free/src\hooks\useTimer.ts`:

```ts
   1 | import { useEffect, useCallback } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | 
   4 | const useTimer = () => {
   5 |   const {
   6 |     timerData,
   7 |     setTimerRunning,
   8 |     setCurrentTimer,
   9 |     saveToStorage
  10 |   } = useTimerStore();
  11 | 
  12 |   const startTimer = useCallback(() => {
  13 |     if (!timerData.isRunning) {
  14 |       console.log('Starting timer, current:', timerData.currentTimer);
  15 |       setTimerRunning(true);
  16 |       setTimeout(() => saveToStorage(), 100);
  17 |     }
  18 |   }, [timerData.isRunning, timerData.currentTimer, setTimerRunning, saveToStorage]);
  19 | 
  20 |   const pauseTimer = useCallback(() => {
  21 |     if (timerData.isRunning) {
  22 |       console.log('Pausing timer, current:', timerData.currentTimer);
  23 |       setTimerRunning(false);
  24 |       setTimeout(() => saveToStorage(), 100);
  25 |     }
  26 |   }, [timerData.isRunning, timerData.currentTimer, setTimerRunning, saveToStorage]);
  27 | 
  28 |   const swapTimer = useCallback(() => {
  29 |     console.log('Swapping timer from', timerData.currentTimer);
  30 |     
  31 |     if (timerData.isRunning) {
  32 |       pauseTimer();
  33 |     }
  34 |     
  35 |     const newTimer = timerData.currentTimer === 1 ? 2 : 1;
  36 |     console.log('Swapping to timer:', newTimer);
  37 |     setCurrentTimer(newTimer);
  38 |     setTimeout(() => saveToStorage(), 100);
  39 |   }, [timerData.currentTimer, timerData.isRunning, pauseTimer, setCurrentTimer, saveToStorage]);
  40 | 
  41 |   return {
  42 |     isRunning: timerData.isRunning,
  43 |     currentTimer: timerData.currentTimer,
  44 |     startTimer,
  45 |     pauseTimer,
  46 |     swapTimer,
  47 |   };
  48 | };
  49 | 
  50 | export default useTimer;

```

`dbdoverlaytools-free/src\index.css`:

```css
   1 | @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Russo+One&display=swap');
   2 | @tailwind base;
   3 | @tailwind components;
   4 | @tailwind utilities;
   5 | 
   6 | @font-face {
   7 |   font-family: 'SquareFont';
   8 |   src: url('data:font/truetype;charset=utf-8;base64,') format('truetype');
   9 |   font-weight: normal;
  10 |   font-style: normal;
  11 | }
  12 | 
  13 | .timer.right {
  14 |   grid-row: 2;
  15 |   grid-column: 3;
  16 | }
  17 | 
  18 | .drag-handle {
  19 |   -webkit-app-region: drag;
  20 |   cursor: move;
  21 | }
  22 | 
  23 | .slider {
  24 |   -webkit-appearance: none;
  25 |   appearance: none;
  26 |   background: transparent;
  27 |   cursor: pointer;
  28 | }
  29 | 
  30 | .slider::-webkit-slider-track {
  31 |   background: #374151;
  32 |   height: 8px;
  33 |   border-radius: 4px;
  34 | }
  35 | 
  36 | .slider::-webkit-slider-thumb {
  37 |   -webkit-appearance: none;
  38 |   appearance: none;
  39 |   background: #8b5cf6;
  40 |   height: 20px;
  41 |   width: 20px;
  42 |   border-radius: 50%;
  43 |   cursor: pointer;
  44 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  45 |   transition: all 0.2s ease;
  46 | }
  47 | 
  48 | .slider::-webkit-slider-thumb:hover {
  49 |   background: #7c3aed;
  50 |   box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
  51 |   transform: scale(1.1);
  52 | }
  53 | 
  54 | .slider::-moz-range-track {
  55 |   background: #374151;
  56 |   height: 8px;
  57 |   border-radius: 4px;
  58 |   border: none;
  59 | }
  60 | 
  61 | .slider::-moz-range-thumb {
  62 |   background: #8b5cf6;
  63 |   height: 20px;
  64 |   width: 20px;
  65 |   border-radius: 50%;
  66 |   cursor: pointer;
  67 |   border: none;
  68 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  69 | }
  70 | 
  71 | @keyframes pulse-glow {
  72 |   0%, 100% {
  73 |     opacity: 0.6;
  74 |     box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  75 |   }
  76 |   50% {
  77 |     opacity: 1;
  78 |     box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
  79 |   }
  80 | }
  81 | 
  82 | .animate-pulse-glow {
  83 |   animation: pulse-glow 2s ease-in-out infinite;
  84 | }
  85 | 
  86 | .overlay-container {
  87 |   -webkit-user-select: none;
  88 |   user-select: none;
  89 |   -webkit-app-region: no-drag;
  90 |   background: transparent !important;
  91 | }
  92 | 
  93 | * {
  94 |   box-sizing: border-box;
  95 | }
  96 | 
  97 | body {
  98 |   margin: 0;
  99 |   font-family: 'Poppins', sans-serif;
 100 |   -webkit-font-smoothing: antialiased;
 101 |   -moz-osx-font-smoothing: grayscale;
 102 |   color: #ffffff;
 103 |   background: #1a1a1a;
 104 | }
 105 | 
 106 | #root, #overlay-root {
 107 |   width: 100%;
 108 |   height: 100%;
 109 | }
 110 | 
 111 | #overlay-root {
 112 |   background: transparent !important;
 113 |   margin: 0 !important;
 114 |   padding: 0 !important;
 115 | }
 116 | 
 117 | html.overlay-page,
 118 | body.overlay-page {
 119 |   background: transparent !important;
 120 |   margin: 0 !important;
 121 |   padding: 0 !important;
 122 |   overflow: hidden !important;
 123 | }
 124 | 
 125 | .no-drag {
 126 |   -webkit-app-region: no-drag;
 127 | }
 128 | 
 129 | .timer-glow {
 130 |   text-shadow: 0 0 10px currentColor;
 131 | }
 132 | 
 133 | .scrolling-text {
 134 |   white-space: nowrap;
 135 |   overflow: hidden;
 136 | }
 137 | 
 138 | .scrolling-text.active {
 139 |   animation: scroll-text 6s linear infinite;
 140 | }
 141 | 
 142 | @keyframes pulse-active {
 143 |   0%, 100% { 
 144 |     background: rgba(181, 121, 255, 0.2);
 145 |     border-color: rgba(181, 121, 255, 0.5);
 146 |   }
 147 |   50% { 
 148 |     background: rgba(181, 121, 255, 0.3);
 149 |     border-color: rgba(181, 121, 255, 0.7);
 150 |   }
 151 | }
 152 | 
 153 | .timer-active {
 154 |   animation: pulse-active 2s ease-in-out infinite;
 155 | }
 156 | 
 157 | .timer-overlay {
 158 |   display: grid;
 159 |   grid-template-columns: minmax(160px, 1fr) auto minmax(160px, 1fr);
 160 |   grid-template-rows: 50px 1fr;
 161 |   width: 520px;
 162 |   height: 120px;
 163 |   position: relative;
 164 |   font-family: 'Poppins', sans-serif;
 165 |   background: transparent;
 166 | }
 167 | 
 168 | .name,
 169 | .score-value {
 170 |   border-bottom: 1px solid rgba(255,255,255,0.32);
 171 |   background: linear-gradient(
 172 |     90deg,
 173 |     #4B4B4B 0%,
 174 |     #3A3A3A 50%,
 175 |     #3A3A3A 100%
 176 |   );
 177 |   display: flex;
 178 |   align-items: center;
 179 |   justify-content: center;
 180 |   font-family: "Poppins", sans-serif;
 181 |   font-size: 22px;
 182 |   font-weight: 500;
 183 |   color: #FFF;
 184 |   position: relative;
 185 |   overflow: hidden;
 186 | }
 187 | 
 188 | .name-scroll {
 189 |   display: inline-block;
 190 |   white-space: nowrap;
 191 |   padding: 0 15px;
 192 | }
 193 | 
 194 | .name-scroll.scrolling {
 195 |   animation: scroll-text 6s linear infinite;
 196 |   padding: 0 50px;
 197 | }
 198 | 
 199 | @keyframes scroll-text {
 200 |   0% {
 201 |     transform: translateX(80%);
 202 |   }
 203 |   100% {
 204 |     transform: translateX(-80%);
 205 |   }
 206 | }
 207 | 
 208 | .name.left {
 209 |   grid-row: 1;
 210 |   grid-column: 1;
 211 |   font-size: 24px;
 212 |   text-transform: uppercase;
 213 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
 214 | }
 215 | 
 216 | .score-value {
 217 |   grid-row: 1;
 218 |   grid-column: 2;
 219 |   font-size: 24px;
 220 |   background: linear-gradient(
 221 |     90deg,
 222 |     #274B90 0.06%,
 223 |     #09327E 40.01%,
 224 |     #04296F 79.97%
 225 |   );
 226 |   padding: 0 15px;
 227 |   text-transform: uppercase;
 228 |   min-width: 90px;
 229 |   max-width: 120px;
 230 | }
 231 | 
 232 | .name.right {
 233 |   font-size: 24px;
 234 |   grid-row: 1;
 235 |   grid-column: 3;
 236 |   text-transform: uppercase;
 237 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
 238 | }
 239 | 
 240 | .timer {
 241 |   display: flex;
 242 |   align-items: center;
 243 |   justify-content: center;
 244 |   font-family: "Consolas", "Monaco", "Courier New", monospace;
 245 |   font-size: 28px;
 246 |   font-weight: 400;
 247 |   text-shadow: 0 0 6px rgba(190,190,190,0.50);
 248 |   position: relative;
 249 |   height: 100%;
 250 |   text-align: center;
 251 |   min-width: 160px;
 252 | }
 253 | 
 254 | .timer.left {
 255 |   grid-row: 2;
 256 |   grid-column: 1;
 257 | }
 258 | 
 259 | .timer.right {
 260 |   grid-row: 2;
 261 |   grid-column: 3;
 262 | }
 263 | 
 264 | .timer-text {
 265 |   display: inline-flex;
 266 |   align-items: center;
 267 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 268 |   -webkit-background-clip: text;
 269 |   background-clip: text;
 270 |   -webkit-text-fill-color: transparent;
 271 | }
 272 | 
 273 | .timer-char {
 274 |   display: inline-block;
 275 |   width: 20px;
 276 |   text-align: center;
 277 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 278 |   -webkit-background-clip: text;
 279 |   background-clip: text;
 280 |   -webkit-text-fill-color: transparent;
 281 | }
 282 | 
 283 | .timer-char.separator {
 284 |   width: 10px;
 285 | }
 286 | 
 287 | .timer-char.centis {
 288 |   width: 18px;
 289 |   font-size: 24px;
 290 |   opacity: 0.9;
 291 | }
 292 | 
 293 | /* Active timer indicator - ALWAYS show the current timer position */
 294 | .timer::after {
 295 |   content: '';
 296 |   position: absolute;
 297 |   bottom: 0;
 298 |   left: 0;
 299 |   right: 0;
 300 |   height: 3px;
 301 |   background: linear-gradient(90deg, #666 0%, #444 50%, #666 100%);
 302 |   opacity: 0.5;
 303 | }
 304 | 
 305 | .timer.active::after {
 306 |   background: linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%);
 307 |   opacity: 1;
 308 |   animation: pulseBar 1.5s ease-in-out infinite;
 309 | }
 310 | 
 311 | @keyframes pulseBar {
 312 |   0%, 100% { 
 313 |     opacity: 0.8;
 314 |     transform: scaleY(1);
 315 |   }
 316 |   50% { 
 317 |     opacity: 1;
 318 |     transform: scaleY(1.5);
 319 |   }
 320 | }

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
   1 | import { create } from 'zustand';
   2 | import type { TimerData, OverlaySettings } from '../types';
   3 | 
   4 | interface TimerState {
   5 |   timerData: TimerData;
   6 |   overlaySettings: OverlaySettings;
   7 |   isOverlayVisible: boolean;
   8 |   
   9 |   setTimerData: (data: Partial<TimerData>) => void;
  10 |   setOverlaySettings: (settings: Partial<OverlaySettings>) => void;
  11 |   setOverlayVisible: (visible: boolean) => void;
  12 |   
  13 |   startTimer: () => void;
  14 |   pauseTimer: () => void;
  15 |   resetTimer: () => void;
  16 |   resetAllTimers: () => void;
  17 |   swapTimer: () => void;
  18 |   
  19 |   setTimerValue: (player: 1 | 2, value: number) => void;
  20 |   setTimerRunning: (running: boolean) => void;
  21 |   setCurrentTimer: (timer: 1 | 2) => void;
  22 |   
  23 |   updatePlayerScore: (player: 1 | 2, delta: number) => void;
  24 |   updatePlayerName: (player: 1 | 2, name: string) => void;
  25 |   updateHotkeys: (hotkeys: { start: string; swap: string }) => void;
  26 |   
  27 |   loadFromStorage: () => Promise<void>;
  28 |   saveToStorage: () => Promise<void>;
  29 | }
  30 | 
  31 | const defaultTimerData: TimerData = {
  32 |   player1Name: 'Player 1',
  33 |   player2Name: 'Player 2',
  34 |   player1Score: 0,
  35 |   player2Score: 0,
  36 |   timer1Value: 0,
  37 |   timer2Value: 0,
  38 |   currentTimer: 1,
  39 |   isRunning: false,
  40 |   startHotkey: 'F1',
  41 |   swapHotkey: 'F2'
  42 | };
  43 | 
  44 | const defaultOverlaySettings: OverlaySettings = {
  45 |   baseWidth: 520,
  46 |   baseHeight: 120,
  47 |   scale: 100,
  48 |   x: 100,
  49 |   y: 100,
  50 |   locked: false,
  51 |   alwaysOnTop: true
  52 | };
  53 | 
  54 | export const useTimerStore = create<TimerState>((set, get) => ({
  55 |   timerData: defaultTimerData,
  56 |   overlaySettings: defaultOverlaySettings,
  57 |   isOverlayVisible: false,
  58 | 
  59 |   setTimerData: (data) => {
  60 |     console.log('Setting timer data:', data);
  61 |     set((state) => {
  62 |       const newTimerData = { ...state.timerData, ...data };
  63 |       
  64 |       setTimeout(() => {
  65 |         if (window.electronAPI?.timer?.syncData) {
  66 |           window.electronAPI.timer.syncData(newTimerData);
  67 |         }
  68 |       }, 0);
  69 |       
  70 |       return { timerData: newTimerData };
  71 |     });
  72 |   },
  73 | 
  74 |   setOverlaySettings: (settings) => {
  75 |     set((state) => ({
  76 |       overlaySettings: { ...state.overlaySettings, ...settings }
  77 |     }));
  78 |     
  79 |     const { overlaySettings: newSettings } = get();
  80 |     
  81 |     setTimeout(() => {
  82 |       if (window.electronAPI?.overlay?.updateSettings) {
  83 |         window.electronAPI.overlay.updateSettings(newSettings);
  84 |       }
  85 |       get().saveToStorage();
  86 |     }, 0);
  87 |   },
  88 | 
  89 |   setOverlayVisible: async (visible) => {
  90 |     const currentState = get();
  91 |     
  92 |     if (currentState.isOverlayVisible === visible) {
  93 |       return;
  94 |     }
  95 |     
  96 |     set({ isOverlayVisible: visible });
  97 |     
  98 |     if (window.electronAPI?.overlay) {
  99 |       try {
 100 |         if (visible) {
 101 |           const result = await window.electronAPI.overlay.show();
 102 |           if (result.success) {
 103 |             setTimeout(() => {
 104 |               const currentData = get().timerData;
 105 |               if (window.electronAPI?.timer?.syncData) {
 106 |                 window.electronAPI.timer.syncData(currentData);
 107 |               }
 108 |             }, 500);
 109 |           } else {
 110 |             set({ isOverlayVisible: false });
 111 |           }
 112 |         } else {
 113 |           await window.electronAPI.overlay.hide();
 114 |         }
 115 |       } catch (error) {
 116 |         console.error('Error toggling overlay:', error);
 117 |         set({ isOverlayVisible: !visible });
 118 |       }
 119 |     }
 120 |   },
 121 | 
 122 | startTimer: () => {
 123 |   const currentData = get().timerData;
 124 |   console.log('Starting timer', currentData.currentTimer, 'Current values:', {
 125 |     isRunning: currentData.isRunning,
 126 |     timer1Value: currentData.timer1Value,
 127 |     timer2Value: currentData.timer2Value,
 128 |     currentTimer: currentData.currentTimer
 129 |   });
 130 | 
 131 |   if (!currentData.isRunning) {
 132 |     // Conserver les valeurs actuelles, juste passer en mode running
 133 |     get().setTimerData({ isRunning: true });
 134 |     get().saveToStorage();
 135 |   }
 136 | },
 137 | 
 138 |   pauseTimer: () => {
 139 |     const currentData = get().timerData;
 140 |     console.log('Pausing timer', currentData.currentTimer, 'Current values:', {
 141 |       isRunning: currentData.isRunning,
 142 |       timer1Value: currentData.timer1Value,
 143 |       timer2Value: currentData.timer2Value,
 144 |       currentTimer: currentData.currentTimer
 145 |     });
 146 |     
 147 |     if (currentData.isRunning) {
 148 |       // Mettre en pause le timer actuel SEULEMENT (pas de reset)
 149 |       get().setTimerData({ isRunning: false });
 150 |       get().saveToStorage();
 151 |     }
 152 |   },
 153 | 
 154 |   resetTimer: () => {
 155 |     const { timerData } = get();
 156 |     const currentTimer = timerData.currentTimer;
 157 |     const valueKey = currentTimer === 1 ? 'timer1Value' : 'timer2Value';
 158 |     
 159 |     console.log('Resetting timer', currentTimer, 'from value:', timerData[valueKey]);
 160 |     
 161 |     get().setTimerData({ 
 162 |       [valueKey]: 0,
 163 |       isRunning: false 
 164 |     });
 165 |     get().saveToStorage();
 166 |   },
 167 | 
 168 |   resetAllTimers: () => {
 169 |     console.log('Resetting all timers');
 170 |     get().setTimerData({ 
 171 |       timer1Value: 0,
 172 |       timer2Value: 0,
 173 |       isRunning: false 
 174 |     });
 175 |     get().saveToStorage();
 176 |   },
 177 | 
 178 | swapTimer: () => {
 179 |   const { timerData } = get();
 180 |   const currentTimer = timerData.currentTimer;
 181 |   const newTimer = currentTimer === 1 ? 2 : 1;
 182 | 
 183 |   // On pause le timer actuel mais on garde sa valeur telle quelle
 184 |   console.log('SWAP: from timer', currentTimer, 'to timer', newTimer);
 185 |   get().setTimerData({
 186 |     currentTimer: newTimer,
 187 |     isRunning: false // pause automatique
 188 |   });
 189 |   get().saveToStorage();
 190 | 
 191 |   console.log('SWAP COMPLETE: Timer', newTimer, 'selected and ALL TIMERS PAUSED');
 192 | },
 193 | 
 194 |   setTimerValue: (player, value) => {
 195 |     const valueKey = player === 1 ? 'timer1Value' : 'timer2Value';
 196 |     console.log(`Setting ${valueKey} to ${value}`);
 197 |     set((state) => ({
 198 |       timerData: { ...state.timerData, [valueKey]: value }
 199 |     }));
 200 |   },
 201 | 
 202 |   setTimerRunning: (running) => {
 203 |     console.log('Setting timer running to:', running);
 204 |     get().setTimerData({ isRunning: running });
 205 |   },
 206 | 
 207 |   setCurrentTimer: (timer) => {
 208 |     console.log('Setting current timer to:', timer);
 209 |     get().setTimerData({ currentTimer: timer });
 210 |   },
 211 | 
 212 |   updatePlayerScore: (player, delta) => {
 213 |     const { timerData } = get();
 214 |     const scoreKey = player === 1 ? 'player1Score' : 'player2Score';
 215 |     const currentScore = timerData[scoreKey];
 216 |     
 217 |     get().setTimerData({ 
 218 |       [scoreKey]: Math.max(0, currentScore + delta) 
 219 |     });
 220 |     get().saveToStorage();
 221 |   },
 222 | 
 223 |   updatePlayerName: (player, name) => {
 224 |     const nameKey = player === 1 ? 'player1Name' : 'player2Name';
 225 |     get().setTimerData({ [nameKey]: name });
 226 |     get().saveToStorage();
 227 |   },
 228 | 
 229 |   updateHotkeys: (hotkeys) => {
 230 |     get().setTimerData({ 
 231 |       startHotkey: hotkeys.start,
 232 |       swapHotkey: hotkeys.swap,
 233 |       hotkeys
 234 |     });
 235 |     get().saveToStorage();
 236 |   },
 237 | 
 238 |   loadFromStorage: async () => {
 239 |     try {
 240 |       if (!window.electronAPI?.store) return;
 241 | 
 242 |       const [storedTimerData, storedOverlaySettings] = await Promise.all([
 243 |         window.electronAPI.store.get('timerData'),
 244 |         window.electronAPI.store.get('overlaySettings')
 245 |       ]);
 246 | 
 247 |       const loadedTimerData = storedTimerData ? { ...defaultTimerData, ...storedTimerData } : defaultTimerData;
 248 |       const loadedOverlaySettings = storedOverlaySettings ? { ...defaultOverlaySettings, ...storedOverlaySettings } : defaultOverlaySettings;
 249 | 
 250 |       set({
 251 |         timerData: loadedTimerData,
 252 |         overlaySettings: loadedOverlaySettings
 253 |       });
 254 | 
 255 |       console.log('Timer store loaded from storage:', { loadedTimerData, loadedOverlaySettings });
 256 |     } catch (error) {
 257 |       console.error('Error loading from storage:', error);
 258 |     }
 259 |   },
 260 | 
 261 |   saveToStorage: async () => {
 262 |     try {
 263 |       if (!window.electronAPI?.store) return;
 264 | 
 265 |       const { timerData, overlaySettings } = get();
 266 |       
 267 |       await Promise.all([
 268 |         window.electronAPI.store.set('timerData', timerData),
 269 |         window.electronAPI.store.set('overlaySettings', overlaySettings)
 270 |       ]);
 271 |     } catch (error) {
 272 |       console.error('Error saving to storage:', error);
 273 |     }
 274 |   }
 275 | }));

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
   1 | /**
   2 |  * Formats milliseconds to LiveSplit format with centiseconds
   3 |  * Examples:
   4 |  * - 0ms -> "0.00"
   5 |  * - 30110ms -> "30.11" 
   6 |  * - 80220ms -> "1:20.22"
   7 |  * - 5428450ms -> "01:30:28.45"
   8 |  */
   9 | export function formatTime(milliseconds: number): string {
  10 |   if (milliseconds < 0) return "0.00";
  11 |   
  12 |   const totalMs = Math.floor(milliseconds);
  13 |   const totalSeconds = Math.floor(totalMs / 1000);
  14 |   const minutes = Math.floor(totalSeconds / 60);
  15 |   const hours = Math.floor(minutes / 60);
  16 |   const remainingMinutes = minutes % 60;
  17 |   const remainingSeconds = totalSeconds % 60;
  18 |   const centiseconds = Math.floor((totalMs % 1000) / 10);
  19 |   
  20 |   if (hours > 0) {
  21 |     return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  22 |   } else if (minutes > 0) {
  23 |     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  24 |   } else {
  25 |     // Pour les secondes seules, on n'ajoute pas de zéro devant si c'est moins de 10
  26 |     return `${remainingSeconds}.${centiseconds.toString().padStart(2, '0')}`;
  27 |   }
  28 | }
  29 | 
  30 | /**
  31 |  * Parses a formatted time string to milliseconds
  32 |  * Supports formats: "SS.HH", "M:SS.HH", "HH:MM:SS.HH"
  33 |  */
  34 | export function parseTimeToMs(timeString: string): number {
  35 |   // Handle HH:MM:SS.HH format
  36 |   const hoursMatch = timeString.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
  37 |   if (hoursMatch) {
  38 |     const hours = parseInt(hoursMatch[1]);
  39 |     const minutes = parseInt(hoursMatch[2]);
  40 |     const seconds = parseInt(hoursMatch[3]);
  41 |     const centiseconds = parseInt(hoursMatch[4]);
  42 |     return (hours * 3600 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + (centiseconds * 10);
  43 |   }
  44 |   
  45 |   // Handle M:SS.HH format
  46 |   const minutesMatch = timeString.match(/(\d+):(\d{2})\.(\d{2})/);
  47 |   if (minutesMatch) {
  48 |     const minutes = parseInt(minutesMatch[1]);
  49 |     const seconds = parseInt(minutesMatch[2]);
  50 |     const centiseconds = parseInt(minutesMatch[3]);
  51 |     return (minutes * 60 * 1000) + (seconds * 1000) + (centiseconds * 10);
  52 |   }
  53 |   
  54 |   // Handle SS.HH format (including single digit seconds)
  55 |   const secondsMatch = timeString.match(/(\d+)\.(\d{2})/);
  56 |   if (secondsMatch) {
  57 |     const seconds = parseInt(secondsMatch[1]);
  58 |     const centiseconds = parseInt(secondsMatch[2]);
  59 |     return (seconds * 1000) + (centiseconds * 10);
  60 |   }
  61 |   
  62 |   return 0;
  63 | }
  64 | 
  65 | /**
  66 |  * High-precision timer class for LiveSplit-like functionality
  67 |  */
  68 | export class PreciseTimer {
  69 |   private startTime: number = 0;
  70 |   private pausedTime: number = 0;
  71 |   private totalPausedTime: number = 0;
  72 |   private animationId: number | null = null;
  73 |   private intervalId: number | null = null;
  74 |   private isRunning: boolean = false;
  75 |   private isPaused: boolean = false;
  76 |   private onUpdate: (value: number) => void;
  77 |   private lastUpdateTime: number = 0;
  78 | 
  79 |   constructor(onUpdate: (value: number) => void) {
  80 |     this.onUpdate = onUpdate;
  81 |   }
  82 | 
  83 |   start(resumeFromValue: number = 0) {
  84 |     if (this.isRunning && !this.isPaused) return;
  85 |     
  86 |     const now = Date.now();
  87 |     
  88 |     if (this.isPaused) {
  89 |       // Resume from pause
  90 |       this.totalPausedTime += now - this.pausedTime;
  91 |       this.isPaused = false;
  92 |     } else {
  93 |       // Fresh start or restart
  94 |       this.startTime = now;
  95 |       this.totalPausedTime = 0;
  96 |       this.pausedTime = 0;
  97 |       
  98 |       // If resuming from a specific value, adjust start time
  99 |       if (resumeFromValue > 0) {
 100 |         this.startTime = now - resumeFromValue;
 101 |       }
 102 |     }
 103 |     
 104 |     this.isRunning = true;
 105 |     this.lastUpdateTime = 0;
 106 | 
 107 |     const updateTimer = () => {
 108 |       if (!this.isRunning || this.isPaused) return;
 109 | 
 110 |       const now = Date.now();
 111 |       const elapsed = now - this.startTime - this.totalPausedTime;
 112 |       const currentValue = Math.max(0, elapsed);
 113 | 
 114 |       if (now - this.lastUpdateTime >= 10) {
 115 |         this.onUpdate(currentValue);
 116 |         this.lastUpdateTime = now;
 117 |       }
 118 | 
 119 |       this.animationId = requestAnimationFrame(updateTimer);
 120 |     };
 121 | 
 122 |     updateTimer();
 123 | 
 124 |     // Backup interval for precision
 125 |     this.intervalId = window.setInterval(() => {
 126 |       if (this.isRunning && !this.isPaused) {
 127 |         const now = Date.now();
 128 |         const elapsed = now - this.startTime - this.totalPausedTime;
 129 |         const currentValue = Math.max(0, elapsed);
 130 |         this.onUpdate(currentValue);
 131 |       }
 132 |     }, 10);
 133 |   }
 134 | 
 135 |   pause(): number {
 136 |     if (!this.isRunning || this.isPaused) return this.currentValue;
 137 | 
 138 |     this.isPaused = true;
 139 |     this.pausedTime = Date.now();
 140 |     
 141 |     const currentValue = this.currentValue;
 142 |     
 143 |     if (this.animationId) {
 144 |       cancelAnimationFrame(this.animationId);
 145 |       this.animationId = null;
 146 |     }
 147 |     
 148 |     if (this.intervalId) {
 149 |       clearInterval(this.intervalId);
 150 |       this.intervalId = null;
 151 |     }
 152 |     
 153 |     return currentValue;
 154 |   }
 155 | 
 156 |   stop() {
 157 |     this.isRunning = false;
 158 |     this.isPaused = false;
 159 | 
 160 |     if (this.animationId) {
 161 |       cancelAnimationFrame(this.animationId);
 162 |       this.animationId = null;
 163 |     }
 164 | 
 165 |     if (this.intervalId) {
 166 |       clearInterval(this.intervalId);
 167 |       this.intervalId = null;
 168 |     }
 169 |   }
 170 | 
 171 |   reset() {
 172 |     this.stop();
 173 |     this.startTime = 0;
 174 |     this.pausedTime = 0;
 175 |     this.totalPausedTime = 0;
 176 |     this.onUpdate(0);
 177 |   }
 178 | 
 179 |   get running(): boolean {
 180 |     return this.isRunning && !this.isPaused;
 181 |   }
 182 |   
 183 |   get paused(): boolean {
 184 |     return this.isPaused;
 185 |   }
 186 | 
 187 |   get currentValue(): number {
 188 |     if (!this.isRunning) return 0;
 189 |     
 190 |     if (this.isPaused) {
 191 |       return Math.max(0, this.pausedTime - this.startTime - this.totalPausedTime);
 192 |     }
 193 |     
 194 |     const now = Date.now();
 195 |     const elapsed = now - this.startTime - this.totalPausedTime;
 196 |     return Math.max(0, elapsed);
 197 |   }
 198 | }
 199 | 
 200 | /**
 201 |  * Validates and normalizes hotkey string
 202 |  */
 203 | export function normalizeHotkey(hotkey: string): string {
 204 |   const key = hotkey.trim().toLowerCase();
 205 |   
 206 |   if (key.startsWith('f') && key.length <= 3) {
 207 |     const num = key.slice(1);
 208 |     if (/^\d{1,2}$/.test(num)) {
 209 |       return key.toUpperCase();
 210 |     }
 211 |   }
 212 |   
 213 |   if (key.length === 1 && /[a-z0-9]/.test(key)) {
 214 |     return key.toUpperCase();
 215 |   }
 216 |   
 217 |   const specialKeys = ['space', 'enter', 'tab', 'escape', 'backspace'];
 218 |   if (specialKeys.includes(key)) {
 219 |     return key.charAt(0).toUpperCase() + key.slice(1);
 220 |   }
 221 |   
 222 |   return hotkey.toUpperCase();
 223 | }

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