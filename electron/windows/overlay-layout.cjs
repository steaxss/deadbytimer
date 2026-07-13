const SNAP_THRESHOLD = 16;
const MAX_OVERSCAN = 96;

/** @typedef {{ x: number, y: number, width: number, height: number }} Bounds */
/** @typedef {{ id: number | string, bounds: Bounds }} Display */

/** @param {number} value @param {number} min @param {number} max */
function clamp(value, min, max) {
  return min > max ? Math.round((min + max) / 2) : Math.min(max, Math.max(min, value));
}

/** @param {Bounds} bounds @param {Display} display */
function clampToDisplay(bounds, display) {
  const area = display.bounds;
  const overscanX = Math.min(MAX_OVERSCAN, Math.max(0, bounds.width - 48));
  const overscanY = Math.min(MAX_OVERSCAN, Math.max(0, bounds.height - 48));
  return {
    ...bounds,
    x: Math.round(clamp(bounds.x, area.x - overscanX, area.x + area.width - bounds.width + overscanX)),
    y: Math.round(clamp(bounds.y, area.y - overscanY, area.y + area.height - bounds.height + overscanY)),
  };
}

/** @param {Bounds} bounds @param {readonly Display[]} displays */
function findBestDisplay(bounds, displays) {
  let best = null;
  let bestOverlap = 0;
  for (const display of displays) {
    const area = display.bounds;
    const overlapX = Math.max(0, Math.min(bounds.x + bounds.width, area.x + area.width) - Math.max(bounds.x, area.x));
    const overlapY = Math.max(0, Math.min(bounds.y + bounds.height, area.y + area.height) - Math.max(bounds.y, area.y));
    const overlap = overlapX * overlapY;
    if (overlap > bestOverlap) {
      best = display;
      bestOverlap = overlap;
    }
  }
  return best;
}

/** @param {{ x: number, y: number }} point @param {readonly Display[]} displays */
function findDisplayForPoint(point, displays) {
  return displays.find(({ bounds }) => point.x >= bounds.x && point.x < bounds.x + bounds.width
    && point.y >= bounds.y && point.y < bounds.y + bounds.height) || null;
}

/** @param {Bounds} bounds @param {{ x: number, y: number }} pointer @param {readonly Display[]} displays @param {Display} fallback */
function snapBounds(bounds, pointer, displays, fallback) {
  const display = findDisplayForPoint(pointer, displays) || findBestDisplay(bounds, displays) || fallback;
  const area = display.bounds;
  const targets = {
    left: area.x,
    right: area.x + area.width - bounds.width,
    top: area.y,
    bottom: area.y + area.height - bounds.height,
    centerX: area.x + Math.round((area.width - bounds.width) / 2),
    centerY: area.y + Math.round((area.height - bounds.height) / 2),
  };
  let x = bounds.x;
  let y = bounds.y;
  const snapped = [];
  if (Math.abs(bounds.x - targets.left) <= SNAP_THRESHOLD) { x = targets.left; snapped.push("left"); }
  else if (Math.abs(bounds.x - targets.right) <= SNAP_THRESHOLD) { x = targets.right; snapped.push("right"); }
  else if (Math.abs(bounds.x - targets.centerX) <= SNAP_THRESHOLD) { x = targets.centerX; snapped.push("center-x"); }
  if (Math.abs(bounds.y - targets.top) <= SNAP_THRESHOLD) { y = targets.top; snapped.push("top"); }
  else if (Math.abs(bounds.y - targets.bottom) <= SNAP_THRESHOLD) { y = targets.bottom; snapped.push("bottom"); }
  else if (Math.abs(bounds.y - targets.centerY) <= SNAP_THRESHOLD) { y = targets.centerY; snapped.push("center-y"); }
  return { bounds: clampToDisplay({ ...bounds, x, y }, display), snapTarget: snapped.join("-") || null };
}

module.exports = { clampToDisplay, findBestDisplay, findDisplayForPoint, snapBounds };
