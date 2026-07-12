# Phase 0 baseline harness

This harness loads the current production overlay bundle in an isolated Electron
process. It does not import or modify the production main process, persistent
settings, hotkeys, updater, or native input hooks.

Prerequisite:

```powershell
npm exec vite build
```

Collect the visual golden master, renderer metrics, and a targeted Chromium
trace:

```powershell
node_modules\.bin\electron.cmd perf\baseline\run.mjs
```

Probe the current XInput bridge five times:

```powershell
powershell -ExecutionPolicy Bypass -File perf\baseline\probe-xinput.ps1
```

Generated evidence is written to `perf/artifacts/phase-0/`. Re-run the same
commands after each isolated optimization and compare against the original
artifact set. DBD, EAC, OBS, multi-GPU, and low/mid/high-end measurements still
require the corresponding external environment and cannot be inferred from this
harness.

The 8-hour lifecycle soak writes atomic checkpoints to
`perf/artifacts/soak-8h/report.json`. Start it with Electron and analyze it only
after completion:

```powershell
node_modules\electron\dist\electron.exe perf\baseline\soak.mjs
npm run perf:soak:analyze
```
