const assert = require("node:assert/strict");

const {
  isFunctionKeyLabel,
  inferFunctionKeyCode,
  normalizeInputBindings,
  runtimeNeedsUiohook,
  hasMappedGamepadActions,
  shouldRunGamepadBridge,
} = require("../electron/input/runtime-policy.cjs");

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

let passed = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    passed += 1;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    console.error(error);
    process.exitCode = 1;
    break;
  }
}

if (!process.exitCode) {
  console.log(`\n${passed}/${tests.length} tests passed`);
}
