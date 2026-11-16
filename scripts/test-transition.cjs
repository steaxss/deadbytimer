const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");
const { NsisUpdater } = require("electron-updater/out/NsisUpdater");
const { ElectronHttpExecutor } = require("electron-updater/out/electronHttpExecutor");
const { NodeHttpExecutor } = require("builder-util/out/nodeHttpExecutor");

class Executor extends NodeHttpExecutor {
  download(...args) {
    return ElectronHttpExecutor.prototype.download.apply(this, args);
  }
}

async function run() {
  const directory = path.resolve("release");
  const allowed = new Set(["latest.yml", "migration.yml", "DBD-Timer-Free-3.4.0-Setup.exe", "Dead-by-Timer-4.0.0-Setup.exe"]);
  const server = http.createServer((request, response) => {
    const name = new URL(request.url, "http://127.0.0.1").pathname.slice(1);
    if (!allowed.has(name)) { response.writeHead(404); response.end(); return; }
    const file = path.join(directory, name);
    response.setHeader("Content-Length", fs.statSync(file).size);
    fs.createReadStream(file).pipe(response);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    for (const [current, channel, target, silent] of [["3.2.0", "latest", "3.4.0", true], ["3.3.0", "latest", "3.4.0", true], ["3.4.0", "migration", "4.0.0", false]]) {
      const cache = fs.mkdtempSync(path.join(directory, "protocol-"));
      const adapter = {
        version: current, name: "dbdtimer-steaxs", isPackaged: true,
        userDataPath: cache, baseCachePath: cache,
        appUpdateConfigPath: path.join(directory, "win-unpacked/resources/app-update.yml"),
        whenReady: () => Promise.resolve(), onQuit() {},
      };
      const updater = new NsisUpdater(null, adapter);
      updater.httpExecutor = new Executor();
      updater.setFeedURL({ provider: "generic", url: `http://127.0.0.1:${server.address().port}/`, channel });
      updater.autoDownload = false;
      updater.allowPrerelease = false;
      updater.disableWebInstaller = true;
      updater.logger = { info() {}, warn() {}, error() {}, debug() {} };
      const check = await updater.checkForUpdates();
      assert.equal(check.updateInfo.version, target);
      const [download] = await updater.downloadUpdate();
      assert.equal(crypto.createHash("sha512").update(fs.readFileSync(download)).digest("base64"), check.updateInfo.sha512);
      let invocation;
      updater.spawnLog = (file, args) => { invocation = { file, args }; return Promise.resolve(); };
      assert.equal(updater.doInstall({ isSilent: silent, isForceRunAfter: true, isAdminRightsRequired: false }), true);
      assert.equal(invocation.file, download);
      assert.deepEqual(invocation.args, silent ? ["--updated", "/S", "--force-run"] : ["--updated", "--force-run"]);
      console.log(`PASS ${current} -> ${target}: detection, verified download and installation arguments`);
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

run().catch(error => { console.error(error); process.exitCode = 1; });
