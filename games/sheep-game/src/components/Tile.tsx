import React, { useState } from 'react';
import { Tile as TileType } from '@/types/game';
import { isTopTile } from '@/utils/gameLogic';

interface TileProps {
  tile: TileType;
  allTiles: TileType[];
  onClick: (id: string) => void;
}

const Tile: React.FC<TileProps> = ({ tile, allTiles, onClick }) => {
  const isTop = isTopTile(tile, allTiles);
  const [isClicked, setIsClicked] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const layerColors = [
    'from-pink-200 via-purple-100 to-blue-200 border-pink-400',
    'from-green-200 via-teal-100 to-cyan-200 border-green-400',
    'from-yellow-200 via-orange-100 to-pink-200 border-yellow-400'
  ];
  
  const handleClick = () => {
    if (!isTop) return;
    setIsClicked(true);
    setShowSparkles(true);
    setTimeout(() => {
      setIsClicked(false);
      setShowSparkles(false);
      onClick(tile.id);
    }, 500);
  };
  
  if (tile.isRemoved) return null;
  
  return (
    <div
      className={`absolute transition-all duration-300 ${
        isTop 
          ? 'cursor-pointer hover:z-50' 
          : 'opacity-70 cursor-not-allowed'
      }`}
      style={{
        left: `${tile.x * 68 + 10}px`,
        top: `${tile.y * 68 + 10}px`,
        zIndex: tile.layer + 10,
      }}
      onClick={handleClick}
      onMouseEnter={() => isTop && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 闪光粒子效果 */}
      {showSparkles && isTop && (
        <>
          <div className="absolute -top-3 -left-3 w-5 h-5 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-sparkle" style={{ animationDelay: '0ms' }}></div>
          <div className="absolute -top-2 -right-4 w-4 h-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-sparkle" style={{ animationDelay: '80ms' }}></div>
          <div className="absolute -bottom-3 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full animate-sparkle" style={{ animationDelay: '160ms' }}></div>
          <div className="absolute -bottom-2 -right-3 w-5 h-5 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-sparkle" style={{ animationDelay: '40ms' }}></div>
          <div className="absolute top-1/2 -left-4 w-3 h-3 bg-gradient-to-r from-yellow-200 to-white rounded-full animate-sparkle" style={{ animationDelay: '120ms' }}></div>
          <div className="absolute top-1/2 -right-4 w-3 h-3 bg-gradient-to-r from-white to-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '200ms' }}></div>
        </>
      )}
      
      <div className={`
        w-14 h-14 rounded-3xl bg-gradient-to-br ${layerColors[tile.layer % 3]} 
        border-4 shadow-xl flex items-center justify-center text-3xl
        ${isTop ? 'shadow-2xl ring-4 ring-white/70' : ''}
        ${isClicked ? 'animate-pudding' : ''}
        ${isHovered && isTop ? 'animate-wiggle' : ''}
        transition-all duration-200
        relative overflow-hidden
      `}>
        {/* 光泽效果 */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-t-3xl"></div>
        
        {/* 高光点 */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-90 blur-[1px]"></div>
        <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-70"></div>
        
        {/* 方块内容 */}
        <span className={`
          relative z-10 
          ${isClicked ? 'scale-130 rotate-12' : ''} 
          ${isHovered && isTop ? 'scale-110' : ''}
          transition-all duration-200
        `}>
          {tile.type}
        </span>
      </div>
    </div>
  );
};

export default Tile;
