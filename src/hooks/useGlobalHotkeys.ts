import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import useTimer from './useTimer';

const useGlobalHotkeys = () => {
  const { saveToStorage } = useTimerStore();
  const { isRunning, startTimer, pauseTimer, swapTimer } = useTimer();

  useEffect(() => {
    if (!window.electronAPI) return;

    const handleHotkeyPress = (action: string) => {
      console.log('Global hotkey pressed:', action, 'Current running state:', isRunning);
      
      switch (action) {
        case 'start':
          if (isRunning) {
            console.log('Pausing via hotkey');
            pauseTimer();
          } else {
            console.log('Starting via hotkey');
            startTimer();
          }
          
          // Sauvegarder après un délai
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

    window.electronAPI.hotkeys.onPressed(handleHotkeyPress);

    return () => {
      if (window.electronAPI?.removeAllListeners) {
        window.electronAPI.removeAllListeners();
      }
    };
  }, [isRunning, startTimer, pauseTimer, swapTimer, saveToStorage]);

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