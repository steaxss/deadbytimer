import type React from "react";
import type { GamepadMapping } from "@/types/ipc";

type Props = {
  open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mapping: GamepadMapping; setMapping: React.Dispatch<React.SetStateAction<GamepadMapping>>;
  capturing: "toggle" | "swap" | null; setCapturing: React.Dispatch<React.SetStateAction<"toggle" | "swap" | null>>;
};

export default function GamepadHotkeysSection({ open: gpOpen, setOpen: setGpOpen, mapping: gp, setMapping: setGp, capturing: capturingGp, setCapturing: setCapturingGp }: Props) {
  return (
<>
    {/* Gamepad hotkeys */}
    <section className="mb-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/[0.04] transition"
        onClick={() => setGpOpen(v => !v)}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Controller Hotkeys</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${gpOpen ? "rotate-180" : ""}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {gpOpen && (
        <>
        <div className="px-4 pb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Start/Stop/Reset</div>
              <button
                className="text-xs rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
                onClick={async () => {
                  try {
                    await window.api?.gamepad?.clear?.("toggle");
                    const next = await window.api?.gamepad?.get?.();
                    if (next) setGp(next);
                  } catch (error) {
                    console.error("Failed to clear the gamepad toggle mapping", error);
                  }
                }}
              >
                Clear
              </button>
            </div>
            <button
              className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
                capturingGp === "toggle" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setCapturingGp("toggle");
                window.api.hotkeys.capture({ type: "start", source: "gamepad" });
              }}
            >
              {capturingGp === "toggle" ? "Press a gamepad button…" : gp.toggle?.join(" + ") || "—"}
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Swap</div>
              <button
                className="text-xs rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
                onClick={async () => {
                  try {
                    await window.api?.gamepad?.clear?.("swap");
                    const next = await window.api?.gamepad?.get?.();
                    if (next) setGp(next);
                  } catch (error) {
                    console.error("Failed to clear the gamepad swap mapping", error);
                  }
                }}
              >
                Clear
              </button>
            </div>
            <button
              className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${
                capturingGp === "swap" ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setCapturingGp("swap");
                window.api.hotkeys.capture({ type: "swap", source: "gamepad" });
              }}
            >
              {capturingGp === "swap" ? "Press a gamepad button…" : gp.swap?.join(" + ") || "—"}
            </button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs text-zinc-500 leading-relaxed">
            <span className="font-medium text-zinc-400">Controller not detected?</span>
            {" "}This app uses XInput. If your controller isn't recognized, install <span className="font-medium text-zinc-300">DS4Windows</span> — the most recommended option for performance, compatible with PS4, PS5, Switch Pro and more.
          </div>
        </div>
        </>
      )}
    </section>
</>
  );
}
