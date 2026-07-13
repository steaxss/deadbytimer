/** @typedef {"start" | "reset" | "swap"} InputAction */
/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */
/** @typedef {Partial<Record<InputAction, number | HotkeyChord | null>>} HotkeyCodes */
/** @typedef {Partial<Record<InputAction, string | null>>} InputLabels */
/** @typedef {{ toggle?: string[], swap?: string[] }} GamepadMapping */

/** @param {unknown} label */
function isFunctionKeyLabel(label) {
  return typeof label === "string" && /^F([1-9]|1[0-9]|2[0-4])$/i.test(label);
}

/** @param {unknown} label */
function inferFunctionKeyCode(label) {
  if (typeof label !== "string" || !isFunctionKeyLabel(label)) return null;
  const n = Number(label.slice(1));
  /** @type {Record<number, number>} */
  const map = {
    1: 0x003b,
    2: 0x003c,
    3: 0x003d,
    4: 0x003e,
    5: 0x003f,
    6: 0x0040,
    7: 0x0041,
    8: 0x0042,
    9: 0x0043,
    10: 0x0044,
    11: 0x0057,
    12: 0x0058,
    13: 0x005b,
    14: 0x005c,
    15: 0x005d,
    16: 0x0063,
    17: 0x0064,
    18: 0x0065,
    19: 0x0066,
    20: 0x0067,
    21: 0x0068,
    22: 0x0069,
    23: 0x006a,
    24: 0x006b,
  };
  return map[n] ?? null;
}

/**
 * @param {{ hotkeys?: HotkeyCodes, hotkeysLabel?: InputLabels, mouseBinds?: InputLabels }} bindings
 */
function normalizeInputBindings({ hotkeys, hotkeysLabel, mouseBinds }) {
  const nextHotkeys = { ...hotkeys };
  const nextMouseBinds = { ...mouseBinds };
  let changed = false;

  for (const key of /** @type {InputAction[]} */ (["start", "reset", "swap"])) {
    const label = hotkeysLabel?.[key];
    const inferredFKeyCode = inferFunctionKeyCode(label);

    if (inferredFKeyCode != null && nextHotkeys[key] == null) {
      nextHotkeys[key] = inferredFKeyCode;
      changed = true;
    }

    if (nextMouseBinds[key] && nextHotkeys[key] != null) {
      nextHotkeys[key] = null;
      changed = true;
    }
  }

  return { hotkeys: nextHotkeys, mouseBinds: nextMouseBinds, changed };
}

/**
 * @param {{ hotkeys?: HotkeyCodes, hotkeysLabel?: InputLabels, mouseBinds?: InputLabels }} bindings
 */
function runtimeNeedsUiohook({ hotkeys, hotkeysLabel, mouseBinds }) {
  return Boolean(
    (hotkeys?.start != null && (typeof hotkeys.start !== "number" || !isFunctionKeyLabel(hotkeysLabel?.start))) ||
    (hotkeys?.reset != null && (typeof hotkeys.reset !== "number" || !isFunctionKeyLabel(hotkeysLabel?.reset))) ||
    (hotkeys?.swap != null && (typeof hotkeys.swap !== "number" || !isFunctionKeyLabel(hotkeysLabel?.swap))) ||
    mouseBinds?.start ||
    mouseBinds?.reset ||
    mouseBinds?.swap
  );
}

/** @param {GamepadMapping | null | undefined} mapping */
function hasMappedGamepadActions(mapping) {
  return Boolean((mapping?.toggle || []).length || (mapping?.swap || []).length);
}

/** @param {{ mapping?: GamepadMapping, rawListenerCount?: number }} state */
function shouldRunGamepadBridge({ mapping, rawListenerCount }) {
  return hasMappedGamepadActions(mapping) || Number(rawListenerCount || 0) > 0;
}

module.exports = {
  isFunctionKeyLabel,
  inferFunctionKeyCode,
  normalizeInputBindings,
  runtimeNeedsUiohook,
  hasMappedGamepadActions,
  shouldRunGamepadBridge,
};
