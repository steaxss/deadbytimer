import React, { useEffect, useState } from 'react';
import { useTimerStore } from './store/timerStore';
import ControlPanel from './components/ControlPanel';
import useGlobalHotkeys from './hooks/useGlobalHotkeys';

const App: React.FC = () => {
  const { loadFromStorage } = useTimerStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useGlobalHotkeys();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadFromStorage();
        setIsInitialized(true);
        console.log('App initialized successfully');
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [loadFromStorage]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-400 mb-2">
            DBD Timer Overlay
          </h1>
          <p className="text-gray-400">
            Professional timer overlay for Dead by Daylight 1v1 matches
          </p>
        </header>

        <main>
          <ControlPanel />
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Press your configured hotkeys to control timers globally</p>
        </footer>
      </div>
    </div>
  );
};

export default App;