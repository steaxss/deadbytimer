import React from 'react';
import Timer from '../Timer';
import PlayerName from '../PlayerName';
import ScoreDisplay from '../ScoreDisplay';

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
  isRunning,
}) => {
  return (
    <div className="w-[520px] h-[120px] bg-gray-900 bg-opacity-95 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 text-center">
          <PlayerName 
            name={player1Name} 
            isActive={currentTimer === 1 && isRunning}
            className="mb-2"
          />
          <Timer 
            value={timer1}
            isActive={currentTimer === 1 && isRunning}
            className="text-2xl"
          />
        </div>
        
        <div className="px-6">
          <ScoreDisplay 
            player1Score={player1Score}
            player2Score={player2Score}
            className="text-xl font-bold"
          />
        </div>
        
        <div className="flex-1 text-center">
          <PlayerName 
            name={player2Name} 
            isActive={currentTimer === 2 && isRunning}
            className="mb-2"
          />
          <Timer 
            value={timer2}
            isActive={currentTimer === 2 && isRunning}
            className="text-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultStyle;