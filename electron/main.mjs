import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'
const store = new Store()

let mainWindow = null
let overlayWindow = null

function createMainWindow() {
  const saved = store.get('windowState') || {}
  mainWindow = new BrowserWindow({
    width: saved.width || 900,
    height: saved.height || 640,
    x: saved.x, y: saved.y,
    minWidth: 700, minHeight: 480,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }

  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('close', () => {
    const b = mainWindow.getBounds()
    store.set('windowState', b)
  })
  mainWindow.on('closed', () => { mainWindow = null; if (overlayWindow) overlayWindow.close() })
}

function createOverlayWindow() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.show(); overlayWindow.focus(); return
  }
  const display = screen.getPrimaryDisplay().workAreaSize
  const overlaySettings = store.get('overlaySettings', { x: Math.floor(display.width/2-260), y: 100, scale: 100, locked: false, alwaysOnTop: true })
  const dragH = overlaySettings.locked ? 0 : 30
  const width = Math.ceil(520 * overlaySettings.scale / 100)
  const height = Math.ceil((120 + dragH) * overlaySettings.scale / 100)

  overlayWindow = new BrowserWindow({
    width, height, x: overlaySettings.x, y: overlaySettings.y,
    frame: false, transparent: true, resizable: false,
    skipTaskbar: overlaySettings.locked,
    focusable: !overlaySettings.locked,
    alwaysOnTop: overlaySettings.alwaysOnTop !== false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
      backgroundThrottling: false
    }
  })

  const url = isDev ? 'http://localhost:5173/overlay.html' : join(__dirname, '../dist/overlay.html')
  if (isDev) overlayWindow.loadURL(url); else overlayWindow.loadFile(url)

  overlayWindow.on('closed', () => overlayWindow = null)
  overlayWindow.on('move', () => {
    const b = overlayWindow.getBounds()
    store.set('overlaySettings.x', b.x)
    store.set('overlaySettings.y', b.y)
  })

  overlayWindow.webContents.on('did-finish-load', () => {
    const data = store.get('timerData') || {
      player1: { name: 'Player 1', score: 0 },
      player2: { name: 'Player 2', score: 0 }
    }
    overlayWindow.webContents.send('timer-data-sync', data)
    if (mainWindow) mainWindow.webContents.send('overlay-ready', true)
  })
}

function setupIPC() {
  ipcMain.handle('overlay-show', () => { createOverlayWindow(); return true })
  ipcMain.handle('overlay-hide', () => { if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close(); overlayWindow = null; return true })

  ipcMain.handle('overlay-settings-update', (_, settings) => {
    const current = store.get('overlaySettings', {})
    const next = { ...current, ...settings }
    store.set('overlaySettings', next)
    if (!overlayWindow || overlayWindow.isDestroyed()) return true

    const dragH = next.locked ? 0 : 30
    const w = Math.ceil(520 * (next.scale || 100) / 100)
    const h = Math.ceil((120 + dragH) * (next.scale || 100) / 100)
    if (settings.scale !== undefined || settings.locked !== undefined) {
      overlayWindow.setSize(w, h)
    }
    if (settings.locked !== undefined) {
      overlayWindow.setIgnoreMouseEvents(next.locked, { forward: true })
      overlayWindow.setFocusable(!next.locked)
      overlayWindow.setSkipTaskbar(next.locked)
    }
    if (settings.alwaysOnTop !== undefined) overlayWindow.setAlwaysOnTop(!!next.alwaysOnTop)
    if (settings.x !== undefined || settings.y !== undefined) {
      const b = overlayWindow.getBounds()
      overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y)
    }
    return true
  })

  // Timer data (names/scores only)
  ipcMain.handle('timer-data-get', () => store.get('timerData') || { player1: { name: 'Player 1', score: 0 }, player2: { name: 'Player 2', score: 0 } })
  ipcMain.handle('timer-data-set', (_, data) => {
    store.set('timerData', data)
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('timer-data-sync', data)
    }
    return true
  })
}

function setupHotkeys() {
  try { globalShortcut.unregisterAll() } catch { /* noop */ }
  // F1 = toggle (start → pause → reset) on active timer
  globalShortcut.register('F1', () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('global-hotkey', { type: 'toggle' })
    }
  })
  // F2 = swap active timer
  globalShortcut.register('F2', () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('global-hotkey', { type: 'swap' })
    }
  })
}

app.whenReady().then(() => {
  createMainWindow()
  setupIPC()
  setupHotkeys()
  if (isDev) setTimeout(createOverlayWindow, 800)
})
app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => { globalShortcut.unregisterAll(); app.quit() })
