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
    // Handle HH:MM:SS.HH format
    if (timeStr.includes(':') && timeStr.split(':').length === 3) {
      const [hoursPart, minutesPart, secondsCentiseconds] = timeStr.split(':');
      const [secondsPart, centiseconds] = secondsCentiseconds.split('.');
      
      return {
        hours: hoursPart || '00',
        colon1: ':',
        minutes: minutesPart || '00',
        colon2: ':',
        seconds1: secondsPart?.[0] || '0',
        seconds2: secondsPart?.[1] || '0',
        dot: '.',
        centis1: centiseconds?.[0] || '0',
        centis2: centiseconds?.[1] || '0',
        hasHours: true,
        hasMinutes: true
      };
    }
    // Handle M:SS.HH format
    else if (timeStr.includes(':') && timeStr.split(':').length === 2) {
      const [minutesPart, secondsCentiseconds] = timeStr.split(':');
      const [secondsPart, centiseconds] = secondsCentiseconds.split('.');
      
      return {
        minutes: minutesPart || '0',
        colon: ':',
        seconds1: secondsPart?.[0] || '0',
        seconds2: secondsPart?.[1] || '0',
        dot: '.',
        centis1: centiseconds?.[0] || '0',
        centis2: centiseconds?.[1] || '0',
        hasHours: false,
        hasMinutes: true
      };
    } 
    // Handle SS.HH format
    else {
      const [secondsPart, centiseconds] = timeStr.split('.');
      
      return {
        seconds1: secondsPart?.[0] || '0',
        seconds2: secondsPart?.[1] || '0',
        dot: '.',
        centis1: centiseconds?.[0] || '0',
        centis2: centiseconds?.[1] || '0',
        hasHours: false,
        hasMinutes: false
      };
    }
  };

  const timer1Chars = formatTimerChars(timer1 || '0.00');
  const timer2Chars = formatTimerChars(timer2 || '0.00');

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
      
      <div className={cn(
        "timer left",
        currentTimer === 1 && "active"
      )}>
        <span className="timer-text">
          {timer1Chars.hasHours && (
            <>
              <span className="timer-char">{timer1Chars.hours}</span>
              <span className="timer-char separator">{timer1Chars.colon1}</span>
              <span className="timer-char">{timer1Chars.minutes}</span>
              <span className="timer-char separator">{timer1Chars.colon2}</span>
            </>
          )}
          {timer1Chars.hasMinutes && !timer1Chars.hasHours && (
            <>
              <span className="timer-char">{timer1Chars.minutes}</span>
              <span className="timer-char separator">{timer1Chars.colon}</span>
            </>
          )}
          <span className="timer-char">{timer1Chars.seconds1}</span>
          <span className="timer-char">{timer1Chars.seconds2}</span>
          <span className="timer-char separator">{timer1Chars.dot}</span>
          <span className="timer-char centis">{timer1Chars.centis1}</span>
          <span className="timer-char centis">{timer1Chars.centis2}</span>
        </span>
      </div>
      
      <div className={cn(
        "timer right",
        currentTimer === 2 && "active"
      )}>
        <span className="timer-text">
          {timer2Chars.hasHours && (
            <>
              <span className="timer-char">{timer2Chars.hours}</span>
              <span className="timer-char separator">{timer2Chars.colon1}</span>
              <span className="timer-char">{timer2Chars.minutes}</span>
              <span className="timer-char separator">{timer2Chars.colon2}</span>
            </>
          )}
          {timer2Chars.hasMinutes && !timer2Chars.hasHours && (
            <>
              <span className="timer-char">{timer2Chars.minutes}</span>
              <span className="timer-char separator">{timer2Chars.colon}</span>
            </>
          )}
          <span className="timer-char">{timer2Chars.seconds1}</span>
          <span className="timer-char">{timer2Chars.seconds2}</span>
          <span className="timer-char separator">{timer2Chars.dot}</span>
          <span className="timer-char centis">{timer2Chars.centis1}</span>
          <span className="timer-char centis">{timer2Chars.centis2}</span>
        </span>
      </div>
    </div>
  );
};

export default DefaultStyle;