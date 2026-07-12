import { app, BrowserWindow, ipcMain } from "electron";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { startStaticServer } from "./static-server.mjs";

const root = process.cwd();
const output = join(root, "perf", "artifacts", "panel-final");
const golden = join(output, "golden");
const profile = join(output, "profile");
const preload = join(root, "perf", "baseline", "preload.cjs");
const packageMetadata = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const timerData = {
  player1: { name: "Player 1", score: 0 },
  player2: { name: "Player 2", score: 0 },
};
const settings = {
  x: 0,
  y: 0,
  scale: 100,
  locked: true,
  alwaysOnTop: true,
  nameTheme: "default",
  accentKey: "default",
  autoScoreEnabled: true,
  autoScoreThresholdSec: 25,
};

await Promise.all([
  mkdir(golden, { recursive: true }),
  mkdir(profile, { recursive: true }),
]);
app.setPath("userData", profile);
ipcMain.handle("perf:get-state", () => ({ timerData, settings }));
ipcMain.handle("perf:get-version", () => packageMetadata.version);
ipcMain.handle("perf:measure", () => true);

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function snapshot(window, name) {
  const dom = await window.webContents.executeJavaScript(`(() => {
    const scroll = document.querySelector('.overflow-y-auto');
    const elements = [...document.querySelectorAll('button,input,select,a,h1,h2,h3,header,section,[role]')];
    return {
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      scroll: scroll ? { top: scroll.scrollTop, height: scroll.scrollHeight, clientHeight: scroll.clientHeight } : null,
      text: document.body.innerText,
      elements: elements.map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          role: element.getAttribute('role'),
          ariaLabel: element.getAttribute('aria-label'),
          text: element.textContent?.trim() ?? '',
          className: typeof element.className === 'string' ? element.className : '',
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          style: {
            color: style.color,
            backgroundColor: style.backgroundColor,
            borderColor: style.borderColor,
            borderRadius: style.borderRadius,
            display: style.display,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            opacity: style.opacity,
            position: style.position,
          },
        };
      }),
    };
  })()`);
  const image = await window.capturePage();
  await Promise.all([
    writeFile(join(golden, `${name}.json`), `${JSON.stringify(dom, null, 2)}\n`, "utf8"),
    writeFile(join(golden, `${name}.png`), image.toPNG()),
  ]);
}

const server = await startStaticServer(join(root, "dist"));
let window = null;
try {
  await app.whenReady();
  window = new BrowserWindow({
    width: 1120,
    height: 820,
    x: -10_000,
    y: -10_000,
    show: true,
    frame: false,
    backgroundColor: "#09090b",
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,
    },
  });
  await window.loadURL(`${server.origin}/index.html`);
  await window.webContents.executeJavaScript("document.fonts.ready.then(() => true)");
  await wait(250);
  await snapshot(window, "panel-top");

  const overlayActivated = await window.webContents.executeJavaScript(`(async () => {
    document.querySelector('header input[type="checkbox"]')?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return document.querySelector('header')?.textContent?.includes('Overlay Active') ?? false;
  })()`);
  assert.equal(overlayActivated, true, "overlay toggle did not update the panel state");
  await window.webContents.executeJavaScript(`document.querySelector('header input[type="checkbox"]')?.click()`);

  const hotkeysCollapsed = await window.webContents.executeJavaScript(`(async () => {
    const button = [...document.querySelectorAll('button')].find((candidate) => candidate.textContent?.includes('Keyboard / Mouse Hotkeys'));
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return !document.body.innerText.includes('Start/Stop/Reset Key');
  })()`);
  assert.equal(hotkeysCollapsed, true, "keyboard hotkey section did not collapse");
  await window.webContents.executeJavaScript(`{
    const button = [...document.querySelectorAll('button')].find((candidate) => candidate.textContent?.includes('Keyboard / Mouse Hotkeys'));
    button?.click();
  }`);

  await window.webContents.executeJavaScript(`(() => {
    const scroll = document.querySelector('.overflow-y-auto');
    if (scroll) scroll.scrollTop = Math.round(scroll.scrollHeight / 2);
  })()`);
  await wait(100);
  await snapshot(window, "panel-middle");

  await window.webContents.executeJavaScript(`(() => {
    const scroll = document.querySelector('.overflow-y-auto');
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  })()`);
  await wait(100);
  await snapshot(window, "panel-bottom");

  await window.webContents.executeJavaScript(`document.querySelector('[aria-label="Preferences"]')?.click()`);
  await wait(100);
  assert.equal(await window.webContents.executeJavaScript("document.body.innerText.includes('Preferences')"), true);
  await snapshot(window, "panel-preferences");
  await window.webContents.executeJavaScript(`document.querySelector('[aria-label="Close"]')?.click()`);

  await window.webContents.executeJavaScript(`(() => {
    const button = [...document.querySelectorAll('button')].find((candidate) => candidate.textContent?.includes('Unlock'));
    button?.click();
  })()`);
  await wait(100);
  assert.equal(await window.webContents.executeJavaScript("document.body.innerText.includes('Unlock Premium')"), true);
  await snapshot(window, "panel-premium");

  await writeFile(join(output, "manifest.json"), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    size: { width: 1120, height: 820 },
    captures: ["panel-top", "panel-middle", "panel-bottom", "panel-preferences", "panel-premium"],
  }, null, 2)}\n`, "utf8");
} finally {
  if (window && !window.isDestroyed()) window.destroy();
  await server.close();
  app.quit();
}
