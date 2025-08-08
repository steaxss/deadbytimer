import React, { useMemo } from 'react';
import { cn } from '@/utils/cn';

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

function parseChars(s: string) {
  const [main, centis = '00'] = s.split('.');
  const parts = main.split(':');
  const hasHours = parts.length === 3;
  const hasMinutes = parts.length >= 2;
  const [h, m, sec] = hasHours ? parts : hasMinutes ? ['0', parts[0], parts[1]] : ['0', '0', parts[0]];
  const seconds = sec ?? '0';
  const singleDigitSeconds = seconds.length === 1;
  return {
    hasHours,
    hasMinutes,
    hours: hasHours ? h : undefined,
    minutes: hasMinutes ? (hasHours ? m : parts[0]) : undefined,
    seconds1: seconds[0],
    seconds2: seconds.length > 1 ? seconds[1] : undefined,
    dot: '.',
    colon: ':',
    colon1: ':',
    colon2: ':',
    centis1: centis[0] ?? '0',
    centis2: centis[1] ?? '0',
    singleDigitSeconds,
  };
}

const DefaultStyle: React.FC<DefaultStyleProps> = ({
  player1Name,
  player2Name,
  player1Score,
  player2Score,
  timer1,
  timer2,
  currentTimer,
}) => {
  const t1 = useMemo(() => parseChars(timer1), [timer1]);
  const t2 = useMemo(() => parseChars(timer2), [timer2]);

  return (
    <div className="overlay default-style">
      <div className="header">
        <div className="name left">
          <span className="scrolling-text">{player1Name}</span>
        </div>
        <div className="score">{player1Score} - {player2Score}</div>
        <div className="name right">
          <span className="scrolling-text">{player2Name}</span>
        </div>
      </div>

      <div className="timers">
        <div className={cn('timer left', currentTimer === 1 && 'active')}>
          <span className="timer-text">
            {t1.hasHours && (
              <>
                <span className="timer-char">{t1.hours}</span>
                <span className="timer-char separator">{t1.colon1}</span>
                <span className="timer-char">{t1.minutes}</span>
                <span className="timer-char separator">{t1.colon2}</span>
              </>
            )}
            {t1.hasMinutes && !t1.hasHours && (
              <>
                <span className="timer-char">{t1.minutes}</span>
                <span className="timer-char separator">{t1.colon}</span>
              </>
            )}
            <span className="timer-char">{t1.seconds1}</span>
            {!t1.singleDigitSeconds && t1.seconds2 && (
              <span className="timer-char">{t1.seconds2}</span>
            )}
            <span className="timer-char separator">{t1.dot}</span>
            <span className="timer-char centis">{t1.centis1}</span>
            <span className="timer-char centis">{t1.centis2}</span>
          </span>
        </div>

        <div className={cn('timer right', currentTimer === 2 && 'active')}>
          <span className="timer-text">
            {t2.hasHours && (
              <>
                <span className="timer-char">{t2.hours}</span>
                <span className="timer-char separator">{t2.colon1}</span>
                <span className="timer-char">{t2.minutes}</span>
                <span className="timer-char separator">{t2.colon2}</span>
              </>
            )}
            {t2.hasMinutes && !t2.hasHours && (
              <>
                <span className="timer-char">{t2.minutes}</span>
                <span className="timer-char separator">{t2.colon}</span>
              </>
            )}
            <span className="timer-char">{t2.seconds1}</span>
            {!t2.singleDigitSeconds && t2.seconds2 && (
              <span className="timer-char">{t2.seconds2}</span>
            )}
            <span className="timer-char separator">{t2.dot}</span>
            <span className="timer-char centis">{t2.centis1}</span>
            <span className="timer-char centis">{t2.centis2}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DefaultStyle;