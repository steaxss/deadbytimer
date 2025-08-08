import React, { useEffect, useState } from 'react';

type HKGet = {
  start: number | null;
  swap: number | null;
  startLabel?: string;
  swapLabel?: string;
  mode?: 'pass-through' | 'fallback';
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
  const [mode, setMode] = useState<'pass-through' | 'fallback'>('fallback');

  // INIT
  useEffect(() => {
    window.api.timer.get().then(setPlayers);
    window.api.hotkeys.get().then((h: HKGet) => {
      setHkCodes({ start: h.start ?? null, swap: h.swap ?? null });
      setHkLabels({ start: h.startLabel || 'F1', swap: h.swapLabel || 'F2' });
      if (h.mode) setMode(h.mode);
    });
    window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
    window.api.overlay.onSettings((s: any) => {
      setLocked(!!s.locked);
      setScale(s.scale || 100);
    });
    window.api.timer.onSync((d: any) => setPlayers(d));

    // ✅ Le main envoie instantanément label + (plus tard) code
    window.api.hotkeys.onCaptured(
      (p: { type: 'start' | 'swap'; keycode?: number | null; label?: string }) => {
        if (p.label) setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
        if (p.keycode != null) setHkCodes((prev) => ({ ...prev, [p.type]: p.keycode! }));
        setCapturing(null);
      },
    );
    window.api.hotkeys.onMode((m: 'pass-through' | 'fallback') => setMode(m));
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
    <div className="p-6 max-w-xl mx-auto font-ui">
      <h1 className="text-2xl font-semibold mb-1">DBD 1v1 Timer — Control Panel</h1>
      <div className={`text-sm mb-4 ${mode === 'pass-through' ? 'text-emerald-400' : 'text-amber-400'}`}>
        Hotkeys mode:{' '}
        <b>{mode === 'pass-through' ? 'Pass-through (uiohook)' : 'Fallback (intercept)'}</b>
      </div>

      {/* Players */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm text-zinc-400">Player 1 name</label>
          <input
            className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
            value={players.player1.name}
            onChange={(e) =>
              savePlayers({ ...players, player1: { ...players.player1, name: e.target.value } })
            }
          />
          <label className="block text-sm text-zinc-400">Score</label>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
                })
              }
            >
              -
            </button>
            <div className="min-w-10 text-center">{players.player1.score}</div>
            <button
              className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, score: players.player1.score + 1 },
                })
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm text-zinc-400">Player 2 name</label>
          <input
            className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
            value={players.player2.name}
            onChange={(e) =>
              savePlayers({ ...players, player2: { ...players.player2, name: e.target.value } })
            }
          />
          <label className="block text-sm text-zinc-400">Score</label>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
                })
              }
            >
              -
            </button>
            <div className="min-w-10 text-center">{players.player2.score}</div>
            <button
              className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
              onClick={() =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, score: players.player2.score + 1 },
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Overlay controls */}
      <div className="mt-6 flex items-center gap-3">
        {overlayOn ? (
          <button className="px-3 py-2 rounded bg-red-700 hover:bg-red-600" onClick={toggleOverlay}>
            Hide Overlay
          </button>
        ) : (
          <button
            className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-600"
            onClick={toggleOverlay}
          >
            Show Overlay
          </button>
        )}

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={locked}
            onChange={(e) => {
              setLocked(e.target.checked);
              window.api.overlay.updateSettings({ locked: e.target.checked });
            }}
          />
          <span>Lock (click-through)</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <span>Scale</span>
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
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => window.api.overlay.updateSettings({ alwaysOnTop: e.target.checked })}
          />
          <span>Always on top</span>
        </label>
      </div>

      {/* Hotkeys */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
          <div className="text-sm text-zinc-400 mb-2">Start/Pause key</div>
          <button
            className={`w-full px-3 py-2 rounded ${capturing === 'start' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            onClick={() => {
              setCapturing('start');
              window.api.hotkeys.capture('start'); // le main capte et renvoie immédiatement le label
            }}
          >
            {capturing === 'start' ? 'Press a key…' : hkLabels.start}
          </button>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
          <div className="text-sm text-zinc-400 mb-2">Swap key</div>
          <button
            className={`w-full px-3 py-2 rounded ${capturing === 'swap' ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            onClick={() => {
              setCapturing('swap');
              window.api.hotkeys.capture('swap');
            }}
          >
            {capturing === 'swap' ? 'Press a key…' : hkLabels.swap}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <button className="px-4 py-2 rounded bg-violet-700 hover:bg-violet-600" onClick={async () => {
          const payload: HKSet = { start: hkCodes.start ?? null, swap: hkCodes.swap ?? null };
          await window.api.hotkeys.set(payload);
        }}>
          Save hotkeys
        </button>
        <span className="ml-3 text-sm text-zinc-500">
          {mode === 'pass-through' ? 'Pass-through activé (uiohook).' : 'Fallback intercept (globalShortcut).'}
        </span>
      </div>
    </div>
  );
};

export default ControlPanel;