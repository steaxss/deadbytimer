/**
 * @template T
 * @param {{ write: (value: T) => void, delayMs?: number }} options
 */
function createDeferredWriter({ write, delayMs = 150 }) {
  /** @type {T | undefined} */ let pending;
  /** @type {ReturnType<typeof setTimeout> | null} */ let timer = null;

  function flush() {
    if (timer) clearTimeout(timer);
    timer = null;
    if (pending === undefined) return;
    const value = pending;
    pending = undefined;
    write(value);
  }

  /** @param {T} value */
  function schedule(value) {
    pending = value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, delayMs);
    timer.unref?.();
  }

  return { schedule, flush };
}

module.exports = { createDeferredWriter };
