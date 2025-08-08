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
 226 |             this.store.set('overlaySettings.x', bounds.x);
 227 |             this.store.set('overlaySettings.y', bounds.y);
 228 |           }
 229 |         }
 230 |       });
 231 | 
 232 |     } catch (error) {
 233 |       console.error('Error creating overlay window:', error);
 234 |       this.isOverlayBeingCreated = false;
 235 |     }
 236 |   }
 237 | 
 238 |   setupIPC() {
 239 |     ipcMain.handle('store-get', (_, key) => {
 240 |       try {
 241 |         return this.store.get(key);
 242 |       } catch (error) {
 243 |         console.error('Store get error:', error);
 244 |         return null;
 245 |       }
 246 |     });
 247 |     
 248 |     ipcMain.handle('store-set', (_, key, value) => {
 249 |       try {
 250 |         this.store.set(key, value);
 251 |         return true;
 252 |       } catch (error) {
 253 |         console.error('Store set error:', error);
 254 |         return false;
 255 |       }
 256 |     });
 257 | 
 258 |     ipcMain.handle('overlay-show', async () => {
 259 |       try {
 260 |         this.createOverlayWindow();
 261 |         return { success: true };
 262 |       } catch (error) {
 263 |         console.error('Error showing overlay:', error);
 264 |         return { success: false, error: error.message };
 265 |       }
 266 |     });
 267 | 
 268 |     ipcMain.handle('overlay-hide', async () => {
 269 |       try {
 270 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 271 |           this.overlayWindow.close();
 272 |           this.overlayWindow = null;
 273 |         }
 274 |         return { success: true };
 275 |       } catch (error) {
 276 |         console.error('Error hiding overlay:', error);
 277 |         return { success: false, error: error.message };
 278 |       }
 279 |     });
 280 | 
 281 |     ipcMain.handle('overlay-settings-update', async (_, settings) => {
 282 |       if (!this.overlayWindow || this.overlayWindow.isDestroyed()) return { success: true };
 283 | 
 284 |       try {
 285 |         const currentSettings = this.store.get('overlaySettings', {});
 286 |         const newSettings = { ...currentSettings, ...settings };
 287 | 
 288 |         if (settings.locked !== undefined) {
 289 |           const wasPreviouslyLocked = currentSettings.locked;
 290 |           const newDragHandleHeight = settings.locked ? 0 : 30;
 291 |           const newOverlayHeight = Math.ceil((120 + newDragHandleHeight) * (newSettings.scale || 100) / 100);
 292 |           const newOverlayWidth = Math.ceil(520 * (newSettings.scale || 100) / 100);
 293 |           
 294 |           if (!wasPreviouslyLocked && settings.locked) {
 295 |             this.overlayPosition = this.overlayWindow.getBounds();
 296 |           }
 297 |           
 298 |           this.overlayWindow.setIgnoreMouseEvents(settings.locked, { forward: true });
 299 |           this.overlayWindow.setFocusable(!settings.locked);
 300 |           this.overlayWindow.setSkipTaskbar(settings.locked);
 301 |           this.overlayWindow.setMinimizable(!settings.locked);
 302 |           this.overlayWindow.setSize(newOverlayWidth, newOverlayHeight);
 303 |           
 304 |           if (!settings.locked && this.overlayPosition) {
 305 |             this.overlayWindow.setPosition(this.overlayPosition.x, this.overlayPosition.y);
 306 |           }
 307 |         }
 308 | 
 309 |         if (settings.scale !== undefined) {
 310 |           const dragHandleHeight = newSettings.locked ? 0 : 30;
 311 |           const newWidth = Math.ceil(520 * settings.scale / 100);
 312 |           const newHeight = Math.ceil((120 + dragHandleHeight) * settings.scale / 100);
 313 |           this.overlayWindow.setSize(newWidth, newHeight);
 314 |         }
 315 | 
 316 |         if (settings.alwaysOnTop !== undefined) {
 317 |           this.overlayWindow.setAlwaysOnTop(settings.alwaysOnTop);
 318 |         }
 319 | 
 320 |         if (settings.x !== undefined || settings.y !== undefined) {
 321 |           const currentBounds = this.overlayWindow.getBounds();
 322 |           this.overlayWindow.setPosition(
 323 |             settings.x !== undefined ? settings.x : currentBounds.x,
 324 |             settings.y !== undefined ? settings.y : currentBounds.y
 325 |           );
 326 |         }
 327 | 
 328 |         this.store.set('overlaySettings', newSettings);
 329 | 
 330 |         return { success: true };
 331 |       } catch (error) {
 332 |         console.error('Error updating overlay settings:', error);
 333 |         return { success: false, error: error.message };
 334 |       }
 335 |     });
 336 | 
 337 |     ipcMain.handle('timer-data-sync', async (_, data) => {
 338 |       try {
 339 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 340 |           this.overlayWindow.webContents.send('timer-data-sync', data);
 341 |         }
 342 |         this.store.set('timerData', data);
 343 |         return { success: true };
 344 |       } catch (error) {
 345 |         console.error('Error syncing timer data:', error);
 346 |         return { success: false, error: error.message };
 347 |       }
 348 |     });
 349 | 
 350 |     ipcMain.handle('overlay-style-change', async (_, style) => {
 351 |       try {
 352 |         if (this.overlayWindow && !this.overlayWindow.isDestroyed()) {
 353 |           this.overlayWindow.webContents.send('overlay-style-change', style);
 354 |         }
 355 |         return { success: true };
 356 |       } catch (error) {
 357 |         console.error('Error changing overlay style:', error);
 358 |         return { success: false, error: error.message };
 359 |       }
 360 |     });
 361 |   }
 362 | 
 363 |   setupGlobalShortcuts() {
 364 |     const registerShortcut = (key, action) => {
 365 |       try {
 366 |         const success = globalShortcut.register(key, () => {
 367 |           if (this.mainWindow && !this.mainWindow.isDestroyed()) {
 368 |             this.mainWindow.webContents.send('hotkey-pressed', action);
 369 |           }
 370 |         });
 371 |         
 372 |         if (!success) {
 373 |           console.warn(`Failed to register shortcut: ${key}`);
 374 |         }
 375 |       } catch (error) {
 376 |         console.warn(`Error registering shortcut ${key}:`, error);
 377 |       }
 378 |     };
 379 | 
 380 |     const savedHotkeys = this.store.get('timerData.hotkeys', {
 381 |       start: 'F1',
 382 |       swap: 'F2'
 383 |     });
 384 | 
 385 |     registerShortcut(savedHotkeys.start, 'start');
 386 |     registerShortcut(savedHotkeys.swap, 'swap');
 387 | 
 388 |     ipcMain.handle('hotkey-register', async (_, hotkeys) => {
 389 |       try {
 390 |         globalShortcut.unregisterAll();
 391 |         registerShortcut(hotkeys.start, 'start');
 392 |         registerShortcut(hotkeys.swap, 'swap');
 393 |         this.store.set('timerData.hotkeys', hotkeys);
 394 |         return { success: true };
 395 |       } catch (error) {
 396 |         console.error('Error registering hotkeys:', error);
 397 |         return { success: false, error: error.message };
 398 |       }
 399 |     });
 400 |   }
 401 | }
 402 | 
 403 | new TimerOverlayApp();

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
   4 |   "description": "Dead by Daylight 1v1 Timer Overlay",
   5 |   "main": "electron/main.cjs",
   6 |   "type": "module",
   7 |   "scripts": {
   8 |     "dev": "vite",
   9 |     "build": "vite build",
  10 |     "electron:dev": "node scripts/start.js",
  11 |     "electron:build": "npm run build && electron-builder",
  12 |     "clean": "rimraf dist dist-electron release"
  13 |   },
  14 |   "devDependencies": {
  15 |     "@types/node": "^20.10.0",
  16 |     "@types/react": "^18.2.43",
  17 |     "@types/react-dom": "^18.2.17",
  18 |     "@vitejs/plugin-react": "^4.2.1",
  19 |     "autoprefixer": "^10.4.16",
  20 |     "cross-env": "^7.0.3",
  21 |     "electron": "^28.1.0",
  22 |     "electron-builder": "^24.9.1",
  23 |     "postcss": "^8.4.32",
  24 |     "rimraf": "^5.0.5",
  25 |     "tailwindcss": "^3.3.6",
  26 |     "typescript": "^5.2.2",
  27 |     "vite": "^5.0.8"
  28 |   },
  29 |   "dependencies": {
  30 |     "electron-store": "^8.2.0",
  31 |     "react": "^18.2.0",
  32 |     "react-dom": "^18.2.0",
  33 |     "zustand": "^4.4.7"
  34 |   }
  35 | }

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
  12 | async function waitForServer(port, timeout = 30000) {
  13 |   return new Promise((resolve, reject) => {
  14 |     const startTime = Date.now();
  15 |     let attempts = 0;
  16 |     
  17 |     const checkServer = () => {
  18 |       attempts++;
  19 |       
  20 |       // Vérifier avec fetch au lieu de socket
  21 |       fetch(`http://localhost:${port}`)
  22 |         .then(() => {
  23 |           console.log(`✅ Server ready on port ${port} after ${attempts} attempts`);
  24 |           resolve(true);
  25 |         })
  26 |         .catch(() => {
  27 |           if (Date.now() - startTime > timeout) {
  28 |             reject(new Error(`Timeout waiting for server on port ${port}`));
  29 |             return;
  30 |           }
  31 |           setTimeout(checkServer, 1000);
  32 |         });
  33 |     };
  34 |     
  35 |     // Attendre un peu avant la première vérification
  36 |     setTimeout(checkServer, 2000);
  37 |   });
  38 | }
  39 | 
  40 | async function startApp() {
  41 |   try {
  42 |     console.log('📦 Starting Vite dev server...');
  43 |     const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
  44 |       stdio: 'pipe',
  45 |       shell: true
  46 |     });
  47 |     
  48 |     viteProcess.stdout.on('data', (data) => {
  49 |       process.stdout.write(`[VITE] ${data}`);
  50 |     });
  51 |     
  52 |     await waitForServer(5173);
  53 |     await new Promise(resolve => setTimeout(resolve, 1000));
  54 |     
  55 |     console.log('⚡ Starting Electron...');
  56 |     const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
  57 |       stdio: 'inherit',
  58 |       shell: true,
  59 |       cwd: path.join(__dirname, '..')
  60 |     });
  61 |     
  62 |     process.on('SIGINT', () => {
  63 |       console.log('\n🛑 Shutting down...');
  64 |       viteProcess.kill('SIGTERM');
  65 |       electronProcess.kill('SIGTERM');
  66 |       setTimeout(() => process.exit(0), 1000);
  67 |     });
  68 |     
  69 |     electronProcess.on('close', (code) => {
  70 |       console.log(`\n📱 Electron exited with code ${code}`);
  71 |       viteProcess.kill('SIGTERM');
  72 |       process.exit(code);
  73 |     });
  74 |     
  75 |     console.log('🎉 Application started successfully!');
  76 |     
  77 |   } catch (error) {
  78 |     console.error('❌ Error starting application:', error.message);
  79 |     process.exit(1);
  80 |   }
  81 | }
  82 | 
  83 | startApp();

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
   2 | import { useTimerStore } from '@/store/timerStore';
   3 | import PlayerSettings from '@/components/PlayerSettings';
   4 | import OverlaySettings from '@/components/OverlaySettings';
   5 | import HotkeySettings from '@/components/HotkeySettings';
   6 | import TimerControls from '@/components/TimerControls';
   7 | 
   8 | const ControlPanel: React.FC = () => {
   9 |   const { 
  10 |     timerData, 
  11 |     overlaySettings, 
  12 |     setOverlayVisible, 
  13 |     isOverlayVisible, 
  14 |     saveToStorage,
  15 |     startTimer,
  16 |     swapTimer,
  17 |     resetAllTimers 
  18 |   } = useTimerStore();
  19 |   
  20 |   const [saving, setSaving] = useState(false);
  21 | 
  22 |   useEffect(() => {
  23 |     const id = setInterval(() => {
  24 |       setSaving(true);
  25 |       saveToStorage().finally(() => setSaving(false));
  26 |     }, 2000);
  27 |     return () => clearInterval(id);
  28 |   }, [saveToStorage]);
  29 | 
  30 |   const handleStartPause = () => {
  31 |     startTimer();
  32 |     setTimeout(() => saveToStorage(), 100);
  33 |   };
  34 | 
  35 |   const handleSwap = () => {
  36 |     swapTimer();
  37 |     setTimeout(() => saveToStorage(), 100);
  38 |   };
  39 | 
  40 |   const handleResetAll = () => {
  41 |     resetAllTimers();
  42 |     setTimeout(() => saveToStorage(), 100);
  43 |   };
  44 | 
  45 |   return (
  46 |     <div className="min-h-screen bg-gray-900 text-gray-200">
  47 |       <header className="border-b border-gray-800 p-4 flex items-center justify-between">
  48 |         <h1 className="text-lg font-semibold">DBD Timer Overlay</h1>
  49 |         <div className="flex items-center gap-2">
  50 |           <button
  51 |             onClick={() => setOverlayVisible(!isOverlayVisible)}
  52 |             className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
  53 |           >
  54 |             {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
  55 |           </button>
  56 |           <span className="text-xs text-gray-400">{saving ? 'Saving…' : ''}</span>
  57 |         </div>
  58 |       </header>
  59 | 
  60 |       <main className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
  61 |         <section className="bg-gray-800 rounded-xl p-4">
  62 |           <h2 className="text-sm font-semibold mb-3 text-gray-300">Timer Controls</h2>
  63 |           <TimerControls />
  64 |         </section>
  65 | 
  66 |         <section className="bg-gray-800 rounded-xl p-4">
  67 |           <h2 className="text-sm font-semibold mb-3 text-gray-300">Players</h2>
  68 |           <PlayerSettings />
  69 |         </section>
  70 | 
  71 |         <section className="bg-gray-800 rounded-xl p-4">
  72 |           <h2 className="text-sm font-semibold mb-3 text-gray-300">Overlay</h2>
  73 |           <OverlaySettings />
  74 |         </section>
  75 | 
  76 |         <section className="bg-gray-800 rounded-xl p-4">
  77 |           <h2 className="text-sm font-semibold mb-3 text-gray-300">Hotkeys</h2>
  78 |           <HotkeySettings />
  79 |         </section>
  80 | 
  81 |         <section className="bg-gray-800 rounded-xl p-4 lg:col-span-2">
  82 |           <h2 className="text-sm font-semibold mb-3 text-gray-300">Quick Actions</h2>
  83 |           <div className="grid grid-cols-3 gap-3">
  84 |             <button
  85 |               onClick={handleStartPause}
  86 |               className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
  87 |             >
  88 |               Start/Pause ({timerData.startHotkey})
  89 |             </button>
  90 |             <button
  91 |               onClick={handleSwap}
  92 |               className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
  93 |             >
  94 |               Swap Timer ({timerData.swapHotkey})
  95 |             </button>
  96 |             <button
  97 |               onClick={handleResetAll}
  98 |               className="py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
  99 |             >
 100 |               Reset All
 101 |             </button>
 102 |           </div>
 103 |         </section>
 104 |       </main>
 105 | 
 106 |       <footer className="p-4 text-center text-xs text-gray-500">
 107 |         Selected: {timerData.selectedTimer === 1 ? timerData.player1Name : timerData.player2Name} • 
 108 |         Status: {timerData.isRunning ? 'Running' : 'Stopped'} • 
 109 |         Hotkeys: {timerData.startHotkey} (Start/Pause) • {timerData.swapHotkey} (Swap)
 110 |       </footer>
 111 |     </div>
 112 |   );
 113 | };
 114 | 
 115 | export default ControlPanel;

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
   1 | import React, { useEffect, useRef, useState } from 'react';
   2 | import { useTimerStore } from '@/store/timerStore';
   3 | import TimerOverlay from '@/components/overlay/TimerOverlay';
   4 | import { PreciseTimer } from '@/utils/timer';
   5 | import type { TimerData } from '@/types';
   6 | 
   7 | const OverlayApp: React.FC = () => {
   8 |   const { loadFromStorage, timerData } = useTimerStore();
   9 | 
  10 |   const [isInitialized, setIsInitialized] = useState(false);
  11 |   const [localTimerData, setLocalTimerData] = useState<TimerData>(timerData);
  12 | 
  13 |   const timer1Ref = useRef<PreciseTimer | null>(null);
  14 |   const timer2Ref = useRef<PreciseTimer | null>(null);
  15 |   const syncingRef = useRef(false);
  16 |   const lastStateRef = useRef({
  17 |     timer1Running: false,
  18 |     timer2Running: false,
  19 |     timer1Value: 0,
  20 |     timer2Value: 0
  21 |   });
  22 | 
  23 |   useEffect(() => {
  24 |     const run = async () => {
  25 |       await loadFromStorage();
  26 |       setIsInitialized(true);
  27 |     };
  28 |     run();
  29 |   }, [loadFromStorage]);
  30 | 
  31 |   useEffect(() => {
  32 |     if (!timer1Ref.current) {
  33 |       timer1Ref.current = new PreciseTimer((value) => {
  34 |         if (!syncingRef.current) {
  35 |           setLocalTimerData((prev) => ({ ...prev, timer1Value: value }));
  36 |         }
  37 |       });
  38 |     }
  39 |     if (!timer2Ref.current) {
  40 |       timer2Ref.current = new PreciseTimer((value) => {
  41 |         if (!syncingRef.current) {
  42 |           setLocalTimerData((prev) => ({ ...prev, timer2Value: value }));
  43 |         }
  44 |       });
  45 |     }
  46 |     return () => {
  47 |       timer1Ref.current?.stop();
  48 |       timer2Ref.current?.stop();
  49 |     };
  50 |   }, []);
  51 | 
  52 |   useEffect(() => {
  53 |     if (!isInitialized) return;
  54 | 
  55 |     setLocalTimerData((prev) => ({
  56 |       ...prev,
  57 |       ...timerData,
  58 |     }));
  59 |   }, [isInitialized, timerData]);
  60 | 
  61 |   useEffect(() => {
  62 |     if (!isInitialized || !timer1Ref.current || !timer2Ref.current) return;
  63 |     const shouldTimer1Run = localTimerData.isRunning && localTimerData.currentTimer === 1;
  64 |     const shouldTimer2Run = localTimerData.isRunning && localTimerData.currentTimer === 2;
  65 |     
  66 |   // Synchroniser timer 1
  67 |   if (shouldTimer1Run && !timer1Ref.current.running) {
  68 |     timer2Ref.current?.pause();
  69 |     timer1Ref.current.start(localTimerData.timer1Value || 0);
  70 |   } else if (!shouldTimer1Run && timer1Ref.current.running) {
  71 |     timer1Ref.current.pause();
  72 |   }
  73 | 
  74 |   // Synchroniser timer 2
  75 |   if (shouldTimer2Run && !timer2Ref.current.running) {
  76 |     timer1Ref.current?.pause();
  77 |     timer2Ref.current.start(localTimerData.timer2Value || 0);
  78 |   } else if (!shouldTimer2Run && timer2Ref.current.running) {
  79 |     timer2Ref.current.pause();
  80 |   }
  81 | 
  82 |   // Reset si nécessaire
  83 |   if (localTimerData.timer1Value === 0 && timer1Ref.current.currentValue !== 0) {
  84 |     timer1Ref.current.reset();
  85 |   }
  86 |   if (localTimerData.timer2Value === 0 && timer2Ref.current.currentValue !== 0) {
  87 |     timer2Ref.current.reset();
  88 |   }
  89 | }, [isInitialized, localTimerData]);
  90 | 
  91 |   useEffect(() => {
  92 |     if (!window.electronAPI) return;
  93 |     
  94 |     const offSync = window.electronAPI.overlay.onDataSync((data) => {
  95 |       syncingRef.current = true;
  96 |       setLocalTimerData(data);
  97 |       syncingRef.current = false;
  98 | 
  99 |       const shouldTimer1Run = data.isRunning && data.currentTimer === 1;
 100 |       const shouldTimer2Run = data.isRunning && data.currentTimer === 2;
 101 | 
 102 |       if (shouldTimer1Run) {
 103 |         timer2Ref.current?.pause();
 104 |         timer1Ref.current?.start(data.timer1Value || 0);
 105 |       } else if (shouldTimer2Run) {
 106 |         timer1Ref.current?.pause();
 107 |         timer2Ref.current?.start(data.timer2Value || 0);
 108 |       } else {
 109 |         timer1Ref.current?.pause();
 110 |         timer2Ref.current?.pause();
 111 |       }
 112 | 
 113 |       if (data.timer1Value === 0 && timer1Ref.current) {
 114 |         timer1Ref.current.reset();
 115 |       }
 116 |       if (data.timer2Value === 0 && timer2Ref.current) {
 117 |         timer2Ref.current.reset();
 118 |       }
 119 | 
 120 |       lastStateRef.current = {
 121 |         timer1Running: shouldTimer1Run,
 122 |         timer2Running: shouldTimer2Run,
 123 |         timer1Value: data.timer1Value,
 124 |         timer2Value: data.timer2Value
 125 |       };
 126 |     });
 127 |     
 128 |     return () => {
 129 |       offSync?.();
 130 |     };
 131 |   }, []);
 132 | 
 133 |   useEffect(() => {
 134 |     const root = document.getElementById('overlay-root');
 135 |     if (root) root.style.background = 'transparent';
 136 |   }, []);
 137 | 
 138 |   if (!isInitialized) {
 139 |     return null;
 140 |   }
 141 | 
 142 |   return <TimerOverlay timerData={localTimerData} />;
 143 | };
 144 | 
 145 | export default OverlayApp;

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
   3 | import { formatTime } from '../utils/timer';
   4 | 
   5 | const TimerControls: React.FC = () => {
   6 |   const {
   7 |     timerData,
   8 |     startTimer,
   9 |     swapTimer,
  10 |     resetAllTimers,
  11 |     setCurrentTimer,
  12 |     saveToStorage
  13 |   } = useTimerStore();
  14 | 
  15 |   const handleStartPause = () => {
  16 |     startTimer();
  17 |     setTimeout(() => saveToStorage(), 100);
  18 |   };
  19 | 
  20 |   const handleSwap = () => {
  21 |     swapTimer();
  22 |     setTimeout(() => saveToStorage(), 100);
  23 |   };
  24 | 
  25 |   const handleResetAll = () => {
  26 |     resetAllTimers();
  27 |     setTimeout(() => saveToStorage(), 100);
  28 |   };
  29 | 
  30 |   const handleTimerSelect = (timer: 1 | 2) => {
  31 |     if (timerData.selectedTimer === timer) return;
  32 |     setCurrentTimer(timer);
  33 |     setTimeout(() => saveToStorage(), 100);
  34 |   };
  35 | 
  36 |   const getTimerStatus = (timerId: 1 | 2) => {
  37 |     const isSelected = timerData.selectedTimer === timerId;
  38 |     const isActive = timerData.currentTimer === timerId && timerData.isRunning;
  39 |     const clickCount = timerId === 1 ? timerData.timer1ClickCount : timerData.timer2ClickCount;
  40 |     
  41 |     if (isActive) return 'RUNNING';
  42 |     if (clickCount === 2) return 'PAUSED';
  43 |     if (clickCount === 1) return 'READY';
  44 |     return 'IDLE';
  45 |   };
  46 | 
  47 |   const getActionButtonText = () => {
  48 |     const selected = timerData.selectedTimer;
  49 |     const clickCount = selected === 1 ? timerData.timer1ClickCount : timerData.timer2ClickCount;
  50 |     
  51 |     if (clickCount === 0) return 'Start';
  52 |     if (clickCount === 1 && timerData.isRunning && timerData.currentTimer === selected) return 'Pause';
  53 |     if (clickCount === 2) return 'Reset';
  54 |     return 'Start';
  55 |   };
  56 | 
  57 |   return (
  58 |     <div className="space-y-4">
  59 |       <div className="grid grid-cols-2 gap-4">
  60 |         <div className="bg-gray-700 rounded-lg p-4">
  61 |           <div className="flex items-center justify-between mb-2">
  62 |             <h3 className="font-medium text-white">{timerData.player1Name}</h3>
  63 |             <span className={`text-xs px-2 py-1 rounded ${
  64 |               timerData.selectedTimer === 1 ? 'bg-purple-600' : 'bg-gray-600'
  65 |             }`}>
  66 |               {getTimerStatus(1)}
  67 |             </span>
  68 |           </div>
  69 |           <div className="text-2xl font-mono mb-3">
  70 |             {formatTime(timerData.timer1Value)}
  71 |           </div>
  72 |           <button
  73 |             onClick={() => handleTimerSelect(1)}
  74 |             className={`w-full py-2 px-3 rounded-md font-medium transition-colors ${
  75 |               timerData.selectedTimer === 1
  76 |                 ? 'bg-purple-600 text-white'
  77 |                 : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
  78 |             }`}
  79 |           >
  80 |             {timerData.selectedTimer === 1 ? 'Selected' : 'Select'}
  81 |           </button>
  82 |         </div>
  83 | 
  84 |         <div className="bg-gray-700 rounded-lg p-4">
  85 |           <div className="flex items-center justify-between mb-2">
  86 |             <h3 className="font-medium text-white">{timerData.player2Name}</h3>
  87 |             <span className={`text-xs px-2 py-1 rounded ${
  88 |               timerData.selectedTimer === 2 ? 'bg-purple-600' : 'bg-gray-600'
  89 |             }`}>
  90 |               {getTimerStatus(2)}
  91 |             </span>
  92 |           </div>
  93 |           <div className="text-2xl font-mono mb-3">
  94 |             {formatTime(timerData.timer2Value)}
  95 |           </div>
  96 |           <button
  97 |             onClick={() => handleTimerSelect(2)}
  98 |             className={`w-full py-2 px-3 rounded-md font-medium transition-colors ${
  99 |               timerData.selectedTimer === 2
 100 |                 ? 'bg-purple-600 text-white'
 101 |                 : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
 102 |             }`}
 103 |           >
 104 |             {timerData.selectedTimer === 2 ? 'Selected' : 'Select'}
 105 |           </button>
 106 |         </div>
 107 |       </div>
 108 | 
 109 |       <div className="grid grid-cols-3 gap-3">
 110 |         <button
 111 |           onClick={handleStartPause}
 112 |           className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
 113 |             timerData.isRunning
 114 |               ? 'bg-red-600 hover:bg-red-700 text-white'
 115 |               : 'bg-green-600 hover:bg-green-700 text-white'
 116 |           }`}
 117 |         >
 118 |           {getActionButtonText()}
 119 |         </button>
 120 |         
 121 |         <button
 122 |           onClick={handleSwap}
 123 |           className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
 124 |         >
 125 |           Swap
 126 |         </button>
 127 |         
 128 |         <button
 129 |           onClick={handleResetAll}
 130 |           className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold"
 131 |         >
 132 |           Reset All
 133 |         </button>
 134 |       </div>
 135 | 
 136 |       <div className="bg-gray-700 rounded-lg p-3">
 137 |         <div className="text-center text-sm text-gray-300">
 138 |           <div className="flex items-center justify-center gap-2 mb-1">
 139 |             <div className={`w-2 h-2 rounded-full ${
 140 |               timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
 141 |             }`} />
 142 |             <span>Currently selected: <strong>{timerData.selectedTimer === 1 ? timerData.player1Name : timerData.player2Name}</strong></span>
 143 |           </div>
 144 |           {timerData.isRunning && (
 145 |             <div className="text-green-400">
 146 |               Timer {timerData.currentTimer} is running
 147 |             </div>
 148 |           )}
 149 |         </div>
 150 |       </div>
 151 |     </div>
 152 |   );
 153 | };
 154 | 
 155 | export default TimerControls;

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
   4 | import { formatTime } from '../../utils/timer';
   5 | import type { TimerData } from '../../types';
   6 | 
   7 | interface TimerOverlayProps {
   8 |   timerData?: TimerData;
   9 | }
  10 | 
  11 | function parseTimeForDisplay(timeString: string) {
  12 |   const [main, centis = '00'] = timeString.split('.');
  13 |   const parts = main.split(':');
  14 |   const hasHours = parts.length === 3;
  15 |   const hasMinutes = parts.length >= 2;
  16 |   
  17 |   if (hasHours) {
  18 |     return {
  19 |       hasHours: true,
  20 |       hours: parts[0].padStart(2, '0'),
  21 |       minutes: parts[1].padStart(2, '0'),
  22 |       seconds: parts[2].padStart(2, '0'),
  23 |       centis: centis.padStart(2, '0')
  24 |     };
  25 |   } else if (hasMinutes) {
  26 |     return {
  27 |       hasHours: false,
  28 |       hasMinutes: true,
  29 |       minutes: parts[0],
  30 |       seconds: parts[1].padStart(2, '0'),
  31 |       centis: centis.padStart(2, '0')
  32 |     };
  33 |   } else {
  34 |     return {
  35 |       hasHours: false,
  36 |       hasMinutes: false,
  37 |       seconds: main.padStart(2, '0'),
  38 |       centis: centis.padStart(2, '0')
  39 |     };
  40 |   }
  41 | }
  42 | 
  43 | const TimerOverlay: React.FC<TimerOverlayProps> = ({ timerData: propTimerData }) => {
  44 |   const { timerData: storeTimerData, overlaySettings } = useTimerStore();
  45 |   const [formattedTime1, setFormattedTime1] = useState('0.00');
  46 |   const [formattedTime2, setFormattedTime2] = useState('0.00');
  47 | 
  48 |   const timerData = propTimerData || storeTimerData;
  49 | 
  50 |   useEffect(() => {
  51 |     setFormattedTime1(formatTime(timerData.timer1Value || 0));
  52 |     setFormattedTime2(formatTime(timerData.timer2Value || 0));
  53 |   }, [timerData.timer1Value, timerData.timer2Value]);
  54 | 
  55 |   const t1 = parseTimeForDisplay(formattedTime1);
  56 |   const t2 = parseTimeForDisplay(formattedTime2);
  57 | 
  58 |   const scaleFactor = overlaySettings.scale / 100;
  59 |   const dragHandleHeight = overlaySettings.locked ? 0 : 30;
  60 | 
  61 |   return (
  62 |     <div
  63 |       style={{
  64 |         width: '520px',
  65 |         height: `${120 + dragHandleHeight}px`,
  66 |         transform: `scale(${scaleFactor})`,
  67 |         transformOrigin: 'top left',
  68 |         background: 'transparent',
  69 |         position: 'relative',
  70 |         userSelect: 'none',
  71 |         WebkitUserSelect: 'none',
  72 |         margin: 0,
  73 |         padding: 0,
  74 |         overflow: 'hidden',
  75 |         fontFamily: 'Poppins, sans-serif'
  76 |       }}
  77 |     >
  78 |       <DragHandle 
  79 |         isVisible={!overlaySettings.locked} 
  80 |         className={overlaySettings.locked ? 'opacity-0 pointer-events-none h-0' : ''}
  81 |       />
  82 |       
  83 |       <div 
  84 |         style={{
  85 |           width: '520px',
  86 |           height: '120px',
  87 |           position: 'absolute',
  88 |           top: overlaySettings.locked ? '0px' : '30px',
  89 |           left: '0px',
  90 |           pointerEvents: overlaySettings.locked ? 'none' : 'auto',
  91 |           background: 'transparent',
  92 |           margin: 0,
  93 |           padding: 0
  94 |         }}
  95 |       >
  96 |         <div className="timer-overlay" style={{
  97 |           display: 'grid',
  98 |           gridTemplateColumns: 'minmax(160px, 1fr) auto minmax(160px, 1fr)',
  99 |           gridTemplateRows: '50px 1fr',
 100 |           width: '520px',
 101 |           height: '120px',
 102 |           position: 'relative'
 103 |         }}>
 104 |           <div className="name left" style={{
 105 |             gridRow: 1,
 106 |             gridColumn: 1,
 107 |             borderBottom: '1px solid rgba(255,255,255,0.32)',
 108 |             background: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
 109 |             display: 'flex',
 110 |             alignItems: 'center',
 111 |             justifyContent: 'center',
 112 |             fontSize: '24px',
 113 |             fontWeight: 500,
 114 |             color: '#FFF',
 115 |             textTransform: 'uppercase',
 116 |             textShadow: '0 0 6px rgba(255,255,255,0.50)',
 117 |             overflow: 'hidden',
 118 |             position: 'relative'
 119 |           }}>
 120 |             <span style={{ 
 121 |               whiteSpace: 'nowrap', 
 122 |               padding: '0 15px',
 123 |               display: 'inline-block'
 124 |             }}>
 125 |               {timerData.player1Name}
 126 |             </span>
 127 |           </div>
 128 | 
 129 |           <div className="score-value" style={{
 130 |             gridRow: 1,
 131 |             gridColumn: 2,
 132 |             borderBottom: '1px solid rgba(255,255,255,0.32)',
 133 |             background: 'linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%)',
 134 |             display: 'flex',
 135 |             alignItems: 'center',
 136 |             justifyContent: 'center',
 137 |             fontSize: '24px',
 138 |             fontWeight: 500,
 139 |             color: '#FFF',
 140 |             padding: '0 15px',
 141 |             textTransform: 'uppercase',
 142 |             minWidth: '90px',
 143 |             maxWidth: '120px'
 144 |           }}>
 145 |             {timerData.player1Score} – {timerData.player2Score}
 146 |           </div>
 147 | 
 148 |           <div className="name right" style={{
 149 |             gridRow: 1,
 150 |             gridColumn: 3,
 151 |             borderBottom: '1px solid rgba(255,255,255,0.32)',
 152 |             background: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
 153 |             display: 'flex',
 154 |             alignItems: 'center',
 155 |             justifyContent: 'center',
 156 |             fontSize: '24px',
 157 |             fontWeight: 500,
 158 |             color: '#FFF',
 159 |             textTransform: 'uppercase',
 160 |             textShadow: '0 0 6px rgba(255,255,255,0.50)',
 161 |             overflow: 'hidden',
 162 |             position: 'relative'
 163 |           }}>
 164 |             <span style={{ 
 165 |               whiteSpace: 'nowrap', 
 166 |               padding: '0 15px',
 167 |               display: 'inline-block'
 168 |             }}>
 169 |               {timerData.player2Name}
 170 |             </span>
 171 |           </div>
 172 | 
 173 |           <div className={`timer left ${timerData.selectedTimer === 1 ? 'active' : ''}`} style={{
 174 |             gridRow: 2,
 175 |             gridColumn: 1,
 176 |             display: 'flex',
 177 |             alignItems: 'center',
 178 |             justifyContent: 'center',
 179 |             fontFamily: 'Monaco, Consolas, "Courier New", monospace',
 180 |             fontSize: '32px',
 181 |             fontWeight: 400,
 182 |             textShadow: '0 0 6px rgba(190,190,190,0.50)',
 183 |             position: 'relative',
 184 |             height: '100%',
 185 |             textAlign: 'center',
 186 |             minWidth: '160px'
 187 |           }}>
 188 |             <span style={{
 189 |               display: 'inline-flex',
 190 |               alignItems: 'center',
 191 |               background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
 192 |               WebkitBackgroundClip: 'text',
 193 |               backgroundClip: 'text',
 194 |               WebkitTextFillColor: 'transparent'
 195 |             }}>
 196 |               {t1.hasHours && (
 197 |                 <>
 198 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.hours}</span>
 199 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 200 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.minutes}</span>
 201 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 202 |                 </>
 203 |               )}
 204 |               {t1.hasMinutes && !t1.hasHours && (
 205 |                 <>
 206 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.minutes}</span>
 207 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 208 |                 </>
 209 |               )}
 210 |               <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.seconds}</span>
 211 |               <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>.</span>
 212 |               <span style={{ display: 'inline-block', width: '18px', textAlign: 'center', fontSize: '28px' }}>{t1.centis}</span>
 213 |             </span>
 214 |             {timerData.selectedTimer === 1 && (
 215 |               <div style={{
 216 |                 content: '',
 217 |                 position: 'absolute',
 218 |                 bottom: 0,
 219 |                 left: 0,
 220 |                 right: 0,
 221 |                 height: '3px',
 222 |                 background: 'linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%)',
 223 |                 animation: 'pulseBar 1.5s ease-in-out infinite'
 224 |               }} />
 225 |             )}
 226 |           </div>
 227 | 
 228 |           <div className={`timer right ${timerData.selectedTimer === 2 ? 'active' : ''}`} style={{
 229 |             gridRow: 2,
 230 |             gridColumn: 3,
 231 |             display: 'flex',
 232 |             alignItems: 'center',
 233 |             justifyContent: 'center',
 234 |             fontFamily: 'Monaco, Consolas, "Courier New", monospace',
 235 |             fontSize: '32px',
 236 |             fontWeight: 400,
 237 |             textShadow: '0 0 6px rgba(190,190,190,0.50)',
 238 |             position: 'relative',
 239 |             height: '100%',
 240 |             textAlign: 'center',
 241 |             minWidth: '160px'
 242 |           }}>
 243 |             <span style={{
 244 |               display: 'inline-flex',
 245 |               alignItems: 'center',
 246 |               background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
 247 |               WebkitBackgroundClip: 'text',
 248 |               backgroundClip: 'text',
 249 |               WebkitTextFillColor: 'transparent'
 250 |             }}>
 251 |               {t2.hasHours && (
 252 |                 <>
 253 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.hours}</span>
 254 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 255 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.minutes}</span>
 256 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 257 |                 </>
 258 |               )}
 259 |               {t2.hasMinutes && !t2.hasHours && (
 260 |                 <>
 261 |                   <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.minutes}</span>
 262 |                   <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
 263 |                 </>
 264 |               )}
 265 |               <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.seconds}</span>
 266 |               <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>.</span>
 267 |               <span style={{ display: 'inline-block', width: '18px', textAlign: 'center', fontSize: '28px' }}>{t2.centis}</span>
 268 |             </span>
 269 |             {timerData.selectedTimer === 2 && (
 270 |               <div style={{
 271 |                 content: '',
 272 |                 position: 'absolute',
 273 |                 bottom: 0,
 274 |                 left: 0,
 275 |                 right: 0,
 276 |                 height: '3px',
 277 |                 background: 'linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%)',
 278 |                 animation: 'pulseBar 1.5s ease-in-out infinite'
 279 |               }} />
 280 |             )}
 281 |           </div>
 282 |         </div>
 283 | 
 284 |         <style>
 285 |           {`
 286 |             @keyframes pulseBar {
 287 |               0%, 100% { 
 288 |                 opacity: 0.8;
 289 |                 transform: scaleY(1);
 290 |               }
 291 |               50% { 
 292 |                 opacity: 1;
 293 |                 transform: scaleY(1.5);
 294 |               }
 295 |             }
 296 |           `}
 297 |         </style>
 298 |       </div>
 299 |     </div>
 300 |   );
 301 | };
 302 | 
 303 | export default TimerOverlay;

```

`dbdoverlaytools-free/src\components\overlay\styles\DefaultStyle.tsx`:

```tsx
   1 | import React, { useMemo } from 'react';
   2 | import { cn } from '@/utils/cn';
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
  15 | function parseChars(s: string) {
  16 |   const [main, centis = '00'] = s.split('.');
  17 |   const parts = main.split(':');
  18 |   const hasHours = parts.length === 3;
  19 |   const hasMinutes = parts.length >= 2;
  20 |   const [h, m, sec] = hasHours ? parts : hasMinutes ? ['0', parts[0], parts[1]] : ['0', '0', parts[0]];
  21 |   const seconds = sec ?? '0';
  22 |   const singleDigitSeconds = seconds.length === 1;
  23 |   return {
  24 |     hasHours,
  25 |     hasMinutes,
  26 |     hours: hasHours ? h : undefined,
  27 |     minutes: hasMinutes ? (hasHours ? m : parts[0]) : undefined,
  28 |     seconds1: seconds[0],
  29 |     seconds2: seconds.length > 1 ? seconds[1] : undefined,
  30 |     dot: '.',
  31 |     colon: ':',
  32 |     colon1: ':',
  33 |     colon2: ':',
  34 |     centis1: centis[0] ?? '0',
  35 |     centis2: centis[1] ?? '0',
  36 |     singleDigitSeconds,
  37 |   };
  38 | }
  39 | 
  40 | const DefaultStyle: React.FC<DefaultStyleProps> = ({
  41 |   player1Name,
  42 |   player2Name,
  43 |   player1Score,
  44 |   player2Score,
  45 |   timer1,
  46 |   timer2,
  47 |   currentTimer,
  48 | }) => {
  49 |   const t1 = useMemo(() => parseChars(timer1), [timer1]);
  50 |   const t2 = useMemo(() => parseChars(timer2), [timer2]);
  51 | 
  52 |   return (
  53 |     <div className="overlay default-style">
  54 |       <div className="header">
  55 |         <div className="name left">
  56 |           <span className="scrolling-text">{player1Name}</span>
  57 |         </div>
  58 |         <div className="score">{player1Score} - {player2Score}</div>
  59 |         <div className="name right">
  60 |           <span className="scrolling-text">{player2Name}</span>
  61 |         </div>
  62 |       </div>
  63 | 
  64 |       <div className="timers">
  65 |         <div className={cn('timer left', currentTimer === 1 && 'active')}>
  66 |           <span className="timer-text">
  67 |             {t1.hasHours && (
  68 |               <>
  69 |                 <span className="timer-char">{t1.hours}</span>
  70 |                 <span className="timer-char separator">{t1.colon1}</span>
  71 |                 <span className="timer-char">{t1.minutes}</span>
  72 |                 <span className="timer-char separator">{t1.colon2}</span>
  73 |               </>
  74 |             )}
  75 |             {t1.hasMinutes && !t1.hasHours && (
  76 |               <>
  77 |                 <span className="timer-char">{t1.minutes}</span>
  78 |                 <span className="timer-char separator">{t1.colon}</span>
  79 |               </>
  80 |             )}
  81 |             <span className="timer-char">{t1.seconds1}</span>
  82 |             {!t1.singleDigitSeconds && t1.seconds2 && (
  83 |               <span className="timer-char">{t1.seconds2}</span>
  84 |             )}
  85 |             <span className="timer-char separator">{t1.dot}</span>
  86 |             <span className="timer-char centis">{t1.centis1}</span>
  87 |             <span className="timer-char centis">{t1.centis2}</span>
  88 |           </span>
  89 |         </div>
  90 | 
  91 |         <div className={cn('timer right', currentTimer === 2 && 'active')}>
  92 |           <span className="timer-text">
  93 |             {t2.hasHours && (
  94 |               <>
  95 |                 <span className="timer-char">{t2.hours}</span>
  96 |                 <span className="timer-char separator">{t2.colon1}</span>
  97 |                 <span className="timer-char">{t2.minutes}</span>
  98 |                 <span className="timer-char separator">{t2.colon2}</span>
  99 |               </>
 100 |             )}
 101 |             {t2.hasMinutes && !t2.hasHours && (
 102 |               <>
 103 |                 <span className="timer-char">{t2.minutes}</span>
 104 |                 <span className="timer-char separator">{t2.colon}</span>
 105 |               </>
 106 |             )}
 107 |             <span className="timer-char">{t2.seconds1}</span>
 108 |             {!t2.singleDigitSeconds && t2.seconds2 && (
 109 |               <span className="timer-char">{t2.seconds2}</span>
 110 |             )}
 111 |             <span className="timer-char separator">{t2.dot}</span>
 112 |             <span className="timer-char centis">{t2.centis1}</span>
 113 |             <span className="timer-char centis">{t2.centis2}</span>
 114 |           </span>
 115 |         </div>
 116 |       </div>
 117 |     </div>
 118 |   );
 119 | };
 120 | 
 121 | export default DefaultStyle;

```

`dbdoverlaytools-free/src\hooks\useGlobalHotkeys.ts`:

```ts
   1 | import { useEffect } from 'react';
   2 | import { useTimerStore } from '../store/timerStore';
   3 | 
   4 | const useGlobalHotkeys = () => {
   5 |   const { 
   6 |     startTimer,
   7 |     swapTimer,
   8 |     saveToStorage 
   9 |   } = useTimerStore();
  10 | 
  11 |   useEffect(() => {
  12 |     if (!window.electronAPI) return;
  13 | 
  14 |     const handleHotkeyPress = (action: string) => {
  15 |       switch (action) {
  16 |         case 'start':
  17 |           startTimer();
  18 |           setTimeout(() => {
  19 |             saveToStorage();
  20 |           }, 100);
  21 |           break;
  22 |           
  23 |         case 'swap':
  24 |           swapTimer();
  25 |           setTimeout(() => {
  26 |             saveToStorage();
  27 |           }, 100);
  28 |           break;
  29 |       }
  30 |     };
  31 | 
  32 |     const cleanup = window.electronAPI.hotkeys.onPressed(handleHotkeyPress);
  33 | 
  34 |     return () => {
  35 |       if (cleanup) {
  36 |         cleanup();
  37 |       }
  38 |     };
  39 |   }, [startTimer, swapTimer, saveToStorage]);
  40 | 
  41 |   const registerHotkeys = async (startKey: string, swapKey: string) => {
  42 |     if (!window.electronAPI) {
  43 |       return;
  44 |     }
  45 | 
  46 |     try {
  47 |       await window.electronAPI.hotkeys.register({
  48 |         start: startKey,
  49 |         swap: swapKey,
  50 |       });
  51 |     } catch (error) {
  52 |       console.error('Failed to register hotkeys:', error);
  53 |     }
  54 |   };
  55 | 
  56 |   return { registerHotkeys };
  57 | };
  58 | 
  59 | export default useGlobalHotkeys;

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
   6 | .drag-handle {
   7 |   -webkit-app-region: drag;
   8 |   cursor: move;
   9 | }
  10 | 
  11 | .slider {
  12 |   -webkit-appearance: none;
  13 |   appearance: none;
  14 |   background: transparent;
  15 |   cursor: pointer;
  16 | }
  17 | 
  18 | .slider::-webkit-slider-track {
  19 |   background: #374151;
  20 |   height: 8px;
  21 |   border-radius: 4px;
  22 | }
  23 | 
  24 | .slider::-webkit-slider-thumb {
  25 |   -webkit-appearance: none;
  26 |   appearance: none;
  27 |   background: #8b5cf6;
  28 |   height: 20px;
  29 |   width: 20px;
  30 |   border-radius: 50%;
  31 |   cursor: pointer;
  32 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  33 |   transition: all 0.2s ease;
  34 | }
  35 | 
  36 | .slider::-webkit-slider-thumb:hover {
  37 |   background: #7c3aed;
  38 |   box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
  39 |   transform: scale(1.1);
  40 | }
  41 | 
  42 | .slider::-moz-range-track {
  43 |   background: #374151;
  44 |   height: 8px;
  45 |   border-radius: 4px;
  46 |   border: none;
  47 | }
  48 | 
  49 | .slider::-moz-range-thumb {
  50 |   background: #8b5cf6;
  51 |   height: 20px;
  52 |   width: 20px;
  53 |   border-radius: 50%;
  54 |   cursor: pointer;
  55 |   border: none;
  56 |   box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  57 | }
  58 | 
  59 | @keyframes pulse-glow {
  60 |   0%, 100% {
  61 |     opacity: 0.6;
  62 |     box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  63 |   }
  64 |   50% {
  65 |     opacity: 1;
  66 |     box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
  67 |   }
  68 | }
  69 | 
  70 | .animate-pulse-glow {
  71 |   animation: pulse-glow 2s ease-in-out infinite;
  72 | }
  73 | 
  74 | .overlay-container {
  75 |   -webkit-user-select: none;
  76 |   user-select: none;
  77 |   -webkit-app-region: no-drag;
  78 |   background: transparent !important;
  79 | }
  80 | 
  81 | * {
  82 |   box-sizing: border-box;
  83 | }
  84 | 
  85 | body {
  86 |   margin: 0;
  87 |   font-family: 'Poppins', sans-serif;
  88 |   -webkit-font-smoothing: antialiased;
  89 |   -moz-osx-font-smoothing: grayscale;
  90 |   color: #ffffff;
  91 |   background: #1a1a1a;
  92 | }
  93 | 
  94 | #root, #overlay-root {
  95 |   width: 100%;
  96 |   height: 100%;
  97 | }
  98 | 
  99 | #overlay-root {
 100 |   background: transparent !important;
 101 |   margin: 0 !important;
 102 |   padding: 0 !important;
 103 | }
 104 | 
 105 | html.overlay-page,
 106 | body.overlay-page {
 107 |   background: transparent !important;
 108 |   margin: 0 !important;
 109 |   padding: 0 !important;
 110 |   overflow: hidden !important;
 111 | }
 112 | 
 113 | .no-drag {
 114 |   -webkit-app-region: no-drag;
 115 | }
 116 | 
 117 | .timer-glow {
 118 |   text-shadow: 0 0 10px currentColor;
 119 | }
 120 | 
 121 | .scrolling-text {
 122 |   white-space: nowrap;
 123 |   overflow: hidden;
 124 | }
 125 | 
 126 | .scrolling-text.active {
 127 |   animation: scroll-text 6s linear infinite;
 128 | }
 129 | 
 130 | @keyframes scroll-text {
 131 |   0% {
 132 |     transform: translateX(80%);
 133 |   }
 134 |   100% {
 135 |     transform: translateX(-80%);
 136 |   }
 137 | }

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
   2 | import type { OverlaySettings, TimerData, TimerId } from '@/types';
   3 | 
   4 | interface TimerStoreState {
   5 |   timerData: TimerData;
   6 |   overlaySettings: OverlaySettings;
   7 |   isOverlayVisible: boolean;
   8 | 
   9 |   loadFromStorage: () => Promise<void>;
  10 |   saveToStorage: () => Promise<void>;
  11 | 
  12 |   setOverlayVisible: (visible: boolean) => Promise<void>;
  13 |   setOverlaySettings: (patch: Partial<OverlaySettings>) => Promise<void>;
  14 | 
  15 |   updateHotkeys: (hotkeys: { start: string; swap: string }) => Promise<void>;
  16 |   updatePlayerName: (id: TimerId, name: string) => void;
  17 |   updatePlayerScore: (id: TimerId, delta: number) => void;
  18 | 
  19 |   startTimer: () => void;
  20 |   swapTimer: () => void;
  21 |   resetAllTimers: () => void;
  22 |   setCurrentTimer: (id: TimerId) => void;
  23 | }
  24 | 
  25 | const defaultOverlaySettings: OverlaySettings = {
  26 |   baseWidth: 520,
  27 |   baseHeight: 120,
  28 |   scale: 100,
  29 |   x: 100,
  30 |   y: 100,
  31 |   locked: false,
  32 |   alwaysOnTop: true,
  33 | };
  34 | 
  35 | const defaultTimerData: TimerData = {
  36 |   player1Name: 'PLAYER 1',
  37 |   player2Name: 'PLAYER 2',
  38 |   player1Score: 0,
  39 |   player2Score: 0,
  40 | 
  41 |   timer1Value: 0,
  42 |   timer2Value: 0,
  43 | 
  44 |   selectedTimer: 1,
  45 |   currentTimer: 1,
  46 |   isRunning: false,
  47 | 
  48 |   timer1ClickCount: 0,
  49 |   timer2ClickCount: 0,
  50 | 
  51 |   startHotkey: 'F1',
  52 |   swapHotkey: 'F2',
  53 |   hotkeys: { start: 'F1', swap: 'F2' },
  54 | };
  55 | 
  56 | function syncToOverlay(data: TimerData) {
  57 |   try {
  58 |     if (window.electronAPI?.timer?.syncData) {
  59 |       window.electronAPI.timer.syncData(data).catch(console.error);
  60 |     }
  61 |   } catch (error) {
  62 |     console.error('Failed to sync to overlay:', error);
  63 |   }
  64 | }
  65 | 
  66 | export const useTimerStore = create<TimerStoreState>((set, get) => ({
  67 |   timerData: defaultTimerData,
  68 |   overlaySettings: defaultOverlaySettings,
  69 |   isOverlayVisible: false,
  70 | 
  71 |   async loadFromStorage() {
  72 |     try {
  73 |       const storedTimer: Partial<TimerData> | null = await window.electronAPI?.store?.get('timerData');
  74 |       const storedOverlay: Partial<OverlaySettings> | null = await window.electronAPI?.store?.get('overlaySettings');
  75 | 
  76 |       const timerData: TimerData = {
  77 |         ...defaultTimerData,
  78 |         ...(storedTimer ?? {}),
  79 |       };
  80 |       timerData.hotkeys = { start: timerData.startHotkey, swap: timerData.swapHotkey };
  81 | 
  82 |       const overlaySettings: OverlaySettings = {
  83 |         ...defaultOverlaySettings,
  84 |         ...(storedOverlay ?? {}),
  85 |       };
  86 | 
  87 |       set({ timerData, overlaySettings });
  88 |     } catch (e) {
  89 |       console.warn('loadFromStorage failed', e);
  90 |     }
  91 |   },
  92 | 
  93 |   async saveToStorage() {
  94 |     const { timerData, overlaySettings } = get();
  95 |     try {
  96 |       await window.electronAPI?.store?.set('timerData', timerData);
  97 |       await window.electronAPI?.store?.set('overlaySettings', overlaySettings);
  98 |     } catch (e) {
  99 |       console.warn('saveToStorage failed', e);
 100 |     }
 101 |   },
 102 | 
 103 |   async setOverlayVisible(visible) {
 104 |     set({ isOverlayVisible: visible });
 105 |     try {
 106 |       if (visible) await window.electronAPI?.overlay?.show();
 107 |       else await window.electronAPI?.overlay?.hide();
 108 |     } catch (e) {
 109 |       console.warn('overlay show/hide failed', e);
 110 |     }
 111 |   },
 112 | 
 113 |   async setOverlaySettings(patch) {
 114 |     const next = { ...get().overlaySettings, ...patch };
 115 |     set({ overlaySettings: next });
 116 |     try {
 117 |       await window.electronAPI?.overlay?.updateSettings(patch);
 118 |     } catch (e) {
 119 |       console.warn('overlay settings update failed', e);
 120 |     }
 121 |   },
 122 | 
 123 |   async updateHotkeys(hotkeys) {
 124 |     set((s) => ({
 125 |       timerData: {
 126 |         ...s.timerData,
 127 |         startHotkey: hotkeys.start,
 128 |         swapHotkey: hotkeys.swap,
 129 |         hotkeys: { ...hotkeys },
 130 |       },
 131 |     }));
 132 | 
 133 |     try {
 134 |       await window.electronAPI?.hotkeys?.register(hotkeys);
 135 |     } catch (e) {
 136 |       console.warn('hotkey register failed', e);
 137 |     }
 138 |   },
 139 | 
 140 |   updatePlayerName(id, name) {
 141 |     set((s) => ({
 142 |       timerData: {
 143 |         ...s.timerData,
 144 |         ...(id === 1 ? { player1Name: name } : { player2Name: name }),
 145 |       },
 146 |     }));
 147 |   },
 148 | 
 149 |   updatePlayerScore(id, delta) {
 150 |     set((s) => {
 151 |       const currentScore = id === 1 ? s.timerData.player1Score : s.timerData.player2Score;
 152 |       const newScore = Math.max(0, currentScore + delta);
 153 |       return {
 154 |         timerData: {
 155 |           ...s.timerData,
 156 |           ...(id === 1 ? { player1Score: newScore } : { player2Score: newScore }),
 157 |         },
 158 |       };
 159 |     });
 160 |   },
 161 | 
 162 |   startTimer() {
 163 |     set((s) => {
 164 |       const data = { ...s.timerData };
 165 |       const selected = data.selectedTimer;
 166 |       const clickCount = selected === 1 ? data.timer1ClickCount : data.timer2ClickCount;
 167 | 
 168 |       if (clickCount === 0) {
 169 |         data.isRunning = true;
 170 |         data.currentTimer = selected;
 171 |         if (selected === 1) {
 172 |           data.timer1ClickCount = 1;
 173 |         } else {
 174 |           data.timer2ClickCount = 1;
 175 |         }
 176 |       } else if (clickCount === 1 && data.isRunning && data.currentTimer === selected) {
 177 |         data.isRunning = false;
 178 |         if (selected === 1) {
 179 |           data.timer1ClickCount = 2;
 180 |         } else {
 181 |           data.timer2ClickCount = 2;
 182 |         }
 183 |       } else if (clickCount === 2) {
 184 |         if (selected === 1) {
 185 |           data.timer1Value = 0;
 186 |           data.timer1ClickCount = 0;
 187 |         } else {
 188 |           data.timer2Value = 0;
 189 |           data.timer2ClickCount = 0;
 190 |         }
 191 |         if (data.currentTimer === selected && data.isRunning) {
 192 |           data.isRunning = false;
 193 |         }
 194 |       } else if (clickCount === 1 && (!data.isRunning || data.currentTimer !== selected)) {
 195 |         const otherTimer: TimerId = selected === 1 ? 2 : 1;
 196 |         if (data.isRunning && data.currentTimer === otherTimer) {
 197 |           if (otherTimer === 1) {
 198 |             data.timer1ClickCount = 2;
 199 |           } else {
 200 |             data.timer2ClickCount = 2;
 201 |           }
 202 |         }
 203 |         data.isRunning = true;
 204 |         data.currentTimer = selected;
 205 |       }
 206 | 
 207 |       syncToOverlay(data);
 208 |       return { timerData: data };
 209 |     });
 210 |   },
 211 | 
 212 |   swapTimer() {
 213 |     set((s) => {
 214 |       const data = { ...s.timerData };
 215 |       data.selectedTimer = data.selectedTimer === 1 ? 2 : 1;
 216 |       
 217 |       syncToOverlay(data);
 218 |       return { timerData: data };
 219 |     });
 220 |   },
 221 | 
 222 |   resetAllTimers() {
 223 |     set((s) => {
 224 |       const data = { ...s.timerData };
 225 |       data.timer1Value = 0;
 226 |       data.timer2Value = 0;
 227 |       data.timer1ClickCount = 0;
 228 |       data.timer2ClickCount = 0;
 229 |       data.isRunning = false;
 230 | 
 231 |       syncToOverlay(data);
 232 |       return { timerData: data };
 233 |     });
 234 |   },
 235 | 
 236 |   setCurrentTimer(id) {
 237 |     set((s) => {
 238 |       const data = { ...s.timerData };
 239 |       data.selectedTimer = id;
 240 | 
 241 |       syncToOverlay(data);
 242 |       return { timerData: data };
 243 |     });
 244 |   },
 245 | }));

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
   1 | export interface TimerData {
   2 |   player1Name: string;
   3 |   player2Name: string;
   4 |   player1Score: number;
   5 |   player2Score: number;
   6 | 
   7 |   timer1Value: number;
   8 |   timer2Value: number;
   9 | 
  10 |   selectedTimer: TimerId;
  11 |   currentTimer: TimerId;
  12 |   isRunning: boolean;
  13 | 
  14 |   timer1ClickCount: number;
  15 |   timer2ClickCount: number;
  16 | 
  17 |   startHotkey: string;
  18 |   swapHotkey: string;
  19 | 
  20 |   hotkeys?: { start: string; swap: string };
  21 | }
  22 | 
  23 | export type TimerId = 1 | 2;
  24 | 
  25 | export interface OverlaySettings {
  26 |   baseWidth: number;
  27 |   baseHeight: number;
  28 |   scale: number;
  29 |   x: number;
  30 |   y: number;
  31 |   locked: boolean;
  32 |   alwaysOnTop: boolean;
  33 |   width?: number;
  34 |   height?: number;
  35 | }
  36 | 
  37 | export interface AppState {
  38 |   timerData: TimerData;
  39 |   overlaySettings: OverlaySettings;
  40 |   isOverlayVisible: boolean;
  41 | }
  42 | 
  43 | export interface IPCResponse {
  44 |   success: boolean;
  45 |   error?: string;
  46 |   data?: any;
  47 | }
  48 | 
  49 | export interface ElectronAPI {
  50 |   store: {
  51 |     get: (key: string) => Promise<any>;
  52 |     set: (key: string, value: any) => Promise<void>;
  53 |   };
  54 |   
  55 |   overlay: {
  56 |     show: () => Promise<IPCResponse>;
  57 |     hide: () => Promise<IPCResponse>;
  58 |     updateSettings: (settings: Partial<OverlaySettings>) => Promise<IPCResponse>;
  59 |     
  60 |     onDataSync: (callback: (data: TimerData) => void) => () => void;
  61 |     onReady: (callback: (isReady: boolean) => void) => () => void;
  62 |   };
  63 |   
  64 |   timer: {
  65 |     syncData: (data: TimerData) => Promise<IPCResponse>;
  66 |   };
  67 |   
  68 |   hotkeys: {
  69 |     register: (hotkeys: { start: string; swap: string }) => Promise<IPCResponse>;
  70 |     onPressed: (callback: (action: 'start' | 'swap') => void) => () => void;
  71 |   };
  72 |   
  73 |   removeAllListeners: () => void;
  74 | }
  75 | 
  76 | declare global {
  77 |   interface Window {
  78 |     electronAPI?: ElectronAPI;
  79 |   }
  80 | }

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
   1 | import { defineConfig } from 'vite';
   2 | import react from '@vitejs/plugin-react';
   3 | import { resolve } from 'path';
   4 | 
   5 | export default defineConfig({
   6 |   plugins: [react()],
   7 |   base: './',
   8 |   resolve: {
   9 |     alias: {
  10 |       '@': resolve(__dirname, 'src'),
  11 |     },
  12 |   },
  13 |   build: {
  14 |     outDir: 'dist',
  15 |     assetsDir: 'assets',
  16 |     emptyOutDir: true,
  17 |     rollupOptions: {
  18 |       input: {
  19 |         main: resolve(__dirname, 'index.html'),
  20 |         overlay: resolve(__dirname, 'overlay.html'),
  21 |       },
  22 |     },
  23 |   },
  24 |   server: {
  25 |     port: 5173,
  26 |     strictPort: true,
  27 |     cors: true,
  28 |   },
  29 | });

```