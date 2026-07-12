import { app, BrowserWindow, ipcMain } from "electron";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { startStaticServer } from "./static-server.mjs";

const root = process.cwd();
const variant = process.env.PERF_PANEL_VARIANT ?? "current";
const output = join(root, "perf", "artifacts", `panel-metrics-${variant}`);
const profile = join(output, "profile");
const preload = join(root, "perf", "baseline", "preload.cjs");
const state = {
  timerData: {
    player1: { name: "Player 1", score: 0 },
    player2: { name: "Player 2", score: 0 },
  },
  settings: {
    x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true,
    nameTheme: "default", accentKey: "default",
    autoScoreEnabled: true, autoScoreThresholdSec: 25,
  },
};

await mkdir(profile, { recursive: true });
app.setPath("userData", profile);
ipcMain.handle("perf:get-state", () => state);
ipcMain.handle("perf:get-version", () => "3.3.0");
ipcMain.handle("perf:measure", () => true);

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function summarize(samples) {
  const records = samples.flatMap((sample) => sample.map((metric) => ({
    type: metric.type,
    cpu: metric.cpu.percentCPUUsage,
    workingSetKb: metric.memory.workingSetSize,
  })));
  const types = [...new Set(records.map((record) => record.type))];
  return types.map((type) => {
    const matching = records.filter((record) => record.type === type);
    return {
      type,
      cpuMean: matching.reduce((sum, record) => sum + record.cpu, 0) / matching.length,
      workingSetKbMean: matching.reduce((sum, record) => sum + record.workingSetKb, 0) / matching.length,
    };
  });
}

const server = await startStaticServer(join(root, "dist"));
let window = null;
try {
  await app.whenReady();
  window = new BrowserWindow({
    width: 1120, height: 820, x: -10_000, y: -10_000, show: true,
    frame: false, backgroundColor: "#09090b",
    webPreferences: {
      preload, contextIsolation: true, nodeIntegration: false, sandbox: true,
      backgroundThrottling: true,
    },
  });
  await window.loadURL(`${server.origin}/index.html`);
  await window.webContents.executeJavaScript("document.fonts.ready.then(() => true)");
  if (variant === "no-backdrop") {
    await window.webContents.executeJavaScript(`for (const element of document.querySelectorAll('*')) {
      const style = getComputedStyle(element);
      if (style.backdropFilter !== 'none') element.style.backdropFilter = 'none';
    }`);
  } else if (variant === "no-large-blur") {
    await window.webContents.executeJavaScript(`for (const element of document.querySelectorAll('.blur-3xl')) {
      element.style.filter = 'none';
    }`);
  }
  await wait(2000);
  const samples = [];
  for (let index = 0; index < 20; index += 1) {
    samples.push(app.getAppMetrics());
    await wait(500);
  }
  await writeFile(join(output, "metrics.json"), `${JSON.stringify({
    variant,
    generatedAt: new Date().toISOString(),
    samples: samples.length,
    summary: summarize(samples),
  }, null, 2)}\n`, "utf8");
} finally {
  if (window && !window.isDestroyed()) window.destroy();
  await server.close();
  app.quit();
}
