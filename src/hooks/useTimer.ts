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

  // Fonction de synchronisation séparée pour éviter les dépendances circulaires
  const syncToOverlay = useCallback((data: any) => {
    if (window.electronAPI) {
      window.electronAPI.timer.updateDisplay(data);
      window.electronAPI.timer.syncData(data);
    }
  }, []);

  // Initialisation des timers
  useEffect(() => {
    if (!timer1Ref.current) {
      timer1Ref.current = new PreciseTimer((value) => {
        setTimerValue(1, value);
        const formatted = formatTime(value);
        setFormattedTime1(formatted);
        
        // Sync immédiate avec les données complètes
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
        
        // Sync immédiate avec les données complètes
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

  // Mise à jour des temps formatés quand les valeurs changent
  useEffect(() => {
    const newTime1 = formatTime(timerData.timer1Value);
    const newTime2 = formatTime(timerData.timer2Value);
    
    setFormattedTime1(newTime1);
    setFormattedTime2(newTime2);
    
    // Sync des changements de données (noms, scores, etc.)
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

    console.log('Starting timer:', currentTimer, 'with value:', initialValue);

    if (timerRef && !timerRef.running) {
      timerRef.start(initialValue);
      setTimerRunning(true);
      console.log('Timer started successfully');
    } else {
      console.log('Timer already running or ref not found');
    }
  }, [timerData.currentTimer, timerData.timer1Value, timerData.timer2Value, setTimerRunning]);

  const pauseTimer = useCallback(() => {
    const currentTimer = timerData.currentTimer;
    const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;

    console.log('Pausing timer:', currentTimer);

    if (timerRef && timerRef.running) {
      const finalValue = timerRef.pause();
      setTimerValue(currentTimer, finalValue);
      setTimerRunning(false);
      console.log('Timer paused successfully, final value:', finalValue);
    } else {
      console.log('Timer not running or ref not found');
    }
  }, [timerData.currentTimer, setTimerValue, setTimerRunning]);

  const swapTimer = useCallback(() => {
    console.log('Swapping timer from', timerData.currentTimer);
    
    // Arrêter le timer actuel s'il est en marche
    if (timerData.isRunning) {
      pauseTimer();
    }
    
    const newTimer = timerData.currentTimer === 1 ? 2 : 1;
    setCurrentTimer(newTimer);
    
    console.log('Timer swapped to:', newTimer);
  }, [timerData.currentTimer, timerData.isRunning, pauseTimer, setCurrentTimer]);

  const resetCurrentTimer = useCallback(() => {
    console.log('Resetting current timer:', timerData.currentTimer);
    
    if (timerData.isRunning) {
      pauseTimer();
    }
    
    resetTimer();
    
    const timerRef = timerData.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
    if (timerRef) {
      timerRef.reset();
    }
    
    console.log('Timer reset completed');
  }, [timerData.isRunning, timerData.currentTimer, pauseTimer, resetTimer]);

  const resetAllTimers = useCallback(() => {
    console.log('Resetting all timers');
    
    timer1Ref.current?.reset();
    timer2Ref.current?.reset();
    setTimerRunning(false);
    
    console.log('All timers reset completed');
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