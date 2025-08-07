// src/types/index.ts
export interface TimerData {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1Value: number;
  timer2Value: number;
  currentTimer: 1 | 2;
  isRunning: boolean;
  startHotkey: string;
  swapHotkey: string;
  hotkeys?: {
    start: string;
    swap: string;
  };
}

export interface OverlaySettings {
  baseWidth: number;
  baseHeight: number;
  scale: number;
  x: number;
  y: number;
  locked: boolean;
  alwaysOnTop: boolean;
  width?: number;
  height?: number;
}

export interface TimerDisplayData {
  timer1: string;
  timer2: string;
  currentTimer: 1 | 2;
  running: boolean;
}

export interface AppState {
  timerData: TimerData;
  overlaySettings: OverlaySettings;
  isOverlayVisible: boolean;
}

export interface IPCResponse {
  success: boolean;
  error?: string;
  data?: any;
}

export interface ElectronAPI {
  store: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
  };
  
  overlay: {
    show: () => Promise<IPCResponse>;
    hide: () => Promise<IPCResponse>;
    updateSettings: (settings: Partial<OverlaySettings>) => Promise<IPCResponse>;
    
    onDataSync: (callback: (data: TimerData) => void) => () => void;
    onScaleChange: (callback: (scale: number) => void) => () => void;
    onReady: (callback: (isReady: boolean) => void) => () => void;
  };
  
  timer: {
    syncData: (data: TimerData) => Promise<IPCResponse>;
  };
  
  hotkeys: {
    register: (hotkeys: { start: string; swap: string }) => Promise<IPCResponse>;
    onPressed: (callback: (action: 'start' | 'swap') => void) => () => void;
  };
  
  removeAllListeners: () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}