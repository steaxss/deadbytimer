const { rmSync } = require("node:fs");
const { join, parse } = require("node:path");

const MAX_TOTAL_BYTES = 500 * 1024;
const ROTATE_AT_BYTES = 448 * 1024;
const RETAIN_BYTES = 128 * 1024;
const MAX_TEXT_CHARS = 12 * 1024;

/** @param {string} value @param {number} limit */
function truncateText(value, limit = MAX_TEXT_CHARS) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit)}… [truncated ${value.length - limit} chars]`;
}

/** @param {unknown} value */
function sanitizeValue(value) {
  if (typeof value === "string") return truncateText(value);
  if (value instanceof Error) {
    return truncateText(`${value.name}: ${value.message}${value.stack ? `\n${value.stack}` : ""}`);
  }
  if (Buffer.isBuffer(value)) return `[Buffer: ${value.length} bytes]`;
  return value;
}

/** @param {typeof import("electron-log")} log @param {{ development: boolean }} options */
function configureLogging(log, { development }) {
  const transport = log.transports.file;
  transport.level = development ? "debug" : "info";
  transport.maxSize = ROTATE_AT_BYTES;
  transport.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  transport.inspectOptions = {
    depth: 4,
    maxArrayLength: 50,
    maxStringLength: 4096,
    breakLength: 160,
  };
  transport.archiveLogFn = (file) => {
    /** @type {import("electron-log").LogFile & { crop: (bytesAfter: number) => void }} */ (file).crop(RETAIN_BYTES);
  };

  log.hooks.push((message, _transport, transportName) => {
    if (transportName !== "file") return message;
    return { ...message, data: message.data.slice(0, 12).map(sanitizeValue) };
  });

  const file = transport.getFile();
  const info = parse(file.path);
  rmSync(join(info.dir, `${info.name}.old${info.ext}`), { force: true });
  if (file.size > MAX_TOTAL_BYTES) {
    /** @type {import("electron-log").LogFile & { crop: (bytesAfter: number) => void }} */ (file).crop(RETAIN_BYTES);
  }
}

module.exports = {
  MAX_TOTAL_BYTES,
  RETAIN_BYTES,
  ROTATE_AT_BYTES,
  configureLogging,
  truncateText,
};
