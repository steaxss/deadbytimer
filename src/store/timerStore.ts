// src/store/timerStore.ts - Store Zustand
import { create } from 'zustand';
import { TimerData, OverlaySettings, TimerStyle, DEFAULT_TIMER_DATA, DEFAULT_OVERLAY_SETTINGS } from '../types';

interface TimerStore {
  timerData: TimerData;
  overlaySettings: OverlaySettings;
  isOverlayVisible: boolean;
  
  updateTimerData: (data: Partial<TimerData>) => void;
  updatePlayerName: (player: 1 | 2, name: string) => void;
  updatePlayerScore: (player: 1 | 2, delta: number) => void;
  setTimerValue: (timer: 1 | 2, value: number) => void;
  setCurrentTimer: (timer: 1 | 2) => void;
  setTimerRunning: (running: boolean) => void;
  swapTimer: () => void;
  resetTimer: (timer?: 1 | 2) => void;
  resetAllTimers: () => void;
  updateHotkeys: (hotkeys: { start?: string; swap?: string }) => void;
  updateStyle: (style: TimerStyle) => void;
  
  updateOverlaySettings: (settings: Partial<OverlaySettings>) => void;
  setOverlayVisible: (visible: boolean) => void;
  toggleOverlayLock: () => void;
  updateOverlayScale: (scale: number) => void;
  
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  timerData: { ...DEFAULT_TIMER_DATA },
  overlaySettings: { ...DEFAULT_OVERLAY_SETTINGS },
  isOverlayVisible: false,
  
  updateTimerData: (data) => {
    set((state) => ({
      timerData: { ...state.timerData, ...data }
    }));
  },
  
  updatePlayerName: (player, name) => {
    set((state) => ({
      timerData: {
        ...state.timerData,
        [player === 1 ? 'player1Name' : 'player2Name']: name
      }
    }));
  },
  
  updatePlayerScore: (player, delta) => {
    set((state) => {
      const currentScore = player === 1 ? state.timerData.player1Score : state.timerData.player2Score;
      const newScore = Math.max(0, currentScore + delta);
      
      return {
        timerData: {
          ...state.timerData,
          [player === 1 ? 'player1Score' : 'player2Score']: newScore
        }
      };
    });
  },
  
  setTimerValue: (timer, value) => {
    set((state) => ({
      timerData: {
        ...state.timerData,
        [timer === 1 ? 'timer1Value' : 'timer2Value']: Math.max(0, value)
      }
    }));
  },
  
  setCurrentTimer: (timer) => {
    set((state) => ({
      timerData: { ...state.timerData, currentTimer: timer }
    }));
  },
  
  setTimerRunning: (running) => {
    set((state) => ({
      timerData: { ...state.timerData, isRunning: running }
    }));
  },
  
  swapTimer: () => {
    set((state) => ({
      timerData: {
        ...state.timerData,
        currentTimer: state.timerData.currentTimer === 1 ? 2 : 1,
        isRunning: false
      }
    }));
  },
  
  resetTimer: (timer) => {
    set((state) => {
      if (timer) {
        return {
          timerData: {
            ...state.timerData,
            [timer === 1 ? 'timer1Value' : 'timer2Value']: 0,
            isRunning: false
          }
        };
      } else {
        return {
          timerData: {
            ...state.timerData,
            [state.timerData.currentTimer === 1 ? 'timer1Value' : 'timer2Value']: 0,
            isRunning: false
          }
        };
      }
    });
  },
  
  resetAllTimers: () => {
    set((state) => ({
      timerData: {
        ...state.timerData,
        timer1Value: 0,
        timer2Value: 0,
        player1Score: 0,
        player2Score: 0,
        currentTimer: 1,
        isRunning: false
      }
    }));
  },
  
  updateHotkeys: (hotkeys) => {
    set((state) => ({
      timerData: {
        ...state.timerData,
        ...(hotkeys.start && { startHotkey: hotkeys.start }),
        ...(hotkeys.swap && { swapHotkey: hotkeys.swap })
      }
    }));
  },
  
  updateStyle: (style) => {
    set((state) => ({
      timerData: { ...state.timerData, style }
    }));
  },
  
  updateOverlaySettings: (settings) => {
    set((state) => ({
      overlaySettings: { ...state.overlaySettings, ...settings }
    }));
  },
  
  setOverlayVisible: (visible) => {
    set({ isOverlayVisible: visible });
  },
  
  toggleOverlayLock: () => {
    set((state) => ({
      overlaySettings: {
        ...state.overlaySettings,
        locked: !state.overlaySettings.locked
      }
    }));
  },
  
  updateOverlayScale: (scale) => {
    set((state) => ({
      overlaySettings: { ...state.overlaySettings, scale }
    }));
  },
  
  loadFromStorage: async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Load from localStorage first
      const savedData = localStorage.getItem('dbd-timer-data');
      const savedSettings = localStorage.getItem('dbd-overlay-settings');
      
      if (savedData) {
        const timerData = JSON.parse(savedData);
        set((state) => ({
          timerData: { ...state.timerData, ...timerData }
        }));
      }
      
      if (savedSettings) {
        const overlaySettings = JSON.parse(savedSettings);
        set((state) => ({
          overlaySettings: { ...state.overlaySettings, ...overlaySettings }
        }));
      }

      // Load from Electron store if available
      if (window.electronAPI) {
        try {
          const electronTimerData = await window.electronAPI.store.get('timerData');
          const electronOverlaySettings = await window.electronAPI.store.get('overlaySettings');
          
          if (electronTimerData) {
            set((state) => ({
              timerData: { ...state.timerData, ...electronTimerData }
            }));
          }
          
          if (electronOverlaySettings) {
            set((state) => ({
              overlaySettings: { ...state.overlaySettings, ...electronOverlaySettings }
            }));
          }
        } catch (error) {
          console.warn('Failed to load from Electron store:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to load data from storage:', error);
    }
  },
  
  saveToStorage: () => {
    if (typeof window === 'undefined') return;
    
    try {
      const { timerData, overlaySettings } = get();
      localStorage.setItem('dbd-timer-data', JSON.stringify(timerData));
      localStorage.setItem('dbd-overlay-settings', JSON.stringify(overlaySettings));
      
      if (window.electronAPI) {
        window.electronAPI.timer.syncData(timerData);
        window.electronAPI.store.set('timerData', timerData);
        window.electronAPI.store.set('overlaySettings', overlaySettings);
      }
    } catch (error) {
      console.warn('Failed to save data to storage:', error);
    }
  }
}));