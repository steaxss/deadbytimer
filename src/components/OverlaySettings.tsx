// src/components/OverlaySettings.tsx
import React from 'react';
import { useTimerStore } from '../store/timerStore';
import type { TimerStyle } from '../types';

const OverlaySettings: React.FC = () => {
  const {
    timerData,
    overlaySettings,
    updateStyle,
    toggleOverlayLock,
    updateOverlayScale,
    saveToStorage,
  } = useTimerStore();

  const styles: { value: TimerStyle; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'circular', label: 'Circular' },
    { value: 'nostalgia', label: 'Nostalgia' },
  ];

  const handleStyleChange = (style: TimerStyle) => {
    updateStyle(style);
    if (window.electronAPI) {
      window.electronAPI.overlay.styleChange(style);
    }
    saveToStorage();
  };

  const handleLockToggle = async () => {
    const newLocked = !overlaySettings.locked;
    toggleOverlayLock();
    
    if (window.electronAPI) {
      await window.electronAPI.overlay.updateSettings({ locked: newLocked });
    }
    saveToStorage();
  };

  const handleScaleChange = async (scale: number) => {
    updateOverlayScale(scale);
    
    if (window.electronAPI) {
      await window.electronAPI.overlay.updateSettings({ scale });
    }
    saveToStorage();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-primary-400 mb-4">
        Overlay Settings
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange(value)}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  timerData.style === value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scale: {overlaySettings.scale}%
          </label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={overlaySettings.scale}
            onChange={(e) => handleScaleChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50%</span>
            <span>100%</span>
            <span>200%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            Lock Position
          </span>
          <button
            onClick={handleLockToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              overlaySettings.locked ? 'bg-primary-600' : 'bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                overlaySettings.locked ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="text-xs text-gray-500">
          {overlaySettings.locked 
            ? 'Overlay position is locked and click-through is enabled'
            : 'Overlay can be moved by dragging'}
        </div>

        <div className="text-xs text-gray-500">
          Position: X: {overlaySettings.x}, Y: {overlaySettings.y}
        </div>
      </div>
    </div>
  );
};

export default OverlaySettings;