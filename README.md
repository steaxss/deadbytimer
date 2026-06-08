# DBD 1v1 Timer Overlay

Desktop overlay for Dead by Daylight 1v1 matches. The app provides two timers,
player names, scores, global shortcuts, controller bindings and a transparent
overlay designed to stay above the game window.

Created by STEAXS.

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
