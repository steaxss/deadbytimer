import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'

let uIOhook = null

const __dirname = dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'
const store = new Store()

let mainWindow = null
let overlayWindow = null
let usingUiohook = false

// dimensions non-scalées du contenu (hors drag bar)
let baseDims = { width: 520, height: 120 }

// hotkeys: codes (uiohook) + labels (fallback/affichage)
let hotkeys = store.get('hotkeys') || { start: null, swap: null }
let hotkeysLabel = store.get('hotkeysLabel') || { start: 'F1', swap: 'F2' }

let capturing = null // 'start' | 'swap' | null

function applyAlwaysOnTop(win, on) {
  try {
    win.setAlwaysOnTop(!!on, 'screen-saver')
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
    win.setFullScreenable(false)
  } catch {}
}

function sendOverlaySettings() {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    const s = store.get('overlaySettings', { x: 0, y: 0, scale: 100, locked: true, alwaysOnTop: true })
    overlayWindow.webContents.send('overlay-settings', s)
  }
}

function recomputeOverlaySize() {
  if (!overlayWindow || overlayWindow.isDestroyed()) return
  const s = store.get('overlaySettings', { scale: 100, locked: true })
  const dragH = s.locked ? 0 : 30
  const scale = (s.scale || 100) / 100
  const w = Math.ceil(baseDims.width * scale)
  const h = Math.ceil((baseDims.height + dragH) * scale)
  overlayWindow.setContentSize(w, h)
  sendOverlaySettings()
}

function sendHotkeysMode() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('hotkeys-mode', usingUiohook ? 'pass-through' : 'fallback')
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
  if (overlayWindow && !overlayWindow.isDestroyed()) { overlayWindow.show(); overlayWindow.focus(); return }
  const display = screen.getPrimaryDisplay().workAreaSize
  const s = store.get('overlaySettings', {
    x: Math.floor(display.width/2-260), y: 100, scale: 100, locked: true, alwaysOnTop: true
  })
  const dragH = s.locked ? 0 : 30
  const scale = (s.scale || 100) / 100

  overlayWindow = new BrowserWindow({
    width: Math.ceil(baseDims.width * scale),
    height: Math.ceil((baseDims.height + dragH) * scale),
    x: s.x, y: s.y,
    frame: false, transparent: true, resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,
    title: 'DBD Timer Overlay',
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

  // lock initial: click-through si locked
  overlayWindow.setIgnoreMouseEvents(!!s.locked, { forward: true })
  applyAlwaysOnTop(overlayWindow, s.alwaysOnTop)

  const url = isDev ? 'http://localhost:5173/overlay.html' : join(__dirname, '../dist/overlay.html')
  if (isDev) overlayWindow.loadURL(url); else overlayWindow.loadFile(url)

  overlayWindow.on('closed', () => {
    overlayWindow = null
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('overlay-ready', false)
  })
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
    sendOverlaySettings()
    if (mainWindow) mainWindow.webContents.send('overlay-ready', true)
    setTimeout(() => recomputeOverlaySize(), 50)
  })
}

function setupIPC() {
  ipcMain.handle('overlay-show', () => { createOverlayWindow(); return true })
  ipcMain.handle('overlay-hide', () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.close()
    overlayWindow = null
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('overlay-ready', false)
    return true
  })

  ipcMain.handle('overlay-settings-update', (_evt, settings) => {
    const current = store.get('overlaySettings', {})
    const next = { ...current, ...settings }
    store.set('overlaySettings', next)
    if (!overlayWindow || overlayWindow.isDestroyed()) return true

    if (settings.locked !== undefined) {
      overlayWindow.setIgnoreMouseEvents(!!next.locked, { forward: true })
      overlayWindow.setFocusable(true) // OBS/Alt-Tab
    }
    if (settings.alwaysOnTop !== undefined) applyAlwaysOnTop(overlayWindow, next.alwaysOnTop)
    if (settings.x !== undefined || settings.y !== undefined) {
      const b = overlayWindow.getBounds()
      overlayWindow.setPosition(settings.x ?? b.x, settings.y ?? b.y)
    }
    if (settings.scale !== undefined || settings.locked !== undefined) recomputeOverlaySize()
    sendOverlaySettings()
    return true
  })

  ipcMain.handle('overlay-measure', (_evt, dims) => {
    if (!dims || !Number.isFinite(dims.width) || !Number.isFinite(dims.height)) return false
    baseDims = { width: Math.max(1, Math.floor(dims.width)), height: Math.max(1, Math.floor(dims.height)) }
    recomputeOverlaySize()
    return true
  })

  // Timer data
  ipcMain.handle('timer-data-get', () => store.get('timerData') || { player1: { name: 'Player 1', score: 0 }, player2: { name: 'Player 2', score: 0 } })
  ipcMain.handle('timer-data-set', (_evt, data) => {
    store.set('timerData', data)
    if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.webContents.send('timer-data-sync', data)
    return true
  })

  // Hotkeys API
  ipcMain.handle('hotkeys-get', () => ({
    start: hotkeys.start, swap: hotkeys.swap,
    startLabel: hotkeysLabel.start, swapLabel: hotkeysLabel.swap,
    mode: usingUiohook ? 'pass-through' : 'fallback'
  }))

  ipcMain.handle('hotkeys-set', (_evt, hk) => {
    hotkeys = { ...hotkeys, ...hk } // num codes si fournis
    store.set('hotkeys', hotkeys)
    refreshHotkeyEngine()
    return true
  })

  ipcMain.handle('hotkeys-capture', (_evt, type) => {
    if (!(type === 'start' || type === 'swap')) { capturing = null; return true }
    capturing = type

    // 1) capturer un label lisible via before-input-event (panel focus)
    if (mainWindow && !mainWindow.isDestroyed()) {
      const once = (event, input) => {
        if (!capturing) { mainWindow.webContents.removeListener('before-input-event', once); return }
        if (input.type !== 'keyDown') return
        // label utilisateur propre
        let label = input.key || input.code || ''
        // uniformiser quelques cas
        if (/^Key[A-Z]$/.test(input.code)) label = input.code.replace('Key','')
        if (/^Digit\d$/.test(input.code)) label = input.code.replace('Digit','')
        if (/^F\d{1,2}$/.test(input.key)) label = input.key

        hotkeysLabel = { ...hotkeysLabel, [capturing]: label || 'Key' }
        store.set('hotkeysLabel', hotkeysLabel)

        // notifier immédiatement l’UI avec label (même si le code num arrive après via uiohook)
        mainWindow.webContents.send('hotkeys-captured', { type: capturing, keycode: hotkeys[capturing], label })
        // si on est en fallback, activer tout de suite globalShortcut
        if (!usingUiohook) refreshHotkeyEngine()

        // on NE clôture PAS ici: on laisse uiohook nous donner le code num si dispo
        // sécurité: si uiohook ne vient pas, on clôture la capture après 1s
        setTimeout(() => { if (capturing === type) capturing = null }, 1000)

        mainWindow.webContents.removeListener('before-input-event', once)
      }
      mainWindow.webContents.on('before-input-event', once)
    }

    return true
  })
}

function refreshHotkeyEngine() {
  if (usingUiohook) return // pass-through → rien à enregistrer côté Electron
  try { globalShortcut.unregisterAll() } catch {}
  const RATE = 180
  let lastT = 0, lastS = 0

  const sKey = hotkeysLabel.start || 'F1'
  const wKey = hotkeysLabel.swap  || 'F2'

  try {
    globalShortcut.register(sKey, () => {
      const now = Date.now(); if (now - lastT < RATE) return; lastT = now
      overlayWindow?.webContents.send('global-hotkey', { type: 'toggle' })
    })
  } catch {}
  try {
    globalShortcut.register(wKey, () => {
      const now = Date.now(); if (now - lastS < RATE) return; lastS = now
      overlayWindow?.webContents.send('global-hotkey', { type: 'swap' })
    })
  } catch {}
}

// uiohook global (pass-through)
function setupUiohook() {
  try {
    const lib = require('uiohook-napi')
    uIOhook = lib.uIOhook
  } catch (e) {
    usingUiohook = false
    sendHotkeysMode()
    refreshHotkeyEngine()
    return
  }

  usingUiohook = true
  sendHotkeysMode()

  let lastToggle = 0
  let lastSwap = 0
  const RATE = 180

  uIOhook.on('keydown', (e) => {
    if (capturing) {
      const type = capturing
      // stocker le code num pour uiohook
      hotkeys = { ...hotkeys, [type]: e.keycode }
      store.set('hotkeys', hotkeys)
      // notifier UI (on garde le label déjà envoyé)
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('hotkeys-captured', { type, keycode: e.keycode, label: hotkeysLabel[type] })
      }
      capturing = null
      return
    }

    if (!overlayWindow || overlayWindow.isDestroyed()) return
    const now = Date.now()
    if (hotkeys.start && e.keycode === hotkeys.start) {
      if (now - lastToggle < RATE) return; lastToggle = now
      overlayWindow.webContents.send('global-hotkey', { type: 'toggle' })
    } else if (hotkeys.swap && e.keycode === hotkeys.swap) {
      if (now - lastSwap < RATE) return; lastSwap = now
      overlayWindow.webContents.send('global-hotkey', { type: 'swap' })
    }
  })

  try { uIOhook.start() } catch {
    usingUiohook = false
    sendHotkeysMode()
    refreshHotkeyEngine()
  }
}

app.whenReady().then(() => {
  createMainWindow()
  setupIPC()
  setupUiohook()
  if (isDev) setTimeout(createOverlayWindow, 800)
})
app.on('will-quit', () => {
  try { if (usingUiohook) uIOhook.stop() } catch {}
  try { globalShortcut.unregisterAll() } catch {}
})
app.on('window-all-closed', () => { app.quit() })