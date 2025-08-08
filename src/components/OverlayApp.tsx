import React, { useEffect, useState, useRef } from 'react';
import { useTimerStore } from '../store/timerStore';
import TimerOverlay from './overlay/TimerOverlay';
import { PreciseTimer } from '../utils/timer';

const OverlayApp: React.FC = () => {
  const { 
    loadFromStorage, 
    timerData, 
    setTimerValue
  } = useTimerStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [localTimerData, setLocalTimerData] = useState(timerData);
  
  const timer1Ref = useRef<PreciseTimer | null>(null);
  const timer2Ref = useRef<PreciseTimer | null>(null);
  const lastStateRef = useRef({ 
    isRunning: false, 
    currentTimer: 1,
    timer1Value: 0,
    timer2Value: 0
  });
  const syncingRef = useRef(false);

  useEffect(() => {
    const initializeOverlay = async () => {
      try {
        await loadFromStorage();
        setIsInitialized(true);
        console.log('Overlay initialized successfully');
      } catch (error) {
        console.error('Failed to initialize overlay:', error);
        setIsInitialized(true);
      }
    };

    initializeOverlay();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!timer1Ref.current) {
      timer1Ref.current = new PreciseTimer((value) => {
        if (!syncingRef.current) {
          setLocalTimerData(prev => ({ ...prev, timer1Value: value }));
        }
      });
    }

    if (!timer2Ref.current) {
      timer2Ref.current = new PreciseTimer((value) => {
        if (!syncingRef.current) {
          setLocalTimerData(prev => ({ ...prev, timer2Value: value }));
        }
      });
    }

    return () => {
      timer1Ref.current?.stop();
      timer2Ref.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const lastState = lastStateRef.current;
    const currentState = {
      isRunning: localTimerData.isRunning,
      currentTimer: localTimerData.currentTimer,
      timer1Value: localTimerData.timer1Value,
      timer2Value: localTimerData.timer2Value
    };

    console.log('State change detected:', {
      lastState,
      currentState,
      stateChanges: {
        runningChanged: lastState.isRunning !== currentState.isRunning,
        timerChanged: lastState.currentTimer !== currentState.currentTimer,
        timer1ValueChanged: lastState.timer1Value !== currentState.timer1Value,
        timer2ValueChanged: lastState.timer2Value !== currentState.timer2Value
      }
    });

    // Handle timer swap AVANT tout le reste
    if (lastState.currentTimer !== currentState.currentTimer) {
      console.log('SWAP DETECTED: from timer', lastState.currentTimer, 'to timer', currentState.currentTimer);

      // Arrêter TOUS les timers lors du swap et sauvegarder leurs valeurs
      if (timer1Ref.current?.running) {
        const finalValue1 = timer1Ref.current.pause();
        console.log('SWAP: Pausing timer 1 at value:', finalValue1);
        // Utiliser setLocalTimerData pour mettre à jour l'affichage immédiatement
        setLocalTimerData(prev => ({ ...prev, timer1Value: finalValue1 }));
      }
      if (timer2Ref.current?.running) {
        const finalValue2 = timer2Ref.current.pause();
        console.log('SWAP: Pausing timer 2 at value:', finalValue2);
        // Utiliser setLocalTimerData pour mettre à jour l'affichage immédiatement
        setLocalTimerData(prev => ({ ...prev, timer2Value: finalValue2 }));
      }

      console.log('SWAP: Timer', currentState.currentTimer, 'is now selected');
    }

    // Handle running state changes
    if (lastState.isRunning !== currentState.isRunning) {
      if (currentState.isRunning) {
        // Démarrer SEULEMENT le timer actuel
        console.log('Starting timer', currentState.currentTimer);
        const timerRef = currentState.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
        const resumeValue = currentState.currentTimer === 1 ? currentState.timer1Value : currentState.timer2Value;
        
        // S'assurer que l'autre timer est arrêté
        const otherTimerRef = currentState.currentTimer === 1 ? timer2Ref.current : timer1Ref.current;
        if (otherTimerRef?.running) {
          console.log('Stopping other timer before starting current one');
          const finalValue = otherTimerRef.pause();
          const otherValueKey = currentState.currentTimer === 1 ? 'timer2Value' : 'timer1Value';
          setLocalTimerData(prev => ({ ...prev, [otherValueKey]: finalValue }));
        }
        
        console.log('Resuming timer with value:', resumeValue);
        if (timerRef) {
          timerRef.start(resumeValue);
        }
      } else {
        // Pause TOUS les timers
        console.log('Pausing all timers');
        if (timer1Ref.current?.running) {
          const finalValue1 = timer1Ref.current.pause();
          console.log('Paused timer 1 at value:', finalValue1);
          setLocalTimerData(prev => ({ ...prev, timer1Value: finalValue1 }));
        }
        if (timer2Ref.current?.running) {
          const finalValue2 = timer2Ref.current.pause();
          console.log('Paused timer 2 at value:', finalValue2);
          setLocalTimerData(prev => ({ ...prev, timer2Value: finalValue2 }));
        }
      }
    }

    lastStateRef.current = currentState;
  }, [localTimerData, isInitialized]);

  useEffect(() => {
    if (!window.electronAPI?.overlay) return;

    const cleanupDataSync = window.electronAPI.overlay.onDataSync((data) => {
      console.log('Received timer data sync in overlay:', data);
      syncingRef.current = true;
      
      // Mettre à jour l'état local avec les nouvelles données
      setLocalTimerData(data);
      
      // Si les timers tournent, les arrêter d'abord
      if (timer1Ref.current?.running) {
        timer1Ref.current.stop();
      }
      if (timer2Ref.current?.running) {
        timer2Ref.current.stop();
      }
      
      setTimeout(() => {
        syncingRef.current = false;
      }, 100);
    });

    return cleanupDataSync;
  }, []);

  useEffect(() => {
    const forceTransparency = () => {
      const elements = [
        document.body,
        document.documentElement,
        document.getElementById('overlay-root')
      ].filter(Boolean);

      elements.forEach(el => {
        if (el) {
          el.style.background = 'transparent';
          el.style.backgroundColor = 'transparent';
          el.style.margin = '0';
          el.style.padding = '0';
          el.style.overflow = 'hidden';
          el.style.border = 'none';
          el.style.outline = 'none';
        }
      });
    };

    forceTransparency();
    const interval = setInterval(forceTransparency, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ 
        background: 'transparent', 
        color: 'white', 
        padding: '20px',
        fontFamily: 'monospace'
      }}>
        Loading overlay...
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full"
      style={{ 
        background: 'transparent',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        border: 'none',
        outline: 'none'
      }}
    >
      <TimerOverlay timerData={localTimerData} />
    </div>
  );
};

export default OverlayApp;