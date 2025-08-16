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
│   │   └── default.css
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
  27 |   setGamepadMapping;
  28 | 
  29 | let captureState = null; // { type, label, code, primaryTimer, secondaryTimer }
  30 | let captureWaitUntil = 0; // block timers dispatch during capture
  31 | let offGamepadRaw = null; // ✅ NO SHADOWING BUG
  32 | 
  33 | function initCapture(ctx) {
  34 |   ({
  35 |     ipcMain,
  36 |     store,
  37 |     globalShortcut,
  38 |     dialog,
  39 |     shell,
  40 |     VC_REDIST_X64_URL,
  41 |     hasVCRedist,
  42 |     logHK,
  43 |     getMainWindow,
  44 |     getOverlayWindow,
  45 |     getUsingUiohook,
  46 |     setUsingUiohook,
  47 |     getHotkeys,
  48 |     setHotkeys,
  49 |     getHotkeysLabel,
  50 |     setHotkeysLabel,
  51 |     getMouseBinds,
  52 |     setMouseBinds,
  53 |     makeLabelFromBeforeInput,
  54 |     isAlphaNumLabel,
  55 |     sendHotkeysMode,
  56 |     dispatchHotkey,
  57 |     onGamepadRaw,
  58 |     setGamepadMapping,
  59 |   } = ctx);
  60 | }
  61 | 
  62 | function isMouseLabel(label) {
  63 |   return (
  64 |     typeof label === "string" && /^(MOUSE\d+|WHEEL_(UP|DOWN))$/i.test(label)
  65 |   );
  66 | }
  67 | 
  68 | function isKeyboardLabel(label) {
  69 |   // F-keys, lettres/chiffres, et quelques noms courants
  70 |   if (typeof label !== "string") return false;
  71 |   if (/^F([1-9]|1[0-9]|2[0-4])$/i.test(label)) return true;
  72 |   if (/^[A-Z0-9]$/.test(label)) return true;
  73 |   return /^(ESC|TAB|ENTER|BACKSPACE|SHIFT|CTRL|ALT|SPACE|UP|DOWN|LEFT|RIGHT)$/i.test(
  74 |     label
  75 |   );
  76 | }
  77 | 
  78 | function isCapturing() {
  79 |   return !!captureState;
  80 | }
  81 | function getCaptureBlockUntil() {
  82 |   return captureWaitUntil;
  83 | }
  84 | 
  85 | // --- Hooks appelés par uIOhook pendant capture ---
  86 | function onKeyboardCode(code) {
  87 |   if (!captureState) return;
  88 |   captureState.code = code;
  89 |   if (captureState.label) finalizeCapture("have both");
  90 |   else {
  91 |     if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer);
  92 |     captureState.secondaryTimer = setTimeout(
  93 |       () => finalizeCapture("after-code-wait"),
  94 |       600
  95 |     );
  96 |   }
  97 | }
  98 | 
  99 | function onMouseLabel(label) {
 100 |   if (!captureState) return;
 101 |   const { type } = captureState;
 102 |   captureState.label = label;
 103 |   const labels = { ...getHotkeysLabel(), [type]: label };
 104 |   setHotkeysLabel(labels);
 105 | 
 106 |   // persist binds souris
 107 |   const binds = { ...getMouseBinds(), [type]: label };
 108 |   setMouseBinds(binds);
 109 | 
 110 |   const mw = getMainWindow();
 111 |   mw?.webContents.send("hotkeys-captured", { type, label });
 112 | 
 113 |   finalizeCapture("mouse");
 114 | }
 115 | 
 116 | // --- helpers capture ---
 117 | function clearCaptureTimers() {
 118 |   if (!captureState) return;
 119 |   if (captureState.primaryTimer) {
 120 |     clearTimeout(captureState.primaryTimer);
 121 |     captureState.primaryTimer = null;
 122 |   }
 123 |   if (captureState.secondaryTimer) {
 124 |     clearTimeout(captureState.secondaryTimer);
 125 |     captureState.secondaryTimer = null;
 126 |   }
 127 | }
 128 | 
 129 | function finalizeCapture(reason = "done") {
 130 |   if (!captureState) return;
 131 | 
 132 |   // unbind manette raw
 133 |   if (offGamepadRaw) {
 134 |     try {
 135 |       offGamepadRaw();
 136 |     } catch {}
 137 |     offGamepadRaw = null;
 138 |   }
 139 | 
 140 |   const { type, label, code } = captureState;
 141 |   clearCaptureTimers();
 142 | 
 143 |   logHK && logHK("CAPTURE FINALIZE", { reason, type, label, code });
 144 | 
 145 |   // Persistance si on a reçu des infos
 146 |   if (label) {
 147 |     const labels = { ...getHotkeysLabel(), [type]: label };
 148 |     setHotkeysLabel(labels);
 149 |   }
 150 |   if (typeof code === "number") {
 151 |     const codes = { ...getHotkeys(), [type]: code };
 152 |     setHotkeys(codes);
 153 |   }
 154 |   // Exclusivité : si on vient de définir un label clavier -> on efface l'ancien bind souris
 155 |   if (label && isKeyboardLabel(label)) {
 156 |     const mb = { ...getMouseBinds() };
 157 |     if (mb[type]) {
 158 |       mb[type] = null;
 159 |       setMouseBinds(mb);
 160 |       logHK && logHK("Cleared previous MOUSE bind for", type);
 161 |     }
 162 |   }
 163 |   // Si on a capturé un label souris -> on efface le code clavier pour éviter le double-trigger
 164 |   if (label && isMouseLabel(label)) {
 165 |     const codes = { ...getHotkeys() };
 166 |     if (codes[type] != null) {
 167 |       codes[type] = null;
 168 |       setHotkeys(codes);
 169 |       logHK && logHK("Cleared previous KEYBOARD code for", type);
 170 |     }
 171 |   }
 172 | 
 173 |   // Notifier le panel si on a label ou code
 174 |   const mw = getMainWindow();
 175 |   if (mw && !mw.isDestroyed() && (label || typeof code === "number")) {
 176 |     const payload = { type };
 177 |     if (label) payload.label = label;
 178 |     if (typeof code === "number") payload.keycode = code;
 179 |     mw.webContents.send("hotkeys-captured", payload);
 180 |   }
 181 | 
 182 |   // Alerte uniquement si VC++ manquant ET alphanum tenté sans uIOhook
 183 |   if (!getUsingUiohook() && label && isAlphaNumLabel(label) && !hasVCRedist()) {
 184 |     dialog
 185 |       .showMessageBox({
 186 |         type: "info",
 187 |         title: "Pass-Through unavailable",
 188 |         message:
 189 |           "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
 190 |         detail:
 191 |           "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, " +
 192 |           "then recapture your hotkeys to enable pass-through (so you can still type those letters in Discord, etc.).",
 193 |         buttons: ["Install runtime (x64)", "OK"],
 194 |         defaultId: 0,
 195 |         cancelId: 1,
 196 |         noLink: true,
 197 |       })
 198 |       .then(({ response }) => {
 199 |         if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
 200 |       });
 201 |   }
 202 | 
 203 |   // Si, après cette capture, on a les 2 codes et uIOhook tourne -> passer en pass-through
 204 |   const codes = getHotkeys();
 205 |   const haveBoth = Number.isFinite(codes.start) && Number.isFinite(codes.swap);
 206 |   if (haveBoth && getUsingUiohook() === false) {
 207 |     setUsingUiohook(true);
 208 |     try {
 209 |       globalShortcut.unregisterAll();
 210 |     } catch {}
 211 |     sendHotkeysMode("pass-through");
 212 |   }
 213 | 
 214 |   // Reset capture
 215 |   captureState = null;
 216 |   captureWaitUntil = 0;
 217 | 
 218 |   // Réarmer fallback si nécessaire
 219 |   if (!getUsingUiohook()) {
 220 |     refreshHotkeyEngine({
 221 |       globalShortcut,
 222 |       hotkeysLabel: getHotkeysLabel(),
 223 |       isAlphaNumLabel,
 224 |       logHK,
 225 |       getCaptureBlockUntil,
 226 |       dispatchHotkey,
 227 |     });
 228 |   }
 229 | }
 230 | 
 231 | function setupCaptureIPC() {
 232 |   ipcMain.handle("hotkeys-capture", (_evt, type) => {
 233 |     if (!(type === "start" || type === "swap")) {
 234 |       finalizeCapture("cancel");
 235 |       return true;
 236 |     }
 237 | 
 238 |     logHK &&
 239 |       logHK("CAPTURE BEGIN", {
 240 |         type,
 241 |         mode: getUsingUiohook() ? "pass-through" : "fallback",
 242 |       });
 243 | 
 244 |     // Bloquer le dispatch vers les timers pendant la capture
 245 |     captureWaitUntil = Date.now() + 15000;
 246 | 
 247 |     // Reset/annule capture précédente si elle existe
 248 |     if (captureState) {
 249 |       clearCaptureTimers();
 250 |       captureState = null;
 251 |     }
 252 | 
 253 |     // État de capture : pas de timer court au début; on attend la première frappe
 254 |     captureState = {
 255 |       type,
 256 |       label: null,
 257 |       code: null,
 258 |       primaryTimer: setTimeout(() => {
 259 |         logHK && logHK("CAPTURE PRIMARY TIMEOUT — cancel");
 260 |         finalizeCapture("primary-timeout");
 261 |       }, 15000),
 262 |       secondaryTimer: null,
 263 |     };
 264 | 
 265 |     // focus le panneau
 266 |     try {
 267 |       const mw = getMainWindow();
 268 |       mw?.focus();
 269 |       logHK && logHK("focused mainWindow?", mw?.isFocused());
 270 |     } catch (e) {
 271 |       logHK && logHK("focus error", e?.message || e);
 272 |     }
 273 | 
 274 |     // en fallback, libérer les shortcuts pour laisser passer la frappe
 275 |     if (!getUsingUiohook()) {
 276 |       try {
 277 |         globalShortcut.unregisterAll();
 278 |         logHK && logHK("fallback: unregistered to let key through");
 279 |       } catch {}
 280 |     }
 281 | 
 282 |     // écouter une fois la prochaine touche (pour le label layout-aware)
 283 |     const mw = getMainWindow();
 284 |     const once = (event, input) => {
 285 |       if (!captureState) return;
 286 |       if (input.type !== "keyDown" || input.isAutoRepeat) return;
 287 |       logHK &&
 288 |         logHK("before-input-event keyDown", {
 289 |           key: input.key,
 290 |           code: input.code,
 291 |         });
 292 |       const label = makeLabelFromBeforeInput(input);
 293 | 
 294 |       captureState.label = label;
 295 |       const labels = { ...getHotkeysLabel(), [type]: label };
 296 |       setHotkeysLabel(labels);
 297 | 
 298 |       mw?.webContents.send("hotkeys-captured", { type, label });
 299 |       logHK && logHK("label captured (instant)", { type, label });
 300 | 
 301 |       if (typeof captureState.code === "number") {
 302 |         finalizeCapture("have both");
 303 |       } else {
 304 |         if (captureState.secondaryTimer)
 305 |           clearTimeout(captureState.secondaryTimer);
 306 |         captureState.secondaryTimer = setTimeout(
 307 |           () => finalizeCapture("after-label-wait"),
 308 |           500
 309 |         );
 310 |       }
 311 | 
 312 |       mw?.webContents.removeListener("before-input-event", once);
 313 |     };
 314 |     mw?.webContents.on("before-input-event", once);
 315 | 
 316 |     // Écoute RAW manette (✅ pas de shadowing : variable module-scope)
 317 |     offGamepadRaw = onGamepadRaw((evLabel) => {
 318 |       if (!captureState) return;
 319 |       const { type } = captureState;
 320 | 
 321 |       captureState.label = evLabel;
 322 |       const labels = { ...getHotkeysLabel(), [type]: evLabel };
 323 |       setHotkeysLabel(labels);
 324 |       mw?.webContents.send("hotkeys-captured", { type, label: evLabel });
 325 | 
 326 |       // mapping manette
 327 |       setGamepadMapping(type, evLabel, { append: false });
 328 | 
 329 |       finalizeCapture("gamepad");
 330 |     });
 331 | 
 332 |     logHK && logHK("before-input-event listener ARMED");
 333 | 
 334 |     return true;
 335 |   });
 336 | }
 337 | 
 338 | /* -------------------- Fallback engine (globalShortcut) -------------------- */
 339 | function refreshHotkeyEngine({
 340 |   globalShortcut,
 341 |   hotkeysLabel,
 342 |   isAlphaNumLabel,
 343 |   logHK,
 344 |   getCaptureBlockUntil,
 345 |   dispatchHotkey,
 346 | }) {
 347 |   try {
 348 |     globalShortcut.unregisterAll();
 349 |     logHK && logHK("globalShortcut: unregistered all");
 350 |   } catch {}
 351 | 
 352 |   const RATE = 180;
 353 |   let lastT = 0,
 354 |     lastS = 0;
 355 | 
 356 |   const sKey = hotkeysLabel.start || "F1";
 357 |   const wKey = hotkeysLabel.swap || "F2";
 358 | 
 359 |   // En fallback, on n'essaie de binder que des F-keys (F1..F24).
 360 |   const canUse = (label) => /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);
 361 | 
 362 |   logHK &&
 363 |     logHK("globalShortcut: registering (fallback)", {
 364 |       start: canUse(sKey) ? sKey : "(skipped: alnum passthrough-only)",
 365 |       swap: canUse(wKey) ? wKey : "(skipped: alnum passthrough-only)",
 366 |     });
 367 | 
 368 |   if (canUse(sKey)) {
 369 |     try {
 370 |       globalShortcut.register(sKey, () => {
 371 |         if (Date.now() < getCaptureBlockUntil()) {
 372 |           logHK && logHK("fallback toggle skipped (capturing)");
 373 |           return;
 374 |         }
 375 |         const now = Date.now();
 376 |         if (now - lastT < RATE) return;
 377 |         lastT = now;
 378 |         dispatchHotkey("toggle");
 379 |       });
 380 |     } catch (e) {
 381 |       logHK && logHK("register start failed", e?.message || e);
 382 |     }
 383 |   }
 384 | 
 385 |   if (canUse(wKey)) {
 386 |     try {
 387 |       globalShortcut.register(wKey, () => {
 388 |         if (Date.now() < getCaptureBlockUntil()) {
 389 |           logHK && logHK("fallback swap skipped (capturing)");
 390 |           return;
 391 |         }
 392 |         const now = Date.now();
 393 |         if (now - lastS < RATE) return;
 394 |         lastS = now;
 395 |         dispatchHotkey("swap");
 396 |       });
 397 |     } catch (e) {
 398 |       logHK && logHK("register swap failed", e?.message || e);
 399 |     }
 400 |   }
 401 | }
 402 | 
 403 | /* -------------------- API complémentaire -------------------- */
 404 | function attachWindowsAPI({ sendOverlaySettings }) {
 405 |   // optionnel: expose si besoin
 406 |   module.exports._sendOverlaySettings = sendOverlaySettings;
 407 | }
 408 | 
 409 | module.exports = {
 410 |   initCapture,
 411 |   setupCaptureIPC,
 412 |   refreshHotkeyEngine,
 413 |   isCapturing,
 414 |   getCaptureBlockUntil: getCaptureBlockUntil,
 415 |   onKeyboardCode,
 416 |   onMouseLabel,
 417 |   attachWindowsAPI,
 418 | };

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
 135 | // --- Flux brut pour la capture ------------------------------------------------
 136 | const rawListeners = new Set();
 137 | function onGamepadRaw(cb) {
 138 |   if (typeof cb === "function") {
 139 |     rawListeners.add(cb);
 140 |     return () => rawListeners.delete(cb);
 141 |   }
 142 |   return () => {};
 143 | }
 144 | function emitRaw(ev) {
 145 |   for (const cb of rawListeners) {
 146 |     try {
 147 |       cb(ev);
 148 |     } catch {}
 149 |   }
 150 | }
 151 | 
 152 | // --- Process natif -----------------------------------------------------------
 153 | function handleGamepadEventName(name) {
 154 |   const ev = normalizeEventName(name);
 155 |   if (!ev) return;
 156 | 
 157 |   // Toujours notifier le brut (capture)
 158 |   emitRaw(ev);
 159 | 
 160 |   // Déclenchement selon mapping
 161 |   if ((mapping.toggle || []).includes(ev)) {
 162 |     broadcastHotkey("toggle");
 163 |     return;
 164 |   }
 165 |   if ((mapping.swap || []).includes(ev)) {
 166 |     broadcastHotkey("swap");
 167 |     return;
 168 |   }
 169 | }
 170 | 
 171 | function launch() {
 172 |   const exe = resolveExePath();
 173 |   if (!existsSync(exe)) return;
 174 | 
 175 |   child = spawn(exe, [], {
 176 |     stdio: ["ignore", "pipe", "ignore"],
 177 |     windowsHide: true,
 178 |   });
 179 | 
 180 |   let buffer = "";
 181 |   child.stdout.on("data", (chunk) => {
 182 |     buffer += chunk.toString("utf8");
 183 |     let idx;
 184 |     while ((idx = buffer.indexOf("\n")) >= 0) {
 185 |       const line = buffer.slice(0, idx).trim();
 186 |       buffer = buffer.slice(idx + 1);
 187 |       if (line) handleGamepadEventName(line);
 188 |     }
 189 |   });
 190 | 
 191 |   child.on("exit", () => {
 192 |     child = null;
 193 |     if (isQuitting) return;
 194 |     clearTimeout(relaunchTimer);
 195 |     relaunchTimer = setTimeout(launch, 1000);
 196 |   });
 197 | 
 198 |   child.on("error", () => {
 199 |     child = null;
 200 |     if (isQuitting) return;
 201 |     clearTimeout(relaunchTimer);
 202 |     relaunchTimer = setTimeout(launch, 1500);
 203 |   });
 204 | }
 205 | 
 206 | function setupGamepadExe() {
 207 |   if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où
 208 | 
 209 |   loadMapping();
 210 |   try {
 211 |     watch(configFilePath(), { persistent: false }, () => loadMapping());
 212 |   } catch {}
 213 | 
 214 |   launch();
 215 | 
 216 |   app.on("before-quit", () => {
 217 |     isQuitting = true;
 218 |     try {
 219 |       clearTimeout(relaunchTimer);
 220 |     } catch {}
 221 |     try {
 222 |       child?.kill();
 223 |     } catch {}
 224 |   });
 225 |   app.on("will-quit", () => {
 226 |     isQuitting = true;
 227 |     try {
 228 |       clearTimeout(relaunchTimer);
 229 |     } catch {}
 230 |     try {
 231 |       child?.kill();
 232 |     } catch {}
 233 |   });
 234 | }
 235 | 
 236 | module.exports = {
 237 |   setupGamepadExe,
 238 |   onGamepadRaw,
 239 |   setGamepadMapping,
 240 | };

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
  26 | } = require("./input/gamepad-exe.cjs");
  27 | 
  28 | /** Charge .env/.env.development UNIQUEMENT en dev, si "dotenv" est présent. */
  29 | (function loadDevEnv() {
  30 |   if (app.isPackaged) return; // en prod: ne rien charger
  31 |   let dotenv;
  32 |   try {
  33 |     dotenv = require("dotenv");
  34 |   } catch {
  35 |     return;
  36 |   }
  37 |   const root = process.cwd();
  38 |   for (const name of [".env", ".env.development"]) {
  39 |     const p = join(root, name);
  40 |     if (fs.existsSync(p)) dotenv.config({ path: p, override: true });
  41 |   }
  42 | })();
  43 | 
  44 | /* -------------------- flags via .env -------------------- */
  45 | const FORCE_NO_UIOHOOK = process.env.FORCE_NO_UIOHOOK === "1";
  46 | const FORCE_NO_VCREDIST = process.env.FORCE_NO_VCREDIST === "1";
  47 | const DEBUG_HK = process.env.DEBUG_HK === "1";
  48 | 
  49 | const __dirname = dirname(fileURLToPath(import.meta.url));
  50 | const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  51 | 
  52 | if (process.platform === "win32") {
  53 |   app.setAppUserModelId("com.steaxs.dbdtimer.free");
  54 | }
  55 | 
  56 | const iconPath = isDev
  57 |   ? join(__dirname, "../build/icon.ico")
  58 |   : join(process.resourcesPath, "icon.ico");
  59 | 
  60 | const store = new Store();
  61 | 
  62 | // single-instance (évite hooks dupliqués)
  63 | if (!app.requestSingleInstanceLock()) {
  64 |   app.quit();
  65 | }
  66 | 
  67 | /* -------------------- store keys & defaults -------------------- */
  68 | const K = {
  69 |   WINDOW: "windowState",
  70 |   OVERLAY: "overlaySettings",
  71 |   TIMER: "timerData",
  72 |   HK_CODES: "hotkeys",
  73 |   HK_LABELS: "hotkeysLabel",
  74 |   MOUSE_BINDS: "mouseBinds",
  75 | };
  76 | const defaults = {
  77 |   [K.OVERLAY]: { x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true },
  78 |   [K.TIMER]: {
  79 |     player1: { name: "Player 1", score: 0 },
  80 |     player2: { name: "Player 2", score: 0 },
  81 |   },
  82 |   [K.HK_CODES]: { start: null, swap: null },
  83 |   [K.HK_LABELS]: { start: "F1", swap: "F2" },
  84 |   [K.MOUSE_BINDS]: { start: null, swap: null },
  85 | };
  86 | const getStore = (key) => store.get(key) ?? defaults[key];
  87 | 
  88 | /* -------------------- état runtime -------------------- */
  89 | let mainWindow = null;
  90 | let overlayWindow = null;
  91 | let usingUiohook = false;
  92 | 
  93 | // dimensions non-scalées du contenu (hors drag bar)
  94 | let baseDims = { width: 520, height: 120 };
  95 | 
  96 | // hotkeys: codes (uiohook) + labels (affichage & fallback)
  97 | let hotkeys = getStore(K.HK_CODES);
  98 | let hotkeysLabel = getStore(K.HK_LABELS);
  99 | let mouseBinds = getStore(K.MOUSE_BINDS);
 100 | 
 101 | // ===== debug =====
 102 | const logHK = (...args) => {
 103 |   if (DEBUG_HK) console.log("[HK]", ...args);
 104 | };
 105 | 
 106 | /* -------------------- helpers communs -------------------- */
 107 | const VC_REDIST_X64_URL = "https://aka.ms/vs/17/release/vc_redist.x64.exe";
 108 | 
 109 | // Détection VC++ 2015–2022 (x64)
 110 | function hasVCRedist() {
 111 |   if (FORCE_NO_VCREDIST) return false;
 112 |   if (process.platform !== "win32") return true;
 113 |   const win = process.env.windir || "C:\\Windows";
 114 |   const sys32 = join(win, "System32");
 115 |   const dlls = ["vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll"];
 116 |   try {
 117 |     return dlls.every((d) => fs.existsSync(join(sys32, d)));
 118 |   } catch {
 119 |     return false;
 120 |   }
 121 | }
 122 | 
 123 | // Dédup unifié
 124 | function createRateLimiter(defaultMs = 200) {
 125 |   const last = new Map();
 126 |   return (key, ms = defaultMs) => {
 127 |     const now = Date.now();
 128 |     const t = last.get(key) || 0;
 129 |     if (now - t < ms) return false;
 130 |     last.set(key, now);
 131 |     return true;
 132 |   };
 133 | }
 134 | const canFire = createRateLimiter(220);
 135 | 
 136 | function isAlphaNumLabel(k) {
 137 |   return typeof k === "string" && /^[A-Z0-9]$/.test(k);
 138 | }
 139 | 
 140 | // Normalise un label depuis before-input-event (fallback)
 141 | function makeLabelFromBeforeInput(input) {
 142 |   let k = input.key || "";
 143 |   if (/^F\d{1,2}$/.test(k)) return k;
 144 |   if (/^[a-z]$/.test(k)) return k.toUpperCase();
 145 |   if (/^\d$/.test(k)) return k;
 146 |   if (k === " ") return "SPACE";
 147 |   const map = {
 148 |     Escape: "ESC",
 149 |     Tab: "TAB",
 150 |     Enter: "ENTER",
 151 |     Backspace: "BACKSPACE",
 152 |     Shift: "SHIFT",
 153 |     Control: "CTRL",
 154 |     Alt: "ALT",
 155 |     Meta: "META",
 156 |     ArrowUp: "UP",
 157 |     ArrowDown: "DOWN",
 158 |     ArrowLeft: "LEFT",
 159 |     ArrowRight: "RIGHT",
 160 |   };
 161 |   if (map[k]) return k;
 162 |   const code = input.code || "";
 163 |   if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
 164 |   if (/^Digit\d$/.test(code)) return code.slice(5);
 165 |   return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
 166 | }
 167 | 
 168 | /* -------------------- dispatch centralisé vers l’overlay -------------------- */
 169 | function dispatchHotkey(type) {
 170 |   if (!overlayWindow || overlayWindow.isDestroyed()) return;
 171 |   if (!canFire(type, 220)) return;
 172 |   overlayWindow.webContents.send("global-hotkey", { type });
 173 |   logHK("DISPATCH", type);
 174 | }
 175 | 
 176 | /* -------------------- wiring modules -------------------- */
 177 | // Initialiser le module fenêtres
 178 | windows.initWindows({
 179 |   store,
 180 |   iconPath,
 181 |   isDev,
 182 |   baseDims,
 183 |   getBaseDims: () => baseDims,
 184 |   setBaseDims: (w, h) => {
 185 |     baseDims = { width: Math.max(1, Math.floor(w)), height: Math.max(1, Math.floor(h)) };
 186 |   },
 187 |   onOverlayMove: (x, y) => {
 188 |     // débounce léger (100ms)
 189 |     if (windows._moveDebounce) clearTimeout(windows._moveDebounce);
 190 |     windows._moveDebounce = setTimeout(() => {
 191 |       store.set("overlaySettings.x", x);
 192 |       store.set("overlaySettings.y", y);
 193 |     }, 120);
 194 |   },
 195 |   onOverlayReadyChange: (ready) => {
 196 |     if (mainWindow && !mainWindow.isDestroyed())
 197 |       mainWindow.webContents.send("overlay-ready", !!ready);
 198 |   },
 199 | });
 200 | 
 201 | // Initialiser le module capture
 202 | capture.initCapture({
 203 |   ipcMain,
 204 |   store,
 205 |   globalShortcut,
 206 |   dialog,
 207 |   shell,
 208 |   VC_REDIST_X64_URL,
 209 |   hasVCRedist,
 210 |   logHK,
 211 |   getMainWindow: () => mainWindow,
 212 |   getOverlayWindow: () => overlayWindow,
 213 |   getUsingUiohook: () => usingUiohook,
 214 |   setUsingUiohook: (v) => (usingUiohook = !!v),
 215 |   getHotkeys: () => hotkeys,
 216 |   setHotkeys: (next) => {
 217 |     hotkeys = next;
 218 |     store.set(K.HK_CODES, hotkeys);
 219 |   },
 220 |   getHotkeysLabel: () => hotkeysLabel,
 221 |   setHotkeysLabel: (next) => {
 222 |     hotkeysLabel = next;
 223 |     store.set(K.HK_LABELS, hotkeysLabel);
 224 |   },
 225 |   getMouseBinds: () => mouseBinds,
 226 |   setMouseBinds: (next) => {
 227 |     mouseBinds = next;
 228 |     store.set(K.MOUSE_BINDS, mouseBinds);
 229 |   },
 230 |   makeLabelFromBeforeInput,
 231 |   isAlphaNumLabel,
 232 |   sendHotkeysMode: (mode) => {
 233 |     if (mainWindow && !mainWindow.isDestroyed()) {
 234 |       mainWindow.webContents.send("hotkeys-mode", mode);
 235 |     }
 236 |   },
 237 |   dispatchHotkey,
 238 |   onGamepadRaw,         // ↔️ gamepad
 239 |   setGamepadMapping,    // ↔️ gamepad
 240 | });
 241 | 
 242 | // Initialiser le module uIOhook (clavier + souris)
 243 | uio.setupUiohook({
 244 |   require,            // pour charger uiohook-napi
 245 |   FORCE_NO_UIOHOOK,
 246 |   hasVCRedist,
 247 |   dialog,
 248 |   shell,
 249 |   VC_REDIST_X64_URL,
 250 |   logHK,
 251 |   getOverlayWindow: () => overlayWindow,
 252 |   dispatchHotkey,
 253 |   // capture integration:
 254 |   isCapturing: () => capture.isCapturing(),
 255 |   getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 256 |   onCaptureKeyboardCode: (code) => capture.onKeyboardCode(code),
 257 |   onCaptureMouseLabel: (label) => capture.onMouseLabel(label),
 258 |   // binds & codes
 259 |   getHotkeys: () => hotkeys,
 260 |   getMouseBinds: () => mouseBinds,
 261 |   setUsingUiohook: (v) => {
 262 |     usingUiohook = !!v;
 263 |     const mode = usingUiohook ? "pass-through" : "fallback";
 264 |     if (mainWindow && !mainWindow.isDestroyed()) {
 265 |       mainWindow.webContents.send("hotkeys-mode", mode);
 266 |     }
 267 |     if (!usingUiohook) {
 268 |       // (re)activer globalShortcut fallback
 269 |       capture.refreshHotkeyEngine({
 270 |         globalShortcut,
 271 |         hotkeysLabel,
 272 |         isAlphaNumLabel,
 273 |         logHK,
 274 |         getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 275 |         dispatchHotkey,
 276 |       });
 277 |     } else {
 278 |       try {
 279 |         globalShortcut.unregisterAll();
 280 |       } catch {}
 281 |     }
 282 |   },
 283 | });
 284 | 
 285 | // Expose quelques helpers Windows au module capture
 286 | capture.attachWindowsAPI({
 287 |   sendOverlaySettings: () => windows.sendOverlaySettings(overlayWindow, store, isDev),
 288 | });
 289 | 
 290 | /* -------------------- IPC (panneau ↔ main) -------------------- */
 291 | function setupIPC() {
 292 |   ipcMain.handle("overlay-show", () => {
 293 |     overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
 294 |     return true;
 295 |   });
 296 |   ipcMain.handle("overlay-hide", () => {
 297 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
 298 |     overlayWindow = null;
 299 |     if (mainWindow && !mainWindow.isDestroyed())
 300 |       mainWindow.webContents.send("overlay-ready", false);
 301 |     return true;
 302 |   });
 303 | 
 304 |   ipcMain.handle("overlay-settings-update", (_evt, settings) => {
 305 |     const current = getStore(K.OVERLAY);
 306 |     const next = { ...current, ...settings };
 307 |     store.set(K.OVERLAY, next);
 308 |     if (!overlayWindow || overlayWindow.isDestroyed()) return true;
 309 | 
 310 |     if (settings.locked !== undefined) {
 311 |       overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
 312 |       overlayWindow.setFocusable(true); // OBS/Alt-Tab
 313 |     }
 314 |     if (settings.alwaysOnTop !== undefined)
 315 |       windows.applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
 316 |     if (settings.x !== undefined || settings.y !== undefined) {
 317 |       const b = overlayWindow.getBounds();
 318 |       overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y);
 319 |     }
 320 |     if (settings.scale !== undefined || settings.locked !== undefined)
 321 |       windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
 322 |     windows.sendOverlaySettings(overlayWindow, store, isDev);
 323 |     return true;
 324 |   });
 325 | 
 326 |   ipcMain.handle("overlay-measure", (_evt, dims) => {
 327 |     if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
 328 |       return false;
 329 |     baseDims = {
 330 |       width: Math.max(1, Math.floor(dims.width)),
 331 |       height: Math.max(1, Math.floor(dims.height)),
 332 |     };
 333 |     windows.recomputeOverlaySize(overlayWindow, store, () => baseDims);
 334 |     return true;
 335 |   });
 336 | 
 337 |   // Timer data
 338 |   ipcMain.handle("timer-data-get", () => getStore(K.TIMER));
 339 |   ipcMain.handle("timer-data-set", (_evt, data) => {
 340 |     store.set(K.TIMER, data);
 341 |     if (overlayWindow && !overlayWindow.isDestroyed())
 342 |       overlayWindow.webContents.send("timer-data-sync", data);
 343 |     return true;
 344 |   });
 345 | 
 346 |   // Hotkeys API
 347 |   ipcMain.handle("hotkeys-get", () => ({
 348 |     start: hotkeys.start,
 349 |     swap: hotkeys.swap,
 350 |     startLabel: hotkeysLabel.start,
 351 |     swapLabel: hotkeysLabel.swap,
 352 |     mode: usingUiohook ? "pass-through" : "fallback",
 353 |   }));
 354 | 
 355 |   ipcMain.handle("hotkeys-set", (_evt, hk) => {
 356 |     hotkeys = { ...hotkeys, ...hk }; // codes uiohook si fournis
 357 |     store.set(K.HK_CODES, hotkeys);
 358 | 
 359 |     const haveCodes =
 360 |       Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);
 361 | 
 362 |     if (haveCodes && uio.isLoaded()) {
 363 |       // on bascule en pass-through
 364 |       try {
 365 |         globalShortcut.unregisterAll();
 366 |       } catch {}
 367 |       usingUiohook = true;
 368 |       if (mainWindow && !mainWindow.isDestroyed())
 369 |         mainWindow.webContents.send("hotkeys-mode", "pass-through");
 370 |     } else if (!haveCodes) {
 371 |       usingUiohook = false;
 372 |       capture.refreshHotkeyEngine({
 373 |         globalShortcut,
 374 |         hotkeysLabel,
 375 |         isAlphaNumLabel,
 376 |         logHK,
 377 |         getCaptureBlockUntil: () => capture.getCaptureBlockUntil(),
 378 |         dispatchHotkey,
 379 |       });
 380 |       if (mainWindow && !mainWindow.isDestroyed())
 381 |         mainWindow.webContents.send("hotkeys-mode", "fallback");
 382 |     }
 383 |     return true;
 384 |   });
 385 | 
 386 |   // 🚀 Capture: tout le workflow (IPC) déplacé dans le module capture
 387 |   capture.setupCaptureIPC();
 388 | }
 389 | 
 390 | /* -------------------- lifecycle -------------------- */
 391 | app.commandLine.appendSwitch("enable-zero-copy");
 392 | app.commandLine.appendSwitch("ignore-gpu-blocklist");
 393 | 
 394 | app.whenReady().then(() => {
 395 |   mainWindow = windows.createMainWindow(store, iconPath, isDev);
 396 |   setupIPC();
 397 |   uio.start(); // lance uIOhook (si possible) et configure mode fallback/pass-through
 398 |   setTimeout(() => {
 399 |     overlayWindow = windows.createOverlayWindow(overlayWindow, mainWindow);
 400 |   }, 800);
 401 |   setupGamepadExe();
 402 | }).catch(err => console.error("[Electron] whenReady error:", err));
 403 | 
 404 | app.on("second-instance", () => {
 405 |   if (mainWindow) {
 406 |     if (mainWindow.isMinimized()) mainWindow.restore();
 407 |     mainWindow.show();
 408 |     mainWindow.focus();
 409 |   }
 410 | });
 411 | 
 412 | app.on("will-quit", () => {
 413 |   try {
 414 |     if (uio.isLoaded()) uio.stop();
 415 |   } catch {}
 416 |   try {
 417 |     globalShortcut.unregisterAll();
 418 |   } catch {}
 419 | });
 420 | 
 421 | app.on("window-all-closed", () => {
 422 |   app.quit();
 423 | });

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
  69 |     });
  70 |     ov.webContents.send("overlay-settings", s);
  71 |   }
  72 | }
  73 | 
  74 | function recomputeOverlaySize(ov, storeRef, getBaseDims) {
  75 |   if (!ov || ov.isDestroyed()) return;
  76 |   const s =
  77 |     (storeRef || store).get("overlaySettings", { scale: 100, locked: true });
  78 |   const dragH = s.locked ? 0 : 30;
  79 |   const scale = (s.scale || 100) / 100;
  80 |   const dims = (getBaseDims || _getBaseDims)();
  81 |   const w = Math.ceil(dims.width * scale);
  82 |   const h = Math.ceil((dims.height + dragH) * scale);
  83 |   ov.setContentSize(w, h);
  84 |   sendOverlaySettings(ov, storeRef, isDev);
  85 | }
  86 | 
  87 | function createMainWindow(storeRef, icoPath, isDevFlag) {
  88 |   const saved = (storeRef || store).get("windowState") || {};
  89 |   const width = Math.max(saved.width || 1120, 980);
  90 |   const height = Math.max(saved.height || 820, 720);
  91 | 
  92 |   mainWindow = new BrowserWindow({
  93 |     width,
  94 |     height,
  95 |     x: saved.x,
  96 |     y: saved.y,
  97 |     minWidth: 980,
  98 |     minHeight: 720,
  99 |     show: false,
 100 |     icon: icoPath || iconPath,
 101 |     autoHideMenuBar: true,
 102 |     webPreferences: {
 103 |       nodeIntegration: false,
 104 |       contextIsolation: true,
 105 |       preload: join(__dirname, "../preload.cjs"),
 106 |       devTools: !!isDevFlag || isDev,
 107 |     },
 108 |   });
 109 | 
 110 |   Menu.setApplicationMenu?.(null);
 111 |   mainWindow.setMenuBarVisibility(false);
 112 | 
 113 |   // Bloque Alt menu (évite le flash de barre menu)
 114 |   mainWindow.webContents.on("before-input-event", (event, input) => {
 115 |     if (
 116 |       input.type === "keyDown" &&
 117 |       (input.key === "Alt" || input.code === "AltLeft" || input.code === "AltRight")
 118 |     ) {
 119 |       event.preventDefault();
 120 |     }
 121 |   });
 122 | 
 123 |   if (!!isDevFlag || isDev) {
 124 |     mainWindow.loadURL("http://localhost:5173");
 125 |     mainWindow.webContents.openDevTools({ mode: "detach" });
 126 |   } else {
 127 |     mainWindow.loadFile(join(__dirname, "../../dist/index.html"));
 128 |     // Bloque F12 / Ctrl+Shift+I en prod (existant côté panel)
 129 |     mainWindow.webContents.on("before-input-event", (e, input) => {
 130 |       const combo =
 131 |         (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
 132 |       if (combo || input.key === "F12") e.preventDefault();
 133 |     });
 134 |   }
 135 | 
 136 |   mainWindow.once("ready-to-show", () => mainWindow.show());
 137 |   mainWindow.on("close", () => {
 138 |     const b = mainWindow.getBounds();
 139 |     (storeRef || store).set("windowState", b);
 140 |   });
 141 |   mainWindow.on("closed", () => {
 142 |     mainWindow = null;
 143 |     if (overlayWindow) overlayWindow.close();
 144 |   });
 145 | 
 146 |   return mainWindow;
 147 | }
 148 | 
 149 | function createOverlayWindow(currentOverlay, currentMain) {
 150 |   if (currentOverlay && !currentOverlay.isDestroyed()) {
 151 |     currentOverlay.show();
 152 |     currentOverlay.focus();
 153 |     overlayWindow = currentOverlay;
 154 |     return overlayWindow;
 155 |   }
 156 | 
 157 |   // --- INIT ROBUSTE ---
 158 |   let s = (store || {}).get?.("overlaySettings") || {};
 159 |   const pd = screen.getPrimaryDisplay();
 160 |   const origin = pd.bounds;
 161 | 
 162 |   if (!Number.isFinite(s.x)) s.x = origin.x;
 163 |   if (!Number.isFinite(s.y)) s.y = origin.y;
 164 |   if (typeof s.scale !== "number") s.scale = 100;
 165 |   if (typeof s.locked !== "boolean") s.locked = true;
 166 |   if (typeof s.alwaysOnTop !== "boolean") s.alwaysOnTop = true;
 167 |   store.set("overlaySettings", s);
 168 |   // --- FIN INIT ROBUSTE
 169 | 
 170 |   const dragH = s.locked ? 0 : 30;
 171 |   const scale = (s.scale || 100) / 100;
 172 |   const dims = _getBaseDims();
 173 | 
 174 |   overlayWindow = new BrowserWindow({
 175 |     width: Math.ceil(dims.width * scale),
 176 |     height: Math.ceil((dims.height + dragH) * scale),
 177 |     x: s.x,
 178 |     y: s.y,
 179 |     frame: false,
 180 |     transparent: true,
 181 |     resizable: false,
 182 |     hasShadow: false,
 183 |     skipTaskbar: false,
 184 |     focusable: true,
 185 |     title: "DBD Timer Overlay by Doc & Steaxs",
 186 |     acceptFirstMouse: true,
 187 |     backgroundColor: "#00000000",
 188 |     useContentSize: true,
 189 |     show: false,
 190 |     webPreferences: {
 191 |       nodeIntegration: false,
 192 |       contextIsolation: true,
 193 |       preload: join(__dirname, "../preload.cjs"),
 194 |       backgroundThrottling: false,
 195 |       devTools: !!isDev,
 196 |     },
 197 |   });
 198 | 
 199 |   overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
 200 |   applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);
 201 | 
 202 |   const url = isDev
 203 |     ? "http://localhost:5173/overlay.html"
 204 |     : join(__dirname, "../../dist/overlay.html");
 205 |   if (isDev) overlayWindow.loadURL(url);
 206 |   else overlayWindow.loadFile(url);
 207 | 
 208 |   enforceExternalLinks(overlayWindow);
 209 | 
 210 |   if (!isDev) {
 211 |     overlayWindow.webContents.on("before-input-event", (e, input) => {
 212 |       const combo =
 213 |         (input.control || input.meta) && input.shift && input.key?.toLowerCase() === "i";
 214 |       if (combo || input.key === "F12") e.preventDefault();
 215 |     });
 216 |   }
 217 | 
 218 |   overlayWindow.on("closed", () => {
 219 |     overlayWindow = null;
 220 |     _onOverlayReadyChange && _onOverlayReadyChange(false);
 221 |   });
 222 |   overlayWindow.on("move", () => {
 223 |     const b = overlayWindow.getBounds();
 224 |     _onOverlayMove && _onOverlayMove(b.x, b.y);
 225 |   });
 226 | 
 227 |   overlayWindow.webContents.on("did-finish-load", () => {
 228 |     const data =
 229 |       store.get("timerData") || {
 230 |         player1: { name: "Player 1", score: 0 },
 231 |         player2: { name: "Player 2", score: 0 },
 232 |       };
 233 |     overlayWindow.webContents.send("timer-data-sync", data);
 234 | 
 235 |     sendOverlaySettings(overlayWindow, store, isDev);
 236 |     recomputeOverlaySize(overlayWindow, store, _getBaseDims);
 237 | 
 238 |     _onOverlayReadyChange && _onOverlayReadyChange(true);
 239 |     overlayWindow.show();
 240 |   });
 241 | 
 242 |   return overlayWindow;
 243 | }
 244 | 
 245 | module.exports = {
 246 |   initWindows,
 247 |   createMainWindow,
 248 |   createOverlayWindow,
 249 |   enforceExternalLinks,
 250 |   applyAlwaysOnTop,
 251 |   sendOverlaySettings,
 252 |   recomputeOverlaySize,
 253 | 
 254 |   // (utiles si besoin)
 255 |   getMainWindow: () => mainWindow,
 256 |   getOverlayWindow: () => overlayWindow,
 257 | };

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
   7 |     <title>DBD Timer - Overlay by Doc & Steaxs</title>
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
  66 |       "shortcutName": "DBD Timer Overlay"
  67 |     },
  68 |     "files": [
  69 |       "dist/**",
  70 |       "electron/**",
  71 |       "package.json",
  72 |       "!**/*.map",
  73 |       "!**/*.ts",
  74 |       "!src/**"
  75 |     ],
  76 |     "asar": true,
  77 |     "asarUnpack": [
  78 |       "**/node_modules/uiohook-napi/**"
  79 |     ],
  80 |     "compression": "maximum",
  81 |     "win": {
  82 |       "icon": "build/icon.ico",
  83 |       "target": [
  84 |         {
  85 |           "target": "nsis",
  86 |           "arch": [
  87 |             "x64"
  88 |           ]
  89 |         },
  90 |         {
  91 |           "target": "portable",
  92 |           "arch": [
  93 |             "x64"
  94 |           ]
  95 |         }
  96 |       ],
  97 |       "artifactName": "DBD-Timer-Free-${version}-Setup.exe"
  98 |     }
  99 |   }
 100 | }

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
 284 |             Reset scores
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
 314 | 
 315 |               <button
 316 |                 type="button"
 317 |                 role="switch"
 318 |                 aria-checked={locked}
 319 |                 onClick={() => {
 320 |                   const next = !locked;
 321 |                   setLocked(next); // ton setState local si tu en as un
 322 |                   window.api.overlay.updateSettings({ locked: next });
 323 |                 }}
 324 |                 className={[
 325 |                   "relative h-6 w-11 rounded-full transition-colors",
 326 |                   locked ? "bg-emerald-500" : "bg-neutral-300",
 327 |                   "ring-1 ring-black/5"
 328 |                 ].join(" ")}
 329 |               >
 330 |                 <span
 331 |                   aria-hidden
 332 |                   className={[
 333 |                     "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
 334 |                     locked ? "translate-x-5" : ""
 335 |                   ].join(" ")}
 336 |                 />
 337 |               </button>
 338 |             </label>
 339 |           </div>
 340 | 
 341 |           <div
 342 |             className={`mt-4 rounded-lg border p-3 text-sm ${
 343 |               locked
 344 |                 ? "border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]"
 345 |                 : "border-violet-500/40 bg-violet-500/10 text-violet-300"
 346 |             }`}
 347 |           >
 348 |             {locked
 349 |               ? "Overlay is locked – clicks will go through."
 350 |               : "Overlay is unlocked – drag the purple bar to reposition."}
 351 |           </div>
 352 |         </section>
 353 | 
 354 |         {/* Discord CTA — Premium overlays */}
 355 |         <section className="mt-8 relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-emerald-500/10 p-5">
 356 |           <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-violet-500/30" />
 357 |           <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/20" />
 358 |           <div className="relative">
 359 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
 360 |               👑 Premium Overlays
 361 |             </div>
 362 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
 363 |               Unlock more overlays & tools
 364 |             </h3>
 365 |             <p className="mt-2 text-sm text-zinc-200">
 366 |               Join our Discord to get the premium version: <b>killer streaks</b>
 367 |               , <b>survivor streaks</b>, <b>win/loss counter</b>,{" "}
 368 |               <b>tournament overlay</b>, and more!
 369 |             </p>
 370 | 
 371 |             <a
 372 |               href="http://discord.com/invite/aVdT8rRJKc"
 373 |               target="_blank"
 374 |               rel="noreferrer"
 375 |               className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
 376 |             >
 377 |               Join the Discord
 378 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 379 |                 <path
 380 |                   d="M7 17L17 7M17 7H8M17 7v9"
 381 |                   stroke="currentColor"
 382 |                   strokeWidth="1.8"
 383 |                   strokeLinecap="round"
 384 |                   strokeLinejoin="round"
 385 |                 />
 386 |               </svg>
 387 |             </a>
 388 |           </div>
 389 |         </section>
 390 | 
 391 |         <section className="mt-6 relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-tr from-cyan-400/10 via-sky-500/10 to-indigo-500/10 p-5">
 392 |           <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full blur-3xl bg-cyan-400/30" />
 393 |           <div className="relative">
 394 |             <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
 395 |               🎨 ReShade Filters
 396 |             </div>
 397 |             <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
 398 |               GET STEAXS RESHADES
 399 |             </h3>
 400 |             <p className="mt-2 text-sm text-zinc-200">
 401 |               Competitive ReShade presets tailored for Dead by Daylight. Sharper
 402 |               visibility, clean colors, and a consistent look across maps.
 403 |             </p>
 404 |             <a
 405 |               href="https://discord.com/invite/6RHPNNVtKw"
 406 |               target="_blank"
 407 |               rel="noreferrer"
 408 |               className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
 409 |             >
 410 |               Get the Presets
 411 |               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
 412 |                 <path
 413 |                   d="M7 17L17 7M17 7H8M17 7v9"
 414 |                   stroke="currentColor"
 415 |                   strokeWidth="1.8"
 416 |                   strokeLinecap="round"
 417 |                   strokeLinejoin="round"
 418 |                 />
 419 |               </svg>
 420 |             </a>
 421 |           </div>
 422 |         </section>
 423 |         {/* Footer */}
 424 |         <footer className="mt-4">
 425 |           <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-300">
 426 |             <div className="uppercase tracking-wider">
 427 |               © BY <b>STEAXS</b> &amp; <b>DOC</b> — 2025
 428 |             </div>
 429 |           </div>
 430 |         </footer>
 431 |       </div>
 432 |     </div>
 433 |   );
 434 | };
 435 | 
 436 | export default ControlPanel;

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
   5 | 
   6 | type TD = {
   7 |   player1: { name: string; score: number };
   8 |   player2: { name: string; score: number };
   9 | };
  10 | 
  11 | function splitForTheme(fmt: string) {
  12 |   // support "SS.CC" ou "M:SS.CC"
  13 |   const arr: { ch: string; sep?: boolean }[] = [];
  14 |   for (let i = 0; i < fmt.length; i++) {
  15 |     const ch = fmt[i];
  16 |     if (ch === ":" || ch === ".") arr.push({ ch, sep: true });
  17 |     else arr.push({ ch });
  18 |   }
  19 |   return arr;
  20 | }
  21 | 
  22 | export default function TimerOverlay() {
  23 |   const [players, setPlayers] = React.useState<TD>({
  24 |     player1: { name: "Player 1", score: 0 },
  25 |     player2: { name: "Player 2", score: 0 },
  26 |   });
  27 | 
  28 |   const active = useTimerStore((s) => s.active);
  29 |   const status = useTimerStore((s) => s.status); // Record<1|2, 'stopped'|'running'|'paused'>
  30 |   const elapsed = useTimerStore((s) => s.elapsed);
  31 | 
  32 |   const [locked, setLocked] = React.useState(false);
  33 |   const [scale, setScale] = React.useState(100);
  34 | 
  35 |   // IPC: names/scores only
  36 |   React.useEffect(() => {
  37 |     (async () => setPlayers(await window.api.timer.get()))();
  38 |     window.api.timer.onSync((d: any) => setPlayers(d));
  39 |   }, []);
  40 | 
  41 |   // Receive overlay settings (lock + scale)
  42 |   React.useEffect(() => {
  43 |     window.api.overlay.onSettings((s: any) => {
  44 |       setLocked(!!s.locked);
  45 |       setScale(s.scale || 100);
  46 |     });
  47 |   }, []);
  48 | 
  49 |   // Hotkeys globales (venant du main via uiohook)
  50 |   React.useEffect(() => {
  51 |     const handler = (p: any) => {
  52 |       const api = useTimerStore.getState();
  53 |       if (p?.type === "toggle") api.toggle();
  54 |       else if (p?.type === "swap") api.select(api.active === 1 ? 2 : 1);
  55 |     };
  56 |     window.api.hotkeys.on(handler);
  57 |   }, []);
  58 | 
  59 |   // Tick adaptatif : 60 FPS quand ça tourne, 8 FPS à l'arrêt/pausé
  60 |   const [, setTick] = React.useState(0);
  61 |   React.useEffect(() => {
  62 |     const s1 = status[1];
  63 |     const s2 = status[2];
  64 |     const running = s1 === "running" || s2 === "running";
  65 | 
  66 |     let cancel = false;
  67 |     let raf = 0;
  68 |     let intervalId: number | undefined;
  69 | 
  70 |     const bump = () => setTick((t) => (t + 1) | 0);
  71 | 
  72 |     if (running) {
  73 |       const loop = () => {
  74 |         if (cancel) return;
  75 |         bump();
  76 |         raf = requestAnimationFrame(loop);
  77 |       };
  78 |       raf = requestAnimationFrame(loop);
  79 |     } else {
  80 |       // ~8 FPS
  81 |       intervalId = window.setInterval(bump, 125);
  82 |     }
  83 | 
  84 |     return () => {
  85 |       cancel = true;
  86 |       if (raf) cancelAnimationFrame(raf);
  87 |       if (intervalId) clearInterval(intervalId);
  88 |     };
  89 |   }, [status[1], status[2]]);
  90 | 
  91 |   // Mesure pour le main (taille intrinsèque)
  92 |   React.useEffect(() => {
  93 |     const measure = () => {
  94 |       const el = document.getElementById("timerContainer");
  95 |       if (!el) return;
  96 |       const w = el.offsetWidth;
  97 |       const h = el.offsetHeight;
  98 |       window.api.overlay.measure(w, h);
  99 |     };
 100 |     // fonts prêtes → mesurer
 101 |     // @ts-ignore
 102 |     if (document.fonts?.ready) {
 103 |       // @ts-ignore
 104 |       document.fonts.ready.then(() => {
 105 |         measure();
 106 |         setTimeout(measure, 50);
 107 |       });
 108 |     }
 109 |     measure();
 110 |     window.addEventListener("resize", measure);
 111 |     return () => window.removeEventListener("resize", measure);
 112 |   }, [players.player1.name, players.player2.name]);
 113 | 
 114 |   const t1 = splitForTheme(formatMillisDynamic(elapsed(1)));
 115 |   const t2 = splitForTheme(formatMillisDynamic(elapsed(2)));
 116 | 
 117 |   const p1Scroll = players.player1.name.length > 16;
 118 |   const p2Scroll = players.player2.name.length > 16;
 119 | 
 120 |   const s = (scale || 100) / 100;
 121 | 
 122 |   // ---- NEW: état d’alerte sur le timer actif (approche/dépassement) ----
 123 |   const DIFF20 = 20000; // 20s -> orange
 124 |   const DIFF10 = 10000; // 10s -> rouge clair clignotant
 125 | 
 126 |  const warnClass = (() => {
 127 |     const isRunning = status[active] === "running";
 128 |     if (!isRunning) return "";
 129 |     const other = active === 1 ? 2 : 1;
 130 |     
 131 |     const otherMs = elapsed(other);
 132 |     if (otherMs <= 0) return "";
 133 | 
 134 |     const deltaToLoose = otherMs - elapsed(active); // temps restant avant de rattraper l'autre
 135 |     if (deltaToLoose <= 0) return "loose";
 136 |     if (deltaToLoose <= DIFF10) return "warn10";
 137 |     if (deltaToLoose <= DIFF20) return "warn20";
 138 |     return "";
 139 |   })();
 140 |   // ----------------------------------------------------------------------
 141 | 
 142 |   return (
 143 |     // wrapper extérieur = dimension exacte *après* zoom → pas de scroll
 144 |     <div
 145 |       className="pointer-events-none select-none"
 146 |       style={{
 147 |         width: Math.round(520 * s),
 148 |         height: Math.round((120 + (locked ? 0 : 30)) * s),
 149 |         overflow: "hidden",
 150 |       }}
 151 |     >
 152 |       {/* Drag handle (visible quand unlock) */}
 153 |       <div className={`drag-handle ${locked ? "" : "visible"}`}>Drag to move</div>
 154 | 
 155 |       {/* Coins carrés: pas de rounded ni border */}
 156 |       {/* Zoom par transform sur le contenu interne */}
 157 |       <div
 158 |         style={{
 159 |           transform: `scale(${s})`,
 160 |           transformOrigin: "top left",
 161 |           width: 520,
 162 |           height: 120,
 163 |         }}
 164 |       >
 165 |         <div className="timer-overlay" id="timerContainer">
 166 |           {/* Noms + score */}
 167 |             <div className="name left">
 168 |               <ScrollingName
 169 |                 text={players.player1.name || "PLAYER 1"}
 170 |                 className="player-name scrolling-name--hover"
 171 |               />
 172 |             </div>
 173 | 
 174 |             <div className="score-value">
 175 |               {players.player1.score} – {players.player2.score}
 176 |             </div>
 177 | 
 178 |             <div className="name right">
 179 |               <ScrollingName
 180 |                 text={players.player2.name || "PLAYER 2"}
 181 |                 className="player-name scrolling-name--hover"
 182 |               />
 183 |             </div>
 184 | 
 185 |           {/* Timers */}
 186 |           <div
 187 |             className={`timer left ${active === 1 ? "active" : ""} ${active === 1 ? warnClass : ""}`}
 188 |             aria-label={status[1]}
 189 |           >
 190 |             <span className="timer-text dbd-digits">
 191 |               {t1.map((c, i) => (
 192 |                 <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
 193 |                   {c.ch}
 194 |                 </span>
 195 |               ))}
 196 |             </span>
 197 |           </div>
 198 |           <div
 199 |             className={`timer right ${active === 2 ? "active" : ""} ${active === 2 ? warnClass : ""}`}
 200 |             aria-label={status[2]}
 201 |           >
 202 |             <span className="timer-text dbd-digits">
 203 |               {t2.map((c, i) => (
 204 |                 <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
 205 |                   {c.ch}
 206 |                 </span>
 207 |               ))}
 208 |             </span>
 209 |           </div>
 210 |         </div>
 211 |       </div>
 212 |     </div>
 213 |   );
 214 | }

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
   3 |   /* fondu latéral pour une coupe propre du texte (appliqué sur la piste, pas sur le fond) */
   4 |   --edge-fade: 10px;
   5 | }
   6 | 
   7 | .timer-overlay {
   8 |   display: grid;
   9 |   grid-template-columns: minmax(160px, 1fr) auto minmax(160px, 1fr);
  10 |   grid-template-rows: 50px 1fr;
  11 |   width: 520px;
  12 |   height: 120px;
  13 |   position: relative;
  14 | }
  15 | 
  16 | .drag-handle {
  17 |   position: absolute; top: 0; left: 0; right: 0; height: 30px;
  18 |   background: linear-gradient(90deg, rgba(181,121,255,0.15) 0%, rgba(181,121,255,0.25) 50%, rgba(181,121,255,0.15) 100%);
  19 |   border-bottom: 2px solid rgba(181,121,255,0.4);
  20 |   box-shadow: 0 2px 10px rgba(181,121,255,0.3);
  21 |   display: none; align-items: center; justify-content: center;
  22 |   cursor: move; -webkit-app-region: drag;
  23 |   font-size: 0.85rem; color: #B579FF; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  24 |   z-index: 1000;
  25 | }
  26 | .drag-handle.visible { display: flex; }
  27 | 
  28 | .name { padding: 0 15px; }
  29 | 
  30 | .name, .score-value {
  31 |   border-bottom: 1px solid rgba(255,255,255,0.32);
  32 |   background: linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%);
  33 |   display: flex; align-items: center; justify-content: center;
  34 |   font-family: "Poppins", system-ui, sans-serif;
  35 |   font-size: 22px; font-weight: 500; color: #FFF;
  36 |   position: relative; overflow: hidden;
  37 | }
  38 | .name.left {
  39 |   grid-row: 1; grid-column: 1; font-size: 24px; text-transform: uppercase;
  40 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
  41 | }
  42 | .score-value {
  43 |   grid-row: 1; grid-column: 2; font-size: 24px; text-transform: uppercase;
  44 |   background: linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%);
  45 |   padding: 0 15px; min-width: 90px; max-width: 120px;
  46 | }
  47 | .name.right {
  48 |   grid-row: 1; grid-column: 3; font-size: 24px; text-transform: uppercase;
  49 |   text-shadow: 0 0 6px rgba(255,255,255,0.50);
  50 | }
  51 | 
  52 | .scrolling-name{
  53 |   /* clé pour que l'enfant occupe la largeur du slot .name */
  54 |   flex: 1 1 auto;
  55 |   min-width: 0;
  56 |   display: flex;
  57 |   align-items: center;
  58 |   justify-content: center;
  59 |   width: 100%;
  60 |   height: 100%;
  61 |   overflow: hidden;
  62 |   position: relative;
  63 | }
  64 | 
  65 | .name.right .scrolling-name {
  66 |   justify-content: flex-end;
  67 | }
  68 | 
  69 | /* texte réel à déplacer */
  70 | .scrolling-name__inner{
  71 |   display: inline-block;
  72 |   white-space: nowrap;
  73 |   will-change: transform;
  74 |   transform: translateX(0);            /* position de base */
  75 | }
  76 | 
  77 | /* active le ping-pong seulement si nécessaire */
  78 | .scrolling-name__inner.is-scrolling{
  79 |   animation: name-pingpong var(--duration, 8s) ease-in-out infinite alternate;
  80 | }
  81 | 
  82 | /* ping-pong : 0 -> -shift -> 0 -> -shift ... */
  83 | @keyframes name-pingpong{
  84 |   0%   { transform: translateX(0); }
  85 |   100% { transform: translateX(calc(var(--shift, 0px) * -1)); }
  86 | }
  87 | 
  88 | /* .name.ticker-ltr { justify-content: flex-start; padding: 0 15px; } */
  89 | 
  90 | .timer {
  91 |   display: flex; align-items: center; justify-content: center;
  92 |   font-family: "Squarefont","Consolas","Monaco","Courier New",monospace;
  93 |   font-size: 32px; font-weight: 400;
  94 |   text-shadow: 0 0 6px rgba(190,190,190,0.50);
  95 |   position: relative; height: 100%; text-align: center; min-width: 160px;
  96 | }
  97 | .timer.left { grid-row: 2; grid-column: 1; }
  98 | .timer.right { grid-row: 2; grid-column: 3; }
  99 | 
 100 | .timer-text {
 101 |   display: inline-flex; align-items: center;
 102 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 103 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 104 | }
 105 | .timer-char {
 106 |   display: inline-block; width: 22px; text-align: center;
 107 |   background: linear-gradient(180deg, #FFF 0%, #FFF 100%);
 108 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 109 | }
 110 | .timer-char.separator { width: 11px; }
 111 | 
 112 | .timer.active::before {
 113 |   content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
 114 |   background: linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%);
 115 |   animation: pulseBar 1s ease-in-out infinite;
 116 | }
 117 | @keyframes pulseBar { 0%,100%{opacity:.5} 50%{opacity:1} }
 118 | 
 119 | .dbd-digits { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; letter-spacing: 0.02em; }
 120 | 
 121 | /* ========= États d’alerte pour le timer actif ========= */
 122 | /* 20s avant loose → orange (fixe) */
 123 | .timer.warn20 .timer-text,
 124 | .timer.warn20 .timer-char {
 125 |   background: linear-gradient(180deg, #FFD27A 0%, #FFA726 100%);
 126 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 127 |   text-shadow: 0 0 18px rgba(255,167,38,0.35);
 128 | }
 129 | 
 130 | /* 10s avant loose → rouge clair + clignotement doux */
 131 | .timer.warn10 .timer-text,
 132 | .timer.warn10 .timer-char {
 133 |   background: linear-gradient(180deg, #FF8A80 0%, #FF5252 100%);
 134 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 135 |   text-shadow: 0 0 18px rgba(255,82,82,0.35);
 136 |   animation: timerBlink 0.8s steps(1,end) infinite;
 137 | }
 138 | @keyframes timerBlink {
 139 |   50% { opacity: .45; }
 140 | }
 141 | 
 142 | /* Loose condition dépassée → rouge (fixe) */
 143 | .timer.loose .timer-text,
 144 | .timer.loose .timer-char {
 145 |   background: linear-gradient(180deg, #FF6B6B 0%, #FF4141 100%);
 146 |   -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
 147 |   text-shadow: 0 0 20px rgba(255,65,65,0.35);
 148 | }

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