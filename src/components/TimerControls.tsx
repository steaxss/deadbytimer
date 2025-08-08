import React from 'react';
import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../utils/timer';

const TimerControls: React.FC = () => {
  const {
    timerData,
    startTimer,
    swapTimer,
    resetAllTimers,
    setCurrentTimer,
    saveToStorage
  } = useTimerStore();

  const handleStartPause = () => {
    startTimer();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleSwap = () => {
    swapTimer();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleResetAll = () => {
    resetAllTimers();
    setTimeout(() => saveToStorage(), 100);
  };

  const handleTimerSelect = (timer: 1 | 2) => {
    if (timerData.selectedTimer === timer) return;
    setCurrentTimer(timer);
    setTimeout(() => saveToStorage(), 100);
  };

  const getTimerStatus = (timerId: 1 | 2) => {
    const isSelected = timerData.selectedTimer === timerId;
    const isActive = timerData.currentTimer === timerId && timerData.isRunning;
    const clickCount = timerId === 1 ? timerData.timer1ClickCount : timerData.timer2ClickCount;
    
    if (isActive) return 'RUNNING';
    if (clickCount === 2) return 'PAUSED';
    if (clickCount === 1) return 'READY';
    return 'IDLE';
  };

  const getActionButtonText = () => {
    const selected = timerData.selectedTimer;
    const clickCount = selected === 1 ? timerData.timer1ClickCount : timerData.timer2ClickCount;
    
    if (clickCount === 0) return 'Start';
    if (clickCount === 1 && timerData.isRunning && timerData.currentTimer === selected) return 'Pause';
    if (clickCount === 2) return 'Reset';
    return 'Start';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">{timerData.player1Name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              timerData.selectedTimer === 1 ? 'bg-purple-600' : 'bg-gray-600'
            }`}>
              {getTimerStatus(1)}
            </span>
          </div>
          <div className="text-2xl font-mono mb-3">
            {formatTime(timerData.timer1Value)}
          </div>
          <button
            onClick={() => handleTimerSelect(1)}
            className={`w-full py-2 px-3 rounded-md font-medium transition-colors ${
              timerData.selectedTimer === 1
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
          >
            {timerData.selectedTimer === 1 ? 'Selected' : 'Select'}
          </button>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">{timerData.player2Name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              timerData.selectedTimer === 2 ? 'bg-purple-600' : 'bg-gray-600'
            }`}>
              {getTimerStatus(2)}
            </span>
          </div>
          <div className="text-2xl font-mono mb-3">
            {formatTime(timerData.timer2Value)}
          </div>
          <button
            onClick={() => handleTimerSelect(2)}
            className={`w-full py-2 px-3 rounded-md font-medium transition-colors ${
              timerData.selectedTimer === 2
                ? 'bg-purple-600 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
          >
            {timerData.selectedTimer === 2 ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleStartPause}
          className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
            timerData.isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {getActionButtonText()}
        </button>
        
        <button
          onClick={handleSwap}
          className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          Swap
        </button>
        
        <button
          onClick={handleResetAll}
          className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold"
        >
          Reset All
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg p-3">
        <div className="text-center text-sm text-gray-300">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${
              timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
            }`} />
            <span>Currently selected: <strong>{timerData.selectedTimer === 1 ? timerData.player1Name : timerData.player2Name}</strong></span>
          </div>
          {timerData.isRunning && (
            <div className="text-green-400">
              Timer {timerData.currentTimer} is running
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerControls;