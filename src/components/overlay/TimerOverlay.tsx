import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../../store/timerStore';
import DragHandle from './DragHandle';
import DefaultStyle from './styles/DefaultStyle';
import { formatTime } from '../../utils/timer';
import type { TimerData } from '../../types';

interface TimerOverlayProps {
  timerData?: TimerData;
}

const TimerOverlay: React.FC<TimerOverlayProps> = ({ timerData: propTimerData }) => {
  const { timerData: storeTimerData, overlaySettings } = useTimerStore();
  const [formattedTime1, setFormattedTime1] = useState('0.00');
  const [formattedTime2, setFormattedTime2] = useState('0.00');

  const timerData = propTimerData || storeTimerData;

  useEffect(() => {
    setFormattedTime1(formatTime(timerData.timer1Value || 0));
    setFormattedTime2(formatTime(timerData.timer2Value || 0));
  }, [timerData.timer1Value, timerData.timer2Value]);

  const scaleFactor = overlaySettings.scale / 100;
  const dragHandleHeight = overlaySettings.locked ? 0 : 30;

  console.log('TimerOverlay render:', {
    currentTimer: timerData.currentTimer,
    isRunning: timerData.isRunning,
    timer1Value: timerData.timer1Value,
    timer2Value: timerData.timer2Value,
    formattedTime1,
    formattedTime2
  });

  return (
    <div
      style={{
        width: '520px',
        height: `${120 + dragHandleHeight}px`,
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top left',
        background: 'transparent',
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <DragHandle 
        isVisible={!overlaySettings.locked} 
        className={overlaySettings.locked ? 'opacity-0 pointer-events-none h-0' : ''}
      />
      
      <div 
        style={{
          width: '520px',
          height: '120px',
          position: 'absolute',
          top: overlaySettings.locked ? '0px' : '30px',
          left: '0px',
          pointerEvents: overlaySettings.locked ? 'none' : 'auto',
          background: 'transparent',
          margin: 0,
          padding: 0
        }}
      >
        <DefaultStyle
          player1Name={timerData.player1Name}
          player2Name={timerData.player2Name}
          player1Score={timerData.player1Score}
          player2Score={timerData.player2Score}
          timer1={formattedTime1}
          timer2={formattedTime2}
          currentTimer={timerData.currentTimer}
          isRunning={timerData.isRunning}
        />
      </div>
    </div>
  );
};

export default TimerOverlay;