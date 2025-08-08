import { useEffect, useCallback } from 'react';
import { useTimerStore } from '../store/timerStore';

const useTimer = () => {
  const {
    timerData,
    setTimerRunning,
    setCurrentTimer,
    saveToStorage
  } = useTimerStore();

  const startTimer = useCallback(() => {
    if (!timerData.isRunning) {
      console.log('Starting timer, current:', timerData.currentTimer);
      setTimerRunning(true);
      setTimeout(() => saveToStorage(), 100);
    }
  }, [timerData.isRunning, timerData.currentTimer, setTimerRunning, saveToStorage]);

  const pauseTimer = useCallback(() => {
    if (timerData.isRunning) {
      console.log('Pausing timer, current:', timerData.currentTimer);
      setTimerRunning(false);
      setTimeout(() => saveToStorage(), 100);
    }
  }, [timerData.isRunning, timerData.currentTimer, setTimerRunning, saveToStorage]);

  const swapTimer = useCallback(() => {
    console.log('Swapping timer from', timerData.currentTimer);
    
    if (timerData.isRunning) {
      pauseTimer();
    }
    
    const newTimer = timerData.currentTimer === 1 ? 2 : 1;
    console.log('Swapping to timer:', newTimer);
    setCurrentTimer(newTimer);
    setTimeout(() => saveToStorage(), 100);
  }, [timerData.currentTimer, timerData.isRunning, pauseTimer, setCurrentTimer, saveToStorage]);

  return {
    isRunning: timerData.isRunning,
    currentTimer: timerData.currentTimer,
    startTimer,
    pauseTimer,
    swapTimer,
  };
};

export default useTimer;