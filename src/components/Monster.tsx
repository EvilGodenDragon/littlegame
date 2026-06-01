import React from 'react';
import { Monster as MonsterType } from '@/types/game';

interface MonsterProps {
  monster: MonsterType;
}

const Monster: React.FC<MonsterProps> = ({ monster }) => {
  if (!monster.isAlive) return null;
  
  const size = Math.min(40 + monster.level * 5, 60);

  return (
    <div
      className="absolute transition-all duration-100"
      style={{
        left: monster.x - size/2,
        top: monster.y - size/2,
        zIndex: monster.level,
      }}
    >
      <div 
        className={`${monster.level < 2 ? 'bg-red-500/20' : monster.level < 4 ? 'bg-orange-500/20' : 'bg-red-600/30'} absolute inset-0 rounded-full blur-md animate-pulse`} 
        style={{animationDelay: `${monster.level * 0.2}s`}} 
      />
      <div 
        className={`relative flex items-center justify-center rounded-full border-2 shadow-lg ${
          monster.level === 0 ? 'bg-gray-200 border-gray-400' :
          monster.level === 1 ? 'bg-blue-200 border-blue-400' :
          monster.level === 2 ? 'bg-green-200 border-green-400' :
          monster.level === 3 ? 'bg-yellow-200 border-yellow-400' :
          'bg-red-200 border-red-400'
        }`}
        style={{ width: size, height: size, fontSize: Math.max(24, size - 8) + 'px' }}
      >
        {monster.emoji}
      </div>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-1 rounded whitespace-nowrap">
          Lv.{monster.level + 1}
        </div>
    </div>
  );
};

export default Monster;
