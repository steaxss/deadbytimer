import { create } from 'zustand'
import { PreciseTimer } from '@/utils/timer'

type Status = 'stopped'|'running'|'paused'

const t1 = new PreciseTimer()
const t2 = new PreciseTimer()

type S = {
  active: 1|2
  status: Record<1|2, Status>
  clicks: Record<1|2, 0|1|2> // press cycles on F1 for the current pause → reset
  select: (n:1|2)=>void
  toggle: ()=>void // F1 behavior
  reset: (n:1|2)=>void
  elapsed: (n:1|2)=>number
}

export const useTimerStore = create<S>((set, get) => ({
  active: 1,
  status: { 1: 'stopped', 2: 'stopped' },
  clicks: { 1: 0, 2: 0 },

  select: (n) => set((s)=>({ active: n, clicks: { ...s.clicks, [n]: s.clicks[n] as 0|1|2 } })),

  toggle: () => {
    const { active, status, clicks } = get()
    const timer = active === 1 ? t1 : t2
    if (status[active] === 'running') {
      timer.pause()
      set({ status: { ...status, [active]: 'paused' }, clicks: { ...clicks, [active]: 1 } })
      return
    }
    if (status[active] === 'paused') {
      // third press → reset
      if (clicks[active] >= 1) {
        timer.reset()
        set({ status: { ...status, [active]: 'stopped' }, clicks: { ...clicks, [active]: 0 } })
      } else {
        // safety, but should not happen
        timer.start()
        set({ status: { ...status, [active]: 'running' }, clicks: { ...clicks, [active]: 0 } })
      }
      return
    }
    // stopped → start
    timer.start()
    set({ status: { ...status, [active]: 'running' }, clicks: { ...clicks, [active]: 0 } })
  },

  reset: (n) => {
    (n===1?t1:t2).reset()
    set((s)=>({ status: { ...s.status, [n]: 'stopped' }, clicks: { ...s.clicks, [n]: 0 } }))
  },

  elapsed: (n) => (n===1?t1:t2).elapsedMs
}))
