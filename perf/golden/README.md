# Overlay golden master

This directory contains the versionable visual contract generated from the
production renderer on 12 July 2026 with Electron 42.3.3 on Windows.

- 50 PNG captures cover scales, lock state, themes, accents, names, timer states
  and sampled animation frames.
- 50 JSON snapshots record text, DOM geometry and computed styles for the same
  cases.
- Timer-running and animation captures contain a live monotonic phase. Compare
  their structure, geometry and computed styles before interpreting raw image
  or timer-text differences.

Regenerate evidence with:

```powershell
npm exec vite build
$env:PERF_VARIANT = "candidate-golden"
node_modules\electron\dist\electron.exe perf\baseline\run.mjs
```

Review the generated `perf/artifacts/candidate-golden` first. Replace this
directory only after every difference is explained and approved.
