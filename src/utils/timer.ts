// src/utils/timer.ts - Utilitaires Timer

/**
 * Formats milliseconds to MM:SS.T format
 * @param milliseconds - Time in milliseconds
 * @returns Formatted time string (e.g., "1:23.4")
 */
export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((milliseconds % 1000) / 100);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
}

/**
 * Parses a formatted time string to milliseconds
 * @param timeString - Time string in MM:SS.T format
 * @returns Time in milliseconds
 */
export function parseTimeToMs(timeString: string): number {
  const parts = timeString.match(/(\d+):(\d{2})\.(\d)/);
  if (!parts) return 0;
  
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);
  const tenths = parseInt(parts[3]);
  
  return (minutes * 60 * 1000) + (seconds * 1000) + (tenths * 100);
}

/**
 * Timer hook for managing precise timing with requestAnimationFrame
 */
export class PreciseTimer {
  private startTime: number = 0;
  private initialValue: number = 0;
  private animationId: number | null = null;
  private intervalId: number | null = null;
  private isRunning: boolean = false;
  private onUpdate: (value: number) => void;
  private lastUpdateTime: number = 0;

  constructor(onUpdate: (value: number) => void) {
    this.onUpdate = onUpdate;
  }

  start(initialValue: number = 0) {
    if (this.isRunning) return;
    
    this.startTime = Date.now();
    this.initialValue = initialValue;
    this.isRunning = true;
    this.lastUpdateTime = 0;

    // Use requestAnimationFrame for smooth updates
    const updateTimer = () => {
      if (!this.isRunning) return;

      const now = Date.now();
      const elapsed = now - this.startTime;
      const currentValue = this.initialValue + elapsed;

      // Only update display every 100ms to avoid excessive updates
      if (now - this.lastUpdateTime >= 100) {
        this.onUpdate(currentValue);
        this.lastUpdateTime = now;
      }

      this.animationId = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    // Backup interval for when window is minimized
    this.intervalId = window.setInterval(() => {
      if (this.isRunning) {
        const now = Date.now();
        const elapsed = now - this.startTime;
        const currentValue = this.initialValue + elapsed;
        this.onUpdate(currentValue);
      }
    }, 100);
  }

  pause(): number {
    if (!this.isRunning) return this.initialValue;

    const now = Date.now();
    const elapsed = now - this.startTime;
    const finalValue = this.initialValue + elapsed;

    this.stop();
    return finalValue;
  }

  stop() {
    this.isRunning = false;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.initialValue = 0;
    this.onUpdate(0);
  }

  get running(): boolean {
    return this.isRunning;
  }

  get currentValue(): number {
    if (!this.isRunning) return this.initialValue;
    
    const now = Date.now();
    const elapsed = now - this.startTime;
    return this.initialValue + elapsed;
  }
}

/**
 * Validates and normalizes hotkey string
 * @param hotkey - Raw hotkey string
 * @returns Normalized hotkey string
 */
export function normalizeHotkey(hotkey: string): string {
  const key = hotkey.trim().toLowerCase();
  
  // Handle function keys
  if (key.startsWith('f') && key.length <= 3) {
    const num = key.slice(1);
    if (/^\d{1,2}$/.test(num)) {
      return key.toUpperCase();
    }
  }
  
  // Handle single character keys
  if (key.length === 1 && /[a-z0-9]/.test(key)) {
    return key.toUpperCase();
  }
  
  // Handle special keys
  const specialKeys = ['space', 'enter', 'tab', 'escape', 'backspace'];
  if (specialKeys.includes(key)) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
  
  // Default return
  return hotkey.toUpperCase();
}