import React from 'react';
import { GameState, LEVEL_NAMES } from '@/types/game';

interface StatusBarProps {
  gameState: GameState;
}

const StatusBar: React.FC<StatusBarProps> = ({ gameState }) => {
  const hpPercentage = gameState.player.hp / gameState.player.maxHp;

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 px-4 py-2 rounded-xl shadow-lg border border-purple-500">
        <span className="text-xl">🏆</span>
        <div className="flex flex-col">
          <span className="text-white text-sm">{LEVEL_NAMES[gameState.player.level]}</span>
          <span className="text-yellow-400 font-bold">{gameState.player.points}积分</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-gradient-to-r from-red-900/90 to-orange-900/90 px-4 py-2 rounded-xl shadow-lg border border-red-500">
        <span className="text-xl">❤️</span>
        <div className="w-32 h-4 bg-gray-800 rounded-full overflow-hidden border border-red-400">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
            style={{ width: `${Math.max(0, hpPercentage * 100)}%` }}
          />
        </div>
        <span className="text-white text-sm font-bold">{gameState.player.hp}/{gameState.player.maxHp}</span>
      </div>
    </div>
  );
};

export default StatusBar;
