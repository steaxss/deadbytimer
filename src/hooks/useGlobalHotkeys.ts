import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';

const useGlobalHotkeys = () => {
  const { 
    startTimer,
    swapTimer,
    saveToStorage 
  } = useTimerStore();

  useEffect(() => {
    if (!window.electronAPI) return;

    const handleHotkeyPress = (action: string) => {
      switch (action) {
        case 'start':
          startTimer();
          setTimeout(() => {
            saveToStorage();
          }, 100);
          break;
          
        case 'swap':
          swapTimer();
          setTimeout(() => {
            saveToStorage();
          }, 100);
          break;
      }
    };

    const cleanup = window.electronAPI.hotkeys.onPressed(handleHotkeyPress);

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [startTimer, swapTimer, saveToStorage]);

  const registerHotkeys = async (startKey: string, swapKey: string) => {
    if (!window.electronAPI) {
      return;
    }

    try {
      await window.electronAPI.hotkeys.register({
        start: startKey,
        swap: swapKey,
      });
    } catch (error) {
      console.error('Failed to register hotkeys:', error);
    }
  };

  return { registerHotkeys };
};

export default useGlobalHotkeys;