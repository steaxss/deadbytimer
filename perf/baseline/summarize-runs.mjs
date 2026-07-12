import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const artifacts = join(import.meta.dirname, "..", "artifacts");
const output = join(artifacts, "phase-0", "ab-runtime-summary.json");

function percentile(values, fraction) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
}

function stats(values) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length;
  return { count: values.length, mean, median: percentile(values, 0.5), min: Math.min(...values), max: Math.max(...values), standardDeviation: Math.sqrt(variance) };
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function collect(prefix) {
  const directories = (await readdir(artifacts, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(prefix))
    .map((entry) => entry.name)
    .sort();
  const records = [];
  for (const directory of directories) {
    const metricsDirectory = join(artifacts, directory, "metrics");
    for (const file of await readdir(metricsDirectory)) {
      if (!file.startsWith("overlay-") || !file.endsWith(".json")) continue;
      const result = await readJson(join(metricsDirectory, file));
      for (const process of result.metrics.summary) {
        records.push({ run: directory, scenario: result.name, type: process.type, cpuMean: process.cpuPercent.mean, workingSetKbMean: process.workingSetKb.mean });
      }
      if (result.timerCadence) records.push({ run: directory, scenario: result.name, type: "TimerCadence", intervalMean: result.timerCadence.summary.mean, intervalP99: result.timerCadence.summary.p99, intervalMax: result.timerCadence.summary.max });
    }
  }
  const groups = Object.groupBy(records, (record) => `${record.scenario}:${record.type}`);
  return {
    runs: directories.length,
    groups: Object.fromEntries(Object.entries(groups).map(([key, values]) => [key, {
      cpuMean: values[0].cpuMean === undefined ? null : stats(values.map((value) => value.cpuMean)),
      workingSetKbMean: values[0].workingSetKbMean === undefined ? null : stats(values.map((value) => value.workingSetKbMean)),
      intervalMean: values[0].intervalMean === undefined ? null : stats(values.map((value) => value.intervalMean)),
      intervalP99: values[0].intervalP99 === undefined ? null : stats(values.map((value) => value.intervalP99)),
      intervalMax: values[0].intervalMax === undefined ? null : stats(values.map((value) => value.intervalMax)),
    }]))
  };
}

const clean = await collect("phase-0-clean-run-");
const obfuscated = await collect("phase-0-obfuscated-run-");
await writeFile(output, `${JSON.stringify({ clean, obfuscated }, null, 2)}\n`, "utf8");
console.log(output);
