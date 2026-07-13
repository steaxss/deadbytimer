import React from "react";
import type { HotkeyAction } from "@/types/ipc";

type Labels = Record<HotkeyAction, string>;
type Props = Readonly<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labels: Labels;
  setLabels: React.Dispatch<React.SetStateAction<Labels>>;
  capturing: HotkeyAction | null;
  setCapturing: React.Dispatch<React.SetStateAction<HotkeyAction | null>>;
}>;

const ITEMS: ReadonlyArray<Readonly<{ action: HotkeyAction; title: string; fallback: string }>> = [
  { action: "start", title: "Start / Pause / Resume Key", fallback: "F1" },
  { action: "reset", title: "Reset Timer Key", fallback: "—" },
  { action: "swap", title: "Swap Timer Key", fallback: "F2" },
];

function labelFromResult(action: HotkeyAction, result: Awaited<ReturnType<typeof window.api.hotkeys.clear>>) {
  if (action === "start") return result.startLabel || "F1";
  if (action === "swap") return result.swapLabel || "F2";
  return result.resetLabel || "—";
}

export default function DesktopHotkeysSection({
  open, setOpen, labels, setLabels, capturing, setCapturing,
}: Props) {
  const clear = async (action: HotkeyAction) => {
    try {
      const result = await window.api.hotkeys.clear(action);
      setLabels((current) => ({ ...current, [action]: labelFromResult(action, result) }));
    } catch (error) {
      console.error(`Failed to clear the ${action} hotkey`, error);
    }
  };

  const capture = (action: HotkeyAction) => {
    setCapturing(action);
    void window.api.hotkeys.capture({ type: action, source: "desktop" });
  };

  return (
    <section className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <button className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-white/[0.04]" onClick={() => setOpen((value) => !value)}>
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Keyboard / Mouse Hotkeys</span>
        <svg className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ITEMS.map(({ action, title }) => (
              <div key={action} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{title}</div>
                  <button className="rounded-md border border-white/15 px-2 py-1 text-xs hover:bg-white/10" onClick={() => void clear(action)}>Clear</button>
                </div>
                <button
                  className={`w-full rounded-lg px-3 py-3 text-center text-base font-semibold tracking-wide transition ${capturing === action ? "bg-violet-600" : "bg-zinc-800 hover:bg-zinc-700"}`}
                  onClick={() => capture(action)}
                >
                  {capturing === action ? "Press a key…" : labels[action]}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
