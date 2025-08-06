// src/components/OverlayApp.tsx
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

    const handleTimerUpdate = (data: any) => {
      setLocalTimerData(prev => ({ ...prev, ...data }));
    };

    const handleDataSync = (data: TimerData) => {
      setLocalTimerData(data);
    };

    const handleStyleChange = (style: TimerStyle) => {
      setCurrentStyle(style);
    };

    window.electronAPI.overlay.onTimerUpdate(handleTimerUpdate);
    window.electronAPI.overlay.onDataSync(handleDataSync);
    window.electronAPI.overlay.onStyleChange(handleStyleChange);

    return () => {
      window.electronAPI.removeAllListeners();
    };
  }, []);

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