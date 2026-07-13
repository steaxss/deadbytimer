import type { RendererApi } from "./ipc";

export {};

declare global {
  interface Window {
    api: RendererApi;
  }
}
