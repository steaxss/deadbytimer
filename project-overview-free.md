Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── build
├── electron
│   ├── hotkeys
│   │   └── capture.cjs
│   ├── input
│   │   ├── gamepad-exe.cjs
│   │   └── uiohook.cjs
│   ├── main.mjs
│   ├── preload.cjs
│   ├── tsconfig.json
│   └── windows
│       └── windows.cjs
├── index.html
├── native
│   ├── xinput_bridge.cpp
│   ├── xinput_bridge.exe
│   └── xinput_bridge.obj
├── overlay.html
├── package.json
├── postcss.config.cjs
├── src
│   ├── assets
│   │   └── fonts
│   │       ├── Poppins-Medium.ttf
│   │       ├── Poppins-Regular.ttf
│   │       └── Square.ttf
│   ├── components
│   │   ├── ControlPanel.tsx
│   │   ├── ScrollingName.tsx
│   │   └── overlay
│   │       ├── DragHandle.tsx
│   │       └── TimerOverlay.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── overlay.tsx
│   ├── store
│   │   └── timerStore.ts
│   ├── styles
│   │   └── fonts.css
│   ├── themes
│   │   ├── default.css
│   │   └── palette.ts
│   ├── types
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

`dbdoverlaytools-free/electron\hotkeys\capture.cjs`:

```cjs
   1 | // electron/hotkeys/capture.cjs
   2 | // Gère la capture transactionnelle (IPC), le stockage labels/codes, le fallback globalShortcut.
   3 | 
   4 | let ipcMain,
   5 |   store,
   6 |   globalShortcut,
   7 |   dialog,
   8 |   shell,
   9 |   VC_REDIST_X64_URL,
  10 |   hasVCRedist,
  11 |   logHK,
  12 |   getMainWindow,
  13 |   getOverlayWindow,
  14 |   getUsingUiohook,
  15 |   setUsingUiohook,
  16 |   getHotkeys,
  17 |   setHotkeys,
  18 |   getHotkeysLabel,
  19 |   setHotkeysLabel,
  20 |   getMouseBinds,
  21 |   setMouseBinds,
  22 |   makeLabelFromBeforeInput,
  23 |   isAlphaNumLabel,
  24 |   sendHotkeysMode,
  25 |   dispatchHotkey,
  26 |   onGamepadRaw,
  27 |   setGamepadMapping,
  28 |   clearGamepadMapping; // conservé pour compat
  29 | 
  30 | let captureState = null; // { type: 'start'|'swap', source: 'any'|'desktop'|'gamepad', label, code, primaryTimer, secondaryTimer }
  31 | let captureWaitUntil = 0;
  32 | let offGamepadRaw = null;
  33 | 
  34 | function initCapture(ctx) {
  35 |   ({
  36 |     ipcMain,
  37 |     store,
  38 |     globalShortcut,
  39 |     dialog,
  40 |     shell,
  41 |     VC_REDIST_X64_URL,
  42 |     hasVCRedist,
  43 |     logHK,
  44 |     getMainWindow,
  45 |     getOverlayWindow,
  46 |     getUsingUiohook,
  47 |     setUsingUiohook,
  48 |     getHotkeys,
  49 |     setHotkeys,
  50 |     getHotkeysLabel,
  51 |     setHotkeysLabel,
  52 |     getMouseBinds,
  53 |     setMouseBinds,
  54 |     makeLabelFromBeforeInput,
  55 |     isAlphaNumLabel,
  56 |     sendHotkeysMode,
  57 |     dispatchHotkey,
  58 |     onGamepadRaw,
  59 |     setGamepadMapping,
  60 |     clearGamepadMapping,
  61 |   } = ctx);
  62 | }
  63 | 
  64 | // Helpers label
  65 | function isMouseLabel(label) {
  66 |   return typeof label === "string" && /^(MOUSE\d+|WHEEL_(UP|DOWN))$/i.test(label);
  67 | }
  68 | function isKeyboardLabel(label) {
  69 |   if (typeof label !== "string") return false;
  70 |   if (/^F([1-9]|1[0-9]|2[0-4])$/i.test(label)) return true;
  71 |   if (/^[A-Z0-9]$/.test(label)) return true;
  72 |   return /^(ESC|TAB|ENTER|BACKSPACE|SHIFT|CTRL|ALT|SPACE|UP|DOWN|LEFT|RIGHT)$/i.test(label);
  73 | }
  74 | function isGamepadLabel(label) {
  75 |   return typeof label === "string" && !isKeyboardLabel(label) && !isMouseLabel(label);
  76 | }
  77 | 
  78 | function isCapturing() { return !!captureState; }
  79 | function getCaptureBlockUntil() { return captureWaitUntil; }
  80 | 
  81 | // Hooks appelés par uIOhook pendant capture
  82 | function onKeyboardCode(code) {
  83 |   if (!captureState) return;
  84 |   if (captureState.source === "gamepad") return; // capture manette: ignorer clavier
  85 |   captureState.code = code;
  86 |   if (captureState.label) finalizeCapture("have both");
  87 |   else {
  88 |     if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
  89 |     captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-code-wait"), 600);
  90 |   }
  91 | }
  92 | 
  93 | function onMouseLabel(label) {
  94 |   if (!captureState) return;
  95 |   if (captureState.source === "gamepad") return; // capture manette: ignorer souris
  96 | 
  97 |   const { type } = captureState;
  98 |   captureState.label = label;
  99 | 
 100 |   // Desktop = maj labels + binds souris
 101 |   const labels = { ...getHotkeysLabel(), [type]: label };
 102 |   setHotkeysLabel(labels);
 103 |   const binds = { ...getMouseBinds(), [type]: label };
 104 |   setMouseBinds(binds);
 105 | 
 106 |   const mw = getMainWindow();
 107 |   mw?.webContents.send("hotkeys-captured", { type, label, source: "desktop" });
 108 | 
 109 |   finalizeCapture("mouse");
 110 | }
 111 | 
 112 | // helpers capture
 113 | function clearCaptureTimers() {
 114 |   if (!captureState) return;
 115 |   if (captureState.primaryTimer) { clearTimeout(captureState.primaryTimer); captureState.primaryTimer = null; }
 116 |   if (captureState.secondaryTimer) { clearTimeout(captureState.secondaryTimer); captureState.secondaryTimer = null; }
 117 | }
 118 | 
 119 | // Exclusivité “desktop” : clavier OU souris (manette coexiste)
 120 | function enforceDesktopExclusivityAfter(label, code, type) {
 121 |   const isKb = isKeyboardLabel(label) || typeof code === "number";
 122 |   const isMs = isMouseLabel(label);
 123 | 
 124 |   if (isKb) {
 125 |     const mb = { ...getMouseBinds() };
 126 |     if (mb[type]) { mb[type] = null; setMouseBinds(mb); logHK && logHK("Desktop exclusivity: cleared MOUSE for", type); }
 127 |   } else if (isMs) {
 128 |     const hk = { ...getHotkeys() };
 129 |     if (hk[type] != null) { hk[type] = null; setHotkeys(hk); logHK && logHK("Desktop exclusivity: cleared KEYCODE for", type); }
 130 |   }
 131 | }
 132 | 
 133 | function finalizeCapture(reason = "done") {
 134 |   if (!captureState) return;
 135 | 
 136 |   if (offGamepadRaw) { try { offGamepadRaw(); } catch {} offGamepadRaw = null; }
 137 | 
 138 |   const { type, source, label, code } = captureState;
 139 |   clearCaptureTimers();
 140 |   logHK && logHK("CAPTURE FINALIZE", { reason, type, source, label, code });
 141 | 
 142 |   // Persistance : seulement pour “desktop” on écrit dans hotkeys/hotkeysLabel
 143 |   if (source !== "gamepad") {
 144 |     if (label) {
 145 |       const labels = { ...getHotkeysLabel(), [type]: label };
 146 |       setHotkeysLabel(labels);
 147 |     }
 148 |     if (typeof code === "number") {
 149 |       const codes = { ...getHotkeys(), [type]: code };
 150 |       setHotkeys(codes);
 151 |     }
 152 |     if (label || typeof code === "number") {
 153 |       enforceDesktopExclusivityAfter(label, code, type);
 154 |       // si on n’a reçu qu’un label clavier (pas de code), on retire tout ancien code stale
 155 |       if (label && isKeyboardLabel(label) && typeof code !== "number") {
 156 |         const hk = { ...getHotkeys() };
 157 |         if (hk[type] != null) { hk[type] = null; setHotkeys(hk); logHK && logHK("Cleared stale KEYCODE (keyboard label only)", type); }
 158 |       }
 159 |     }
 160 |   }
 161 | 
 162 |   // Notifier panel (avec source)
 163 |   const mw = getMainWindow();
 164 |   if (mw && !mw.isDestroyed() && (label || typeof code === "number")) {
 165 |     const payload = { type, source: source === "gamepad" ? "gamepad" : "desktop" };
 166 |     if (label) payload.label = label;
 167 |     if (typeof code === "number") payload.keycode = code;
 168 |     mw.webContents.send("hotkeys-captured", payload);
 169 |   }
 170 | 
 171 |   // Alerte VC++ (desktop uniquement, car gamepad n’est pas concerné)
 172 |   if (source !== "gamepad" && !getUsingUiohook() && label && isAlphaNumLabel(label) && !hasVCRedist()) {
 173 |     dialog.showMessageBox({
 174 |       type: "info",
 175 |       title: "Pass-Through unavailable",
 176 |       message: "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
 177 |       detail: "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, then recapture your hotkeys.",
 178 |       buttons: ["Install runtime (x64)", "OK"],
 179 |       defaultId: 0, cancelId: 1, noLink: true,
 180 |     }).then(({ response }) => { if (response === 0) shell.openExternal(VC_REDIST_X64_URL); });
 181 |   }
 182 | 
 183 |   // Pass-through si 2 codes capturés (desktop)
 184 |   const codes = getHotkeys();
 185 |   const haveBoth = Number.isFinite(codes.start) && Number.isFinite(codes.swap);
 186 |   if (haveBoth && getUsingUiohook() === false) {
 187 |     setUsingUiohook(true);
 188 |     try { globalShortcut.unregisterAll(); } catch {}
 189 |     sendHotkeysMode("pass-through");
 190 |   }
 191 | 
 192 |   // Reset
 193 |   captureState = null;
 194 |   captureWaitUntil = 0;
 195 | 
 196 |   // Réarmer fallback si nécessaire
 197 |   if (!getUsingUiohook()) {
 198 |     refreshHotkeyEngine({
 199 |       globalShortcut,
 200 |       hotkeysLabel: getHotkeysLabel(),
 201 |       isAlphaNumLabel,
 202 |       logHK,
 203 |       getCaptureBlockUntil,
 204 |       dispatchHotkey,
 205 |     });
 206 |   }
 207 | }
 208 | 
 209 | function parseCaptureArgs(arg1, arg2) {
 210 |   if (typeof arg1 === "object" && arg1) return { type: arg1.type, source: arg1.source || "any" };
 211 |   return { type: arg1, source: arg2 || "any" };
 212 | }
 213 | 
 214 | function setupCaptureIPC() {
 215 |   ipcMain.handle("hotkeys-capture", (_evt, arg1, arg2) => {
 216 |     const { type, source } = parseCaptureArgs(arg1, arg2);
 217 |     if (!(type === "start" || type === "swap")) { finalizeCapture("cancel"); return true; }
 218 | 
 219 |     logHK && logHK("CAPTURE BEGIN", { type, source, mode: getUsingUiohook() ? "pass-through" : "fallback" });
 220 | 
 221 |     captureWaitUntil = Date.now() + 15000;
 222 |     if (captureState) { clearCaptureTimers(); captureState = null; }
 223 | 
 224 |     captureState = {
 225 |       type,
 226 |       source: source || "any",
 227 |       label: null,
 228 |       code: null,
 229 |       primaryTimer: setTimeout(() => { logHK && logHK("CAPTURE PRIMARY TIMEOUT — cancel"); finalizeCapture("primary-timeout"); }, 15000),
 230 |       secondaryTimer: null,
 231 |     };
 232 | 
 233 |     try { const mw = getMainWindow(); mw?.focus(); } catch {}
 234 | 
 235 |     if (!getUsingUiohook()) { try { globalShortcut.unregisterAll(); } catch {} }
 236 | 
 237 |     const mw = getMainWindow();
 238 |     const once = (event, input) => {
 239 |       if (!captureState) return;
 240 |       if (captureState.source === "gamepad") return; // capture gamepad: ignorer clavier
 241 |       if (input.type !== "keyDown" || input.isAutoRepeat) return;
 242 | 
 243 |       const label = makeLabelFromBeforeInput(input);
 244 | 
 245 |       captureState.label = label;
 246 |       const labels = { ...getHotkeysLabel(), [type]: label };
 247 |       setHotkeysLabel(labels);
 248 | 
 249 |       mw?.webContents.send("hotkeys-captured", { type, label, source: "desktop" });
 250 |       logHK && logHK("label captured (instant)", { type, label });
 251 | 
 252 |       if (typeof captureState.code === "number") finalizeCapture("have both");
 253 |       else {
 254 |         if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
 255 |         captureState.secondaryTimer = setTimeout(() => finalizeCapture("after-label-wait"), 500);
 256 |       }
 257 | 
 258 |       mw?.webContents.removeListener("before-input-event", once);
 259 |     };
 260 |     mw?.webContents.on("before-input-event", once);
 261 | 
 262 |     // RAW manette → uniquement mapping + event source: 'gamepad'
 263 |     offGamepadRaw = onGamepadRaw((evLabel) => {
 264 |       if (!captureState) return;
 265 |       if (captureState.source === "desktop") return; // capture desktop: ignorer manette
 266 |       const { type } = captureState;
 267 | 
 268 |       captureState.label = evLabel; // pour la fin de capture; on NE stockera pas dans hotkeysLabel
 269 |       mw?.webContents.send("hotkeys-captured", { type, label: evLabel, source: "gamepad" });
 270 | 
 271 |       setGamepadMapping(type, evLabel, { append: false }); // remplace
 272 |       finalizeCapture("gamepad");
 273 |     });
 274 | 
 275 |     return true;
 276 |   });
 277 | }
 278 | 
 279 | /* -------------------- Fallback engine (globalShortcut) -------------------- */
 280 | function refreshHotkeyEngine({
 281 |   globalShortcut,
 282 |   hotkeysLabel,
 283 |   isAlphaNumLabel,
 284 |   logHK,
 285 |   getCaptureBlockUntil,
 286 |   dispatchHotkey,
 287 | }) {
 288 |   try { globalShortcut.unregisterAll(); } catch {}
 289 |   const RATE = 180;
 290 |   let lastT = 0, lastS = 0;
 291 | 
 292 |   const sKey = hotkeysLabel.start || "F1";
 293 |   const wKey = hotkeysLabel.swap || "F2";
 294 |   const canUse = (label) => /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);
 295 | 
 296 |   if (canUse(sKey)) {
 297 |     try {
 298 |       globalShortcut.register(sKey, () => {
 299 |         if (Date.now() < getCaptureBlockUntil()) return;
 300 |         const now = Date.now();
 301 |         if (now - lastT < RATE) return;
 302 |         lastT = now;
 303 |         dispatchHotkey("toggle");
 304 |       });
 305 |     } catch {}
 306 |   }
 307 |   if (canUse(wKey)) {
 308 |     try {
 309 |       globalShortcut.register(wKey, () => {
 310 |         if (Date.now() < getCaptureBlockUntil()) return;
 311 |         const now = Date.now();
 312 |         if (now - lastS < RATE) return;
 313 |         lastS = now;
 314 |         dispatchHotkey("swap");
 315 |       });
 316 |     } catch {}
 317 |   }
 318 | }
 319 | 
 320 | /* -------------------- API complémentaire -------------------- */
 321 | function attachWindowsAPI({ sendOverlaySettings }) {
 322 |   module.exports._sendOverlaySettings = sendOverlaySettings;
 323 | }
 324 | 
 325 | module.exports = {
 326 |   initCapture,
 327 |   setupCaptureIPC,
 328 |   refreshHotkeyEngine,
 329 |   isCapturing,
 330 |   getCaptureBlockUntil,
 331 |   onKeyboardCode,
 332 |   onMouseLabel,
 333 |   attachWindowsAPI,
 334 | };

```

`dbdoverlaytools-free/electron\input\gamepad-exe.cjs`:

```cjs
   1 | // electron/input/gamepad-exe.cjs
   2 | // Windows only — XInput -> IPC "global-hotkey" (toggle/swap)
   3 | // - arrêt propre à la fermeture
   4 | // - mappage configurable via %APPDATA%/<app>/gamepad.json
   5 | // - flux brut pour la capture (onGamepadRaw), écriture mapping (setGamepadMapping)
   6 | 
   7 | const { app, BrowserWindow } = require("electron");
   8 | const { spawn } = require("child_process");
   9 | const { join, dirname } = require("path");
  10 | const {
  11 |   existsSync,
  12 |   readFileSync,
  13 |   mkdirSync,
  14 |   writeFileSync,
  15 |   watch,
  16 | } = require("fs");
  17 | 
  18 | let child = null;
  19 | let isQuitting = false;
  20 | let relaunchTimer = null;
  21 | 
  22 | const ACTION_THROTTLE_MS = 200;
  23 | const lastActionAt = { toggle: 0, swap: 0 };
  24 | 
  25 | // --- Résolution du chemin du binaire natif (dev/prod)
  26 | function resolveExePath() {
  27 |   // dev: ../.. depuis electron/input -> native/xinput_bridge.exe
  28 |   const devPath = join(__dirname, "..", "..", "native", "xinput_bridge.exe");
  29 | 
  30 |   // prod: l’exe peut être à la racine de resources (package.json -> extraResources to ".")
  31 |   // ou parfois dans resources/native
  32 |   const res = process.resourcesPath || __dirname;
  33 |   const prodA = join(res, "xinput_bridge.exe");
  34 |   const prodB = join(res, "native", "xinput_bridge.exe");
  35 | 
  36 |   if (existsSync(devPath)) return devPath;
  37 |   if (existsSync(prodA)) return prodA;
  38 |   if (existsSync(prodB)) return prodB;
  39 |   return devPath; // fallback (échec volontairement visible)
  40 | }
  41 | 
  42 | // --- Diffusion vers toutes les fenêtres — envoie { type: ... }
  43 | function broadcastHotkey(action) {
  44 |   const now = Date.now();
  45 |   if (action === "toggle" || action === "swap") {
  46 |     if (now - lastActionAt[action] < ACTION_THROTTLE_MS) return;
  47 |     lastActionAt[action] = now;
  48 |   }
  49 |   for (const win of BrowserWindow.getAllWindows()) {
  50 |     try {
  51 |       win.webContents.send("global-hotkey", { type: action });
  52 |     } catch {}
  53 |   }
  54 | }
  55 | 
  56 | // --- Mappage configurable ----------------------------------------------------
  57 | const DEFAULT_MAPPING = {
  58 |   toggle: [],
  59 |   swap: [],
  60 | };
  61 | 
  62 | function configFilePath() {
  63 |   return join(app.getPath("userData"), "gamepad.json");
  64 | }
  65 | 
  66 | let mapping = { ...DEFAULT_MAPPING };
  67 | 
  68 | function normalizeEventName(s) {
  69 |   return String(s || "")
  70 |     .trim()
  71 |     .toUpperCase();
  72 | }
  73 | 
  74 | function isLegacyDefaults(m) {
  75 |   const t = Array.isArray(m?.toggle) ? m.toggle.map(normalizeEventName) : [];
  76 |   const s = Array.isArray(m?.swap) ? m.swap.map(normalizeEventName) : [];
  77 |   return (
  78 |     t.length === 1 && t[0] === "BTN A" && s.length === 1 && s[0] === "BTN RB"
  79 |   );
  80 | }
  81 | 
  82 | function loadMapping() {
  83 |   try {
  84 |     const file = configFilePath();
  85 |     if (!existsSync(dirname(file)))
  86 |       mkdirSync(dirname(file), { recursive: true });
  87 |     if (!existsSync(file)) {
  88 |       writeFileSync(file, JSON.stringify(DEFAULT_MAPPING, null, 2), "utf8");
  89 |       mapping = { ...DEFAULT_MAPPING };
  90 |       return;
  91 |     }
  92 | 
  93 |     const raw = readFileSync(file, "utf8");
  94 |     const json = JSON.parse(raw);
  95 | 
  96 |     const out = { toggle: [], swap: [] };
  97 |     for (const key of ["toggle", "swap"]) {
  98 |       const val = json[key];
  99 |       if (typeof val === "string") out[key] = [normalizeEventName(val)];
 100 |       else if (Array.isArray(val))
 101 |         out[key] = val.map(normalizeEventName).filter(Boolean);
 102 |     }
 103 | 
 104 |     if (isLegacyDefaults(out)) {
 105 |       out.toggle = [];
 106 |       out.swap = [];
 107 |       writeFileSync(file, JSON.stringify(out, null, 2), "utf8");
 108 |     }
 109 |     mapping = out;
 110 |   } catch (e) {
 111 |     console.error("[GAMEPAD] loadMapping error", e?.message || e);
 112 |     mapping = { ...DEFAULT_MAPPING };
 113 |   }
 114 | }
 115 | 
 116 | function saveMapping(next) {
 117 |   try {
 118 |     const file = configFilePath();
 119 |     writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
 120 |   } catch (e) {
 121 |     console.error("[GAMEPAD] saveMapping error", e?.message || e);
 122 |   }
 123 | }
 124 | 
 125 | function setGamepadMapping(action, eventLabel, { append = false } = {}) {
 126 |   const key = action === "swap" ? "swap" : "toggle";
 127 |   const label = normalizeEventName(eventLabel);
 128 |   const next = { ...mapping };
 129 |   if (append) next[key] = Array.from(new Set([...(next[key] || []), label]));
 130 |   else next[key] = [label];
 131 |   saveMapping(next);
 132 |   mapping = next;
 133 | }
 134 | 
 135 | // 🚿 NOUVEAU : vider complètement une action (exclusivité par action)
 136 | function clearGamepadMapping(action) {
 137 |   const key = action === "swap" ? "swap" : "toggle";
 138 |   const next = { ...mapping, [key]: [] };
 139 |   saveMapping(next);
 140 |   mapping = next;
 141 | }
 142 | 
 143 | // --- Flux brut pour la capture ------------------------------------------------
 144 | const rawListeners = new Set();
 145 | function onGamepadRaw(cb) {
 146 |   if (typeof cb === "function") {
 147 |     rawListeners.add(cb);
 148 |     return () => rawListeners.delete(cb);
 149 |   }
 150 |   return () => {};
 151 | }
 152 | function emitRaw(ev) {
 153 |   for (const cb of rawListeners) {
 154 |     try {
 155 |       cb(ev);
 156 |     } catch {}
 157 |   }
 158 | }
 159 | 
 160 | // --- Process natif -----------------------------------------------------------
 161 | function handleGamepadEventName(name) {
 162 |   const ev = normalizeEventName(name);
 163 |   if (!ev) return;
 164 | 
 165 |   // Toujours notifier le brut (capture)
 166 |   emitRaw(ev);
 167 | 
 168 |   // Déclenchement selon mapping
 169 |   if ((mapping.toggle || []).includes(ev)) {
 170 |     broadcastHotkey("toggle");
 171 |     return;
 172 |   }
 173 |   if ((mapping.swap || []).includes(ev)) {
 174 |     broadcastHotkey("swap");
 175 |     return;
 176 |   }
 177 | }
 178 | 
 179 | function launch() {
 180 |   const exe = resolveExePath();
 181 |   if (!existsSync(exe)) return;
 182 | 
 183 |   child = spawn(exe, [], {
 184 |     stdio: ["ignore", "pipe", "ignore"],
 185 |     windowsHide: true,
 186 |   });
 187 | 
 188 |   let buffer = "";
 189 |   child.stdout.on("data", (chunk) => {
 190 |     buffer += chunk.toString("utf8");
 191 |     let idx;
 192 |     while ((idx = buffer.indexOf("\n")) >= 0) {
 193 |       const line = buffer.slice(0, idx).trim();
 194 |       buffer = buffer.slice(idx + 1);
 195 |       if (line) handleGamepadEventName(line);
 196 |     }
 197 |   });
 198 | 
 199 |   child.on("exit", () => {
 200 |     child = null;
 201 |     if (isQuitting) return;
 202 |     clearTimeout(relaunchTimer);
 203 |     relaunchTimer = setTimeout(launch, 1000);
 204 |   });
 205 | 
 206 |   child.on("error", () => {
 207 |     child = null;
 208 |     if (isQuitting) return;
 209 |     clearTimeout(relaunchTimer);
 210 |     relaunchTimer = setTimeout(launch, 1500);
 211 |   });
 212 | }
 213 | 
 214 | function setupGamepadExe() {
 215 |   if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où
 216 | 
 217 |   loadMapping();
 218 |   try {
 219 |     watch(configFilePath(), { persistent: false }, () => loadMapping());
 220 |   } catch {}
 221 | 
 222 |   launch();
 223 | 
 224 |   app.on("before-quit", () => {
 225 |     isQuitting = true;
 226 |     try {
 227 |       clearTimeout(relaunchTimer);
 228 |     } catch {}
 229 |     try {
 230 |       child?.kill();
 231 |     } catch {}
 232 |   });
 233 |   app.on("will-quit", () => {
 234 |     isQuitting = true;
 235 |     try {
 236 |       clearTimeout(relaunchTimer);
 237 |     } catch {}
 238 |     try {
 239 |       child?.kill();
 240 |     } catch {}
 241 |   });
 242 | }
 243 | 
 244 |   // 👇 Nouveau : expose un snapshot lisible depuis le renderer
 245 |   function getGamepadMapping() {
 246 |     return {
 247 |       toggle: Array.isArray(mapping.toggle) ? [...mapping.toggle] : [],
 248 |       swap: Array.isArray(mapping.swap) ? [...mapping.swap] : [],
 249 |     };
 250 | 
 251 |   }
 252 | 
 253 | module.exports = {
 254 |   setupGamepadExe,
 255 |   onGamepadRaw,
 256 |   setGamepadMapping,
 257 |   clearGamepadMapping,
 258 |   getGamepadMapping
 259 | };

```

`dbdoverlaytools-free/electron\input\uiohook.cjs`:

```cjs
   1 | // electron/input/uiohook.cjs
   2 | // Charge uIOhook et gère clavier + souris (capture & runtime)
   3 | 
   4 | let _uIOhook = null;
   5 | let _loaded = false;
   6 | 
   7 | let requireFn,
   8 |   FORCE_NO_UIOHOOK,
   9 |   hasVCRedist,
  10 |   dialog,
  11 |   shell,
  12 |   VC_REDIST_X64_URL,
  13 |   logHK,
  14 |   getOverlayWindow,
  15 |   dispatchHotkey,
  16 |   // capture API
  17 |   isCapturing,
  18 |   getCaptureBlockUntil,
  19 |   onCaptureKeyboardCode,
  20 |   onCaptureMouseLabel,
  21 |   // binds & codes
  22 |   getHotkeys,
  23 |   getMouseBinds,
  24 |   setUsingUiohook;
  25 | 
  26 | function setupUiohook(ctx) {
  27 |   ({
  28 |     require: requireFn,
  29 |     FORCE_NO_UIOHOOK,
  30 |     hasVCRedist,
  31 |     dialog,
  32 |     shell,
  33 |     VC_REDIST_X64_URL,
  34 |     logHK,
  35 |     getOverlayWindow,
  36 |     dispatchHotkey,
  37 |     isCapturing,
  38 |     getCaptureBlockUntil,
  39 |     onCaptureKeyboardCode,
  40 |     onCaptureMouseLabel,
  41 |     getHotkeys,
  42 |     getMouseBinds,
  43 |     setUsingUiohook,
  44 |   } = ctx);
  45 | 
  46 |   // essaie de charger uiohook immédiatement (mais ne démarre qu'avec start())
  47 |   try {
  48 |     if (FORCE_NO_UIOHOOK) throw new Error("uIOhook forcibly disabled via .env");
  49 |     const lib = requireFn("uiohook-napi");
  50 |     _uIOhook = lib.uIOhook;
  51 |     _loaded = true;
  52 |     logHK && logHK("uiohook loaded OK");
  53 |   } catch (e) {
  54 |     _uIOhook = null;
  55 |     _loaded = false;
  56 |     logHK && logHK("uiohook FAILED to load -> fallback", e?.message || e);
  57 |   }
  58 | }
  59 | 
  60 | function isLoaded() {
  61 |   return !!_loaded && !!_uIOhook;
  62 | }
  63 | 
  64 | function stop() {
  65 |   try {
  66 |     if (_uIOhook) _uIOhook.stop();
  67 |   } catch {}
  68 | }
  69 | 
  70 | function start() {
  71 |   if (!_uIOhook) {
  72 |     // Prompt éventuel si non chargé
  73 |     const vcPresent = hasVCRedist();
  74 |     (async () => {
  75 |       if (!vcPresent) {
  76 |         const { response } = await dialog.showMessageBox({
  77 |           type: "warning",
  78 |           title: "Pass-Through unavailable",
  79 |           message: "uIOhook couldn’t start because the Microsoft C++ runtime is missing.",
  80 |           detail:
  81 |             "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”. " +
  82 |             "It provides the system libraries (MSVCP140 / VCRUNTIME140) required to listen to A–Z / 0–9 without stealing them from other apps. " +
  83 |             "After installing, restart the app and recapture your hotkeys to enable pass-through.",
  84 |           buttons: ["Install runtime (x64)", "Continue in limited mode"],
  85 |           defaultId: 0,
  86 |           cancelId: 1,
  87 |           noLink: true,
  88 |         });
  89 |         if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
  90 |       } else {
  91 |         await dialog.showMessageBox({
  92 |           type: "warning",
  93 |           title: "Pass-Through unavailable",
  94 |           message: "uIOhook couldn’t start even though the C++ runtime is present.",
  95 |           detail:
  96 |             "Possible causes: antivirus/anti-cheat blocking global hooks, architecture mismatch, native module not rebuilt, or asar not unpacked.\n\n" +
  97 |             "You can still use function keys (F1/F2) in limited mode. " +
  98 |             "To use A–Z / 0–9 with pass-through, ensure uIOhook loads successfully.",
  99 |           buttons: ["OK"],
 100 |           noLink: true,
 101 |         });
 102 |       }
 103 |       // fallback mode
 104 |       setUsingUiohook(false);
 105 |     })();
 106 |     return;
 107 |   }
 108 | 
 109 |   // Handlers
 110 |   const RATE = 180;
 111 |   let lastToggle = 0,
 112 |     lastSwap = 0;
 113 | 
 114 |   _uIOhook.on("keydown", (e) => {
 115 |     logHK &&
 116 |       logHK("uiohook keydown", {
 117 |         keycode: e.keycode,
 118 |         captureState: isCapturing(),
 119 |         now: Date.now(),
 120 |         blockUntil: getCaptureBlockUntil(),
 121 |       });
 122 | 
 123 |     // Capture: récupérer le keycode
 124 |     if (isCapturing()) {
 125 |       onCaptureKeyboardCode(e.keycode);
 126 |       return;
 127 |     }
 128 | 
 129 |     // Runtime: déclenchement si codes définis
 130 |     if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
 131 |     if (Date.now() < getCaptureBlockUntil()) return;
 132 | 
 133 |     const now = Date.now();
 134 |     const hk = getHotkeys();
 135 |     if (Number.isFinite(hk.start) && e.keycode === hk.start) {
 136 |       if (now - lastToggle < RATE) return;
 137 |       lastToggle = now;
 138 |       dispatchHotkey("toggle");
 139 |     } else if (Number.isFinite(hk.swap) && e.keycode === hk.swap) {
 140 |       if (now - lastSwap < RATE) return;
 141 |       lastSwap = now;
 142 |       dispatchHotkey("swap");
 143 |     }
 144 |   });
 145 | 
 146 |   // Souris
 147 |   let lastMouseToggle = 0,
 148 |     lastMouseSwap = 0;
 149 | 
 150 |   function mouseLabelFromEvent(e, kind) {
 151 |     if (kind === "wheel") {
 152 |       const rot =
 153 |         typeof e.rotation === "number"
 154 |           ? e.rotation
 155 |           : typeof e.amount === "number"
 156 |           ? e.amount
 157 |           : typeof e.deltaY === "number"
 158 |           ? e.deltaY
 159 |           : 0;
 160 |       return rot < 0 ? "WHEEL_UP" : "WHEEL_DOWN";
 161 |     }
 162 |     const b = e.button; // 1=left,2=right,3=middle,>=4 extra
 163 |     if (b === 1 || b === 2) return null; // exclure gauche/droit
 164 |     if (b === 3) return "MOUSE3";
 165 |     if (b >= 4) return `MOUSE${b}`;
 166 |     return null;
 167 |   }
 168 | 
 169 |   _uIOhook.on("mousedown", (e) => {
 170 |     const label = mouseLabelFromEvent(e, "mousedown");
 171 |     if (!label) return;
 172 | 
 173 |     // Capture: on pousse le label
 174 |     if (isCapturing()) {
 175 |       onCaptureMouseLabel(label);
 176 |       return;
 177 |     }
 178 | 
 179 |     // Runtime
 180 |     if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
 181 |     if (Date.now() < getCaptureBlockUntil()) return;
 182 | 
 183 |     const now = Date.now();
 184 |     const mb = getMouseBinds();
 185 |     if (mb.start && label === mb.start) {
 186 |       if (now - lastMouseToggle < RATE) return;
 187 |       lastMouseToggle = now;
 188 |       dispatchHotkey("toggle");
 189 |     } else if (mb.swap && label === mb.swap) {
 190 |       if (now - lastMouseSwap < RATE) return;
 191 |       lastMouseSwap = now;
 192 |       dispatchHotkey("swap");
 193 |     }
 194 |   });
 195 | 
 196 |   _uIOhook.on("wheel", (e) => {
 197 |     const label = mouseLabelFromEvent(e, "wheel");
 198 | 
 199 |     if (isCapturing()) {
 200 |       onCaptureMouseLabel(label);
 201 |       return;
 202 |     }
 203 | 
 204 |     if (!getOverlayWindow() || getOverlayWindow().isDestroyed()) return;
 205 |     if (Date.now() < getCaptureBlockUntil()) return;
 206 | 
 207 |     const now = Date.now();
 208 |     const mb = getMouseBinds();
 209 |     if (mb.start && label === mb.start) {
 210 |       if (now - lastMouseToggle < RATE) return;
 211 |       lastMouseToggle = now;
 212 |       dispatchHotkey("toggle");
 213 |     } else if (mb.swap && label === mb.swap) {
 214 |       if (now - lastMouseSwap < RATE) return;
 215 |       lastMouseSwap = now;
 216 |       dispatchHotkey("swap");
 217 |     }
 218 |   });
 219 | 
 220 |   // Démarrer
 221 |   try {
 222 |     _uIOhook.start();
 223 |     logHK && logHK("uiohook started (capture enabled)");
 224 |   } catch (e) {
 225 |     logHK && logHK("uiohook START failed -> fallback", e?.message || e);
 226 |     setUsingUiohook(false);
 227 |     return;
 228 |   }
 229 | 
 230 |   // Mode d'entrée : fallback tant que les deux codes ne sont pas définis
 231 |   const hk = getHotkeys();
 232 |   const haveCodes = Number.isFinite(hk.start) && Number.isFinite(hk.swap);
 233 |   setUsingUiohook(!!haveCodes);
 234 | }
 235 | 
 236 | module.exports = {
 237 |   setupUiohook,
 238 |   start,
 239 |   stop,
 240 |   isLoaded,
 241 | };

```

`dbdoverlaytools-free/electron\main.mjs`:

```mjs
   1 | import {
   2 |   app,
   3 |   BrowserWindow,
   4 |   ipcMain,
   5 |   globalShortcut,
   6 |   shell,
   7 |   Menu,
   8 |   dialog,
   9 | } from "electron";
  10 | import { join, dirname } from "node:path";
  11 | import { fileURLToPath } from "node:url";
  12 | import Store from "electron-store";
  13 | import { createRequire } from "node:module";
  14 | import fs from "node:fs";
  15 | 
  16 | const require = createRequire(import.meta.url);
  17 | 
  18 | // Modules CJS
  19 | const windows = require("./windows/windows.cjs");
  20 | const capture = require("./hotkeys/capture.cjs");
  21 | const uio = require("./input/uiohook.cjs");
  22 | const {
  23 |   setupGamepadExe,
  24 |   onGamepadRaw,
  25 |   setGamepadMapping,
  26 |   clearGamepadMapping,
  27 |   getGamepadMapping,
  28 | } = require("./input/gamepad-exe.cjs");
  29 | 
  30 | /** Charge .env/.env.development UNIQUEMENT en dev, si "dotenv" est présent. */
  31 | (function loadDevEnv() {
  32 |   if (app.isPackaged) return; // en prod: ne rien charger
  33 |   let dotenv;
  34 |   try {
  35 |     dotenv = require("dotenv");
  36 |   } catch {
  37 |     return;
  38 |   }
  39 |   const root = process.cwd();
  40 |   for (const name of [".env", ".env.development"]) {
  41 |     const p = join(root, name);
  42 |     if (fs.existsSync(p)) dotenv.config({ path: p, override: true });
  43 |   }
  44 | })();
  45 | 
  46 | /* -------------------- flags via .env -------------------- */
  47 | const FORCE_NO_UIOHOOK = process.env.FORCE_NO_UIOHOOK === "1";
  48 | const FORCE_NO_VCREDIST = process.env.FORCE_NO_VCREDIST === "1";
  49 | const DEBUG_HK = process.env.DEBUG_HK === "1";
  50 | 
  51 | const __dirname = dirname(fileURLToPath(import.meta.url));
  52 | const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  53 | 
  54 | if (process.platform === "win32") {
  55 |   app.setAppUserModelId("com.steaxs.dbdtimer.free");
  56 | }
  57 | 
  58 | const iconPath = isDev
  59 |   ? join(__dirname, "../build/icon.ico")
  60 |   : join(process.resourcesPath, "icon.ico");
  61 | 
  62 | const store = new Store();
  63 | 
  64 | // single-instance (évite hooks dupliqués)
  65 | if (!app.requestSingleInstanceLock()) {
  66 |   app.quit();
  67 | }
  68 | 
  69 | /* -------------------- store keys & defaults -------------------- */
  70 | const K = {
  71 |   WINDOW: "windowState",
  72 |   OVERLAY: "overlaySettings",
  73 |   TIMER: "timerData",
  74 |   HK_CODES: "hotkeys",
  75 |   HK_LABELS: "hotkeysLabel",
  76 |   MOUSE_BINDS: "mouseBinds",
  77 | };
  78 | const defaults = {
  79 |   [K.OVERLAY]: {
  80 |     x: 0,
  81 |     y: 0,
  82 |     scale: 100,
  83 |     locked: true,
  84 |     alwaysOnTop: true,
  85 |     nameTheme: 'default',
  86 |     accentKey: 'default',
  87 |     autoScoreEnabled: true,         // ← NEW
  88 |     autoScoreThresholdSec: 25,      // ← NEW
  89 |   },
  90 |   [K.TIMER]: {
  91 |     player1: { name: "Player 1", score: 0 },
  92 |     player2: { name: "Player 2", score: 0 },
  93 |   },
  94 |   [K.HK_CODES]: { start: null, swap: null },
  95 |   [K.HK_LABELS]: { start: "F1", swap: "F2" },
  96 |   [K.MOUSE_BINDS]: { start: null, swap: null },
  97 | };
  98 | 
  99 | const getStore = (key) => store.get(key) ?? defaults[key];
 100 | 
 101 | /* -------------------- état runtime -------------------- */
 102 | let mainWindow = null;
 103 | let overlayWindow = null;
 104 | let usingUiohook = false;
 105 | 
 106 | // dimensions non-scalées du contenu (hors drag bar)
 107 | let baseDims = { width: 520, height: 120 };
 108 | 
 109 | // hotkeys: codes (uiohook) + labels (affichage & fallback)
 110 | let hotkeys = getStore(K.HK_CODES);
 111 | let hotkeysLabel = getStore(K.HK_LABELS);
 112 | let mouseBinds = getStore(K.MOUSE_BINDS);
 113 | 
 114 | // ===== debug =====
 115 | const logHK = (...args) => {
 116 |   if (DEBUG_HK) console.log("[HK]", ...args);
 117 | };
 118 | 
 119 | /* -------------------- helpers communs -------------------- */
 120 | const VC_REDIST_X64_URL = "https://aka.ms/vs/17/release/vc_redist.x64.exe";
 121 | 
 122 | // Détection VC++ 2015–2022 (x64)
 123 | function hasVCRedist() {
 124 |   if (FORCE_NO_VCREDIST) return false;
 125 |   if (process.platform !== "win32") return true;
 126 |   const win = process.env.windir || "C:\\Windows";
 127 |   const sys32 = join(win, "System32");
 128 |   const dlls = ["vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll"];
 129 |   try {
 130 |     return dlls.every((d) => fs.existsSync(join(sys32, d)));
 131 |   } catch {
 132 |     return false;
 133 |   }
 134 | }
 135 | 
 136 | // Dédup unifié
 137 | function createRateLimiter(defaultMs = 200) {
 138 |   const last = new Map();
 139 |   return (key, ms = defaultMs) => {
 140 |     const now = Date.now();
 141 |     const t = last.get(key) || 0;
 142 |     if (now - t < ms) return false;
 143 |     last.set(key, now);
 144 |     return true;
 145 |   };
 146 | }
 147 | const canFire = createRateLimiter(220);
 148 | 
 149 | function isAlphaNumLabel(k) {
 150 |   return typeof k === "string" && /^[A-Z0-9]$/.test(k);
 151 | }
 152 | 
 153 | // Normalise un label depuis before-input-event (fallback)
 154 | function makeLabelFromBeforeInput(input) {
 155 |   let k = input.key || "";
 156 |   if (/^F\d{1,2}$/.test(k)) return k;
 157 |   if (/^[a-z]$/.test(k)) return k.toUpperCase();
 158 |   if (/^\d$/.test(k)) return k;
 159 |   if (k === " ") return "SPACE";
 160 |   const map = {
 161 |     Escape: "ESC",
 162 |     Tab: "TAB",
 163 |     Enter: "ENTER",
 164 |     Backspace: "BACKSPACE",
 165 |     Shift: "SHIFT",
 166 |     Control: "CTRL",
 167 |     Alt: "ALT",
 168 |     Meta: "META",
 169 |     ArrowUp: "UP",
 170 |     ArrowDown: "DOWN",
 171 |     ArrowLeft: "LEFT",
 172 |     ArrowRight: "RIGHT",
 173 |   };
 174 |   if (map[k]) return map[k];
 175 |   const code = input.code || "";
 176 |   if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
 177 |   if (/^Digit\d$/.test(code)) return code.slice(5);
 178 |   return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
 179 | }
 180 | 
 181 | /* -------------------- dispatch centralisé vers l’overlay -------------------- */
 182 | function dispatchHotkey(type) {
 183 |   if (!overlayWindow || overlayWindow.isDestroyed()) return;
 184 |   if (!canFire(type, 220)) return;
 185 |   overlayWindow.webContents.send("global-hotkey", { type });
 186 |   logHK("DISPATCH", type);
 187 | }
 188 | 
 189 | /* -------------------- wiring modules -------------------- */
 190 | // Initialiser le module fenêtres
 191 | windows.initWindows({
 192 |   store,
 193 |   iconPath,
 194 |   isDev,
 195 |   baseDims,
 196 |   getBaseDims: () => baseDims,
 197 |   setBaseDims: (w, h) => {
 198 |     baseDims = { width: Math.max(1, Math.floor(w)), height: Math.max(1, Math.floor(h)) };
 199 |   },
 200 |   onOverlayMove: (x, y) => {
 201 |     // débounce léger (100ms)
 202 |     if (windows._moveDebounce) clearTimeout(windows._moveDebounce);
 203 |     windows._moveDebounce = setTimeout(() => {
 204 |       store.set("overlaySettings.x", x);
 205 |       store.set("overlaySettings.y", y);
 206 |     }, 120);
 207 |   },
 208 |   onOverlayReadyChange: (ready) => {
 209 |     if (mainWindow && !mainWindow.isDestroyed())
 210 |       mainWindow.webContents.send("overlay-ready", !!ready);
 211 |   },
 212 | });
 213 | 
 214 | // Initialiser le module capture
 215 | capture.initCapture({
 216 |   ipcMain,
 217 |   store,
 218 |   globalShortcut,
 219 |   dialog,
 220 |   shell,
 221 |   VC_REDIST_X64_URL,
 222 |   hasVCRedist,
 223 |   logHK,
 224 |   getMainWindow: () => mainWindow,
 225 |   getOverlayWindow: () => overlayWindow,
 226 |   getUsingUiohook: () => usingUiohook,
 227 |   setUsingUiohook: (v) => (usingUiohook = !!v),
 228 |   getHotkeys: () => hotkeys,
 229 |   setHotkeys: (next) => {
 230 |     hotkeys = next;
 231 |     store.set(K.HK_CODES, hotkeys);
 232 |   },
 233 |   getHotkeysLabel: () => hotkeysLabel,
 234 |   setHotkeysLabel: (next) => {
 235 |     hotkeysLabel = next;
 236 |     store.set(K.HK_LABELS, hotkeysLabel);
 237 |   },
 238 |   getMouseBinds: () => mouseBinds,
 239 |   setMouseBinds: (next) => {
 240 |     mouseBinds = next;
 241 |     store.set(K.MOUSE_BINDS, mouseBinds);
 242 |   },
 243 |   makeLabelFromBeforeInput,
 244 |   isAlphaNumLabel,
 245 |   sendHotkeysMode: (mode) => {
 246 |     if (mainWindow && !mainWindow.isDestroyed()) {
 247 |       mainWindow.webContents.send("hotkeys-mode", mode);
 248 |     }
 249 |   },
 250 |   dispatchHotkey,
 251 |   onGamepadRaw,         // ↔️ gamepad
 252 |   setGamepadMapping,
 253 |   clearGamepadMapping,    // ↔️ gamepad
 254 | });
 255 | 
 256 | // Initialiser le module uIOhook (clavier + souris)
 257 | uio.setupUiohook({
 258 |   require,            // pour charger uiohook-napi
 259 |   FORCE_NO_UIOHOOK,
 260 |   hasVCRedist,
 261 |   dialog,
 262 |   shell,
 263 |   VC_REDIST_X64_URL,
 264 |   logHK,
 265 |   getOverlayWindow: () => overlayWindow,
 266 |   dispatchHotkey,
 267 |   // capture integration:
 268 |   isCapturing: () => capture.isCapturing(),
 269 |   getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 270 |   onCaptureKeyboardCode: (code) => capture.onKeyboardCode(code),
 271 |   onCaptureMouseLabel: (label) => capture.onMouseLabel(label),
 272 |   // binds & codes
 273 |   getHotkeys: () => hotkeys,
 274 |   getMouseBinds: () => mouseBinds,
 275 |   setUsingUiohook: (v) => {
 276 |     usingUiohook = !!v;
 277 |     const mode = usingUiohook ? "pass-through" : "fallback";
 278 |     if (mainWindow && !mainWindow.isDestroyed()) {
 279 |       mainWindow.webContents.send("hotkeys-mode", mode);
 280 |     }
 281 |     if (!usingUiohook) {
 282 |       // (re)activer globalShortcut fallback
 283 |       capture.refreshHotkeyEngine({
 284 |         globalShortcut,
 285 |         hotkeysLabel,
 286 |         isAlphaNumLabel,
 287 |         logHK,
 288 |         getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 289 |         dispatchHotkey,
 290 |       });
 291 |     } else {
 292 |       try {
 293 |         globalShortcut.unregisterAll();
 294 |       } catch {}
 295 |     }
 296 |   },
 297 | });
 298 | 
 299 | // Expose quelques helpers Windows au module capture
 300 | capture.attachWindowsAPI({
 301 |   sendOverlaySettings: () => windows.sendOverlaySettings(overlayWindow, store, isDev),
 302 | });
 303 | 
 304 | /* -------------------- IPC (panneau ↔ main) -------------------- */
 305 | function setupIPC() {
 306 |   ipcMain.handle("overlay-show", () => {
 307 |     overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
 308 |     return true;
 309 |   });
 310 |   ipcMain.handle("overlay-hide", () => {
 311 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
 312 |     overlayWindow = null;
 313 |     if (mainWindow && !mainWindow.isDestroyed())
 314 |       mainWindow.webContents.send("overlay-ready", false);
 315 |     return true;
 316 |   });
 317 | 
 318 |   ipcMain.handle("overlay-settings-update", (_evt, settings) => {
 319 |     const current = getStore(K.OVERLAY);
 320 |     const next = { ...current, ...settings };
 321 |     store.set(K.OVERLAY, next);
 322 |     if (!overlayWindow || overlayWindow.isDestroyed()) return true;
 323 | 
 324 |     if (settings.locked !== undefined) {
 325 |       overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
 326 |       overlayWindow.setFocusable(true); // OBS/Alt-Tab
 327 |     }
 328 |     if (settings.alwaysOnTop !== undefined)
 329 |       windows.applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
 330 |     if (settings.x !== undefined || settings.y !== undefined) {
 331 |       const b = overlayWindow.getBounds();
 332 |       overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y);
 333 |     }
 334 |     if (settings.scale !== undefined || settings.locked !== undefined)
 335 |       windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
 336 |     windows.sendOverlaySettings(overlayWindow, store, isDev);
 337 |     return true;
 338 |   });
 339 | 
 340 |   ipcMain.handle("overlay-measure", (_evt, dims) => {
 341 |     if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
 342 |       return false;
 343 |     baseDims = {
 344 |       width: Math.max(1, Math.floor(dims.width)),
 345 |       height: Math.max(1, Math.floor(dims.height)),
 346 |     };
 347 |     windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
 348 |     return true;
 349 |   });
 350 | 
 351 |   // Timer data
 352 |   ipcMain.handle("timer-data-get", () => getStore(K.TIMER));
 353 |   ipcMain.handle("timer-data-set", (_evt, data) => {
 354 |     store.set(K.TIMER, data);
 355 |     if (overlayWindow && !overlayWindow.isDestroyed())
 356 |       overlayWindow.webContents.send("timer-data-sync", data);
 357 |     return true;
 358 |   });
 359 | 
 360 |   // Hotkeys API
 361 |   ipcMain.handle("hotkeys-get", () => ({
 362 |     start: hotkeys.start,
 363 |     swap: hotkeys.swap,
 364 |     startLabel: hotkeysLabel.start,
 365 |     swapLabel: hotkeysLabel.swap,
 366 |     mode: usingUiohook ? "pass-through" : "fallback",
 367 |   }));
 368 |   
 369 |   ipcMain.handle("gamepad-mapping-get", () => getGamepadMapping());
 370 |   ipcMain.handle("gamepad-mapping-clear", (_evt, action) => {
 371 |     clearGamepadMapping(action === "swap" ? "swap" : "toggle");
 372 |     return getGamepadMapping();
 373 |   });
 374 | 
 375 |   ipcMain.handle("hotkeys-set", (_evt, hk) => {
 376 |     hotkeys = { ...hotkeys, ...hk }; // codes uiohook si fournis
 377 |     store.set(K.HK_CODES, hotkeys);
 378 | 
 379 |     const haveCodes =
 380 |       Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);
 381 | 
 382 |     if (haveCodes && uio.isLoaded()) {
 383 |       // on bascule en pass-through
 384 |       try {
 385 |         globalShortcut.unregisterAll();
 386 |       } catch {}
 387 |       usingUiohook = true;
 388 |       if (mainWindow && !mainWindow.isDestroyed())
 389 |         mainWindow.webContents.send("hotkeys-mode", "pass-through");
 390 |     } else if (!haveCodes) {
 391 |       usingUiohook = false;
 392 |       capture.refreshHotkeyEngine({
 393 |         globalShortcut,
 394 |         hotkeysLabel,
 395 |         isAlphaNumLabel,
 396 |         logHK,
 397 |         getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 398 |         dispatchHotkey,
 399 |       });
 400 |       if (mainWindow && !mainWindow.isDestroyed())
 401 |         mainWindow.webContents.send("hotkeys-mode", "fallback");
 402 |     }
 403 |     return true;
 404 |   });
 405 | 
 406 |   // 🚀 Capture: tout le workflow (IPC) déplacé dans le module capture
 407 |   capture.setupCaptureIPC();
 408 | }
 409 | 
 410 | /* -------------------- lifecycle -------------------- */
 411 | app.commandLine.appendSwitch("enable-zero-copy");
 412 | app.commandLine.appendSwitch("ignore-gpu-blocklist");
 413 | 
 414 | app.whenReady().then(() => {
 415 |   mainWindow = windows.createMainWindow(store, iconPath, isDev);
 416 |   setupIPC();
 417 |   uio.start(); // lance uIOhook (si possible) et configure mode fallback/pass-through
 418 |   setTimeout(() => {
 419 |     overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
 420 |   }, 800);
 421 |   setupGamepadExe();
 422 | }).catch(err => console.error("[Electron] whenReady error:", err));
 423 | 
 424 | app.on("second-instance", () => {
 425 |   if (mainWindow) {
 426 |     if (mainWindow.isMinimized()) mainWindow.restore();
 427 |     mainWindow.show();
 428 |     mainWindow.focus();
 429 |   }
 430 | });
 431 | 
 432 | app.on("will-quit", () => {
 433 |   try {
 434 |     if (uio.isLoaded()) uio.stop();
 435 |   } catch {}
 436 |   try {
 437 |     globalShortcut.unregisterAll();
 438 |   } catch {}
 439 | });
 440 | 
 441 | app.on("window-all-closed", () => {
 442 |   app.quit();
 443 | });

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
  20 |     capture: (arg1, arg2) => ipcRenderer.invoke('hotkeys-capture', arg1, arg2),
  21 |     onCaptured: (cb) => ipcRenderer.on('hotkeys-captured', (_, p) => cb(p)),
  22 |     on: (cb) => ipcRenderer.on('global-hotkey', (_, payload) => cb(payload)),
  23 |     onMode: (cb) => ipcRenderer.on('hotkeys-mode', (_, mode) => cb(mode))
  24 |   },
  25 |   gamepad: {
  26 |     get: () => ipcRenderer.invoke('gamepad-mapping-get'),
  27 |     clear: (action) => ipcRenderer.invoke('gamepad-mapping-clear', action),
  28 |   }
  29 | });

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

`dbdoverlaytools-free/electron\windows\windows.cjs`:

```cjs
   1 | // electron/windows/windows.cjs
   2 | const { BrowserWindow, shell, screen, Menu } = require("electron");
   3 | const { join } = require("node:path");
   4 | 
   5 | let store = null;
   6 | let iconPath = "";
   7 | let isDev = false;
   8 | let baseDims = { width: 520, height: 120 };
   9 | let _getBaseDims = () => baseDims;
  10 | let _setBaseDims = (w, h) => (baseDims = { width: w, height: h });
  11 | let _onOverlayMove = null;
  12 | let _onOverlayReadyChange = null;
  13 | 
  14 | let mainWindow = null;
  15 | let overlayWindow = null;
  16 | 
  17 | function initWindows(ctx) {
  18 |   store = ctx.store;
  19 |   iconPath = ctx.iconPath;
  20 |   isDev = !!ctx.isDev;
  21 |   baseDims = ctx.baseDims || baseDims;
  22 |   _getBaseDims = ctx.getBaseDims || _getBaseDims;
  23 |   _setBaseDims = ctx.setBaseDims || _setBaseDims;
  24 |   _onOverlayMove = ctx.onOverlayMove || null;
  25 |   _onOverlayReadyChange = ctx.onOverlayReadyChange || null;
  26 | }
  27 | 
  28 | function applyAlwaysOnTop(win, on) {
  29 |   try {
  30 |     win.setAlwaysOnTop(!!on, "screen-saver");
  31 |     win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  32 |     win.setFullScreenable(false);
  33 |   } catch {}
  34 | }
  35 | 
  36 | function enforceExternalLinks(win) {
  37 |   if (!win || win.isDestroyed()) return;
  38 | 
  39 |   // window.open / target=_blank
  40 |   win.webContents.setWindowOpenHandler(({ url }) => {
  41 |     if (/^https?:\/\//i.test(url)) {
  42 |       shell.openExternal(url);
  43 |       return { action: "deny" };
  44 |     }
  45 |     return { action: "deny" };
  46 |   });
  47 | 
  48 |   // Drag’n’drop/lien cliqué qui tenterait une navigation
  49 |   win.webContents.on("will-navigate", (e, url) => {
  50 |     const isLocal = url.startsWith("file:") || url.startsWith("http://localhost");
  51 |     if (!isLocal && /^https?:\/\//i.test(url)) {
  52 |       e.preventDefault();
  53 |       shell.openExternal(url);
  54 |     }
  55 |   });
  56 | 
  57 |   // Pas de menu « Inspecter » en prod
  58 |   if (!isDev) win.webContents.on("context-menu", (e) => e.preventDefault());
  59 | }
  60 | 
  61 | function sendOverlaySettings(ov, storeRef, isDevFlag) {
  62 |   if (ov && !ov.isDestroyed()) {
  63 |     const s = (storeRef || store).get("overlaySettings", {
  64 |       x: 0,
  65 |       y: 0,
  66 |       scale: 100,
  67 |       locked: true,
  68 |       alwaysOnTop: true,
  69 |       nameTheme: 'default',
  70 |       accentKey: 'default',
  71 |       autoScoreEnabled: true,    // ← NEW
  72 |       autoScoreThresholdSec: 25, // ← NEW
  73 |     });
  74 |     ov.webContents.send("overlay-settings", s);
  75 |   }
  76 | }
  77 | 
  78 | function recomputeOverlaySize(ov, storeRef, getBaseDims) {
  79 |   if (!ov || ov.isDestroyed()) return;
  80 |   const s =
  81 |     (storeRef || store).get("overlaySettings", { scale: 100, locked: true });
  82 |   const dragH = s.locked ? 0 : 30;
  83 |   const scale = (s.scale || 100) / 100;
  84 |   const dims = (getBaseDims || _getBaseDims)();
  85 |   const w = Math.ceil(dims.width * scale);
  86 |   const h = Math.ceil((dims.height + dragH) * scale);
  87 |   ov.setContentSize(w, h);
  88 |   sendOverlaySettings(ov, storeRef, isDev);
  89 | }
  90 | 
  91 | function createMainWindow(storeRef, icoPath, isDevFlag) {
  92 |   const saved = (storeRef || store).get("windowState") || {};
  93 |   const width = Math.max(saved.width || 1120, 980);
  94 |   const height = Math.max(saved.height || 820, 720);
  95 | 
  96 |   mainWindow = new BrowserWindow({
  97 |     width,
  98 |     height,
  99 |     x: saved.x,
 100 |     y: saved.y,
 101 |     minWidth: 980,
 102 |     minHeight: 720,
 103 |     show: false,
 104 |     icon: icoPath || iconPath,
 105 |     autoHideMenuBar: true,
 106 |     webPreferences: {
 107 |       nodeIntegration: false,
 108 |       contextIsolation: true,
 109 |       preload: join(__dirname, "../preload.cjs"),
 110 |       devTools: !!isDevFlag || isDev,
 111 |     },
 112 |   });
 113 | 
 114 |   Menu.setApplicationMenu?.(null);
 115 |   mainWindow.setMenuBarVisibility(false);
 116 |   enforceExternalLinks(mainWindow);
 117 | 
 118 |   // Bloque Alt menu (évite le flash de barre menu)
 119 |   mainWindow.webContents.on("before-input-event", (event, input) => {
 120 |     if (
 121 |       input.type === "keyDown" &&
 122 |       (input.key === "Alt" || input.code === "AltLeft" || input.code === "AltRight")
 123 |     ) {
 124 |       event.preventDefault();
 125 |     }
 126 |   });
 127 | 
 128 |   if (!!isDevFlag || isDev) {
 129 |     mainWindow.loadURL("http://localhost:5173");
 130 |     mainWindow.webContents.openDevTools({ mode: "detach" });
 131 |   } else {
 132 |     mainWindow.loadFile(join(__dirname, "../../dist/index.html"));
 133 |     // Bloque F12 / Ctrl+Shift+I en prod (existant côté panel)
 134 |     mainWindow.webContents.on("before-input-event", (e, input) => {
 135 |       const combo =
 136 |         (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
 137 |       if (combo || input.key === "F12") e.preventDefault();
 138 |     });
 139 |   }
 140 | 
 141 |   mainWindow.once("ready-to-show", () => mainWindow.show());
 142 |   mainWindow.on("close", () => {
 143 |     const b = mainWindow.getBounds();
 144 |     (storeRef || store).set("windowState", b);
 145 |   });
 146 |   mainWindow.on("closed", () => {
 147 |     mainWindow = null;
 148 |     if (overlayWindow) overlayWindow.close();
 149 |   });
 150 | 
 151 |   return mainWindow;
 152 | }
 153 | 
 154 | function createOverlayWindow(currentOverlay, currentMain) {
 155 |   if (currentOverlay && !currentOverlay.isDestroyed()) {
 156 |     currentOverlay.show();
 157 |     currentOverlay.focus();
 158 |     overlayWindow = currentOverlay;
 159 |     return overlayWindow;
 160 |   }
 161 | 
 162 |   // --- INIT ROBUSTE ---
 163 |   let s = (store || {}).get?.("overlaySettings") || {};
 164 |   const pd = screen.getPrimaryDisplay();
 165 |   const origin = pd.bounds;
 166 | 
 167 |   if (!Number.isFinite(s.x)) s.x = origin.x;
 168 |   if (!Number.isFinite(s.y)) s.y = origin.y;
 169 |   if (typeof s.scale !== "number") s.scale = 100;
 170 |   if (typeof s.locked !== "boolean") s.locked = true;
 171 |   if (typeof s.alwaysOnTop !== "boolean") s.alwaysOnTop = true;
 172 |   store.set("overlaySettings", s);
 173 |   // --- FIN INIT ROBUSTE
 174 | 
 175 |   const dragH = s.locked ? 0 : 30;
 176 |   const scale = (s.scale || 100) / 100;
 177 |   const dims = _getBaseDims();
 178 | 
 179 |   overlayWindow = new BrowserWindow({
 180 |     width: Math.ceil(dims.width * scale),
 181 |     height: Math.ceil((dims.height + dragH) * scale),
 182 |     x: s.x,
 183 |     y: s.y,
 184 |     frame: false,
 185 |     transparent: true,
 186 |     resizable: false,
 187 |     hasShadow: false,
 188 |     skipTaskbar: false,
 189 |     focusable: true,
 190 |     title: "DBD Timer Overlay by Steaxs & Doc",
 191 |     acceptFirstMouse: true,
 192 |     backgroundColor: "#00000000",
 193 |     useContentSize: true,
 194 |     show: false,
 195 |     webPreferences: {
 196 |       nodeIntegration: false,
 197 |       contextIsolation: true,
 198 |       preload: join(__dirname, "../preload.cjs"),
 199 |       backgroundThrottling: false,
 200 |       devTools: !!isDev,
 201 |     },
 202 |   });
 203 | 
 204 |   overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
 205 |   applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);
 206 | 
 207 |   const url = isDev
 208 |     ? "http://localhost:5173/overlay.html"
 209 |     : join(__dirname, "../../dist/overlay.html");
 210 |   if (isDev) overlayWindow.loadURL(url);
 211 |   else overlayWindow.loadFile(url);
 212 | 
 213 |   enforceExternalLinks(overlayWindow);
 214 | 
 215 |   if (!isDev) {
 216 |     overlayWindow.webContents.on("before-input-event", (e, input) => {
 217 |       const combo =
 218 |         (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
 219 |       if (combo || input.key === "F12") e.preventDefault();
 220 |     });
 221 |   }
 222 | 
 223 |   overlayWindow.on("closed", () => {
 224 |     overlayWindow = null;
 225 |     _onOverlayReadyChange && _onOverlayReadyChange(false);
 226 |   });
 227 |   overlayWindow.on("move", () => {
 228 |     const b = overlayWindow.getBounds();
 229 |     _onOverlayMove && _onOverlayMove(b.x, b.y);
 230 |   });
 231 | 
 232 |   overlayWindow.webContents.on("did-finish-load", () => {
 233 |     const data =
 234 |       store.get("timerData") || {
 235 |         player1: { name: "Player 1", score: 0 },
 236 |         player2: { name: "Player 2", score: 0 },
 237 |       };
 238 |     overlayWindow.webContents.send("timer-data-sync", data);
 239 | 
 240 |     sendOverlaySettings(overlayWindow, store, isDev);
 241 |     recomputeOverlaySize(overlayWindow, store, _getBaseDims);
 242 | 
 243 |     _onOverlayReadyChange && _onOverlayReadyChange(true);
 244 |     overlayWindow.show();
 245 |   });
 246 | 
 247 |   return overlayWindow;
 248 | }
 249 | 
 250 | module.exports = {
 251 |   initWindows,
 252 |   createMainWindow,
 253 |   createOverlayWindow,
 254 |   enforceExternalLinks,
 255 |   applyAlwaysOnTop,
 256 |   sendOverlaySettings,
 257 |   recomputeOverlaySize,
 258 | 
 259 |   // (utiles si besoin)
 260 |   getMainWindow: () => mainWindow,
 261 |   getOverlayWindow: () => overlayWindow,
 262 | };

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

`dbdoverlaytools-free/native\xinput_bridge.cpp`:

```cpp
   1 | // native/xinput_bridge.cpp
   2 | // Compile : cl /O2 /EHsc xinput_bridge.cpp /link /SUBSYSTEM:CONSOLE
   3 | // Emissions stdout (une ligne par "press") :
   4 | //   BTN A|B|X|Y|LB|RB|LS|RS|START|BACK
   5 | //   DPAD UP|DOWN|LEFT|RIGHT
   6 | //   TRIGGER LT|RT
   7 | //   AXIS LX_POS|LX_NEG|LY_POS|LY_NEG|RX_POS|RX_NEG|RY_POS|RY_NEG
   8 | //
   9 | // Le Node bridge mappe ensuite ces libellés vers "toggle" / "swap".
  10 | 
  11 | #define WIN32_LEAN_AND_MEAN
  12 | #include <windows.h>
  13 | #include <Xinput.h>
  14 | #include <cstdio>
  15 | #include <cstring>
  16 | 
  17 | #pragma comment(lib, "Xinput9_1_0.lib") // fallback à l’édition disponible
  18 | 
  19 | typedef DWORD (WINAPI *XInputGetState_t)(DWORD, XINPUT_STATE*);
  20 | static XInputGetState_t pXInputGetState = nullptr;
  21 | static HMODULE hXInput = nullptr;
  22 | 
  23 | static bool loadXInput() {
  24 |     const wchar_t* dlls[] = {
  25 |         L"xinput1_4.dll",   // Win8+
  26 |         L"xinput1_3.dll",   // SDK June 2010
  27 |         L"xinput9_1_0.dll"  // Vista/Win7
  28 |     };
  29 |     for (auto dll : dlls) {
  30 |         hXInput = LoadLibraryW(dll);
  31 |         if (hXInput) {
  32 |             pXInputGetState = (XInputGetState_t)GetProcAddress(hXInput, "XInputGetState");
  33 |             if (pXInputGetState) return true;
  34 |             FreeLibrary(hXInput);
  35 |             hXInput = nullptr;
  36 |         }
  37 |     }
  38 |     return false;
  39 | }
  40 | 
  41 | static inline void emit(const char* s) {
  42 |     std::fputs(s, stdout);
  43 |     std::fputc('\n', stdout);
  44 |     std::fflush(stdout);
  45 | }
  46 | 
  47 | struct AxisLatch {
  48 |     bool pos = false;
  49 |     bool neg = false;
  50 | };
  51 | 
  52 | struct ControllerState {
  53 |     bool connected = false;
  54 |     bool initialized = false;
  55 |     XINPUT_STATE prev{};
  56 |     bool ltDown = false;
  57 |     bool rtDown = false;
  58 |     AxisLatch lx{}, ly{}, rx{}, ry{};
  59 | };
  60 | 
  61 | static const int TRIGGER_THRESHOLD = 30; // 0..255
  62 | static const SHORT LEFT_DEADZONE  = XINPUT_GAMEPAD_LEFT_THUMB_DEADZONE;  // 7849
  63 | static const SHORT RIGHT_DEADZONE = XINPUT_GAMEPAD_RIGHT_THUMB_DEADZONE; // 8689
  64 | 
  65 | static void checkButtons(const XINPUT_GAMEPAD& now, const XINPUT_GAMEPAD& old) {
  66 |     struct Btn { WORD mask; const char* name; } btns[] = {
  67 |         { XINPUT_GAMEPAD_A,             "BTN A" },
  68 |         { XINPUT_GAMEPAD_B,             "BTN B" },
  69 |         { XINPUT_GAMEPAD_X,             "BTN X" },
  70 |         { XINPUT_GAMEPAD_Y,             "BTN Y" },
  71 |         { XINPUT_GAMEPAD_LEFT_SHOULDER, "BTN LB" },
  72 |         { XINPUT_GAMEPAD_RIGHT_SHOULDER,"BTN RB" },
  73 |         { XINPUT_GAMEPAD_LEFT_THUMB,    "BTN LS" },
  74 |         { XINPUT_GAMEPAD_RIGHT_THUMB,   "BTN RS" },
  75 |         { XINPUT_GAMEPAD_BACK,          "BTN BACK" },
  76 |         { XINPUT_GAMEPAD_START,         "BTN START" },
  77 |         { XINPUT_GAMEPAD_DPAD_UP,       "DPAD UP" },
  78 |         { XINPUT_GAMEPAD_DPAD_DOWN,     "DPAD DOWN" },
  79 |         { XINPUT_GAMEPAD_DPAD_LEFT,     "DPAD LEFT" },
  80 |         { XINPUT_GAMEPAD_DPAD_RIGHT,    "DPAD RIGHT" },
  81 |     };
  82 |     for (auto& b : btns) {
  83 |         const bool pressedNow = (now.wButtons & b.mask) != 0;
  84 |         const bool pressedOld = (old.wButtons & b.mask) != 0;
  85 |         if (pressedNow && !pressedOld) {
  86 |             emit(b.name);
  87 |         }
  88 |     }
  89 | }
  90 | 
  91 | static void checkTriggers(ControllerState& c, const XINPUT_GAMEPAD& g) {
  92 |     // LT
  93 |     if (!c.ltDown && g.bLeftTrigger > TRIGGER_THRESHOLD) {
  94 |         emit("TRIGGER LT");
  95 |         c.ltDown = true;
  96 |     } else if (c.ltDown && g.bLeftTrigger <= TRIGGER_THRESHOLD) {
  97 |         c.ltDown = false;
  98 |     }
  99 |     // RT
 100 |     if (!c.rtDown && g.bRightTrigger > TRIGGER_THRESHOLD) {
 101 |         emit("TRIGGER RT");
 102 |         c.rtDown = true;
 103 |     } else if (c.rtDown && g.bRightTrigger <= TRIGGER_THRESHOLD) {
 104 |         c.rtDown = false;
 105 |     }
 106 | }
 107 | 
 108 | static void checkAxes(ControllerState& c, const XINPUT_GAMEPAD& g) {
 109 |     // LEFT X
 110 |     if (!c.lx.pos && g.sThumbLX > LEFT_DEADZONE) {
 111 |         emit("AXIS LX_POS");
 112 |         c.lx.pos = true;
 113 |     } else if (c.lx.pos && g.sThumbLX <= LEFT_DEADZONE) {
 114 |         c.lx.pos = false;
 115 |     }
 116 |     if (!c.lx.neg && g.sThumbLX < -LEFT_DEADZONE) {
 117 |         emit("AXIS LX_NEG");
 118 |         c.lx.neg = true;
 119 |     } else if (c.lx.neg && g.sThumbLX >= -LEFT_DEADZONE) {
 120 |         c.lx.neg = false;
 121 |     }
 122 | 
 123 |     // LEFT Y (note: Y haut = valeur positive)
 124 |     if (!c.ly.pos && g.sThumbLY > LEFT_DEADZONE) {
 125 |         emit("AXIS LY_POS");
 126 |         c.ly.pos = true;
 127 |     } else if (c.ly.pos && g.sThumbLY <= LEFT_DEADZONE) {
 128 |         c.ly.pos = false;
 129 |     }
 130 |     if (!c.ly.neg && g.sThumbLY < -LEFT_DEADZONE) {
 131 |         emit("AXIS LY_NEG");
 132 |         c.ly.neg = true;
 133 |     } else if (c.ly.neg && g.sThumbLY >= -LEFT_DEADZONE) {
 134 |         c.ly.neg = false;
 135 |     }
 136 | 
 137 |     // RIGHT X
 138 |     if (!c.rx.pos && g.sThumbRX > RIGHT_DEADZONE) {
 139 |         emit("AXIS RX_POS");
 140 |         c.rx.pos = true;
 141 |     } else if (c.rx.pos && g.sThumbRX <= RIGHT_DEADZONE) {
 142 |         c.rx.pos = false;
 143 |     }
 144 |     if (!c.rx.neg && g.sThumbRX < -RIGHT_DEADZONE) {
 145 |         emit("AXIS RX_NEG");
 146 |         c.rx.neg = true;
 147 |     } else if (c.rx.neg && g.sThumbRX >= -RIGHT_DEADZONE) {
 148 |         c.rx.neg = false;
 149 |     }
 150 | 
 151 |     // RIGHT Y
 152 |     if (!c.ry.pos && g.sThumbRY > RIGHT_DEADZONE) {
 153 |         emit("AXIS RY_POS");
 154 |         c.ry.pos = true;
 155 |     } else if (c.ry.pos && g.sThumbRY <= RIGHT_DEADZONE) {
 156 |         c.ry.pos = false;
 157 |     }
 158 |     if (!c.ry.neg && g.sThumbRY < -RIGHT_DEADZONE) {
 159 |         emit("AXIS RY_NEG");
 160 |         c.ry.neg = true;
 161 |     } else if (c.ry.neg && g.sThumbRY >= -RIGHT_DEADZONE) {
 162 |         c.ry.neg = false;
 163 |     }
 164 | }
 165 | 
 166 | int main() {
 167 |     // Pas de bruit de buffer
 168 |     setvbuf(stdout, nullptr, _IONBF, 0);
 169 | 
 170 |     if (!loadXInput()) {
 171 |         // XInput introuvable : on sort proprement (le parent peut décider de ne pas relancer)
 172 |         return 0;
 173 |     }
 174 | 
 175 |     ControllerState ctrl[4];
 176 | 
 177 |     while (true) {
 178 |         for (DWORD i = 0; i < 4; ++i) {
 179 |             XINPUT_STATE st{};
 180 |             DWORD res = pXInputGetState(i, &st);
 181 |             if (res == ERROR_SUCCESS) {
 182 |                 if (!ctrl[i].connected) {
 183 |                     ctrl[i].connected = true;
 184 |                     ctrl[i].initialized = false;
 185 |                     ctrl[i].ltDown = ctrl[i].rtDown = false;
 186 |                     ctrl[i].lx = AxisLatch{};
 187 |                     ctrl[i].ly = AxisLatch{};
 188 |                     ctrl[i].rx = AxisLatch{};
 189 |                     ctrl[i].ry = AxisLatch{};
 190 |                 }
 191 |                 if (!ctrl[i].initialized) {
 192 |                     ctrl[i].prev = st;
 193 |                     ctrl[i].initialized = true;
 194 |                 } else {
 195 |                     // boutons (détecte uniquement les fronts montants)
 196 |                     checkButtons(st.Gamepad, ctrl[i].prev.Gamepad);
 197 |                     ctrl[i].prev = st;
 198 |                 }
 199 |                 // gâchettes + axes (gérés via latch indépendants)
 200 |                 checkTriggers(ctrl[i], st.Gamepad);
 201 |                 checkAxes(ctrl[i], st.Gamepad);
 202 |             } else {
 203 |                 // déconnexion / indispo
 204 |                 ctrl[i] = ControllerState{};
 205 |             }
 206 |         }
 207 |         Sleep(8); // ~125 Hz
 208 |     }
 209 |     // Note : process stoppé par le parent (kill), pas de cleanup nécessaire
 210 |     return 0;
 211 | }

```

`dbdoverlaytools-free/overlay.html`:

```html
   1 | <!doctype html>
   2 | <html>
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules'">
   6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   7 |     <title>DBD Timer - Overlay by Steaxs & Doc</title>
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
   2 |   "name": "dbdtimer-steaxs",
   3 |   "version": "2.0.0",
   4 |   "private": true,
   5 |   "description": "DBD 1v1 Timer Overlay by Steaxs (Free)",
   6 |   "main": "electron/main.mjs",
   7 |   "author": "Steaxs",
   8 |   "license": "MIT",
   9 |   "type": "commonjs",
  10 |   "scripts": {
  11 |     "dev": "concurrently -k -n VITE,ELECTRON \"vite\" \"wait-on http://localhost:5173 && cross-env NODE_ENV=development electron .\"",
  12 |     "electron:dev": "npm run dev",
  13 |     "build": "vite build && npm run obfuscate:dist && electron-builder",
  14 |     "build:portable": "vite build && npm run obfuscate:dist && electron-builder --win portable",
  15 |     "build:installer": "vite build && npm run obfuscate:dist && electron-builder --win nsis",
  16 |     "build:dir": "vite build && npm run obfuscate:dist && electron-builder --win dir",
  17 |     "obfuscate:dist": "javascript-obfuscator dist --output dist --compact true --control-flow-flattening false --dead-code-injection false --string-array true --string-array-encoding base64 --string-array-threshold 0.5 --rename-properties false --target browser",
  18 |     "typecheck": "tsc --noEmit"
  19 |   },
  20 |   "dependencies": {
  21 |     "dotenv": "^17.2.1",
  22 |     "electron-store": "^9.0.0",
  23 |     "react": "^18.3.1",
  24 |     "react-dom": "^18.3.1",
  25 |     "uiohook-napi": "^1.5.4",
  26 |     "zustand": "^4.5.2"
  27 |   },
  28 |   "devDependencies": {
  29 |     "@types/node": "^20.12.12",
  30 |     "@types/react": "^18.3.3",
  31 |     "@types/react-dom": "^18.3.0",
  32 |     "@vitejs/plugin-react": "^4.3.1",
  33 |     "autoprefixer": "^10.4.19",
  34 |     "concurrently": "^9.0.1",
  35 |     "cross-env": "^7.0.3",
  36 |     "electron": "^30.0.9",
  37 |     "electron-builder": "^24.13.3",
  38 |     "javascript-obfuscator": "^4.0.2",
  39 |     "postcss": "^8.4.38",
  40 |     "tailwindcss": "^3.4.7",
  41 |     "typescript": "^5.5.4",
  42 |     "vite": "^5.4.19",
  43 |     "wait-on": "^7.2.0"
  44 |   },
  45 |   "build": {
  46 |     "appId": "com.steaxs.dbdtimer.free",
  47 |     "productName": "DBD Timer Overlay",
  48 |     "extraResources": [
  49 |       {
  50 |         "from": "build/icon.ico",
  51 |         "to": "icon.ico"
  52 |       },
  53 |       {
  54 |         "from": "native/xinput_bridge.exe",
  55 |         "to": "."
  56 |       }
  57 |     ],
  58 |     "directories": {
  59 |       "output": "release"
  60 |     },
  61 |     "nsis": {
  62 |       "oneClick": false,
  63 |       "allowToChangeInstallationDirectory": true,
  64 |       "createDesktopShortcut": "always",
  65 |       "createStartMenuShortcut": true,
  66 |       "deleteAppDataOnUninstall": true,
  67 |       "shortcutName": "DBD 1V1 Timer Overlay"
  68 |     },
  69 |     "files": [
  70 |       "dist/**",
  71 |       "electron/**",
  72 |       "package.json",
  73 |       "!**/*.map",
  74 |       "!**/*.ts",
  75 |       "!src/**"
  76 |     ],
  77 |     "asar": true,
  78 |     "asarUnpack": [
  79 |       "**/node_modules/uiohook-napi/**"
  80 |     ],
  81 |     "compression": "maximum",
  82 |     "win": {
  83 |       "icon": "build/icon.ico",
  84 |       "target": [
  85 |         {
  86 |           "target": "nsis",
  87 |           "arch": [
  88 |             "x64"
  89 |           ]
  90 |         },
  91 |         {
  92 |           "target": "portable",
  93 |           "arch": [
  94 |             "x64"
  95 |           ]
  96 |         }
  97 |       ],
  98 |       "artifactName": "DBD-Timer-Free-${version}-Setup.exe"
  99 |     }
 100 |   }
 101 | }

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

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | import React, { useEffect, useState } from "react";
   2 | import { ACCENTS, NAME_BG, AccentKey, NameTheme } from "@/themes/palette";
   3 | 
   4 | type HKGet = {
   5 |   start: number | null;
   6 |   swap: number | null;
   7 |   startLabel?: string;
   8 |   swapLabel?: string;
   9 | };
  10 | 
  11 | type GamepadMapping = {
  12 |   toggle: string[];
  13 |   swap: string[];
  14 | };
  15 | 
  16 | const ACCENT_LABELS_EN: Record<AccentKey, string> = {
  17 |   default: "Blue (default)",
  18 |   rose: "Pink",
  19 |   rouge: "Red",
  20 |   orange: "Orange",
  21 |   or: "Gold",
  22 |   jaune: "Yellow",
  23 |   vert: "Green",
  24 |   menthe: "Mint",
  25 |   bleu_fonce: "Dark Blue",
  26 |   bleu_clair: "Light Blue",
  27 |   cyan: "Sky/Cyan",
  28 |   violet: "Violet",
  29 |   lavande: "Lavender",
  30 |   marron: "Brown",
  31 |   anthracite: "Charcoal",
  32 |   argent: "Silver",
  33 |   corail: "Coral/Peach",
  34 | };
  35 | 
  36 | const ControlPanel: React.FC = () => {
  37 |   // Overlay
  38 |   const [overlayOn, setOverlayOn] = useState(false);
  39 |   const [locked, setLocked] = useState(true);
  40 |   const [scale, setScale] = useState(100);
  41 | 
  42 |   const [nameTheme, setNameTheme] = useState<NameTheme>("default");
  43 |   const [accentKey, setAccentKey] = useState<AccentKey>("default");
  44 | 
  45 |   // Auto-score
  46 |   const [autoScore, setAutoScore] = useState<boolean>(true);
  47 |   const [autoScoreThresholdSec] = useState<number>(25);
  48 | 
  49 |   // Players
  50 |   const [players, setPlayers] = useState({
  51 |     player1: { name: "PLAYER 1", score: 0 },
  52 |     player2: { name: "PLAYER 2", score: 0 },
  53 |   });
  54 | 
  55 |   // Desktop hotkeys (keyboard/mouse)
  56 |   const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
  57 |     start: "F1",
  58 |     swap: "F2",
  59 |   });
  60 |   const [capturing, setCapturing] = useState<null | "start" | "swap">(null);
  61 | 
  62 |   // 🎮 Gamepad
  63 |   const [gp, setGp] = useState<GamepadMapping>({ toggle: [], swap: [] });
  64 |   const [capturingGp, setCapturingGp] = useState<null | "toggle" | "swap">(null);
  65 | 
  66 |   useEffect(() => {
  67 |     window.api.timer.get().then((d) => {
  68 |       if (d?.player1 && d?.player2) setPlayers(d);
  69 |     });
  70 | 
  71 |     window.api.hotkeys.get().then((h: HKGet) => {
  72 |       setHkLabels({ start: h.startLabel || "F1", swap: h.swapLabel || "F2" });
  73 |     });
  74 | 
  75 |     // 🎮 charger mapping
  76 |     if (window.api?.gamepad?.get) {
  77 |       window.api.gamepad.get().then((m: any) => {
  78 |         setGp(m && typeof m === "object" ? m : { toggle: [], swap: [] });
  79 |       });
  80 |     }
  81 | 
  82 |     window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
  83 |     window.api.overlay.onSettings((s: any) => {
  84 |       if (typeof s.locked === "boolean") setLocked(!!s.locked);
  85 |       if (typeof s.scale === "number") setScale(s.scale);
  86 |       if (s?.nameTheme) setNameTheme(s.nameTheme === "dark" ? "dark" : "default");
  87 |       if (s?.accentKey && ACCENTS.some((a) => a.key === s.accentKey)) setAccentKey(s.accentKey);
  88 |       if (typeof s?.autoScoreEnabled === "boolean") setAutoScore(s.autoScoreEnabled);
  89 |     });
  90 | 
  91 |     // Sync timer
  92 |     window.api.timer.onSync((d: any) => {
  93 |       if (d?.player1 && d?.player2) setPlayers(d);
  94 |     });
  95 | 
  96 |     // Capture feedback
  97 |     window.api.hotkeys.onCaptured(
  98 |       (p: { type: "start" | "swap"; keycode?: number | null; label?: string; source?: "desktop" | "gamepad" }) => {
  99 |         // Desktop only: maj du libellé clavier/souris
 100 |         if ((p.source || "desktop") === "desktop" && p.label) {
 101 |           setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
 102 |           setCapturing(null);
 103 |         }
 104 | 
 105 |         // Gamepad only: ferme l'état de capture et recharge le mapping
 106 |         if (p.source === "gamepad") {
 107 |           setCapturingGp(null);
 108 |           if (window.api?.gamepad?.get) {
 109 |             window.api.gamepad.get().then((m: any) => {
 110 |               setGp(m && typeof m === "object" ? m : { toggle: [], swap: [] });
 111 |             });
 112 |           }
 113 |         }
 114 |       }
 115 |     );
 116 | 
 117 |     // Always on top
 118 |     window.api.overlay.updateSettings({ alwaysOnTop: true });
 119 |   }, []);
 120 | 
 121 |   // Helpers
 122 |   const savePlayers = (next: typeof players) => {
 123 |     setPlayers(next);
 124 |     window.api.timer.set(next);
 125 |   };
 126 | 
 127 |   const onOverlayToggle = async (checked: boolean) => {
 128 |     setOverlayOn(checked);
 129 |     if (checked) await window.api.overlay.show();
 130 |     else await window.api.overlay.hide();
 131 |   };
 132 | 
 133 |   const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
 134 |     const v = Number(e.target.value);
 135 |     setScale(v);
 136 |     window.api.overlay.updateSettings({ scale: v });
 137 |   };
 138 | 
 139 |   const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
 140 |     const v = e.target.checked;
 141 |     setLocked(v);
 142 |     window.api.overlay.updateSettings({ locked: v });
 143 |   };
 144 | 
 145 |   const handleResetAll = () => {
 146 |     const next = {
 147 |       ...players,
 148 |       player1: { ...players.player1, score: 0 },
 149 |       player2: { ...players.player2, score: 0 },
 150 |     };
 151 |     savePlayers(next);
 152 |   };
 153 | 
 154 |   // Small reusable swatch
 155 |   const Swatch: React.FC<{
 156 |     isActive: boolean;
 157 |     background: string;
 158 |     title: string;
 159 |     onClick: () => void;
 160 |   }> = ({ isActive, background, title, onClick }) => (
 161 |     <button
 162 |       onClick={onClick}
 163 |       title={title}
 164 |       aria-label={title}
 165 |       aria-pressed={isActive}
 166 |       className={[
 167 |         "h-7 w-14 sm:w-16 rounded-lg border transition outline-none focus:ring",
 168 |         isActive ? "border-white/40 ring-2 ring-white/20" : "border-white/10 hover:border-white/20",
 169 |       ].join(" ")}
 170 |       style={{ background }}
 171 |     />
 172 |   );
 173 | 
 174 |   return (
 175 |     <div className="mx-auto max-w-5xl p-6 text-zinc-100">
 176 |       {/* Header */}
 177 |       <header className="mb-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 flex items-center justify-between">
 178 |         <div>
 179 |           <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">1v1 Overlay</div>
 180 |           <h1 className="text-xl font-semibold tracking-tight">DBD Overlay Tools</h1>
 181 |         </div>
 182 | 
 183 |         <div className="flex items-center gap-3">
 184 |           <span className={`text-sm font-medium ${overlayOn ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,.8)]" : "text-zinc-400"}`}>
 185 |             {overlayOn ? "Overlay Active" : "Overlay Hidden"}
 186 |           </span>
 187 |           <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
 188 |             <input type="checkbox" className="peer sr-only" checked={overlayOn} onChange={(e) => onOverlayToggle(e.target.checked)} />
 189 |             <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-emerald-500/70" />
 190 |             <span className="absolute h-5 w-5 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6" />
 191 |           </label>
 192 |         </div>
 193 |       </header>
 194 | 
 195 |       <div className="scroll-thin pr-1">
 196 |         {/* Hotkeys (desktop) */}
 197 |         <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
 198 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 199 |             <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Start/Stop/Reset Key</div>
 200 |             <button
 201 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 202 |                 capturing === "start" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
 203 |               }`}
 204 |               onClick={() => {
 205 |                 setCapturing("start");
 206 |                 window.api.hotkeys.capture({ type: "start", source: "desktop" });
 207 |               }}
 208 |             >
 209 |               {capturing === "start" ? "Press a key…" : hkLabels.start}
 210 |             </button>
 211 |           </div>
 212 | 
 213 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 214 |             <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Swap Timer Key</div>
 215 |             <button
 216 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 217 |                 capturing === "swap" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
 218 |               }`}
 219 |               onClick={() => {
 220 |                 setCapturing("swap");
 221 |                 window.api.hotkeys.capture({ type: "swap", source: "desktop" });
 222 |               }}
 223 |             >
 224 |               {capturing === "swap" ? "Press a key…" : hkLabels.swap}
 225 |             </button>
 226 |           </div>
 227 |         </section>
 228 | 
 229 |         {/* 🎮 Gamepad hotkeys */}
 230 |         <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
 231 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 232 |             <div className="mb-2 flex items-center justify-between">
 233 |               <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">🎮 Start/Stop/Reset (Controller)</div>
 234 |               <button
 235 |                 className="text-xs rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
 236 |                 onClick={async () => {
 237 |                   try {
 238 |                     await window.api?.gamepad?.clear?.("toggle");
 239 |                     const next = await window.api?.gamepad?.get?.();
 240 |                     if (next) setGp(next);
 241 |                   } catch {}
 242 |                 }}
 243 |               >
 244 |                 Clear
 245 |               </button>
 246 |             </div>
 247 |             <button
 248 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 249 |                 capturingGp === "toggle" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
 250 |               }`}
 251 |               onClick={() => {
 252 |                 setCapturingGp("toggle");
 253 |                 window.api.hotkeys.capture({ type: "start", source: "gamepad" });
 254 |               }}
 255 |             >
 256 |               {capturingGp === "toggle" ? "Press a gamepad button…" : gp.toggle?.join(" + ") || "—"}
 257 |             </button>
 258 |           </div>
 259 | 
 260 |           <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 261 |             <div className="mb-2 flex items-center justify-between">
 262 |               <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">🎮 Swap (Controller)</div>
 263 |               <button
 264 |                 className="text-xs rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
 265 |                 onClick={async () => {
 266 |                   try {
 267 |                     await window.api?.gamepad?.clear?.("swap");
 268 |                     const next = await window.api?.gamepad?.get?.();
 269 |                     if (next) setGp(next);
 270 |                   } catch {}
 271 |                 }}
 272 |               >
 273 |                 Clear
 274 |               </button>
 275 |             </div>
 276 |             <button
 277 |               className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 278 |                 capturingGp === "swap" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
 279 |               }`}
 280 |               onClick={() => {
 281 |                 setCapturingGp("swap");
 282 |                 window.api.hotkeys.capture({ type: "swap", source: "gamepad" });
 283 |               }}
 284 |             >
 285 |               {capturingGp === "swap" ? "Press a gamepad button…" : gp.swap?.join(" + ") || "—"}
 286 |             </button>
 287 |           </div>
 288 |         </section>
 289 | 
 290 |         {/* Players */}
 291 |         <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
 292 |           <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 293 |             <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 1</div>
 294 |             <input
 295 |               className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 296 |               value={players.player1.name}
 297 |               onChange={(e) =>
 298 |                 savePlayers({
 299 |                   ...players,
 300 |                   player1: { ...players.player1, name: e.target.value },
 301 |                 })
 302 |               }
 303 |             />
 304 |             <div className="text-xs text-zinc-400">Score</div>
 305 |             <div className="mt-2 flex items-center gap-2">
 306 |               <button
 307 |                 className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 308 |                 onClick={() =>
 309 |                   savePlayers({
 310 |                     ...players,
 311 |                     player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
 312 |                   })
 313 |                 }
 314 |               >
 315 |                 −1
 316 |               </button>
 317 |               <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player1.score}</div>
 318 |               <button
 319 |                 className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 320 |                 onClick={() =>
 321 |                   savePlayers({
 322 |                     ...players,
 323 |                     player1: { ...players.player1, score: players.player1.score + 1 },
 324 |                   })
 325 |                 }
 326 |               >
 327 |                 +1
 328 |               </button>
 329 |             </div>
 330 |           </div>
 331 | 
 332 |           <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 333 |             <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 2</div>
 334 |             <input
 335 |               className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 336 |               value={players.player2.name}
 337 |               onChange={(e) =>
 338 |                 savePlayers({
 339 |                   ...players,
 340 |                   player2: { ...players.player2, name: e.target.value },
 341 |                 })
 342 |               }
 343 |             />
 344 |             <div className="text-xs text-zinc-400">Score</div>
 345 |             <div className="mt-2 flex items-center gap-2">
 346 |               <button
 347 |                 className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 348 |                 onClick={() =>
 349 |                   savePlayers({
 350 |                     ...players,
 351 |                     player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
 352 |                   })
 353 |                 }
 354 |               >
 355 |                 −1
 356 |               </button>
 357 |               <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player2.score}</div>
 358 |               <button
 359 |                 className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 360 |                 onClick={() =>
 361 |                   savePlayers({
 362 |                     ...players,
 363 |                     player2: { ...players.player2, score: players.player2.score + 1 },
 364 |                   })
 365 |                 }
 366 |               >
 367 |                 +1
 368 |               </button>
 369 |             </div>
 370 |           </div>
 371 |         </section>
 372 | 
 373 |         {/* Global actions */}
 374 |         <div className="mb-6 flex justify-center">
 375 |           <button
 376 |             className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2"
 377 |             onClick={handleResetAll}
 378 |           >
 379 |             Reset scores
 380 |           </button>
 381 |         </div>
 382 | 
 383 |         {/* ====== Timer Appearance ====== */}
 384 |         <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 385 |           <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Timer Appearance</h2>
 386 | 
 387 |           {/* Name background */}
 388 |           <div className="mb-4">
 389 |             <div className="mb-2 flex items-center justify-between">
 390 |               <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Name background</span>
 391 |               <span className="text-xs text-zinc-500">Applies to player name boxes</span>
 392 |             </div>
 393 |             <div className="grid grid-cols-6 gap-2">
 394 |               {(["default", "dark"] as NameTheme[]).map((nt) => (
 395 |                 <Swatch
 396 |                   key={nt}
 397 |                   title={nt === "default" ? "Default" : "Dark"}
 398 |                   background={NAME_BG[nt]}
 399 |                   isActive={nameTheme === nt}
 400 |                   onClick={() => {
 401 |                     setNameTheme(nt);
 402 |                     window.api.overlay.updateSettings({ nameTheme: nt });
 403 |                   }}
 404 |                 />
 405 |               ))}
 406 |             </div>
 407 |           </div>
 408 | 
 409 |           {/* Accent color */}
 410 |           <div>
 411 |             <div className="mb-2 flex items-center justify-between">
 412 |               <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Accent color</span>
 413 |               <span className="text-xs text-zinc-500">Affects score background & swap bar</span>
 414 |             </div>
 415 | 
 416 |             <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
 417 |               {ACCENTS.map((a) => (
 418 |                 <Swatch
 419 |                   key={a.key}
 420 |                   title={ACCENT_LABELS_EN[a.key as AccentKey]}
 421 |                   background={a.gradient}
 422 |                   isActive={accentKey === (a.key as AccentKey)}
 423 |                   onClick={() => {
 424 |                     const k = a.key as AccentKey;
 425 |                     setAccentKey(k);
 426 |                     window.api.overlay.updateSettings({ accentKey: k });
 427 |                   }}
 428 |                 />
 429 |               ))}
 430 |             </div>
 431 | 
 432 |             <p className="mt-2 text-xs text-zinc-400">The swap bar automatically follows the score color.</p>
 433 |           </div>
 434 |         </section>
 435 | 
 436 |         {/* ====== Overlay Settings ====== */}
 437 |         <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 438 |           <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Overlay Settings</h2>
 439 | 
 440 |           <div className="mb-6">
 441 |             <div className="mb-2 flex items-center justify-between text-sm">
 442 |               <span>Scale</span>
 443 |               <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
 444 |             </div>
 445 |             <input type="range" min={50} max={200} value={scale} onChange={onScale} className="w-full [accent-color:#5AC8FF]" />
 446 |           </div>
 447 | 
 448 |           {/* Auto-score toggle */}
 449 |           <div className="mb-3 grid grid-cols-1">
 450 |             <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
 451 |               <span className="text-sm">
 452 |                 Auto-score winner <span className="opacity-60">({autoScoreThresholdSec}s min)</span>
 453 |               </span>
 454 | 
 455 |               <button
 456 |                 type="button"
 457 |                 role="switch"
 458 |                 aria-checked={autoScore}
 459 |                 onClick={() => {
 460 |                   const next = !autoScore;
 461 |                   setAutoScore(next);
 462 |                   window.api.overlay.updateSettings({ autoScoreEnabled: next, autoScoreThresholdSec });
 463 |                 }}
 464 |                 className={["relative h-6 w-11 rounded-full transition-colors", autoScore ? "bg-emerald-500" : "bg-neutral-300", "ring-1 ring-black/5"].join(" ")}
 465 |               >
 466 |                 <span aria-hidden className={["absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", autoScore ? "translate-x-5" : ""].join(" ")} />
 467 |               </button>
 468 |             </label>
 469 |           </div>
 470 | 
 471 |           <div className="grid grid-cols-1">
 472 |             <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
 473 |               <span className="text-sm">
 474 |                 Lock Overlay Position <span className="opacity-50">🔓</span>
 475 |               </span>
 476 | 
 477 |               <button
 478 |                 type="button"
 479 |                 role="switch"
 480 |                 aria-checked={locked}
 481 |                 onClick={() => {
 482 |                   const next = !locked;
 483 |                   setLocked(next);
 484 |                   window.api.overlay.updateSettings({ locked: next });
 485 |                 }}
 486 |                 className={["relative h-6 w-11 rounded-full transition-colors", locked ? "bg-emerald-500" : "bg-neutral-300", "ring-1 ring-black/5"].join(" ")}
 487 |               >
 488 |                 <span aria-hidden className={["absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", locked ? "translate-x-5" : ""].join(" ")} />
 489 |               </button>
 490 |             </label>
 491 |           </div>
 492 | 
 493 |           <div className={`mt-4 rounded-lg border p-3 text-sm ${locked ? "border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]" : "border-violet-500/40 bg-violet-500/10 text-violet-300"}`}>
 494 |             {locked ? "Overlay is locked – clicks will go through." : "Overlay is unlocked – drag the purple bar to reposition."}
 495 |           </div>
 496 | 
 497 |           <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-zinc-300 leading-relaxed">
 498 |             <b>How auto-score works</b>:
 499 |             <ul className="list-disc ml-5 mt-2 space-y-1">
 500 |               <li>Make sure the active timer is on the <b>current survivor</b> (use <b>Swap</b> before starting).</li>
 501 |               <li>Pause each survivor’s run (F1). When <b>both</b> sides are paused, the player with the <b>longest time</b> gets +1.</li>
 502 |               <li>Times under <b>{autoScoreThresholdSec}s</b> are ignored (prevents accidental starts).</li>
 503 |               <li>This never stops your timers — it only updates the score.</li>
 504 |             </ul>
 505 |           </div>
 506 |         </section>
 507 | 
 508 |         {/* CTAs & Footer (inchangés) */}
 509 |         <section className="mt-8 relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-emerald-500/10 p-5">
 510 |           <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-violet-500/30" />
 511 |           <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/20" />
 512 |           <div className="relative">
 513 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">👑 PREMIUM OVERLAYS</div>
 514 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Unlock more overlays & tools</h3>
 515 |             <p className="mt-2 text-sm text-zinc-200">
 516 |               Join our Discord to get the premium version: <b>killer streaks</b>, <b>survivor streaks</b>, <b>win/loss counter</b>, <b>tournament overlay</b>, and more!
 517 |             </p>
 518 |             <a href="http://discord.com/invite/aVdT8rRJKc" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
 519 |               Join the Discord
 520 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 521 |                 <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
 522 |               </svg>
 523 |             </a>
 524 |           </div>
 525 |         </section>
 526 | 
 527 |         <section className="mt-6 relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-tr from-cyan-400/10 via-sky-500/10 to-indigo-500/10 p-5">
 528 |           <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full blur-3xl bg-cyan-400/30" />
 529 |           <div className="relative">
 530 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">🎨 ReShade Filters</div>
 531 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">GET STEAXS RESHADES</h3>
 532 |             <p className="mt-2 text-sm text-zinc-200">
 533 |               Competitive ReShade presets tailored for Dead by Daylight. One filter per map. Sharper visibility, clean colors, and a consistent look across maps.
 534 |             </p>
 535 |             <a href="https://discord.com/invite/6RHPNNVtKw" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
 536 |               Get the Presets
 537 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 538 |                 <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
 539 |               </svg>
 540 |             </a>
 541 |           </div>
 542 |         </section>
 543 | 
 544 |         <section className="mt-6 relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-tr from-amber-400/10 via-orange-500/10 to-rose-500/10 p-5">
 545 |           <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl bg-amber-400/30" />
 546 |           <div className="pointer-events-none absolute -bottom-16 -left-20 h-64 w-64 rounded-full blur-3xl bg-rose-400/20" />
 547 |           <div className="relative">
 548 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">☕ SUPPORT THE PROJECT</div>
 549 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Buy me a coffee</h3>
 550 |             <p className="mt-2 text-sm text-zinc-200">
 551 |               If these overlays help you, consider buying me a coffee. Your donation keeps the project alive, funds maintenance, and fuels new features.
 552 |             </p>
 553 |             <a href="https://buymeacoffee.com/steaxss" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
 554 |               Buy Me a Coffee
 555 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
 556 |                 <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
 557 |               </svg>
 558 |             </a>
 559 |           </div>
 560 |         </section>
 561 | 
 562 |         {/* Footer */}
 563 |         <footer className="mt-6">
 564 |           <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-300">
 565 |             <div className="uppercase tracking-wider">
 566 |               © TIMER BY <b>STEAXS</b> &amp; PREMIUM VERSION BY <b>DOC</b> — 2025
 567 |             </div>
 568 |           </div>
 569 |         </footer>
 570 |       </div>
 571 |     </div>
 572 |   );
 573 | };
 574 | 
 575 | export default ControlPanel;

```

`dbdoverlaytools-free/src\components\ScrollingName.tsx`:

```tsx
   1 | import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
   2 | 
   3 | type Props = {
   4 |   text: string;
   5 |   speed?: number;      // pixels/seconde
   6 |   className?: string;  // ex: "player-name"
   7 | };
   8 | 
   9 | export default function ScrollingName({ text, speed = 40, className = "" }: Props) {
  10 |   const wrapRef = useRef<HTMLDivElement>(null);
  11 |   const innerRef = useRef<HTMLDivElement>(null);
  12 |   const [scrollNeeded, setScrollNeeded] = useState(false);
  13 | 
  14 |   // Mesures robustes (sans padding)
  15 |   useLayoutEffect(() => {
  16 |     const wrap = wrapRef.current, inner = innerRef.current;
  17 |     if (!wrap || !inner) return;
  18 |     const measure = () => {
  19 |       const cs = getComputedStyle(wrap);
  20 |       const padX = parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");
  21 |       const w = (wrap.clientWidth || 0) - padX;    // largeur visible
  22 |       const t = inner.scrollWidth || 0;            // largeur intrinsèque du texte
  23 |       const overflow = Math.max(0, t - w);
  24 |       const need = overflow > 1;
  25 |       setScrollNeeded(need);
  26 |       wrap.style.setProperty("--shift", `${overflow}px`);
  27 |       // durée indicative (pas utilisée directement par JS mais utile si tu veux revenir au CSS)
  28 |       wrap.style.setProperty("--duration", `${Math.max(overflow / speed, 0.001)}s`);
  29 |       inner.classList.toggle("is-scrolling", need);
  30 |       const isRight = !!wrap.closest(".name.right"); // ou ton sélecteur actuel côté P2
  31 |       wrap.style.justifyContent = need ? (isRight ? "flex-end" : "flex-start") : "center";
  32 |     };
  33 |     const ro = new ResizeObserver(measure);
  34 |     ro.observe(wrap); ro.observe(inner);
  35 |     // @ts-ignore
  36 |     document.fonts?.ready?.then(() => requestAnimationFrame(measure));
  37 |     measure();
  38 |     return () => ro.disconnect();
  39 |   }, [text, speed]);
  40 | 
  41 |   // Animation ping-pong en JS (rAF), uniquement si nécessaire
  42 |   useEffect(() => {
  43 |     const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  44 |     const wrap = wrapRef.current, inner = innerRef.current;
  45 |     if (!wrap || !inner || prefersReduce) return;
  46 | 
  47 |     let raf = 0;
  48 |     let last = performance.now();
  49 |     let x = 0;          // position courante (px)
  50 |     let dir = -1;       // -1 = va vers la gauche, +1 = vers la droite
  51 | 
  52 |     const step = (now: number) => {
  53 |       const shift = parseFloat(getComputedStyle(wrap).getPropertyValue("--shift")) || 0;
  54 |       if (!scrollNeeded || shift <= 0) {
  55 |         // pas de scroll -> rester centré
  56 |         inner.style.transform = "translate3d(0,0,0)";
  57 |       } else {
  58 |         const dt = (now - last) / 1000;
  59 |         last = now;
  60 |         x += dir * speed * dt;
  61 |         if (x < -shift) { x = -shift; dir = +1; }
  62 |         if (x > 0)      { x = 0;      dir = -1; }
  63 |         inner.style.transform = `translate3d(${x}px,0,0)`;
  64 |       }
  65 |       raf = requestAnimationFrame(step);
  66 |     };
  67 | 
  68 |     raf = requestAnimationFrame((n) => { last = n; step(n); });
  69 |     return () => cancelAnimationFrame(raf);
  70 |   }, [scrollNeeded, speed, text]);
  71 | 
  72 |   return (
  73 |     <div ref={wrapRef} className={`scrolling-name ${className}`} title={text} aria-label={text}>
  74 |       <div ref={innerRef} className="scrolling-name__inner">{text}</div>
  75 |     </div>
  76 |   );
  77 | }

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
   1 | import React from "react";
   2 | import { useTimerStore } from "@/store/timerStore";
   3 | import { formatMillisDynamic } from "@/utils/timer";
   4 | import ScrollingName from "@/components/ScrollingName";
   5 | import { NAME_BG, ACCENTS_MAP, NameTheme, AccentKey } from "@/themes/palette";
   6 | 
   7 | type TD = {
   8 |   player1: { name: string; score: number };
   9 |   player2: { name: string; score: number };
  10 | };
  11 | 
  12 | function splitForTheme(fmt: string) {
  13 |   // support "SS.CC" ou "M:SS.CC"
  14 |   const arr: { ch: string; sep?: boolean }[] = [];
  15 |   for (let i = 0; i < fmt.length; i++) {
  16 |     const ch = fmt[i];
  17 |     if (ch === ":" || ch === ".") arr.push({ ch, sep: true });
  18 |     else arr.push({ ch });
  19 |   }
  20 |   return arr;
  21 | }
  22 | 
  23 | export default function TimerOverlay() {
  24 |   const [players, setPlayers] = React.useState<TD>({
  25 |     player1: { name: "Player 1", score: 0 },
  26 |     player2: { name: "Player 2", score: 0 },
  27 |   });
  28 | 
  29 |   const active = useTimerStore((s) => s.active);
  30 |   const status = useTimerStore((s) => s.status); // Record<1|2, 'stopped'|'running'|'paused'>
  31 |   const elapsed = useTimerStore((s) => s.elapsed);
  32 | 
  33 |   const [locked, setLocked] = React.useState(false);
  34 |   const [scale, setScale] = React.useState(100);
  35 | 
  36 |   // === Auto-score (config reçue via overlay-settings) ===
  37 |   const [autoScoreEnabled, setAutoScoreEnabled] = React.useState(true);
  38 |   const [autoScoreThresholdMs, setAutoScoreThresholdMs] = React.useState(25000);
  39 | 
  40 |   // IPC: names/scores only
  41 |   React.useEffect(() => {
  42 |     (async () => setPlayers(await window.api.timer.get()))();
  43 |     window.api.timer.onSync((d: any) => setPlayers(d));
  44 |   }, []);
  45 | 
  46 |   // Receive overlay settings (lock + scale + theme + auto-score)
  47 |   React.useEffect(() => {
  48 |     window.api.overlay.onSettings((s: any) => {
  49 |       setLocked(!!s.locked);
  50 |       setScale(s.scale || 100);
  51 |       
  52 |       // === Thèmes ===
  53 |       const nt: NameTheme = s?.nameTheme === 'dark' ? 'dark' : 'default';
  54 |       const ak: AccentKey = (s?.accentKey in ACCENTS_MAP ? s.accentKey : 'default') as AccentKey;
  55 | 
  56 |       // Appliquer les variables CSS au document (overlay window)
  57 |       const root = document.documentElement;
  58 |       root.style.setProperty('--name-bg', NAME_BG[nt]);
  59 |       root.style.setProperty('--accent-gradient', ACCENTS_MAP[ak]);
  60 | 
  61 |       // === Auto-score ===
  62 |       setAutoScoreEnabled(s?.autoScoreEnabled !== false); // par défaut: true
  63 |       const th = Number(s?.autoScoreThresholdSec);
  64 |       setAutoScoreThresholdMs(Number.isFinite(th) ? th * 1000 : 25000);
  65 |     });
  66 |   }, []);
  67 | 
  68 |   // Hotkeys globales (venant du main via uiohook)
  69 |   React.useEffect(() => {
  70 |     const handler = (p: any) => {
  71 |       const api = useTimerStore.getState();
  72 |       if (p?.type === "toggle") api.toggle();
  73 |       else if (p?.type === "swap") api.select(api.active === 1 ? 2 : 1);
  74 |     };
  75 |     window.api.hotkeys.on(handler);
  76 |   }, []);
  77 | 
  78 |   // Tick adaptatif : 60 FPS quand ça tourne, 8 FPS à l'arrêt/pausé
  79 |   const [, setTick] = React.useState(0);
  80 |   React.useEffect(() => {
  81 |     const s1 = status[1];
  82 |     const s2 = status[2];
  83 |     const running = s1 === "running" || s2 === "running";
  84 | 
  85 |     let cancel = false;
  86 |     let raf = 0;
  87 |     let intervalId: number | undefined;
  88 | 
  89 |     const bump = () => setTick((t) => (t + 1) | 0);
  90 | 
  91 |     if (running) {
  92 |       const loop = () => {
  93 |         if (cancel) return;
  94 |         bump();
  95 |         raf = requestAnimationFrame(loop);
  96 |       };
  97 |       raf = requestAnimationFrame(loop);
  98 |     } else {
  99 |       // ~8 FPS
 100 |       intervalId = window.setInterval(bump, 125);
 101 |     }
 102 | 
 103 |     return () => {
 104 |       cancel = true;
 105 |       if (raf) cancelAnimationFrame(raf);
 106 |       if (intervalId) clearInterval(intervalId);
 107 |     };
 108 |   }, [status[1], status[2]]);
 109 | 
 110 |   // Mesure pour le main (taille intrinsèque)
 111 |   React.useEffect(() => {
 112 |     const measure = () => {
 113 |       const el = document.getElementById("timerContainer");
 114 |       if (!el) return;
 115 |       const w = el.offsetWidth;
 116 |       const h = el.offsetHeight;
 117 |       window.api.overlay.measure(w, h);
 118 |     };
 119 |     // fonts prêtes → mesurer
 120 |     // @ts-ignore
 121 |     if (document.fonts?.ready) {
 122 |       // @ts-ignore
 123 |       document.fonts.ready.then(() => {
 124 |         measure();
 125 |         setTimeout(measure, 50);
 126 |       });
 127 |     }
 128 |     measure();
 129 |     window.addEventListener("resize", measure);
 130 |     return () => window.removeEventListener("resize", measure);
 131 |   }, [players.player1.name, players.player2.name]);
 132 | 
 133 |   const t1 = splitForTheme(formatMillisDynamic(elapsed(1)));
 134 |   const t2 = splitForTheme(formatMillisDynamic(elapsed(2)));
 135 | 
 136 |   const p1Scroll = players.player1.name.length > 16;
 137 |   const p2Scroll = players.player2.name.length > 16;
 138 | 
 139 |   const s = (scale || 100) / 100;
 140 | 
 141 |   // ---- état d’alerte sur le timer actif (approche/dépassement) ----
 142 |   const DIFF20 = 20000; // 20s -> orange
 143 |   const DIFF10 = 10000; // 10s -> rouge clair clignotant
 144 | 
 145 |   const warnClass = (() => {
 146 |     const isRunning = status[active] === "running";
 147 |     if (!isRunning) return "";
 148 |     const other = active === 1 ? 2 : 1;
 149 |     
 150 |     const otherMs = elapsed(other);
 151 |     if (otherMs <= 0) return "";
 152 | 
 153 |     const deltaToLoose = otherMs - elapsed(active); // temps restant avant de rattraper l'autre
 154 |     if (deltaToLoose <= 0) return "loose";
 155 |     if (deltaToLoose <= DIFF10) return "warn10";
 156 |     if (deltaToLoose <= DIFF20) return "warn20";
 157 |     return "";
 158 |   })();
 159 |   // ----------------------------------------------------------------------
 160 | 
 161 |   // ===================== AUTO-SCORE =====================
 162 |   // On déclenche à la transition running -> paused pour chaque côté,
 163 |   // on mémorise les deux durées, puis on attribue +1 au plus long si
 164 |   // (a) les deux côtés sont renseignés et (b) max >= seuil.
 165 |   const prevStatusRef = React.useRef<{ 1: string; 2: string }>({
 166 |     1: "stopped",
 167 |     2: "stopped",
 168 |   });
 169 |   const pairRef = React.useRef<{ 1: number | null; 2: number | null }>({
 170 |     1: null,
 171 |     2: null,
 172 |   });
 173 | 
 174 |   React.useEffect(() => {
 175 |     const prev = prevStatusRef.current;
 176 | 
 177 |     // 1) détecter fin de run: running -> paused
 178 |     ([
 179 |       1, 2
 180 |     ] as const).forEach((n) => {
 181 |       if (prev[n] === "running" && status[n] === "paused") {
 182 |         // snapshot au moment de la pause
 183 |         pairRef.current[n] = elapsed(n);
 184 |       }
 185 |       // reset si l'utilisateur stoppe avant d'avoir pairé
 186 |       if (status[n] === "stopped") {
 187 |         pairRef.current[n] = null;
 188 |       }
 189 |     });
 190 | 
 191 |     // 2) si on a les deux valeurs, décider et (éventuellement) scorer
 192 |     const a = pairRef.current[1];
 193 |     const b = pairRef.current[2];
 194 | 
 195 |     if (a != null && b != null) {
 196 |       const maxMs = Math.max(a, b);
 197 |       if (autoScoreEnabled && maxMs >= autoScoreThresholdMs) {
 198 |         const winner: 1 | 2 = a >= b ? 1 : 2;
 199 |         setPlayers((prevPlayers) => {
 200 |           const next: TD = {
 201 |             player1: {
 202 |               ...prevPlayers.player1,
 203 |               score: prevPlayers.player1.score + (winner === 1 ? 1 : 0),
 204 |             },
 205 |             player2: {
 206 |               ...prevPlayers.player2,
 207 |               score: prevPlayers.player2.score + (winner === 2 ? 1 : 0),
 208 |             },
 209 |           };
 210 |           // persister (et synchroniser le Control Panel)
 211 |           window.api.timer.set(next);
 212 |           return next;
 213 |         });
 214 |       }
 215 |       // 3) réinitialiser pour la paire suivante
 216 |       pairRef.current[1] = null;
 217 |       pairRef.current[2] = null;
 218 |     }
 219 | 
 220 |     prevStatusRef.current = { ...status };
 221 |   }, [status[1], status[2], autoScoreEnabled, autoScoreThresholdMs, elapsed]);
 222 |   // ======================================================
 223 | 
 224 |   return (
 225 |     // wrapper extérieur = dimension exacte *après* zoom → pas de scroll
 226 |     <div
 227 |       className="pointer-events-none select-none"
 228 |       style={{
 229 |         width: Math.round(520 * s),
 230 |         height: Math.round((120 + (locked ? 0 : 30)) * s),
 231 |         overflow: "hidden",
 232 |       }}
 233 |     >
 234 |       {/* Drag handle (visible quand unlock) */}
 235 |       <div className={`drag-handle ${locked ? "" : "visible"}`}>Drag to move</div>
 236 | 
 237 |       {/* Coins carrés: pas de rounded ni border */}
 238 |       {/* Zoom par transform sur le contenu interne */}
 239 |       <div
 240 |         style={{
 241 |           transform: `scale(${s})`,
 242 |           transformOrigin: "top left",
 243 |           width: 520,
 244 |           height: 120,
 245 |         }}
 246 |       >
 247 |         <div className="timer-overlay" id="timerContainer">
 248 |           {/* Noms + score */}
 249 |             <div className="name left">
 250 |               <ScrollingName
 251 |                 text={players.player1.name || "PLAYER 1"}
 252 |                 className="player-name scrolling-name--hover"
 253 |               />
 254 |             </div>
 255 | 
 256 |             <div className="score-value">
 257 |               {players.player1.score} – {players.player2.score}
 258 |             </div>
 259 | 
 260 |             <div className="name right">
 261 |               <ScrollingName
 262 |                 text={players.player2.name || "PLAYER 2"}
 263 |                 className="player-name scrolling-name--hover"
 264 |               />
 265 |             </div>
 266 | 
 267 |           {/* Timers */}
 268 |           <div
 269 |             className={`timer left ${active === 1 ? "active" : ""} ${active === 1 ? warnClass : ""}`}
 270 |             aria-label={status[1]}
 271 |           >
 272 |             <span className="timer-text dbd-digits">
 273 |               {t1.map((c, i) => (
 274 |                 <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
 275 |                   {c.ch}
 276 |                 </span>
 277 |               ))}
 278 |             </span>
 279 |           </div>
 280 |           <div
 281 |             className={`timer right ${active === 2 ? "active" : ""} ${active === 2 ? warnClass : ""}`}
 282 |             aria-label={status[2]}
 283 |           >
 284 |             <span className="timer-text dbd-digits">
 285 |               {t2.map((c, i) => (
 286 |                 <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
 287 |                   {c.ch}
 288 |                 </span>
 289 |               ))}
 290 |             </span>
 291 |           </div>
 292 |         </div>
 293 |       </div>
 294 |     </div>
 295 |   );
 296 | }

```

`dbdoverlaytools-free/src\index.css`:

```css
   1 | @import './styles/fonts.css';
   2 | @tailwind base;
   3 | @tailwind components;
   4 | @tailwind utilities;
   5 | 
   6 | body { font-family: 'Poppins-Regular', system-ui, sans-serif; }
   7 | 
   8 | .dbd-digits {
   9 |   font-variant-numeric: tabular-nums;
  10 |   -moz-font-feature-settings: "tnum";
  11 |   -webkit-font-feature-settings: "tnum";
  12 |   font-feature-settings: "tnum";
  13 |   letter-spacing: 0.02em;
  14 | }

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
   3 | import './styles/fonts.css';
   4 | import './index.css'
   5 | import './themes/default.css'
   6 | import TimerOverlay from './components/overlay/TimerOverlay'
   7 | 
   8 | ReactDOM.createRoot(document.getElementById('root')!).render(<TimerOverlay />)

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

`dbdoverlaytools-free/src\styles\fonts.css`:

```css
   1 | /* src/styles/fonts.css */
   2 | @font-face {
   3 |   font-family: 'Poppins';
   4 |   src: url('../assets/fonts/Poppins-Medium.ttf') format('truetype');
   5 |   font-weight: 400;
   6 |   font-style: normal;
   7 |   font-display: swap;
   8 | }
   9 | 
  10 | @font-face {
  11 |   font-family: 'Poppins-Regular';
  12 |   src: url('../assets/fonts/Poppins-Regular.ttf') format('truetype');
  13 |   font-weight: 400;
  14 |   font-style: normal;
  15 |   font-display: swap;
  16 | }
  17 | 
  18 | @font-face {
  19 |   font-family: 'Squarefont';
  20 |   src: url('../assets/fonts/Square.ttf') format('truetype');
  21 |   font-weight: 400;
  22 |   font-style: normal;
  23 |   font-display: swap;
  24 | }

```

`dbdoverlaytools-free/src\themes\default.css`:

```css
   1 | /* === Default Theme (ajustée) === */
   2 | :root {
   3 |     /* fondu latéral pour une coupe propre du texte (appliqué sur la piste, pas sur le fond) */
   4 |     --edge-fade: 10px;
   5 |     /* === nouvelles variables thème === */
   6 |     /* fond des .name (players) */
   7 |     --name-bg: linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%);
   8 |     /* accent commun : fond du score + swap bar */
   9 |     --accent-gradient: linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%);
  10 |   }
  11 | 
  12 | .timer-overlay {
  13 |   display: grid;
  14 |   grid-template-columns: minmax(160px, 1fr) auto minmax(160px, 1fr);
  15 |   grid-template-rows: 50px 1fr;
  16 |   width: 520px;
  17 |   height: 120px;
  18 |   position: relative;
  19 | }
  20 | 
  21 | .drag-handle {
  22 |   position: absolute; top: 0; left: 0; right: 0; height: 30px;
  23 |   background: linear-gradient(90deg, rgba(181,121,255,0.15) 0%, rgba(181,121,255,0.25) 50%, rgba(181,121,255,0.15) 100%);
  24 |   border-bottom: 2px solid rgba(181,121,255,0.4);
  25 |   box-shadow: 0 2px 10px rgba(181,121,255,0.3);
  26 |   display: none; align-items: center; justify-content: center;
  27 |   cursor: move; -webkit-app-region: drag;
  28 |   font-size: 0.85rem; color: #B579FF; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  29 |   z-index: 1000;
  30 | }
  31 | .drag-handle.visible { display: flex; }
  32 | 
  33 | .name { padding: 0 15px; }
  34 | 
  35 | .name, .score-value {
  36 |   border-bottom: 1px solid rgba(255,255,255,0.32);
  37 |   background: var(--name-bg);
  38 |   display: flex; align-items: center; justify-content: center;
  39 |   font-family: "Poppins", system-ui, sans-serif;
  40 |   font-size: 22px; font-weight: 500; color: #FFF;
  41 |   position: relative; overflow: hidden;
  42 | }
  43 | .name.left {
  44 |   grid-row: 1; grid-column: 1; font-size: 24px; text-transform: uppercase;
  45 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
  46 | }
  47 | .score-value {
  48 |   grid-row: 1; grid-column: 2; font-size: 24px; text-transform: uppercase;
  49 |   background: var(--accent-gradient);
  50 |   padding: 0 15px; min-width: 90px; max-width: 120px;
  51 | }
  52 | .name.right {
  53 |   grid-row: 1; grid-column: 3; font-size: 24px; text-transform: uppercase;
  54 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
  55 | }
  56 | 
  57 | .scrolling-name{
  58 |   /* clé pour que l'enfant occupe la largeur du slot .name */
  59 |   flex: 1 1 auto;
  60 |   min-width: 0;
  61 |   display: flex;
  62 |   align-items: center;
  63 |   justify-content: center;
  64 |   width: 100%;
  65 |   height: 100%;
  66 |   overflow: hidden;
  67 |   position: relative;
  68 | }
  69 | 
  70 | .name.right .scrolling-name {
  71 |   justify-content: flex-end;
  72 | }
  73 | 
  74 | /* texte réel à déplacer */
  75 | .scrolling-name__inner{
  76 |   display: inline-block;
  77 |   white-space: nowrap;
  78 |   will-change: transform;
  79 |   transform: translateX(0);            /* position de base */
  80 | }
  81 | 
  82 | /* active le ping-pong seulement si nécessaire */
  83 | .scrolling-name__inner.is-scrolling{
  84 |   animation: name-pingpong var(--duration, 8s) ease-in-out infinite alternate;
  85 | }
  86 | 
  87 | /* ping-pong : 0 -> -shift -> 0 -> -shift ... */
  88 | @keyframes name-pingpong{
  89 |   0%   { transform: translateX(0); }
  90 |   100% { transform: translateX(calc(var(--shift, 0px) * -1)); }
  91 | }
  92 | 
  93 | /* .name.ticker-ltr { justify-content: flex-start; padding: 0 15px; } */
  94 | 
  95 | .timer {
  96 |   display: flex; align-items: center; justify-content: center;
  97 |   font-family: "Squarefont","Consolas","Monaco","Courier New",monospace;
  98 |   font-size: 32px; font-weight: 400;
  99 |   text-shadow: 0 0 6px rgba(190,190,190,0.50);
 100 |   position: relative; height: 100%; text-align: center; min-width: 160px;
 101 | }
 102 | .timer.left { grid-row: 2; grid-column: 1; }
 103 | .timer.right { grid-row: 2; grid-column: 3; }
 104 | 
 105 | .timer-text {
 106 |   display: inline-flex; align-items: center;
 107 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 108 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 109 | }
 110 | .timer-char {
 111 |   display: inline-block; width: 22px; text-align: center;
 112 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 113 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 114 | }
 115 | .timer-char.separator { width: 11px; }
 116 | 
 117 | .timer.active::before {
 118 |   content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
 119 |   background: var(--accent-gradient);
 120 |   animation: pulseBar 1s ease-in-out infinite;
 121 | }
 122 | @keyframes pulseBar { 0%,100%{opacity:.5} 50%{opacity:1} }
 123 | 
 124 | .dbd-digits { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; letter-spacing: 0.02em; }
 125 | 
 126 | /* ========= États d’alerte pour le timer actif ========= */
 127 | /* 20s avant loose → orange (fixe) */
 128 | .timer.warn20 .timer-text,
 129 | .timer.warn20 .timer-char {
 130 |   background: linear-gradient(180deg, #FFD27A 0%, #FFA726 100%);
 131 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 132 |   text-shadow: 0 0 18px rgba(255,167,38,0.35);
 133 | }
 134 | 
 135 | /* 10s avant loose → rouge clair + clignotement doux */
 136 | .timer.warn10 .timer-text,
 137 | .timer.warn10 .timer-char {
 138 |   background: linear-gradient(180deg, #FF8A80 0%, #FF5252 100%);
 139 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 140 |   text-shadow: 0 0 18px rgba(255,82,82,0.35);
 141 |   animation: timerBlink 0.8s steps(1,end) infinite;
 142 | }
 143 | @keyframes timerBlink {
 144 |   50% { opacity: .45; }
 145 | }
 146 | 
 147 | /* Loose condition dépassée → rouge (fixe) */
 148 | .timer.loose .timer-text,
 149 | .timer.loose .timer-char {
 150 |   background: linear-gradient(180deg, #FF6B6B 0%, #FF4141 100%);
 151 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 152 |   text-shadow: 0 0 20px rgba(255,65,65,0.35);
 153 | }

```

`dbdoverlaytools-free/src\themes\palette.ts`:

```ts
   1 | export type NameTheme = 'default' | 'dark';
   2 | 
   3 | export type AccentKey =
   4 |   | 'default'    // bleu d'origine
   5 |   | 'rose'
   6 |   | 'rouge'
   7 |   | 'orange'
   8 |   | 'or'
   9 |   | 'jaune'
  10 |   | 'vert'
  11 |   | 'menthe'
  12 |   | 'bleu_fonce'
  13 |   | 'bleu_clair'
  14 |   | 'cyan'
  15 |   | 'violet'
  16 |   | 'lavande'
  17 |   | 'marron'
  18 |   | 'anthracite'
  19 |   | 'argent'
  20 |   | 'corail';
  21 | 
  22 | export const NAME_BG: Record<NameTheme, string> = {
  23 |   default: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
  24 |   dark:    'linear-gradient(0deg, #000000 0%, #000000 50%, #111111 100%)',
  25 | };
  26 | 
  27 | export const ACCENTS: { key: AccentKey; label: string; gradient: string }[] = [
  28 |   { key: 'default',    label: 'Bleu (par défaut)', gradient: 'linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%)' },
  29 |   { key: 'rose',       label: '🌸 Rose',           gradient: 'linear-gradient(90deg, #ff4da6 0%, #ed62a8 50%, #f881bc 100%)' },
  30 |   { key: 'rouge',      label: '❤️ Rouge',          gradient: 'linear-gradient(90deg, #e63946 0%, #f25056 50%, #f77b7b 100%)' },
  31 |   { key: 'orange',     label: '🧡 Orange',         gradient: 'linear-gradient(90deg, #ff7a00 0%, #ff9833 50%, #ffbb66 100%)' },
  32 |   { key: 'or',         label: '✨ Or',             gradient: 'linear-gradient(90deg, #d4af37 0%, #e1c85c 50%, #f0dd8c 100%)' },
  33 |   { key: 'jaune',      label: '💛 Jaune',          gradient: 'linear-gradient(90deg, #ffd60a 0%, #ffe24a 50%, #fff08a 100%)' },
  34 |   { key: 'vert',       label: '🌿 Vert',           gradient: 'linear-gradient(90deg, #2ecc71 0%, #42d77d 50%, #78e8a4 100%)' },
  35 |   { key: 'menthe',     label: '🍏 Menthe',         gradient: 'linear-gradient(90deg, #4ee44e 0%, #6ff06f 50%, #9cfb9c 100%)' },
  36 |   { key: 'bleu_fonce', label: '🔵 Bleu foncé',     gradient: 'linear-gradient(90deg, #0a3d91 0%, #1a4ea8 50%, #3b6fce 100%)' },
  37 |   { key: 'bleu_clair', label: '🔷 Bleu clair',     gradient: 'linear-gradient(90deg, #4da6ff 0%, #66b8ff 50%, #99d4ff 100%)' },
  38 |   { key: 'cyan',       label: '🔹 Bleu ciel',      gradient: 'linear-gradient(90deg, #5cd6ff 0%, #80e1ff 50%, #b3f0ff 100%)' },
  39 |   { key: 'violet',     label: '🟣 Violet',         gradient: 'linear-gradient(90deg, #8e44ad 0%, #a55bc4 50%, #c38edb 100%)' },
  40 |   { key: 'lavande',    label: '💜 Lavande',        gradient: 'linear-gradient(90deg, #9b59b6 0%, #b27acc 50%, #d0a6e3 100%)' },
  41 |   { key: 'marron',     label: '🟤 Marron',         gradient: 'linear-gradient(90deg, #7b3f00 0%, #9c5c26 50%, #c27d4f 100%)' },
  42 |   { key: 'anthracite', label: '⬛ Anthracite',     gradient: 'linear-gradient(90deg, #2c3e50 0%, #3f5367 50%, #5c7087 100%)' },
  43 |   { key: 'argent',     label: '⚪ Argent',         gradient: 'linear-gradient(90deg, #bdc3c7 0%, #b1b6b9 50%, #b1b6b9 100%)' },
  44 |   { key: 'corail',     label: '🌅 Corail',         gradient: 'linear-gradient(90deg, #ff6f61 0%, #ff8a7f 50%, #ffb2a6 100%)' },
  45 | ];
  46 | 
  47 | export const ACCENTS_MAP: Record<AccentKey, string> =
  48 |   ACCENTS.reduce((m, a) => (m[a.key] = a.gradient, m), {} as Record<AccentKey,string>);

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
  21 |         capture(
  22 |           type:'start'|'swap' | { type:'start'|'swap', source?: 'any'|'desktop'|'gamepad' },
  23 |           source?: 'any'|'desktop'|'gamepad'
  24 |           ): Promise<any>
  25 | 
  26 |         onCaptured(cb: (p: { type:"start"|"swap"; keycode?:number|null; label?:string; source?: "desktop" | "gamepad" }) => void): void
  27 |         on(cb: (p: any) => void): void
  28 |         onMode(cb: (mode:'pass-through'|'fallback') => void): void
  29 |       },
  30 |       gamepad: {
  31 |         get(): Promise<{ toggle:string[]; swap:string[] }>
  32 |         clear(action:'toggle'|'swap'): Promise<any>
  33 |       }
  34 |     }
  35 |   }
  36 | }

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
  11 |   "include": ["vite.config.ts", "electron/**/*"]
  12 | }

```

`dbdoverlaytools-free/vite.config.mts`:

```mts
   1 | import { defineConfig } from 'vite'
   2 | import react from '@vitejs/plugin-react'
   3 | import { fileURLToPath, URL } from 'node:url'
   4 | import { resolve } from 'node:path'
   5 | 
   6 | export default defineConfig(({ mode }) => ({
   7 |   // chemins relatifs en production (file:// dans Electron)
   8 |   base: mode === 'development' ? '/' : './',
   9 |   plugins: [react()],
  10 |   server: { port: 5173, strictPort: true },
  11 |   resolve: {
  12 |     alias: {
  13 |       '@': fileURLToPath(new URL('./src', import.meta.url)),
  14 |     },
  15 |   },
  16 |   build: {
  17 |     outDir: 'dist',
  18 |     sourcemap: false, // évite de livrer les maps (légère "opacité" en plus)
  19 |     rollupOptions: {
  20 |       // 👇 MPA: on construit index.html ET overlay.html
  21 |       input: {
  22 |         index: resolve(__dirname, 'index.html'),
  23 |         overlay: resolve(__dirname, 'overlay.html'),
  24 |       },
  25 |     },
  26 |   },
  27 | }))

```