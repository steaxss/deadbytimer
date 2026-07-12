import { app, BrowserWindow, ipcMain } from "electron";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { cpus, release, totalmem } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { startStaticServer } from "./static-server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const output = join(root, "perf", "artifacts", "soak-8h");
const durationMs = Number(process.env.PERF_SOAK_SECONDS ?? 8 * 60 * 60) * 1000;
const cycleMs = Number(process.env.PERF_SOAK_CYCLE_MS ?? 2000);
const sampleMs = Number(process.env.PERF_SOAK_SAMPLE_MS ?? 60_000);
const startedAt = new Date().toISOString();
const samples = [];
let cycles = 0;
let state = {
  settings: { x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true, nameTheme: "default", accentKey: "default", autoScoreEnabled: true, autoScoreThresholdSec: 25 },
  timerData: { player1: { name: "PLAYER 1", score: 0 }, player2: { name: "PLAYER 2", score: 0 } },
};

app.on("window-all-closed", () => {});
ipcMain.handle("perf:get-state", () => state);
ipcMain.handle("perf:measure", () => true);

function snapshotMetrics() {
  return app.getAppMetrics().map((metric) => ({
    pid: metric.pid,
    type: metric.type,
    cpuPercent: metric.cpu.percentCPUUsage,
    workingSetKb: metric.memory.workingSetSize,
    peakWorkingSetKb: metric.memory.peakWorkingSetSize,
    privateBytesKb: metric.memory.privateBytes,
    idleWakeupsPerSecond: metric.cpu.idleWakeupsPerSecond,
  }));
}

async function checkpoint(status, error = null) {
  const report = {
    status, error, startedAt, updatedAt: new Date().toISOString(), durationMs,
    cycles, samples, environment: { versions: process.versions, windows: release(), cpu: cpus()[0]?.model, logicalProcessors: cpus().length, totalMemoryBytes: totalmem() },
  };
  const temporary = join(output, "report.json.tmp");
  await writeFile(temporary, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await rename(temporary, join(output, "report.json"));
}

async function run() {
  await mkdir(output, { recursive: true });
  const server = await startStaticServer(join(root, "dist"));
  const window = new BrowserWindow({
    width: 522, height: 121, x: -10_000, y: -10_000, show: true, frame: false, transparent: true,
    resizable: false, useContentSize: true,
    webPreferences: { preload: join(here, "preload.cjs"), contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false, webgl: false },
  });
  try {
    await window.loadURL(`${server.origin}/overlay.html`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    samples.push({ atMs: Date.now(), processes: snapshotMetrics() });
    await checkpoint("running");

    const cycle = setInterval(() => {
      const action = cycles % 4 === 3 ? "swap" : "toggle";
      window.webContents.send("perf:hotkey", { type: action });
      cycles += 1;
      if (cycles % 10 === 0) {
        const long = cycles % 20 === 0;
        state = { ...state, timerData: long
          ? { player1: { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", score: cycles % 100 }, player2: { name: "ZYXWVUTSRQPONMLKJIHGFEDCBA654321", score: cycles % 100 } }
          : { player1: { name: "PLAYER 1", score: cycles % 100 }, player2: { name: "PLAYER 2", score: cycles % 100 } } };
        window.webContents.send("perf:timer-data", state.timerData);
      }
      if (cycles % 15 === 0) {
        state = { ...state, settings: { ...state.settings, locked: !state.settings.locked } };
        window.webContents.send("perf:settings", state.settings);
      }
      if (cycles % 20 === 0) window.hide();
      if (cycles % 20 === 1) window.showInactive();
    }, cycleMs);
    const sample = setInterval(() => {
      samples.push({ atMs: Date.now(), processes: snapshotMetrics() });
      void checkpoint("running");
    }, sampleMs);
    await new Promise((resolve) => setTimeout(resolve, durationMs));
    clearInterval(cycle);
    clearInterval(sample);
    samples.push({ atMs: Date.now(), processes: snapshotMetrics() });
    await checkpoint("complete");
  } finally {
    if (!window.isDestroyed()) window.destroy();
    await server.close();
  }
}

app.whenReady().then(run).then(() => app.quit()).catch(async (error) => {
  await mkdir(output, { recursive: true });
  await checkpoint("failed", error instanceof Error ? error.stack : String(error));
  app.exit(1);
});
