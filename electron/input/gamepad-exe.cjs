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

let child = null;
let isQuitting = false;
let relaunchTimer = null;

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
  } catch (e) {
    console.error("[GAMEPAD] loadMapping error", e?.message || e);
    mapping = { ...DEFAULT_MAPPING };
  }
}

function saveMapping(next) {
  try {
    const file = configFilePath();
    writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
  } catch (e) {
    console.error("[GAMEPAD] saveMapping error", e?.message || e);
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
}

// 🚿 NOUVEAU : vider complètement une action (exclusivité par action)
function clearGamepadMapping(action) {
  const key = action === "swap" ? "swap" : "toggle";
  const next = { ...mapping, [key]: [] };
  saveMapping(next);
  mapping = next;
}

// --- Flux brut pour la capture ------------------------------------------------
const rawListeners = new Set();
function onGamepadRaw(cb) {
  if (typeof cb === "function") {
    rawListeners.add(cb);
    return () => rawListeners.delete(cb);
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
  const exe = resolveExePath();
  if (!existsSync(exe)) return;

  child = spawn(exe, [], {
    stdio: ["ignore", "pipe", "ignore"],
    windowsHide: true,
  });

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

  child.on("exit", () => {
    child = null;
    if (isQuitting) return;
    clearTimeout(relaunchTimer);
    relaunchTimer = setTimeout(launch, 1000);
  });

  child.on("error", () => {
    child = null;
    if (isQuitting) return;
    clearTimeout(relaunchTimer);
    relaunchTimer = setTimeout(launch, 1500);
  });
}

function setupGamepadExe() {
  if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où

  loadMapping();
  try {
    watch(configFilePath(), { persistent: false }, () => loadMapping());
  } catch {}

  launch();

  app.on("before-quit", () => {
    isQuitting = true;
    try {
      clearTimeout(relaunchTimer);
    } catch {}
    try {
      child?.kill();
    } catch {}
  });
  app.on("will-quit", () => {
    isQuitting = true;
    try {
      clearTimeout(relaunchTimer);
    } catch {}
    try {
      child?.kill();
    } catch {}
  });
}

module.exports = {
  setupGamepadExe,
  onGamepadRaw,
  setGamepadMapping,
  clearGamepadMapping, // 👈 exporté
};
