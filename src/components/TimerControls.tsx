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
    console.log('Start/Pause clicked. Current running state:', isRunning);
    
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    
    // Sauvegarder après un délai pour laisser le temps aux états de se mettre à jour
    setTimeout(() => {
      saveToStorage();
    }, 100);
  };

  const handleSwap = () => {
    console.log('Swap clicked. Current timer:', timerData.currentTimer);
    swapTimer();
    
    setTimeout(() => {
      saveToStorage();
    }, 100);
  };

  const handleResetCurrent = () => {
    console.log('Reset current clicked. Current timer:', timerData.currentTimer);
    resetTimer();
    
    setTimeout(() => {
      saveToStorage();
    }, 100);
  };

  const handleResetAll = () => {
    console.log('Reset all clicked');
    resetAllTimers();
    
    setTimeout(() => {
      saveToStorage();
    }, 100);
  };

  const handleTimerSelect = (timer: 1 | 2) => {
    console.log('Timer selected:', timer);
    setCurrentTimer(timer);
    
    setTimeout(() => {
      saveToStorage();
    }, 100);
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
          Timer 1 {timerData.currentTimer === 1 && isRunning && '●'}
        </button>
        
        <button
          onClick={() => handleTimerSelect(2)}
          className={`py-2 px-4 rounded-md font-medium transition-colors ${
            timerData.currentTimer === 2
              ? 'bg-primary-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Timer 2 {timerData.currentTimer === 2 && isRunning && '●'}
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
        {isRunning && <span className="text-success-400 ml-2">● Running</span>}
      </div>
    </div>
  );
};

export default TimerControls;