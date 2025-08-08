import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../../store/timerStore';
import DragHandle from './DragHandle';
import { formatTime } from '../../utils/timer';
import type { TimerData } from '../../types';

interface TimerOverlayProps {
  timerData?: TimerData;
}

function parseTimeForDisplay(timeString: string) {
  const [main, centis = '00'] = timeString.split('.');
  const parts = main.split(':');
  const hasHours = parts.length === 3;
  const hasMinutes = parts.length >= 2;
  
  if (hasHours) {
    return {
      hasHours: true,
      hours: parts[0].padStart(2, '0'),
      minutes: parts[1].padStart(2, '0'),
      seconds: parts[2].padStart(2, '0'),
      centis: centis.padStart(2, '0')
    };
  } else if (hasMinutes) {
    return {
      hasHours: false,
      hasMinutes: true,
      minutes: parts[0],
      seconds: parts[1].padStart(2, '0'),
      centis: centis.padStart(2, '0')
    };
  } else {
    return {
      hasHours: false,
      hasMinutes: false,
      seconds: main.padStart(2, '0'),
      centis: centis.padStart(2, '0')
    };
  }
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

  const t1 = parseTimeForDisplay(formattedTime1);
  const t2 = parseTimeForDisplay(formattedTime2);

  const scaleFactor = overlaySettings.scale / 100;
  const dragHandleHeight = overlaySettings.locked ? 0 : 30;

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
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif'
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
        <div className="timer-overlay" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(160px, 1fr) auto minmax(160px, 1fr)',
          gridTemplateRows: '50px 1fr',
          width: '520px',
          height: '120px',
          position: 'relative'
        }}>
          <div className="name left" style={{
            gridRow: 1,
            gridColumn: 1,
            borderBottom: '1px solid rgba(255,255,255,0.32)',
            background: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 500,
            color: '#FFF',
            textTransform: 'uppercase',
            textShadow: '0 0 6px rgba(255,255,255,0.50)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <span style={{ 
              whiteSpace: 'nowrap', 
              padding: '0 15px',
              display: 'inline-block'
            }}>
              {timerData.player1Name}
            </span>
          </div>

          <div className="score-value" style={{
            gridRow: 1,
            gridColumn: 2,
            borderBottom: '1px solid rgba(255,255,255,0.32)',
            background: 'linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 500,
            color: '#FFF',
            padding: '0 15px',
            textTransform: 'uppercase',
            minWidth: '90px',
            maxWidth: '120px'
          }}>
            {timerData.player1Score} – {timerData.player2Score}
          </div>

          <div className="name right" style={{
            gridRow: 1,
            gridColumn: 3,
            borderBottom: '1px solid rgba(255,255,255,0.32)',
            background: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 500,
            color: '#FFF',
            textTransform: 'uppercase',
            textShadow: '0 0 6px rgba(255,255,255,0.50)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <span style={{ 
              whiteSpace: 'nowrap', 
              padding: '0 15px',
              display: 'inline-block'
            }}>
              {timerData.player2Name}
            </span>
          </div>

          <div className={`timer left ${timerData.selectedTimer === 1 ? 'active' : ''}`} style={{
            gridRow: 2,
            gridColumn: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '32px',
            fontWeight: 400,
            textShadow: '0 0 6px rgba(190,190,190,0.50)',
            position: 'relative',
            height: '100%',
            textAlign: 'center',
            minWidth: '160px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t1.hasHours && (
                <>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.hours}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.minutes}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                </>
              )}
              {t1.hasMinutes && !t1.hasHours && (
                <>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.minutes}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                </>
              )}
              <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t1.seconds}</span>
              <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>.</span>
              <span style={{ display: 'inline-block', width: '18px', textAlign: 'center', fontSize: '28px' }}>{t1.centis}</span>
            </span>
            {timerData.selectedTimer === 1 && (
              <div style={{
                content: '',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%)',
                animation: 'pulseBar 1.5s ease-in-out infinite'
              }} />
            )}
          </div>

          <div className={`timer right ${timerData.selectedTimer === 2 ? 'active' : ''}`} style={{
            gridRow: 2,
            gridColumn: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '32px',
            fontWeight: 400,
            textShadow: '0 0 6px rgba(190,190,190,0.50)',
            position: 'relative',
            height: '100%',
            textAlign: 'center',
            minWidth: '160px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t2.hasHours && (
                <>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.hours}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.minutes}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                </>
              )}
              {t2.hasMinutes && !t2.hasHours && (
                <>
                  <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.minutes}</span>
                  <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>:</span>
                </>
              )}
              <span style={{ display: 'inline-block', width: '22px', textAlign: 'center' }}>{t2.seconds}</span>
              <span style={{ display: 'inline-block', width: '11px', textAlign: 'center' }}>.</span>
              <span style={{ display: 'inline-block', width: '18px', textAlign: 'center', fontSize: '28px' }}>{t2.centis}</span>
            </span>
            {timerData.selectedTimer === 2 && (
              <div style={{
                content: '',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #B579FF 0%, #5AC8FF 50%, #44FF41 100%)',
                animation: 'pulseBar 1.5s ease-in-out infinite'
              }} />
            )}
          </div>
        </div>

        <style>
          {`
            @keyframes pulseBar {
              0%, 100% { 
                opacity: 0.8;
                transform: scaleY(1);
              }
              50% { 
                opacity: 1;
                transform: scaleY(1.5);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default TimerOverlay;