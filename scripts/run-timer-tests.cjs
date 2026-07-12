const assert = require("node:assert/strict");
const { PreciseTimer, formatMillisDynamic } = require("../.test-build/timer.js");

let now = 1_000;
const timer = new PreciseTimer(() => now);

timer.start();
now += 12_345.67;
assert.equal(timer.elapsedMs, 12_345.67);
timer.pause();
now += 60_000;
assert.equal(timer.elapsedMs, 12_345.67);
timer.start();
now += 500;
assert.equal(timer.elapsedMs, 12_845.67);
timer.reset();
assert.equal(timer.elapsedMs, 0);
assert.equal(timer.running, false);

timer.start();
now += 600_000.75;
assert.equal(timer.elapsedMs, 600_000.75);
assert.equal(formatMillisDynamic(timer.elapsedMs), "10:00.00");

assert.equal(formatMillisDynamic(0), "0.00");
assert.equal(formatMillisDynamic(9_999), "9.99");
assert.equal(formatMillisDynamic(60_010), "1:00.01");

console.log("PASS monotonic timer transitions, stall recovery, reset and formatting");
