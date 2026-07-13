/**
 * @param {number} defaultMs
 * @param {() => number} [now]
 */
function createRateLimiter(defaultMs = 200, now = () => performance.now()) {
  /** @type {Map<string, number>} */
  const last = new Map();
  /** @param {string} key @param {number} [minimumMs] */
  return (key, minimumMs = defaultMs) => {
    const current = now();
    const previous = last.get(key);
    if (previous !== undefined && current - previous < minimumMs) return false;
    last.set(key, current);
    return true;
  };
}

module.exports = { createRateLimiter };
