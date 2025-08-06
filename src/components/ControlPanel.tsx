// src/components/ControlPanel.tsx
import React from 'react';
import { useTimerStore } from '../store/timerStore';
import useTimer from '../hooks/useTimer';
import TimerControls from './TimerControls';
import PlayerSettings from './PlayerSettings';
import OverlaySettings from './OverlaySettings';
import HotkeySettings from './HotkeySettings';

const ControlPanel: React.FC = () => {
  const {
    timerData,
    overlaySettings,
    isOverlayVisible,
    setOverlayVisible,
    toggleOverlayVisibility,
    saveToStorage,
  } = useTimerStore();

  const { formattedTime1, formattedTime2, isRunning } = useTimer();

  const handleToggleOverlay = async () => {
    if (!window.electronAPI) return;

    try {
      if (isOverlayVisible) {
        await window.electronAPI.overlay.hide();
        setOverlayVisible(false);
      } else {
        await window.electronAPI.overlay.show();
        setOverlayVisible(true);
      }
      saveToStorage();
    } catch (error) {
      console.error('Failed to toggle overlay:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-primary-400 mb-4">
            Timer Control
          </h2>
          
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">
                  {timerData.player1Name}
                </div>
                <div className={`text-2xl font-mono font-bold ${
                  timerData.currentTimer === 1 && isRunning 
                    ? 'text-primary-400 timer-glow' 
                    : 'text-white'
                }`}>
                  {formattedTime1}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">
                  {timerData.player2Name}
                </div>
                <div className={`text-2xl font-mono font-bold ${
                  timerData.currentTimer === 2 && isRunning 
                    ? 'text-primary-400 timer-glow' 
                    : 'text-white'
                }`}>
                  {formattedTime2}
                </div>
              </div>
            </div>
            
            <div className="text-center text-lg font-semibold">
              Score: {timerData.player1Score} - {timerData.player2Score}
            </div>
          </div>
          
          <TimerControls />
        </div>

        <PlayerSettings />
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-primary-400 mb-4">
            Overlay Control
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={handleToggleOverlay}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                isOverlayVisible
                  ? 'bg-success-600 hover:bg-success-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
            </button>
            
            <div className="text-sm text-gray-400">
              Status: {isOverlayVisible ? 'Visible' : 'Hidden'}
            </div>
          </div>
        </div>

        <OverlaySettings />
        <HotkeySettings />
      </div>
    </div>
  );
};

export default ControlPanel;