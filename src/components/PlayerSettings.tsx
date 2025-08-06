// src/components/PlayerSettings.tsx
import React, { useState } from 'react';
import { useTimerStore } from '../store/timerStore';

const PlayerSettings: React.FC = () => {
  const {
    timerData,
    updatePlayerName,
    updatePlayerScore,
    saveToStorage,
  } = useTimerStore();

  const [player1Input, setPlayer1Input] = useState(timerData.player1Name);
  const [player2Input, setPlayer2Input] = useState(timerData.player2Name);

  const handlePlayer1NameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayerName(1, player1Input.trim() || 'PLAYER 1');
    saveToStorage();
  };

  const handlePlayer2NameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayerName(2, player2Input.trim() || 'PLAYER 2');
    saveToStorage();
  };

  const handleScoreChange = (player: 1 | 2, delta: number) => {
    updatePlayerScore(player, delta);
    saveToStorage();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-primary-400 mb-4">
        Player Settings
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Player 1 Name
            </label>
            <form onSubmit={handlePlayer1NameSubmit} className="space-y-2">
              <input
                type="text"
                value={player1Input}
                onChange={(e) => setPlayer1Input(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter player 1 name"
              />
              <button
                type="submit"
                className="w-full py-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Update
              </button>
            </form>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Score: {timerData.player1Score}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleScoreChange(1, -1)}
                  className="flex-1 py-1 px-2 bg-danger-600 hover:bg-danger-700 text-white rounded text-sm font-medium transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={() => handleScoreChange(1, 1)}
                  className="flex-1 py-1 px-2 bg-success-600 hover:bg-success-700 text-white rounded text-sm font-medium transition-colors"
                >
                  +1
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Player 2 Name
            </label>
            <form onSubmit={handlePlayer2NameSubmit} className="space-y-2">
              <input
                type="text"
                value={player2Input}
                onChange={(e) => setPlayer2Input(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter player 2 name"
              />
              <button
                type="submit"
                className="w-full py-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Update
              </button>
            </form>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Score: {timerData.player2Score}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleScoreChange(2, -1)}
                  className="flex-1 py-1 px-2 bg-danger-600 hover:bg-danger-700 text-white rounded text-sm font-medium transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={() => handleScoreChange(2, 1)}
                  className="flex-1 py-1 px-2 bg-success-600 hover:bg-success-700 text-white rounded text-sm font-medium transition-colors"
                >
                  +1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;