Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── electron
│   ├── main.mjs
│   ├── preload.cjs
│   └── tsconfig.json
├── index.html
├── overlay.html
├── package.json
├── postcss.config.cjs
├── scripts
│   └── start.js
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── ControlPanel.tsx
│   │   ├── Footer.tsx
│   │   ├── OverlayApp.tsx
│   │   └── overlay
│   │       ├── DragHandle.tsx
│   │       └── TimerOverlay.tsx
│   ├── hooks
│   │   └── useTimer.ts
│   ├── index.css
│   ├── main.tsx
│   ├── overlay.tsx
│   ├── store
│   │   └── timerStore.ts
│   ├── styles
│   │   └── tokens.css
│   ├── themes
│   │   └── default.css
│   ├── types
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   └── preload.d.ts
│   └── utils
│       ├── cn.ts
│       └── timer.ts
├── tailwind.config.cjs
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.mts

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

`dbdoverlaytools-free/electron\main.mjs`:

```mjs
   1 | import { app, BrowserWindow, ipcMain, screen, globalShortcut } from "electron";
   2 | import { join, dirname } from "node:path";
   3 | import { fileURLToPath } from "node:url";
   4 | import Store from "electron-store";
   5 | import { createRequire } from "node:module";
   6 | 
   7 | const require = createRequire(import.meta.url);
   8 | let uIOhook = null;
   9 | const __dirname = dirname(fileURLToPath(import.meta.url));
  10 | const isDev = process.env.NODE_ENV === "development";
  11 | const store = new Store();
  12 | 
  13 | let mainWindow = null;
  14 | let overlayWindow = null;
  15 | let usingUiohook = false;
  16 | 
  17 | // dimensions non-scalées du contenu (hors drag bar)
  18 | let baseDims = { width: 520, height: 120 };
  19 | 
  20 | // hotkeys: codes (uiohook) + labels (affichage & fallback)
  21 | let hotkeys = store.get("hotkeys") || { start: null, swap: null };
  22 | let hotkeysLabel = store.get("hotkeysLabel") || { start: "F1", swap: "F2" };
  23 | 
  24 | // état de capture transactionnelle
  25 | let captureState = null; // { type:'start'|'swap', label:null|string, code:null|number, primaryTimer:any, secondaryTimer:any }
  26 | let captureWaitUntil = 0; // time (ms) jusqu’auquel on ne dispatch pas aux timers (évite side-effects pendant capture)
  27 | 
  28 | // ===== debug =====
  29 | 
  30 | const DEBUG_HK = !!(isDev && process.env.DEBUG_HK === "1"); // logs uiohook off par défaut
  31 | const logHK = (...args) => {
  32 |   if (DEBUG_HK) console.log("[HK]", ...args);
  33 | };
  34 | 
  35 | /* -------------------- utils -------------------- */
  36 | function applyAlwaysOnTop(win, on) {
  37 |   try {
  38 |     win.setAlwaysOnTop(!!on, "screen-saver");
  39 |     win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  40 |     win.setFullScreenable(false);
  41 |   } catch {}
  42 | }
  43 | function sendOverlaySettings() {
  44 |   if (overlayWindow && !overlayWindow.isDestroyed()) {
  45 |     const s = store.get("overlaySettings", {
  46 |       x: 0,
  47 |       y: 0,
  48 |       scale: 100,
  49 |       locked: true,
  50 |       alwaysOnTop: true,
  51 |     });
  52 |     overlayWindow.webContents.send("overlay-settings", s);
  53 |   }
  54 | }
  55 | function recomputeOverlaySize() {
  56 |   if (!overlayWindow || overlayWindow.isDestroyed()) return;
  57 |   const s = store.get("overlaySettings", { scale: 100, locked: true });
  58 |   const dragH = s.locked ? 0 : 30;
  59 |   const scale = (s.scale || 100) / 100;
  60 |   const w = Math.ceil(baseDims.width * scale);
  61 |   const h = Math.ceil((baseDims.height + dragH) * scale);
  62 |   overlayWindow.setContentSize(w, h);
  63 |   sendOverlaySettings();
  64 | }
  65 | function sendHotkeysMode() {
  66 |   if (mainWindow && !mainWindow.isDestroyed()) {
  67 |     mainWindow.webContents.send(
  68 |       "hotkeys-mode",
  69 |       usingUiohook ? "pass-through" : "fallback"
  70 |     );
  71 |   }
  72 | }
  73 | function makeLabelFromBeforeInput(input) {
  74 |   let k = input.key || "";
  75 |   if (/^F\d{1,2}$/.test(k)) return k;
  76 |   if (/^[a-z]$/.test(k)) return k.toUpperCase();
  77 |   if (/^\d$/.test(k)) return k;
  78 |   if (k === " ") return "SPACE";
  79 |   const map = {
  80 |     Escape: "ESC",
  81 |     Tab: "TAB",
  82 |     Enter: "ENTER",
  83 |     Backspace: "BACKSPACE",
  84 |     Shift: "SHIFT",
  85 |     Control: "CTRL",
  86 |     Alt: "ALT",
  87 |     Meta: "META",
  88 |     ArrowUp: "UP",
  89 |     ArrowDown: "DOWN",
  90 |     ArrowLeft: "LEFT",
  91 |     ArrowRight: "RIGHT",
  92 |   };
  93 |   if (map[k]) return map[k];
  94 |   const code = input.code || "";
  95 |   if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
  96 |   if (/^Digit\d$/.test(code)) return code.slice(5);
  97 |   return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
  98 | }
  99 | 
 100 | function clearCaptureTimers() {
 101 |   if (!captureState) return;
 102 |   if (captureState.primaryTimer) {
 103 |     clearTimeout(captureState.primaryTimer);
 104 |     captureState.primaryTimer = null;
 105 |   }
 106 |   if (captureState.secondaryTimer) {
 107 |     clearTimeout(captureState.secondaryTimer);
 108 |     captureState.secondaryTimer = null;
 109 |   }
 110 | }
 111 | 
 112 | function finalizeCapture(reason = "done") {
 113 |   if (!captureState) return;
 114 |   const { type, label, code } = captureState;
 115 |   clearCaptureTimers();
 116 | 
 117 |   logHK("CAPTURE FINALIZE", { reason, type, label, code });
 118 | 
 119 |   // Persistance si on a reçu des infos
 120 |   if (label) {
 121 |     hotkeysLabel = { ...hotkeysLabel, [type]: label };
 122 |     store.set("hotkeysLabel", hotkeysLabel);
 123 |   }
 124 |   if (typeof code === "number") {
 125 |     hotkeys = { ...hotkeys, [type]: code };
 126 |     store.set("hotkeys", hotkeys);
 127 |   }
 128 | 
 129 |   // Notifie le panel uniquement si on a reçu label ou code (sinon on ne change rien à l’UI)
 130 |   if (
 131 |     mainWindow &&
 132 |     !mainWindow.isDestroyed() &&
 133 |     (label || typeof code === "number")
 134 |   ) {
 135 |     const payload = { type };
 136 |     if (label) payload.label = label;
 137 |     if (typeof code === "number") payload.keycode = code;
 138 |     mainWindow.webContents.send("hotkeys-captured", payload);
 139 |   }
 140 | 
 141 |   // Reset capture
 142 |   captureState = null;
 143 |   captureWaitUntil = 0;
 144 | 
 145 |   // Réarmer fallback si nécessaire
 146 |   if (!usingUiohook) refreshHotkeyEngine();
 147 | }
 148 | 
 149 | /* -------------------- windows -------------------- */
 150 | function createMainWindow() {
 151 |   const saved = store.get("windowState") || {};
 152 |   const width = Math.max(saved.width || 1120, 980);
 153 |   const height = Math.max(saved.height || 820, 720);
 154 | 
 155 |   mainWindow = new BrowserWindow({
 156 |     width,
 157 |     height,
 158 |     x: saved.x,
 159 |     y: saved.y,
 160 |     minWidth: 980,
 161 |     minHeight: 720,
 162 |     show: false,
 163 |     autoHideMenuBar: true,
 164 |     webPreferences: {
 165 |       nodeIntegration: false,
 166 |       contextIsolation: true,
 167 |       preload: join(__dirname, "preload.cjs"),
 168 |       devTools: isDev,
 169 |     },
 170 |   });
 171 | 
 172 |   if (isDev) {
 173 |     mainWindow.loadURL("http://localhost:5173");
 174 |     mainWindow.webContents.openDevTools({ mode: "detach" });
 175 |   } else {
 176 |     mainWindow.loadFile(join(__dirname, "../dist/index.html"));
 177 |     mainWindow.webContents.on("before-input-event", (e, input) => {
 178 |       const combo =
 179 |         (input.control || input.meta) &&
 180 |         input.shift &&
 181 |         input.key?.toLowerCase() === "i";
 182 |       if (combo || input.key === "F12") e.preventDefault();
 183 |     });
 184 |   }
 185 | 
 186 |   mainWindow.once("ready-to-show", () => mainWindow.show());
 187 |   mainWindow.on("close", () => {
 188 |     const b = mainWindow.getBounds();
 189 |     store.set("windowState", b);
 190 |   });
 191 |   mainWindow.on("closed", () => {
 192 |     mainWindow = null;
 193 |     if (overlayWindow) overlayWindow.close();
 194 |   });
 195 | }
 196 | 
 197 | function createOverlayWindow() {
 198 |   if (overlayWindow && !overlayWindow.isDestroyed()) {
 199 |     overlayWindow.show();
 200 |     overlayWindow.focus();
 201 |     return;
 202 |   }
 203 |   const display = screen.getPrimaryDisplay().workAreaSize;
 204 |   const s = store.get("overlaySettings", {
 205 |     x: Math.floor(display.width / 2 - 260),
 206 |     y: 100,
 207 |     scale: 100,
 208 |     locked: true,
 209 |     alwaysOnTop: true,
 210 |   });
 211 |   const dragH = s.locked ? 0 : 30;
 212 |   const scale = (s.scale || 100) / 100;
 213 | 
 214 |   overlayWindow = new BrowserWindow({
 215 |     width: Math.ceil(baseDims.width * scale),
 216 |     height: Math.ceil((baseDims.height + dragH) * scale),
 217 |     x: s.x,
 218 |     y: s.y,
 219 |     frame: false,
 220 |     transparent: true,
 221 |     resizable: false,
 222 |     hasShadow: false,
 223 |     skipTaskbar: false,
 224 |     focusable: true,
 225 |     title: "DBD Timer Overlay",
 226 |     acceptFirstMouse: true,
 227 |     backgroundColor: "#00000000",
 228 |     useContentSize: true,
 229 |     webPreferences: {
 230 |       nodeIntegration: false,
 231 |       contextIsolation: true,
 232 |       preload: join(__dirname, "preload.cjs"),
 233 |       backgroundThrottling: false,
 234 |     },
 235 |   });
 236 | 
 237 |   overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
 238 |   applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);
 239 | 
 240 |   const url = isDev
 241 |     ? "http://localhost:5173/overlay.html"
 242 |     : join(__dirname, "../dist/overlay.html");
 243 |   if (isDev) overlayWindow.loadURL(url);
 244 |   else overlayWindow.loadFile(url);
 245 | 
 246 |   overlayWindow.on("closed", () => {
 247 |     overlayWindow = null;
 248 |     if (mainWindow && !mainWindow.isDestroyed())
 249 |       mainWindow.webContents.send("overlay-ready", false);
 250 |   });
 251 |   overlayWindow.on("move", () => {
 252 |     const b = overlayWindow.getBounds();
 253 |     store.set("overlaySettings.x", b.x);
 254 |     store.set("overlaySettings.y", b.y);
 255 |   });
 256 | 
 257 |   overlayWindow.webContents.on("did-finish-load", () => {
 258 |     const data = store.get("timerData") || {
 259 |       player1: { name: "Player 1", score: 0 },
 260 |       player2: { name: "Player 2", score: 0 },
 261 |     };
 262 |     overlayWindow.webContents.send("timer-data-sync", data);
 263 |     sendOverlaySettings();
 264 |     if (mainWindow) mainWindow.webContents.send("overlay-ready", true);
 265 |     setTimeout(() => recomputeOverlaySize(), 50);
 266 |   });
 267 | }
 268 | 
 269 | /* -------------------- IPC -------------------- */
 270 | function setupIPC() {
 271 |   ipcMain.handle("overlay-show", () => {
 272 |     createOverlayWindow();
 273 |     return true;
 274 |   });
 275 |   ipcMain.handle("overlay-hide", () => {
 276 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
 277 |     overlayWindow = null;
 278 |     if (mainWindow && !mainWindow.isDestroyed())
 279 |       mainWindow.webContents.send("overlay-ready", false);
 280 |     return true;
 281 |   });
 282 | 
 283 |   ipcMain.handle("overlay-settings-update", (_evt, settings) => {
 284 |     const current = store.get("overlaySettings", {});
 285 |     const next = { ...current, ...settings };
 286 |     store.set("overlaySettings", next);
 287 |     if (!overlayWindow || overlayWindow.isDestroyed()) return true;
 288 | 
 289 |     if (settings.locked !== undefined) {
 290 |       overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
 291 |       overlayWindow.setFocusable(true); // OBS/Alt-Tab
 292 |     }
 293 |     if (settings.alwaysOnTop !== undefined)
 294 |       applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
 295 |     if (settings.x !== undefined || settings.y !== undefined) {
 296 |       const b = overlayWindow.getBounds();
 297 |       overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y);
 298 |     }
 299 |     if (settings.scale !== undefined || settings.locked !== undefined)
 300 |       recomputeOverlaySize();
 301 |     sendOverlaySettings();
 302 |     return true;
 303 |   });
 304 | 
 305 |   ipcMain.handle("overlay-measure", (_evt, dims) => {
 306 |     if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
 307 |       return false;
 308 |     baseDims = {
 309 |       width: Math.max(1, Math.floor(dims.width)),
 310 |       height: Math.max(1, Math.floor(dims.height)),
 311 |     };
 312 |     recomputeOverlaySize();
 313 |     return true;
 314 |   });
 315 | 
 316 |   // Timer data
 317 |   ipcMain.handle(
 318 |     "timer-data-get",
 319 |     () =>
 320 |       store.get("timerData") || {
 321 |         player1: { name: "Player 1", score: 0 },
 322 |         player2: { name: "Player 2", score: 0 },
 323 |       }
 324 |   );
 325 |   ipcMain.handle("timer-data-set", (_evt, data) => {
 326 |     store.set("timerData", data);
 327 |     if (overlayWindow && !overlayWindow.isDestroyed())
 328 |       overlayWindow.webContents.send("timer-data-sync", data);
 329 |     return true;
 330 |   });
 331 | 
 332 |   // Hotkeys API
 333 |   ipcMain.handle("hotkeys-get", () => ({
 334 |     start: hotkeys.start,
 335 |     swap: hotkeys.swap,
 336 |     startLabel: hotkeysLabel.start,
 337 |     swapLabel: hotkeysLabel.swap,
 338 |     mode: usingUiohook ? "pass-through" : "fallback",
 339 |   }));
 340 | 
 341 |   ipcMain.handle("hotkeys-set", (_evt, hk) => {
 342 |     hotkeys = { ...hotkeys, ...hk }; // codes uiohook si fournis
 343 |     store.set("hotkeys", hotkeys);
 344 |     refreshHotkeyEngine();
 345 |     return true;
 346 |   });
 347 | 
 348 |   // 🚀 capture 100% main-process, transactionnelle (pas de timeout tant qu'aucune touche n'a été frappée)
 349 |   ipcMain.handle("hotkeys-capture", (_evt, type) => {
 350 |     if (!(type === "start" || type === "swap")) {
 351 |       finalizeCapture("cancel");
 352 |       return true;
 353 |     }
 354 | 
 355 |     logHK("CAPTURE BEGIN", {
 356 |       type,
 357 |       mode: usingUiohook ? "pass-through" : "fallback",
 358 |     });
 359 | 
 360 |     // Bloquer le dispatch vers les timers pendant la capture (long pour te laisser le temps)
 361 |     captureWaitUntil = Date.now() + 15000;
 362 | 
 363 |     // Reset/annule capture précédente si elle existe
 364 |     if (captureState) {
 365 |       clearCaptureTimers();
 366 |       captureState = null;
 367 |     }
 368 | 
 369 |     // État de capture : pas de timer court au début; on attend la première frappe
 370 |     captureState = {
 371 |       type,
 372 |       label: null,
 373 |       code: null,
 374 |       primaryTimer: setTimeout(() => {
 375 |         // Annule la capture si l'utilisateur oublie (15s)
 376 |         logHK("CAPTURE PRIMARY TIMEOUT — cancel");
 377 |         finalizeCapture("primary-timeout");
 378 |       }, 15000),
 379 |       secondaryTimer: null,
 380 |     };
 381 | 
 382 |     // focus le panneau
 383 |     try {
 384 |       mainWindow?.focus();
 385 |       logHK("focused mainWindow?", mainWindow?.isFocused());
 386 |     } catch (e) {
 387 |       logHK("focus error", e?.message || e);
 388 |     }
 389 | 
 390 |     // en fallback, libérer les shortcuts pour laisser passer la frappe
 391 |     if (!usingUiohook) {
 392 |       try {
 393 |         globalShortcut.unregisterAll();
 394 |         logHK("fallback: unregistered to let key through");
 395 |       } catch {}
 396 |     }
 397 | 
 398 |     // écouter une fois la prochaine touche (pour le label layout-aware)
 399 |     const once = (event, input) => {
 400 |       if (!captureState) return;
 401 |       if (input.type !== "keyDown" || input.isAutoRepeat) return;
 402 |       logHK("before-input-event keyDown", { key: input.key, code: input.code });
 403 |       const label = makeLabelFromBeforeInput(input);
 404 | 
 405 |       captureState.label = label;
 406 |       hotkeysLabel = { ...hotkeysLabel, [type]: label };
 407 |       store.set("hotkeysLabel", hotkeysLabel);
 408 | 
 409 |       // notifie instantanément le panel (affichage immédiat)
 410 |       mainWindow?.webContents.send("hotkeys-captured", { type, label });
 411 |       logHK("label captured (instant)", { type, label });
 412 | 
 413 |       // Si le code est déjà là -> on finalise; sinon, petite fenêtre pour le laisser arriver
 414 |       if (typeof captureState.code === "number") {
 415 |         finalizeCapture("have both");
 416 |       } else {
 417 |         if (captureState.secondaryTimer)
 418 |           clearTimeout(captureState.secondaryTimer);
 419 |         captureState.secondaryTimer = setTimeout(
 420 |           () => finalizeCapture("after-label-wait"),
 421 |           500
 422 |         );
 423 |       }
 424 | 
 425 |       mainWindow?.webContents.removeListener("before-input-event", once);
 426 |     };
 427 |     mainWindow?.webContents.on("before-input-event", once);
 428 |     logHK("before-input-event listener ARMED");
 429 | 
 430 |     return true;
 431 |   });
 432 | }
 433 | 
 434 | /* -------------------- Hotkeys engines -------------------- */
 435 | function refreshHotkeyEngine() {
 436 |   if (usingUiohook) {
 437 |     logHK("refreshHotkeyEngine: pass-through (no globalShortcut)");
 438 |     return;
 439 |   }
 440 |   try {
 441 |     globalShortcut.unregisterAll();
 442 |     logHK("globalShortcut: unregistered all");
 443 |   } catch {}
 444 |   const RATE = 180;
 445 |   let lastT = 0,
 446 |     lastS = 0;
 447 | 
 448 |   const sKey = hotkeysLabel.start || "F1";
 449 |   const wKey = hotkeysLabel.swap || "F2";
 450 |   logHK("globalShortcut: registering", { start: sKey, swap: wKey });
 451 | 
 452 |   try {
 453 |     globalShortcut.register(sKey, () => {
 454 |       if (Date.now() < captureWaitUntil) {
 455 |         logHK("fallback toggle skipped (capturing)");
 456 |         return;
 457 |       }
 458 |       const now = Date.now();
 459 |       if (now - lastT < RATE) return;
 460 |       lastT = now;
 461 |       logHK("DISPATCH toggle via globalShortcut");
 462 |       overlayWindow?.webContents.send("global-hotkey", { type: "toggle" });
 463 |     });
 464 |   } catch (e) {
 465 |     logHK("register start failed", e?.message || e);
 466 |   }
 467 | 
 468 |   try {
 469 |     globalShortcut.register(wKey, () => {
 470 |       if (Date.now() < captureWaitUntil) {
 471 |         logHK("fallback swap skipped (capturing)");
 472 |         return;
 473 |       }
 474 |       const now = Date.now();
 475 |       if (now - lastS < RATE) return;
 476 |       lastS = now;
 477 |       logHK("DISPATCH swap via globalShortcut");
 478 |       overlayWindow?.webContents.send("global-hotkey", { type: "swap" });
 479 |     });
 480 |   } catch (e) {
 481 |     logHK("register swap failed", e?.message || e);
 482 |   }
 483 | }
 484 | 
 485 | // uiohook global (pass-through)
 486 | function setupUiohook() {
 487 |   try {
 488 |     logHK("Trying to load uiohook-napi…");
 489 |     const lib = require("uiohook-napi");
 490 |     uIOhook = lib.uIOhook;
 491 |     logHK("uiohook loaded OK");
 492 |   } catch (e) {
 493 |     logHK("uiohook FAILED to load -> fallback", e?.message || e);
 494 |     usingUiohook = false;
 495 |     sendHotkeysMode();
 496 |     refreshHotkeyEngine();
 497 |     return;
 498 |   }
 499 | 
 500 |   usingUiohook = true;
 501 |   sendHotkeysMode();
 502 | 
 503 |   let lastToggle = 0;
 504 |   let lastSwap = 0;
 505 |   const RATE = 180;
 506 | 
 507 |   uIOhook.on("keydown", (e) => {
 508 |     logHK("uiohook keydown", {
 509 |       keycode: e.keycode,
 510 |       captureState: !!captureState,
 511 |       now: Date.now(),
 512 |       blockUntil: captureWaitUntil,
 513 |     });
 514 | 
 515 |     // si on est en capture : stocker le code; finaliser si label déjà là, sinon attendre un chouïa
 516 |     if (captureState) {
 517 |       captureState.code = e.keycode;
 518 |       logHK("code captured (uiohook)", {
 519 |         type: captureState.type,
 520 |         code: e.keycode,
 521 |       });
 522 |       if (captureState.label) {
 523 |         finalizeCapture("have both");
 524 |       } else {
 525 |         if (captureState.secondaryTimer)
 526 |           clearTimeout(captureState.secondaryTimer);
 527 |         captureState.secondaryTimer = setTimeout(
 528 |           () => finalizeCapture("after-code-wait"),
 529 |           600
 530 |         );
 531 |       }
 532 |       return;
 533 |     }
 534 | 
 535 |     // normal: déclenchement (pass-through)
 536 |     if (!overlayWindow || overlayWindow.isDestroyed()) return;
 537 |     if (Date.now() < captureWaitUntil) {
 538 |       logHK("DISPATCH BLOCKED (capturing)");
 539 |       return;
 540 |     }
 541 | 
 542 |     const now = Date.now();
 543 |     if (hotkeys.start && e.keycode === hotkeys.start) {
 544 |       if (now - lastToggle < RATE) return;
 545 |       lastToggle = now;
 546 |       logHK("DISPATCH toggle via uiohook");
 547 |       overlayWindow.webContents.send("global-hotkey", { type: "toggle" });
 548 |     } else if (hotkeys.swap && e.keycode === hotkeys.swap) {
 549 |       if (now - lastSwap < RATE) return;
 550 |       lastSwap = now;
 551 |       logHK("DISPATCH swap via uiohook");
 552 |       overlayWindow.webContents.send("global-hotkey", { type: "swap" });
 553 |     }
 554 |   });
 555 | 
 556 |   try {
 557 |     uIOhook.start();
 558 |     logHK("uiohook started");
 559 |   } catch (e) {
 560 |     logHK("uiohook START failed -> fallback", e?.message || e);
 561 |     usingUiohook = false;
 562 |     sendHotkeysMode();
 563 |     refreshHotkeyEngine();
 564 |   }
 565 | }
 566 | 
 567 | /* -------------------- lifecycle -------------------- */
 568 | app.whenReady().then(() => {
 569 |   createMainWindow();
 570 |   setupIPC();
 571 |   setupUiohook();
 572 |   if (isDev) setTimeout(createOverlayWindow, 800);
 573 | });
 574 | app.on("will-quit", () => {
 575 |   try {
 576 |     if (usingUiohook) uIOhook.stop();
 577 |   } catch {}
 578 |   try {
 579 |     globalShortcut.unregisterAll();
 580 |   } catch {}
 581 | });
 582 | app.on("window-all-closed", () => {
 583 |   app.quit();
 584 | });

```

`dbdoverlaytools-free/electron\preload.cjs`:

```cjs
   1 | const { contextBridge, ipcRenderer } = require('electron');
   2 | 
   3 | contextBridge.exposeInMainWorld('api', {
   4 |   overlay: {
   5 |     show: () => ipcRenderer.invoke('overlay-show'),
   6 |     hide: () => ipcRenderer.invoke('overlay-hide'),
   7 |     updateSettings: (s) => ipcRenderer.invoke('overlay-settings-update', s),
   8 |     onReady: (cb) => ipcRenderer.on('overlay-ready', (_, v) => cb(v)),
   9 |     onSettings: (cb) => ipcRenderer.on('overlay-settings', (_, s) => cb(s)),
  10 |     measure: (w, h) => ipcRenderer.invoke('overlay-measure', { width: w, height: h })
  11 |   },
  12 |   timer: {
  13 |     get: () => ipcRenderer.invoke('timer-data-get'),
  14 |     set: (data) => ipcRenderer.invoke('timer-data-set', data),
  15 |     onSync: (cb) => ipcRenderer.on('timer-data-sync', (_, d) => cb(d))
  16 |   },
  17 |   hotkeys: {
  18 |     get: () => ipcRenderer.invoke('hotkeys-get'),
  19 |     set: (hk) => ipcRenderer.invoke('hotkeys-set', hk),
  20 |     capture: (type) => ipcRenderer.invoke('hotkeys-capture', type),
  21 |     onCaptured: (cb) => ipcRenderer.on('hotkeys-captured', (_, p) => cb(p)),
  22 |     on: (cb) => ipcRenderer.on('global-hotkey', (_, payload) => cb(payload)),
  23 |     onMode: (cb) => ipcRenderer.on('hotkeys-mode', (_, mode) => cb(mode))
  24 |   }
  25 | });

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
   2 | <html>
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules'">
   6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   7 |     <title>DBD Timer - Control Panel by Steaxs & Doc</title>
   8 |   </head>
   9 |   <body class="bg-zinc-950 text-zinc-100">
  10 |     <div id="root"></div>
  11 |     <script type="module" src="/src/main.tsx"></script>
  12 |   </body>
  13 | </html>

```

`dbdoverlaytools-free/overlay.html`:

```html
   1 | <!doctype html>
   2 | <html>
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules'">
   6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   7 |     <title>DBD Timer - Overlay</title>
   8 |   </head>
   9 |   <body class="bg-transparent">
  10 |     <div id="root"></div>
  11 |     <script type="module" src="/src/overlay.tsx"></script>
  12 |   </body>
  13 | </html>

```

`dbdoverlaytools-free/package.json`:

```json
   1 | {
   2 |   "name": "dbdoverlaytools-free",
   3 |   "version": "1.0.0",
   4 |   "private": true,
   5 |   "description": "DBD 1v1 Timer Overlay (Free)",
   6 |   "main": "electron/main.mjs",
   7 |   "author": "",
   8 |   "license": "MIT",
   9 |   "type": "commonjs",
  10 |   "scripts": {
  11 |     "dev": "concurrently -k -n VITE,ELECTRON \"vite\" \"wait-on http://localhost:5173 && cross-env NODE_ENV=development electron .\"",
  12 |     "electron:dev": "npm run dev",
  13 |     "build": "vite build && electron-builder",
  14 |     "typecheck": "tsc --noEmit"
  15 |   },
  16 |   "dependencies": {
  17 |     "electron-store": "^9.0.0",
  18 |     "lucide-react": "^0.539.0",
  19 |     "react": "^18.3.1",
  20 |     "react-dom": "^18.3.1",
  21 |     "uiohook-napi": "^1.5.4",
  22 |     "zustand": "^4.5.2"
  23 |   },
  24 |   "devDependencies": {
  25 |     "@types/node": "^20.12.12",
  26 |     "@types/react": "^18.3.3",
  27 |     "@types/react-dom": "^18.3.0",
  28 |     "@vitejs/plugin-react": "^4.3.1",
  29 |     "autoprefixer": "^10.4.19",
  30 |     "concurrently": "^9.0.1",
  31 |     "cross-env": "^7.0.3",
  32 |     "electron": "^30.0.9",
  33 |     "electron-builder": "^24.13.3",
  34 |     "postcss": "^8.4.38",
  35 |     "tailwindcss": "^3.4.7",
  36 |     "typescript": "^5.5.4",
  37 |     "vite": "^5.4.19",
  38 |     "wait-on": "^7.2.0"
  39 |   }
  40 | }

```

`dbdoverlaytools-free/postcss.config.cjs`:

```cjs
   1 | module.exports = {
   2 |   plugins: {
   3 |     tailwindcss: {},
   4 |     autoprefixer: {},
   5 |   },
   6 | };

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
   1 | import React from 'react';
   2 | import ControlPanel from './components/ControlPanel';
   3 | 
   4 | const App: React.FC = () => {
   5 |   return (
   6 |     <div className="min-h-dvh bg-[#0A0A0A] text-white flex flex-col">
   7 |       <main className="flex-1">
   8 |         <div className="mx-auto max-w-6xl p-6">
   9 |           <header className="mb-6 text-center">
  10 |             <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">
  11 |               You are not logged in
  12 |             </div>
  13 |             <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#B579FF]">
  14 |               DBD OVERLAY TOOLS
  15 |             </h1>
  16 |           </header>
  17 | 
  18 |           <ControlPanel />
  19 |         </div>
  20 |       </main>
  21 |     </div>
  22 |   );
  23 | };
  24 | 
  25 | export default App;

```

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | import React, { useEffect, useState } from "react";
   2 | 
   3 | type HKGet = {
   4 |   start: number | null;
   5 |   swap: number | null;
   6 |   startLabel?: string;
   7 |   swapLabel?: string;
   8 | };
   9 | 
  10 | const ControlPanel: React.FC = () => {
  11 |   // Overlay
  12 |   const [overlayOn, setOverlayOn] = useState(false);
  13 |   const [locked, setLocked] = useState(true);
  14 |   const [scale, setScale] = useState(100);
  15 | 
  16 |   // Players
  17 |   const [players, setPlayers] = useState({
  18 |     player1: { name: "PLAYER 1", score: 0 },
  19 |     player2: { name: "PLAYER 2", score: 0 },
  20 |   });
  21 | 
  22 |   // Hotkeys
  23 |   const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
  24 |     start: "F1",
  25 |     swap: "F2",
  26 |   });
  27 |   const [capturing, setCapturing] = useState<null | "start" | "swap">(null);
  28 | 
  29 |   useEffect(() => {
  30 |     window.api.timer.get().then((d) => {
  31 |       if (d?.player1 && d?.player2) setPlayers(d);
  32 |     });
  33 | 
  34 |     window.api.hotkeys.get().then((h: HKGet) => {
  35 |       setHkLabels({ start: h.startLabel || "F1", swap: h.swapLabel || "F2" });
  36 |     });
  37 | 
  38 |     window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
  39 |     window.api.overlay.onSettings((s: any) => {
  40 |       if (typeof s.locked === "boolean") setLocked(!!s.locked);
  41 |       if (typeof s.scale === "number") setScale(s.scale);
  42 |     });
  43 | 
  44 |     window.api.timer.onSync((d: any) => {
  45 |       if (d?.player1 && d?.player2) setPlayers(d);
  46 |     });
  47 | 
  48 |     window.api.hotkeys.onCaptured(
  49 |       (p: {
  50 |         type: "start" | "swap";
  51 |         keycode?: number | null;
  52 |         label?: string;
  53 |       }) => {
  54 |         if (p.label) setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
  55 |         setCapturing(null);
  56 |       }
  57 |     );
  58 | 
  59 |     // Always on top (UI toggle removed)
  60 |     window.api.overlay.updateSettings({ alwaysOnTop: true });
  61 |   }, []);
  62 | 
  63 |   // Helpers
  64 |   const savePlayers = (next: typeof players) => {
  65 |     setPlayers(next);
  66 |     window.api.timer.set(next);
  67 |   };
  68 | 
  69 |   const onOverlayToggle = async (checked: boolean) => {
  70 |     setOverlayOn(checked);
  71 |     if (checked) await window.api.overlay.show();
  72 |     else await window.api.overlay.hide();
  73 |   };
  74 | 
  75 |   const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
  76 |     const v = Number(e.target.value);
  77 |     setScale(v);
  78 |     window.api.overlay.updateSettings({ scale: v });
  79 |   };
  80 | 
  81 |   const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
  82 |     const v = e.target.checked;
  83 |     setLocked(v);
  84 |     window.api.overlay.updateSettings({ locked: v });
  85 |   };
  86 | 
  87 |   const handleResetAll = () => {
  88 |     const next = {
  89 |       ...players,
  90 |       player1: { ...players.player1, score: 0 },
  91 |       player2: { ...players.player2, score: 0 },
  92 |     };
  93 |     savePlayers(next);
  94 |   };
  95 | 
  96 |   return (
  97 |     <div className="mx-auto max-w-5xl p-6 text-zinc-100">
  98 |       {/* Header */}
  99 |       <header className="mb-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 flex items-center justify-between">
 100 |         <div>
 101 |           <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">
 102 |             1v1 Overlay
 103 |           </div>
 104 |           <h1 className="text-xl font-semibold tracking-tight">
 105 |             DBD Overlay Tools
 106 |           </h1>
 107 |         </div>
 108 | 
 109 |         {/* iOS toggle + status */}
 110 |         <div className="flex items-center gap-3">
 111 |           <span
 112 |             className={`text-sm font-medium ${
 113 |               overlayOn
 114 |                 ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,.8)]"
 115 |                 : "text-zinc-400"
 116 |             }`}
 117 |           >
 118 |             {overlayOn ? "Overlay Active" : "Overlay Hidden"}
 119 |           </span>
 120 |           <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
 121 |             <input
 122 |               type="checkbox"
 123 |               className="peer sr-only"
 124 |               checked={overlayOn}
 125 |               onChange={(e) => onOverlayToggle(e.target.checked)}
 126 |             />
 127 |             <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-emerald-500/70" />
 128 |             <span className="absolute h-5 w-5 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6" />
 129 |           </label>
 130 |         </div>
 131 |       </header>
 132 | 
 133 |       <div className="scroll-thin pr-1">
 134 |         {/* Hotkeys */}
 135 |         <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
 136 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 137 |             <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 138 |               Start/Stop/Reset Key
 139 |             </div>
 140 |             <button
 141 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 142 |                 capturing === "start"
 143 |                   ? "bg-violet-600"
 144 |                   : "bg-zinc-800 hover:bg-zinc-700"
 145 |               }`}
 146 |               onClick={() => {
 147 |                 setCapturing("start");
 148 |                 window.api.hotkeys.capture("start");
 149 |               }}
 150 |             >
 151 |               {capturing === "start" ? "Press a key…" : hkLabels.start}
 152 |             </button>
 153 |           </div>
 154 | 
 155 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 156 |             <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 157 |               Swap Timer Key
 158 |             </div>
 159 |             <button
 160 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 161 |                 capturing === "swap"
 162 |                   ? "bg-violet-600"
 163 |                   : "bg-zinc-800 hover:bg-zinc-700"
 164 |               }`}
 165 |               onClick={() => {
 166 |                 setCapturing("swap");
 167 |                 window.api.hotkeys.capture("swap");
 168 |               }}
 169 |             >
 170 |               {capturing === "swap" ? "Press a key…" : hkLabels.swap}
 171 |             </button>
 172 |           </div>
 173 |         </section>
 174 | 
 175 |         {/* Players */}
 176 |         <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
 177 |           <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 178 |             <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">
 179 |               Player 1
 180 |             </div>
 181 |             <input
 182 |               className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 183 |               value={players.player1.name}
 184 |               onChange={(e) =>
 185 |                 savePlayers({
 186 |                   ...players,
 187 |                   player1: { ...players.player1, name: e.target.value },
 188 |                 })
 189 |               }
 190 |             />
 191 |             <div className="text-xs text-zinc-400">Score</div>
 192 |             <div className="mt-2 flex items-center gap-2">
 193 |               <button
 194 |                 className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 195 |                 onClick={() =>
 196 |                   savePlayers({
 197 |                     ...players,
 198 |                     player1: {
 199 |                       ...players.player1,
 200 |                       score: Math.max(0, players.player1.score - 1),
 201 |                     },
 202 |                   })
 203 |                 }
 204 |               >
 205 |                 −1
 206 |               </button>
 207 |               <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">
 208 |                 {players.player1.score}
 209 |               </div>
 210 |               <button
 211 |                 className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 212 |                 onClick={() =>
 213 |                   savePlayers({
 214 |                     ...players,
 215 |                     player1: {
 216 |                       ...players.player1,
 217 |                       score: players.player1.score + 1,
 218 |                     },
 219 |                   })
 220 |                 }
 221 |               >
 222 |                 +1
 223 |               </button>
 224 |             </div>
 225 |           </div>
 226 | 
 227 |           <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 228 |             <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">
 229 |               Player 2
 230 |             </div>
 231 |             <input
 232 |               className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 233 |               value={players.player2.name}
 234 |               onChange={(e) =>
 235 |                 savePlayers({
 236 |                   ...players,
 237 |                   player2: { ...players.player2, name: e.target.value },
 238 |                 })
 239 |               }
 240 |             />
 241 |             <div className="text-xs text-zinc-400">Score</div>
 242 |             <div className="mt-2 flex items-center gap-2">
 243 |               <button
 244 |                 className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 245 |                 onClick={() =>
 246 |                   savePlayers({
 247 |                     ...players,
 248 |                     player2: {
 249 |                       ...players.player2,
 250 |                       score: Math.max(0, players.player2.score - 1),
 251 |                     },
 252 |                   })
 253 |                 }
 254 |               >
 255 |                 −1
 256 |               </button>
 257 |               <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">
 258 |                 {players.player2.score}
 259 |               </div>
 260 |               <button
 261 |                 className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 262 |                 onClick={() =>
 263 |                   savePlayers({
 264 |                     ...players,
 265 |                     player2: {
 266 |                       ...players.player2,
 267 |                       score: players.player2.score + 1,
 268 |                     },
 269 |                   })
 270 |                 }
 271 |               >
 272 |                 +1
 273 |               </button>
 274 |             </div>
 275 |           </div>
 276 |         </section>
 277 | 
 278 |         {/* Global actions */}
 279 |         <div className="mb-6 flex justify-center">
 280 |           <button
 281 |             className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2"
 282 |             onClick={handleResetAll}
 283 |           >
 284 |             Reset all timers & scores
 285 |           </button>
 286 |         </div>
 287 | 
 288 |         {/* Overlay Settings (no always-on-top toggle) */}
 289 |         <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 290 |           <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
 291 |             Overlay Settings
 292 |           </h2>
 293 | 
 294 |           <div className="mb-6">
 295 |             <div className="mb-2 flex items-center justify-between text-sm">
 296 |               <span>Scale</span>
 297 |               <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
 298 |             </div>
 299 |             <input
 300 |               type="range"
 301 |               min={50}
 302 |               max={200}
 303 |               value={scale}
 304 |               onChange={onScale}
 305 |               className="w-full [accent-color:#5AC8FF]"
 306 |             />
 307 |           </div>
 308 | 
 309 |           <div className="grid grid-cols-1">
 310 |             <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
 311 |               <span className="text-sm">
 312 |                 Lock Overlay Position <span className="opacity-50">🔓</span>
 313 |               </span>
 314 |               <input
 315 |                 type="checkbox"
 316 |                 checked={locked}
 317 |                 onChange={onLock}
 318 |                 className="h-5 w-9 accent-violet-500"
 319 |               />
 320 |             </label>
 321 |           </div>
 322 | 
 323 |           <div
 324 |             className={`mt-4 rounded-lg border p-3 text-sm ${
 325 |               locked
 326 |                 ? "border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]"
 327 |                 : "border-violet-500/40 bg-violet-500/10 text-violet-300"
 328 |             }`}
 329 |           >
 330 |             {locked
 331 |               ? "Overlay is locked – clicks will go through."
 332 |               : "Overlay is unlocked – drag the purple bar to reposition."}
 333 |           </div>
 334 |         </section>
 335 | 
 336 |         {/* Discord CTA — Premium overlays */}
 337 |         <section className="mt-8 relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-emerald-500/10 p-5">
 338 |           <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-violet-500/30" />
 339 |           <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/20" />
 340 |           <div className="relative">
 341 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
 342 |               👑 Premium Overlays
 343 |             </div>
 344 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
 345 |               Unlock more overlays & tools
 346 |             </h3>
 347 |             <p className="mt-2 text-sm text-zinc-200">
 348 |               Join our Discord to get the premium version: <b>killer streaks</b>
 349 |               , <b>survivor streaks</b>, <b>win/loss counter</b>,{" "}
 350 |               <b>tournament overlay</b>, and more!
 351 |             </p>
 352 | 
 353 |             <a
 354 |               href="http://discord.com/invite/aVdT8rRJKc"
 355 |               target="_blank"
 356 |               rel="noreferrer"
 357 |               className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
 358 |             >
 359 |               Join the Discord
 360 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 361 |                 <path
 362 |                   d="M7 17L17 7M17 7H8M17 7v9"
 363 |                   stroke="currentColor"
 364 |                   strokeWidth="1.8"
 365 |                   strokeLinecap="round"
 366 |                   strokeLinejoin="round"
 367 |                 />
 368 |               </svg>
 369 |             </a>
 370 |           </div>
 371 |         </section>
 372 | 
 373 |         <section className="mt-6 relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-tr from-cyan-400/10 via-sky-500/10 to-indigo-500/10 p-5">
 374 |           <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full blur-3xl bg-cyan-400/30" />
 375 |           <div className="relative">
 376 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
 377 |               🎨 ReShade Filters
 378 |             </div>
 379 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
 380 |               GET STEAXS RESHADES
 381 |             </h3>
 382 |             <p className="mt-2 text-sm text-zinc-200">
 383 |               Competitive ReShade presets tailored for Dead by Daylight. Sharper
 384 |               visibility, clean colors, and a consistent look across maps.
 385 |             </p>
 386 |             <a
 387 |               href="https://discord.com/invite/6RHPNNVtKw"
 388 |               target="_blank"
 389 |               rel="noreferrer"
 390 |               className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
 391 |             >
 392 |               Get the Presets
 393 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 394 |                 <path
 395 |                   d="M7 17L17 7M17 7H8M17 7v9"
 396 |                   stroke="currentColor"
 397 |                   strokeWidth="1.8"
 398 |                   strokeLinecap="round"
 399 |                   strokeLinejoin="round"
 400 |                 />
 401 |               </svg>
 402 |             </a>
 403 |           </div>
 404 |         </section>
 405 |         {/* Footer */}
 406 |         <footer className="mt-4">
 407 |           <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-300">
 408 |             <div className="uppercase tracking-wider">
 409 |               © BY <b>STEAXS</b> &amp; <b>DOC</b> — 2025
 410 |             </div>
 411 |           </div>
 412 |         </footer>
 413 |       </div>
 414 |     </div>
 415 |   );
 416 | };
 417 | 
 418 | export default ControlPanel;

```

`dbdoverlaytools-free/src\components\Footer.tsx`:

```tsx
   1 | export default function Footer(){
   2 |   return (
   3 |     <footer className="mt-8">
   4 |       <div className="mx-auto max-w-5xl card px-4 py-3 text-center text-zinc-400">
   5 |         <span className="uppercase tracking-wider">
   6 |           © by <b>DOC</b> & <b>STEAXS</b> — 2025
   7 |         </span>
   8 |       </div>
   9 |     </footer>
  10 |   );
  11 | }

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
   1 | import React from 'react'
   2 | import { useTimerStore } from '@/store/timerStore'
   3 | import { formatMillisDynamic } from '@/utils/timer'
   4 | 
   5 | type TD = { player1:{name:string,score:number}, player2:{name:string,score:number} }
   6 | 
   7 | function splitForTheme(fmt: string) {
   8 |   // support "SS.CC" ou "M:SS.CC"
   9 |   const arr: { ch: string; sep?: boolean }[] = []
  10 |   for (let i=0;i<fmt.length;i++){
  11 |     const ch = fmt[i]
  12 |     if (ch === ':' || ch === '.') arr.push({ ch, sep: true })
  13 |     else arr.push({ ch })
  14 |   }
  15 |   return arr
  16 | }
  17 | 
  18 | export default function TimerOverlay() {
  19 |   const [players, setPlayers] = React.useState<TD>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}})
  20 |   const active = useTimerStore(s=>s.active)
  21 |   const status = useTimerStore(s=>s.status)
  22 |   const elapsed = useTimerStore(s=>s.elapsed)
  23 | 
  24 |   const [locked, setLocked] = React.useState(false)
  25 |   const [scale, setScale] = React.useState(100)
  26 | 
  27 |   // IPC: names/scores only
  28 |   React.useEffect(() => {
  29 |     (async () => setPlayers(await window.api.timer.get()))()
  30 |     window.api.timer.onSync((d:any)=>setPlayers(d))
  31 |   }, [])
  32 | 
  33 |   // Receive overlay settings (lock + scale)
  34 |   React.useEffect(() => {
  35 |     window.api.overlay.onSettings((s:any) => {
  36 |       setLocked(!!s.locked)
  37 |       setScale(s.scale || 100)
  38 |     })
  39 |   }, [])
  40 | 
  41 |   // Hotkeys globales (venant du main via uiohook)
  42 |   React.useEffect(() => {
  43 |     const handler = (p:any) => {
  44 |       const api = useTimerStore.getState()
  45 |       if (p?.type === 'toggle') api.toggle()
  46 |       else if (p?.type === 'swap') api.select(api.active === 1 ? 2 : 1)
  47 |     }
  48 |     window.api.hotkeys.on(handler)
  49 |   }, [])
  50 | 
  51 |   // rAF tick
  52 |   const [, setTick] = React.useState(0)
  53 |   React.useEffect(() => {
  54 |     let raf = 0
  55 |     const loop = () => { setTick(t => (t+1)&1023); raf = requestAnimationFrame(loop) }
  56 |     raf = requestAnimationFrame(loop)
  57 |     return () => cancelAnimationFrame(raf)
  58 |   }, [])
  59 | 
  60 |   // Mesure DOM non-scalée (offsetWidth/Height ignorent transform)
  61 |   React.useLayoutEffect(() => {
  62 |     const el = document.getElementById('timerContainer')
  63 |     if (!el) return
  64 |     const measure = () => {
  65 |       const w = el.offsetWidth
  66 |       const h = el.offsetHeight
  67 |       window.api.overlay.measure(w, h)
  68 |     }
  69 |     // fonts prêtes → mesurer
  70 |     // @ts-ignore
  71 |     if (document.fonts?.ready) {
  72 |       // @ts-ignore
  73 |       document.fonts.ready.then(() => { measure(); setTimeout(measure, 50) })
  74 |     }
  75 |     measure()
  76 |     window.addEventListener('resize', measure)
  77 |     return () => window.removeEventListener('resize', measure)
  78 |   }, [players.player1.name, players.player2.name])
  79 | 
  80 |   const t1 = splitForTheme(formatMillisDynamic(elapsed(1)))
  81 |   const t2 = splitForTheme(formatMillisDynamic(elapsed(2)))
  82 | 
  83 |   const p1Scroll = players.player1.name.length > 16
  84 |   const p2Scroll = players.player2.name.length > 16
  85 | 
  86 |   const s = (scale || 100)/100
  87 | 
  88 |   return (
  89 |     // wrapper extérieur = dimension exacte *après* zoom → pas de scroll
  90 |     <div
  91 |       className="pointer-events-none select-none"
  92 |       style={{ width: Math.round(520*s), height: Math.round((120 + (locked?0:30))*s), overflow:'hidden' }}
  93 |     >
  94 |       {/* Drag handle (visible quand unlock) */}
  95 |       <div className={`drag-handle ${locked ? '' : 'visible'}`}>
  96 |         Drag to move
  97 |       </div>
  98 | 
  99 |       {/* Coins carrés: pas de rounded ni border */}
 100 |       {/* Zoom par transform sur le contenu interne */}
 101 |       <div style={{ transform:`scale(${s})`, transformOrigin:'top left', width:520, height:120 }}>
 102 |         <div className="timer-overlay" id="timerContainer">
 103 |           {/* Noms + score */}
 104 |           <div className={`name left ${p1Scroll ? 'scrolling' : ''}`}>
 105 |             <span className="name-scroll">{players.player1.name || 'PLAYER 1'}</span>
 106 |           </div>
 107 |           <div className="score-value">
 108 |             {players.player1.score} – {players.player2.score}
 109 |           </div>
 110 |           <div className={`name right ${p2Scroll ? 'scrolling' : ''}`}>
 111 |             <span className="name-scroll">{players.player2.name || 'PLAYER 2'}</span>
 112 |           </div>
 113 | 
 114 |           {/* Timers */}
 115 |           <div className={`timer left ${active===1 ? 'active' : ''}`} aria-label={status[1]}>
 116 |             <span className="timer-text dbd-digits">
 117 |               {t1.map((c, i) => (
 118 |                 <span key={i} className={`timer-char ${c.sep ? 'separator' : ''}`}>{c.ch}</span>
 119 |               ))}
 120 |             </span>
 121 |           </div>
 122 |           <div className={`timer right ${active===2 ? 'active' : ''}`} aria-label={status[2]}>
 123 |             <span className="timer-text dbd-digits">
 124 |               {t2.map((c, i) => (
 125 |                 <span key={i} className={`timer-char ${c.sep ? 'separator' : ''}`}>{c.ch}</span>
 126 |               ))}
 127 |             </span>
 128 |           </div>
 129 |         </div>
 130 |       </div>
 131 |     </div>
 132 |   )
 133 | }

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
   1 | @tailwind base;
   2 | @tailwind components;
   3 | @tailwind utilities;
   4 | 
   5 | .dbd-digits {
   6 |   font-variant-numeric: tabular-nums;
   7 |   -moz-font-feature-settings: "tnum";
   8 |   -webkit-font-feature-settings: "tnum";
   9 |   font-feature-settings: "tnum";
  10 |   letter-spacing: 0.02em;
  11 | }

```

`dbdoverlaytools-free/src\main.tsx`:

```tsx
   1 | import React from 'react'
   2 | import ReactDOM from 'react-dom/client'
   3 | import './index.css'
   4 | import ControlPanel from './components/ControlPanel'
   5 | 
   6 | function useTimerData() {
   7 |   const [data, setData] = React.useState<{player1:{name:string,score:number}, player2:{name:string,score:number}}>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}});
   8 |   React.useEffect(() => {
   9 |     (async () => setData(await window.api.timer.get()))();
  10 |     const off = window.api.timer.onSync((d:any) => setData(d));
  11 |     return () => { /* ipcRenderer removes automatically on reload */ };
  12 |   }, []);
  13 |   const commit = (next:any) => { setData(next); window.api.timer.set(next); };
  14 |   return [data, commit] as const;
  15 | }
  16 | 
  17 | function NumberField(props:{value:number,onChange:(v:number)=>void}) {
  18 |   return (
  19 |     <div className="flex items-center gap-2">
  20 |       <button className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700" onClick={()=>props.onChange(props.value-1)}>-</button>
  21 |       <div className="min-w-10 text-center">{props.value}</div>
  22 |       <button className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700" onClick={()=>props.onChange(props.value+1)}>+</button>
  23 |     </div>
  24 |   )
  25 | }
  26 | 
  27 | function App() {
  28 |   const [data, setData] = useTimerData();
  29 |   const [overlayOn, setOverlayOn] = React.useState(false);
  30 |   const [locked, setLocked] = React.useState(false);
  31 |   const [scale, setScale] = React.useState(100);
  32 | 
  33 |   React.useEffect(() => {
  34 |     window.api.overlay.onReady((v:boolean) => setOverlayOn(v));
  35 |   }, []);
  36 | 
  37 |   return (
  38 |     <div className="p-6 max-w-xl mx-auto font-ui">
  39 |       <h1 className="text-2xl font-semibold mb-4">DBD 1v1 Timer — Control Panel</h1>
  40 | 
  41 |       <div className="grid grid-cols-2 gap-6">
  42 |         <div className="space-y-3">
  43 |           <label className="block text-sm text-zinc-400">Player 1 name</label>
  44 |           <input className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
  45 |             value={data.player1.name}
  46 |             onChange={e=>setData({...data, player1:{...data.player1, name:e.target.value}})} />
  47 |           <label className="block text-sm text-zinc-400">Score</label>
  48 |           <NumberField value={data.player1.score} onChange={(v)=>setData({...data, player1:{...data.player1, score:Math.max(0,v)}})} />
  49 |         </div>
  50 | 
  51 |         <div className="space-y-3">
  52 |           <label className="block text-sm text-zinc-400">Player 2 name</label>
  53 |           <input className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
  54 |             value={data.player2.name}
  55 |             onChange={e=>setData({...data, player2:{...data.player2, name:e.target.value}})} />
  56 |           <label className="block text-sm text-zinc-400">Score</label>
  57 |           <NumberField value={data.player2.score} onChange={(v)=>setData({...data, player2:{...data.player2, score:Math.max(0,v)}})} />
  58 |         </div>
  59 |       </div>
  60 | 
  61 |       <div className="mt-6 flex items-center gap-3">
  62 |         {overlayOn ? (
  63 |           <button className="px-3 py-2 rounded bg-red-700 hover:bg-red-600" onClick={()=>window.api.overlay.hide()}>Hide Overlay</button>
  64 |         ) : (
  65 |           <button className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-600" onClick={()=>window.api.overlay.show()}>Show Overlay</button>
  66 |         )}
  67 |         <label className="inline-flex items-center gap-2">
  68 |           <input type="checkbox" checked={locked} onChange={(e)=>{setLocked(e.target.checked); window.api.overlay.updateSettings({locked:e.target.checked})}} />
  69 |           <span>Lock (click-through)</span>
  70 |         </label>
  71 |         <label className="inline-flex items-center gap-2">
  72 |           <span>Scale</span>
  73 |           <input type="range" min={50} max={200} value={scale} onChange={e=>{const v=Number(e.target.value); setScale(v); window.api.overlay.updateSettings({scale:v})}} />
  74 |         </label>
  75 |         <label className="inline-flex items-center gap-2">
  76 |           <input type="checkbox" defaultChecked onChange={(e)=>window.api.overlay.updateSettings({alwaysOnTop:e.target.checked})}/>
  77 |           <span>Always on top</span>
  78 |         </label>
  79 |       </div>
  80 | 
  81 |       <div className="mt-6 text-sm text-zinc-400">
  82 |         Hotkeys: <b>F1</b> start/pause/reset — <b>F2</b> swap active timer.
  83 |       </div>
  84 |     </div>
  85 |   )
  86 | }
  87 | 
  88 | ReactDOM.createRoot(document.getElementById('root')!).render(<ControlPanel />)

```

`dbdoverlaytools-free/src\overlay.tsx`:

```tsx
   1 | import React from 'react'
   2 | import ReactDOM from 'react-dom/client'
   3 | import './index.css'
   4 | import './themes/default.css'
   5 | import TimerOverlay from './components/overlay/TimerOverlay'
   6 | 
   7 | ReactDOM.createRoot(document.getElementById('root')!).render(<TimerOverlay />)

```

`dbdoverlaytools-free/src\store\timerStore.ts`:

```ts
   1 | import { create } from 'zustand'
   2 | import { PreciseTimer } from '@/utils/timer'
   3 | 
   4 | type Status = 'stopped'|'running'|'paused'
   5 | 
   6 | const t1 = new PreciseTimer()
   7 | const t2 = new PreciseTimer()
   8 | 
   9 | type S = {
  10 |   active: 1|2
  11 |   status: Record<1|2, Status>
  12 |   clicks: Record<1|2, 0|1|2> // press cycles on F1 for the current pause → reset
  13 |   select: (n:1|2)=>void
  14 |   toggle: ()=>void // F1 behavior
  15 |   reset: (n:1|2)=>void
  16 |   elapsed: (n:1|2)=>number
  17 | }
  18 | 
  19 | export const useTimerStore = create<S>((set, get) => ({
  20 |   active: 1,
  21 |   status: { 1: 'stopped', 2: 'stopped' },
  22 |   clicks: { 1: 0, 2: 0 },
  23 | 
  24 |   select: (n) => set((s)=>({ active: n, clicks: { ...s.clicks, [n]: s.clicks[n] as 0|1|2 } })),
  25 | 
  26 |   toggle: () => {
  27 |     const { active, status, clicks } = get()
  28 |     const timer = active === 1 ? t1 : t2
  29 |     if (status[active] === 'running') {
  30 |       timer.pause()
  31 |       set({ status: { ...status, [active]: 'paused' }, clicks: { ...clicks, [active]: 1 } })
  32 |       return
  33 |     }
  34 |     if (status[active] === 'paused') {
  35 |       // third press → reset
  36 |       if (clicks[active] >= 1) {
  37 |         timer.reset()
  38 |         set({ status: { ...status, [active]: 'stopped' }, clicks: { ...clicks, [active]: 0 } })
  39 |       } else {
  40 |         // safety, but should not happen
  41 |         timer.start()
  42 |         set({ status: { ...status, [active]: 'running' }, clicks: { ...clicks, [active]: 0 } })
  43 |       }
  44 |       return
  45 |     }
  46 |     // stopped → start
  47 |     timer.start()
  48 |     set({ status: { ...status, [active]: 'running' }, clicks: { ...clicks, [active]: 0 } })
  49 |   },
  50 | 
  51 |   reset: (n) => {
  52 |     (n===1?t1:t2).reset()
  53 |     set((s)=>({ status: { ...s.status, [n]: 'stopped' }, clicks: { ...s.clicks, [n]: 0 } }))
  54 |   },
  55 | 
  56 |   elapsed: (n) => (n===1?t1:t2).elapsedMs
  57 | }))

```

`dbdoverlaytools-free/src\styles\tokens.css`:

```css
   1 | @tailwind base;
   2 | @tailwind components;
   3 | @tailwind utilities;
   4 | 
   5 | /* Palette d'accents inspirée du mockup Figma */
   6 | :root{
   7 |   --violet:#B579FF; /* titres/outlines */ /* figma */
   8 |   --pink:#FF6BCB;   /* sur-titres */      /* figma */
   9 |   --green:#44FF41;  /* ON / valid */       /* figma */
  10 |   --cyan:#5AC8FF;   /* valeurs */          /* figma */
  11 |   --red:#FF4141;    /* reset / danger */   /* figma */
  12 | }
  13 | 
  14 | @layer base {
  15 |   html, body, #root { height: 100%; }
  16 |   body {
  17 |     scrollbar-width: thin;                                /* Firefox */
  18 |     scrollbar-color: rgba(255,255,255,.18) transparent;   /* Firefox */
  19 |   }
  20 |   body::-webkit-scrollbar { width: 10px; }                /* Chrome/Edge */
  21 |   body::-webkit-scrollbar-track { background: transparent; }
  22 |   body::-webkit-scrollbar-thumb {
  23 |     background-color: rgba(255,255,255,.12);
  24 |     border-radius: 9999px;
  25 |     border: 2px solid transparent;                        /* anneau = plus léger visuellement */
  26 |     background-clip: content-box;
  27 |   }
  28 |   body:hover::-webkit-scrollbar-thumb {
  29 |     background-color: rgba(255,255,255,.22);
  30 |   }
  31 | }
  32 | 
  33 | /* Fond app + radiaux (optionnels) */
  34 | @layer utilities {
  35 |   .bg-app { @apply bg-[#0A0A0A]; }
  36 |   .card     { @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)]; }
  37 |   .subcard  { @apply rounded-xl border border-white/5  bg-white/5; }
  38 |   .tag      { @apply text-[13px] uppercase tracking-wide font-semibold text-[color:var(--violet)]; }
  39 |   .overtag  { @apply text-[13px] uppercase tracking-wider font-bold text-[color:var(--pink)]; }
  40 |   .pill     { @apply rounded-lg px-3 py-2 border; }
  41 |   .pill-on  { @apply border-[color:var(--green)]/20 bg-[color:var(--green)]/10 text-[color:var(--green)]; }
  42 |   .pill-off { @apply border-white/20 bg-white/10 text-zinc-400; }
  43 | 
  44 |   .btn-primary { @apply rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 transition; }
  45 |   .btn-ghost   { @apply rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2; }
  46 |   .btn-reset   { @apply rounded-lg border border-[color:var(--red)]/30 bg-[color:var(--red)]/15 text-[color:var(--red)] font-bold uppercase tracking-wide px-5 py-2; }
  47 | 
  48 |   .field      { @apply w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--violet)]; }
  49 |   .keybtn     { @apply w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition; }
  50 |   .keybtn-idle{ @apply bg-zinc-800 hover:bg-zinc-700; }
  51 |   .keybtn-cap { @apply bg-violet-600; }
  52 | 
  53 |   /* Interrupteurs façon Figma */
  54 |   .switch      { @apply relative inline-flex h-6 w-12 items-center rounded-full border transition; }
  55 |   .switch-dot  { @apply absolute h-5 w-5 rounded-full transition; }
  56 |   .switch-on   { @apply border-[color:var(--green)]/20 bg-[color:var(--green)]/10; }
  57 |   .switch-on .switch-dot  { @apply translate-x-6 bg-[color:var(--green)]; }
  58 |   .switch-off  { @apply border-white/20 bg-white/10; }
  59 |   .switch-off .switch-dot { @apply translate-x-1 bg-zinc-500; }
  60 | 
  61 | }

```

`dbdoverlaytools-free/src\themes\default.css`:

```css
   1 | /* === Default Theme === */
   2 | .timer-overlay {
   3 |   display: grid;
   4 |   grid-template-columns: minmax(160px, 1fr) auto minmax(160px, 1fr);
   5 |   grid-template-rows: 50px 1fr;
   6 |   width: 520px;
   7 |   height: 120px;
   8 |   position: relative;
   9 | }
  10 | 
  11 | .drag-handle {
  12 |   position: absolute; top: 0; left: 0; right: 0; height: 30px;
  13 |   background: linear-gradient(90deg, rgba(181,121,255,0.15) 0%, rgba(181,121,255,0.25) 50%, rgba(181,121,255,0.15) 100%);
  14 |   border-bottom: 2px solid rgba(181,121,255,0.4);
  15 |   box-shadow: 0 2px 10px rgba(181,121,255,0.3);
  16 |   display: none; align-items: center; justify-content: center;
  17 |   cursor: move; -webkit-app-region: drag;
  18 |   font-size: 0.85rem; color: #B579FF; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  19 |   z-index: 1000;
  20 | }
  21 | .drag-handle.visible { display: flex; }
  22 | 
  23 | .name, .score-value {
  24 |   border-bottom: 1px solid rgba(255,255,255,0.32);
  25 |   background: linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%);
  26 |   display: flex; align-items: center; justify-content: center;
  27 |   font-family: 'Poppins', system-ui, sans-serif;
  28 |   font-size: 22px; font-weight: 500; color: #FFF;
  29 |   position: relative; overflow: hidden;
  30 | }
  31 | .name.left { grid-row: 1; grid-column: 1; font-size: 24px; text-transform: uppercase; text-shadow: 0 0 6px rgba(255,255,255,0.50); }
  32 | .score-value { 
  33 |   grid-row: 1; grid-column: 2; font-size: 24px; text-transform: uppercase;
  34 |   background: linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%);
  35 |   padding: 0 15px; min-width: 90px; max-width: 120px;
  36 | }
  37 | .name.right { grid-row: 1; grid-column: 3; font-size: 24px; text-transform: uppercase; text-shadow: 0 0 6px rgba(255,255,255,0.50); }
  38 | 
  39 | .name .name-scroll { display: inline-block; white-space: nowrap; padding: 0 15px; }
  40 | .name.scrolling .name-scroll { animation: scroll-text 6s linear infinite; padding: 0 50px; }
  41 | @keyframes scroll-text { 0%{transform:translateX(80%)} 100%{transform:translateX(-80%)} }
  42 | 
  43 | .timer {
  44 |   display: flex; align-items: center; justify-content: center;
  45 |   font-family: "Consolas","Monaco","Courier New",monospace;
  46 |   font-size: 32px; font-weight: 400;
  47 |   text-shadow: 0 0 6px rgba(190,190,190,0.50);
  48 |   position: relative; height: 100%; text-align: center; min-width: 160px;
  49 | }
  50 | .timer.left { grid-row: 2; grid-column: 1; }
  51 | .timer.right { grid-row: 2; grid-column: 3; }
  52 | 
  53 | .timer-text { display: inline-flex; align-items: center; background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
  54 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  55 | .timer-char { display: inline-block; width: 22px; text-align: center;
  56 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  57 | .timer-char.separator { width: 11px; }
  58 | 
  59 | .timer.active::before {
  60 |   content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  61 |   background: linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%);
  62 |   animation: pulseBar 1s ease-in-out infinite;
  63 | }
  64 | @keyframes pulseBar { 0%,100%{opacity:.5} 50%{opacity:1} }
  65 | 
  66 | .dbd-digits { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; letter-spacing: 0.02em; }

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

`dbdoverlaytools-free/src\types\preload.d.ts`:

```ts
   1 | export {}
   2 | declare global {
   3 |   interface Window {
   4 |     api: {
   5 |       overlay: {
   6 |         show(): Promise<any>
   7 |         hide(): Promise<any>
   8 |         updateSettings(s: any): Promise<any>
   9 |         onReady(cb: (v: boolean) => void): void
  10 |         onSettings(cb: (s: any) => void): void
  11 |         measure(w: number, h: number): Promise<any>
  12 |       }
  13 |       timer: {
  14 |         get(): Promise<any>
  15 |         set(d: any): Promise<any>
  16 |         onSync(cb: (d: any) => void): void
  17 |       }
  18 |       hotkeys: {
  19 |         get(): Promise<{start:number|null, swap:number|null, startLabel?:string, swapLabel?:string, mode?:'pass-through'|'fallback'}>
  20 |         set(hk: {start?:number|null, swap?:number|null}): Promise<any>
  21 |         capture(type:'start'|'swap'): Promise<any>
  22 |         onCaptured(cb: (p:{type:'start'|'swap', keycode?:number|null, label?:string}) => void): void
  23 |         on(cb: (p: any) => void): void
  24 |         onMode(cb: (mode:'pass-through'|'fallback') => void): void
  25 |       }
  26 |     }
  27 |   }
  28 | }

```

`dbdoverlaytools-free/src\utils\cn.ts`:

```ts
   1 | export function cn(...inputs: (string | undefined | null | boolean)[]): string {
   2 |   return inputs.filter(Boolean).join(' ');
   3 | }

```

`dbdoverlaytools-free/src\utils\timer.ts`:

```ts
   1 | export class PreciseTimer {
   2 |   private _running = false;
   3 |   private _startedAt = 0;
   4 |   private _accum = 0;
   5 | 
   6 |   start() {
   7 |     if (this._running) return;
   8 |     this._startedAt = performance.now();
   9 |     this._running = true;
  10 |   }
  11 |   pause() {
  12 |     if (!this._running) return;
  13 |     this._accum += performance.now() - this._startedAt;
  14 |     this._running = false;
  15 |   }
  16 |   reset() {
  17 |     this._running = false;
  18 |     this._accum = 0;
  19 |     this._startedAt = 0;
  20 |   }
  21 |   get running() { return this._running; }
  22 |   get elapsedMs() {
  23 |     return this._running ? this._accum + (performance.now() - this._startedAt) : this._accum;
  24 |   }
  25 | }
  26 | 
  27 | export function formatMillis(ms:number) {
  28 |   // legacy "MM:SS:CC" — conservé si besoin ailleurs
  29 |   const total = Math.max(0, Math.floor(ms));
  30 |   const cs = Math.floor((total % 1000) / 10);
  31 |   const secs = Math.floor(total / 1000) % 60;
  32 |   const mins = Math.floor(total / 60000);
  33 |   const pad = (n:number)=>n.toString().padStart(2,'0');
  34 |   return `${pad(mins)}:${pad(secs)}:${pad(cs)}`;
  35 | }
  36 | 
  37 | // Nouveau : dynamique
  38 | export function formatMillisDynamic(ms:number) {
  39 |   const total = Math.max(0, Math.floor(ms));
  40 |   const cs = Math.floor((total % 1000) / 10);           // 0..99
  41 |   const secs = Math.floor(total / 1000) % 60;           // 0..59
  42 |   const mins = Math.floor(total / 60000);               // 0..∞
  43 | 
  44 |   const cs2 = cs.toString().padStart(2, '0');
  45 |   if (mins > 0) {
  46 |     const ss = secs.toString().padStart(2,'0');
  47 |     return `${mins}:${ss}.${cs2}`;                      // M:SS.CC (minutes sans zéro superflu)
  48 |   } else {
  49 |     // pas de minutes → "S.CC" (et 0.00 au départ)
  50 |     return `${secs}.${cs2}`;
  51 |   }
  52 | }

```

`dbdoverlaytools-free/tailwind.config.cjs`:

```cjs
   1 | /** @type {import('tailwindcss').Config} */
   2 | module.exports = {
   3 |   content: ["./index.html", "./overlay.html", "./src/**/*.{ts,tsx}"],
   4 |   theme: {
   5 |     extend: {
   6 |       fontFamily: {
   7 |         ui: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
   8 |         mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','monospace']
   9 |       }
  10 |     }
  11 |   },
  12 |   plugins: []
  13 | };

```

`dbdoverlaytools-free/tsconfig.json`:

```json
   1 | {
   2 |   "compilerOptions": {
   3 |     "target": "ES2021",
   4 |     "useDefineForClassFields": true,
   5 |     "lib": ["ES2021", "DOM"],
   6 |     "module": "ESNext",
   7 |     "skipLibCheck": true,
   8 |     "moduleResolution": "Bundler",
   9 |     "resolveJsonModule": true,
  10 |     "isolatedModules": true,
  11 |     "noEmit": true,
  12 |     "jsx": "react-jsx",
  13 |     "baseUrl": ".",
  14 |     "paths": {
  15 |       "@/*": ["src/*"]
  16 |     },
  17 |     "types": ["vite/client", "node"]
  18 |   },
  19 |   "include": ["src", "electron", "vite.config.ts"]
  20 | }

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

`dbdoverlaytools-free/vite.config.mts`:

```mts
   1 | import { defineConfig } from 'vite'
   2 | import react from '@vitejs/plugin-react'
   3 | import { fileURLToPath, URL } from 'node:url'
   4 | 
   5 | export default defineConfig({
   6 |   plugins: [react()],
   7 |   server: { port: 5173, strictPort: true },
   8 |   resolve: {
   9 |     alias: {
  10 |       '@': fileURLToPath(new URL('./src', import.meta.url))
  11 |     }
  12 |   },
  13 |   build: {
  14 |     outDir: 'dist',
  15 |     sourcemap: true
  16 |   }
  17 | })

```