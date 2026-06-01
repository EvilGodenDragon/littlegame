import React from 'react';
import { Player as PlayerType } from '@/types/game';

interface PlayerProps {
  player: PlayerType;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div
      className="absolute transition-all duration-75 ease-out"
      style={{
        left: player.x - 25,
        top: player.y - 25,
        zIndex: 100,
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
        <div className="relative w-12 h-12 flex items-center justify-center text-4xl bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full shadow-lg border-2 border-yellow-400">
          {player.emoji}
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs font-bold text-purple-900 px-2 py-0.5 rounded-full whitespace-nowrap">
          Lv.{player.level + 1}
        </div>
      </div>
    </div>
  );
};

export default Player;
