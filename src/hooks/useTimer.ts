import { useEffect, useRef, useState, useCallback } from 'react';
import { useTimerStore } from '../store/timerStore';
import { formatTime, PreciseTimer } from '../utils/timer';

const useTimer = () => {
  const {
    timerData,
    setTimerValue,
    setTimerRunning,
    setCurrentTimer,
    resetTimer,
  } = useTimerStore();

  const timer1Ref = useRef<PreciseTimer | null>(null);
  const timer2Ref = useRef<PreciseTimer | null>(null);
  const [formattedTime1, setFormattedTime1] = useState('0:00.0');
  const [formattedTime2, setFormattedTime2] = useState('0:00.0');

  const syncToOverlay = useCallback((data: any) => {
    if (window.electronAPI) {
      window.electronAPI.timer.syncData(data);
    }
  }, []);

  useEffect(() => {
    if (!timer1Ref.current) {
      timer1Ref.current = new PreciseTimer((value) => {
        setTimerValue(1, value);
        const formatted = formatTime(value);
        setFormattedTime1(formatted);
        
        const currentData = useTimerStore.getState().timerData;
        syncToOverlay({
          ...currentData,
          timer1Value: value,
          timer1: formatted,
          timer2: formatTime(currentData.timer2Value),
        });
      });
    }

    if (!timer2Ref.current) {
      timer2Ref.current = new PreciseTimer((value) => {
        setTimerValue(2, value);
        const formatted = formatTime(value);
        setFormattedTime2(formatted);
        
        const currentData = useTimerStore.getState().timerData;
        syncToOverlay({
          ...currentData,
          timer2Value: value,
          timer2: formatted,
          timer1: formatTime(currentData.timer1Value),
        });
      });
    }

    return () => {
      timer1Ref.current?.stop();
      timer2Ref.current?.stop();
    };
  }, [setTimerValue, syncToOverlay]);

  useEffect(() => {
    const newTime1 = formatTime(timerData.timer1Value);
    const newTime2 = formatTime(timerData.timer2Value);
    
    setFormattedTime1(newTime1);
    setFormattedTime2(newTime2);
    
    syncToOverlay({
      ...timerData,
      timer1: newTime1,
      timer2: newTime2,
    });
  }, [
    timerData.timer1Value,
    timerData.timer2Value,
    timerData.player1Name,
    timerData.player2Name,
    timerData.player1Score,
    timerData.player2Score,
    timerData.currentTimer,
    timerData.isRunning,
    timerData.style,
    syncToOverlay
  ]);

  const startTimer = useCallback(() => {
    const currentTimer = timerData.currentTimer;
    const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
    const initialValue = currentTimer === 1 ? timerData.timer1Value : timerData.timer2Value;

    if (timerRef && !timerRef.running) {
      timerRef.start(initialValue);
      setTimerRunning(true);
    }
  }, [timerData.currentTimer, timerData.timer1Value, timerData.timer2Value, setTimerRunning]);

  const pauseTimer = useCallback(() => {
    const currentTimer = timerData.currentTimer;
    const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;

    if (timerRef && timerRef.running) {
      const finalValue = timerRef.pause();
      setTimerValue(currentTimer, finalValue);
      setTimerRunning(false);
    }
  }, [timerData.currentTimer, setTimerValue, setTimerRunning]);

  const swapTimer = useCallback(() => {
    if (timerData.isRunning) {
      pauseTimer();
    }
    
    const newTimer = timerData.currentTimer === 1 ? 2 : 1;
    setCurrentTimer(newTimer);
  }, [timerData.currentTimer, timerData.isRunning, pauseTimer, setCurrentTimer]);

  const resetCurrentTimer = useCallback(() => {
    if (timerData.isRunning) {
      pauseTimer();
    }
    
    resetTimer();
    
    const timerRef = timerData.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
    if (timerRef) {
      timerRef.reset();
    }
  }, [timerData.isRunning, timerData.currentTimer, pauseTimer, resetTimer]);

  const resetAllTimers = useCallback(() => {
    timer1Ref.current?.reset();
    timer2Ref.current?.reset();
    setTimerRunning(false);
  }, [setTimerRunning]);

  return {
    formattedTime1,
    formattedTime2,
    isRunning: timerData.isRunning,
    currentTimer: timerData.currentTimer,
    startTimer,
    pauseTimer,
    swapTimer,
    resetCurrentTimer,
    resetAllTimers,
  };
};

export default useTimer;