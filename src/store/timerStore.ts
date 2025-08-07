// src/store/timerStore.ts
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
  swapTimer: () => void;
  
  setTimerValue: (player: 1 | 2, value: number) => void;
  setTimerRunning: (running: boolean) => void;
  setCurrentTimer: (timer: 1 | 2) => void;
  
  updatePlayerScore: (player: 1 | 2, score: number) => void;
  updatePlayerName: (player: 1 | 2, name: string) => void;
  
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
    set((state) => ({
      timerData: { ...state.timerData, ...data }
    }));
    get().saveToStorage();
  },

  setOverlaySettings: (settings) => {
    set((state) => ({
      overlaySettings: { ...state.overlaySettings, ...settings }
    }));
    
    const { overlaySettings: newSettings } = get();
    
    if (window.electronAPI?.overlay?.updateSettings) {
      window.electronAPI.overlay.updateSettings(newSettings);
    }
    
    get().saveToStorage();
  },

  setOverlayVisible: async (visible) => {
    set({ isOverlayVisible: visible });
    
    if (window.electronAPI?.overlay) {
      try {
        if (visible) {
          await window.electronAPI.overlay.show();
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
    const { timerData } = get();
    set({
      timerData: { ...timerData, isRunning: !timerData.isRunning }
    });
    get().saveToStorage();
  },

  pauseTimer: () => {
    const { timerData } = get();
    set({
      timerData: { ...timerData, isRunning: false }
    });
    get().saveToStorage();
  },

  resetTimer: () => {
    const { timerData } = get();
    const resetData = {
      ...timerData,
      timer1Value: 0,
      timer2Value: 0,
      isRunning: false
    };
    set({ timerData: resetData });
    get().saveToStorage();
  },

  swapTimer: () => {
    const { timerData } = get();
    const newCurrentTimer = timerData.currentTimer === 1 ? 2 : 1;
    set({
      timerData: { ...timerData, currentTimer: newCurrentTimer }
    });
    get().saveToStorage();
  },

  setTimerValue: (player, value) => {
    const { timerData } = get();
    const valueKey = player === 1 ? 'timer1Value' : 'timer2Value';
    set({
      timerData: { ...timerData, [valueKey]: value }
    });
  },

  setTimerRunning: (running) => {
    const { timerData } = get();
    set({
      timerData: { ...timerData, isRunning: running }
    });
    get().saveToStorage();
  },

  setCurrentTimer: (timer) => {
    const { timerData } = get();
    set({
      timerData: { ...timerData, currentTimer: timer }
    });
    get().saveToStorage();
  },

  updatePlayerScore: (player, score) => {
    const { timerData } = get();
    const scoreKey = player === 1 ? 'player1Score' : 'player2Score';
    set({
      timerData: { ...timerData, [scoreKey]: score }
    });
    get().saveToStorage();
  },

  updatePlayerName: (player, name) => {
    const { timerData } = get();
    const nameKey = player === 1 ? 'player1Name' : 'player2Name';
    set({
      timerData: { ...timerData, [nameKey]: name }
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

      set({
        timerData: storedTimerData ? { ...defaultTimerData, ...storedTimerData } : defaultTimerData,
        overlaySettings: storedOverlaySettings ? { ...defaultOverlaySettings, ...storedOverlaySettings } : defaultOverlaySettings
      });

      console.log('Timer store loaded from storage');
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

      if (window.electronAPI.timer?.syncData) {
        window.electronAPI.timer.syncData(timerData);
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }
}));