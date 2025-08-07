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

    // Handle running state changes
    if (lastState.isRunning !== currentState.isRunning) {
      if (currentState.isRunning) {
        console.log('Starting timer in overlay, current:', currentState.currentTimer);
        const timerRef = currentState.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
        const resumeValue = currentState.currentTimer === 1 ? currentState.timer1Value : currentState.timer2Value;
        
        if (timerRef) {
          timerRef.start(resumeValue);
        }
      } else {
        console.log('Pausing timer in overlay');
        const currentTimer = currentState.currentTimer;
        const timerRef = currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
        
        if (timerRef && timerRef.running) {
          const finalValue = timerRef.pause();
          const valueKey = currentTimer === 1 ? 'timer1Value' : 'timer2Value';
          setLocalTimerData(prev => ({ ...prev, [valueKey]: finalValue }));
        }
      }
    }

    // Handle timer swap (don't reset values, just change active timer)
    if (lastState.currentTimer !== currentState.currentTimer) {
      console.log('Timer swapped in overlay from', lastState.currentTimer, 'to:', currentState.currentTimer);
      
      if (lastState.isRunning) {
        // Pause the old timer and start the new one
        const oldTimerRef = lastState.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
        const newTimerRef = currentState.currentTimer === 1 ? timer1Ref.current : timer2Ref.current;
        
        if (oldTimerRef && oldTimerRef.running) {
          const finalValue = oldTimerRef.pause();
          const oldValueKey = lastState.currentTimer === 1 ? 'timer1Value' : 'timer2Value';
          setLocalTimerData(prev => ({ ...prev, [oldValueKey]: finalValue }));
        }
        
        if (newTimerRef && currentState.isRunning) {
          const resumeValue = currentState.currentTimer === 1 ? currentState.timer1Value : currentState.timer2Value;
          newTimerRef.start(resumeValue);
        }
      }
    }

    // Handle reset (only when value goes to 0 and not running)
    if (lastState.timer1Value !== currentState.timer1Value && 
        !currentState.isRunning && 
        currentState.timer1Value === 0 && 
        lastState.timer1Value > 0) {
      if (timer1Ref.current) {
        timer1Ref.current.reset();
      }
    }

    if (lastState.timer2Value !== currentState.timer2Value && 
        !currentState.isRunning && 
        currentState.timer2Value === 0 && 
        lastState.timer2Value > 0) {
      if (timer2Ref.current) {
        timer2Ref.current.reset();
      }
    }

    lastStateRef.current = currentState;
  }, [localTimerData, isInitialized]);

  useEffect(() => {
    if (!window.electronAPI?.overlay) return;

    const cleanupDataSync = window.electronAPI.overlay.onDataSync((data) => {
      console.log('Received timer data sync in overlay:', data);
      syncingRef.current = true;
      setLocalTimerData(data);
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