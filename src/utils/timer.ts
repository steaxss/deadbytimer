export class PreciseTimer {
  private _running = false;
  private _startedAt = 0; // performance.now() when running
  private _accum = 0; // ms accumulated when paused/stopped

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
  const total = Math.max(0, Math.floor(ms));
  const cs = Math.floor((total % 1000) / 10); // centiseconds
  const secs = Math.floor(total / 1000) % 60;
  const mins = Math.floor(total / 60000);
  const pad = (n:number)=>n.toString().padStart(2,'0');
  return `${pad(mins)}:${pad(secs)}:${pad(cs)}`;
}
