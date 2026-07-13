const MODIFIER = Object.freeze({ CTRL: 1, ALT: 2, SHIFT: 4, META: 8 });
const MODIFIER_KEYCODES = new Set([
  0x001d, 0x0e1d, 0x0038, 0x0e38, 0x002a, 0x0036, 0x0e5b, 0x0e5c,
]);

/** @typedef {{ keycode: number | null, modifiers: number }} HotkeyChord */

/** @param {{ ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean }} event */
function modifiersFromEvent(event) {
  return (event.ctrlKey ? MODIFIER.CTRL : 0)
    | (event.altKey ? MODIFIER.ALT : 0)
    | (event.shiftKey ? MODIFIER.SHIFT : 0)
    | (event.metaKey ? MODIFIER.META : 0);
}

/** @param {number} keycode */
function isModifierKeycode(keycode) {
  return MODIFIER_KEYCODES.has(keycode);
}

/** @param {{ keycode: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean }} event @returns {HotkeyChord} */
function chordFromEvent(event) {
  return {
    keycode: isModifierKeycode(event.keycode) ? null : event.keycode,
    modifiers: modifiersFromEvent(event),
  };
}

/** @param {unknown} value @returns {value is HotkeyChord} */
function isHotkeyChord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const chord = /** @type {{ keycode?: unknown, modifiers?: unknown }} */ (value);
  const keycode = chord.keycode;
  const modifiers = chord.modifiers;
  return (keycode === null || (typeof keycode === "number" && Number.isSafeInteger(keycode) && keycode >= 0 && keycode <= 0xffff))
    && typeof modifiers === "number" && Number.isSafeInteger(modifiers) && modifiers > 0 && modifiers <= 15;
}

/** @param {number | HotkeyChord | null | undefined} binding @param {{ keycode: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean }} event */
function matchesKeyboardEvent(binding, event) {
  if (typeof binding === "number") return binding === event.keycode;
  if (!isHotkeyChord(binding)) return false;
  if (binding.modifiers !== modifiersFromEvent(event)) return false;
  return binding.keycode === null ? isModifierKeycode(event.keycode) : binding.keycode === event.keycode;
}

/** @param {number | HotkeyChord | null | undefined} binding */
function describeBinding(binding) {
  if (typeof binding === "number") return `keycode:${binding}`;
  if (!isHotkeyChord(binding)) return "none";
  return `chord:keycode=${binding.keycode ?? "modifiers-only"},mask=${binding.modifiers}`;
}

module.exports = { MODIFIER, chordFromEvent, describeBinding, isHotkeyChord, matchesKeyboardEvent, modifiersFromEvent };
