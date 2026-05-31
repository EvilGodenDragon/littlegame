import React from 'react';
import { Tile as TileType } from '@/types/game';
import { isTopTile } from '@/utils/gameLogic';

interface TileProps {
  tile: TileType;
  allTiles: TileType[];
  onClick: (id: string) => void;
}

const Tile: React.FC<TileProps> = ({ tile, allTiles, onClick }) => {
  const isTop = isTopTile(tile, allTiles);
  
  const layerColors = [
    'from-blue-100 to-blue-200 border-blue-300',
    'from-green-100 to-green-200 border-green-300',
    'from-yellow-100 to-yellow-200 border-yellow-300'
  ];
  
  if (tile.isRemoved) return null;
  
  return (
    <div
      className={`absolute transition-all duration-300 ${
        isTop 
          ? 'cursor-pointer hover:scale-110 hover:z-50' 
          : 'opacity-70 cursor-not-allowed'
      }`}
      style={{
        left: `${tile.x * 70 + 20}px`,
        top: `${tile.y * 70 + 20}px`,
        zIndex: tile.layer + 10,
      }}
      onClick={() => isTop && onClick(tile.id)}
    >
      <div className={`
        w-14 h-14 rounded-xl bg-gradient-to-br ${layerColors[tile.layer % 3]} 
        border-2 shadow-lg flex items-center justify-center text-3xl
        ${isTop ? 'shadow-xl ring-2 ring-white/50' : ''}
      `}>
        {tile.type}
      </div>
    </div>
  );
};

export default Tile;
