import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const artifactDirectory = join(root, "perf", "artifacts", "soak-8h");
const reportPath = join(artifactDirectory, "report.json");
const analysisPath = join(artifactDirectory, "analysis.json");
const processMonitorPath = join(artifactDirectory, "process-monitor.json");
const minimumDurationMs = 7.9 * 60 * 60 * 1000;
const warmupMs = 30 * 60 * 1000;
const maximumPrivateSlopeMbPerHour = 1;

function linearSlope(points) {
  if (points.length < 2) return null;
  const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  let numerator = 0;
  let denominator = 0;
  for (const point of points) {
    numerator += (point.x - meanX) * (point.y - meanY);
    denominator += (point.x - meanX) ** 2;
  }
  return denominator === 0 ? null : numerator / denominator;
}

async function readJson(path) {
  return JSON.parse((await readFile(path, "utf8")).replace(/^\uFEFF/u, ""));
}

function processAnalysis(samples, type, startedAtMs) {
  const observations = samples.flatMap((sample) => {
    const metric = sample.processes.find((process) => process.type === type);
    if (!metric || sample.atMs - startedAtMs < warmupMs) return [];
    return [{
      x: (sample.atMs - startedAtMs) / 3_600_000,
      y: metric.privateBytesKb / 1024,
      pid: metric.pid,
    }];
  });
  const privateValues = observations.map((point) => point.y);
  const slope = linearSlope(observations);
  return {
    type,
    samplesAfterWarmup: observations.length,
    pids: [...new Set(observations.map((point) => point.pid))],
    privateMb: privateValues.length === 0 ? null : {
      first: privateValues[0],
      last: privateValues.at(-1),
      minimum: Math.min(...privateValues),
      maximum: Math.max(...privateValues),
      slopePerHour: slope,
    },
    stablePid: new Set(observations.map((point) => point.pid)).size === 1,
  };
}

function relativeChange(first, last) {
  return first === 0 ? (last === 0 ? 0 : null) : (last - first) / first;
}

function analyzeProcessMonitor(monitor) {
  if (!monitor || !Array.isArray(monitor.samples)) return null;
  const types = [...new Set(monitor.samples.flatMap((sample) =>
    sample.processes.map((process) => process.type)
  ))];
  const processes = types.map((type) => {
    const observations = monitor.samples.flatMap((sample) => {
      const process = sample.processes.find((candidate) => candidate.type === type);
      return process ? [process] : [];
    });
    const first = observations[0];
    const last = observations.at(-1);
    const handles = observations.map((process) => process.handles);
    const threads = observations.map((process) => process.threads);
    return {
      type,
      samples: observations.length,
      pids: [...new Set(observations.map((process) => process.pid))],
      handles: first && last ? {
        first: first.handles,
        last: last.handles,
        minimum: Math.min(...handles),
        maximum: Math.max(...handles),
        finalChangeRatio: relativeChange(first.handles, last.handles),
      } : null,
      threads: first && last ? {
        first: first.threads,
        last: last.threads,
        minimum: Math.min(...threads),
        maximum: Math.max(...threads),
        finalChangeRatio: relativeChange(first.threads, last.threads),
      } : null,
    };
  });
  return {
    status: monitor.status,
    error: monitor.error,
    sampleCount: monitor.samples.length,
    processes,
    stablePids: processes.every((process) => process.pids.length === 1),
    stableHandles: processes.every((process) =>
      process.handles && Math.abs(process.handles.finalChangeRatio) <= 0.05
    ),
    stableThreads: processes.every((process) =>
      process.threads && Math.abs(process.threads.finalChangeRatio) <= 0.05
    ),
  };
}

const report = await readJson(reportPath);
let processMonitor = null;
try {
  processMonitor = await readJson(processMonitorPath);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
const samples = Array.isArray(report.samples) ? report.samples : [];
const startedAtMs = Date.parse(report.startedAt);
const lastAtMs = samples.at(-1)?.atMs ?? startedAtMs;
const durationMs = lastAtMs - startedAtMs;
const processTypes = [...new Set(samples.flatMap((sample) =>
  sample.processes.map((process) => process.type)
))];
const processes = processTypes.map((type) => processAnalysis(samples, type, startedAtMs));
const totalPoints = samples.flatMap((sample) => {
  if (sample.atMs - startedAtMs < warmupMs) return [];
  const totalPrivateMb = sample.processes.reduce(
    (sum, process) => sum + process.privateBytesKb / 1024,
    0,
  );
  return [{ x: (sample.atMs - startedAtMs) / 3_600_000, y: totalPrivateMb }];
});
const totalPrivateSlopeMbPerHour = linearSlope(totalPoints);
const monitorAnalysis = analyzeProcessMonitor(processMonitor);
const checks = {
  completed: report.status === "complete" && !report.error,
  duration: durationMs >= minimumDurationMs,
  sufficientPostWarmupSamples: totalPoints.length >= 60,
  stableProcesses: processes.every((process) => process.stablePid),
  privateSlope: totalPrivateSlopeMbPerHour !== null
    && totalPrivateSlopeMbPerHour < maximumPrivateSlopeMbPerHour,
  processMonitorComplete: monitorAnalysis?.status === "complete" && !monitorAnalysis.error,
  stableOsPids: monitorAnalysis?.stablePids === true,
  stableHandles: monitorAnalysis?.stableHandles === true,
  stableThreads: monitorAnalysis?.stableThreads === true,
};
const analysis = {
  generatedAt: new Date().toISOString(),
  reportPath,
  status: report.status,
  error: report.error,
  cycles: report.cycles,
  sampleCount: samples.length,
  durationMs,
  warmupMs,
  budget: { maximumPrivateSlopeMbPerHour },
  totalPrivateSlopeMbPerHour,
  processes,
  processMonitor: monitorAnalysis,
  checks,
  passed: Object.values(checks).every(Boolean),
};

await writeFile(analysisPath, `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
console.log(JSON.stringify(analysis, null, 2));
if (!analysis.passed) process.exitCode = 1;
