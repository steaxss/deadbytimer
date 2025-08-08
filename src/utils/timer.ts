export class PreciseTimer {
  private _running = false;
  private _startedAt = 0;
  private _accum = 0;

  start() {
    if (this._running) return;
    this._startedAt = performance.now();
    this._running = true;
  }
  pause() {
    if (!this._running) return;
    this._accum += performance.now() - this._startedAt;
    this._running = false;
  }
  reset() {
    this._running = false;
    this._accum = 0;
    this._startedAt = 0;
  }
  get running() { return this._running; }
  get elapsedMs() {
    return this._running ? this._accum + (performance.now() - this._startedAt) : this._accum;
  }
}

export function formatMillis(ms:number) {
  // legacy "MM:SS:CC" — conservé si besoin ailleurs
  const total = Math.max(0, Math.floor(ms));
  const cs = Math.floor((total % 1000) / 10);
  const secs = Math.floor(total / 1000) % 60;
  const mins = Math.floor(total / 60000);
  const pad = (n:number)=>n.toString().padStart(2,'0');
  return `${pad(mins)}:${pad(secs)}:${pad(cs)}`;
}

// Nouveau : dynamique
export function formatMillisDynamic(ms:number) {
  const total = Math.max(0, Math.floor(ms));
  const cs = Math.floor((total % 1000) / 10);           // 0..99
  const secs = Math.floor(total / 1000) % 60;           // 0..59
  const mins = Math.floor(total / 60000);               // 0..∞

  const cs2 = cs.toString().padStart(2, '0');
  if (mins > 0) {
    const ss = secs.toString().padStart(2,'0');
    return `${mins}:${ss}.${cs2}`;                      // M:SS.CC (minutes sans zéro superflu)
  } else {
    // pas de minutes → "S.CC" (et 0.00 au départ)
    return `${secs}.${cs2}`;
  }
}
