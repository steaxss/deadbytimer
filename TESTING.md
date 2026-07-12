# Testing

## Automated

Run before every release candidate:

```powershell
npm test
npm run lint
npm run check:lines
npm run typecheck
npm audit
npm audit --omit=dev
npm run build
```

`npm run verify` groups every command above except the packaged build.

What these cover:

- `npm test`: input, IPC, persistence and monotonic timer invariants
- `npm run lint`: correctness, suspicious constructs and unused code
- `npm run check:lines`: 450-line limit for every maintained source file
- `npm run typecheck`: strict TypeScript 7 safety for renderers and Electron
- `npm audit`: zero known vulnerability in the complete dependency graph
- `npm audit --omit=dev`: zero known vulnerability in shipped dependencies
- `npm run build`: renderer + Electron packaging smoke test

## Manual Smoke

Run these on a clean boot if possible:

1. Launch the app with default settings.
2. Confirm the overlay opens and moves correctly when unlocked.
3. Confirm `F1` toggles the active timer and `F2` swaps the active side.
4. Confirm the overlay still works after hiding/showing it.
5. Confirm scale changes do not break layout or crop names/timers.
6. Confirm auto-score still increments the longer paused run only.

## Keyboard Matrix

Validate each case after restart:

1. Default fallback only: `F1` and `F2`.
2. One alphanumeric bind and one function-key bind.
3. Two alphanumeric binds.
4. Clear a bind and confirm the app falls back to `F1`/`F2`.
5. Rebind several times and confirm no duplicate triggers.

Expected:

- Function keys work without pass-through hooks.
- Alphanumeric binds work globally.
- No double fire on key press.

## Mouse Matrix

Validate with extra buttons and wheel if supported:

1. Bind `toggle` to `MOUSE3` or `MOUSE4`.
2. Bind `swap` to another mouse button.
3. Bind one action to wheel up or wheel down.
4. Clear mouse binds and confirm keyboard fallback still works.

Expected:

- Only explicit mouse binds require the low-level hook.
- Left and right click are never captured as runtime actions.

## Gamepad Matrix

Validate with an XInput device:

1. No mapping configured: launch app and verify normal behavior.
2. Map `toggle` to one button and `swap` to another.
3. Restart the app and confirm mappings persist.
4. Clear mappings and verify no stale trigger remains.
5. Re-enter capture and remap both actions.

Expected:

- The bridge starts only when a mapping exists or capture is active.
- Mapped actions trigger once per press.

## Stability Matrix

Validate after long-running use:

1. Leave the overlay open for 15 minutes with no timer running.
2. Leave one timer running for 10 minutes.
3. Alt-tab repeatedly between the game and desktop.
4. Open and close Logitech G Hub / Synapse / iCUE if installed.
5. Disconnect and reconnect the controller.

Expected:

- No progressive CPU spike.
- No duplicated hotkeys.
- No stuck listener after focus changes.

## EAC Validation

This cannot be proven purely by static analysis. It must be validated on a machine with the target game and anti-cheat running.

Recommended validation:

1. Start Dead by Daylight normally with EAC enabled.
2. Test default `F1/F2` bindings first.
3. Test one alphanumeric bind.
4. Test one mouse-side-button bind.
5. Test one controller mapping.
6. Repeat after a full game restart.

Watch for:

- input delay
- missed triggers
- duplicate triggers
- mouse stutter
- game launch refusal or anti-cheat warning

If any issue appears, capture:

- app version
- exact binding mode used
- whether G Hub / Synapse / iCUE / DS4Windows was running
- `main.log`

## OBS Matrix

Validate with DBD running normally and without adding any injected overlay:

1. Capture DBD with Game Capture and the timer with Window Capture.
2. Repeat Window Capture with Automatic, Windows Graphics Capture and BitBlt.
3. Repeat at 30 and 60 fps, with the timer source visible and hidden.
4. Repeat with Display Capture only when it belongs to the real user workflow.
5. Record OBS Stats and logs for 30 minutes in a non-saturated configuration.

Expected:

- unchanged transparency, alpha, dimensions and animation timing
- stable source detection after restarting OBS and the timer
- no new missed, skipped or dropped frames compared with the app-off baseline
