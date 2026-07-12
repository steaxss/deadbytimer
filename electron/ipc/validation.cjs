const ACCENTS = new Set([
  "default", "rose", "rouge", "orange", "or", "jaune", "vert", "menthe",
  "bleu_fonce", "bleu_clair", "cyan", "violet", "lavande", "marron",
  "anthracite", "argent", "corail", "turquoise", "indigo", "fuchsia",
  "emeraude", "peche", "pride",
]);

/** @param {unknown} value */
function record(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new TypeError("Expected an object");
  return /** @type {Record<string, unknown>} */ (value);
}

/** @param {Record<string, unknown>} input @param {readonly string[]} allowed @param {string} contract */
function exactKeys(input, allowed, contract) {
  const keys = new Set(allowed);
  for (const key of Object.keys(input)) {
    if (!keys.has(key)) throw new TypeError(`Unknown ${contract} field: ${key}`);
  }
}

/** @param {unknown} value @param {string} field */
function finiteNumber(value, field) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError(`${field} must be finite`);
  return value;
}

/** @param {unknown} value */
function parseOverlayPatch(value) {
  const input = record(value);
  const allowed = new Set(["x", "y", "scale", "locked", "alwaysOnTop", "nameTheme", "accentKey", "autoScoreEnabled", "autoScoreThresholdSec"]);
  for (const key of Object.keys(input)) if (!allowed.has(key)) throw new TypeError(`Unknown overlay setting: ${key}`);
  /** @type {Record<string, string | number | boolean>} */
  const output = {};
  for (const key of ["x", "y"]) if (input[key] !== undefined) output[key] = finiteNumber(input[key], key);
  if (input.scale !== undefined) {
    const scale = finiteNumber(input.scale, "scale");
    if (scale < 50 || scale > 200) throw new RangeError("scale must be between 50 and 200");
    output.scale = scale;
  }
  for (const key of ["locked", "alwaysOnTop", "autoScoreEnabled"]) {
    if (input[key] !== undefined) {
      if (typeof input[key] !== "boolean") throw new TypeError(`${key} must be boolean`);
      output[key] = input[key];
    }
  }
  if (input.nameTheme !== undefined) {
    if (!(["default", "dark", "white"].includes(/** @type {string} */ (input.nameTheme)))) throw new TypeError("Invalid nameTheme");
    output.nameTheme = /** @type {string} */ (input.nameTheme);
  }
  if (input.accentKey !== undefined) {
    if (typeof input.accentKey !== "string" || !ACCENTS.has(input.accentKey)) throw new TypeError("Invalid accentKey");
    output.accentKey = input.accentKey;
  }
  if (input.autoScoreThresholdSec !== undefined) {
    const threshold = finiteNumber(input.autoScoreThresholdSec, "autoScoreThresholdSec");
    if (threshold < 0 || threshold > 3600) throw new RangeError("Invalid auto-score threshold");
    output.autoScoreThresholdSec = threshold;
  }
  return output;
}

/** @param {unknown} value */
function parseTimerData(value) {
  const input = record(value);
  exactKeys(input, ["player1", "player2"], "timer");
  /** @param {"player1" | "player2"} key */
  const player = (key) => {
    const data = record(input[key]);
    exactKeys(data, ["name", "score"], key);
    if (typeof data.name !== "string" || data.name.length > 32) throw new TypeError(`Invalid ${key} name`);
    if (!Number.isSafeInteger(data.score) || /** @type {number} */ (data.score) < 0) throw new TypeError(`Invalid ${key} score`);
    return { name: data.name, score: /** @type {number} */ (data.score) };
  };
  return { player1: player("player1"), player2: player("player2") };
}

/** @param {unknown} value */
function parseHotkeyPatch(value) {
  const input = record(value);
  exactKeys(input, ["start", "swap"], "hotkey");
  /** @type {{ start?: number | null, swap?: number | null }} */ const output = {};
  for (const key of ["start", "swap"]) {
    if (input[key] === undefined) continue;
    if (input[key] !== null && (!Number.isSafeInteger(input[key]) || /** @type {number} */ (input[key]) < 0 || /** @type {number} */ (input[key]) > 0xffff)) throw new TypeError(`Invalid ${key} hotkey`);
    output[/** @type {"start" | "swap"} */ (key)] = /** @type {number | null} */ (input[key]);
  }
  return output;
}

/** @param {unknown} value */
function parseDimensions(value) {
  const input = record(value);
  exactKeys(input, ["width", "height"], "dimensions");
  const width = finiteNumber(input.width, "width");
  const height = finiteNumber(input.height, "height");
  if (width <= 0 || height <= 0 || width > 10_000 || height > 10_000) {
    throw new RangeError("Invalid dimensions");
  }
  return { width, height };
}

/** @param {unknown} value */
function parsePointer(value) {
  const input = record(value);
  exactKeys(input, ["x", "y"], "pointer");
  const x = finiteNumber(input.x, "x");
  const y = finiteNumber(input.y, "y");
  if (Math.abs(x) > 1_000_000 || Math.abs(y) > 1_000_000) throw new RangeError("Invalid pointer");
  return { x: Math.round(x), y: Math.round(y) };
}

module.exports = { parseOverlayPatch, parseTimerData, parseHotkeyPatch, parseDimensions, parsePointer };
