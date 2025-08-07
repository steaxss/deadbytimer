// src/components/OverlaySettings.tsx
import React from 'react';
import { useTimerStore } from '../store/timerStore';

const OverlaySettings: React.FC = () => {
  const {
    overlaySettings,
    isOverlayVisible,
    setOverlayVisible,
    setOverlaySettings
  } = useTimerStore();

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseInt(e.target.value);
    setOverlaySettings({ scale });
  };

  const handleLockToggle = () => {
    setOverlaySettings({ locked: !overlaySettings.locked });
  };

  const handleAlwaysOnTopToggle = () => {
    setOverlaySettings({ alwaysOnTop: !overlaySettings.alwaysOnTop });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Overlay Settings</h3>
        <button
          onClick={() => setOverlayVisible(!isOverlayVisible)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isOverlayVisible
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-white font-medium">Scale</label>
            <span className="text-primary-400 font-mono">{overlaySettings.scale}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={overlaySettings.scale}
            onChange={handleScaleChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50%</span>
            <span>100%</span>
            <span>200%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <div className="text-white font-medium">Lock Position</div>
              <div className="text-sm text-gray-400">
                {overlaySettings.locked ? 'Overlay is click-through' : 'Overlay can be dragged'}
              </div>
            </div>
            <button
              onClick={handleLockToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                overlaySettings.locked ? 'bg-primary-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  overlaySettings.locked ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <div className="text-white font-medium">Always on Top</div>
              <div className="text-sm text-gray-400">
                {overlaySettings.alwaysOnTop ? 'Overlay stays above other windows' : 'Normal window behavior'}
              </div>
            </div>
            <button
              onClick={handleAlwaysOnTopToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                overlaySettings.alwaysOnTop ? 'bg-primary-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  overlaySettings.alwaysOnTop ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${overlaySettings.locked ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className="text-white font-medium">
              {overlaySettings.locked ? 'Overlay Locked' : 'Overlay Unlocked'}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {overlaySettings.locked
              ? 'The overlay is now click-through and cannot be moved. Unlock to reposition.'
              : 'Drag the purple bar at the top of the overlay to reposition it.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverlaySettings;