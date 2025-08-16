Project Path: dbdoverlaytools-free

Source Tree:

```txt
dbdoverlaytools-free
├── README.md
├── build
├── electron
│   ├── input
│   │   └── gamepad-exe.cjs
│   ├── main.mjs
│   ├── preload.cjs
│   └── tsconfig.json
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
  10 | const { existsSync, readFileSync, mkdirSync, writeFileSync, watch } = require("fs");
  11 | 
  12 | let child = null;
  13 | let isQuitting = false;
  14 | let relaunchTimer = null;
  15 | 
  16 | const ACTION_THROTTLE_MS = 200;
  17 | const lastActionAt = { toggle: 0, swap: 0 };
  18 | 
  19 | // --- Résolution du chemin du binaire natif (dev/prod)
  20 | function resolveExePath() {
  21 |   // dev: ../.. depuis electron/input -> native/xinput_bridge.exe
  22 |   const devPath = join(__dirname, "..", "..", "native", "xinput_bridge.exe");
  23 | 
  24 |   // prod: l’exe peut être à la racine de resources (package.json -> extraResources to ".")
  25 |   // ou parfois dans resources/native
  26 |   const res = process.resourcesPath || __dirname;
  27 |   const prodA = join(res, "xinput_bridge.exe");
  28 |   const prodB = join(res, "native", "xinput_bridge.exe");
  29 | 
  30 |   if (existsSync(devPath)) return devPath;
  31 |   if (existsSync(prodA)) return prodA;
  32 |   if (existsSync(prodB)) return prodB;
  33 |   return devPath; // fallback (échec volontairement visible)
  34 | }
  35 | 
  36 | // --- Diffusion vers toutes les fenêtres — envoie { type: ... }
  37 | function broadcastHotkey(action) {
  38 |   const now = Date.now();
  39 |   if (action === "toggle" || action === "swap") {
  40 |     if (now - lastActionAt[action] < ACTION_THROTTLE_MS) return;
  41 |     lastActionAt[action] = now;
  42 |   }
  43 |   for (const win of BrowserWindow.getAllWindows()) {
  44 |     try {
  45 |       win.webContents.send("global-hotkey", { type: action });
  46 |     } catch {}
  47 |   }
  48 | }
  49 | 
  50 | // --- Mappage configurable ----------------------------------------------------
  51 | const DEFAULT_MAPPING = {
  52 |   toggle: ["BTN A"], // A / Croix
  53 |   swap: ["BTN RB"],  // RB / R1
  54 | };
  55 | 
  56 | function configFilePath() {
  57 |   return join(app.getPath("userData"), "gamepad.json");
  58 | }
  59 | 
  60 | let mapping = { ...DEFAULT_MAPPING };
  61 | 
  62 | function normalizeEventName(s) {
  63 |   return String(s || "").trim().toUpperCase();
  64 | }
  65 | 
  66 | function loadMapping() {
  67 |   try {
  68 |     const file = configFilePath();
  69 |     if (!existsSync(dirname(file))) mkdirSync(dirname(file), { recursive: true });
  70 |     if (!existsSync(file)) {
  71 |       writeFileSync(file, JSON.stringify(DEFAULT_MAPPING, null, 2), "utf8");
  72 |       mapping = { ...DEFAULT_MAPPING };
  73 |       return;
  74 |     }
  75 |     const raw = readFileSync(file, "utf8");
  76 |     const json = JSON.parse(raw);
  77 | 
  78 |     const out = { toggle: [], swap: [] };
  79 |     for (const key of ["toggle", "swap"]) {
  80 |       const val = json[key];
  81 |       if (typeof val === "string") out[key] = [normalizeEventName(val)];
  82 |       else if (Array.isArray(val)) out[key] = val.map(normalizeEventName).filter(Boolean);
  83 |     }
  84 |     if (!out.toggle.length) out.toggle = DEFAULT_MAPPING.toggle.map(normalizeEventName);
  85 |     if (!out.swap.length) out.swap = DEFAULT_MAPPING.swap.map(normalizeEventName);
  86 | 
  87 |     mapping = out;
  88 |   } catch (e) {
  89 |     console.error("[GAMEPAD] loadMapping error", e?.message || e);
  90 |     mapping = { ...DEFAULT_MAPPING };
  91 |   }
  92 | }
  93 | 
  94 | function saveMapping(next) {
  95 |   try {
  96 |     const file = configFilePath();
  97 |     writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
  98 |   } catch (e) {
  99 |     console.error("[GAMEPAD] saveMapping error", e?.message || e);
 100 |   }
 101 | }
 102 | 
 103 | function setGamepadMapping(action, eventLabel, { append = false } = {}) {
 104 |   const key = action === "swap" ? "swap" : "toggle";
 105 |   const label = normalizeEventName(eventLabel);
 106 |   const next = { ...mapping };
 107 |   if (append) next[key] = Array.from(new Set([...(next[key] || []), label]));
 108 |   else next[key] = [label];
 109 |   saveMapping(next);
 110 |   mapping = next;
 111 | }
 112 | 
 113 | // --- Flux brut pour la capture ------------------------------------------------
 114 | const rawListeners = new Set();
 115 | function onGamepadRaw(cb) {
 116 |   if (typeof cb === "function") {
 117 |     rawListeners.add(cb);
 118 |     return () => rawListeners.delete(cb);
 119 |   }
 120 |   return () => {};
 121 | }
 122 | function emitRaw(ev) { for (const cb of rawListeners) { try { cb(ev); } catch {} } }
 123 | 
 124 | // --- Process natif -----------------------------------------------------------
 125 | function handleGamepadEventName(name) {
 126 |   const ev = normalizeEventName(name);
 127 |   if (!ev) return;
 128 | 
 129 |   // Toujours notifier le brut (capture)
 130 |   emitRaw(ev);
 131 | 
 132 |   // Déclenchement selon mapping
 133 |   if ((mapping.toggle || []).includes(ev)) { broadcastHotkey("toggle"); return; }
 134 |   if ((mapping.swap || []).includes(ev))   { broadcastHotkey("swap"); return; }
 135 | }
 136 | 
 137 | function launch() {
 138 |   const exe = resolveExePath();
 139 |   if (!existsSync(exe)) return;
 140 | 
 141 |   child = spawn(exe, [], { stdio: ["ignore", "pipe", "ignore"], windowsHide: true });
 142 | 
 143 |   let buffer = "";
 144 |   child.stdout.on("data", (chunk) => {
 145 |     buffer += chunk.toString("utf8");
 146 |     let idx;
 147 |     while ((idx = buffer.indexOf("\n")) >= 0) {
 148 |       const line = buffer.slice(0, idx).trim();
 149 |       buffer = buffer.slice(idx + 1);
 150 |       if (line) handleGamepadEventName(line);
 151 |     }
 152 |   });
 153 | 
 154 |   child.on("exit", () => {
 155 |     child = null;
 156 |     if (isQuitting) return;
 157 |     clearTimeout(relaunchTimer);
 158 |     relaunchTimer = setTimeout(launch, 1000);
 159 |   });
 160 | 
 161 |   child.on("error", () => {
 162 |     child = null;
 163 |     if (isQuitting) return;
 164 |     clearTimeout(relaunchTimer);
 165 |     relaunchTimer = setTimeout(launch, 1500);
 166 |   });
 167 | }
 168 | 
 169 | function setupGamepadExe() {
 170 |   if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où
 171 | 
 172 |   loadMapping();
 173 |   try { watch(configFilePath(), { persistent: false }, () => loadMapping()); } catch {}
 174 | 
 175 |   launch();
 176 | 
 177 |   app.on("before-quit", () => {
 178 |     isQuitting = true;
 179 |     try { clearTimeout(relaunchTimer); } catch {}
 180 |     try { child?.kill(); } catch {}
 181 |   });
 182 |   app.on("will-quit", () => {
 183 |     isQuitting = true;
 184 |     try { clearTimeout(relaunchTimer); } catch {}
 185 |     try { child?.kill(); } catch {}
 186 |   });
 187 | }
 188 | 
 189 | module.exports = {
 190 |   setupGamepadExe,
 191 |   onGamepadRaw,
 192 |   setGamepadMapping,
 193 | };

```

`dbdoverlaytools-free/electron\main.mjs`:

```mjs
   1 | import {
   2 |   app,
   3 |   BrowserWindow,
   4 |   ipcMain,
   5 |   screen,
   6 |   globalShortcut,
   7 |   shell,
   8 |   Menu,
   9 |   dialog,
  10 | } from "electron";
  11 | import { join, dirname } from "node:path";
  12 | import { fileURLToPath } from "node:url";
  13 | import Store from "electron-store";
  14 | import { createRequire } from "node:module";
  15 | import fs from "node:fs";
  16 | 
  17 | const require = createRequire(import.meta.url);
  18 | 
  19 | const {
  20 |   setupGamepadExe,
  21 |   onGamepadRaw,
  22 |   setGamepadMapping,
  23 | } = require("./input/gamepad-exe.cjs");
  24 | 
  25 | /** Charge .env/.env.development UNIQUEMENT en dev, si "dotenv" est présent. */
  26 | (function loadDevEnv() {
  27 |   if (app.isPackaged) return; // en prod: ne rien charger
  28 |   let dotenv;
  29 |   try {
  30 |     dotenv = require("dotenv");
  31 |   } catch {
  32 |     // optional require
  33 |     return;
  34 |   } // pas installé → on ignore
  35 |   const root = process.cwd();
  36 |   for (const name of [".env", ".env.development"]) {
  37 |     const p = join(root, name);
  38 |     if (fs.existsSync(p)) dotenv.config({ path: p, override: true });
  39 |   }
  40 | })();
  41 | 
  42 | /* -------------------- flags via .env -------------------- */
  43 | const FORCE_NO_UIOHOOK = process.env.FORCE_NO_UIOHOOK === "1";
  44 | const FORCE_NO_VCREDIST = process.env.FORCE_NO_VCREDIST === "1";
  45 | const DEBUG_HK = process.env.DEBUG_HK === "1";
  46 | 
  47 | let uIOhook = null;
  48 | const __dirname = dirname(fileURLToPath(import.meta.url));
  49 | const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
  50 | 
  51 | if (process.platform === "win32") {
  52 |   app.setAppUserModelId("com.steaxs.dbdtimer.free");
  53 | }
  54 | 
  55 | const iconPath = isDev
  56 |   ? join(__dirname, "../build/icon.ico")
  57 |   : join(process.resourcesPath, "icon.ico");
  58 | 
  59 | const store = new Store();
  60 | 
  61 | let mainWindow = null;
  62 | let overlayWindow = null;
  63 | let usingUiohook = false;
  64 | 
  65 | // dimensions non-scalées du contenu (hors drag bar)
  66 | let baseDims = { width: 520, height: 120 };
  67 | 
  68 | // hotkeys: codes (uiohook) + labels (affichage & fallback)
  69 | let hotkeys = store.get("hotkeys") || { start: null, swap: null };
  70 | let hotkeysLabel = store.get("hotkeysLabel") || { start: "F1", swap: "F2" };
  71 | 
  72 | // état de capture transactionnelle
  73 | let captureState = null; // { type:'start'|'swap', label:null|string, code:null|number, primaryTimer:any, secondaryTimer:any }
  74 | let captureWaitUntil = 0; // time (ms) jusqu’auquel on ne dispatch pas aux timers
  75 | 
  76 | let offGamepadRaw = null;
  77 | 
  78 | // ===== debug =====
  79 | const logHK = (...args) => {
  80 |   if (DEBUG_HK) console.log("[HK]", ...args);
  81 | };
  82 | 
  83 | // ===== config aide uIOhook (Windows) =====
  84 | const VC_REDIST_X64_URL = "https://aka.ms/vs/17/release/vc_redist.x64.exe";
  85 | 
  86 | // Détection simple du VC++ 2015–2022 (x64) via DLLs clés
  87 | function hasVCRedist() {
  88 |   if (FORCE_NO_VCREDIST) return false; // simulation via .env
  89 |   if (process.platform !== "win32") return true;
  90 |   const win = process.env.windir || "C:\\Windows";
  91 |   const sys32 = join(win, "System32");
  92 |   const dlls = ["vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll"];
  93 |   try {
  94 |     return dlls.every((d) => fs.existsSync(join(sys32, d)));
  95 |   } catch {
  96 |     return false;
  97 |   }
  98 | }
  99 | 
 100 | /* -------------------- dedup dispatch (fix double toggle/reset) -------------------- */
 101 | const DEDUP_RATE = 220; // ms
 102 | let lastToggleMs = 0;
 103 | let lastSwapMs = 0;
 104 | 
 105 | function dispatchHotkey(type) {
 106 |   const now = Date.now();
 107 |   if (type === "toggle") {
 108 |     if (now - lastToggleMs < DEDUP_RATE) return;
 109 |     lastToggleMs = now;
 110 |     overlayWindow?.webContents.send("global-hotkey", { type: "toggle" });
 111 |     logHK("DISPATCH toggle (dedup)");
 112 |   } else if (type === "swap") {
 113 |     if (now - lastSwapMs < DEDUP_RATE) return;
 114 |     lastSwapMs = now;
 115 |     overlayWindow?.webContents.send("global-hotkey", { type: "swap" });
 116 |     logHK("DISPATCH swap (dedup)");
 117 |   }
 118 | }
 119 | 
 120 | /* -------------------- utils -------------------- */
 121 | function isAlphaNumLabel(k) {
 122 |   return typeof k === "string" && /^[A-Z0-9]$/.test(k);
 123 | }
 124 | 
 125 | function applyAlwaysOnTop(win, on) {
 126 |   try {
 127 |     win.setAlwaysOnTop(!!on, "screen-saver");
 128 |     win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
 129 |     win.setFullScreenable(false);
 130 |   } catch {}
 131 | }
 132 | 
 133 | function sendOverlaySettings() {
 134 |   if (overlayWindow && !overlayWindow.isDestroyed()) {
 135 |     const s = store.get("overlaySettings", {
 136 |       x: 0,
 137 |       y: 0,
 138 |       scale: 100,
 139 |       locked: true,
 140 |       alwaysOnTop: true,
 141 |     });
 142 |     overlayWindow.webContents.send("overlay-settings", s);
 143 |   }
 144 | }
 145 | 
 146 | function recomputeOverlaySize() {
 147 |   if (!overlayWindow || overlayWindow.isDestroyed()) return;
 148 |   const s = store.get("overlaySettings", { scale: 100, locked: true });
 149 |   const dragH = s.locked ? 0 : 30;
 150 |   const scale = (s.scale || 100) / 100;
 151 |   const w = Math.ceil(baseDims.width * scale);
 152 |   const h = Math.ceil((baseDims.height + dragH) * scale);
 153 |   overlayWindow.setContentSize(w, h);
 154 |   sendOverlaySettings();
 155 | }
 156 | 
 157 | function sendHotkeysMode() {
 158 |   if (mainWindow && !mainWindow.isDestroyed()) {
 159 |     mainWindow.webContents.send(
 160 |       "hotkeys-mode",
 161 |       usingUiohook ? "pass-through" : "fallback"
 162 |     );
 163 |   }
 164 | }
 165 | 
 166 | function makeLabelFromBeforeInput(input) {
 167 |   let k = input.key || "";
 168 |   if (/^F\d{1,2}$/.test(k)) return k;
 169 |   if (/^[a-z]$/.test(k)) return k.toUpperCase();
 170 |   if (/^\d$/.test(k)) return k;
 171 |   if (k === " ") return "SPACE";
 172 |   const map = {
 173 |     Escape: "ESC",
 174 |     Tab: "TAB",
 175 |     Enter: "ENTER",
 176 |     Backspace: "BACKSPACE",
 177 |     Shift: "SHIFT",
 178 |     Control: "CTRL",
 179 |     Alt: "ALT",
 180 |     Meta: "META",
 181 |     ArrowUp: "UP",
 182 |     ArrowDown: "DOWN",
 183 |     ArrowLeft: "LEFT",
 184 |     ArrowRight: "RIGHT",
 185 |   };
 186 |   if (map[k]) return k;
 187 |   const code = input.code || "";
 188 |   if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
 189 |   if (/^Digit\d$/.test(code)) return code.slice(5);
 190 |   return k && k.length <= 6 ? k.toUpperCase() : code || "KEY";
 191 | }
 192 | 
 193 | function clearCaptureTimers() {
 194 |   if (!captureState) return;
 195 |   if (captureState.primaryTimer) {
 196 |     clearTimeout(captureState.primaryTimer);
 197 |     captureState.primaryTimer = null;
 198 |   }
 199 |   if (captureState.secondaryTimer) {
 200 |     clearTimeout(captureState.secondaryTimer);
 201 |     captureState.secondaryTimer = null;
 202 |   }
 203 | }
 204 | 
 205 | function finalizeCapture(reason = "done") {
 206 |   if (!captureState) return;
 207 |   if (offGamepadRaw) { try { offGamepadRaw(); } catch {} offGamepadRaw = null; }
 208 | 
 209 |   const { type, label, code } = captureState;
 210 |   clearCaptureTimers();
 211 | 
 212 |   logHK("CAPTURE FINALIZE", { reason, type, label, code });
 213 | 
 214 |   // Persistance si on a reçu des infos
 215 |   if (label) {
 216 |     hotkeysLabel = { ...hotkeysLabel, [type]: label };
 217 |     store.set("hotkeysLabel", hotkeysLabel);
 218 |   }
 219 |   if (typeof code === "number") {
 220 |     hotkeys = { ...hotkeys, [type]: code };
 221 |     store.set("hotkeys", hotkeys);
 222 |   }
 223 | 
 224 |   // Notifie le panel uniquement si on a reçu label ou code
 225 |   if (
 226 |     mainWindow &&
 227 |     !mainWindow.isDestroyed() &&
 228 |     (label || typeof code === "number")
 229 |   ) {
 230 |     const payload = { type };
 231 |     if (label) payload.label = label;
 232 |     if (typeof code === "number") payload.keycode = code;
 233 |     mainWindow.webContents.send("hotkeys-captured", payload);
 234 |   }
 235 | 
 236 |   // Alerte uniquement si VC++ manquant ET alphanum tenté sans uIOhook
 237 |   if (!usingUiohook && label && isAlphaNumLabel(label) && !hasVCRedist()) {
 238 |     dialog
 239 |       .showMessageBox({
 240 |         type: "info",
 241 |         title: "Pass-Through unavailable",
 242 |         message:
 243 |           "A–Z / 0–9 hotkeys can’t be used in Limited Mode (without uIOhook) without stealing them from other apps.",
 244 |         detail:
 245 |           "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”, restart the app, " +
 246 |           "then recapture your hotkeys to enable pass-through (so you can still type those letters in Discord, etc.).",
 247 |         buttons: ["Install runtime (x64)", "OK"],
 248 |         defaultId: 0,
 249 |         cancelId: 1,
 250 |         noLink: true,
 251 |       })
 252 |       .then(({ response }) => {
 253 |         if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
 254 |       });
 255 |   }
 256 | 
 257 |   // Si, après cette capture, on a les 2 codes et uIOhook tourne -> passer en pass-through
 258 |   const haveBoth =
 259 |     Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);
 260 |   if (uIOhook && haveBoth && !usingUiohook) {
 261 |     usingUiohook = true;
 262 |     try {
 263 |       globalShortcut.unregisterAll();
 264 |     } catch {}
 265 |     sendHotkeysMode();
 266 |   }
 267 | 
 268 |   // Reset capture
 269 |   captureState = null;
 270 |   captureWaitUntil = 0;
 271 | 
 272 |   // Réarmer fallback si nécessaire
 273 |   if (!usingUiohook) refreshHotkeyEngine();
 274 | }
 275 | 
 276 | /** Force l’ouverture des liens http(s) dans le navigateur par défaut et bloque toute navigation sortante dans l’app */
 277 | function enforceExternalLinks(win) {
 278 |   if (!win || win.isDestroyed()) return;
 279 | 
 280 |   // window.open / target=_blank
 281 |   win.webContents.setWindowOpenHandler(({ url }) => {
 282 |     if (/^https?:\/\//i.test(url)) {
 283 |       shell.openExternal(url);
 284 |       return { action: "deny" };
 285 |     }
 286 |     return { action: "deny" };
 287 |   });
 288 | 
 289 |   // Drag’n’drop/lien cliqué qui tenterait une navigation
 290 |   win.webContents.on("will-navigate", (e, url) => {
 291 |     const isLocal =
 292 |       url.startsWith("file:") || url.startsWith("http://localhost");
 293 |     if (!isLocal && /^https?:\/\//i.test(url)) {
 294 |       e.preventDefault();
 295 |       shell.openExternal(url);
 296 |     }
 297 |   });
 298 | 
 299 |   // Pas de menu « Inspecter » en prod
 300 |   if (!isDev) win.webContents.on("context-menu", (e) => e.preventDefault());
 301 | }
 302 | 
 303 | /* -------------------- windows -------------------- */
 304 | function createMainWindow() {
 305 |   const saved = store.get("windowState") || {};
 306 |   const width = Math.max(saved.width || 1120, 980);
 307 |   const height = Math.max(saved.height || 820, 720);
 308 | 
 309 |   mainWindow = new BrowserWindow({
 310 |     width,
 311 |     height,
 312 |     x: saved.x,
 313 |     y: saved.y,
 314 |     minWidth: 980,
 315 |     minHeight: 720,
 316 |     show: false,
 317 |     icon: iconPath,
 318 |     autoHideMenuBar: true,
 319 |     webPreferences: {
 320 |       nodeIntegration: false,
 321 |       contextIsolation: true,
 322 |       preload: join(__dirname, "preload.cjs"),
 323 |       devTools: isDev,
 324 |     },
 325 |   });
 326 | 
 327 |   Menu.setApplicationMenu(null);
 328 |   mainWindow.setMenuBarVisibility(false);
 329 |   mainWindow.webContents.on("before-input-event", (event, input) => {
 330 |     if (
 331 |       input.type === "keyDown" &&
 332 |       (input.key === "Alt" ||
 333 |         input.code === "AltLeft" ||
 334 |         input.code === "AltRight")
 335 |     ) {
 336 |       event.preventDefault();
 337 |     }
 338 |   });
 339 | 
 340 |   if (isDev) {
 341 |     mainWindow.loadURL("http://localhost:5173");
 342 |     mainWindow.webContents.openDevTools({ mode: "detach" });
 343 |   } else {
 344 |     mainWindow.loadFile(join(__dirname, "../dist/index.html"));
 345 |     // Bloque F12 / Ctrl+Shift+I en prod (existant côté panel)
 346 |     mainWindow.webContents.on("before-input-event", (e, input) => {
 347 |       const combo =
 348 |         (input.control || input.meta) &&
 349 |         input.shift &&
 350 |         input.key?.toLowerCase() === "i";
 351 |       if (combo || input.key === "F12") e.preventDefault();
 352 |     });
 353 |   }
 354 | 
 355 |   mainWindow.once("ready-to-show", () => mainWindow.show());
 356 |   mainWindow.on("close", () => {
 357 |     const b = mainWindow.getBounds();
 358 |     store.set("windowState", b);
 359 |   });
 360 |   mainWindow.on("closed", () => {
 361 |     mainWindow = null;
 362 |     if (overlayWindow) overlayWindow.close();
 363 |   });
 364 | }
 365 | 
 366 | function createOverlayWindow() {
 367 |   if (overlayWindow && !overlayWindow.isDestroyed()) {
 368 |     overlayWindow.show();
 369 |     overlayWindow.focus();
 370 |     return;
 371 |   }
 372 | 
 373 |   // --- INIT ROBUSTE ---
 374 |   let s = store.get("overlaySettings") || {};
 375 |   const pd = screen.getPrimaryDisplay();
 376 |   const origin = pd.bounds; // coin strict de l’écran principal
 377 | 
 378 |   if (!Number.isFinite(s.x)) s.x = origin.x;
 379 |   if (!Number.isFinite(s.y)) s.y = origin.y;
 380 |   if (typeof s.scale !== "number") s.scale = 100;
 381 |   if (typeof s.locked !== "boolean") s.locked = true;
 382 |   if (typeof s.alwaysOnTop !== "boolean") s.alwaysOnTop = true;
 383 |   store.set("overlaySettings", s);
 384 |   // --- FIN INIT ROBUSTE
 385 | 
 386 |   const dragH = s.locked ? 0 : 30;
 387 |   const scale = (s.scale || 100) / 100;
 388 | 
 389 |   overlayWindow = new BrowserWindow({
 390 |     width: Math.ceil(baseDims.width * scale),
 391 |     height: Math.ceil((baseDims.height + dragH) * scale),
 392 |     x: s.x,
 393 |     y: s.y,
 394 |     frame: false,
 395 |     transparent: true,
 396 |     resizable: false,
 397 |     hasShadow: false,
 398 |     skipTaskbar: false,
 399 |     focusable: true,
 400 |     title: "DBD Timer Overlay by Doc & Steaxs",
 401 |     acceptFirstMouse: true,
 402 |     backgroundColor: "#00000000",
 403 |     useContentSize: true,
 404 |     show: false, // évite tout flash avant réception des settings
 405 |     webPreferences: {
 406 |       nodeIntegration: false,
 407 |       contextIsolation: true,
 408 |       preload: join(__dirname, "preload.cjs"),
 409 |       backgroundThrottling: false,
 410 |       devTools: isDev,
 411 |     },
 412 |   });
 413 | 
 414 |   overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true });
 415 |   applyAlwaysOnTop(overlayWindow, s.alwaysOnTop);
 416 | 
 417 |   const url = isDev
 418 |     ? "http://localhost:5173/overlay.html"
 419 |     : join(__dirname, "../dist/overlay.html");
 420 |   if (isDev) overlayWindow.loadURL(url);
 421 |   else overlayWindow.loadFile(url);
 422 | 
 423 |   enforceExternalLinks(overlayWindow);
 424 | 
 425 |   if (!isDev) {
 426 |     overlayWindow.webContents.on("before-input-event", (e, input) => {
 427 |       const combo =
 428 |         (input.control || input.meta) &&
 429 |         input.shift &&
 430 |         input.key?.toLowerCase() === "i";
 431 |       if (combo || input.key === "F12") e.preventDefault();
 432 |     });
 433 |   }
 434 | 
 435 |   overlayWindow.on("closed", () => {
 436 |     overlayWindow = null;
 437 |     if (mainWindow && !mainWindow.isDestroyed())
 438 |       mainWindow.webContents.send("overlay-ready", false);
 439 |   });
 440 |   overlayWindow.on("move", () => {
 441 |     const b = overlayWindow.getBounds();
 442 |     store.set("overlaySettings.x", b.x);
 443 |     store.set("overlaySettings.y", b.y);
 444 |   });
 445 | 
 446 |   overlayWindow.webContents.on("did-finish-load", () => {
 447 |     const data = store.get("timerData") || {
 448 |       player1: { name: "Player 1", score: 0 },
 449 |       player2: { name: "Player 2", score: 0 },
 450 |     };
 451 |     overlayWindow.webContents.send("timer-data-sync", data);
 452 | 
 453 |     sendOverlaySettings(); // avant affichage
 454 |     recomputeOverlaySize();
 455 | 
 456 |     if (mainWindow) mainWindow.webContents.send("overlay-ready", true);
 457 |     overlayWindow.show();
 458 |   });
 459 | }
 460 | 
 461 | /* -------------------- IPC -------------------- */
 462 | function setupIPC() {
 463 |   ipcMain.handle("overlay-show", () => {
 464 |     createOverlayWindow();
 465 |     return true;
 466 |   });
 467 |   ipcMain.handle("overlay-hide", () => {
 468 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close();
 469 |     overlayWindow = null;
 470 |     if (mainWindow && !mainWindow.isDestroyed())
 471 |       mainWindow.webContents.send("overlay-ready", false);
 472 |     return true;
 473 |   });
 474 | 
 475 |   ipcMain.handle("overlay-settings-update", (_evt, settings) => {
 476 |     const current = store.get("overlaySettings", {});
 477 |     const next = { ...current, ...settings };
 478 |     store.set("overlaySettings", next);
 479 |     if (!overlayWindow || overlayWindow.isDestroyed()) return true;
 480 | 
 481 |     if (settings.locked !== undefined) {
 482 |       overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true });
 483 |       overlayWindow.setFocusable(true); // OBS/Alt-Tab
 484 |     }
 485 |     if (settings.alwaysOnTop !== undefined)
 486 |       applyAlwaysOnTop(overlayWindow, next.alwaysOnTop);
 487 |     if (settings.x !== undefined || settings.y !== undefined) {
 488 |       const b = overlayWindow.getBounds();
 489 |       overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y);
 490 |     }
 491 |     if (settings.scale !== undefined || settings.locked !== undefined)
 492 |       recomputeOverlaySize();
 493 |     sendOverlaySettings();
 494 |     return true;
 495 |   });
 496 | 
 497 |   ipcMain.handle("overlay-measure", (_evt, dims) => {
 498 |     if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height))
 499 |       return false;
 500 |     baseDims = {
 501 |       width: Math.max(1, Math.floor(dims.width)),
 502 |       height: Math.max(1, Math.floor(dims.height)),
 503 |     };
 504 |     recomputeOverlaySize();
 505 |     return true;
 506 |   });
 507 | 
 508 |   // Timer data
 509 |   ipcMain.handle(
 510 |     "timer-data-get",
 511 |     () =>
 512 |       store.get("timerData") || {
 513 |         player1: { name: "Player 1", score: 0 },
 514 |         player2: { name: "Player 2", score: 0 },
 515 |       }
 516 |   );
 517 |   ipcMain.handle("timer-data-set", (_evt, data) => {
 518 |     store.set("timerData", data);
 519 |     if (overlayWindow && !overlayWindow.isDestroyed())
 520 |       overlayWindow.webContents.send("timer-data-sync", data);
 521 |     return true;
 522 |   });
 523 | 
 524 |   // Hotkeys API
 525 |   ipcMain.handle("hotkeys-get", () => ({
 526 |     start: hotkeys.start,
 527 |     swap: hotkeys.swap,
 528 |     startLabel: hotkeysLabel.start,
 529 |     swapLabel: hotkeysLabel.swap,
 530 |     mode: usingUiohook ? "pass-through" : "fallback",
 531 |   }));
 532 | 
 533 |   ipcMain.handle("hotkeys-set", (_evt, hk) => {
 534 |     hotkeys = { ...hotkeys, ...hk }; // codes uiohook si fournis
 535 |     store.set("hotkeys", hotkeys);
 536 |     const haveCodes =
 537 |       Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);
 538 | 
 539 |     if (haveCodes && uIOhook) {
 540 |       // on bascule en pass-through
 541 |       try {
 542 |         globalShortcut.unregisterAll();
 543 |       } catch {}
 544 |       usingUiohook = true;
 545 |       sendHotkeysMode();
 546 |     } else if (!haveCodes) {
 547 |       // rester / revenir en fallback labels (F1/F2) tant que les 2 codes ne sont pas prêts
 548 |       usingUiohook = false;
 549 |       refreshHotkeyEngine();
 550 |     }
 551 |     return true;
 552 |   });
 553 | 
 554 |   // 🚀 capture 100% main-process, transactionnelle
 555 |   ipcMain.handle("hotkeys-capture", (_evt, type) => {
 556 |     let offGamepadRaw = null;
 557 |     if (!(type === "start" || type === "swap")) {
 558 |       finalizeCapture("cancel");
 559 |       return true;
 560 |     }
 561 | 
 562 |     logHK("CAPTURE BEGIN", {
 563 |       type,
 564 |       mode: usingUiohook ? "pass-through" : "fallback",
 565 |     });
 566 | 
 567 |     // Bloquer le dispatch vers les timers pendant la capture (long pour te laisser le temps)
 568 |     captureWaitUntil = Date.now() + 15000;
 569 | 
 570 |     // Reset/annule capture précédente si elle existe
 571 |     if (captureState) {
 572 |       clearCaptureTimers();
 573 |       captureState = null;
 574 |     }
 575 | 
 576 |     // État de capture : pas de timer court au début; on attend la première frappe
 577 |     captureState = {
 578 |       type,
 579 |       label: null,
 580 |       code: null,
 581 |       primaryTimer: setTimeout(() => {
 582 |         logHK("CAPTURE PRIMARY TIMEOUT — cancel");
 583 |         finalizeCapture("primary-timeout");
 584 |       }, 15000),
 585 |       secondaryTimer: null,
 586 |     };
 587 | 
 588 |     // focus le panneau
 589 |     try {
 590 |       mainWindow?.focus();
 591 |       logHK("focused mainWindow?", mainWindow?.isFocused());
 592 |     } catch (e) {
 593 |       logHK("focus error", e?.message || e);
 594 |     }
 595 | 
 596 |     // en fallback, libérer les shortcuts pour laisser passer la frappe
 597 |     if (!usingUiohook) {
 598 |       try {
 599 |         globalShortcut.unregisterAll();
 600 |         logHK("fallback: unregistered to let key through");
 601 |       } catch {}
 602 |     }
 603 | 
 604 |     // écouter une fois la prochaine touche (pour le label layout-aware)
 605 |     const once = (event, input) => {
 606 |       if (!captureState) return;
 607 |       if (input.type !== "keyDown" || input.isAutoRepeat) return;
 608 |       logHK("before-input-event keyDown", { key: input.key, code: input.code });
 609 |       const label = makeLabelFromBeforeInput(input);
 610 | 
 611 |       captureState.label = label;
 612 |       hotkeysLabel = { ...hotkeysLabel, [type]: label };
 613 |       store.set("hotkeysLabel", hotkeysLabel);
 614 | 
 615 |       // notifie instantanément le panel (affichage immédiat)
 616 |       mainWindow?.webContents.send("hotkeys-captured", { type, label });
 617 |       logHK("label captured (instant)", { type, label });
 618 | 
 619 |       // Si le code est déjà là -> on finalise; sinon, petite fenêtre pour le laisser arriver
 620 |       if (typeof captureState.code === "number") {
 621 |         finalizeCapture("have both");
 622 |       } else {
 623 |         if (captureState.secondaryTimer)
 624 |           clearTimeout(captureState.secondaryTimer);
 625 |         captureState.secondaryTimer = setTimeout(
 626 |           () => finalizeCapture("after-label-wait"),
 627 |           500
 628 |         );
 629 |       }
 630 | 
 631 |       mainWindow?.webContents.removeListener("before-input-event", once);
 632 |     };
 633 |     mainWindow?.webContents.on("before-input-event", once);
 634 | 
 635 |     offGamepadRaw = onGamepadRaw((evLabel) => {
 636 |       if (!captureState) return;
 637 |       const { type } = captureState; // 'start' | 'swap'
 638 | 
 639 |       // 1) on met à jour le label (affichage immédiat dans le panneau)
 640 |       captureState.label = evLabel;
 641 |       hotkeysLabel = { ...hotkeysLabel, [type]: evLabel };
 642 |       store.set("hotkeysLabel", hotkeysLabel);
 643 |       mainWindow?.webContents.send("hotkeys-captured", {
 644 |         type,
 645 |         label: evLabel,
 646 |       });
 647 | 
 648 |       // 2) on écrit le mapping manette (remplace l’action par ce bouton)
 649 |       setGamepadMapping(type, evLabel, { append: false });
 650 | 
 651 |       // 3) on finalise
 652 |       finalizeCapture("gamepad");
 653 |     });
 654 | 
 655 |     logHK("before-input-event listener ARMED");
 656 | 
 657 |     return true;
 658 |   });
 659 | }
 660 | 
 661 | /* -------------------- Hotkeys engines -------------------- */
 662 | function refreshHotkeyEngine() {
 663 |   if (usingUiohook) {
 664 |     logHK("refreshHotkeyEngine: pass-through (no globalShortcut)");
 665 |     return;
 666 |   }
 667 |   try {
 668 |     globalShortcut.unregisterAll();
 669 |     logHK("globalShortcut: unregistered all");
 670 |   } catch {}
 671 |   const RATE = 180;
 672 |   let lastT = 0,
 673 |     lastS = 0;
 674 | 
 675 |   const sKey = hotkeysLabel.start || "F1";
 676 |   const wKey = hotkeysLabel.swap || "F2";
 677 | 
 678 |   // En fallback, on NE PREND PAS A–Z / 0–9 pour ne pas voler la frappe aux autres apps.
 679 |   const canUse = (label) => !isAlphaNumLabel(label);
 680 | 
 681 |   logHK("globalShortcut: registering (fallback)", {
 682 |     start: canUse(sKey) ? sKey : "(skipped: alnum passthrough-only)",
 683 |     swap: canUse(wKey) ? wKey : "(skipped: alnum passthrough-only)",
 684 |   });
 685 | 
 686 |   if (canUse(sKey)) {
 687 |     try {
 688 |       globalShortcut.register(sKey, () => {
 689 |         if (Date.now() < captureWaitUntil) {
 690 |           logHK("fallback toggle skipped (capturing)");
 691 |           return;
 692 |         }
 693 |         const now = Date.now();
 694 |         if (now - lastT < RATE) return;
 695 |         lastT = now;
 696 |         dispatchHotkey("toggle");
 697 |       });
 698 |     } catch (e) {
 699 |       logHK("register start failed", e?.message || e);
 700 |     }
 701 |   }
 702 | 
 703 |   if (canUse(wKey)) {
 704 |     try {
 705 |       globalShortcut.register(wKey, () => {
 706 |         if (Date.now() < captureWaitUntil) {
 707 |           logHK("fallback swap skipped (capturing)");
 708 |           return;
 709 |         }
 710 |         const now = Date.now();
 711 |         if (now - lastS < RATE) return;
 712 |         lastS = now;
 713 |         dispatchHotkey("swap");
 714 |       });
 715 |     } catch (e) {
 716 |       logHK("register swap failed", e?.message || e);
 717 |     }
 718 |   }
 719 | }
 720 | 
 721 | // uIOhook global (pass-through)
 722 | async function setupUiohook() {
 723 |   try {
 724 |     logHK("Trying to load uiohook-napi…");
 725 |     if (FORCE_NO_UIOHOOK) throw new Error("uIOhook forcibly disabled via .env");
 726 |     const lib = require("uiohook-napi");
 727 |     uIOhook = lib.uIOhook;
 728 |     logHK("uiohook loaded OK");
 729 |   } catch (e) {
 730 |     logHK("uiohook FAILED to load -> fallback", e?.message || e);
 731 | 
 732 |     const vcPresent = hasVCRedist();
 733 |     if (!vcPresent) {
 734 |       const { response } = await dialog.showMessageBox({
 735 |         type: "warning",
 736 |         title: "Pass-Through unavailable",
 737 |         message:
 738 |           "uIOhook couldn’t start because the Microsoft C++ runtime is missing.",
 739 |         detail:
 740 |           "Install the “Microsoft Visual C++ Redistributable 2015–2022 (x64)”. " +
 741 |           "It provides the system libraries (MSVCP140 / VCRUNTIME140) required to listen to A–Z / 0–9 without stealing them from other apps. " +
 742 |           "After installing, restart the app and recapture your hotkeys to enable pass-through.",
 743 |         buttons: ["Install runtime (x64)", "Continue in limited mode"],
 744 |         defaultId: 0,
 745 |         cancelId: 1,
 746 |         noLink: true,
 747 |       });
 748 |       if (response === 0) shell.openExternal(VC_REDIST_X64_URL);
 749 |     } else {
 750 |       await dialog.showMessageBox({
 751 |         type: "warning",
 752 |         title: "Pass-Through unavailable",
 753 |         message:
 754 |           "uIOhook couldn’t start even though the C++ runtime is present.",
 755 |         detail:
 756 |           "Possible causes: antivirus/anti-cheat blocking global hooks, architecture mismatch, native module not rebuilt, or asar not unpacked.\n\n" +
 757 |           "You can still use function keys (F1/F2) in limited mode. " +
 758 |           "To use A–Z / 0–9 with pass-through, ensure uIOhook loads successfully.",
 759 |         buttons: ["OK"],
 760 |         noLink: true,
 761 |       });
 762 |     }
 763 | 
 764 |     usingUiohook = false;
 765 |     sendHotkeysMode();
 766 |     refreshHotkeyEngine();
 767 |     return;
 768 |   }
 769 | 
 770 |   // --- Handlers uIOhook (toujours actifs pour la capture)
 771 |   let lastToggle = 0,
 772 |     lastSwap = 0;
 773 |   const RATE = 180;
 774 | 
 775 |   uIOhook.on("keydown", (e) => {
 776 |     logHK("uiohook keydown", {
 777 |       keycode: e.keycode,
 778 |       captureState: !!captureState,
 779 |       now: Date.now(),
 780 |       blockUntil: captureWaitUntil,
 781 |     });
 782 | 
 783 |     // Capture de la touche (pour récupérer le "code" même quand on est en fallback)
 784 |     if (captureState) {
 785 |       captureState.code = e.keycode;
 786 |       if (captureState.label) finalizeCapture("have both");
 787 |       else {
 788 |         if (captureState.secondaryTimer)
 789 |           clearTimeout(captureState.secondaryTimer);
 790 |         captureState.secondaryTimer = setTimeout(
 791 |           () => finalizeCapture("after-code-wait"),
 792 |           600
 793 |         );
 794 |       }
 795 |       return;
 796 |     }
 797 | 
 798 |     // Déclenchement normal uniquement si les codes existent
 799 |     if (!overlayWindow || overlayWindow.isDestroyed()) return;
 800 |     if (Date.now() < captureWaitUntil) return;
 801 | 
 802 |     const now = Date.now();
 803 |     if (Number.isFinite(hotkeys.start) && e.keycode === hotkeys.start) {
 804 |       if (now - lastToggle < RATE) return;
 805 |       lastToggle = now;
 806 |       dispatchHotkey("toggle");
 807 |     } else if (Number.isFinite(hotkeys.swap) && e.keycode === hotkeys.swap) {
 808 |       if (now - lastSwap < RATE) return;
 809 |       lastSwap = now;
 810 |       dispatchHotkey("swap");
 811 |     }
 812 |   });
 813 | 
 814 |   // --- Démarrer uIOhook dans tous les cas pour permettre la capture A–Z / 0–9
 815 |   try {
 816 |     uIOhook.start();
 817 |     logHK("uiohook started (capture enabled)");
 818 |   } catch (e) {
 819 |     logHK("uiohook START failed -> fallback", e?.message || e);
 820 |   }
 821 | 
 822 |   // --- Mode d'entrée : fallback tant que les deux codes ne sont pas définis
 823 |   const haveCodes =
 824 |     Number.isFinite(hotkeys.start) && Number.isFinite(hotkeys.swap);
 825 |   usingUiohook = !!haveCodes;
 826 |   sendHotkeysMode();
 827 |   if (usingUiohook) {
 828 |     try {
 829 |       globalShortcut.unregisterAll();
 830 |     } catch {}
 831 |   } else {
 832 |     refreshHotkeyEngine(); // garder F1/F2 dispo jusqu'à ce que les 2 codes soient capturés
 833 |   }
 834 | }
 835 | 
 836 | /* -------------------- lifecycle -------------------- */
 837 | app.commandLine.appendSwitch("enable-zero-copy");
 838 | app.commandLine.appendSwitch("ignore-gpu-blocklist");
 839 | 
 840 | app.whenReady().then(() => {
 841 |   createMainWindow();
 842 |   setupIPC();
 843 |   setupUiohook();
 844 |   setTimeout(createOverlayWindow, 800);
 845 |   setupGamepadExe();
 846 | });
 847 | 
 848 | app.on("will-quit", () => {
 849 |   try {
 850 |     if (usingUiohook) uIOhook.stop();
 851 |   } catch {}
 852 |   try {
 853 |     globalShortcut.unregisterAll();
 854 |   } catch {}
 855 | });
 856 | app.on("window-all-closed", () => {
 857 |   app.quit();
 858 | });

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