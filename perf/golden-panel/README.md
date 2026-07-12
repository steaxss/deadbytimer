# Control-panel golden master

This directory freezes the current 1120 × 820 production control panel rendered
by Electron 42.3.3 on Windows.

The five PNG/JSON pairs cover the top, middle and bottom scroll positions plus
the Preferences and Premium modals. JSON files record viewport, scroll state,
text, semantic element geometry and key computed styles.

Regenerate into ignored artifacts with:

```powershell
npm exec vite build
npm run perf:panel
```

Review `perf/artifacts/panel-final` before replacing this directory. This golden
was created after the initial refactor, so it is a future non-regression oracle,
not evidence reconstructing the unavailable pre-refactor panel pixels.
