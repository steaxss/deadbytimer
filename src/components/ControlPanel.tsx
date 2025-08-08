// ========== NOUVEAU CONTROL PANEL SIMPLIFIÉ (src/components/ControlPanel.tsx) ==========

import React, { useEffect, useState } from 'react';
import { useTimerStore } from '@/store/timerStore';

const ControlPanel: React.FC = () => {
  const { 
    timerData, 
    overlaySettings, 
    setOverlayVisible, 
    isOverlayVisible, 
    saveToStorage,
    updatePlayerName,
    updatePlayerScore,
    updateHotkeys,
    setOverlaySettings,
    resetAllTimers,
    resetTimer
  } = useTimerStore();
  
  const [player1Input, setPlayer1Input] = useState(timerData.player1Name);
  const [player2Input, setPlayer2Input] = useState(timerData.player2Name);
  const [startKey, setStartKey] = useState(timerData.startHotkey);
  const [swapKey, setSwapKey] = useState(timerData.swapHotkey);
  const [isListeningKey, setIsListeningKey] = useState<'start' | 'swap' | null>(null);

  // Auto-save toutes les 2 secondes
  useEffect(() => {
    const id = setInterval(() => {
      saveToStorage();
    }, 2000);
    return () => clearInterval(id);
  }, [saveToStorage]);

  // Gérer le toggle overlay avec debounce
  const [overlayToggleTimeout, setOverlayToggleTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleOverlayToggle = () => {
    if (overlayToggleTimeout) {
      clearTimeout(overlayToggleTimeout);
    }
    
    const timeout = setTimeout(() => {
      setOverlayVisible(!isOverlayVisible);
    }, 100);
    
    setOverlayToggleTimeout(timeout);
  };

  const handleLockToggle = () => {
    setOverlaySettings({ locked: !overlaySettings.locked });
    saveToStorage();
  };

  const handleKeyCapture = (type: 'start' | 'swap') => {
    setIsListeningKey(type);
    
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
      
      setIsListeningKey(null);
      document.removeEventListener('keydown', handleKeyDown);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    setTimeout(() => {
      if (isListeningKey === type) {
        setIsListeningKey(null);
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, 5000);
  };

  const handleSaveHotkeys = async () => {
    const hotkeys = {
      start: startKey,
      swap: swapKey,
    };
    
    await updateHotkeys(hotkeys);
    
    if (window.electronAPI) {
      await window.electronAPI.hotkeys.register(hotkeys);
    }
    
    saveToStorage();
  };

  const handlePlayerNameSave = (player: 1 | 2) => {
    if (player === 1) {
      updatePlayerName(1, player1Input.trim() || 'PLAYER 1');
    } else {
      updatePlayerName(2, player2Input.trim() || 'PLAYER 2');
    }
    saveToStorage();
  };

  const handleScoreChange = (player: 1 | 2, delta: number) => {
    updatePlayerScore(player, delta);
    saveToStorage();
  };

  const handleResetCurrent = () => {
    resetTimer(timerData.selectedTimer);
    saveToStorage();
  };

  const handleResetAll = () => {
    resetAllTimers();
    saveToStorage();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-400">DBD Timer Control</h1>
      </header>

      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Overlay Controls */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-purple-300">Overlay Control</h2>
          
          <div className="flex gap-4 items-center">
            <button
              onClick={handleOverlayToggle}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isOverlayVisible 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
            </button>
            
            <button
              onClick={handleLockToggle}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                overlaySettings.locked 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {overlaySettings.locked ? '🔒 Unlock Position' : '🔓 Lock Position'}
            </button>
          </div>
          
          {overlaySettings.locked && (
            <p className="mt-2 text-sm text-gray-400">
              Overlay is locked and click-through (drag handle hidden)
            </p>
          )}
        </div>

        {/* Players */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-purple-300">Players</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Player 1 */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={player1Input}
                  onChange={(e) => setPlayer1Input(e.target.value)}
                  onBlur={() => handlePlayerNameSave(1)}
                  className="flex-1 px-3 py-1 bg-gray-700 rounded text-white"
                  placeholder="Player 1 Name"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Score: {timerData.player1Score}</span>
                <button
                  onClick={() => handleScoreChange(1, -1)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                >
                  -1
                </button>
                <button
                  onClick={() => handleScoreChange(1, 1)}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                >
                  +1
                </button>
              </div>
            </div>

            {/* Player 2 */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={player2Input}
                  onChange={(e) => setPlayer2Input(e.target.value)}
                  onBlur={() => handlePlayerNameSave(2)}
                  className="flex-1 px-3 py-1 bg-gray-700 rounded text-white"
                  placeholder="Player 2 Name"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Score: {timerData.player2Score}</span>
                <button
                  onClick={() => handleScoreChange(2, -1)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                >
                  -1
                </button>
                <button
                  onClick={() => handleScoreChange(2, 1)}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                >
                  +1
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hotkeys */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-purple-300">Hotkeys</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start/Pause</label>
              <button
                onClick={() => handleKeyCapture('start')}
                className={`w-full px-3 py-2 rounded ${
                  isListeningKey === 'start' 
                    ? 'bg-purple-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
              >
                {isListeningKey === 'start' ? 'Press a key...' : startKey}
              </button>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Swap Timer</label>
              <button
                onClick={() => handleKeyCapture('swap')}
                className={`w-full px-3 py-2 rounded ${
                  isListeningKey === 'swap' 
                    ? 'bg-purple-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
              >
                {isListeningKey === 'swap' ? 'Press a key...' : swapKey}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleSaveHotkeys}
            className="mt-3 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium"
          >
            Save Hotkeys
          </button>
        </div>

        {/* Reset Buttons */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-purple-300">Reset</h2>
          
          <div className="flex gap-4">
            <button
              onClick={handleResetCurrent}
              className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-medium"
            >
              Reset Current Timer
            </button>
            <button
              onClick={handleResetAll}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-800 rounded-lg p-3 text-center text-sm text-gray-400">
          Selected: {timerData.selectedTimer === 1 ? timerData.player1Name : timerData.player2Name} | 
          Status: {timerData.isRunning ? 'Running' : 'Stopped'}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;