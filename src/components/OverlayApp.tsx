import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../store/timerStore';
import TimerOverlay from './overlay/TimerOverlay';
import DragHandle from './overlay/DragHandle';
import type { TimerData, TimerStyle } from '../types';

const OverlayApp: React.FC = () => {
  const { timerData, overlaySettings } = useTimerStore();
  const [localTimerData, setLocalTimerData] = useState<TimerData>(timerData);
  const [currentStyle, setCurrentStyle] = useState<TimerStyle>(timerData.style);

  useEffect(() => {
    if (!window.electronAPI) return;

    const handleDataSync = (data: TimerData) => {
      console.log('Overlay received data sync:', data);
      setLocalTimerData(data);
    };

    const handleStyleChange = (style: TimerStyle) => {
      console.log('Overlay received style change:', style);
      setCurrentStyle(style);
    };

    const unsubscribeDataSync = window.electronAPI.overlay.onDataSync(handleDataSync);
    const unsubscribeStyleChange = window.electronAPI.overlay.onStyleChange(handleStyleChange);

    return () => {
      unsubscribeDataSync();
      unsubscribeStyleChange();
    };
  }, []);

  useEffect(() => {
    setLocalTimerData(timerData);
    setCurrentStyle(timerData.style);
  }, [timerData]);

  const containerStyle: React.CSSProperties = {
    transform: `scale(${overlaySettings.scale / 100})`,
    transformOrigin: 'top left',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: overlaySettings.locked ? 'none' : 'auto',
    userSelect: 'none',
  };

  console.log('Overlay rendering with data:', {
    localTimerData,
    currentStyle,
    overlaySettings
  });

  return (
    <div style={containerStyle}>
      {!overlaySettings.locked && <DragHandle />}
      <TimerOverlay
        timerData={localTimerData}
        style={currentStyle}
        isActive={localTimerData.isRunning}
      />
    </div>
  );
};

export default OverlayApp;