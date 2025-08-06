import React from 'react';
import { cn } from '../../utils/cn';

interface ScoreDisplayProps {
  player1Score: number;
  player2Score: number;
  className?: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ player1Score, player2Score, className }) => {
  return (
    <div className={cn('text-white font-bold', className)}>
      <span className={player1Score > player2Score ? 'text-success-400' : ''}>
        {player1Score}
      </span>
      <span className="mx-2 text-gray-400">-</span>
      <span className={player2Score > player1Score ? 'text-success-400' : ''}>
        {player2Score}
      </span>
    </div>
  );
};

export default ScoreDisplay;