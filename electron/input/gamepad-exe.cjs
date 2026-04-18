// electron/input/gamepad-exe.cjs
// Windows only — XInput -> IPC "global-hotkey" (toggle/swap)
// - arrêt propre à la fermeture
// - mappage configurable via %APPDATA%/<app>/gamepad.json
// - flux brut pour la capture (onGamepadRaw), écriture mapping (setGamepadMapping)

const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const { join, dirname } = require("path");
const {
  existsSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
  watch,
} = require("fs");
const log = require("electron-log");
const { shouldRunGamepadBridge } = require("./runtime-policy.cjs");
const VERBOSE_LOGS =
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_HK === "1" ||
  process.env.DEBUG_LOGS === "1";

let child = null;
let isQuitting = false;
let relaunchTimer = null;
let initialized = false;
let stopRequested = false;

const ACTION_THROTTLE_MS = 200;
const lastActionAt = { toggle: 0, swap: 0 };

// --- Résolution du chemin du binaire natif (dev/prod)
function resolveExePath() {
  // dev: ../.. depuis electron/input -> native/xinput_bridge.exe
  const devPath = join(__dirname, "..", "..", "native", "xinput_bridge.exe");

  // prod: l’exe peut être à la racine de resources (package.json -> extraResources to ".")
  // ou parfois dans resources/native
  const res = process.resourcesPath || __dirname;
  const prodA = join(res, "xinput_bridge.exe");
  const prodB = join(res, "native", "xinput_bridge.exe");

  if (existsSync(devPath)) return devPath;
  if (existsSync(prodA)) return prodA;
  if (existsSync(prodB)) return prodB;
  return devPath; // fallback (échec volontairement visible)
}

// --- Diffusion vers toutes les fenêtres — envoie { type: ... }
function broadcastHotkey(action) {
  const now = Date.now();
  if (action === "toggle" || action === "swap") {
    if (now - lastActionAt[action] < ACTION_THROTTLE_MS) return;
    lastActionAt[action] = now;
  }
  for (const win of BrowserWindow.getAllWindows()) {
    try {
      win.webContents.send("global-hotkey", { type: action });
    } catch {}
  }
}

// --- Mappage configurable ----------------------------------------------------
const DEFAULT_MAPPING = {
  toggle: [],
  swap: [],
};

function configFilePath() {
  return join(app.getPath("userData"), "gamepad.json");
}

let mapping = { ...DEFAULT_MAPPING };

function normalizeEventName(s) {
  return String(s || "")
    .trim()
    .toUpperCase();
}

function isLegacyDefaults(m) {
  const t = Array.isArray(m?.toggle) ? m.toggle.map(normalizeEventName) : [];
  const s = Array.isArray(m?.swap) ? m.swap.map(normalizeEventName) : [];
  return (
    t.length === 1 && t[0] === "BTN A" && s.length === 1 && s[0] === "BTN RB"
  );
}

function loadMapping() {
  try {
    const file = configFilePath();
    if (!existsSync(dirname(file)))
      mkdirSync(dirname(file), { recursive: true });
    if (!existsSync(file)) {
      writeFileSync(file, JSON.stringify(DEFAULT_MAPPING, null, 2), "utf8");
      mapping = { ...DEFAULT_MAPPING };
      ensureBridgeState();
      return;
    }

    const raw = readFileSync(file, "utf8");
    const json = JSON.parse(raw);

    const out = { toggle: [], swap: [] };
    for (const key of ["toggle", "swap"]) {
      const val = json[key];
      if (typeof val === "string") out[key] = [normalizeEventName(val)];
      else if (Array.isArray(val))
        out[key] = val.map(normalizeEventName).filter(Boolean);
    }

    if (isLegacyDefaults(out)) {
      out.toggle = [];
      out.swap = [];
      writeFileSync(file, JSON.stringify(out, null, 2), "utf8");
    }
    mapping = out;
    if (VERBOSE_LOGS) {
      log.info(`[GAMEPAD] Mapping loaded — toggle: [${mapping.toggle.join(", ") || "none"}] | swap: [${mapping.swap.join(", ") || "none"}]`);
    }
    ensureBridgeState();
  } catch (e) {
    log.warn(`[GAMEPAD] loadMapping error — ${e?.message ?? e}`);
    mapping = { ...DEFAULT_MAPPING };
    ensureBridgeState();
  }
}

function saveMapping(next) {
  try {
    const file = configFilePath();
    writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
  } catch (e) {
    log.warn(`[GAMEPAD] saveMapping error — ${e?.message ?? e}`);
  }
}

function setGamepadMapping(action, eventLabel, { append = false } = {}) {
  const key = action === "swap" ? "swap" : "toggle";
  const label = normalizeEventName(eventLabel);
  const next = { ...mapping };
  if (append) next[key] = Array.from(new Set([...(next[key] || []), label]));
  else next[key] = [label];
  saveMapping(next);
  mapping = next;
  ensureBridgeState();
}

// 🚿 NOUVEAU : vider complètement une action (exclusivité par action)
function clearGamepadMapping(action) {
  const key = action === "swap" ? "swap" : "toggle";
  const next = { ...mapping, [key]: [] };
  saveMapping(next);
  mapping = next;
  ensureBridgeState();
}

// --- Flux brut pour la capture ------------------------------------------------
const rawListeners = new Set();
function onGamepadRaw(cb) {
  if (typeof cb === "function") {
    rawListeners.add(cb);
    ensureBridgeState();
    return () => {
      rawListeners.delete(cb);
      ensureBridgeState();
    };
  }
  return () => {};
}
function emitRaw(ev) {
  for (const cb of rawListeners) {
    try {
      cb(ev);
    } catch {}
  }
}

function hasMappedActions() {
  return (mapping.toggle || []).length > 0 || (mapping.swap || []).length > 0;
}

function shouldRunBridge() {
  return shouldRunGamepadBridge({ mapping, rawListenerCount: rawListeners.size });
}

function stopBridge(reason = "idle") {
  clearTimeout(relaunchTimer);
  relaunchTimer = null;
  if (!child) return;
  stopRequested = true;
  if (VERBOSE_LOGS) log.info(`[GAMEPAD] Bridge stopping — reason: ${reason}`);
  try {
    child.kill();
  } catch {}
}

function ensureBridgeState() {
  if (isQuitting) return;
  if (shouldRunBridge()) {
    if (!child) launch();
    return;
  }
  stopBridge("no-demand");
}

// --- Process natif -----------------------------------------------------------
function handleGamepadEventName(name) {
  const ev = normalizeEventName(name);
  if (!ev) return;

  // Toujours notifier le brut (capture)
  emitRaw(ev);

  // Déclenchement selon mapping
  if ((mapping.toggle || []).includes(ev)) {
    broadcastHotkey("toggle");
    return;
  }
  if ((mapping.swap || []).includes(ev)) {
    broadcastHotkey("swap");
    return;
  }
}

function launch() {
  if (child || !shouldRunBridge()) return;
  const exe = resolveExePath();
  if (!existsSync(exe)) {
    log.warn("[GAMEPAD] Bridge exe not found: " + exe);
    return;
  }

  stopRequested = false;
  child = spawn(exe, [], {
    stdio: ["ignore", "pipe", "ignore"],
    windowsHide: true,
  });

  if (VERBOSE_LOGS) log.info(`[GAMEPAD] Bridge started — PID: ${child.pid}`);

  let buffer = "";
  child.stdout.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (line) handleGamepadEventName(line);
    }
  });

  child.on("exit", (code) => {
    const intentional = stopRequested || isQuitting;
    if (VERBOSE_LOGS) {
      log.info(`[GAMEPAD] Bridge exited (code: ${code ?? "null"})${intentional ? "" : " — relaunching if needed"}`);
    }
    stopRequested = false;
    child = null;
    if (intentional || !shouldRunBridge()) return;
    clearTimeout(relaunchTimer);
    relaunchTimer = setTimeout(launch, 1000);
  });

  child.on("error", (err) => {
    log.warn(`[GAMEPAD] Bridge error — ${err?.message ?? err} — relaunching in 1.5s`);
    stopRequested = false;
    child = null;
    if (isQuitting || !shouldRunBridge()) return;
    clearTimeout(relaunchTimer);
    relaunchTimer = setTimeout(launch, 1500);
  });
}

function setupGamepadExe() {
  if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où

  if (initialized) {
    ensureBridgeState();
    return;
  }
  initialized = true;

  loadMapping();
  try {
    watch(configFilePath(), { persistent: false }, () => loadMapping());
  } catch {}
  ensureBridgeState();

  app.on("before-quit", () => {
    isQuitting = true;
    stopBridge("before-quit");
  });
  app.on("will-quit", () => {
    isQuitting = true;
    stopBridge("will-quit");
  });
}

  // 👇 Nouveau : expose un snapshot lisible depuis le renderer
  function getGamepadMapping() {
    return {
      toggle: Array.isArray(mapping.toggle) ? [...mapping.toggle] : [],
      swap: Array.isArray(mapping.swap) ? [...mapping.swap] : [],
    };

  }

module.exports = {
  setupGamepadExe,
  onGamepadRaw,
  setGamepadMapping,
  clearGamepadMapping,
  getGamepadMapping
};
