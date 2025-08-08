import React from 'react'
import { useTimerStore } from '@/store/timerStore'
import { formatMillisDynamic } from '@/utils/timer'

type TD = { player1:{name:string,score:number}, player2:{name:string,score:number} }

function splitForTheme(fmt: string) {
  // support "SS.CC" ou "M:SS.CC"
  const arr: { ch: string; sep?: boolean }[] = []
  for (let i=0;i<fmt.length;i++){
    const ch = fmt[i]
    if (ch === ':' || ch === '.') arr.push({ ch, sep: true })
    else arr.push({ ch })
  }
  return arr
}

export default function TimerOverlay() {
  const [players, setPlayers] = React.useState<TD>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}})
  const active = useTimerStore(s=>s.active)
  const status = useTimerStore(s=>s.status)
  const elapsed = useTimerStore(s=>s.elapsed)

  const [locked, setLocked] = React.useState(false)
  const [scale, setScale] = React.useState(100)

  // IPC: names/scores only
  React.useEffect(() => {
    (async () => setPlayers(await window.api.timer.get()))()
    window.api.timer.onSync((d:any)=>setPlayers(d))
  }, [])

  // Receive overlay settings (lock + scale)
  React.useEffect(() => {
    window.api.overlay.onSettings((s:any) => {
      setLocked(!!s.locked)
      setScale(s.scale || 100)
    })
  }, [])

  // Hotkeys globales (venant du main via uiohook)
  React.useEffect(() => {
    const handler = (p:any) => {
      const api = useTimerStore.getState()
      if (p?.type === 'toggle') api.toggle()
      else if (p?.type === 'swap') api.select(api.active === 1 ? 2 : 1)
    }
    window.api.hotkeys.on(handler)
  }, [])

  // rAF tick
  const [, setTick] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const loop = () => { setTick(t => (t+1)&1023); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Mesure DOM non-scalée (offsetWidth/Height ignorent transform)
  React.useLayoutEffect(() => {
    const el = document.getElementById('timerContainer')
    if (!el) return
    const measure = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      window.api.overlay.measure(w, h)
    }
    // fonts prêtes → mesurer
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(() => { measure(); setTimeout(measure, 50) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [players.player1.name, players.player2.name])

  const t1 = splitForTheme(formatMillisDynamic(elapsed(1)))
  const t2 = splitForTheme(formatMillisDynamic(elapsed(2)))

  const p1Scroll = players.player1.name.length > 16
  const p2Scroll = players.player2.name.length > 16

  const s = (scale || 100)/100

  return (
    // wrapper extérieur = dimension exacte *après* zoom → pas de scroll
    <div
      className="pointer-events-none select-none"
      style={{ width: Math.round(520*s), height: Math.round((120 + (locked?0:30))*s), overflow:'hidden' }}
    >
      {/* Drag handle (visible quand unlock) */}
      <div className={`drag-handle ${locked ? '' : 'visible'}`}>
        Drag to move
      </div>

      {/* Coins carrés: pas de rounded ni border */}
      {/* Zoom par transform sur le contenu interne */}
      <div style={{ transform:`scale(${s})`, transformOrigin:'top left', width:520, height:120 }}>
        <div className="timer-overlay" id="timerContainer">
          {/* Noms + score */}
          <div className={`name left ${p1Scroll ? 'scrolling' : ''}`}>
            <span className="name-scroll">{players.player1.name || 'PLAYER 1'}</span>
          </div>
          <div className="score-value">
            {players.player1.score} – {players.player2.score}
          </div>
          <div className={`name right ${p2Scroll ? 'scrolling' : ''}`}>
            <span className="name-scroll">{players.player2.name || 'PLAYER 2'}</span>
          </div>

          {/* Timers */}
          <div className={`timer left ${active===1 ? 'active' : ''}`} aria-label={status[1]}>
            <span className="timer-text dbd-digits">
              {t1.map((c, i) => (
                <span key={i} className={`timer-char ${c.sep ? 'separator' : ''}`}>{c.ch}</span>
              ))}
            </span>
          </div>
          <div className={`timer right ${active===2 ? 'active' : ''}`} aria-label={status[2]}>
            <span className="timer-text dbd-digits">
              {t2.map((c, i) => (
                <span key={i} className={`timer-char ${c.sep ? 'separator' : ''}`}>{c.ch}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
