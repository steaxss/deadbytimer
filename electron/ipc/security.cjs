/** @typedef {"panel" | "overlay" | "both"} Audience */

/**
 * @param {{ getMainWindow: () => Electron.BrowserWindow | null, getOverlayWindow: () => Electron.BrowserWindow | null }} windows
 */
function createSenderGuard(windows) {
  /** @param {Electron.IpcMainInvokeEvent} event @param {Audience} audience */
  return function assertSender(event, audience) {
    if (event.senderFrame !== event.sender.mainFrame) {
      throw new Error("IPC rejected: subframes are not trusted");
    }
    const panel = windows.getMainWindow();
    const overlay = windows.getOverlayWindow();
    const panelMatches = audience !== "overlay" && panel?.webContents.id === event.sender.id;
    const overlayMatches = audience !== "panel" && overlay?.webContents.id === event.sender.id;
    if (!panelMatches && !overlayMatches) throw new Error("IPC rejected: untrusted sender");
  };
}

module.exports = { createSenderGuard };
