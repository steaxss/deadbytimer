// src/App.tsx
import React, { useEffect } from 'react';
import { useTimerStore } from './store/timerStore';
import ControlPanel from './components/ControlPanel';
import useElectronStore from './hooks/useElectronStore';
import useGlobalHotkeys from './hooks/useGlobalHotkeys';

const App: React.FC = () => {
  const { loadFromStorage, saveToStorage } = useTimerStore();
  
  useElectronStore();
  useGlobalHotkeys();

  useEffect(() => {
    loadFromStorage();

    const handleBeforeUnload = () => {
      saveToStorage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners();
      }
    };
  }, [loadFromStorage, saveToStorage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-400 mb-2">
            DBD Timer Overlay
          </h1>
          <p className="text-gray-400">
            Lightweight 1v1 timer for Dead by Daylight competitive matches
          </p>
        </header>
        
        <ControlPanel />
      </div>
    </div>
  );
};

export default App;