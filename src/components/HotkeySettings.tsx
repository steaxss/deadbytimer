// src/components/HotkeySettings.tsx
import React, { useState } from 'react';
import { useTimerStore } from '../store/timerStore';

const HotkeySettings: React.FC = () => {
  const { timerData, updateHotkeys, saveToStorage } = useTimerStore();
  
  const [startKey, setStartKey] = useState(timerData.startHotkey);
  const [swapKey, setSwapKey] = useState(timerData.swapHotkey);
  const [isListening, setIsListening] = useState<'start' | 'swap' | null>(null);

  const handleKeyCapture = (type: 'start' | 'swap') => {
    setIsListening(type);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      let key = '';
      
      if (e.code.startsWith('F') && /^F\d+$/.test(e.code)) {
        key = e.code;
      } else if (e.code.startsWith('Key')) {
        key = e.code.slice(3);
      } else if (e.code.startsWith('Digit')) {
        key = e.code.slice(5);
      } else {
        key = e.code;
      }
      
      if (type === 'start') {
        setStartKey(key);
      } else {
        setSwapKey(key);
      }
      
      setIsListening(null);
      document.removeEventListener('keydown', handleKeyDown);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    setTimeout(() => {
      if (isListening === type) {
        setIsListening(null);
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, 5000);
  };

  const handleSave = async () => {
    const hotkeys = {
      start: startKey,
      swap: swapKey,
    };
    
    updateHotkeys(hotkeys);
    
    if (window.electronAPI) {
      await window.electronAPI.hotkeys.register(hotkeys);
    }
    
    saveToStorage();
  };

  const handleReset = () => {
    setStartKey('F1');
    setSwapKey('F2');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-primary-400 mb-4">
        Hotkey Settings
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start/Pause Timer
          </label>
          <button
            onClick={() => handleKeyCapture('start')}
            className={`w-full py-2 px-4 rounded-md border text-left transition-colors ${
              isListening === 'start'
                ? 'bg-primary-600 border-primary-500 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {isListening === 'start' ? 'Press any key...' : startKey}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Swap Timer
          </label>
          <button
            onClick={() => handleKeyCapture('swap')}
            className={`w-full py-2 px-4 rounded-md border text-left transition-colors ${
              isListening === 'swap'
                ? 'bg-primary-600 border-primary-500 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {isListening === 'swap' ? 'Press any key...' : swapKey}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isListening !== null}
            className="flex-1 py-2 px-4 bg-success-600 hover:bg-success-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
          >
            Save Hotkeys
          </button>
          
          <button
            onClick={handleReset}
            disabled={isListening !== null}
            className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-300 rounded-md font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="text-xs text-gray-500">
          Global hotkeys work even when the app is not focused. Current: Start ({timerData.startHotkey}), Swap ({timerData.swapHotkey})
        </div>
      </div>
    </div>
  );
};

export default HotkeySettings;