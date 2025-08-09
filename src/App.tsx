import React from 'react';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  return (
    <div className="min-h-dvh bg-[#0A0A0A] text-white flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl p-6">
          <header className="mb-6 text-center">
            <div className="text-[13px] uppercase tracking-wider font-bold text-[#FF6BCB]">
              You are not logged in
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#B579FF]">
              DBD OVERLAY TOOLS
            </h1>
          </header>

          <ControlPanel />
        </div>
      </main>
    </div>
  );
};

export default App;
