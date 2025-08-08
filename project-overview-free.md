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
   1 | import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
   2 | import { join, dirname } from 'node:path'
   3 | import { fileURLToPath } from 'node:url'
   4 | import Store from 'electron-store'
   5 | import { createRequire } from 'node:module'
   6 | const require = createRequire(import.meta.url)
   7 | 
   8 | let uIOhook = null
   9 | 
  10 | const __dirname = dirname(fileURLToPath(import.meta.url))
  11 | const isDev = process.env.NODE_ENV === 'development'
  12 | const store = new Store()
  13 | 
  14 | let mainWindow = null
  15 | let overlayWindow = null
  16 | let usingUiohook = false
  17 | 
  18 | // dimensions non-scalées du contenu (hors drag bar)
  19 | let baseDims = { width: 520, height: 120 }
  20 | 
  21 | // hotkeys: codes (uiohook) + labels (affichage & fallback)
  22 | let hotkeys = store.get('hotkeys') || { start: null, swap: null }
  23 | let hotkeysLabel = store.get('hotkeysLabel') || { start: 'F1', swap: 'F2' }
  24 | 
  25 | // état de capture transactionnelle
  26 | let captureState = null // { type:'start'|'swap', label:null|string, code:null|number, primaryTimer:any, secondaryTimer:any }
  27 | let captureWaitUntil = 0 // time (ms) jusqu’auquel on ne dispatch pas aux timers (évite side-effects pendant capture)
  28 | 
  29 | // ===== debug =====
  30 | const DEBUG_HK = true
  31 | const logHK = (...args) => { if (DEBUG_HK) console.log('[HK]', ...args) }
  32 | 
  33 | /* -------------------- utils -------------------- */
  34 | function applyAlwaysOnTop(win, on) {
  35 |   try {
  36 |     win.setAlwaysOnTop(!!on, 'screen-saver')
  37 |     win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  38 |     win.setFullScreenable(false)
  39 |   } catch {}
  40 | }
  41 | function sendOverlaySettings() {
  42 |   if (overlayWindow && !overlayWindow.isDestroyed()) {
  43 |     const s = store.get('overlaySettings', { x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true })
  44 |     overlayWindow.webContents.send('overlay-settings', s)
  45 |   }
  46 | }
  47 | function recomputeOverlaySize() {
  48 |   if (!overlayWindow || overlayWindow.isDestroyed()) return
  49 |   const s = store.get('overlaySettings', { scale: 100, locked: true })
  50 |   const dragH = s.locked ? 0 : 30
  51 |   const scale = (s.scale || 100) / 100
  52 |   const w = Math.ceil(baseDims.width * scale)
  53 |   const h = Math.ceil((baseDims.height + dragH) * scale)
  54 |   overlayWindow.setContentSize(w, h)
  55 |   sendOverlaySettings()
  56 | }
  57 | function sendHotkeysMode() {
  58 |   if (mainWindow && !mainWindow.isDestroyed()) {
  59 |     mainWindow.webContents.send('hotkeys-mode', usingUiohook ? 'pass-through' : 'fallback')
  60 |   }
  61 | }
  62 | function makeLabelFromBeforeInput(input) {
  63 |   let k = input.key || ''
  64 |   if (/^F\d{1,2}$/.test(k)) return k
  65 |   if (/^[a-z]$/.test(k)) return k.toUpperCase()
  66 |   if (/^\d$/.test(k)) return k
  67 |   if (k === ' ') return 'SPACE'
  68 |   const map = {
  69 |     Escape:'ESC', Tab:'TAB', Enter:'ENTER', Backspace:'BACKSPACE',
  70 |     Shift:'SHIFT', Control:'CTRL', Alt:'ALT', Meta:'META',
  71 |     ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT',
  72 |   }
  73 |   if (map[k]) return map[k]
  74 |   const code = input.code || ''
  75 |   if (/^Key[A-Z]$/.test(code)) return code.slice(3,4)
  76 |   if (/^Digit\d$/.test(code)) return code.slice(5)
  77 |   return (k && k.length <= 6) ? k.toUpperCase() : (code || 'KEY')
  78 | }
  79 | 
  80 | function clearCaptureTimers() {
  81 |   if (!captureState) return
  82 |   if (captureState.primaryTimer) { clearTimeout(captureState.primaryTimer); captureState.primaryTimer = null }
  83 |   if (captureState.secondaryTimer) { clearTimeout(captureState.secondaryTimer); captureState.secondaryTimer = null }
  84 | }
  85 | 
  86 | function finalizeCapture(reason='done') {
  87 |   if (!captureState) return
  88 |   const { type, label, code } = captureState
  89 |   clearCaptureTimers()
  90 | 
  91 |   logHK('CAPTURE FINALIZE', { reason, type, label, code })
  92 | 
  93 |   // Persistance si on a reçu des infos
  94 |   if (label) {
  95 |     hotkeysLabel = { ...hotkeysLabel, [type]: label }
  96 |     store.set('hotkeysLabel', hotkeysLabel)
  97 |   }
  98 |   if (typeof code === 'number') {
  99 |     hotkeys = { ...hotkeys, [type]: code }
 100 |     store.set('hotkeys', hotkeys)
 101 |   }
 102 | 
 103 |   // Notifie le panel uniquement si on a reçu label ou code (sinon on ne change rien à l’UI)
 104 |   if (mainWindow && !mainWindow.isDestroyed() && (label || typeof code === 'number')) {
 105 |     const payload = { type }
 106 |     if (label) payload.label = label
 107 |     if (typeof code === 'number') payload.keycode = code
 108 |     mainWindow.webContents.send('hotkeys-captured', payload)
 109 |   }
 110 | 
 111 |   // Reset capture
 112 |   captureState = null
 113 |   captureWaitUntil = 0
 114 | 
 115 |   // Réarmer fallback si nécessaire
 116 |   if (!usingUiohook) refreshHotkeyEngine()
 117 | }
 118 | 
 119 | /* -------------------- windows -------------------- */
 120 | function createMainWindow() {
 121 |   const saved = store.get('windowState') || {}
 122 |   mainWindow = new BrowserWindow({
 123 |     width: saved.width || 900,
 124 |     height: saved.height || 640,
 125 |     x: saved.x, y: saved.y,
 126 |     minWidth: 700, minHeight: 480,
 127 |     show: false,
 128 |     autoHideMenuBar: true,
 129 |     webPreferences: {
 130 |       nodeIntegration: false,
 131 |       contextIsolation: true,
 132 |       preload: join(__dirname, 'preload.cjs'),
 133 |     }
 134 |   })
 135 | 
 136 |   if (isDev) {
 137 |     mainWindow.loadURL('http://localhost:5173')
 138 |     mainWindow.webContents.openDevTools({ mode: 'detach' })
 139 |   } else {
 140 |     mainWindow.loadFile(join(__dirname, '../dist/index.html'))
 141 |   }
 142 | 
 143 |   mainWindow.once('ready-to-show', () => mainWindow.show())
 144 |   mainWindow.on('close', () => {
 145 |     const b = mainWindow.getBounds()
 146 |     store.set('windowState', b)
 147 |   })
 148 |   mainWindow.on('closed', () => { mainWindow = null; if (overlayWindow) overlayWindow.close() })
 149 | }
 150 | 
 151 | function createOverlayWindow() {
 152 |   if (overlayWindow && !overlayWindow.isDestroyed()) { overlayWindow.show(); overlayWindow.focus(); return }
 153 |   const display = screen.getPrimaryDisplay().workAreaSize
 154 |   const s = store.get('overlaySettings', { x: Math.floor(display.width/2-260), y: 100, scale: 100, locked: true, alwaysOnTop: true })
 155 |   const dragH = s.locked ? 0 : 30
 156 |   const scale = (s.scale || 100) / 100
 157 | 
 158 |   overlayWindow = new BrowserWindow({
 159 |     width: Math.ceil(baseDims.width * scale),
 160 |     height: Math.ceil((baseDims.height + dragH) * scale),
 161 |     x: s.x, y: s.y,
 162 |     frame: false, transparent: true, resizable: false,
 163 |     hasShadow: false,
 164 |     skipTaskbar: false,
 165 |     focusable: true,
 166 |     title: 'DBD Timer Overlay',
 167 |     acceptFirstMouse: true,
 168 |     backgroundColor: '#00000000',
 169 |     useContentSize: true,
 170 |     webPreferences: {
 171 |       nodeIntegration: false,
 172 |       contextIsolation: true,
 173 |       preload: join(__dirname, 'preload.cjs'),
 174 |       backgroundThrottling: false
 175 |     }
 176 |   })
 177 | 
 178 |   overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true })
 179 |   applyAlwaysOnTop(overlayWindow, s.alwaysOnTop)
 180 | 
 181 |   const url = isDev ? 'http://localhost:5173/overlay.html' : join(__dirname, '../dist/overlay.html')
 182 |   if (isDev) overlayWindow.loadURL(url); else overlayWindow.loadFile(url)
 183 | 
 184 |   overlayWindow.on('closed', () => {
 185 |     overlayWindow = null
 186 |     if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('overlay-ready', false)
 187 |   })
 188 |   overlayWindow.on('move', () => {
 189 |     const b = overlayWindow.getBounds()
 190 |     store.set('overlaySettings.x', b.x)
 191 |     store.set('overlaySettings.y', b.y)
 192 |   })
 193 | 
 194 |   overlayWindow.webContents.on('did-finish-load', () => {
 195 |     const data = store.get('timerData') || {
 196 |       player1: { name: 'Player 1', score: 0 },
 197 |       player2: { name: 'Player 2', score: 0 }
 198 |     }
 199 |     overlayWindow.webContents.send('timer-data-sync', data)
 200 |     sendOverlaySettings()
 201 |     if (mainWindow) mainWindow.webContents.send('overlay-ready', true)
 202 |     setTimeout(() => recomputeOverlaySize(), 50)
 203 |   })
 204 | }
 205 | 
 206 | /* -------------------- IPC -------------------- */
 207 | function setupIPC() {
 208 |   ipcMain.handle('overlay-show', () => { createOverlayWindow(); return true })
 209 |   ipcMain.handle('overlay-hide', () => {
 210 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close()
 211 |     overlayWindow = null
 212 |     if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('overlay-ready', false)
 213 |     return true
 214 |   })
 215 | 
 216 |   ipcMain.handle('overlay-settings-update', (_evt, settings) => {
 217 |     const current = store.get('overlaySettings', {})
 218 |     const next = { ...current, ...settings }
 219 |     store.set('overlaySettings', next)
 220 |     if (!overlayWindow || overlayWindow.isDestroyed()) return true
 221 | 
 222 |     if (settings.locked !== undefined) {
 223 |       overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true })
 224 |       overlayWindow.setFocusable(true) // OBS/Alt-Tab
 225 |     }
 226 |     if (settings.alwaysOnTop !== undefined) applyAlwaysOnTop(overlayWindow, next.alwaysOnTop)
 227 |     if (settings.x !== undefined || settings.y !== undefined) {
 228 |       const b = overlayWindow.getBounds()
 229 |       overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y)
 230 |     }
 231 |     if (settings.scale !== undefined || settings.locked !== undefined) recomputeOverlaySize()
 232 |     sendOverlaySettings()
 233 |     return true
 234 |   })
 235 | 
 236 |   ipcMain.handle('overlay-measure', (_evt, dims) => {
 237 |     if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height)) return false
 238 |     baseDims = { width: Math.max(1, Math.floor(dims.width)), height: Math.max(1, Math.floor(dims.height)) }
 239 |     recomputeOverlaySize()
 240 |     return true
 241 |   })
 242 | 
 243 |   // Timer data
 244 |   ipcMain.handle('timer-data-get', () => store.get('timerData') || { player1: { name: 'Player 1', score: 0 }, player2: { name: 'Player 2', score: 0 } })
 245 |   ipcMain.handle('timer-data-set', (_evt, data) => {
 246 |     store.set('timerData', data)
 247 |     if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.webContents.send('timer-data-sync', data)
 248 |     return true
 249 |   })
 250 | 
 251 |   // Hotkeys API
 252 |   ipcMain.handle('hotkeys-get', () => ({
 253 |     start: hotkeys.start, swap: hotkeys.swap,
 254 |     startLabel: hotkeysLabel.start, swapLabel: hotkeysLabel.swap,
 255 |     mode: usingUiohook ? 'pass-through' : 'fallback'
 256 |   }))
 257 | 
 258 |   ipcMain.handle('hotkeys-set', (_evt, hk) => {
 259 |     hotkeys = { ...hotkeys, ...hk } // codes uiohook si fournis
 260 |     store.set('hotkeys', hotkeys)
 261 |     refreshHotkeyEngine()
 262 |     return true
 263 |   })
 264 | 
 265 |   // 🚀 capture 100% main-process, transactionnelle (pas de timeout tant qu'aucune touche n'a été frappée)
 266 |   ipcMain.handle('hotkeys-capture', (_evt, type) => {
 267 |     if (!(type === 'start' || type === 'swap')) { finalizeCapture('cancel'); return true }
 268 | 
 269 |     logHK('CAPTURE BEGIN', { type, mode: usingUiohook ? 'pass-through' : 'fallback' })
 270 | 
 271 |     // Bloquer le dispatch vers les timers pendant la capture (long pour te laisser le temps)
 272 |     captureWaitUntil = Date.now() + 15000
 273 | 
 274 |     // Reset/annule capture précédente si elle existe
 275 |     if (captureState) { clearCaptureTimers(); captureState = null }
 276 | 
 277 |     // État de capture : pas de timer court au début; on attend la première frappe
 278 |     captureState = {
 279 |       type,
 280 |       label: null,
 281 |       code: null,
 282 |       primaryTimer: setTimeout(() => {
 283 |         // Annule la capture si l'utilisateur oublie (15s)
 284 |         logHK('CAPTURE PRIMARY TIMEOUT — cancel')
 285 |         finalizeCapture('primary-timeout')
 286 |       }, 15000),
 287 |       secondaryTimer: null
 288 |     }
 289 | 
 290 |     // focus le panneau
 291 |     try { mainWindow?.focus(); logHK('focused mainWindow?', mainWindow?.isFocused()) } catch (e) { logHK('focus error', e?.message || e) }
 292 | 
 293 |     // en fallback, libérer les shortcuts pour laisser passer la frappe
 294 |     if (!usingUiohook) {
 295 |       try { globalShortcut.unregisterAll(); logHK('fallback: unregistered to let key through') } catch {}
 296 |     }
 297 | 
 298 |     // écouter une fois la prochaine touche (pour le label layout-aware)
 299 |     const once = (event, input) => {
 300 |       if (!captureState) return
 301 |       if (input.type !== 'keyDown' || input.isAutoRepeat) return
 302 |       logHK('before-input-event keyDown', { key: input.key, code: input.code })
 303 |       const label = makeLabelFromBeforeInput(input)
 304 | 
 305 |       captureState.label = label
 306 |       hotkeysLabel = { ...hotkeysLabel, [type]: label }
 307 |       store.set('hotkeysLabel', hotkeysLabel)
 308 | 
 309 |       // notifie instantanément le panel (affichage immédiat)
 310 |       mainWindow?.webContents.send('hotkeys-captured', { type, label })
 311 |       logHK('label captured (instant)', { type, label })
 312 | 
 313 |       // Si le code est déjà là -> on finalise; sinon, petite fenêtre pour le laisser arriver
 314 |       if (typeof captureState.code === 'number') {
 315 |         finalizeCapture('have both')
 316 |       } else {
 317 |         if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer)
 318 |         captureState.secondaryTimer = setTimeout(() => finalizeCapture('after-label-wait'), 500)
 319 |       }
 320 | 
 321 |       mainWindow?.webContents.removeListener('before-input-event', once)
 322 |     }
 323 |     mainWindow?.webContents.on('before-input-event', once)
 324 |     logHK('before-input-event listener ARMED')
 325 | 
 326 |     return true
 327 |   })
 328 | }
 329 | 
 330 | /* -------------------- Hotkeys engines -------------------- */
 331 | function refreshHotkeyEngine() {
 332 |   if (usingUiohook) { logHK('refreshHotkeyEngine: pass-through (no globalShortcut)'); return }
 333 |   try { globalShortcut.unregisterAll(); logHK('globalShortcut: unregistered all') } catch {}
 334 |   const RATE = 180
 335 |   let lastT = 0, lastS = 0
 336 | 
 337 |   const sKey = hotkeysLabel.start || 'F1'
 338 |   const wKey = hotkeysLabel.swap  || 'F2'
 339 |   logHK('globalShortcut: registering', { start: sKey, swap: wKey })
 340 | 
 341 |   try {
 342 |     globalShortcut.register(sKey, () => {
 343 |       if (Date.now() < captureWaitUntil) { logHK('fallback toggle skipped (capturing)'); return }
 344 |       const now = Date.now(); if (now - lastT < RATE) return; lastT = now
 345 |       logHK('DISPATCH toggle via globalShortcut')
 346 |       overlayWindow?.webContents.send('global-hotkey', { type: 'toggle' })
 347 |     })
 348 |   } catch (e) { logHK('register start failed', e?.message || e) }
 349 | 
 350 |   try {
 351 |     globalShortcut.register(wKey, () => {
 352 |       if (Date.now() < captureWaitUntil) { logHK('fallback swap skipped (capturing)'); return }
 353 |       const now = Date.now(); if (now - lastS < RATE) return; lastS = now
 354 |       logHK('DISPATCH swap via globalShortcut')
 355 |       overlayWindow?.webContents.send('global-hotkey', { type: 'swap' })
 356 |     })
 357 |   } catch (e) { logHK('register swap failed', e?.message || e) }
 358 | }
 359 | 
 360 | // uiohook global (pass-through)
 361 | function setupUiohook() {
 362 |   try {
 363 |     logHK('Trying to load uiohook-napi…')
 364 |     const lib = require('uiohook-napi')
 365 |     uIOhook = lib.uIOhook
 366 |     logHK('uiohook loaded OK')
 367 |   } catch (e) {
 368 |     logHK('uiohook FAILED to load -> fallback', e?.message || e)
 369 |     usingUiohook = false
 370 |     sendHotkeysMode()
 371 |     refreshHotkeyEngine()
 372 |     return
 373 |   }
 374 | 
 375 |   usingUiohook = true
 376 |   sendHotkeysMode()
 377 | 
 378 |   let lastToggle = 0
 379 |   let lastSwap = 0
 380 |   const RATE = 180
 381 | 
 382 |   uIOhook.on('keydown', (e) => {
 383 |     logHK('uiohook keydown', { keycode: e.keycode, captureState: !!captureState, now: Date.now(), blockUntil: captureWaitUntil })
 384 | 
 385 |     // si on est en capture : stocker le code; finaliser si label déjà là, sinon attendre un chouïa
 386 |     if (captureState) {
 387 |       captureState.code = e.keycode
 388 |       logHK('code captured (uiohook)', { type: captureState.type, code: e.keycode })
 389 |       if (captureState.label) {
 390 |         finalizeCapture('have both')
 391 |       } else {
 392 |         if (captureState.secondaryTimer) clearTimeout(captureState.secondaryTimer)
 393 |         captureState.secondaryTimer = setTimeout(() => finalizeCapture('after-code-wait'), 600)
 394 |       }
 395 |       return
 396 |     }
 397 | 
 398 |     // normal: déclenchement (pass-through)
 399 |     if (!overlayWindow || overlayWindow.isDestroyed()) return
 400 |     if (Date.now() < captureWaitUntil) { logHK('DISPATCH BLOCKED (capturing)'); return }
 401 | 
 402 |     const now = Date.now()
 403 |     if (hotkeys.start && e.keycode === hotkeys.start) {
 404 |       if (now - lastToggle < RATE) return; lastToggle = now
 405 |       logHK('DISPATCH toggle via uiohook')
 406 |       overlayWindow.webContents.send('global-hotkey', { type: 'toggle' })
 407 |     } else if (hotkeys.swap && e.keycode === hotkeys.swap) {
 408 |       if (now - lastSwap < RATE) return; lastSwap = now
 409 |       logHK('DISPATCH swap via uiohook')
 410 |       overlayWindow.webContents.send('global-hotkey', { type: 'swap' })
 411 |     }
 412 |   })
 413 | 
 414 |   try { uIOhook.start(); logHK('uiohook started') } catch (e) {
 415 |     logHK('uiohook START failed -> fallback', e?.message || e)
 416 |     usingUiohook = false
 417 |     sendHotkeysMode()
 418 |     refreshHotkeyEngine()
 419 |   }
 420 | }
 421 | 
 422 | /* -------------------- lifecycle -------------------- */
 423 | app.whenReady().then(() => {
 424 |   createMainWindow()
 425 |   setupIPC()
 426 |   setupUiohook()
 427 |   if (isDev) setTimeout(createOverlayWindow, 800)
 428 | })
 429 | app.on('will-quit', () => {
 430 |   try { if (usingUiohook) uIOhook.stop() } catch {}
 431 |   try { globalShortcut.unregisterAll() } catch {}
 432 | })
 433 | app.on('window-all-closed', () => { app.quit() })

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
   7 |     <title>DBD Timer - Control Panel</title>
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
   4 | /** App shell — layout responsive + footer réparé (pas d'absolu) */
   5 | const App: React.FC = () => {
   6 |   return (
   7 |     <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
   8 |       <main className="flex-1">
   9 |         <div className="mx-auto max-w-6xl p-6">
  10 |           <header className="mb-6 text-center">
  11 |             <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">You are not logged in</div>
  12 |             <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#B579FF]">DBD OVERLAY TOOLS</h1>
  13 |           </header>
  14 | 
  15 |           <ControlPanel />
  16 |         </div>
  17 |       </main>
  18 | 
  19 |       {/* Footer fixe et propre */}
  20 |       <footer className="mt-8">
  21 |         <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-400">
  22 |           <div className="uppercase tracking-wider">
  23 |             © by <b>DOC</b> &amp; <b>STEAXS</b> — 2025
  24 |           </div>
  25 |           <div className="text-xs mt-1 text-zinc-500">
  26 |             Hotkeys: <b>F1</b> start/pause/reset — <b>F2</b> swap active timer
  27 |           </div>
  28 |         </div>
  29 |       </footer>
  30 |     </div>
  31 |   );
  32 | };
  33 | 
  34 | export default App;

```

`dbdoverlaytools-free/src\components\ControlPanel.tsx`:

```tsx
   1 | import React, { useEffect, useState } from 'react';
   2 | 
   3 | /** Types hotkeys (codes + labels) */
   4 | type HKGet = {
   5 |   start: number | null;
   6 |   swap: number | null;
   7 |   startLabel?: string;
   8 |   swapLabel?: string;
   9 | };
  10 | type HKSet = { start?: number | null; swap?: number | null };
  11 | 
  12 | /** UI de contrôle — uniquement du style, aucune logique cassée */
  13 | const ControlPanel: React.FC = () => {
  14 |   // Overlay
  15 |   const [overlayOn, setOverlayOn] = useState(false);
  16 |   const [locked, setLocked] = useState(true);
  17 |   const [scale, setScale] = useState(100);
  18 | 
  19 |   // Joueurs
  20 |   const [players, setPlayers] = useState({
  21 |     player1: { name: 'PLAYER 1', score: 0 },
  22 |     player2: { name: 'PLAYER 2', score: 0 },
  23 |   });
  24 | 
  25 |   // Hotkeys
  26 |   const [hkCodes, setHkCodes] = useState<{ start: number | null; swap: number | null }>({
  27 |     start: null,
  28 |     swap: null,
  29 |   });
  30 |   const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
  31 |     start: 'F1',
  32 |     swap: 'F2',
  33 |   });
  34 |   const [capturing, setCapturing] = useState<null | 'start' | 'swap'>(null);
  35 | 
  36 |   // Init : récupère les états existants + s'abonne aux updates
  37 |   useEffect(() => {
  38 |     // Timer data (noms/scores)
  39 |     window.api.timer.get().then((d) => {
  40 |       if (d?.player1 && d?.player2) setPlayers(d);
  41 |     });
  42 | 
  43 |     // Hotkeys configurées
  44 |     window.api.hotkeys.get().then((h: HKGet) => {
  45 |       setHkCodes({ start: h.start ?? null, swap: h.swap ?? null });
  46 |       setHkLabels({ start: h.startLabel || 'F1', swap: h.swapLabel || 'F2' });
  47 |     });
  48 | 
  49 |     // Overlay : état + settings
  50 |     window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
  51 |     window.api.overlay.onSettings((s: any) => {
  52 |       if (typeof s.locked === 'boolean') setLocked(!!s.locked);
  53 |       if (typeof s.scale === 'number') setScale(s.scale);
  54 |     });
  55 | 
  56 |     // Sync timer (scores/noms) poussé depuis le main
  57 |     window.api.timer.onSync((d: any) => {
  58 |       if (d?.player1 && d?.player2) setPlayers(d);
  59 |     });
  60 | 
  61 |     // Fin de capture hotkey -> applique label/code
  62 |     window.api.hotkeys.onCaptured((p: { type: 'start' | 'swap'; keycode?: number | null; label?: string }) => {
  63 |       if (p.label) setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
  64 |       if (typeof p.keycode !== 'undefined') {
  65 |         setHkCodes((prev) => ({ ...prev, [p.type]: p.keycode ?? null }));
  66 |       }
  67 |       setCapturing(null);
  68 |     });
  69 |   }, []);
  70 | 
  71 |   // Helpers
  72 |   const savePlayers = (next: typeof players) => {
  73 |     setPlayers(next);
  74 |     window.api.timer.set(next); // ne change que noms/scores côté main
  75 |   };
  76 | 
  77 |   const toggleOverlay = async () => {
  78 |     if (overlayOn) {
  79 |       await window.api.overlay.hide();
  80 |       setOverlayOn(false);
  81 |     } else {
  82 |       await window.api.overlay.show();
  83 |       setOverlayOn(true);
  84 |     }
  85 |   };
  86 | 
  87 |   const saveHotkeys = async () => {
  88 |     const payload: HKSet = { start: hkCodes.start ?? null, swap: hkCodes.swap ?? null };
  89 |     await window.api.hotkeys.set(payload);
  90 |   };
  91 | 
  92 |   const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
  93 |     const v = Number(e.target.value);
  94 |     setScale(v);
  95 |     window.api.overlay.updateSettings({ scale: v });
  96 |   };
  97 | 
  98 |   const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
  99 |     const v = e.target.checked;
 100 |     setLocked(v);
 101 |     window.api.overlay.updateSettings({ locked: v });
 102 |   };
 103 | 
 104 |   const onTop = (e: React.ChangeEvent<HTMLInputElement>) => {
 105 |     window.api.overlay.updateSettings({ alwaysOnTop: e.target.checked });
 106 |   };
 107 | 
 108 |   const handleResetAll = () => {
 109 |     const next = {
 110 |       ...players,
 111 |       player1: { ...players.player1, score: 0 },
 112 |       player2: { ...players.player2, score: 0 },
 113 |     };
 114 |     savePlayers(next);
 115 |     // Les timers se réinitialisent comme d’habitude via F1 (on ne modifie pas la logique ici)
 116 |   };
 117 | 
 118 |   return (
 119 |     <div className="mx-auto max-w-5xl p-6 text-zinc-100">
 120 |       {/* Header */}
 121 |       <header className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 flex items-center justify-between">
 122 |         <div>
 123 |           <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">1v1 Overlay</div>
 124 |           <h1 className="text-xl font-semibold tracking-tight">DBD Overlay Tools</h1>
 125 |         </div>
 126 | 
 127 |         <div className="flex items-center gap-3">
 128 |           <button
 129 |             onClick={toggleOverlay}
 130 |             className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
 131 |               overlayOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-violet-600 hover:bg-violet-500'
 132 |             }`}
 133 |           >
 134 |             {overlayOn ? 'Hide Overlay' : 'Show Overlay'}
 135 |           </button>
 136 |           <button onClick={saveHotkeys} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500 transition">
 137 |             Save hotkeys
 138 |           </button>
 139 |         </div>
 140 |       </header>
 141 | 
 142 |       {/* Styles (UI only) */}
 143 |       <section className="mb-6">
 144 |         <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Select Timer Style</h2>
 145 |         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
 146 |           {[
 147 |             { label: 'Default', desc: 'Default Style', premium: false },
 148 |             { label: 'Glass', desc: '👑 Minimal Glass', premium: true },
 149 |             { label: 'VS', desc: '👑 Circular Progress', premium: true },
 150 |           ].map((s, i) => (
 151 |             <div
 152 |               key={i}
 153 |               className="rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10 hover:ring-violet-500/40 transition backdrop-blur"
 154 |             >
 155 |               <div className="mb-2 flex items-center justify-between">
 156 |                 <span className="text-sm font-medium">{s.label}</span>
 157 |                 {s.premium && <span className="text-xs text-zinc-400">UI</span>}
 158 |               </div>
 159 |               <div className="text-xs text-zinc-400">{s.desc}</div>
 160 |             </div>
 161 |           ))}
 162 |         </div>
 163 |       </section>
 164 | 
 165 |       {/* Hotkeys */}
 166 |       <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
 167 |         <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 168 |           <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Start/Stop/Reset Key</div>
 169 |           <button
 170 |             className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 171 |               capturing === 'start' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'
 172 |             }`}
 173 |             onClick={() => {
 174 |               setCapturing('start');
 175 |               window.api.hotkeys.capture('start');
 176 |             }}
 177 |           >
 178 |             {capturing === 'start' ? 'Press a key…' : hkLabels.start}
 179 |           </button>
 180 |         </div>
 181 | 
 182 |         <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
 183 |           <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Swap Timer Key</div>
 184 |           <button
 185 |             className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
 186 |               capturing === 'swap' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'
 187 |             }`}
 188 |             onClick={() => {
 189 |               setCapturing('swap');
 190 |               window.api.hotkeys.capture('swap');
 191 |             }}
 192 |           >
 193 |             {capturing === 'swap' ? 'Press a key…' : hkLabels.swap}
 194 |           </button>
 195 |         </div>
 196 |       </section>
 197 | 
 198 |       {/* Joueurs */}
 199 |       <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
 200 |         {/* Player 1 */}
 201 |         <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 202 |           <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 1</div>
 203 |           <input
 204 |             className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 205 |             value={players.player1.name}
 206 |             onChange={(e) => savePlayers({ ...players, player1: { ...players.player1, name: e.target.value } })}
 207 |           />
 208 |           <div className="text-xs text-zinc-400">Score</div>
 209 |           <div className="mt-2 flex items-center gap-2">
 210 |             <button
 211 |               className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 212 |               onClick={() =>
 213 |                 savePlayers({
 214 |                   ...players,
 215 |                   player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
 216 |                 })
 217 |               }
 218 |             >
 219 |               −1
 220 |             </button>
 221 |             <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player1.score}</div>
 222 |             <button
 223 |               className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 224 |               onClick={() =>
 225 |                 savePlayers({
 226 |                   ...players,
 227 |                   player1: { ...players.player1, score: players.player1.score + 1 },
 228 |                 })
 229 |               }
 230 |             >
 231 |               +1
 232 |             </button>
 233 |           </div>
 234 |         </div>
 235 | 
 236 |         {/* Player 2 */}
 237 |         <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 238 |           <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 2</div>
 239 |           <input
 240 |             className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
 241 |             value={players.player2.name}
 242 |             onChange={(e) => savePlayers({ ...players, player2: { ...players.player2, name: e.target.value } })}
 243 |           />
 244 |           <div className="text-xs text-zinc-400">Score</div>
 245 |           <div className="mt-2 flex items-center gap-2">
 246 |             <button
 247 |               className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
 248 |               onClick={() =>
 249 |                 savePlayers({
 250 |                   ...players,
 251 |                   player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
 252 |                 })
 253 |               }
 254 |             >
 255 |               −1
 256 |             </button>
 257 |             <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player2.score}</div>
 258 |             <button
 259 |               className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
 260 |               onClick={() =>
 261 |                 savePlayers({
 262 |                   ...players,
 263 |                   player2: { ...players.player2, score: players.player2.score + 1 },
 264 |                 })
 265 |               }
 266 |             >
 267 |               +1
 268 |             </button>
 269 |           </div>
 270 |         </div>
 271 |       </section>
 272 | 
 273 |       {/* Actions globales */}
 274 |       <div className="mb-6 flex justify-center">
 275 |         <button onClick={handleResetAll} className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2">
 276 |           Reset all timers & scores
 277 |         </button>
 278 |       </div>
 279 | 
 280 |       {/* Overlay Settings */}
 281 |       <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
 282 |         <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Overlay Settings</h2>
 283 | 
 284 |         <div className="mb-6">
 285 |           <div className="mb-2 flex items-center justify-between text-sm">
 286 |             <span>Scale</span>
 287 |             <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
 288 |           </div>
 289 |           <input type="range" min={50} max={200} value={scale} onChange={onScale} className="w-full [accent-color:#5AC8FF]" />
 290 |         </div>
 291 | 
 292 |         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
 293 |           <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
 294 |             <span className="text-sm">
 295 |               Lock Overlay Position <span className="opacity-50">🔓</span>
 296 |             </span>
 297 |             <input type="checkbox" checked={locked} onChange={onLock} className="h-5 w-9 accent-violet-500" />
 298 |           </label>
 299 | 
 300 |           <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
 301 |             <span className="text-sm">Overlay stays above all windows</span>
 302 |             <input type="checkbox" defaultChecked onChange={onTop} className="h-5 w-9 accent-violet-500" />
 303 |           </label>
 304 |         </div>
 305 | 
 306 |         <div
 307 |           className={`mt-4 rounded-lg border p-3 text-sm ${
 308 |             locked
 309 |               ? 'border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]'
 310 |               : 'border-violet-500/40 bg-violet-500/10 text-violet-300'
 311 |           }`}
 312 |         >
 313 |           {locked ? 'Overlay is locked – clicks will go through.' : 'Overlay is unlocked – drag the purple bar to reposition.'}
 314 |         </div>
 315 | 
 316 |         <p className="mt-3 text-center text-xs text-zinc-500">
 317 |           Astuce : l’overlay peut être minimisé et reste dans la barre des tâches lorsqu’il est déverrouillé.
 318 |         </p>
 319 |       </section>
 320 |     </div>
 321 |   );
 322 | };
 323 | 
 324 | export default ControlPanel;

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
  14 | /* Fond app + radiaux (optionnels) */
  15 | @layer utilities {
  16 |   .bg-app { @apply bg-[#0A0A0A]; }
  17 |   .card     { @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)]; }
  18 |   .subcard  { @apply rounded-xl border border-white/5  bg-white/5; }
  19 |   .tag      { @apply text-[13px] uppercase tracking-wide font-semibold text-[color:var(--violet)]; }
  20 |   .overtag  { @apply text-[13px] uppercase tracking-wider font-bold text-[color:var(--pink)]; }
  21 |   .pill     { @apply rounded-lg px-3 py-2 border; }
  22 |   .pill-on  { @apply border-[color:var(--green)]/20 bg-[color:var(--green)]/10 text-[color:var(--green)]; }
  23 |   .pill-off { @apply border-white/20 bg-white/10 text-zinc-400; }
  24 | 
  25 |   .btn-primary { @apply rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 transition; }
  26 |   .btn-ghost   { @apply rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2; }
  27 |   .btn-reset   { @apply rounded-lg border border-[color:var(--red)]/30 bg-[color:var(--red)]/15 text-[color:var(--red)] font-bold uppercase tracking-wide px-5 py-2; }
  28 | 
  29 |   .field      { @apply w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--violet)]; }
  30 |   .keybtn     { @apply w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition; }
  31 |   .keybtn-idle{ @apply bg-zinc-800 hover:bg-zinc-700; }
  32 |   .keybtn-cap { @apply bg-violet-600; }
  33 | 
  34 |   /* Interrupteurs façon Figma */
  35 |   .switch      { @apply relative inline-flex h-6 w-12 items-center rounded-full border transition; }
  36 |   .switch-dot  { @apply absolute h-5 w-5 rounded-full transition; }
  37 |   .switch-on   { @apply border-[color:var(--green)]/20 bg-[color:var(--green)]/10; }
  38 |   .switch-on .switch-dot  { @apply translate-x-6 bg-[color:var(--green)]; }
  39 |   .switch-off  { @apply border-white/20 bg-white/10; }
  40 |   .switch-off .switch-dot { @apply translate-x-1 bg-zinc-500; }
  41 | }

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