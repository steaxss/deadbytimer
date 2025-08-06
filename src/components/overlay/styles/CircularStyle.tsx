import React from 'react';
import Timer from '../Timer';
import PlayerName from '../PlayerName';
import ScoreDisplay from '../ScoreDisplay';

interface CircularStyleProps {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  timer1: string;
  timer2: string;
  currentTimer: 1 | 2;
  isRunning: boolean;
}

const CircularStyle: React.FC<CircularStyleProps> = ({
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
    <div className="w-[420px] h-[160px] relative">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-90 rounded-full border-2 border-gray-700"></div>
      
      <div className="relative flex items-center justify-center h-full">
        <div className="absolute left-8 text-center">
          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 ${
            currentTimer === 1 && isRunning
              ? 'border-primary-400 bg-primary-900 bg-opacity-50'
              : 'border-gray-600 bg-gray-800 bg-opacity-50'
          }`}>
            <Timer 
              value={timer1}
              isActive={currentTimer === 1 && isRunning}
              className="text-sm font-mono"
            />
          </div>
          <PlayerName 
            name={player1Name} 
            isActive={currentTimer === 1 && isRunning}
            className="text-xs"
          />
        </div>

        <div className="text-center">
          <ScoreDisplay 
            player1Score={player1Score}
            player2Score={player2Score}
            className="text-2xl font-bold"
          />
        </div>

        <div className="absolute right-8 text-center">
          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 ${
            currentTimer === 2 && isRunning
              ? 'border-primary-400 bg-primary-900 bg-opacity-50'
              : 'border-gray-600 bg-gray-800 bg-opacity-50'
          }`}>
            <Timer 
              value={timer2}
              isActive={currentTimer === 2 && isRunning}
              className="text-sm font-mono"
            />
          </div>
          <PlayerName 
            name={player2Name} 
            isActive={currentTimer === 2 && isRunning}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default CircularStyle;