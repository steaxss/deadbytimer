import type { TimerData } from './index';

declare global {
  interface Window {
    electronAPI?: {
      store: {
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<void>;
      };
      overlay: {
        show: () => Promise<{ success: boolean; error?: string }>;
        hide: () => Promise<{ success: boolean; error?: string }>;
        updateSettings: (settings: any) => Promise<void>;
        styleChange: (style: any) => Promise<void>;
        onDataSync: (callback: (data: TimerData) => void) => () => void;
        onStyleChange: (callback: (style: any) => void) => () => void;
        onReady: (callback: (isReady: boolean) => void) => () => void;
      };
      timer: {
        syncData: (data: TimerData) => Promise<void>;
      };
      hotkeys: {
        register: (hotkeys: { start: string; swap: string }) => Promise<void>;
        onPressed: (callback: (action: string) => void) => () => void;
      };
      removeAllListeners: () => void;
    };
  }
}