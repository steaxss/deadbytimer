import React, { useEffect, useState } from 'react';

type HKGet = {
  start: number | null;
  swap: number | null;
  startLabel?: string;
  swapLabel?: string;
  // mode supprimé de l'UI (pas d'affichage)
};
type HKSet = { start?: number | null; swap?: number | null };

const ControlPanel: React.FC = () => {
  const [overlayOn, setOverlayOn] = useState(false);
  const [locked, setLocked] = useState(true);
  const [scale, setScale] = useState(100);

  const [players, setPlayers] = useState({
    player1: { name: 'PLAYER 1', score: 0 },
    player2: { name: 'PLAYER 2', score: 0 },
  });

  const [hkCodes, setHkCodes] = useState<{ start: number | null; swap: number | null }>({
    start: null,
    swap: null,
  });
  const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
    start: 'F1',
    swap: 'F2',
  });
  const [capturing, setCapturing] = useState<null | 'start' | 'swap'>(null);

  // INIT : récupère données + hotkeys + état overlay
  useEffect(() => {
    window.api.timer.get().then(setPlayers);
    window.api.hotkeys.get().then((h: HKGet) => {
      setHkCodes({ start: h.start ?? null, swap: h.swap ?? null });
      setHkLabels({ start: h.startLabel || 'F1', swap: h.swapLabel || 'F2' });
    });

    window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
    window.api.overlay.onSettings((s: any) => {
      setLocked(!!s.locked);
      setScale(s.scale || 100);
    });
    window.api.timer.onSync((d: any) => setPlayers(d));

    // le main renvoie label/code pendant la capture
    window.api.hotkeys.onCaptured(
      (p: { type: 'start' | 'swap'; keycode?: number | null; label?: string }) => {
        if (p.label) setHkLabels(prev => ({ ...prev, [p.type]: p.label! }));
        if (p.keycode != null) setHkCodes(prev => ({ ...prev, [p.type]: p.keycode! }));
        setCapturing(null);
      },
    );
  }, []);

  const savePlayers = (next: any) => {
    setPlayers(next);
    window.api.timer.set(next);
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

  return (
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">1v1 Timer Overlay</h1>
          <p className="text-sm text-zinc-400">Panneau de contrôle</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleOverlay}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition
              ${overlayOn ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
          >
            {overlayOn ? 'Hide Overlay' : 'Show Overlay'}
          </button>
          <button
            onClick={saveHotkeys}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500 transition"
          >
            Save hotkeys
          </button>
        </div>
      </header>

      {/* SECTION Styles (UI only, non bloquant) */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Select Timer Style
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Default', desc: 'Default Style', premium: false },
            { label: 'Glass', desc: '👑 Minimal Glass', premium: true },
            { label: 'VS', desc: '👑 Circular Progress', premium: true },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 ring-1 ring-zinc-800/40 hover:ring-violet-500/40 transition"
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

      {/* SECTION Hotkeys */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Start/Stop/Reset Key
          </div>
          <button
            className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide
              ${capturing === 'start' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'} transition`}
            onClick={() => {
              setCapturing('start');
              window.api.hotkeys.capture('start');
            }}
          >
            {capturing === 'start' ? 'Press a key…' : hkLabels.start}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Swap Timer Key
          </div>
          <button
            className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide
              ${capturing === 'swap' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'} transition`}
            onClick={() => {
              setCapturing('swap');
              window.api.hotkeys.capture('swap');
            }}
          >
            {capturing === 'swap' ? 'Press a key…' : hkLabels.swap}
          </button>
        </div>
      </section>

      {/* SECTION Joueurs */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Player 1 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Player 1</div>
          <input
            className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={players.player1.name}
            onChange={(e) =>
              savePlayers({ ...players, player1: { ...players.player1, name: e.target.value } })
            }
          />
          <div className="text-xs text-zinc-400">Score</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
                })
              }
            >
              −1
            </button>
            <div className="min-w-10 text-center text-base font-semibold">{players.player1.score}</div>
            <button
              className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
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
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">Player 2</div>
          <input
            className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={players.player2.name}
            onChange={(e) =>
              savePlayers({ ...players, player2: { ...players.player2, name: e.target.value } })
            }
          />
          <div className="text-xs text-zinc-400">Score</div>
          <div className="mt-2 flex items-center gap-2">
            <button
              className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
                })
              }
            >
              −1
            </button>
            <div className="min-w-10 text-center text-base font-semibold">{players.player2.score}</div>
            <button
              className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
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

      {/* SECTION Overlay */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Overlay Settings
        </h2>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Scale</span>
            <span className="font-semibold">{scale}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={200}
            value={scale}
            onChange={(e) => {
              const v = Number(e.target.value);
              setScale(v);
              window.api.overlay.updateSettings({ scale: v });
            }}
            className="w-full accent-violet-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
            <span className="text-sm">Lock Overlay Position</span>
            <input
              type="checkbox"
              checked={locked}
              onChange={(e) => {
                setLocked(e.target.checked);
                window.api.overlay.updateSettings({ locked: e.target.checked });
              }}
              className="h-5 w-9 cursor-pointer accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
            <span className="text-sm">Overlay stays above all windows</span>
            <input
              type="checkbox"
              defaultChecked
              onChange={(e) => window.api.overlay.updateSettings({ alwaysOnTop: e.target.checked })}
              className="h-5 w-9 cursor-pointer accent-violet-500"
            />
          </label>
        </div>

        <div
          className={`mt-4 rounded-lg border p-3 text-sm ${
            locked
              ? 'border-emerald-700/40 bg-emerald-900/20 text-emerald-300'
              : 'border-violet-700/40 bg-violet-900/20 text-violet-300'
          }`}
        >
          {locked
            ? "Overlay is locked – clicks will go through."
            : "Overlay is unlocked – drag the purple bar to reposition."}
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Astuce : l’overlay peut être minimisé et reste dans la barre des tâches lorsqu’il est déverrouillé.
        </p>
      </section>
    </div>
  );
};

export default ControlPanel;
