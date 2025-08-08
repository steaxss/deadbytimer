import React, { useEffect, useRef, useState } from 'react';
import { useTimerStore } from '@/store/timerStore';
import TimerOverlay from '@/components/overlay/TimerOverlay';
import { PreciseTimer } from '@/utils/timer';
import type { TimerData } from '@/types';

const OverlayApp: React.FC = () => {
  const { loadFromStorage, timerData } = useTimerStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [localTimerData, setLocalTimerData] = useState<TimerData>(timerData);

  const timer1Ref = useRef<PreciseTimer | null>(null);
  const timer2Ref = useRef<PreciseTimer | null>(null);
  const syncingRef = useRef(false);
  const lastStateRef = useRef({
    timer1Running: false,
    timer2Running: false,
    timer1Value: 0,
    timer2Value: 0
  });

  useEffect(() => {
    const run = async () => {
      await loadFromStorage();
      setIsInitialized(true);
    };
    run();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!timer1Ref.current) {
      timer1Ref.current = new PreciseTimer((value) => {
        if (!syncingRef.current) {
          setLocalTimerData((prev) => ({ ...prev, timer1Value: value }));
        }
      });
    }
    if (!timer2Ref.current) {
      timer2Ref.current = new PreciseTimer((value) => {
        if (!syncingRef.current) {
          setLocalTimerData((prev) => ({ ...prev, timer2Value: value }));
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

    setLocalTimerData((prev) => ({
      ...prev,
      ...timerData,
    }));
  }, [isInitialized, timerData]);

  useEffect(() => {
    if (!isInitialized || !timer1Ref.current || !timer2Ref.current) return;
    const shouldTimer1Run = localTimerData.isRunning && localTimerData.currentTimer === 1;
    const shouldTimer2Run = localTimerData.isRunning && localTimerData.currentTimer === 2;
    
  // Synchroniser timer 1
  if (shouldTimer1Run && !timer1Ref.current.running) {
    timer2Ref.current?.pause();
    timer1Ref.current.start(localTimerData.timer1Value || 0);
  } else if (!shouldTimer1Run && timer1Ref.current.running) {
    timer1Ref.current.pause();
  }

  // Synchroniser timer 2
  if (shouldTimer2Run && !timer2Ref.current.running) {
    timer1Ref.current?.pause();
    timer2Ref.current.start(localTimerData.timer2Value || 0);
  } else if (!shouldTimer2Run && timer2Ref.current.running) {
    timer2Ref.current.pause();
  }

  // Reset si nécessaire
  if (localTimerData.timer1Value === 0 && timer1Ref.current.currentValue !== 0) {
    timer1Ref.current.reset();
  }
  if (localTimerData.timer2Value === 0 && timer2Ref.current.currentValue !== 0) {
    timer2Ref.current.reset();
  }
}, [isInitialized, localTimerData]);

  useEffect(() => {
    if (!window.electronAPI) return;
    
    const offSync = window.electronAPI.overlay.onDataSync((data) => {
      syncingRef.current = true;
      setLocalTimerData(data);
      syncingRef.current = false;

      const shouldTimer1Run = data.isRunning && data.currentTimer === 1;
      const shouldTimer2Run = data.isRunning && data.currentTimer === 2;

      if (shouldTimer1Run) {
        timer2Ref.current?.pause();
        timer1Ref.current?.start(data.timer1Value || 0);
      } else if (shouldTimer2Run) {
        timer1Ref.current?.pause();
        timer2Ref.current?.start(data.timer2Value || 0);
      } else {
        timer1Ref.current?.pause();
        timer2Ref.current?.pause();
      }

      if (data.timer1Value === 0 && timer1Ref.current) {
        timer1Ref.current.reset();
      }
      if (data.timer2Value === 0 && timer2Ref.current) {
        timer2Ref.current.reset();
      }

      lastStateRef.current = {
        timer1Running: shouldTimer1Run,
        timer2Running: shouldTimer2Run,
        timer1Value: data.timer1Value,
        timer2Value: data.timer2Value
      };
    });
    
    return () => {
      offSync?.();
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById('overlay-root');
    if (root) root.style.background = 'transparent';
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <TimerOverlay timerData={localTimerData} />;
};

export default OverlayApp;