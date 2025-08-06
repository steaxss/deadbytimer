import React from 'react';
import { cn } from '../../utils/cn';

interface TimerProps {
  value: string;
  isActive: boolean;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ value, isActive, className }) => {
  return (
    <div
      className={cn(
        'font-mono font-bold transition-all duration-200',
        isActive 
          ? 'text-primary-400 timer-glow animate-pulse' 
          : 'text-white',
        className
      )}
    >
      {value}
    </div>
  );
};

export default Timer;