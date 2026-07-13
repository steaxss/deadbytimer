/** @param {unknown} label */
function isAlphaNumLabel(label) {
  return typeof label === "string" && /^[A-Z0-9]$/.test(label);
}

/** @param {Electron.Input} input */
function makeLabelFromBeforeInput(input) {
  const key = input.key || "";
  if (/^F\d{1,2}$/.test(key)) return key;
  if (/^[a-z]$/.test(key)) return key.toUpperCase();
  if (/^\d$/.test(key)) return key;
  if (key === " ") return "SPACE";
  const labels = {
    Escape: "ESC",
    Tab: "TAB",
    Enter: "ENTER",
    Backspace: "BACKSPACE",
    Shift: "SHIFT",
    Control: "CTRL",
    Alt: "ALT",
    Meta: "META",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
  };
  if (key in labels) return labels[/** @type {keyof typeof labels} */ (key)];
  const code = input.code || "";
  if (/^Key[A-Z]$/.test(code)) return code.slice(3, 4);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  return key && key.length <= 6 ? key.toUpperCase() : code || "KEY";
}

/** @param {Electron.Input} input */
function makeChordLabelFromBeforeInput(input) {
  const keyLabel = makeLabelFromBeforeInput(input);
  const modifierLabels = [];
  if (input.control) modifierLabels.push("CTRL");
  if (input.alt) modifierLabels.push("ALT");
  if (input.shift) modifierLabels.push("SHIFT");
  if (input.meta) modifierLabels.push("META");
  const isModifier = /^(CTRL|ALT|SHIFT|META)$/.test(keyLabel);
  if (!isModifier) modifierLabels.push(keyLabel);
  return [...new Set(modifierLabels)].join("+");
}

module.exports = { isAlphaNumLabel, makeLabelFromBeforeInput, makeChordLabelFromBeforeInput };
