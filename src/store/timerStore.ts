import { create } from 'zustand';
import type { TimerData, OverlaySettings } from '../types';

interface TimerState {
  timerData: TimerData;
  overlaySettings: OverlaySettings;
  isOverlayVisible: boolean;
  
  setTimerData: (data: Partial<TimerData>) => void;
  setOverlaySettings: (settings: Partial<OverlaySettings>) => void;
  setOverlayVisible: (visible: boolean) => void;
  
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  resetAllTimers: () => void;
  swapTimer: () => void;
  
  setTimerValue: (player: 1 | 2, value: number) => void;
  setTimerRunning: (running: boolean) => void;
  setCurrentTimer: (timer: 1 | 2) => void;
  
  updatePlayerScore: (player: 1 | 2, delta: number) => void;
  updatePlayerName: (player: 1 | 2, name: string) => void;
  updateHotkeys: (hotkeys: { start: string; swap: string }) => void;
  
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const defaultTimerData: TimerData = {
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  player1Score: 0,
  player2Score: 0,
  timer1Value: 0,
  timer2Value: 0,
  currentTimer: 1,
  isRunning: false,
  startHotkey: 'F1',
  swapHotkey: 'F2'
};

const defaultOverlaySettings: OverlaySettings = {
  baseWidth: 520,
  baseHeight: 120,
  scale: 100,
  x: 100,
  y: 100,
  locked: false,
  alwaysOnTop: true
};

export const useTimerStore = create<TimerState>((set, get) => ({
  timerData: defaultTimerData,
  overlaySettings: defaultOverlaySettings,
  isOverlayVisible: false,

  setTimerData: (data) => {
    console.log('Setting timer data:', data);
    set((state) => {
      const newTimerData = { ...state.timerData, ...data };
      
      setTimeout(() => {
        if (window.electronAPI?.timer?.syncData) {
          window.electronAPI.timer.syncData(newTimerData);
        }
      }, 0);
      
      return { timerData: newTimerData };
    });
  },

  setOverlaySettings: (settings) => {
    set((state) => ({
      overlaySettings: { ...state.overlaySettings, ...settings }
    }));
    
    const { overlaySettings: newSettings } = get();
    
    setTimeout(() => {
      if (window.electronAPI?.overlay?.updateSettings) {
        window.electronAPI.overlay.updateSettings(newSettings);
      }
      get().saveToStorage();
    }, 0);
  },

  setOverlayVisible: async (visible) => {
    const currentState = get();
    
    if (currentState.isOverlayVisible === visible) {
      return;
    }
    
    set({ isOverlayVisible: visible });
    
    if (window.electronAPI?.overlay) {
      try {
        if (visible) {
          const result = await window.electronAPI.overlay.show();
          if (result.success) {
            setTimeout(() => {
              const currentData = get().timerData;
              if (window.electronAPI?.timer?.syncData) {
                window.electronAPI.timer.syncData(currentData);
              }
            }, 500);
          } else {
            set({ isOverlayVisible: false });
          }
        } else {
          await window.electronAPI.overlay.hide();
        }
      } catch (error) {
        console.error('Error toggling overlay:', error);
        set({ isOverlayVisible: !visible });
      }
    }
  },

startTimer: () => {
  const currentData = get().timerData;
  console.log('Starting timer', currentData.currentTimer, 'Current values:', {
    isRunning: currentData.isRunning,
    timer1Value: currentData.timer1Value,
    timer2Value: currentData.timer2Value,
    currentTimer: currentData.currentTimer
  });

  if (!currentData.isRunning) {
    // Conserver les valeurs actuelles, juste passer en mode running
    get().setTimerData({ isRunning: true });
    get().saveToStorage();
  }
},

  pauseTimer: () => {
    const currentData = get().timerData;
    console.log('Pausing timer', currentData.currentTimer, 'Current values:', {
      isRunning: currentData.isRunning,
      timer1Value: currentData.timer1Value,
      timer2Value: currentData.timer2Value,
      currentTimer: currentData.currentTimer
    });
    
    if (currentData.isRunning) {
      // Mettre en pause le timer actuel SEULEMENT (pas de reset)
      get().setTimerData({ isRunning: false });
      get().saveToStorage();
    }
  },

  resetTimer: () => {
    const { timerData } = get();
    const currentTimer = timerData.currentTimer;
    const valueKey = currentTimer === 1 ? 'timer1Value' : 'timer2Value';
    
    console.log('Resetting timer', currentTimer, 'from value:', timerData[valueKey]);
    
    get().setTimerData({ 
      [valueKey]: 0,
      isRunning: false 
    });
    get().saveToStorage();
  },

  resetAllTimers: () => {
    console.log('Resetting all timers');
    get().setTimerData({ 
      timer1Value: 0,
      timer2Value: 0,
      isRunning: false 
    });
    get().saveToStorage();
  },

swapTimer: () => {
  const { timerData } = get();
  const currentTimer = timerData.currentTimer;
  const newTimer = currentTimer === 1 ? 2 : 1;

  // On pause le timer actuel mais on garde sa valeur telle quelle
  console.log('SWAP: from timer', currentTimer, 'to timer', newTimer);
  get().setTimerData({
    currentTimer: newTimer,
    isRunning: false // pause automatique
  });
  get().saveToStorage();

  console.log('SWAP COMPLETE: Timer', newTimer, 'selected and ALL TIMERS PAUSED');
},

  setTimerValue: (player, value) => {
    const valueKey = player === 1 ? 'timer1Value' : 'timer2Value';
    console.log(`Setting ${valueKey} to ${value}`);
    set((state) => ({
      timerData: { ...state.timerData, [valueKey]: value }
    }));
  },

  setTimerRunning: (running) => {
    console.log('Setting timer running to:', running);
    get().setTimerData({ isRunning: running });
  },

  setCurrentTimer: (timer) => {
    console.log('Setting current timer to:', timer);
    get().setTimerData({ currentTimer: timer });
  },

  updatePlayerScore: (player, delta) => {
    const { timerData } = get();
    const scoreKey = player === 1 ? 'player1Score' : 'player2Score';
    const currentScore = timerData[scoreKey];
    
    get().setTimerData({ 
      [scoreKey]: Math.max(0, currentScore + delta) 
    });
    get().saveToStorage();
  },

  updatePlayerName: (player, name) => {
    const nameKey = player === 1 ? 'player1Name' : 'player2Name';
    get().setTimerData({ [nameKey]: name });
    get().saveToStorage();
  },

  updateHotkeys: (hotkeys) => {
    get().setTimerData({ 
      startHotkey: hotkeys.start,
      swapHotkey: hotkeys.swap,
      hotkeys
    });
    get().saveToStorage();
  },

  loadFromStorage: async () => {
    try {
      if (!window.electronAPI?.store) return;

      const [storedTimerData, storedOverlaySettings] = await Promise.all([
        window.electronAPI.store.get('timerData'),
        window.electronAPI.store.get('overlaySettings')
      ]);

      const loadedTimerData = storedTimerData ? { ...defaultTimerData, ...storedTimerData } : defaultTimerData;
      const loadedOverlaySettings = storedOverlaySettings ? { ...defaultOverlaySettings, ...storedOverlaySettings } : defaultOverlaySettings;

      set({
        timerData: loadedTimerData,
        overlaySettings: loadedOverlaySettings
      });

      console.log('Timer store loaded from storage:', { loadedTimerData, loadedOverlaySettings });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      if (!window.electronAPI?.store) return;

      const { timerData, overlaySettings } = get();
      
      await Promise.all([
        window.electronAPI.store.set('timerData', timerData),
        window.electronAPI.store.set('overlaySettings', overlaySettings)
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }
}));