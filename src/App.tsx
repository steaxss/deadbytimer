import React from 'react';
import ControlPanel from './components/ControlPanel';

/** App shell — layout responsive + footer réparé (pas d'absolu) */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl p-6">
          <header className="mb-6 text-center">
            <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">You are not logged in</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#B579FF]">DBD OVERLAY TOOLS</h1>
          </header>

          <ControlPanel />
        </div>
      </main>

      {/* Footer fixe et propre */}
      <footer className="mt-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-400">
          <div className="uppercase tracking-wider">
            © by <b>DOC</b> &amp; <b>STEAXS</b> — 2025
          </div>
          <div className="text-xs mt-1 text-zinc-500">
            Hotkeys: <b>F1</b> start/pause/reset — <b>F2</b> swap active timer
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
