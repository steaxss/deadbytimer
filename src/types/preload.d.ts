export {};
declare global {
  interface Window {
    api: {
      overlay: {
        show(): Promise<any>;
        hide(): Promise<any>;
        updateSettings(s: any): Promise<any>;
        onReady(cb: (v: boolean) => void): void;
        onSettings(cb: (s: any) => void): void;
        measure(w: number, h: number): Promise<any>;
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
