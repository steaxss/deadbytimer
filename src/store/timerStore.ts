import { create } from 'zustand';
import type { OverlaySettings, TimerData, TimerId } from '@/types';

interface TimerStoreState {
  timerData: TimerData;
  overlaySettings: OverlaySettings;
  isOverlayVisible: boolean;

  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;

  setOverlayVisible: (visible: boolean) => Promise<void>;
  setOverlaySettings: (patch: Partial<OverlaySettings>) => Promise<void>;

  updateHotkeys: (hotkeys: { start: string; swap: string }) => Promise<void>;
  updatePlayerName: (id: TimerId, name: string) => void;
  updatePlayerScore: (id: TimerId, delta: number) => void;

  startTimer: () => void;
  swapTimer: () => void;
  resetAllTimers: () => void;
  setCurrentTimer: (id: TimerId) => void;
}

const defaultOverlaySettings: OverlaySettings = {
  baseWidth: 520,
  baseHeight: 120,
  scale: 100,
  x: 100,
  y: 100,
  locked: false,
  alwaysOnTop: true,
};

const defaultTimerData: TimerData = {
  player1Name: 'PLAYER 1',
  player2Name: 'PLAYER 2',
  player1Score: 0,
  player2Score: 0,

  timer1Value: 0,
  timer2Value: 0,

  selectedTimer: 1,
  currentTimer: 1,
  isRunning: false,

  timer1ClickCount: 0,
  timer2ClickCount: 0,

  startHotkey: 'F1',
  swapHotkey: 'F2',
  hotkeys: { start: 'F1', swap: 'F2' },
};

function syncToOverlay(data: TimerData) {
  try {
    if (window.electronAPI?.timer?.syncData) {
      window.electronAPI.timer.syncData(data).catch(console.error);
    }
  } catch (error) {
    console.error('Failed to sync to overlay:', error);
  }
}

export const useTimerStore = create<TimerStoreState>((set, get) => ({
  timerData: defaultTimerData,
  overlaySettings: defaultOverlaySettings,
  isOverlayVisible: false,

  async loadFromStorage() {
    try {
      const storedTimer: Partial<TimerData> | null = await window.electronAPI?.store?.get('timerData');
      const storedOverlay: Partial<OverlaySettings> | null = await window.electronAPI?.store?.get('overlaySettings');

      const timerData: TimerData = {
        ...defaultTimerData,
        ...(storedTimer ?? {}),
      };
      timerData.hotkeys = { start: timerData.startHotkey, swap: timerData.swapHotkey };

      const overlaySettings: OverlaySettings = {
        ...defaultOverlaySettings,
        ...(storedOverlay ?? {}),
      };

      set({ timerData, overlaySettings });
    } catch (e) {
      console.warn('loadFromStorage failed', e);
    }
  },

  async saveToStorage() {
    const { timerData, overlaySettings } = get();
    try {
      await window.electronAPI?.store?.set('timerData', timerData);
      await window.electronAPI?.store?.set('overlaySettings', overlaySettings);
    } catch (e) {
      console.warn('saveToStorage failed', e);
    }
  },

  async setOverlayVisible(visible) {
    set({ isOverlayVisible: visible });
    try {
      if (visible) await window.electronAPI?.overlay?.show();
      else await window.electronAPI?.overlay?.hide();
    } catch (e) {
      console.warn('overlay show/hide failed', e);
    }
  },

  async setOverlaySettings(patch) {
    const next = { ...get().overlaySettings, ...patch };
    set({ overlaySettings: next });
    try {
      await window.electronAPI?.overlay?.updateSettings(patch);
    } catch (e) {
      console.warn('overlay settings update failed', e);
    }
  },

  async updateHotkeys(hotkeys) {
    set((s) => ({
      timerData: {
        ...s.timerData,
        startHotkey: hotkeys.start,
        swapHotkey: hotkeys.swap,
        hotkeys: { ...hotkeys },
      },
    }));

    try {
      await window.electronAPI?.hotkeys?.register(hotkeys);
    } catch (e) {
      console.warn('hotkey register failed', e);
    }
  },

  updatePlayerName(id, name) {
    set((s) => ({
      timerData: {
        ...s.timerData,
        ...(id === 1 ? { player1Name: name } : { player2Name: name }),
      },
    }));
  },

  updatePlayerScore(id, delta) {
    set((s) => {
      const currentScore = id === 1 ? s.timerData.player1Score : s.timerData.player2Score;
      const newScore = Math.max(0, currentScore + delta);
      return {
        timerData: {
          ...s.timerData,
          ...(id === 1 ? { player1Score: newScore } : { player2Score: newScore }),
        },
      };
    });
  },

  startTimer() {
    set((s) => {
      const data = { ...s.timerData };
      const selected = data.selectedTimer;
      const clickCount = selected === 1 ? data.timer1ClickCount : data.timer2ClickCount;

      if (clickCount === 0) {
        data.isRunning = true;
        data.currentTimer = selected;
        if (selected === 1) {
          data.timer1ClickCount = 1;
        } else {
          data.timer2ClickCount = 1;
        }
      } else if (clickCount === 1 && data.isRunning && data.currentTimer === selected) {
        data.isRunning = false;
        if (selected === 1) {
          data.timer1ClickCount = 2;
        } else {
          data.timer2ClickCount = 2;
        }
      } else if (clickCount === 2) {
        if (selected === 1) {
          data.timer1Value = 0;
          data.timer1ClickCount = 0;
        } else {
          data.timer2Value = 0;
          data.timer2ClickCount = 0;
        }
        if (data.currentTimer === selected && data.isRunning) {
          data.isRunning = false;
        }
      } else if (clickCount === 1 && (!data.isRunning || data.currentTimer !== selected)) {
        const otherTimer: TimerId = selected === 1 ? 2 : 1;
        if (data.isRunning && data.currentTimer === otherTimer) {
          if (otherTimer === 1) {
            data.timer1ClickCount = 2;
          } else {
            data.timer2ClickCount = 2;
          }
        }
        data.isRunning = true;
        data.currentTimer = selected;
      }

      syncToOverlay(data);
      return { timerData: data };
    });
  },

  swapTimer() {
    set((s) => {
      const data = { ...s.timerData };
      data.selectedTimer = data.selectedTimer === 1 ? 2 : 1;
      
      syncToOverlay(data);
      return { timerData: data };
    });
  },

  resetAllTimers() {
    set((s) => {
      const data = { ...s.timerData };
      data.timer1Value = 0;
      data.timer2Value = 0;
      data.timer1ClickCount = 0;
      data.timer2ClickCount = 0;
      data.isRunning = false;

      syncToOverlay(data);
      return { timerData: data };
    });
  },

  setCurrentTimer(id) {
    set((s) => {
      const data = { ...s.timerData };
      data.selectedTimer = id;

      syncToOverlay(data);
      return { timerData: data };
    });
  },
}));