import type React from "react";

type Props = {
  scale: number; onScale: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoScore: boolean; setAutoScore: React.Dispatch<React.SetStateAction<boolean>>; autoScoreThresholdSec: number;
  locked: boolean; setLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlaySettingsSection({ scale, onScale, autoScore, setAutoScore, autoScoreThresholdSec, locked, setLocked }: Props) {
  return (
<>
    {/* ====== Overlay Settings ====== */}
    <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Overlay Settings</h2>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Scale</span>
          <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
        </div>
        <input type="range" min={50} max={200} value={scale} onChange={onScale} className="w-full [accent-color:#5AC8FF]" />
      </div>

      {/* Auto-score toggle */}
      <div className="mb-3 grid grid-cols-1">
        <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
          <span className="text-sm">
            Auto-score winner <span className="opacity-60">({autoScoreThresholdSec}s min)</span>
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={autoScore}
            onClick={() => {
              const next = !autoScore;
              setAutoScore(next);
              window.api.overlay.updateSettings({ autoScoreEnabled: next, autoScoreThresholdSec });
            }}
            className={["relative h-6 w-11 rounded-full transition-colors", autoScore ? "bg-emerald-500" : "bg-neutral-300", "ring-1 ring-black/5"].join(" ")}
          >
            <span aria-hidden className={["absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", autoScore ? "translate-x-5" : ""].join(" ")} />
          </button>
        </label>
      </div>

      <div className="grid grid-cols-1">
        <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
          <span className="text-sm">
            Lock Overlay Position <span className="opacity-50">🔓</span>
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={locked}
            onClick={() => {
              const next = !locked;
              setLocked(next);
              window.api.overlay.updateSettings({ locked: next });
            }}
            className={["relative h-6 w-11 rounded-full transition-colors", locked ? "bg-emerald-500" : "bg-neutral-300", "ring-1 ring-black/5"].join(" ")}
          >
            <span aria-hidden className={["absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", locked ? "translate-x-5" : ""].join(" ")} />
          </button>
        </label>
      </div>

      <div className={`mt-4 rounded-lg border p-3 text-sm ${locked ? "border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]" : "border-violet-500/40 bg-violet-500/10 text-violet-300"}`}>
        {locked ? "Overlay is locked – clicks will go through." : "Overlay is unlocked – drag the purple bar to reposition."}
      </div>

      <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-zinc-300 leading-relaxed">
        <b>How auto-score works</b>:
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Make sure the active timer is on the <b>current survivor</b> (use <b>Swap</b> before starting).</li>
          <li>Pause each survivor’s run (F1). When <b>both</b> sides are paused, the player with the <b>longest time</b> gets +1.</li>
          <li>Times under <b>{autoScoreThresholdSec}s</b> are ignored (prevents accidental starts).</li>
          <li>This never stops your timers — it only updates the score.</li>
        </ul>
      </div>
    </section>
</>
  );
}
