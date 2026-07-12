import { app, BrowserWindow, contentTracing, ipcMain, screen } from "electron";
import { createHash } from "node:crypto";
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { cpus, freemem, platform, release, totalmem } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { startStaticServer } from "./static-server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const variant = process.env.PERF_VARIANT ?? "phase-0";
const metricsOnly = process.argv.includes("--metrics-only");
const outputRoot = join(root, "perf", "artifacts", variant);
const goldenDir = join(outputRoot, "golden");
const metricsDir = join(outputRoot, "metrics");
const traceDir = join(outputRoot, "traces");
const preload = join(here, "preload.cjs");
const distRoot = join(root, "dist");
let overlayUrl = null;

const defaultSettings = Object.freeze({
  x: 0,
  y: 0,
  scale: 100,
  locked: true,
  alwaysOnTop: true,
  nameTheme: "default",
  accentKey: "default",
  autoScoreEnabled: true,
  autoScoreThresholdSec: 25,
});
const defaultTimerData = Object.freeze({
  player1: { name: "PLAYER 1", score: 0 },
  player2: { name: "PLAYER 2", score: 0 },
});
const accentKeys = [
  "default", "rose", "rouge", "orange", "or", "jaune", "vert",
  "menthe", "bleu_fonce", "bleu_clair", "cyan", "violet", "lavande",
  "marron", "anthracite", "argent", "corail", "turquoise", "indigo",
  "fuchsia", "emeraude", "peche", "pride",
];

const states = new Map();
const liveWindows = new Set();
const captures = [];
const warnings = [];
const progressFile = join(outputRoot, "progress.log");

if (process.env.PERF_DISABLE_GLOBAL_THROTTLING !== "0") {
  app.commandLine.appendSwitch("disable-background-timer-throttling");
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function progress(message) {
  await appendFile(progressFile, `${new Date().toISOString()} ${message}\n`, "utf8");
}

function percentile(values, fraction) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
}

function summarize(values) {
  const usable = values.filter(Number.isFinite);
  if (usable.length === 0) return null;
  const sum = usable.reduce((total, value) => total + value, 0);
  return {
    count: usable.length,
    min: Math.min(...usable),
    mean: sum / usable.length,
    p50: percentile(usable, 0.5),
    p95: percentile(usable, 0.95),
    p99: percentile(usable, 0.99),
    max: Math.max(...usable),
  };
}

function contentSize(settings) {
  const scale = settings.scale / 100;
  return {
    width: Math.round(520 * scale),
    height: Math.round((120 + (settings.locked ? 0 : 30)) * scale),
  };
}

async function createOverlay(overrides = {}) {
  const settings = { ...defaultSettings, ...overrides.settings };
  const timerData = structuredClone(overrides.timerData ?? defaultTimerData);
  const size = contentSize(settings);
  const win = new BrowserWindow({
    ...size,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,
    acceptFirstMouse: true,
    backgroundColor: "#00000000",
    useContentSize: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload,
      backgroundThrottling: false,
      devTools: false,
      webgl: false,
      enableWebSQL: false,
    },
  });
  liveWindows.add(win);
  win.once("closed", () => liveWindows.delete(win));
  states.set(win.webContents.id, { settings, timerData });
  win.webContents.on("did-fail-load", (_event, code, description, url, isMainFrame) => {
    console.error("did-fail-load", { code, description, url, isMainFrame });
  });
  win.webContents.on("render-process-gone", (_event, details) => {
    console.error("render-process-gone", details);
  });
  win.webContents.on("console-message", (_event, level, message) => {
    if (level >= 2) console.error("renderer-console", { level, message });
  });
  win.setIgnoreMouseEvents(settings.locked, { forward: true });
  win.setAlwaysOnTop(settings.alwaysOnTop, "screen-saver");
  await win.loadURL(overlayUrl);
  await win.webContents.executeJavaScript("document.fonts.ready.then(() => true)");
  win.webContents.send("perf:settings", settings);
  win.webContents.send("perf:timer-data", timerData);
  await wait(180);
  return win;
}

async function applyState(win, patch) {
  const state = states.get(win.webContents.id);
  if (patch.settings) {
    state.settings = { ...state.settings, ...patch.settings };
    const size = contentSize(state.settings);
    win.setContentSize(size.width, size.height);
    win.webContents.send("perf:settings", state.settings);
  }
  if (patch.timerData) {
    state.timerData = structuredClone(patch.timerData);
    win.webContents.send("perf:timer-data", state.timerData);
  }
  await wait(140);
}

async function snapshotDom(win) {
  return win.webContents.executeJavaScript(`(() => {
    const select = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        className: element.className,
        text: element.textContent,
        style: {
          color: style.color, background: style.background,
          fontFamily: style.fontFamily, fontSize: style.fontSize,
          fontWeight: style.fontWeight, lineHeight: style.lineHeight,
          textShadow: style.textShadow, transform: style.transform,
          opacity: style.opacity, display: style.display,
        },
      };
    };
    return {
      viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
      root: select('#root'), container: select('#timerContainer'),
      leftName: select('.name.left'), rightName: select('.name.right'),
      score: select('.score-value'), leftTimer: select('.timer.left'),
      rightTimer: select('.timer.right'), dragHandle: select('.drag-handle'),
    };
  })()`);
}

async function capture(win, name) {
  const image = await win.webContents.capturePage();
  const png = image.toPNG();
  const file = join(goldenDir, `${name}.png`);
  await writeFile(file, png);
  const dom = await snapshotDom(win);
  const domFile = join(goldenDir, `${name}.json`);
  await writeFile(domFile, `${JSON.stringify(dom, null, 2)}\n`, "utf8");
  captures.push({
    name,
    png: file.slice(root.length + 1).replaceAll("\\", "/"),
    dom: domFile.slice(root.length + 1).replaceAll("\\", "/"),
    sha256: createHash("sha256").update(png).digest("hex"),
    bytes: png.length,
    size: image.getSize(),
  });
}

async function collectGoldenMaster() {
  await progress("golden: static overlay start");
  const win = await createOverlay();
  try {
    for (const scale of [50, 75, 100, 125, 150, 200]) {
      await applyState(win, { settings: { scale, locked: true } });
      await capture(win, `scale-${scale}-locked`);
    }
    await applyState(win, { settings: { scale: 100, locked: false } });
    await capture(win, "scale-100-unlocked");
    for (const nameTheme of ["default", "dark", "white"]) {
      await applyState(win, { settings: { locked: true, nameTheme } });
      await capture(win, `theme-${nameTheme}`);
    }
    for (const accentKey of accentKeys) {
      await applyState(win, { settings: { nameTheme: "default", accentKey } });
      await capture(win, `accent-${accentKey}`);
    }
    const nameCases = [
      ["names-empty", "", ""],
      ["names-unicode", "ÉLODIE_日本🎮", "ЗАРИНА_한글"],
      ["names-32-chars", "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", "ZYXWVUTSRQPONMLKJIHGFEDCBA654321"],
    ];
    for (const [name, player1, player2] of nameCases) {
      await applyState(win, {
        timerData: { player1: { name: player1, score: 12 }, player2: { name: player2, score: 34 } },
      });
      await capture(win, name);
    }
    await applyState(win, {
      timerData: { player1: { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", score: 0 }, player2: { name: "ZYXWVUTSRQPONMLKJIHGFEDCBA654321", score: 0 } },
    });
    for (const [index, delay] of [0, 250, 750, 1500].entries()) {
      if (delay > 0) await wait(delay - [0, 250, 750, 1500][index - 1]);
      await capture(win, `scroll-frame-${String(index).padStart(2, "0")}`);
    }
  } finally {
    win.destroy();
  }

  await progress("golden: timer states start");
  const timerWin = await createOverlay();
  try {
    for (let index = 0; index < 4; index += 1) {
      if (index > 0) await wait(250);
      await capture(timerWin, `pulse-frame-${String(index).padStart(2, "0")}`);
    }
    timerWin.webContents.send("perf:hotkey", { type: "toggle" });
    await wait(120);
    await capture(timerWin, "timer-running-left");
    timerWin.webContents.send("perf:hotkey", { type: "toggle" });
    await wait(80);
    await capture(timerWin, "timer-paused-left");
    timerWin.webContents.send("perf:hotkey", { type: "toggle" });
    timerWin.webContents.send("perf:hotkey", { type: "swap" });
    await wait(80);
    await capture(timerWin, "timer-stopped-active-right");

    const clockInstalled = await timerWin.webContents.executeJavaScript(`(() => {
      try {
        const realNow = performance.now.bind(performance);
        window.__baselineClockOffset = 0;
        Object.defineProperty(performance, 'now', {
          configurable: true,
          value: () => realNow() + window.__baselineClockOffset,
        });
        return true;
      } catch { return false; }
    })()`);
    if (clockInstalled) {
      timerWin.webContents.send("perf:hotkey", { type: "swap" });
      timerWin.webContents.send("perf:hotkey", { type: "toggle" });
      await timerWin.webContents.executeJavaScript("window.__baselineClockOffset = 21000");
      timerWin.webContents.send("perf:hotkey", { type: "toggle" });
      timerWin.webContents.send("perf:hotkey", { type: "swap" });
      timerWin.webContents.send("perf:hotkey", { type: "toggle" });
      await timerWin.webContents.executeJavaScript("window.__baselineClockOffset = 22000");
      await wait(100);
      await capture(timerWin, "timer-warn20");
      await timerWin.webContents.executeJavaScript("window.__baselineClockOffset = 32000");
      await wait(100);
      await capture(timerWin, "timer-warn10");
      await timerWin.webContents.executeJavaScript("window.__baselineClockOffset = 43000");
      await wait(100);
      await capture(timerWin, "timer-winning");
    } else warnings.push("Unable to install the test-only monotonic clock offset; warning states skipped.");
  } finally {
    timerWin.destroy();
  }
  await progress("golden: complete");
}

function normalizeMetric(metric) {
  return {
    pid: metric.pid,
    type: metric.type,
    cpuPercent: metric.cpu?.percentCPUUsage ?? null,
    idleWakeupsPerSecond: metric.cpu?.idleWakeupsPerSecond ?? null,
    workingSetKb: metric.memory?.workingSetSize ?? null,
    peakWorkingSetKb: metric.memory?.peakWorkingSetSize ?? null,
    privateBytesKb: metric.memory?.privateBytes ?? null,
  };
}

async function sampleAppMetrics(durationMs, cadenceMs = 500) {
  app.getAppMetrics();
  await wait(cadenceMs);
  const samples = [];
  const deadline = Date.now() + durationMs;
  while (Date.now() < deadline) {
    samples.push({ atMs: Date.now(), processes: app.getAppMetrics().map(normalizeMetric) });
    await wait(cadenceMs);
  }
  const byProcess = new Map();
  for (const sample of samples) {
    for (const processMetric of sample.processes) {
      const key = `${processMetric.type}:${processMetric.pid}`;
      if (!byProcess.has(key)) byProcess.set(key, []);
      byProcess.get(key).push(processMetric);
    }
  }
  const summary = [...byProcess.entries()].map(([key, values]) => ({
    key,
    type: values[0].type,
    pid: values[0].pid,
    cpuPercent: summarize(values.map((value) => value.cpuPercent)),
    workingSetKb: summarize(values.map((value) => value.workingSetKb)),
    privateBytesKb: summarize(values.map((value) => value.privateBytesKb)),
    idleWakeupsPerSecond: summarize(values.map((value) => value.idleWakeupsPerSecond)),
  }));
  return { cadenceMs, durationMs, samples, summary };
}

async function observeTimerCadence(win, durationMs) {
  return win.webContents.executeJavaScript(`new Promise((resolve) => {
    const times = [];
    const target = document.querySelector('.timer-text');
    const observer = new MutationObserver(() => times.push(performance.now()));
    observer.observe(target, { subtree: true, characterData: true, childList: true, attributes: true });
    setTimeout(() => {
      observer.disconnect();
      const intervals = times.slice(1).map((time, index) => time - times[index]);
      resolve({ mutations: times.length, intervals });
    }, ${durationMs});
  })`);
}

async function collectScenario(name, configure, options = {}) {
  const win = await createOverlay(options.initial ?? {});
  try {
    await configure(win);
    await wait(1000);
    const durationMs = options.durationMs ?? 5000;
    const tasks = [sampleAppMetrics(durationMs)];
    if (options.timerCadence) tasks.push(observeTimerCadence(win, durationMs));
    const [metrics, cadence] = await Promise.all(tasks);
    const result = { name, metrics, timerCadence: cadence ?? null };
    if (cadence) result.timerCadence.summary = summarize(cadence.intervals);
    await writeFile(join(metricsDir, `${name}.json`), `${JSON.stringify(result, null, 2)}\n`, "utf8");
    return result;
  } finally {
    win.destroy();
  }
}

async function collectPerformance() {
  await progress("metrics: scenarios start");
  const scenarios = [];
  scenarios.push(await collectScenario("overlay-idle-short", async () => {}));
  scenarios.push(await collectScenario("overlay-running-short", async (win) => {
    win.webContents.send("perf:hotkey", { type: "toggle" });
  }, { durationMs: 10000, timerCadence: true }));
  scenarios.push(await collectScenario("overlay-idle-scrolling", async () => {}, {
    initial: { timerData: { player1: { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", score: 0 }, player2: { name: "ZYXWVUTSRQPONMLKJIHGFEDCBA654321", score: 0 } } },
  }));

  const traceWin = await createOverlay({
    timerData: { player1: { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", score: 0 }, player2: { name: "ZYXWVUTSRQPONMLKJIHGFEDCBA654321", score: 0 } },
  });
  try {
    traceWin.webContents.send("perf:hotkey", { type: "toggle" });
    await wait(800);
    await contentTracing.startRecording({
      included_categories: ["electron", "toplevel", "blink", "cc", "gpu", "disabled-by-default-devtools.timeline"],
      recording_mode: "record-until-full",
    });
    await wait(5000);
    await contentTracing.stopRecording(join(traceDir, "overlay-running-scrolling.json"));
  } finally {
    traceWin.destroy();
  }
  await progress("metrics: complete");
  return scenarios;
}

async function main() {
  await Promise.all([goldenDir, metricsDir, traceDir].map((directory) => mkdir(directory, { recursive: true })));
  await writeFile(progressFile, "", "utf8");
  const startedAt = new Date().toISOString();
  const server = await startStaticServer(distRoot);
  overlayUrl = `${server.origin}/overlay.html`;
  try {
    if (!metricsOnly) await collectGoldenMaster();
    const scenarios = await collectPerformance();
    const environment = {
      startedAt,
      finishedAt: new Date().toISOString(),
      transport: "loopback HTTP serving the unmodified production dist bundle",
      versions: process.versions,
      os: { platform: platform(), release: release(), totalMemoryBytes: totalmem(), freeMemoryBytes: freemem(), cpu: cpus()[0]?.model, logicalProcessors: cpus().length },
      displays: screen.getAllDisplays().map(({ id, bounds, workArea, scaleFactor, rotation }) => ({ id, bounds, workArea, scaleFactor, rotation })),
      gpuFeatureStatus: app.getGPUFeatureStatus(),
      gpuInfo: await app.getGPUInfo("basic"),
    };
    const manifest = { variant, metricsOnly, environment, captures, scenarios: scenarios.map(({ name }) => name), warnings };
    await writeFile(join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    await progress("phase-0 harness complete");
  } finally {
    await server.close();
  }
}

ipcMain.handle("perf:get-state", (event) => states.get(event.sender.id));
ipcMain.handle("perf:measure", () => true);
app.on("window-all-closed", () => {});

app.whenReady()
  .then(main)
  .then(() => app.quit())
  .catch(async (error) => {
    await mkdir(outputRoot, { recursive: true });
    await writeFile(join(outputRoot, "error.log"), `${error?.stack ?? error}\n`, "utf8");
    app.exit(1);
  });
