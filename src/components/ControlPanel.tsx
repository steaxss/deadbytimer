import React, { useEffect, useState } from 'react';
import { useTimerStore } from '../store/timerStore';
import TimerControls from './TimerControls';
import PlayerSettings from './PlayerSettings';
import OverlaySettings from './OverlaySettings';
import HotkeySettings from './HotkeySettings';

const ControlPanel: React.FC = () => {
  const {
    timerData,
    overlaySettings,
    isOverlayVisible,
    setOverlayVisible,
    setOverlaySettings,
    saveToStorage,
  } = useTimerStore();

  const [activeTab, setActiveTab] = useState<'timer' | 'players' | 'overlay' | 'hotkeys'>('timer');

  useEffect(() => {
    const interval = setInterval(() => {
      saveToStorage();
    }, 5000);

    return () => clearInterval(interval);
  }, [saveToStorage]);

  const handleLockToggle = () => {
    setOverlaySettings({ locked: !overlaySettings.locked });
  };

  const tabs = [
    { id: 'timer' as const, name: 'Timer Controls', icon: '⏱️' },
    { id: 'players' as const, name: 'Players', icon: '👥' },
    { id: 'overlay' as const, name: 'Overlay', icon: '🎨' },
    { id: 'hotkeys' as const, name: 'Hotkeys', icon: '⌨️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timer':
        return <TimerControls />;
      case 'players':
        return <PlayerSettings />;
      case 'overlay':
        return <OverlaySettings />;
      case 'hotkeys':
        return <HotkeySettings />;
      default:
        return <TimerControls />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white border-b-2 border-primary-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Current Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Active Timer</span>
                <span className={`font-bold ${
                  timerData.currentTimer === 1 ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {timerData.currentTimer === 1 ? timerData.player1Name : timerData.player2Name}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Timer Status</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    timerData.isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                  }`} />
                  <span className={`font-medium ${
                    timerData.isRunning ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {timerData.isRunning ? 'Running' : 'Stopped'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Overlay</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isOverlayVisible ? 'bg-green-400' : 'bg-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    isOverlayVisible ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {isOverlayVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Position Lock</span>
                <span className={`font-medium ${
                  overlaySettings.locked ? 'text-red-400' : 'text-green-400'
                }`}>
                  {overlaySettings.locked ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Scores
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">{timerData.player1Name}</span>
                <span className="text-lg font-bold text-green-400">
                  {timerData.player1Score}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">{timerData.player2Name}</span>
                <span className="text-lg font-bold text-blue-400">
                  {timerData.player2Score}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🔧</span>
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setOverlayVisible(!isOverlayVisible)}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isOverlayVisible
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {isOverlayVisible ? '👁️ Hide Overlay' : '👁️ Show Overlay'}
              </button>

              <button
                onClick={handleLockToggle}
                disabled={!isOverlayVisible}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  !isOverlayVisible
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : overlaySettings.locked
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {overlaySettings.locked ? '🔒 Unlock Position' : '🔓 Lock Position'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;