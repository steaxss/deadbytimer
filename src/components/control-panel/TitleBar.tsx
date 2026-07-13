type Props = {
  appVersion: string;
  isMaximized: boolean;
  onPreferences: () => void;
};

export default function TitleBar({ appVersion, isMaximized, onPreferences }: Props) {
  return (
<>
  {/* ====== Discord-style Titlebar ====== */}
  <div className="titlebar-drag flex items-center justify-between h-[34px] min-h-[34px] bg-[#111114] border-b border-white/[0.06] select-none shrink-0 pl-3 pr-0">
    {/* Left: Logo + App title */}
    <div className="flex items-center gap-2.5 text-[11.5px] font-medium tracking-wide text-zinc-400 truncate">
      <img src={import.meta.env.BASE_URL + 'logo.ico'} alt="DBD Timer" className="w-4 h-4 shrink-0" />
      <span className="text-zinc-300 font-semibold">Dead by Timer 1v1</span>
      <span className="text-zinc-600">—</span>
      <span className="text-zinc-500">v{appVersion}</span>
      <span className="text-zinc-600">—</span>
      <span className="text-zinc-500">By Steaxs & Doc</span>
    </div>

    {/* Right: Preferences + Window controls */}
    <div className="flex items-center h-full">
      {/* Preferences */}
      <button
            onClick={onPreferences}
        className="win-btn h-full w-[46px] flex items-center justify-center text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200 transition-colors"
        aria-label="Preferences"
        title="Preferences"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      </button>

      {/* Minimize */}
      <button
        onClick={() => window.api.win.minimize()}
        className="win-btn h-full w-[46px] flex items-center justify-center text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200 transition-colors"
        aria-label="Minimize"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="5.5" width="10" height="1" rx="0.5" fill="currentColor" />
        </svg>
      </button>

      {/* Maximize / Restore */}
      <button
        onClick={() => window.api.win.maximize()}
        className="win-btn h-full w-[46px] flex items-center justify-center text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200 transition-colors"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        {isMaximized ? (
          /* Restore icon (two overlapping rects) */
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="2.5" y="3.5" width="6" height="6" rx="0.6" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M3.5 3.5V2.2a.6.6 0 0 1 .6-.6h5.2a.6.6 0 0 1 .6.6v5.2a.6.6 0 0 1-.6.6H8.5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        ) : (
          /* Maximize icon (single rect) */
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1.5" y="1.5" width="9" height="9" rx="0.6" stroke="currentColor" strokeWidth="1.1" fill="none" />
          </svg>
        )}
      </button>

      {/* Close */}
      <button
        onClick={() => window.api.win.close()}
        className="win-btn-close h-full w-[46px] flex items-center justify-center text-zinc-400 hover:bg-[#e81123] hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
</>
  );
}
