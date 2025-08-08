export {};

declare global {
  interface Window {
    api: {
      overlay: {
        show(): Promise<any>;
        hide(): Promise<any>;
        updateSettings(s: any): Promise<any>;
        onReady(cb: (v: boolean) => void): void;
      };
      timer: {
        get(): Promise<any>;
        set(d: any): Promise<any>;
        onSync(cb: (d: any) => void): void;
      };
      hotkeys: {
        on(cb: (p: any) => void): void;
      };
    };
  }
}
