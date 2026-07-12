// electron/input/gamepad-exe.cjs
// Windows only — XInput -> IPC "global-hotkey" (toggle/swap)
// - arrêt propre à la fermeture
// - mappage configurable via %APPDATA%/<app>/gamepad.json
// - flux brut pour la capture (onGamepadRaw), écriture mapping (setGamepadMapping)

const { app } = require("electron");
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
const { parseGamepadProtocolLine } = require("./gamepad-protocol.cjs");
/** @typedef {"toggle" | "swap"} GamepadAction */
/** @typedef {{ toggle: string[], swap: string[] }} GamepadMapping */
const VERBOSE_LOGS =
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_HK === "1" ||
  process.env.DEBUG_LOGS === "1";

/** @type {ReturnType<typeof spawn> | null} */
let child = null;
let isQuitting = false;
/** @type {ReturnType<typeof setTimeout> | null} */
let relaunchTimer = null;
/** @type {ReturnType<typeof setTimeout> | null} */
let stabilityTimer = null;
/** @type {ReturnType<typeof setTimeout> | null} */
let forceKillTimer = null;
let relaunchDelayMs = 1000;
let initialized = false;
let stopRequested = false;
/** @type {((action: GamepadAction) => void) | null} */
let dispatchHotkey = null;

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
/** @param {GamepadAction} action */
function dispatchMappedAction(action) {
  dispatchHotkey?.(action);
}

// --- Mappage configurable ----------------------------------------------------
/** @type {GamepadMapping} */
const DEFAULT_MAPPING = {
  toggle: [],
  swap: [],
};

function configFilePath() {
  return join(app.getPath("userData"), "gamepad.json");
}

let mapping = { ...DEFAULT_MAPPING };

/** @param {unknown} value */
function normalizeEventName(value) {
  return String(value || "")
    .trim()
    .toUpperCase();
}

/** @param {GamepadMapping} mappingToCheck */
function isLegacyDefaults(mappingToCheck) {
  const t = mappingToCheck.toggle.map(normalizeEventName);
  const s = mappingToCheck.swap.map(normalizeEventName);
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

    const raw = readFileSync(file, "utf8").replace(/^\uFEFF/u, "");
    const json = /** @type {Record<string, unknown>} */ (JSON.parse(raw));

    /** @type {GamepadMapping} */
    const out = { toggle: [], swap: [] };
    for (const key of /** @type {GamepadAction[]} */ (["toggle", "swap"])) {
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
  } catch (error) {
    log.warn(`[GAMEPAD] loadMapping error — ${errorMessage(error)}`);
    mapping = { ...DEFAULT_MAPPING };
    ensureBridgeState();
  }
}

/** @param {unknown} error */
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/** @param {GamepadMapping} next */
function saveMapping(next) {
  try {
    const file = configFilePath();
    writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
  } catch (error) {
    log.warn(`[GAMEPAD] saveMapping error — ${errorMessage(error)}`);
  }
}

/** @param {GamepadAction} action @param {unknown} eventLabel @param {{ append?: boolean }} [options] */
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

// Vider completement une action.
/** @param {GamepadAction} action */
function clearGamepadMapping(action) {
  const key = action === "swap" ? "swap" : "toggle";
  const next = { ...mapping, [key]: [] };
  saveMapping(next);
  mapping = next;
  ensureBridgeState();
}

// --- Flux brut pour la capture ------------------------------------------------
/** @type {Set<(event: string) => void>} */
const rawListeners = new Set();
/** @param {(event: string) => void} cb */
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
/** @param {string} ev */
function emitRaw(ev) {
  for (const cb of rawListeners) {
    try {
      cb(ev);
    } catch (error) {
      log.error(`[GAMEPAD] Raw listener failed â€” ${errorMessage(error)}`);
    }
  }
}

function shouldRunBridge() {
  return shouldRunGamepadBridge({ mapping, rawListenerCount: rawListeners.size });
}

function stopBridge(reason = "idle") {
  if (relaunchTimer) clearTimeout(relaunchTimer);
  relaunchTimer = null;
  if (stabilityTimer) clearTimeout(stabilityTimer);
  stabilityTimer = null;
  if (!child) return;
  if (stopRequested) return;
  stopRequested = true;
  if (VERBOSE_LOGS) log.info(`[GAMEPAD] Bridge stopping — reason: ${reason}`);
  const stoppingChild = child;
  try {
    if (!stoppingChild.stdin || stoppingChild.stdin.destroyed) {
      stoppingChild.kill();
      return;
    }
    stoppingChild.stdin.once("error", () => {
      if (child !== stoppingChild) return;
      try { stoppingChild.kill(); } catch (error) {
        log.warn(`[GAMEPAD] Failed to kill bridge after stdin error â€” ${errorMessage(error)}`);
      }
    });
    stoppingChild.stdin.end("QUIT\n");
  } catch {
    stoppingChild.kill();
    return;
  }
  if (forceKillTimer) clearTimeout(forceKillTimer);
  forceKillTimer = setTimeout(() => {
    forceKillTimer = null;
    if (child !== stoppingChild) return;
    try { stoppingChild.kill(); } catch (error) {
      log.warn(`[GAMEPAD] Forced bridge termination failed â€” ${errorMessage(error)}`);
    }
  }, 2500);
}

function scheduleRelaunch() {
  if (isQuitting || !shouldRunBridge() || relaunchTimer) return;
  const delayMs = relaunchDelayMs;
  relaunchDelayMs = Math.min(relaunchDelayMs * 2, 30_000);
  relaunchTimer = setTimeout(() => {
    relaunchTimer = null;
    launch();
  }, delayMs);
  relaunchTimer.unref?.();
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
/** @param {unknown} name */
function handleGamepadEventName(name) {
  const ev = normalizeEventName(name);
  if (!ev) return;

  // Toujours notifier le brut (capture)
  emitRaw(ev);

  // Déclenchement selon mapping
  if ((mapping.toggle || []).includes(ev)) {
    dispatchMappedAction("toggle");
    return;
  }
  if ((mapping.swap || []).includes(ev)) {
    dispatchMappedAction("swap");
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
    stdio: ["pipe", "pipe", "ignore"],
    windowsHide: true,
  });
  const spawnedChild = child;
  stabilityTimer = setTimeout(() => {
    if (child === spawnedChild) relaunchDelayMs = 1000;
    stabilityTimer = null;
  }, 30_000);
  stabilityTimer.unref?.();

  if (VERBOSE_LOGS) log.info(`[GAMEPAD] Bridge started — PID: ${child.pid}`);

  let buffer = "";
  child.stdout?.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    if (buffer.length > 4096) {
      log.warn("[GAMEPAD] Native protocol buffer exceeded 4096 bytes; dropping malformed data");
      buffer = "";
      return;
    }
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      const eventName = parseGamepadProtocolLine(line);
      if (eventName) handleGamepadEventName(eventName);
    }
  });

  child.on("exit", (code) => {
    if (child !== spawnedChild) return;
    const intentional = stopRequested || isQuitting;
    if (VERBOSE_LOGS) {
      log.info(`[GAMEPAD] Bridge exited (code: ${code ?? "null"})${intentional ? "" : " — relaunching if needed"}`);
    }
    stopRequested = false;
    child = null;
    if (forceKillTimer) clearTimeout(forceKillTimer);
    forceKillTimer = null;
    if (stabilityTimer) clearTimeout(stabilityTimer);
    stabilityTimer = null;
    if (isQuitting || !shouldRunBridge()) return;
    scheduleRelaunch();
  });

  child.on("error", (err) => {
    if (child !== spawnedChild) return;
    log.warn(`[GAMEPAD] Bridge error — ${errorMessage(err)} — relaunching in 1.5s`);
    stopRequested = false;
    child = null;
    if (forceKillTimer) clearTimeout(forceKillTimer);
    forceKillTimer = null;
    if (stabilityTimer) clearTimeout(stabilityTimer);
    stabilityTimer = null;
    if (isQuitting || !shouldRunBridge()) return;
    scheduleRelaunch();
  });
}

/** @param {(action: GamepadAction) => void} actionDispatcher */
function setupGamepadExe(actionDispatcher) {
  dispatchHotkey = actionDispatcher;
  if (process.platform !== "win32") return; // l’app est Windows-only, garde au cas où

  if (initialized) {
    ensureBridgeState();
    return;
  }
  initialized = true;

  loadMapping();
  try {
    watch(configFilePath(), { persistent: false }, () => loadMapping());
  } catch (error) {
    log.warn(`[GAMEPAD] Unable to watch mapping file â€” ${errorMessage(error)}`);
  }
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
