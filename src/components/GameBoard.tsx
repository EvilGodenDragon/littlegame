import React from 'react';
import { Tile as TileType } from '@/types/game';
import Tile from './Tile';

interface GameBoardProps {
  tiles: TileType[];
  onTileClick: (id: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ tiles, onTileClick }) => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-inner overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      <div className="relative w-full h-full">
        {tiles.map(tile => (
          <Tile 
            key={tile.id}
            tile={tile}
            allTiles={tiles}
            onClick={onTileClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
