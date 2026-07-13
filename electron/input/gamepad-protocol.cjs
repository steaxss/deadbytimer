const PROTOCOL_VERSION = "DBT1";
const EVENT_NAMES = new Set([
  "BTN A",
  "BTN B",
  "BTN BACK",
  "BTN LB",
  "BTN LS",
  "BTN RB",
  "BTN RS",
  "BTN START",
  "BTN X",
  "BTN Y",
  "DPAD DOWN",
  "DPAD LEFT",
  "DPAD RIGHT",
  "DPAD UP",
  "TRIGGER LT",
  "TRIGGER RT",
  "AXIS LX_NEG",
  "AXIS LX_POS",
  "AXIS LY_NEG",
  "AXIS LY_POS",
  "AXIS RX_NEG",
  "AXIS RX_POS",
  "AXIS RY_NEG",
  "AXIS RY_POS",
]);

/** @param {unknown} line */
function parseGamepadProtocolLine(line) {
  if (typeof line !== "string" || line.length > 64) return null;
  const separator = line.indexOf("\t");
  if (separator <= 0 || line.indexOf("\t", separator + 1) !== -1) return null;
  if (line.slice(0, separator) !== PROTOCOL_VERSION) return null;
  const eventName = line.slice(separator + 1);
  return EVENT_NAMES.has(eventName) ? eventName : null;
}

module.exports = { PROTOCOL_VERSION, parseGamepadProtocolLine };
