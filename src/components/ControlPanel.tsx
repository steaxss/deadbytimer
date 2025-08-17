import React, { useEffect, useState } from "react";
import { ACCENTS, NAME_BG, AccentKey, NameTheme } from "@/themes/palette";

type HKGet = {
  start: number | null;
  swap: number | null;
  startLabel?: string;
  swapLabel?: string;
};

const ACCENT_LABELS_EN: Record<AccentKey, string> = {
  default: "Blue (default)",
  rose: "Pink",
  rouge: "Red",
  orange: "Orange",
  or: "Gold",
  jaune: "Yellow",
  vert: "Green",
  menthe: "Mint",
  bleu_fonce: "Dark Blue",
  bleu_clair: "Light Blue",
  cyan: "Sky/Cyan",
  violet: "Violet",
  lavande: "Lavender",
  marron: "Brown",
  anthracite: "Charcoal",
  argent: "Silver",
  corail: "Coral/Peach",
};

const ControlPanel: React.FC = () => {
  // Overlay
  const [overlayOn, setOverlayOn] = useState(false);
  const [locked, setLocked] = useState(true);
  const [scale, setScale] = useState(100);

  const [nameTheme, setNameTheme] = useState<NameTheme>("default");
  const [accentKey, setAccentKey] = useState<AccentKey>("default");

  // Players
  const [players, setPlayers] = useState({
    player1: { name: "PLAYER 1", score: 0 },
    player2: { name: "PLAYER 2", score: 0 },
  });

  // Hotkeys
  const [hkLabels, setHkLabels] = useState<{ start: string; swap: string }>({
    start: "F1",
    swap: "F2",
  });
  const [capturing, setCapturing] = useState<null | "start" | "swap">(null);

  useEffect(() => {
    window.api.timer.get().then((d) => {
      if (d?.player1 && d?.player2) setPlayers(d);
    });

    window.api.hotkeys.get().then((h: HKGet) => {
      setHkLabels({ start: h.startLabel || "F1", swap: h.swapLabel || "F2" });
    });

    window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
    window.api.overlay.onSettings((s: any) => {
      if (typeof s.locked === "boolean") setLocked(!!s.locked);
      if (typeof s.scale === "number") setScale(s.scale);

      if (s?.nameTheme) setNameTheme(s.nameTheme === "dark" ? "dark" : "default");
      if (s?.accentKey && ACCENTS.some((a) => a.key === s.accentKey))
        setAccentKey(s.accentKey);
    });

    window.api.timer.onSync((d: any) => {
      if (d?.player1 && d?.player2) setPlayers(d);
    });

    window.api.hotkeys.onCaptured(
      (p: {
        type: "start" | "swap";
        keycode?: number | null;
        label?: string;
      }) => {
        if (p.label) setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
        setCapturing(null);
      }
    );

    // Always on top (UI toggle removed)
    window.api.overlay.updateSettings({ alwaysOnTop: true });
  }, []);

  // Helpers
  const savePlayers = (next: typeof players) => {
    setPlayers(next);
    window.api.timer.set(next);
  };

  const onOverlayToggle = async (checked: boolean) => {
    setOverlayOn(checked);
    if (checked) await window.api.overlay.show();
    else await window.api.overlay.hide();
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

  const handleResetAll = () => {
    const next = {
      ...players,
      player1: { ...players.player1, score: 0 },
      player2: { ...players.player2, score: 0 },
    };
    savePlayers(next);
  };

  // Small reusable swatch
  const Swatch: React.FC<{
    isActive: boolean;
    background: string;
    title: string;
    onClick: () => void;
  }> = ({ isActive, background, title, onClick }) => (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      className={[
        // smaller rectangles
        "h-7 w-14 sm:w-16 rounded-lg border transition outline-none focus:ring",
        isActive ? "border-white/40 ring-2 ring-white/20" : "border-white/10 hover:border-white/20",
      ].join(" ")}
      style={{ background }}
    />
  );

  return (
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      {/* Header */}
      <header className="mb-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">
            1v1 Overlay
          </div>
          <h1 className="text-xl font-semibold tracking-tight">DBD Overlay Tools</h1>
        </div>

        {/* iOS toggle + status */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${
              overlayOn
                ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,.8)]"
                : "text-zinc-400"
            }`}
          >
            {overlayOn ? "Overlay Active" : "Overlay Hidden"}
          </span>
          <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={overlayOn}
              onChange={(e) => onOverlayToggle(e.target.checked)}
            />
            <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-emerald-500/70" />
            <span className="absolute h-5 w-5 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6" />
          </label>
        </div>
      </header>

      <div className="scroll-thin pr-1">
        {/* Hotkeys */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Start/Stop/Reset Key
            </div>
            <button
              className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
                capturing === "start" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setCapturing("start");
                window.api.hotkeys.capture("start");
              }}
            >
              {capturing === "start" ? "Press a key…" : hkLabels.start}
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Swap Timer Key
            </div>
            <button
              className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
                capturing === "swap" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setCapturing("swap");
                window.api.hotkeys.capture("swap");
              }}
            >
              {capturing === "swap" ? "Press a key…" : hkLabels.swap}
            </button>
          </div>
        </section>

        {/* Players */}
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">
              Player 1
            </div>
            <input
              className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
              value={players.player1.name}
              onChange={(e) =>
                savePlayers({
                  ...players,
                  player1: { ...players.player1, name: e.target.value },
                })
              }
            />
            <div className="text-xs text-zinc-400">Score</div>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
                onClick={() =>
                  savePlayers({
                    ...players,
                    player1: {
                      ...players.player1,
                      score: Math.max(0, players.player1.score - 1),
                    },
                  })
                }
              >
                −1
              </button>
              <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">
                {players.player1.score}
              </div>
              <button
                className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
                onClick={() =>
                  savePlayers({
                    ...players,
                    player1: {
                      ...players.player1,
                      score: players.player1.score + 1,
                    },
                  })
                }
              >
                +1
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">
              Player 2
            </div>
            <input
              className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
              value={players.player2.name}
              onChange={(e) =>
                savePlayers({
                  ...players,
                  player2: { ...players.player2, name: e.target.value },
                })
              }
            />
            <div className="text-xs text-zinc-400">Score</div>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
                onClick={() =>
                  savePlayers({
                    ...players,
                    player2: {
                      ...players.player2,
                      score: Math.max(0, players.player2.score - 1),
                    },
                  })
                }
              >
                −1
              </button>
              <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">
                {players.player2.score}
              </div>
              <button
                className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
                onClick={() =>
                  savePlayers({
                    ...players,
                    player2: {
                      ...players.player2,
                      score: players.player2.score + 1,
                    },
                  })
                }
              >
                +1
              </button>
            </div>
          </div>
        </section>

        {/* Global actions */}
        <div className="mb-6 flex justify-center">
          <button
            className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2"
            onClick={handleResetAll}
          >
            Reset scores
          </button>
        </div>

        {/* ====== Timer Appearance (Unified) ====== */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Timer Appearance
          </h2>

          {/* Name background */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Name background
              </span>
              <span className="text-xs text-zinc-500">
                Applies to player name boxes
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(["default", "dark"] as NameTheme[]).map((nt) => (
                <Swatch
                  key={nt}
                  title={nt === "default" ? "Default" : "Dark"}
                  background={NAME_BG[nt]}
                  isActive={nameTheme === nt}
                  onClick={() => {
                    setNameTheme(nt);
                    window.api.overlay.updateSettings({ nameTheme: nt });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Accent color (Score + Swap) */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Accent color
              </span>
              <span className="text-xs text-zinc-500">
                Affects score background & swap bar
              </span>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
              {ACCENTS.map((a) => (
                <Swatch
                  key={a.key}
                  title={ACCENT_LABELS_EN[a.key as AccentKey]}
                  background={a.gradient}
                  isActive={accentKey === (a.key as AccentKey)}
                  onClick={() => {
                    const k = a.key as AccentKey;
                    setAccentKey(k);
                    window.api.overlay.updateSettings({ accentKey: k });
                  }}
                />
              ))}
            </div>

            <p className="mt-2 text-xs text-zinc-400">
              The swap bar automatically follows the score color.
            </p>
          </div>
        </section>

        {/* Overlay Settings (no always-on-top toggle) */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Overlay Settings
          </h2>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Scale</span>
              <span className="font-semibold text-[#5AC8FF]">{scale}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={200}
              value={scale}
              onChange={onScale}
              className="w-full [accent-color:#5AC8FF]"
            />
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
                className={[
                  "relative h-6 w-11 rounded-full transition-colors",
                  locked ? "bg-emerald-500" : "bg-neutral-300",
                  "ring-1 ring-black/5",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    locked ? "translate-x-5" : "",
                  ].join(" ")}
                />
              </button>
            </label>
          </div>

          <div
            className={`mt-4 rounded-lg border p-3 text-sm ${
              locked
                ? "border-[#44FF41]/40 bg-[#44FF41]/10 text-[#44FF41]"
                : "border-violet-500/40 bg-violet-500/10 text-violet-300"
            }`}
          >
            {locked
              ? "Overlay is locked – clicks will go through."
              : "Overlay is unlocked – drag the purple bar to reposition."}
          </div>
        </section>

        {/* Discord CTA — Premium overlays */}
        <section className="mt-8 relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-emerald-500/10 p-5">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-violet-500/30" />
          <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/20" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              👑 Premium Overlays
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              Unlock more overlays & tools
            </h3>
            <p className="mt-2 text-sm text-zinc-200">
              Join our Discord to get the premium version: <b>killer streaks</b>,{" "}
              <b>survivor streaks</b>, <b>win/loss counter</b>,{" "}
              <b>tournament overlay</b>, and more!
            </p>

            <a
              href="http://discord.com/invite/aVdT8rRJKc"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
            >
              Join the Discord
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        <section className="mt-6 relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-tr from-cyan-400/10 via-sky-500/10 to-indigo-500/10 p-5">
          <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full blur-3xl bg-cyan-400/30" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              🎨 ReShade Filters
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              GET STEAXS RESHADES
            </h3>
            <p className="mt-2 text-sm text-zinc-200">
              Competitive ReShade presets tailored for Dead by Daylight. Sharper
              visibility, clean colors, and a consistent look across maps.
            </p>
            <a
              href="https://discord.com/invite/6RHPNNVtKw"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition"
            >
              Get the Presets
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6">
          <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-300">
            <div className="uppercase tracking-wider">
              © BY <b>STEAXS</b> &amp; <b>DOC</b> — 2025
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ControlPanel;