import React, { useEffect, useState } from "react";

type HookStatus = "active" | "unavailable";

interface PreferencesModalProps {
  appVersion: string;
  onClose: () => void;
}

function getHookStatus(uiohookLoaded: boolean): HookStatus {
  return uiohookLoaded ? "active" : "unavailable";
}

const STATUS_CONFIG: Record<HookStatus, { dot: string; label: string; desc: string }> = {
  active: {
    dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,.8)]",
    label: "Active",
    desc: "Keyboard shortcuts are working globally, including in-game.",
  },
  unavailable: {
    dot: "bg-red-500",
    label: "Unavailable",
    desc: "The input module failed to load. Install the Microsoft C++ Runtime (x64) and restart the app.",
  },
};

export default function PreferencesModal({ appVersion, onClose }: PreferencesModalProps) {
  const [uiohookLoaded, setUiohookLoaded] = useState<boolean>(false);
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    window.api.hotkeys.get().then((h) => {
      setUiohookLoaded(h.uiohookLoaded ?? false);
    });
  }, []);

  const status = getHookStatus(uiohookLoaded);
  const cfg = STATUS_CONFIG[status];

  const handleRestart = async () => {
    setRestarting(true);
    try { await window.api.hotkeys.restartHooks(); } catch {}
    // Give uIOhook ~1s to restart, then re-fetch status
    setTimeout(async () => {
      try {
        const h = await window.api.hotkeys.get();
        setMode(h.mode ?? "fallback");
        setUiohookLoaded(h.uiohookLoaded ?? false);
      } catch {}
      setRestarting(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            <span className="text-sm font-semibold text-zinc-200">Preferences</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] transition"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* App info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Version</span>
            <span className="font-mono text-zinc-300">v{appVersion}</span>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* Keyboard listener status */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-3">
              Keyboard Listener
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <span className={`mt-[3px] h-2.5 w-2.5 rounded-full shrink-0 ${cfg.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-zinc-200 mb-0.5">{cfg.label}</div>
                <div className="text-xs text-zinc-500 leading-relaxed">{cfg.desc}</div>
              </div>
            </div>

            {uiohookLoaded && (
              <button
                onClick={handleRestart}
                disabled={restarting}
                className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-medium border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:bg-white/[0.07] hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <svg
                  className={`w-3.5 h-3.5 ${restarting ? "animate-spin" : ""}`}
                  viewBox="0 0 16 16" fill="none"
                >
                  <path d="M13.5 8A5.5 5.5 0 112.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2.5 2v3.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {restarting ? "Restarting…" : "Restart keyboard listener"}
              </button>
            )}
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* Diagnostics */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-3">
              Diagnostics
            </div>
            <button
              onClick={() => window.api.win.openLogFolder()}
              className="w-full rounded-lg px-3 py-2.5 text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.07] hover:text-zinc-100 transition flex items-center gap-2.5"
            >
              <svg className="w-4 h-4 text-zinc-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              Open log folder
              <svg className="w-3 h-3 text-zinc-600 ml-auto shrink-0" viewBox="0 0 12 12" fill="none">
                <path d="M3.5 1.5h7v7M1.5 10.5l9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <p className="mt-1.5 text-[11px] text-zinc-600 leading-relaxed px-0.5">
              Share the <span className="text-zinc-500 font-mono">main.log</span> file with the developer to diagnose issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
