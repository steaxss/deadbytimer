import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'
const store = new Store()

let mainWindow = null
let overlayWindow = null

// dimensions "base" (mesurées côté overlay, sans barre de drag)
let baseDims = { width: 520, height: 120 }

function applyAlwaysOnTop(win, on) {
  try {
    // macOS: niveaux ; Windows ignore souvent le "level", mais on garde pour mac
    win.setAlwaysOnTop(!!on, 'screen-saver')
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
    win.setFullScreenable(false)
  } catch {}
}

function recomputeOverlaySize() {
  if (!overlayWindow || overlayWindow.isDestroyed()) return
  const s = store.get('overlaySettings', { scale: 100, locked: false })
  const dragH = s.locked ? 0 : 30
  const w = Math.ceil((baseDims.width) * (s.scale || 100) / 100)
  const h = Math.ceil((baseDims.height + dragH) * (s.scale || 100) / 100)
  // useContentSize = true → on modifie la taille du contenu (pas de bordure de fenêtre)
  overlayWindow.setContentSize(w, h)
}

function sendOverlaySettings() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    const s = store.get('overlaySettings', { x: 0, y: 0, scale: 100, locked: false, alwaysOnTop: true })
    overlayWindow.webContents.send('overlay-settings', s)
  }
}

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
  const s = store.get('overlaySettings', { x: Math.floor(display.width/2-260), y: 100, scale: 100, locked: false, alwaysOnTop: true })
  const dragH = s.locked ? 0 : 30

  overlayWindow = new BrowserWindow({
    width: Math.ceil(baseDims.width * s.scale / 100),
    height: Math.ceil((baseDims.height + dragH) * s.scale / 100),
    x: s.x, y: s.y,
    frame: false, transparent: true, resizable: false,
    hasShadow: false,
    skipTaskbar: s.locked,
    focusable: !s.locked,
    alwaysOnTop: true, // on renforce ensuite avec applyAlwaysOnTop
    acceptFirstMouse: true,
    backgroundColor: '#00000000',
    useContentSize: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
      backgroundThrottling: false
    }
  })

  applyAlwaysOnTop(overlayWindow, s.alwaysOnTop)

  const url = isDev ? 'http://localhost:5173/overlay.html' : join(__dirname, '../dist/overlay.html')
  if (isDev) overlayWindow.loadURL(url); else overlayWindow.loadFile(url)

  overlayWindow.on('closed', () => overlayWindow = null)
  overlayWindow.on('move', () => {
    const b = overlayWindow.getBounds()
    store.set('overlaySettings.x', b.x)
    store.set('overlaySettings.y', b.y)
  })

  overlayWindow.webContents.on('did-finish-load', () => {
    // envoie noms/scores & settings
    const data = store.get('timerData') || {
      player1: { name: 'Player 1', score: 0 },
      player2: { name: 'Player 2', score: 0 }
    }
    overlayWindow.webContents.send('timer-data-sync', data)
    sendOverlaySettings()
    if (mainWindow) mainWindow.webContents.send('overlay-ready', true)
    // recalcule taille une fois le DOM prêt (la mesure arrive du renderer)
    setTimeout(() => recomputeOverlaySize(), 50)
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

    // appliquer effets immédiats
    if (settings.locked !== undefined) {
      overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true })
      overlayWindow.setFocusable(!next.locked)
      overlayWindow.setSkipTaskbar(!!next.locked)
    }
    if (settings.alwaysOnTop !== undefined) {
      applyAlwaysOnTop(overlayWindow, next.alwaysOnTop)
    }
    if (settings.x !== undefined || settings.y !== undefined) {
      const b = overlayWindow.getBounds()
      overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y)
    }

    // resize précis si scale/lock changent
    if (settings.scale !== undefined || settings.locked !== undefined) {
      recomputeOverlaySize()
    }

    // notifier l’overlay pour la barre de drag
    sendOverlaySettings()
    return true
  })

  // Mesure DOM côté overlay (base dims sans la barre)
  ipcMain.handle('overlay-measure', (_evt, dims) => {
    if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height)) return false
    baseDims = { width: Math.max(1, Math.floor(dims.width)), height: Math.max(1, Math.floor(dims.height)) }
    recomputeOverlaySize()
    return true
  })

  // Timer data (noms/scores seulement)
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
  try { globalShortcut.unregisterAll() } catch {}

  const last = { toggle: 0, swap: 0 }
  const RATE = 200 // ms anti auto-repeat

  globalShortcut.register('F1', () => {
    const now = Date.now()
    if (now - last.toggle < RATE) return
    last.toggle = now
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('global-hotkey', { type: 'toggle' })
    }
  })

  globalShortcut.register('F2', () => {
    const now = Date.now()
    if (now - last.swap < RATE) return
    last.swap = now
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
