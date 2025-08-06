import React from 'react';
import Timer from '../Timer';
import ScoreDisplay from '../ScoreDisplay';

interface MinimalStyleProps {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1: string;
  timer2: string;
  currentTimer: 1 | 2;
  isRunning: boolean;
}

const MinimalStyle: React.FC<MinimalStyleProps> = ({
  player1Name,
  player2Name,
  player1Score,
  player2Score,
  timer1,
  timer2,
  currentTimer,
  isRunning,
}) => {
  return (
    <div className="w-[400px] h-[110px] bg-black bg-opacity-80 border border-gray-800 rounded p-3">
      <div className="flex items-center justify-between h-full">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">
            {player1Name.slice(0, 8)}
          </div>
          <Timer 
            value={timer1}
            isActive={currentTimer === 1 && isRunning}
            className="text-xl font-mono"
          />
        </div>
        
        <div className="px-4">
          <ScoreDisplay 
            player1Score={player1Score}
            player2Score={player2Score}
            className="text-lg font-semibold"
          />
        </div>
        
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">
            {player2Name.slice(0, 8)}
          </div>
          <Timer 
            value={timer2}
            isActive={currentTimer === 2 && isRunning}
            className="text-xl font-mono"
          />
        </div>
      </div>
    </div>
  );
};

export default MinimalStyle;