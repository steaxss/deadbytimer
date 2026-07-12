# DBD 1v1 Timer Overlay

[![Version 3.3.0](https://img.shields.io/badge/Version-3.3.0-informational)](https://github.com/steaxss/deadbytimer)
[![Electron 42.3.3](https://img.shields.io/badge/Electron-42.3.3-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React 18.3.1](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 8.0.16](https://img.shields.io/badge/Vite-8.0.16-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript 7.0.2](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 3.4.7](https://img.shields.io/badge/Tailwind_CSS-3.4.7-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand 4.5.7](https://img.shields.io/badge/Zustand-4.5.7-000000)](https://github.com/pmndrs/zustand)
[![electron-store 9.0.0](https://img.shields.io/badge/electron--store-9.0.0-2C3E50)](https://github.com/sindresorhus/electron-store)
[![uIOhook 1.5.4](https://img.shields.io/badge/uIOhook-1.5.4-5C6BC0)](https://github.com/SnosMe/uiohook-napi)
[![electron-builder 26.15.3](https://img.shields.io/badge/electron--builder-26.15.3-4E9A06)](https://www.electron.build/)
[![XInput](https://img.shields.io/badge/Gamepad-XInput-informational)](https://learn.microsoft.com/windows/win32/xinput/getting-started)
[![License](https://img.shields.io/badge/License-Non--commercial-informational)](#license)

Desktop overlay for Dead by Daylight 1v1 matches. The app provides two timers,
player names, scores, global shortcuts, controller bindings and a transparent
overlay designed to stay above the game window.

Created by STEAXS.

## Preview

![DBD 1v1 Timer Overlay Preview](https://i.imgur.com/5rLwdeD.png)

## Features

- Dual timers with millisecond display
- Transparent draggable overlay with click-through lock mode
- Keyboard and mouse hotkeys
- XInput gamepad support through the bundled native bridge
- Player names, score tracking and optional auto-score
- Theme, scale and overlay visibility settings
- Persistent local configuration
- Windows installer and portable builds
- Update notification support

## Requirements

- Windows 10 or Windows 11
- Node.js 22.12+
- npm

Gamepad support requires an XInput-compatible controller. Non-XInput devices may
need Steam Input, DS4Windows or another mapper.

## Install

```bash
git clone https://github.com/steaxss/deadbytimer.git
cd deadbytimer
npm install
```

## Development

```bash
npm run electron:dev
```

This starts Vite, then launches Electron when the dev server is ready.

## Build

```bash
npm run build
```

Other build targets:

```bash
npm run build:portable
npm run build:installer
npm run build:dir
```

Build artifacts are written to `release/`.

## Test

```bash
npm test
npm run lint
npm run check:lines
npm run typecheck
```

For release validation, also run a packaged build and complete the manual checks
listed in `TESTING.md`.

## Controls

Default bindings:

- `F1`: start or pause the active timer
- `F2`: switch the active side

Bindings can be changed from the control panel. Mouse buttons and XInput
controller buttons can also be assigned when supported by the system.

## Configuration

Settings are stored by Electron in the app data directory for the current user.
On Windows this is under `%APPDATA%`.

## Project Layout

```text
deadbytimer/
  electron/     Electron main process, windows, input and hotkeys
  native/       Windows XInput bridge
  public/       Static public assets
  scripts/      Build and test helpers
  src/          React renderer and overlay code
  test/         Unit test fixtures
```

## Useful Scripts

- `npm run electron:dev`: development app
- `npm run build`: production installer build
- `npm run build:portable`: portable Windows build
- `npm run build:installer`: NSIS installer build
- `npm run build:dir`: unpacked build
- `npm run typecheck`: TypeScript check
- `npm run lint`: strict static lint gate
- `npm run check:lines`: enforce the 450-line source-file limit
- `npm run verify`: run all local quality and vulnerability gates
- `npm test`: unit tests

## Notes

- `native/xinput_bridge.exe` is launched by the Electron main process when
  gamepad capture or mappings are active.
- Some native input features can require the Microsoft Visual C++ Redistributable
  2015-2022 x64 runtime.
- Anti-cheat compatibility must be validated manually on a machine running the
  target game. See `TESTING.md`.

## License

Non-commercial use only. This project is licensed under the PolyForm
Noncommercial License 1.0.0. Commercial use, resale or monetization requires
prior written permission from STEAXS. See the license file for full terms.
