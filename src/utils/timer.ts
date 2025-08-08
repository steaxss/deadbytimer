/**
 * Formats milliseconds to LiveSplit format with centiseconds
 * Examples:
 * - 0ms -> "0.00"
 * - 30110ms -> "30.11" 
 * - 80220ms -> "1:20.22"
 * - 5428450ms -> "01:30:28.45"
 */
export function formatTime(milliseconds: number): string {
  if (milliseconds < 0) return "0.00";
  
  const totalMs = Math.floor(milliseconds);
  const totalSeconds = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const remainingSeconds = totalSeconds % 60;
  const centiseconds = Math.floor((totalMs % 1000) / 10);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  } else {
    // Pour les secondes seules, on n'ajoute pas de zéro devant si c'est moins de 10
    return `${remainingSeconds}.${centiseconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Parses a formatted time string to milliseconds
 * Supports formats: "SS.HH", "M:SS.HH", "HH:MM:SS.HH"
 */
export function parseTimeToMs(timeString: string): number {
  // Handle HH:MM:SS.HH format
  const hoursMatch = timeString.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    const minutes = parseInt(hoursMatch[2]);
    const seconds = parseInt(hoursMatch[3]);
    const centiseconds = parseInt(hoursMatch[4]);
    return (hours * 3600 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + (centiseconds * 10);
  }
  
  // Handle M:SS.HH format
  const minutesMatch = timeString.match(/(\d+):(\d{2})\.(\d{2})/);
  if (minutesMatch) {
    const minutes = parseInt(minutesMatch[1]);
    const seconds = parseInt(minutesMatch[2]);
    const centiseconds = parseInt(minutesMatch[3]);
    return (minutes * 60 * 1000) + (seconds * 1000) + (centiseconds * 10);
  }
  
  // Handle SS.HH format (including single digit seconds)
  const secondsMatch = timeString.match(/(\d+)\.(\d{2})/);
  if (secondsMatch) {
    const seconds = parseInt(secondsMatch[1]);
    const centiseconds = parseInt(secondsMatch[2]);
    return (seconds * 1000) + (centiseconds * 10);
  }
  
  return 0;
}

/**
 * High-precision timer class for LiveSplit-like functionality
 */
export class PreciseTimer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private totalPausedTime: number = 0;
  private animationId: number | null = null;
  private intervalId: number | null = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private onUpdate: (value: number) => void;
  private lastUpdateTime: number = 0;

  constructor(onUpdate: (value: number) => void) {
    this.onUpdate = onUpdate;
  }

  start(resumeFromValue: number = 0) {
    if (this.isRunning && !this.isPaused) return;
    
    const now = Date.now();
    
    if (this.isPaused) {
      // Resume from pause
      this.totalPausedTime += now - this.pausedTime;
      this.isPaused = false;
    } else {
      // Fresh start or restart
      this.startTime = now;
      this.totalPausedTime = 0;
      this.pausedTime = 0;
      
      // If resuming from a specific value, adjust start time
      if (resumeFromValue > 0) {
        this.startTime = now - resumeFromValue;
      }
    }
    
    this.isRunning = true;
    this.lastUpdateTime = 0;

    const updateTimer = () => {
      if (!this.isRunning || this.isPaused) return;

      const now = Date.now();
      const elapsed = now - this.startTime - this.totalPausedTime;
      const currentValue = Math.max(0, elapsed);

      if (now - this.lastUpdateTime >= 10) {
        this.onUpdate(currentValue);
        this.lastUpdateTime = now;
      }

      this.animationId = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    // Backup interval for precision
    this.intervalId = window.setInterval(() => {
      if (this.isRunning && !this.isPaused) {
        const now = Date.now();
        const elapsed = now - this.startTime - this.totalPausedTime;
        const currentValue = Math.max(0, elapsed);
        this.onUpdate(currentValue);
      }
    }, 10);
  }

  pause(): number {
    if (!this.isRunning || this.isPaused) return this.currentValue;

    this.isPaused = true;
    this.pausedTime = Date.now();
    
    const currentValue = this.currentValue;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    return currentValue;
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;

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
    this.startTime = 0;
    this.pausedTime = 0;
    this.totalPausedTime = 0;
    this.onUpdate(0);
  }

  get running(): boolean {
    return this.isRunning && !this.isPaused;
  }
  
  get paused(): boolean {
    return this.isPaused;
  }

  get currentValue(): number {
    if (!this.isRunning) return 0;
    
    if (this.isPaused) {
      return Math.max(0, this.pausedTime - this.startTime - this.totalPausedTime);
    }
    
    const now = Date.now();
    const elapsed = now - this.startTime - this.totalPausedTime;
    return Math.max(0, elapsed);
  }
}

/**
 * Validates and normalizes hotkey string
 */
export function normalizeHotkey(hotkey: string): string {
  const key = hotkey.trim().toLowerCase();
  
  if (key.startsWith('f') && key.length <= 3) {
    const num = key.slice(1);
    if (/^\d{1,2}$/.test(num)) {
      return key.toUpperCase();
    }
  }
  
  if (key.length === 1 && /[a-z0-9]/.test(key)) {
    return key.toUpperCase();
  }
  
  const specialKeys = ['space', 'enter', 'tab', 'escape', 'backspace'];
  if (specialKeys.includes(key)) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
  
  return hotkey.toUpperCase();
}