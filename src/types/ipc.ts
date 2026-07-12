import type { AccentKey, NameTheme } from "../themes/palette";

export type PlayerData = Readonly<{ name: string; score: number }>;
export type TimerData = Readonly<{ player1: PlayerData; player2: PlayerData }>;
export type HotkeyAction = "start" | "swap";
export type HotkeySource = "any" | "desktop" | "gamepad";

export type OverlaySettings = Readonly<{
  locked?: boolean;
  scale?: number;
  alwaysOnTop?: boolean;
  nameTheme?: NameTheme;
  accentKey?: AccentKey;
  autoScoreEnabled?: boolean;
  autoScoreThresholdSec?: number;
}>;

export type HotkeySettings = Readonly<{
  start: number | null;
  swap: number | null;
  startLabel?: string;
  swapLabel?: string;
  mode?: "pass-through" | "fallback";
  uiohookLoaded?: boolean;
}>;

export type CapturedHotkey = Readonly<{
  type: HotkeyAction;
  keycode?: number | null;
  label?: string;
  source?: "desktop" | "gamepad";
}>;

export type GamepadMapping = Readonly<{ toggle: string[]; swap: string[] }>;
type Dispose = () => void;

export interface RendererApi {
  overlay: {
    show(): Promise<void>;
    hide(): Promise<void>;
    updateSettings(settings: OverlaySettings): Promise<void>;
    onReady(callback: (visible: boolean) => void): Dispose;
    onSettings(callback: (settings: OverlaySettings) => void): Dispose;
    measure(width: number, height: number): Promise<void>;
  };
  timer: {
    get(): Promise<TimerData>;
    set(data: TimerData): Promise<void>;
    onSync(callback: (data: TimerData) => void): Dispose;
  };
  hotkeys: {
    get(): Promise<HotkeySettings>;
    set(settings: Partial<Pick<HotkeySettings, "start" | "swap">>): Promise<void>;
    clear(action: HotkeyAction): Promise<Required<Pick<HotkeySettings, "start" | "swap" | "startLabel" | "swapLabel">>>;
    restartHooks(): Promise<boolean>;
    capture(action: HotkeyAction | Readonly<{ type: HotkeyAction; source?: HotkeySource }>, source?: HotkeySource): Promise<void>;
    cancel(): Promise<void>;
    onCaptured(callback: (payload: CapturedHotkey) => void): Dispose;
    on(callback: (payload: Readonly<{ type: "toggle" | "swap" }>) => void): Dispose;
    onMode(callback: (mode: "pass-through" | "fallback") => void): Dispose;
  };
  gamepad: {
    get(): Promise<GamepadMapping>;
    clear(action: "toggle" | "swap"): Promise<void>;
  };
  win: {
    minimize(): Promise<void>;
    maximize(): Promise<void>;
    close(): Promise<void>;
    isMaximized(): Promise<boolean>;
    onMaximizeChange(callback: (maximized: boolean) => void): Dispose;
    getVersion(): Promise<string>;
    openPremium(): Promise<void>;
    openLogFolder(): Promise<boolean>;
  };
  updater: {
    startDownload(): Promise<void>;
    installNow(): Promise<void>;
    openReleases(): Promise<void>;
    onAvailable(callback: (data: Readonly<{ version: string; releaseDate: string; releaseNotes: string; isPortable: boolean }>) => void): Dispose;
    onProgress(callback: (data: Readonly<{ percent: number; transferred: number; total: number; bytesPerSecond: number }>) => void): Dispose;
    onDownloaded(callback: (data: Readonly<{ version: string }>) => void): Dispose;
    onError(callback: (data: Readonly<{ message: string }>) => void): Dispose;
  };
}
