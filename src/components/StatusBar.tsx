import React from 'react';
import { GameState } from '@/types/game';

interface StatusBarProps {
  state: GameState;
}

const StatusBar: React.FC<StatusBarProps> = ({ state }) => {
  const remainingTiles = state.tiles.filter(t => !t.isRemoved).length;
  
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
        <span className="text-gray-600 font-medium">已消除:</span>
        <span className="text-2xl font-bold text-green-500">{state.eliminatedPairs}</span>
      </div>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
        <span className="text-gray-600 font-medium">剩余:</span>
        <span className="text-2xl font-bold text-orange-500">{remainingTiles}</span>
      </div>
    </div>
  );
};

export default StatusBar;
