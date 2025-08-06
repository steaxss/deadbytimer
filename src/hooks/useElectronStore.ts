import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';

const useElectronStore = () => {
  const { updateTimerData, updateOverlaySettings, setOverlayVisible } = useTimerStore();

  useEffect(() => {
    if (!window.electronAPI) return;

    const loadElectronData = async () => {
      try {
        const timerData = await window.electronAPI.store.get('timerData');
        const overlaySettings = await window.electronAPI.store.get('overlaySettings');

        if (timerData) {
          updateTimerData(timerData);
        }

        if (overlaySettings) {
          updateOverlaySettings(overlaySettings);
        }
      } catch (error) {
        console.warn('Failed to load data from electron store:', error);
      }
    };

    loadElectronData();

    // Listen for overlay ready status
    const unsubscribeOverlayReady = window.electronAPI.overlay.onReady((isReady: boolean) => {
      console.log('Overlay ready status changed:', isReady);
      setOverlayVisible(isReady);
    });

    return () => {
      unsubscribeOverlayReady();
    };
  }, [updateTimerData, updateOverlaySettings, setOverlayVisible]);

  const saveToElectronStore = async () => {
    if (!window.electronAPI) return;

    try {
      const { timerData, overlaySettings } = useTimerStore.getState();
      await window.electronAPI.store.set('timerData', timerData);
      await window.electronAPI.store.set('overlaySettings', overlaySettings);
      
      console.log('Data saved to electron store');
    } catch (error) {
      console.warn('Failed to save data to electron store:', error);
    }
  };

  return { saveToElectronStore };
};

export default useElectronStore;