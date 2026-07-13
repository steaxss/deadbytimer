const assert = require("node:assert/strict");
const Module = require("node:module");

const {
  isFunctionKeyLabel,
  inferFunctionKeyCode,
  normalizeInputBindings,
  runtimeNeedsUiohook,
  hasMappedGamepadActions,
  shouldRunGamepadBridge,
} = require("../electron/input/runtime-policy.cjs");
const { createSenderGuard } = require("../electron/ipc/security.cjs");
const { parseOverlayPatch, parseTimerData, parseHotkeyPatch, parseDimensions, parsePointer, getSetupCopyText } = require("../electron/ipc/validation.cjs");
const { clampToDisplay, findBestDisplay, snapBounds } = require("../electron/windows/overlay-layout.cjs");
const { createDeferredWriter } = require("../electron/persistence/deferred-writer.cjs");
const uiohookRuntime = require("../electron/input/uiohook.cjs");
const { parseGamepadProtocolLine } = require("../electron/input/gamepad-protocol.cjs");
const { createRateLimiter } = require("../electron/input/rate-limiter.cjs");
const { MODIFIER, chordFromEvent, describeBinding, isHotkeyChord, matchesKeyboardEvent } = require("../electron/hotkeys/binding.cjs");
const { makeChordLabelFromBeforeInput } = require("../electron/hotkeys/labels.cjs");
const { MAX_TOTAL_BYTES, RETAIN_BYTES, ROTATE_AT_BYTES, truncateText } = require("../electron/logging/configure.cjs");

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("isFunctionKeyLabel only accepts F1-F24", () => {
  assert.equal(isFunctionKeyLabel("F1"), true);
  assert.equal(isFunctionKeyLabel("f24"), true);
  assert.equal(isFunctionKeyLabel("F25"), false);
  assert.equal(isFunctionKeyLabel("A"), false);
  assert.equal(isFunctionKeyLabel(null), false);
});

test("inferFunctionKeyCode resolves libuiohook function-key constants", () => {
  assert.equal(inferFunctionKeyCode("F3"), 0x003d);
  assert.equal(inferFunctionKeyCode("F12"), 0x0058);
  assert.equal(inferFunctionKeyCode("F24"), 0x006b);
  assert.equal(inferFunctionKeyCode("A"), null);
});

test("normalizeInputBindings infers a function-key code when missing", () => {
  const result = normalizeInputBindings({
    hotkeys: { start: null, swap: null },
    hotkeysLabel: { start: "F1", swap: "F2" },
    mouseBinds: { start: null, swap: null },
  });

  assert.equal(result.changed, true);
  assert.deepEqual(result.hotkeys, { start: 0x003b, swap: 0x003c });
});

test("normalizeInputBindings gives mouse precedence over keyboard scan codes", () => {
  const result = normalizeInputBindings({
    hotkeys: { start: 30, swap: null },
    hotkeysLabel: { start: "A", swap: "F2" },
    mouseBinds: { start: "MOUSE4", swap: null },
  });

  assert.equal(result.changed, true);
  assert.deepEqual(result.hotkeys, { start: null, swap: 0x003c });
  assert.deepEqual(result.mouseBinds, { start: "MOUSE4", swap: null });
});

test("runtimeNeedsUiohook only returns true for scan-code or mouse driven runtime", () => {
  assert.equal(
    runtimeNeedsUiohook({
      hotkeys: { start: null, swap: null },
      hotkeysLabel: { start: "F1", swap: "F2" },
      mouseBinds: { start: null, swap: null },
    }),
    false
  );

  assert.equal(
    runtimeNeedsUiohook({
      hotkeys: { start: 30, swap: null },
      hotkeysLabel: { start: "A", swap: "F2" },
      mouseBinds: { start: null, swap: null },
    }),
    true
  );

  assert.equal(
    runtimeNeedsUiohook({
      hotkeys: { start: 0x003d, swap: null },
      hotkeysLabel: { start: "F3", swap: "F2" },
      mouseBinds: { start: null, swap: null },
    }),
    false
  );

  assert.equal(
    runtimeNeedsUiohook({
      hotkeys: { start: null, swap: null },
      hotkeysLabel: { start: "F1", swap: "F2" },
      mouseBinds: { start: "MOUSE4", swap: null },
    }),
    true
  );
});

test("gamepad bridge only runs when a mapping exists or a capture listener is active", () => {
  assert.equal(hasMappedGamepadActions({ toggle: [], swap: [] }), false);
  assert.equal(hasMappedGamepadActions({ toggle: ["BTN A"], swap: [] }), true);

  assert.equal(
    shouldRunGamepadBridge({ mapping: { toggle: [], swap: [] }, rawListenerCount: 0 }),
    false
  );
  assert.equal(
    shouldRunGamepadBridge({ mapping: { toggle: ["BTN A"], swap: [] }, rawListenerCount: 0 }),
    true
  );
  assert.equal(
    shouldRunGamepadBridge({ mapping: { toggle: [], swap: [] }, rawListenerCount: 1 }),
    true
  );
});

test("log retention stays below the disk budget and truncates oversized text", () => {
  assert.equal(ROTATE_AT_BYTES < MAX_TOTAL_BYTES, true);
  assert.equal(RETAIN_BYTES < ROTATE_AT_BYTES, true);
  assert.equal(truncateText("short", 10), "short");
  assert.match(truncateText("1234567890", 5), /^12345… \[truncated 5 chars\]$/);
});

test("keyboard chords require an exact modifier set and support modifier-only bindings", () => {
  const ctrlAltK = { keycode: 0x0025, modifiers: MODIFIER.CTRL | MODIFIER.ALT };
  assert.equal(isHotkeyChord(ctrlAltK), true);
  assert.equal(matchesKeyboardEvent(ctrlAltK, { keycode: 0x0025, ctrlKey: true, altKey: true }), true);
  assert.equal(matchesKeyboardEvent(ctrlAltK, { keycode: 0x0025, ctrlKey: true, altKey: true, shiftKey: true }), false);
  assert.deepEqual(chordFromEvent({ keycode: 0x0038, ctrlKey: true, altKey: true }), {
    keycode: null,
    modifiers: MODIFIER.CTRL | MODIFIER.ALT,
  });
  assert.equal(matchesKeyboardEvent({ keycode: null, modifiers: 3 }, { keycode: 0x0038, ctrlKey: true, altKey: true }), true);
  assert.equal(describeBinding({ keycode: 37, modifiers: 3 }), "chord:keycode=37,mask=3");
  assert.equal(makeChordLabelFromBeforeInput({ key: "Alt", alt: true, control: true }), "CTRL+ALT");
  assert.equal(makeChordLabelFromBeforeInput({ key: "k", alt: true, control: true }), "CTRL+ALT+K");
});

test("gamepad protocol accepts only versioned known events", () => {
  assert.equal(parseGamepadProtocolLine("DBT1\tBTN A"), "BTN A");
  assert.equal(parseGamepadProtocolLine("DBT1\tAXIS RY_NEG"), "AXIS RY_NEG");
  assert.equal(parseGamepadProtocolLine("BTN A"), null);
  assert.equal(parseGamepadProtocolLine("DBT2\tBTN A"), null);
  assert.equal(parseGamepadProtocolLine("DBT1\tUNKNOWN"), null);
  assert.equal(parseGamepadProtocolLine(`DBT1\t${"A".repeat(65)}`), null);
});

test("input rate limiter uses a monotonic clock per action", () => {
  let now = 1000;
  const canFire = createRateLimiter(220, () => now);
  assert.equal(canFire("toggle"), true);
  now += 219;
  assert.equal(canFire("toggle"), false);
  assert.equal(canFire("swap"), true);
  now += 1;
  assert.equal(canFire("toggle"), true);
  now = 10;
  assert.equal(canFire("toggle"), false);

  let eventTime = 0;
  let accepted = 0;
  const validEvents = createRateLimiter(220, () => eventTime);
  for (let index = 0; index < 10_000; index += 1) {
    if (validEvents("toggle")) accepted += 1;
    eventTime += 220;
  }
  assert.equal(accepted, 10_000);
});

test("IPC payload validators accept product contracts and reject malformed data", () => {
  assert.deepEqual(parseOverlayPatch({ scale: 125, locked: false, accentKey: "cyan" }), { scale: 125, locked: false, accentKey: "cyan" });
  assert.deepEqual(parseOverlayPatch({ accentKey: "pastel_lilas" }), { accentKey: "pastel_lilas" });
  assert.throws(() => parseOverlayPatch({ scale: 500 }), /scale/);
  assert.throws(() => parseOverlayPatch({ unexpected: true }), /Unknown/);
  assert.deepEqual(parseHotkeyPatch({ start: 59, swap: null }), { start: 59, swap: null });
  assert.throws(() => parseHotkeyPatch({ start: -1 }), /Invalid/);
  assert.throws(() => parseHotkeyPatch({ start: 59, injected: true }), /Unknown/);
  assert.deepEqual(parseTimerData({ player1: { name: "A", score: 0 }, player2: { name: "B", score: 12 } }), { player1: { name: "A", score: 0 }, player2: { name: "B", score: 12 } });
  assert.throws(() => parseTimerData({ player1: { name: "A", score: -1 }, player2: { name: "B", score: 0 } }), /score/);
  assert.throws(() => parseTimerData({ player1: { name: "A", score: 0, role: "admin" }, player2: { name: "B", score: 0 } }), /Unknown/);
  assert.deepEqual(parseDimensions({ width: 520, height: 120 }), { width: 520, height: 120 });
  assert.throws(() => parseDimensions({ width: 0, height: 120 }), /dimensions/);
  assert.throws(() => parseDimensions({ width: 520, height: 120, extra: 1 }), /Unknown/);
  assert.deepEqual(parseHotkeyPatch({ start: { keycode: 37, modifiers: 3 } }), {
    start: { keycode: 37, modifiers: 3 },
  });
  assert.deepEqual(parseHotkeyPatch({ swap: { keycode: null, modifiers: 3 } }), {
    swap: { keycode: null, modifiers: 3 },
  });
  assert.deepEqual(parseHotkeyPatch({ reset: 19 }), { reset: 19 });
  assert.throws(() => parseHotkeyPatch({ start: { keycode: 37, modifiers: 0 } }), /hotkey/);
  assert.deepEqual(parsePointer({ x: 12.4, y: -8.7 }), { x: 12, y: -9 });
  assert.throws(() => parsePointer({ x: 1, y: 2, injected: true }), /Unknown/);
  assert.equal(getSetupCopyText("launchArgs"), "-dx12 -fullscreen");
  assert.match(getSetupCopyText("iniSettings"), /PreferredFullscreenMode=1$/);
  assert.throws(() => getSetupCopyText("arbitrary"), /Invalid setup text/);
});

test("overlay layout snaps per display and keeps a usable area visible", () => {
  const displays = [
    { id: 1, bounds: { x: 0, y: 0, width: 1920, height: 1080 } },
    { id: 2, bounds: { x: -1280, y: 0, width: 1280, height: 1024 } },
  ];
  const rightEdge = snapBounds({ x: 1392, y: 470, width: 520, height: 120 }, { x: 1800, y: 500 }, displays, displays[0]);
  assert.deepEqual(rightEdge.bounds, { x: 1400, y: 480, width: 520, height: 120 });
  assert.equal(rightEdge.snapTarget, "right-center-y");
  const secondDisplay = snapBounds({ x: -1271, y: 4, width: 520, height: 120 }, { x: -1200, y: 40 }, displays, displays[0]);
  assert.deepEqual(secondDisplay.bounds, { x: -1280, y: 0, width: 520, height: 120 });
  assert.equal(secondDisplay.snapTarget, "left-top");
  assert.equal(findBestDisplay({ x: -100, y: 100, width: 520, height: 120 }, displays)?.id, 1);
  assert.deepEqual(clampToDisplay({ x: 5000, y: 5000, width: 520, height: 120 }, displays[0]), { x: 1496, y: 1032, width: 520, height: 120 });
});

test("IPC sender guard enforces window identity and rejects subframes", () => {
  const panelFrame = {};
  const overlayFrame = {};
  const panel = { webContents: { id: 10, mainFrame: panelFrame } };
  const overlay = { webContents: { id: 20, mainFrame: overlayFrame } };
  const guard = createSenderGuard({ getMainWindow: () => panel, getOverlayWindow: () => overlay });
  guard({ sender: panel.webContents, senderFrame: panelFrame }, "panel");
  guard({ sender: overlay.webContents, senderFrame: overlayFrame }, "overlay");
  assert.throws(() => guard({ sender: overlay.webContents, senderFrame: overlayFrame }, "panel"), /untrusted/);
  assert.throws(() => guard({ sender: panel.webContents, senderFrame: {} }, "both"), /subframes/);
});

test("deferred persistence coalesces writes and flushes the newest value", () => {
  const writes = [];
  const writer = createDeferredWriter({ write: (value) => writes.push(value), delayMs: 60_000 });
  writer.schedule({ name: "first" });
  writer.schedule({ name: "latest" });
  assert.deepEqual(writes, []);
  writer.flush();
  assert.deepEqual(writes, [{ name: "latest" }]);
  writer.flush();
  assert.equal(writes.length, 1);
});

test("uIOhook stays unloaded until a runtime capability requests it", () => {
  let requireCalls = 0;
  let starts = 0;
  let stops = 0;
  const fakeHook = {
    addListener() {},
    on() {},
    removeListener() {},
    start() { starts += 1; },
    stop() { stops += 1; },
  };
  uiohookRuntime.setupUiohook({
    require: () => { requireCalls += 1; return { uIOhook: fakeHook }; },
    FORCE_NO_UIOHOOK: false,
    hasVCRedist: () => true,
    dialog: { showMessageBox: async () => ({ response: 1 }) },
    shell: { openExternal: async () => undefined },
    VC_REDIST_X64_URL: "https://example.invalid",
    logHK() {},
    getOverlayWindow: () => null,
    dispatchHotkey() {},
    isCapturing: () => false,
    getCaptureBlockUntil: () => 0,
    onCaptureKeyboardCode() {},
    onCaptureMouseLabel() {},
    getHotkeys: () => ({ start: 30, swap: null }),
    getMouseBinds: () => ({ start: null, swap: null }),
    setUsingUiohook() {},
  });

  assert.equal(uiohookRuntime.isLoaded(), false);
  assert.equal(requireCalls, 0);
  assert.equal(uiohookRuntime.enable("runtime"), true);
  assert.equal(requireCalls, 1);
  assert.equal(starts, 1);
  uiohookRuntime.stop();
  assert.equal(stops, 1);
});

test("electron-updater stays unloaded until the first update operation", async () => {
  const originalLoad = Module._load;
  let updaterLoads = 0;
  let checks = 0;
  const fakeUpdater = {
    logger: null,
    autoDownload: true,
    allowPrerelease: true,
    allowDowngrade: true,
    on() {},
    checkForUpdates: async () => { checks += 1; return null; },
  };
  try {
    Module._load = (request, parent, isMain) => {
      if (request === "electron") {
        return { app: { quit() {} }, shell: { openExternal: async () => undefined } };
      }
      if (request === "electron-updater") {
        updaterLoads += 1;
        return { autoUpdater: fakeUpdater };
      }
      return originalLoad(request, parent, isMain);
    };
    const modulePath = require.resolve("../electron/updates/updater.cjs");
    delete require.cache[modulePath];
    const updater = require(modulePath);
    updater.initializeUpdater({ getMainWindow: () => null, isPortable: false, verboseLogs: false });
    assert.equal(updaterLoads, 0);
    await updater.checkForUpdates();
    assert.equal(updaterLoads, 1);
    assert.equal(checks, 1);
  } finally {
    Module._load = originalLoad;
  }
});

async function run() {
  let passed = 0;
  for (const { name, fn } of tests) {
    try {
      await fn();
      passed += 1;
      console.log(`PASS ${name}`);
    } catch (error) {
      console.error(`FAIL ${name}`);
      console.error(error);
      process.exitCode = 1;
      break;
    }
  }
  if (!process.exitCode) console.log(`\n${passed}/${tests.length} tests passed`);
}

void run();
