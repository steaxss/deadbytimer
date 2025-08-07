import React from 'react';
import { useTimerStore } from '../../store/timerStore';
import DragHandle from './DragHandle';
import DefaultStyle from './styles/DefaultStyle';
import useTimer from '../../hooks/useTimer';

const TimerOverlay: React.FC = () => {
  const { timerData, overlaySettings } = useTimerStore();
  const { formattedTime1, formattedTime2 } = useTimer();

  const scaleFactor = overlaySettings.scale / 100;

  return (
    <div
      style={{
        width: '520px',
        height: overlaySettings.locked ? '120px' : '150px',
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
      <DragHandle isVisible={!overlaySettings.locked} />
      
      <div 
        style={{
          width: '520px',
          height: '120px',
          position: overlaySettings.locked ? 'static' : 'absolute',
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