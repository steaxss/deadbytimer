# CLAUDE.md — DBD 1v1 Timer Overlay

## Overview
Electron 30 desktop overlay for Dead by Daylight 1v1 matches. Two independent timers — longest time wins the round. Overlay sits on top of the game (transparent, click-through). Used by streamers and competitive 1v1 players on Windows.

**Stack:** Electron 30 + React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + Zustand 4

---

## Architecture

### Two Windows
| Window | Purpose | Entry HTML | Entry TSX | Transparent |
|--------|---------|-----------|-----------|-------------|
| **Main** (Control Panel) | Settings, players, hotkeys, themes | `index.html` | `src/main.tsx` → `ControlPanel.tsx` | No |
| **Overlay** | Timer display on top of game | `overlay.html` | `src/overlay.tsx` → `TimerOverlay.tsx` | Yes |

### Process Model
```
Main Process (electron/main.mjs)
├── windows/windows.cjs     → BrowserWindow creation & management
├── hotkeys/capture.cjs     → Hotkey capture transactions
├── input/uiohook.cjs       → Global keyboard/mouse hook (native)
├── input/gamepad-exe.cjs   → XInput bridge (xinput_bridge.exe)
└── preload.cjs             → Context bridge (window.api)
```

---

## File Structure
```
electron/
├── main.mjs                 # Entry, IPC setup, lifecycle, Chromium flags
├── preload.cjs              # Context bridge → window.api
├── hotkeys/capture.cjs      # Hotkey capture logic (keyboard/mouse/gamepad)
├── input/uiohook.cjs        # uIOhook native hook (keyboard + mouse)
├── input/gamepad-exe.cjs    # XInput bridge subprocess management
└── windows/windows.cjs      # BrowserWindow factory & overlay sizing

src/
├── main.tsx                 # Control panel React entry
├── overlay.tsx              # Overlay React entry
├── index.css                # Tailwind base + .dbd-digits utility
├── components/
│   ├── ControlPanel.tsx     # Full settings UI (hotkeys, players, themes, scale)
│   ├── ScrollingName.tsx    # Ping-pong text scrolling (overflow names)
│   └── overlay/
│       ├── TimerOverlay.tsx # Dual timer display + auto-score + warnings
│       └── DragHandle.tsx   # Draggable repositioning bar (when unlocked)
├── store/
│   └── timerStore.ts        # Zustand store (active, status, clicks, toggle, elapsed)
├── themes/
│   ├── palette.ts           # NameTheme (3) + AccentKey (17) + gradient maps
│   └── default.css          # Grid layout, timer styles, warning states, animations
├── styles/
│   └── fonts.css            # @font-face: Poppins, Poppins-Regular, Squarefont
├── types/
│   └── preload.d.ts         # TypeScript defs for window.api
├── utils/
│   ├── timer.ts             # PreciseTimer class + formatMillis/formatMillisDynamic
│   └── cn.ts                # Class name joiner utility
└── assets/fonts/            # Poppins-Medium.ttf, Poppins-Regular.ttf, Square.ttf

native/
└── xinput_bridge.exe        # XInput gamepad bridge (C++ source + binary)

build/
└── icon.ico                 # Application icon
```

---

## Timer Logic (Core)

### PreciseTimer (`src/utils/timer.ts`)
- Uses `performance.now()` for sub-millisecond precision
- States: stopped → running → paused → stopped (reset)
- `elapsedMs` getter: returns accumulated + current running delta

### Zustand Store (`src/store/timerStore.ts`)
- `active`: 1 | 2 — which player's timer is selected
- `status`: Record<1|2, 'stopped'|'running'|'paused'>
- `clicks`: Tracks press cycles for reset (0→1→2)
- **toggle()** (F1): stopped→running, running→paused, paused→stopped(reset)
- **select(n)** (F2): Switch active timer to player n
- **elapsed(n)**: Returns current ms for timer n (calls PreciseTimer.elapsedMs)

### Display Format
- `formatMillisDynamic(ms)`: Returns `S.CC` or `M:SS.CC` (no leading zeros on minutes)
- Characters split into `<span>` per char via `splitForTheme()` for individual styling

### Auto-Score
- Triggers when both timers transition running → paused
- Both runs must exceed threshold (default 25s)
- Longest time gets +1 point; exact ties = no points
- Snapshots purged after scoring

---

## Overlay Rendering

### Tick System (`TimerOverlay.tsx`)
- **Running**: `requestAnimationFrame` loop + 250ms heartbeat interval
- **Idle**: 250ms interval only (~4 FPS)
- Tick forces React re-render via `setTick(t => (t+1)|0)`

### Warning States
| Class | Condition | Visual |
|-------|-----------|--------|
| `warn20` | 10-20s before catching opponent | Orange gradient text |
| `warn10` | <10s before catching opponent | Red blinking text (0.8s) |
| `loose` | Already exceeded opponent time | Red static text |

### Layout
- Fixed 520×120px grid (3 columns × 2 rows)
- Row 1: Player1 name | Score (accent bg) | Player2 name (50px)
- Row 2: Timer1 | (empty) | Timer2 (70px)
- Scaled via CSS `transform: scale(s)` with `transformOrigin: top left`
- Drag handle: 30px above content (visible only when unlocked)

---

## Theme System

### Name Background (`NameTheme`)
- `default`: Gray gradient (#4B4B4B → #3A3A3A)
- `dark`: Black (#000000 → #111111)
- `white`: White (#FFFFFF) — text becomes black, stroke applied

### Accent Colors (`AccentKey`) — 22 options
default(blue), rose, rouge, orange, or, jaune, vert, menthe, bleu_fonce, bleu_clair, cyan, violet, lavande, marron, anthracite, argent, corail, neon_rose, ocean, sunset, aurora, inferno

### CSS Variables (applied to `:root` of overlay)
- `--name-bg`: Name box background gradient
- `--name-color`: Name text color (#FFF or #000)
- `--accent-gradient`: Score bg + active timer bar
- `--name-glow`: Text shadow for names
- `--name-stroke`: webkit-text-stroke for names

---

## Input System (3 layers)

### Layer 1: uIOhook (native, preferred)
- Global keyboard + mouse listener via `uiohook-napi`
- Requires VC++ Runtime (vcruntime140.dll)
- Handles: keydown (keycodes), mousedown (buttons 3+), wheel

### Layer 2: Fallback (globalShortcut)
- Electron's globalShortcut API
- Only F1–F24 keys supported
- Active when uIOhook unavailable or no codes set

### Layer 3: Gamepad (XInput)
- `native/xinput_bridge.exe` spawned as subprocess
- Outputs button events as newline-delimited strings
- Mapping stored in `%APPDATA%/dbd-timer-overlay/gamepad.json`
- Auto-relaunches on crash

### Rate Limiting
- All hotkeys debounced at 220ms via `createRateLimiter()`
- Prevents double-triggers from fast key presses

---

## IPC Communication

### window.api (preload bridge)
```
overlay.show/hide/updateSettings/onReady/onSettings/measure
timer.get/set/onSync
hotkeys.get/set/capture/cancel/onCaptured/on/onMode
gamepad.get/clear
```

### Key IPC Channels
- `global-hotkey` → Overlay receives {type: 'toggle'|'swap'}
- `overlay-settings` → Overlay receives full settings object
- `timer-data-sync` → Overlay receives player names + scores
- `overlay-ready` → Control panel knows overlay state

---

## Persistence (electron-store)

| Key | Content |
|-----|---------|
| `windowState` | Main window position & size |
| `overlaySettings` | x, y, scale, locked, alwaysOnTop, nameTheme, accentKey, autoScoreEnabled, autoScoreThresholdSec |
| `timerData` | player1/2: {name, score} |
| `hotkeys` | {start: keycode, swap: keycode} |
| `hotkeysLabel` | {start: "F1", swap: "F2"} |
| `mouseBinds` | {start: label, swap: label} |

---

## Chromium Flags (main.mjs)
```
disable-background-timer-throttling  — keeps timers accurate when backgrounded
disable-renderer-backgrounding       — prevents renderer throttling
enable-zero-copy                     — GPU optimization
ignore-gpu-blocklist                 — forces GPU acceleration
```

## Overlay Window Properties
- `backgroundThrottling: false` in webPreferences
- `transparent: true`, `frame: false`
- `setIgnoreMouseEvents(locked, {forward: true})` — click-through when locked
- `setAlwaysOnTop(true, 'screen-saver')` — z-order above game

---

## Build & Distribution

### Scripts
- `npm run dev` — Vite dev server + Electron (concurrently)
- `npm run build` — Vite build → obfuscate → electron-builder (NSIS + portable)
- `npm run build:portable` — Portable EXE only

### Obfuscation
- `javascript-obfuscator` on `dist/` folder
- Compact, string-array (base64), no control-flow-flattening, no dead-code

### Targets
- Windows x64 only (NSIS installer + portable)
- ASAR packed (uiohook-napi unpacked for native binary)

---

## Performance Architecture (v3.0.0)

The overlay uses **direct DOM manipulation** instead of React re-renders for timer updates:
- Pre-allocated `<span>` pool (8 elements per timer) created once on mount
- `writeTimerSpans()` writes directly to DOM, bypassing React reconciliation
- RAF loop only runs when a timer is running; one-shot update when idle
- Warn classes (`warn20`, `warn10`, `loose`) applied via direct `className` writes with dirty-checking
- ScrollingName RAF only runs when text overflows (early return otherwise)
- No `setTick()` / forced re-render pattern — React only re-renders for structural changes (players, scale, lock)

---

## Key Patterns & Notes

1. **Single instance lock** — `app.requestSingleInstanceLock()` prevents duplicate hooks
2. **Overlay sizing** — Content measured via `overlay-measure` IPC, then scaled by CSS transform + `setContentSize`
3. **ScrollingName** — Uses RAF ping-pong animation for overflow text, ResizeObserver for measurement
4. **DragHandle component** exists but TimerOverlay uses inline `<div className="drag-handle">` from CSS
5. **Timer chars** are individually wrapped in `<span className="timer-char">` for per-character gradient backgrounds
6. **Fonts**: Poppins (names, UI), Squarefont (timer digits)
7. **No router** — Single component per window, no navigation
8. **State flow**: Control Panel → IPC → Main Process → electron-store → IPC → Overlay
9. **Custom titlebar** — `titleBarStyle: 'hidden'` + `titleBarOverlay` keeps native window controls but allows custom header content; header uses `-webkit-app-region: drag`
10. **Custom scrollbar** — Styled via `::-webkit-scrollbar` in index.css (6px, zinc-tinted thumb)
