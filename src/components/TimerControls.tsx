import React from 'react';
import { useTimerStore } from '../store/timerStore';

const TimerControls: React.FC = () => {
  const {
    timerData,
    startTimer,
    pauseTimer,
    swapTimer,
    resetTimer,
    resetAllTimers,
    setCurrentTimer,
    saveToStorage
  } = useTimerStore();

  const handleStartPause = () => {
    if (timerData.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    setTimeout(() => saveToStorage(), 100);
  };

  const handleSwap = () => {
    swapTimer();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleResetCurrent = () => {
    resetTimer();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleResetAll = () => {
    resetAllTimers();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleTimerSelect = (timer: 1 | 2) => {
    if (timerData.isRunning) {
      pauseTimer();
    }
    setCurrentTimer(timer);
    setTimeout(() => saveToStorage(), 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Timer Controls</h3>
        <p className="text-gray-400">All timer actions are displayed on the overlay</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleTimerSelect(1)}
          className={`py-3 px-4 rounded-md font-medium transition-colors ${
            timerData.currentTimer === 1
              ? 'bg-primary-600 text-white ring-2 ring-primary-400'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Select {timerData.player1Name}
          {timerData.currentTimer === 1 && timerData.isRunning && (
            <div className="text-xs text-green-400 mt-1">● ACTIVE</div>
          )}
        </button>
        
        <button
          onClick={() => handleTimerSelect(2)}
          className={`py-3 px-4 rounded-md font-medium transition-colors ${
            timerData.currentTimer === 2
              ? 'bg-primary-600 text-white ring-2 ring-primary-400'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Select {timerData.player2Name}
          {timerData.currentTimer === 2 && timerData.isRunning && (
            <div className="text-xs text-green-400 mt-1">● ACTIVE</div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleStartPause}
          className={`py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
            timerData.isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30'
          }`}
        >
          {timerData.isRunning ? '⏸️ PAUSE' : '▶️ START'}
        </button>
        
        <button
          onClick={handleSwap}
          className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-blue-500/30"
        >
          🔄 SWAP
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleResetCurrent}
          className="py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
        >
          Reset Current
        </button>
        
        <button
          onClick={handleResetAll}
          className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Current Active Timer</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className={`font-medium ${
              timerData.isRunning ? 'text-green-400' : 'text-gray-400'
            }`}>
              {timerData.isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
        <p className="text-center text-lg font-semibold text-primary-400">
          {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
        </p>
      </div>

      <div className="text-sm text-gray-400 text-center bg-gray-800 p-3 rounded-lg">
        <p>💡 Use your configured hotkeys to control timers globally:</p>
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">{timerData.startHotkey}</kbd> Start/Pause • <kbd className="bg-gray-700 px-2 py-1 rounded">{timerData.swapHotkey}</kbd> Swap</p>
      </div>
    </div>
  );
};

export default TimerControls;