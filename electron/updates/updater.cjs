const { app, shell } = require("electron");
const log = require("electron-log");

/** @typedef {{ getMainWindow: () => Electron.BrowserWindow | null, isPortable: boolean, verboseLogs: boolean }} UpdaterContext */

/** @type {UpdaterContext | null} */
let context = null;
/** @type {import("electron-updater").AppUpdater | null} */
let autoUpdater = null;
let lastErrorMessage = "";
let lastErrorAt = 0;

/** @param {unknown} error */
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/** @param {string} operation @param {unknown} error */
function reportUpdaterError(operation, error) {
  const message = errorMessage(error);
  const now = Date.now();
  if (message === lastErrorMessage && now - lastErrorAt < 1000) return;
  lastErrorMessage = message;
  lastErrorAt = now;
  log.error(`[UPDATER] ${operation} failed — ${message}`);
}

function mainWindow() {
  return context?.getMainWindow() ?? null;
}

/** @param {string} channel @param {unknown} payload */
function send(channel, payload) {
  const window = mainWindow();
  if (window && !window.isDestroyed()) window.webContents.send(channel, payload);
}

function getAutoUpdater() {
  if (autoUpdater) return autoUpdater;
  autoUpdater = require("electron-updater").autoUpdater;
  autoUpdater.logger = {
    debug: () => {},
    info: () => {},
    warn: (...args) => log.warn("[UPDATER]", ...args),
    error: () => {},
  };
  autoUpdater.autoDownload = false;
  autoUpdater.allowPrerelease = false;
  autoUpdater.allowDowngrade = false;

  autoUpdater.on("update-available", (info) => {
    log.info("Update available:", info.version, context?.isPortable ? "(portable)" : "(installed)");
    send("update-available", {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: info.releaseNotes,
      isPortable: context?.isPortable ?? false,
    });
  });
  autoUpdater.on("update-not-available", () => {
    if (context?.verboseLogs) log.info("App is up to date");
  });
  autoUpdater.on("download-progress", (progress) => {
    send("update-download-progress", {
      percent: progress.percent,
      transferred: progress.transferred,
      total: progress.total,
      bytesPerSecond: progress.bytesPerSecond,
    });
  });
  autoUpdater.on("update-downloaded", (info) => {
    log.info("Update downloaded, will install on quit");
    send("update-downloaded", { version: info.version });
  });
  autoUpdater.on("error", (error) => {
    reportUpdaterError("operation", error);
    send("update-error", { message: error.message });
  });
  return autoUpdater;
}

/** @param {UpdaterContext} updaterContext */
function initializeUpdater(updaterContext) {
  context = updaterContext;
}

/** @param {{ ipcMain: typeof import("electron").ipcMain, simulate: boolean, releasesUrl: string, assertSender: (event: Electron.IpcMainInvokeEvent) => void }} options */
function registerUpdaterIpc({ ipcMain, simulate, releasesUrl, assertSender }) {
  ipcMain.handle("updater-start-download", async (event) => {
    assertSender(event);
    if (!simulate) return getAutoUpdater().downloadUpdate();
    let percent = 0;
    const interval = setInterval(() => {
      percent = Math.min(percent + 12, 100);
      send("update-download-progress", {
        percent,
        transferred: percent * 1024 * 1024,
        total: 100 * 1024 * 1024,
        bytesPerSecond: 12 * 1024 * 1024,
      });
      if (percent >= 100) {
        clearInterval(interval);
        send("update-downloaded", { version: "99.99.99" });
      }
    }, 250);
  });
  ipcMain.handle("updater-install-now", (event) => {
    assertSender(event);
    if (simulate) {
      if (context?.verboseLogs) log.info("[update] simulate — install triggered, quitting app");
      app.quit();
      return;
    }
    getAutoUpdater().quitAndInstall(true, true);
  });
  ipcMain.handle("updater-open-releases", (event) => { assertSender(event); return shell.openExternal(releasesUrl); });
}

function checkForUpdates() {
  return getAutoUpdater().checkForUpdates();
}

/** @param {{ isDev: boolean, isTestBuild: boolean, isPortable: boolean, simulateDevelopment: boolean }} mode */
function scheduleUpdateCheck(mode) {
  setTimeout(() => {
    if (!mode.isDev && !mode.isTestBuild) {
      checkForUpdates().catch((error) => reportUpdaterError("update check", error));
      return;
    }
    const simulate = (!mode.isDev && mode.isTestBuild) || (mode.isDev && mode.simulateDevelopment);
    if (!simulate) return;
    const development = mode.isDev;
    if (context?.verboseLogs) log.info(`[update] ${development ? "dev" : "test build"} — simulating update-available`);
    send("update-available", {
      version: "99.99.99",
      releaseDate: new Date().toISOString(),
      releaseNotes: development
        ? "<strong>[DEV SIMULATE]</strong> Simulated update for dev testing."
        : "<strong>[TEST MODE]</strong> Simulated update — testing the update flow.",
      isPortable: mode.isPortable,
    });
  }, 3000);
}

module.exports = { initializeUpdater, registerUpdaterIpc, checkForUpdates, scheduleUpdateCheck };
