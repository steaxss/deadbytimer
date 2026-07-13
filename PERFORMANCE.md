# Performance and reliability

This document summarizes the runtime optimization work completed for version
3.3.0. Measurements were collected on Windows 11 with an Intel Core i7-13700K
and an NVIDIA RTX 4080. They describe this test system and must not be
extrapolated to every hardware configuration.

## Results

| Area | Previous state | Current state |
|---|---:|---:|
| Type checking | TypeScript 5.9.2, about 806 ms and 183 MB | TypeScript 7.0.2, about 151 ms and 87.7 MB |
| XInput, no controller | About 3.12% of one CPU core | About 0.125% across five 5-second runs |
| Overlay CSS | 34.41 kB | 4.21 kB (-87.8%) |
| Packaged uIOhook files | 1,025,277 bytes | 175,361 bytes (-82.9%) |
| Main-process entry point | 675 lines | 437 lines |
| Control panel component | 844 lines | 410 lines |
| Known npm vulnerabilities | 4 in the complete dependency graph | 0 in complete and production graphs |

Five paired overlay runs measured a median renderer CPU usage of 0.00211% when
idle and 0.01407% with an active timer. The median GPU-process CPU usage during
an active timer was 0.04032%. Visible timer updates had a median p99 interval of
34.0 ms, a worst-run p99 of 34.1 ms and no interval above 100 ms.

Lazy loading uIOhook reduced median warm startup time by 17.6 ms. Deferring
`electron-updater` reduced median startup time by 32.7 ms and parent-process
private memory by approximately 3.9 MB before the first update check.

## Runtime changes

- The overlay and control panel load separate CSS bundles.
- Third-party and application bundles are minified without runtime
  obfuscation, which previously increased parsing, CPU and memory costs.
- The global Chromium background-throttling override was removed. Only the
  visible overlay opts out of throttling where required by the timer.
- uIOhook, the XInput bridge and update services start only when their
  capabilities are needed.
- Empty XInput slots use a two-second polling backoff. Connected controllers
  retain the responsive polling interval and unchanged packets are skipped.
- Input dispatch uses monotonic per-action rate limiting and sends actions only
  to the overlay.
- Persistence coalesces disk writes and flushes pending state during shutdown.
- IPC senders and payloads are validated before privileged operations.
- Window permissions, navigation, sandboxing, context isolation and the
  production content security policy are restricted by default.

## Quality gates

The maintained source files remain below 450 physical lines. The project passes
strict TypeScript 7 checks for renderer and Electron code, Oxlint with warnings
denied, 14 unit tests plus the monotonic timer test, the production build and
Electron packaging. Both `npm audit` and `npm audit --omit=dev` report zero known
vulnerabilities.

The automated coverage includes input policy, versioned gamepad messages, IPC
validation and sender checks, deferred persistence, lazy native-module loading,
overlay placement and timer recovery after a stalled render interval.

## Validation boundaries

The interface and timer behavior were checked locally during development, but
the repository does not store screenshot baselines or generated profiling
artifacts. Any future visual change should therefore receive a focused manual
comparison before release.

The following remain environment-specific release checks:

- Windows 10 and Windows 11 across low-, mid- and high-end hardware;
- physical XInput controllers, including disconnect and reconnect behavior;
- Dead by Daylight frametimes during representative matches;
- OBS Game Capture and Window Capture statistics;
- normal Easy Anti-Cheat startup and operation;
- Authenticode signing when a certificate is available.

No claim of zero performance impact or external compatibility certification is
made without those measurements.
