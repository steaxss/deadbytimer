import React from 'react';
import Timer from '../Timer';
import ScoreDisplay from '../ScoreDisplay';

interface NostalgiaStyleProps {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1: string;
  timer2: string;
  currentTimer: 1 | 2;
  isRunning: boolean;
}

const NostalgiaStyle: React.FC<NostalgiaStyleProps> = ({
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
    <div className="w-[360px] h-[80px] bg-black border border-green-500 font-mono p-2">
      <div className="flex items-center justify-between h-full text-green-400">
        <div className="text-center">
          <div className="text-xs mb-1">
            {player1Name.slice(0, 6).toUpperCase()}
          </div>
          <Timer 
            value={timer1}
            isActive={currentTimer === 1 && isRunning}
            className={`text-lg ${currentTimer === 1 && isRunning ? 'text-green-300' : 'text-green-600'}`}
          />
        </div>
        
        <div className="px-3">
          <ScoreDisplay 
            player1Score={player1Score}
            player2Score={player2Score}
            className="text-lg font-bold text-green-400"
          />
        </div>
        
        <div className="text-center">
          <div className="text-xs mb-1">
            {player2Name.slice(0, 6).toUpperCase()}
          </div>
          <Timer 
            value={timer2}
            isActive={currentTimer === 2 && isRunning}
            className={`text-lg ${currentTimer === 2 && isRunning ? 'text-green-300' : 'text-green-600'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default NostalgiaStyle;