import React from 'react'
import { useTimerStore } from '@/store/timerStore'
import { formatMillis } from '@/utils/timer'

type TD = { player1:{name:string,score:number}, player2:{name:string,score:number} }

function splitForTheme(fmt: string) {
  // convertit "MM:SS:CC" -> chars avec ':' et '.' séparateurs plus fins
  // On veut "MM:SS.CC"
  const arr: { ch: string; sep?: boolean }[] = []
  for (let i=0; i<fmt.length; i++) {
    const ch = fmt[i]
    if (ch === ':') arr.push({ ch, sep: true })
    else if (ch === '-') arr.push({ ch }) // au cas où
    else arr.push({ ch })
  }
  // insérer '.' entre SS et CC
  if (arr.length >= 8 && arr[2]?.ch === ':' ) {
    // "MM:SS:CC" => remplace le 5e char ':' par '.'
    const idx = 5
    if (arr[idx]?.ch === ':') arr[idx].ch = '.'
  }
  return arr
}

export default function TimerOverlay() {
  const [players, setPlayers] = React.useState<TD>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}})
  const active = useTimerStore(s=>s.active)
  const status = useTimerStore(s=>s.status)
  const elapsed = useTimerStore(s=>s.elapsed)

  const [locked, setLocked] = React.useState(false)

  // IPC: names/scores only
  React.useEffect(() => {
    (async () => setPlayers(await window.api.timer.get()))()
    window.api.timer.onSync((d:any)=>setPlayers(d))
  }, [])

  // Receive overlay settings (for lock/drag bar visibility)
  React.useEffect(() => {
    window.api.overlay.onSettings((s:any) => {
      setLocked(!!s.locked)
      // always-on-top est géré côté main
    })
  }, [])

  // Hotkeys: F1/F2 from main — register ONCE; imperative store getters
  React.useEffect(() => {
    const handler = (p:any) => {
      const api = useTimerStore.getState()
      if (p?.type === 'toggle') api.toggle()
      else if (p?.type === 'swap') api.select(api.active === 1 ? 2 : 1)
    }
    window.api.hotkeys.on(handler)
  }, [])

  // rAF tick for display refresh
  const [, setTick] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const loop = () => { setTick(t => (t+1)&1023); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Mesure DOM → taille exacte côté main
  React.useLayoutEffect(() => {
    const el = document.getElementById('timerContainer')
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      window.api.overlay.measure(Math.round(r.width), Math.round(r.height))
    }
    // fonts peuvent modifier la métrique : attendre si dispo
    // @ts-ignore
    if (document.fonts?.ready) { /* modern browsers in Electron */
      // @ts-ignore
      document.fonts.ready.then(() => { measure(); setTimeout(measure, 50) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [players.player1.name, players.player2.name])

  const t1 = splitForTheme(formatMillis(elapsed(1)))
  const t2 = splitForTheme(formatMillis(elapsed(2)))

  const p1Scroll = players.player1.name.length > 16
  const p2Scroll = players.player2.name.length > 16

  return (
    <div className="pointer-events-none select-none" style={{ width: 520 }}>
      {/* Drag handle (visible quand unlock) */}
      <div className={`drag-handle ${locked ? '' : 'visible'}`}>
        Drag to move
      </div>

      <div className="rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 overflow-hidden">
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
          <div className={`timer left ${active===1 ? 'active' : ''}`}>
            <span className="timer-text dbd-digits">
              {t1.map((c, i) => (
                <span key={i} className={`timer-char ${c.sep ? 'separator' : ''}`}>{c.ch}</span>
              ))}
            </span>
          </div>
          <div className={`timer right ${active===2 ? 'active' : ''}`}>
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
