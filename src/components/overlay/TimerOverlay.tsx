import React from 'react';
import { formatTime } from '../../utils/timer';
import type { TimerData, TimerStyle } from '../../types';
import DefaultStyle from './styles/DefaultStyle';
import MinimalStyle from './styles/MinimalStyle';
import CircularStyle from './styles/CircularStyle';
import NostalgiaStyle from './styles/NostalgiaStyle';

interface TimerOverlayProps {
  timerData: TimerData;
  style: TimerStyle;
  isActive: boolean;
}

const TimerOverlay: React.FC<TimerOverlayProps> = ({ timerData, style, isActive }) => {
  const timer1Display = formatTime(timerData.timer1Value);
  const timer2Display = formatTime(timerData.timer2Value);
  
  const overlayData = {
    player1Name: timerData.player1Name,
    player2Name: timerData.player2Name,
    player1Score: timerData.player1Score,
    player2Score: timerData.player2Score,
    timer1: timer1Display,
    timer2: timer2Display,
    currentTimer: timerData.currentTimer,
    isRunning: isActive,
  };

  switch (style) {
    case 'minimal':
      return <MinimalStyle {...overlayData} />;
    case 'circular':
      return <CircularStyle {...overlayData} />;
    case 'nostalgia':
      return <NostalgiaStyle {...overlayData} />;
    case 'default':
    default:
      return <DefaultStyle {...overlayData} />;
  }
};

export default TimerOverlay;