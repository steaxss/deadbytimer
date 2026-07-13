# Dead by Timer 3.3.0

Version 3.3.0 focuses on smoother gameplay, more reliable timing and better control over the overlay without changing the timer's core look and feel.

## Highlights

### Smoother and more reliable timer

- Reduced background CPU, memory and GPU overhead across the overlay, input listeners and controller support.
- Improved timer recovery after a temporary rendering stall: the displayed value immediately catches up to the monotonic clock instead of accumulating drift.
- Reduced unnecessary work while the overlay or control panel is idle, hidden or minimized.
- Faster startup through deferred loading of optional input and update components.

### More flexible hotkeys

- Added support for modifier combinations such as `Ctrl+Alt`, `Ctrl+Alt+K`, `Ctrl+Shift+F` and similar combinations.
- Modifier combinations require an exact match, helping prevent accidental triggers.
- The main timer key now cycles through **Start → Pause → Resume**.
- Added a separate configurable **Reset Timer** key so resetting can no longer happen accidentally through the main timer key.
- Existing keyboard, mouse and function-key bindings remain compatible.

### Improved overlay positioning

- Added a clearer editing mode when the overlay is unlocked.
- The overlay can now snap to screen edges and center points while being moved.
- Added mouse-wheel scaling directly from the unlocked overlay.
- Added a quick lock control to finish positioning without returning to the control panel.
- Improved multi-monitor placement and recovery when the overlay is moved outside the usable display area.

## Stability and compatibility

- Improved global keyboard and mouse listener lifecycle and recovery.
- Reduced controller polling when no XInput controller is connected.
- Improved controller disconnect, reconnect and process cleanup behavior.
- Hardened communication between the application, control panel and overlay.
- Improved cleanup of pending settings and background processes during shutdown.
- Removed costly runtime obfuscation that increased startup and memory usage.

## Logging and uninstall

- Application logs are now kept under a strict 500 KB disk budget with automatic in-place retention of recent useful entries.
- Reduced duplicate and overly verbose update messages while preserving useful diagnostic information.
- Uninstalling through the normal Windows uninstaller now also removes Dead by Timer settings, logs, caches and pending update files.

## Upgrade notes

- Existing timer settings and hotkeys are preserved automatically.
- The new Reset Timer hotkey is unassigned by default and can be configured from **Keyboard / Mouse Hotkeys**.
- No additional runtime or manual migration step is required.

Thank you for using Dead by Timer.
