import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';

const useGlobalHotkeys = () => {
  const { 
    timerData,
    startTimer,
    pauseTimer,
    swapTimer,
    saveToStorage 
  } = useTimerStore();

  useEffect(() => {
    if (!window.electronAPI) return;

    const handleHotkeyPress = (action: string) => {
      console.log('Global hotkey pressed:', action, 'Current running state:', timerData.isRunning);
      
      switch (action) {
        case 'start':
          if (timerData.isRunning) {
            console.log('Pausing via hotkey');
            pauseTimer();
          } else {
            console.log('Starting via hotkey');
            startTimer();
          }
          
          setTimeout(() => {
            saveToStorage();
          }, 200);
          break;
          
        case 'swap':
          console.log('Swapping via hotkey');
          swapTimer();
          
          setTimeout(() => {
            saveToStorage();
          }, 200);
          break;
          
        default:
          console.warn('Unknown hotkey action:', action);
      }
    };

    const cleanup = window.electronAPI.hotkeys.onPressed(handleHotkeyPress);

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [timerData.isRunning, startTimer, pauseTimer, swapTimer, saveToStorage]);

  const registerHotkeys = async (startKey: string, swapKey: string) => {
    if (!window.electronAPI) {
      console.warn('Electron API not available');
      return;
    }

    try {
      await window.electronAPI.hotkeys.register({
        start: startKey,
        swap: swapKey,
      });
      console.log('Hotkeys registered:', { start: startKey, swap: swapKey });
    } catch (error) {
      console.error('Failed to register hotkeys:', error);
    }
  };

  return { registerHotkeys };
};

export default useGlobalHotkeys;