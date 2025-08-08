import React from 'react'
import { useTimerStore } from '@/store/timerStore'
import { formatMillis } from '@/utils/timer'

type TD = { player1:{name:string,score:number}, player2:{name:string,score:number} }

export default function TimerOverlay() {
  const [players, setPlayers] = React.useState<TD>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}})
  const active = useTimerStore(s=>s.active)
  const select = useTimerStore(s=>s.select)
  const toggle = useTimerStore(s=>s.toggle)
  const elapsed = useTimerStore(s=>s.elapsed)
  const status = useTimerStore(s=>s.status)

  // IPC: names/scores sync (only)
  React.useEffect(() => {
    (async () => setPlayers(await window.api.timer.get()))()
    window.api.timer.onSync((d:any)=>setPlayers(d))
  }, [])

  // Hotkeys: F1/F2 from main
  React.useEffect(() => {
    window.api.hotkeys.on((p:any) => {
      if (p?.type === 'toggle') toggle()
      else if (p?.type === 'swap') select(active === 1 ? 2 : 1)
    })
  }, [toggle, select, active])

  // rAF tick for display refresh
  const [, setTick] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const loop = () => { setTick(t => (t+1)&1023); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const t1 = formatMillis(elapsed(1))
  const t2 = formatMillis(elapsed(2))

  return (
    <div className="pointer-events-none select-none" style={{ width: 520 }}>
      {/* Drag handle (visible only when unlocked; handled by main through ignoreMouseEvents) */}
      <div className="h-[30px]"></div>

      <div className="rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 pt-3">
          <div className="text-lg font-semibold truncate">{players.player1.name}</div>
          <div className="px-3 py-1 text-xl font-bold rounded bg-white/10 mx-3">{players.player1.score} - {players.player2.score}</div>
          <div className="text-lg font-semibold text-right truncate">{players.player2.name}</div>
        </div>

        <div className="grid grid-cols-2 gap-0 px-4 py-2">
          <TimerBlock
            label="P1"
            time={t1}
            active={active===1}
            state={status[1]}
          />
          <TimerBlock
            label="P2"
            time={t2}
            active={active===2}
            state={status[2]}
          />
        </div>

        {/* Swap bar */}
        <div className="h-1 w-full bg-white/10 relative">
          <div className="absolute top-0 h-1 bg-violet-500 transition-[left,width] duration-150"
               style={{ left: active===1 ? 8 : 'calc(50% + 4px)', width: 'calc(50% - 12px)' }} />
        </div>

        <div className="px-4 py-2 text-xs text-white/60">
          F2: swap • F1: start → pause → reset (timer actif uniquement)
        </div>
      </div>
    </div>
  )
}

function TimerBlock({label, time, active, state}:{label:string,time:string,active:boolean,state:'stopped'|'running'|'paused'}) {
  return (
    <div className={`rounded-xl px-3 py-2 ${active ? 'bg-white/8 ring-1 ring-violet-500/40' : 'bg-white/5'}`}>
      <div className="text-xs uppercase tracking-wider mb-1 text-white/60">{label} {state === 'running' ? '• running' : state === 'paused' ? '• paused' : ''}</div>
      <div className="dbd-digits font-mono text-4xl leading-none">
        {time}
      </div>
    </div>
  )
}
