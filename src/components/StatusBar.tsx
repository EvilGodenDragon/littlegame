import React from 'react';
import { GameState } from '@/types/game';

interface StatusBarProps {
  state: GameState;
}

const StatusBar: React.FC<StatusBarProps> = ({ state }) => {
  const remainingTiles = state.tiles.filter(t => !t.isRemoved).length;
  
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-2xl shadow-lg border-2 border-green-300">
        <span className="text-xl">✨</span>
        <span className="text-gray-700 font-bold text-lg">已消除:</span>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">{state.eliminatedPairs}</span>
      </div>
      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-pink-100 px-6 py-3 rounded-2xl shadow-lg border-2 border-orange-300">
        <span className="text-xl">🎯</span>
        <span className="text-gray-700 font-bold text-lg">剩余:</span>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">{remainingTiles}</span>
      </div>
    </div>
  );
};

export default StatusBar;
