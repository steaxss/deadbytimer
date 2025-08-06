// src/components/TimerControls.tsx
import React from 'react';
import { useTimerStore } from '../store/timerStore';
import useTimer from '../hooks/useTimer';

const TimerControls: React.FC = () => {
  const {
    timerData,
    setCurrentTimer,
    resetTimer,
    resetAllTimers,
    saveToStorage,
  } = useTimerStore();

  const { isRunning, startTimer, pauseTimer, swapTimer } = useTimer();

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    saveToStorage();
  };

  const handleSwap = () => {
    swapTimer();
    saveToStorage();
  };

  const handleResetCurrent = () => {
    resetTimer();
    saveToStorage();
  };

  const handleResetAll = () => {
    resetAllTimers();
    saveToStorage();
  };

  const handleTimerSelect = (timer: 1 | 2) => {
    setCurrentTimer(timer);
    saveToStorage();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleTimerSelect(1)}
          className={`py-2 px-4 rounded-md font-medium transition-colors ${
            timerData.currentTimer === 1
              ? 'bg-primary-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Timer 1
        </button>
        
        <button
          onClick={() => handleTimerSelect(2)}
          className={`py-2 px-4 rounded-md font-medium transition-colors ${
            timerData.currentTimer === 2
              ? 'bg-primary-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Timer 2
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleStartPause}
          className={`py-3 px-4 rounded-md font-semibold transition-colors ${
            isRunning
              ? 'bg-danger-600 hover:bg-danger-700 text-white'
              : 'bg-success-600 hover:bg-success-700 text-white'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={handleSwap}
          className="py-3 px-4 bg-info-600 hover:bg-info-700 text-white rounded-md font-semibold transition-colors"
        >
          Swap
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleResetCurrent}
          className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
        >
          Reset Current
        </button>
        
        <button
          onClick={handleResetAll}
          className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="text-sm text-gray-400 text-center">
        Active Timer: {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
      </div>
    </div>
  );
};

export default TimerControls;