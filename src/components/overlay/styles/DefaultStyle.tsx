// src/components/overlay/styles/DefaultStyle.tsx
import React, { useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';

interface DefaultStyleProps {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1: string;
  timer2: string;
  currentTimer: 1 | 2;
  isRunning: boolean;
}

const DefaultStyle: React.FC<DefaultStyleProps> = ({
  player1Name,
  player2Name,
  player1Score,
  player2Score,
  timer1,
  timer2,
  currentTimer,
  isRunning
}) => {
  const [player1Scrolling, setPlayer1Scrolling] = useState(false);
  const [player2Scrolling, setPlayer2Scrolling] = useState(false);

  useEffect(() => {
    setPlayer1Scrolling(player1Name.length > 12);
    setPlayer2Scrolling(player2Name.length > 12);
  }, [player1Name, player2Name]);

  const formatTimerChars = (timeStr: string) => {
    const chars = timeStr.padStart(6, '0').split('');
    return {
      minutes: chars[0] || '0',
      colon: ':',
      seconds1: chars[2] || '0',
      seconds2: chars[3] || '0',
      dot: '.',
      tenths: chars[5] || '0'
    };
  };

  const timer1Chars = formatTimerChars(timer1);
  const timer2Chars = formatTimerChars(timer2);

  return (
    <div className="timer-overlay">
      <div className="name left">
        <span className={cn("name-scroll", player1Scrolling && "scrolling")}>
          {player1Name.toUpperCase()}
        </span>
      </div>
      
      <div className="score-value">
        {player1Score} – {player2Score}
      </div>
      
      <div className="name right">
        <span className={cn("name-scroll", player2Scrolling && "scrolling")}>
          {player2Name.toUpperCase()}
        </span>
      </div>
      
      <div className={cn("timer left", currentTimer === 1 && "active")}>
        <span className="timer-text">
          <span className="timer-char">{timer1Chars.minutes}</span>
          <span className="timer-char separator">{timer1Chars.colon}</span>
          <span className="timer-char">{timer1Chars.seconds1}</span>
          <span className="timer-char">{timer1Chars.seconds2}</span>
          <span className="timer-char separator">{timer1Chars.dot}</span>
          <span className="timer-char">{timer1Chars.tenths}</span>
        </span>
      </div>
      
      <div className={cn("timer right", currentTimer === 2 && "active")}>
        <span className="timer-text">
          <span className="timer-char">{timer2Chars.minutes}</span>
          <span className="timer-char separator">{timer2Chars.colon}</span>
          <span className="timer-char">{timer2Chars.seconds1}</span>
          <span className="timer-char">{timer2Chars.seconds2}</span>
          <span className="timer-char separator">{timer2Chars.dot}</span>
          <span className="timer-char">{timer2Chars.tenths}</span>
        </span>
      </div>
    </div>
  );
};

export default DefaultStyle;