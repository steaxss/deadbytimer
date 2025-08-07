import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../store/timerStore';
import TimerOverlay from './overlay/TimerOverlay';
import useTimer from '../hooks/useTimer';

const OverlayApp: React.FC = () => {
  const { loadFromStorage, timerData, overlaySettings } = useTimerStore();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useTimer();

  useEffect(() => {
    const initializeOverlay = async () => {
      try {
        await loadFromStorage();
        setIsInitialized(true);
        console.log('Overlay initialized successfully');
      } catch (error) {
        console.error('Failed to initialize overlay:', error);
        setIsInitialized(true);
      }
    };

    initializeOverlay();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!window.electronAPI?.overlay) return;

    const cleanupDataSync = window.electronAPI.overlay.onDataSync((data) => {
      console.log('Received timer data sync:', data);
    });

    return cleanupDataSync;
  }, []);

  useEffect(() => {
    if (window.electronAPI?.overlay?.updateSettings) {
      window.electronAPI.overlay.updateSettings(overlaySettings);
    }
  }, [overlaySettings]);

  useEffect(() => {
    const forceTransparency = () => {
      document.body.style.background = 'transparent';
      document.body.style.backgroundColor = 'transparent';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.border = 'none';
      document.body.style.outline = 'none';
      
      const htmlElement = document.documentElement;
      htmlElement.style.background = 'transparent';
      htmlElement.style.backgroundColor = 'transparent';
      htmlElement.style.margin = '0';
      htmlElement.style.padding = '0';
      htmlElement.style.overflow = 'hidden';
      htmlElement.style.border = 'none';
      htmlElement.style.outline = 'none';

      const overlayRoot = document.getElementById('overlay-root');
      if (overlayRoot) {
        overlayRoot.style.background = 'transparent';
        overlayRoot.style.backgroundColor = 'transparent';
        overlayRoot.style.margin = '0';
        overlayRoot.style.padding = '0';
        overlayRoot.style.border = 'none';
        overlayRoot.style.outline = 'none';
      }
    };

    forceTransparency();
    const interval = setInterval(forceTransparency, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <div 
      className="w-full h-full"
      style={{ 
        background: 'transparent',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        border: 'none',
        outline: 'none'
      }}
    >
      <TimerOverlay />
    </div>
  );
};

export default OverlayApp;