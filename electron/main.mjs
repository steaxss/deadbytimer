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

// mesures non-scalées (contenu réel sans la barre de drag)
let baseDims = { width: 520, height: 120 }

// hotkeys stockées
// - numériques (uiohook) : {start, swap} -> keycode uiohook
// - chaînes (fallback globalShortcut) : {start, swap} -> 'F1', 'KeyX', etc.
let hotkeys = store.get('hotkeys') || { start: null, swap: null }
let hotkeysStr = store.get('hotkeysStr') || { start: 'F1', swap: 'F2' }

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
    const s = store.get('overlaySettings', { x: 0, y: 0, scale: 100, locked: false, alwaysOnTop: true })
    overlayWindow.webContents.send('overlay-settings', s)
  }
}

function recomputeOverlaySize() {
  if (!overlayWindow || overlayWindow.isDestroyed()) return
  const s = store.get('overlaySettings', { scale: 100, locked: false })
  const dragH = s.locked ? 0 : 30
  const scale = (s.scale || 100) / 100
  const w = Math.ceil(baseDims.width * scale)
  const h = Math.ceil((baseDims.height + dragH) * scale)
  overlayWindow.setContentSize(w, h)
  sendOverlaySettings()
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
  const s = store.get('overlaySettings', { x: Math.floor(display.width/2-260), y: 100, scale: 100, locked: false, alwaysOnTop: true })
  const dragH = s.locked ? 0 : 30
  const scale = (s.scale || 100) / 100

  overlayWindow = new BrowserWindow({
    width: Math.ceil(baseDims.width * scale),
    height: Math.ceil((baseDims.height + dragH) * scale),
    x: s.x, y: s.y,
    frame: false, transparent: true, resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    focusable: true,                // OBS capture + Alt-Tab
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

  applyAlwaysOnTop(overlayWindow, s.alwaysOnTop)

  const url = isDev ? 'http://localhost:5173/overlay.html' : join(__dirname, '../dist/overlay.html')
  if (isDev) overlayWindow.loadURL(url); else overlayWindow.loadFile(url)

  overlayWindow.on('closed', () => {
    overlayWindow = null
    // important : dire au panneau que l’overlay est caché
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('overlay-ready', false)
    }
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
    // notifier explicitement le panneau
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

  // Timer data (noms/scores)
  ipcMain.handle('timer-data-get', () => store.get('timerData') || { player1: { name: 'Player 1', score: 0 }, player2: { name: 'Player 2', score: 0 } })
  ipcMain.handle('timer-data-set', (_evt, data) => {
    store.set('timerData', data)
    if (overlayWindow && !overlayWindow.isDestroyed()) overlayWindow.webContents.send('timer-data-sync', data)
    return true
  })

  // hotkeys config (UI du panneau utilise window.api.hotkeys.*)
  ipcMain.handle('hotkeys-get', () => {
    // si codes numériques manquants, tenter de déduire depuis la string (F1..F24)
    const norm = { ...hotkeys }
    const fNum = f => (f >= 1 && f <= 24) ? (59 + (f - 1)) : null // approx uiohook
    if (norm.start == null && /^F(\d+)$/.test(hotkeysStr.start || '')) {
      norm.start = fNum(Number(RegExp.$1))
    }
    if (norm.swap == null && /^F(\d+)$/.test(hotkeysStr.swap || '')) {
      norm.swap = fNum(Number(RegExp.$1))
    }
    return norm
  })

  ipcMain.handle('hotkeys-set', (_evt, hk) => {
    // on enregistre ce qui vient du panneau (numérique), on garde aussi une string par défaut si possible
    hotkeys = { ...hotkeys, ...hk }
    // garder une string raisonnable si c’est une touche F*
    const revF = code => {
      const base = 59
      if (typeof code === 'number' && code >= base && code <= base + 23) return `F${code - base + 1}`
      return null
    }
    const sStart = revF(hk.start)
    const sSwap  = revF(hk.swap)
    hotkeysStr = { ...hotkeysStr, ...(sStart?{start:sStart}:{}) , ...(sSwap?{swap:sSwap}:{}) }

    store.set('hotkeys', hotkeys)
    store.set('hotkeysStr', hotkeysStr)
    refreshHotkeyEngine()
    return true
  })

  ipcMain.handle('hotkeys-capture', (_evt, type) => {
    // démarrer une capture : via uiohook si dispo, sinon via before-input-event (panneau focus)
    capturing = (type === 'start' || type === 'swap') ? type : null
    if (!capturing) return true

    if (!usingUiohook && mainWindow && !mainWindow.isDestroyed()) {
      const once = (event, input) => {
        if (!capturing) return
        if (input.type !== 'keyDown') return
        const label = input.key || input.code || ''
        let savedNumeric = null
        let savedString = label

        const m = /^F(\d+)$/.exec(label)
        if (m) {
          const f = Number(m[1])
          if (f >= 1 && f <= 24) {
            savedNumeric = 59 + (f - 1)
            savedString = `F${f}`
          }
        }

        hotkeys = { ...hotkeys, [capturing]: savedNumeric }
        hotkeysStr = { ...hotkeysStr, [capturing]: savedString }
        store.set('hotkeys', hotkeys)
        store.set('hotkeysStr', hotkeysStr)
        refreshHotkeyEngine()

        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('hotkeys-captured', { type: capturing, keycode: savedNumeric })
        }
        capturing = null
        mainWindow.webContents.removeListener('before-input-event', once)
      }
      mainWindow.webContents.on('before-input-event', once)
    }

    return true
  })
}

function refreshHotkeyEngine() {
  // En fallback, on utilise globalShortcut avec les chaînes (F1, F2, ...)
  if (usingUiohook) return
  try { globalShortcut.unregisterAll() } catch {}
  const RATE = 180
  let lastT = 0, lastS = 0

  const sKey = hotkeysStr.start || 'F1'
  const wKey = hotkeysStr.swap  || 'F2'

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
    // charge dynamiquement
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lib = require('uiohook-napi')
    uIOhook = lib.uIOhook
  } catch (e) {
    console.warn('[hotkeys] uiohook non disponible, fallback globalShortcut (pass-through approximatif).', e?.message || e)
    usingUiohook = false
    refreshHotkeyEngine()
    return
  }

  usingUiohook = true
  let lastToggle = 0
  let lastSwap = 0
  const RATE = 180

  uIOhook.on('keydown', (e) => {
    if (capturing) {
      const type = capturing
      capturing = null
      hotkeys = { ...hotkeys, [type]: e.keycode }
      // essayer de déduire une string lisible (F*)
      const base = 59
      if (e.keycode >= base && e.keycode <= base + 23) {
        const f = e.keycode - base + 1
        hotkeysStr = { ...hotkeysStr, [type]: `F${f}` }
      }
      store.set('hotkeys', hotkeys)
      store.set('hotkeysStr', hotkeysStr)
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('hotkeys-captured', { type, keycode: e.keycode })
      }
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

  try { uIOhook.start() } catch (e) {
    console.warn('[hotkeys] uiohook start a échoué, fallback globalShortcut.', e?.message || e)
    usingUiohook = false
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
