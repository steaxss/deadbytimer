# DBD 1v1 Timer Overlay

[![Electron 30](https://img.shields.io/badge/Electron-30-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 5](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand 4](https://img.shields.io/badge/Zustand-4-000000)](https://github.com/pmndrs/zustand)
[![electron-store 9](https://img.shields.io/badge/electron--store-9-2C3E50)](https://github.com/sindresorhus/electron-store)
[![uIOhook 1.5.4](https://img.shields.io/badge/uIOhook-1.5.4-5C6BC0)](https://github.com/wilix-team/iohook)
[![electron-builder 24](https://img.shields.io/badge/electron--builder-24-4E9A06)](https://www.electron.build/)
[![XInput](https://img.shields.io/badge/Gamepad-XInput-informational)](https://learn.microsoft.com/windows/win32/xinput/getting-started)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](LICENSE)

A lightweight desktop overlay for *Dead by Daylight* 1v1 matches. Transparent, click‑through overlay with dual timers, global hotkeys, **native XInput gamepad controls**, and persistent settings.

> Created by **STEAXS**.

---

## Support & Updates

[![Join our Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](http://discord.com/invite/aVdT8rRJKc)

> **Stay in the loop.** Join the Discord server for support, release announcements, and feature previews.  

> **Invite URL :** `http://discord.com/invite/aVdT8rRJKc`

## Features

- Dual timers with millisecond precision
- Transparent draggable overlay with lock/click‑through mode
- **Gamepad support (XInput)** via a native bridge executable
- Global hotkeys (keyboard and optional mouse)
- Customizable themes 
- Player names and score tracking, optional autoscore
- Persistent configuration saved across sessions
- Portable or installer builds for Windows
- Wincondition alert

## Tech Stack

Electron + React + TypeScript, built with Vite. Tailwind CSS for styling, Zustand for state, electron-store for persistence, uIOhook for global input, and an **XInput bridge** for pad buttons.

- Electron 30
- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- Zustand 4
- electron-store 9
- uIOhook-napi 1.5.4
- electron-builder 24

## Performance Optimization

- Precise timer using requestAnimationFrame
- Minimal re-renders with optimized React components
- Efficient IPC communication between main and overlay windows
- Low memory footprint (<100MB typical usage)

## Configuration

All settings are automatically saved to:
- **Windows**: `%APPDATA%/dbd-timer-overlay/config.json`
- **macOS**: `~/Library/Preferences/dbd-timer-overlay/config.json`
- **Linux**: `~/.config/dbd-timer-overlay/config.json`

## Getting Started

### Prerequisites
- **Windows 10/11**. Gamepad support and certain pass‑through features are Windows‑only.
- **Node.js 18+** and **npm**.

### Install

```bash
git clone https://github.com/steaxss/deadbytimer.git
cd deadbytimer
npm install
```

### Development

```bash
npm run electron:dev
```

This starts the Vite dev server and launches Electron once ready.

### Production Builds

Standard installer:

```bash
npm run build
```

Portable build:

```bash
npm run build:portable
```

NSIS installer explicitly:

```bash
npm run build:installer
```

Artifacts are written to `release/`.

> Note: On Windows, uIOhook can require the **Microsoft Visual C++ Redistributable 2015–2022 (x64)** to be present.

## Usage

- **F1**: Start/Pause active timer (you can replace by any other key)
- **F2**: Swap to the other timer  (you can replace by any other key)
- Toggle overlay on/off, lock for click‑through, change style, scale from 50% to 200%, edit player names and scores.

### Gamepad Controls (XInput)

- The project includes a native XInput bridge at `native/xinput_bridge.exe` (launched by the Electron main process).
- Button mappings are defined in the bridge and forwarded as app actions (start/pause, switch timer, etc.).
- Gamepad handling is **enabled by default on Windows** when the bridge process is available.
- If your controller is not detected, confirm it is an XInput device. For non‑XInput controllers, use a mapper (e.g., Steam Input or DS4 Windows) to expose XInput.

## Project Structure

```
deadbytimer/
├─ electron/            # Main process, input, hotkeys, windows
├─ src/                 # React renderer (control panel + overlay)
│  ├─ components/
│  ├─ store/            # Zustand store
│  ├─ themes/           # Palette + styles
│  └─ utils/
├─ index.html           # Control panel entry
├─ overlay.html         # Overlay entry
└─ native/              # xinput_bridge.exe (Windows gamepad bridge)
```

## Packaging Notes

Built with `electron-builder`. Windows targets include NSIS installer and portable builds. See the `build` section in `package.json` for configuration and extra resources.

## Scripts

- `electron:dev` → Dev workflow (Vite + Electron)
- `build` → Installer build
- `build:portable` → Portable build
- `build:installer` → NSIS installer
- `build:dir` → Unpacked build
- `typecheck` → TypeScript type-only check

## License

Non-commercial use only. This project is licensed under the PolyForm Noncommercial License 1.0.0. 
You may use, modify, and share the software for personal or internal development. 
Any commercial use, resale, or monetization requires prior written permission from **STEAXS**.
See the LICENSE file for full terms.