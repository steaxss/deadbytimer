import { useState } from "react";
import NewBadge from "@/components/NewBadge";

const SETTINGS_PATH = "%LOCALAPPDATA%\\DeadByDaylight\\Saved\\Config\\WindowsClient";
const SETTINGS = ["FullscreenMode", "LastConfirmedFullscreenMode", "PreferredFullscreenMode"] as const;

function Chevron({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyButton({ kind, label }: Readonly<{ kind: "launchArgs" | "iniSettings"; label: string }>) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await window.api.win.copySetupText(kind);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const text = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label;
  return (
    <button type="button" onClick={copy} className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[10px] font-medium text-zinc-400 transition hover:border-sky-300/25 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70">
      <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 16 16" fill="none">
        <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" />
        <path d="M3 10.5H2.5A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5V3" stroke="currentColor" />
      </svg>
      {text}
    </button>
  );
}

function SettingsCode() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-950/80">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-3 py-1.5">
        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600">GameUserSettings.ini</span>
        <CopyButton kind="iniSettings" label="Copy settings" />
      </div>
      <pre className="overflow-x-auto px-3 py-2 font-mono text-[11px] leading-5">
        {SETTINGS.map((key) => (
          <span key={key} className="block"><span className="text-sky-300">{key}</span><span className="text-zinc-600">=</span><span className="text-amber-300">1</span></span>
        ))}
      </pre>
    </div>
  );
}

export default function TroubleshootingSection() {
  const [open, setOpen] = useState(false);
  const [folderError, setFolderError] = useState("");
  const contentId = "timer-setup-guide";

  const openSettingsFolder = async () => {
    const error = await window.api.win.openDbdConfigFolder();
    setFolderError(error);
  };

  return (
    <section className="mb-4 overflow-hidden rounded-xl border border-sky-300/15 bg-sky-300/[0.04]">
      <div className="flex items-center gap-2 px-4 py-3">
        <button type="button" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen((current) => !current)} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-300/15 bg-sky-300/10 text-sm font-bold text-sky-200">?</span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-zinc-100">Timer not working?</span>
            <span className="block truncate text-xs text-zinc-500">Check the recommended Dead by Daylight setup</span>
          </span>
          <Chevron open={open} />
        </button>
        <NewBadge featureId="timer-setup-guide-v1" />
      </div>

      {open && (
        <div id={contentId} className="border-t border-white/[0.07] px-4 pb-4 pt-3">
          <p className="mb-3 text-xs leading-5 text-zinc-400">For reliable overlay input and fullscreen behavior, complete both steps before launching the game.</p>
          <ol className="grid gap-3 md:grid-cols-2">
            <li className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
              <div className="mb-2 flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-300/15 text-[10px] font-bold text-sky-200">1</span><h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Launch arguments</h3></div>
              <p className="mb-2 text-xs leading-5 text-zinc-500">In Steam, open DBD Properties and paste this into Launch Options. Use the same arguments in Epic Games or any other launcher.</p>
              <div className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-zinc-950/80 px-3 py-2">
                <code className="select-all font-mono text-xs"><span className="text-sky-300">-dx12</span> <span className="text-sky-300">-fullscreen</span></code>
                <CopyButton kind="launchArgs" label="Copy" />
              </div>
            </li>

            <li className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
              <div className="mb-2 flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-300/15 text-[10px] font-bold text-sky-200">2</span><h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Fullscreen settings</h3></div>
              <p className="mb-2 text-xs leading-5 text-zinc-500">Close DBD, open <strong className="font-medium text-zinc-300">GameUserSettings.ini</strong> in this folder, then set and save these values.</p>
              <div className="mb-2 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-950/80 px-3 py-2">
                <code className="min-w-0 flex-1 select-all overflow-x-auto whitespace-nowrap font-mono text-[11px] text-sky-200">{SETTINGS_PATH}</code>
                <button type="button" onClick={openSettingsFolder} title="Open configuration folder" aria-label="Open the Dead by Daylight configuration folder" className="shrink-0 rounded-md border border-white/10 bg-white/[0.05] p-1.5 text-zinc-400 transition hover:border-sky-300/25 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70">
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none"><path d="M2.5 5.5h5l1.5 2h8.5v7.25A1.75 1.75 0 0 1 15.75 16.5H4.25a1.75 1.75 0 0 1-1.75-1.75V5.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M12 11h4m0 0-1.5-1.5M16 11l-1.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              {folderError && <p role="alert" className="mb-2 text-[10px] text-red-300">Unable to open the folder: {folderError}</p>}
              <SettingsCode />
              <p className="mt-2 text-[11px] leading-5 text-zinc-500">All three values can also be set to <span className="text-zinc-300">0</span>, but <span className="text-amber-300">1 is recommended</span> for maximum ReShade compatibility.</p>
            </li>
          </ol>
          <div className="mt-3 rounded-lg border border-amber-300/15 bg-amber-300/[0.05] px-3 py-2 text-[11px] leading-5 text-zinc-400">
            After saving, right-click <strong className="font-medium text-zinc-200">GameUserSettings.ini</strong>, open <strong className="font-medium text-zinc-200">Properties</strong>, enable <strong className="font-medium text-amber-300">Read-only</strong>, then apply. Restart DBD afterwards.
          </div>
        </div>
      )}
    </section>
  );
}
