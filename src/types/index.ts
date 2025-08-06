// src/types/index.ts - Types TypeScript
export interface TimerData {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1Value: number; // milliseconds
  timer2Value: number; // milliseconds
  currentTimer: 1 | 2;
  isRunning: boolean;
  startHotkey: string;
  swapHotkey: string;
  style: TimerStyle;
}

export type TimerStyle = 'default' | 'minimal' | 'circular' | 'nostalgia';

export interface OverlaySettings {
  baseWidth: number;
  baseHeight: number;
  scale: number;
  x: number;
  y: number;
  locked: boolean;
  alwaysOnTop: boolean;
}

export interface TimerDisplayData {
  timer1: string; // formatted time string
  timer2: string; // formatted time string  
  currentTimer: 1 | 2;
  running: boolean;
}

export interface AppState {
  timerData: TimerData;
  overlaySettings: OverlaySettings;
  isOverlayVisible: boolean;
}

// IPC Event types
export interface IPCEvents {
  // Timer events
  'timer-start': () => void;
  'timer-pause': () => void;
  'timer-reset': () => void;
  'timer-swap': () => void;
  'timer-update-data': (data: Partial<TimerData>) => void;
  'timer-update-display': (data: TimerDisplayData) => void;
  'timer-style-change': (style: TimerStyle) => void;
  
  // Overlay events
  'overlay-show': () => void;
  'overlay-hide': () => void;
  'overlay-settings-update': (settings: Partial<OverlaySettings>) => void;
  'overlay-lock-toggle': (locked: boolean) => void;
  
  // Hotkey events
  'hotkey-register': (hotkeys: { start: string; swap: string }) => void;
  'hotkey-pressed': (action: 'start' | 'swap') => void;
  
  // Window events
  'window-ready': () => void;
  'app-quit': () => void;
}

// Style-specific dimensions
export interface StyleDimensions {
  width: number;
  height: number;
}

export const STYLE_DIMENSIONS: Record<TimerStyle, StyleDimensions> = {
  default: { width: 520, height: 120 },
  minimal: { width: 400, height: 110 },
  circular: { width: 420, height: 160 },
  nostalgia: { width: 360, height: 80 }
};

// Default values
export const DEFAULT_TIMER_DATA: TimerData = {
  player1Name: 'PLAYER 1',
  player2Name: 'PLAYER 2', 
  player1Score: 0,
  player2Score: 0,
  timer1Value: 0,
  timer2Value: 0,
  currentTimer: 1,
  isRunning: false,
  startHotkey: 'F1',
  swapHotkey: 'F2',
  style: 'default'
};

export const DEFAULT_OVERLAY_SETTINGS: OverlaySettings = {
  baseWidth: 520,
  baseHeight: 120,
  scale: 100,
  x: 100,
  y: 100,
  locked: false,
  alwaysOnTop: true
};