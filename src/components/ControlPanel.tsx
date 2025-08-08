import React, { useEffect, useState } from 'react';

/** Types hotkeys (codes + labels) */
type HKGet = {
  start: number | null;
  swap: number | null;
  startLabel?: string;
  swapLabel?: string;
};
type HKSet = { start?: number | null; swap?: number | null };

/** UI de contrôle — uniquement du style, aucune logique cassée */
const ControlPanel: React.FC = () => {
  // Overlay
  const [overlayOn, setOverlayOn] = useState(false);
  const [locked, setLocked] = useState(true);
  const [scale, setScale] = useState(100);

  // Joueurs
  const [players, setPlayers] = useState({
    player1: { name: 'PLAYER 1', score: 0 },
    player2: { name: 'PLAYER 2', score: 0 },
  });

  // Hotkeys
  const [hkCodes, setHkCodes] = useState<{ start: number | null; swap: number | null }>({
    start: null,
    swap: null,
  });
  const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
    start: 'F1',
    swap: 'F2',
  });
  const [capturing, setCapturing] = useState<null | 'start' | 'swap'>(null);

  // Init : récupère les états existants + s'abonne aux updates
  useEffect(() => {
    // Timer data (noms/scores)
    window.api.timer.get().then((d) => {
      if (d?.player1 && d?.player2) setPlayers(d);
    });

    // Hotkeys configurées
    window.api.hotkeys.get().then((h: HKGet) => {
      setHkCodes({ start: h.start ?? null, swap: h.swap ?? null });
      setHkLabels({ start: h.startLabel || 'F1', swap: h.swapLabel || 'F2' });
    });

    // Overlay : état + settings
    window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
    window.api.overlay.onSettings((s: any) => {
      if (typeof s.locked === 'boolean') setLocked(!!s.locked);
      if (typeof s.scale === 'number') setScale(s.scale);
    });

    // Sync timer (scores/noms) poussé depuis le main
    window.api.timer.onSync((d: any) => {
      if (d?.player1 && d?.player2) setPlayers(d);
    });

    // Fin de capture hotkey -> applique label/code
    window.api.hotkeys.onCaptured((p: { type: 'start' | 'swap'; keycode?: number | null; label?: string }) => {
      if (p.label) setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
      if (typeof p.keycode !== 'undefined') {
        setHkCodes((prev) => ({ ...prev, [p.type]: p.keycode ?? null }));
      }
      setCapturing(null);
    });
  }, []);

  // Helpers
  const savePlayers = (next: typeof players) => {
    setPlayers(next);
    window.api.timer.set(next); // ne change que noms/scores côté main
  };

  const toggleOverlay = async () => {
    if (overlayOn) {
      await window.api.overlay.hide();
      setOverlayOn(false);
    } else {
      await window.api.overlay.show();
      setOverlayOn(true);
    }
  };

  const saveHotkeys = async () => {
    const payload: HKSet = { start: hkCodes.start ?? null, swap: hkCodes.swap ?? null };
    await window.api.hotkeys.set(payload);
  };

  const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setScale(v);
    window.api.overlay.updateSettings({ scale: v });
  };

  const onLock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    setLocked(v);
    window.api.overlay.updateSettings({ locked: v });
  };

  const onTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.api.overlay.updateSettings({ alwaysOnTop: e.target.checked });
  };

  const handleResetAll = () => {
    const next = {
      ...players,
      player1: { ...players.player1, score: 0 },
      player2: { ...players.player2, score: 0 },
    };
    savePlayers(next);
    // Les timers se réinitialisent comme d’habitude via F1 (on ne modifie pas la logique ici)
  };

  return (
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      {/* Header */}
      <header className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">1v1 Overlay</div>
          <h1 className="text-xl font-semibold tracking-tight">DBD Overlay Tools</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleOverlay}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              overlayOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-violet-600 hover:bg-violet-500'
            }`}
          >
            {overlayOn ? 'Hide Overlay' : 'Show Overlay'}
          </button>
          <button onClick={saveHotkeys} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500 transition">
            Save hotkeys
          </button>
        </div>
      </header>

      {/* Styles (UI only) */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Select Timer Style</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Default', desc: 'Default Style', premium: false },
            { label: 'Glass', desc: '👑 Minimal Glass', premium: true },
            { label: 'VS', desc: '👑 Circular Progress', premium: true },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10 hover:ring-violet-500/40 transition backdrop-blur"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{s.label}</span>
                {s.premium && <span className="text-xs text-zinc-400">UI</span>}
              </div>
              <div className="text-xs text-zinc-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotkeys */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Start/Stop/Reset Key</div>
          <button
            className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
              capturing === 'start' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
            onClick={() => {
              setCapturing('start');
              window.api.hotkeys.capture('start');
            }}
          >
            {capturing === 'start' ? 'Press a key…' : hkLabels.start}
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Swap Timer Key</div>
          <button
            className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
              capturing === 'swap' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
            onClick={() => {
              setCapturing('swap');
              window.api.hotkeys.capture('swap');
            }}
          >
            {capturing === 'swap' ? 'Press a key…' : hkLabels.swap}
          </button>
        </div>
      </section>

      {/* Joueurs */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Player 1 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 1</div>
          <input
            className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={players.player1.name}
            onChange={(e) => savePlayers({ ...players, player1: { ...players.player1, name: e.target.value } })}
          />
          <div className="text-xs text-zinc-400">Score</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
              onClick={() =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
                })
              }
            >
              −1
            </button>
            <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player1.score}</div>
            <button
              className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
              onClick={() =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, score: players.player1.score + 1 },
                })
              }
            >
              +1
            </button>
          </div>
        </div>

        {/* Player 2 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 2</div>
          <input
            className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={players.player2.name}
            onChange={(e) => savePlayers({ ...players, player2: { ...players.player2, name: e.target.value } })}
          />
          <div className="text-xs text-zinc-400">Score</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
              onClick={() =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
                })
              }
            >
              −1
            </button>
            <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player2.score}</div>
            <button
              className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
              onClick={() =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, score: players.player2.score + 1 },
                })
              }
            >
              +1
            </button>
          </div>
        </div>
      </section>

      {/* Actions globales */}
      <div className="mb-6 flex justify-center">
        <button onClick={handleResetAll} className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2">
          Reset all timers & scores
        </button>
      </div>

      {/* Overlay Settings */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Overlay Settings</h2>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Scale</span>
            <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
          </div>
          <input type="range" min={50} max={200} value={scale} onChange={onScale} className="w-full [accent-color:#5AC8FF]" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
            <span className="text-sm">
              Lock Overlay Position <span className="opacity-50">🔓</span>
            </span>
            <input type="checkbox" checked={locked} onChange={onLock} className="h-5 w-9 accent-violet-500" />
          </label>

          <label className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
            <span className="text-sm">Overlay stays above all windows</span>
            <input type="checkbox" defaultChecked onChange={onTop} className="h-5 w-9 accent-violet-500" />
          </label>
        </div>

        <div
          className={`mt-4 rounded-lg border p-3 text-sm ${
            locked
              ? 'border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]'
              : 'border-violet-500/40 bg-violet-500/10 text-violet-300'
          }`}
        >
          {locked ? 'Overlay is locked – clicks will go through.' : 'Overlay is unlocked – drag the purple bar to reposition.'}
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Astuce : l’overlay peut être minimisé et reste dans la barre des tâches lorsqu’il est déverrouillé.
        </p>
      </section>
    </div>
  );
};

export default ControlPanel;
