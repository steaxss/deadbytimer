export {}
declare global {
  interface Window {
    api: {
      overlay: {
        show(): Promise<any>
        hide(): Promise<any>
        updateSettings(s: any): Promise<any>
        onReady(cb: (v: boolean) => void): void
        onSettings(cb: (s: any) => void): void
        measure(w: number, h: number): Promise<any>
      }
      timer: {
        get(): Promise<any>
        set(d: any): Promise<any>
        onSync(cb: (d: any) => void): void
      }
      hotkeys: {
        get(): Promise<{start:number|null, swap:number|null, startLabel?:string, swapLabel?:string, mode?:'pass-through'|'fallback'}>
        set(hk: {start?:number|null, swap?:number|null}): Promise<any>
        capture(
          type:'start'|'swap' | { type:'start'|'swap', source?: 'any'|'desktop'|'gamepad' },
          source?: 'any'|'desktop'|'gamepad'
          ): Promise<any>

        onCaptured(cb: (p: { type:"start"|"swap"; keycode?:number|null; label?:string; source?: "desktop" | "gamepad" }) => void): void
        on(cb: (p: any) => void): void
        onMode(cb: (mode:'pass-through'|'fallback') => void): void
      },
      gamepad: {
        get(): Promise<{ toggle:string[]; swap:string[] }>
        clear(action:'toggle'|'swap'): Promise<any>
      }
    }
  }
}
