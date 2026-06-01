import React from 'react';
import { GameState } from '@/types/game';
import Player from './Player';
import Monster from './Monster';
import Item from './Item';

interface GameCanvasProps {
  gameState: GameState;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState }) => {
  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-4 border-purple-600/50"
      style={{ height: '600px', maxWidth: '800px' }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      
      <div className="absolute inset-2 rounded-xl border border-purple-500/30 pointer-events-none" />
      
      <div className="relative w-full h-full">
        {gameState.items.map(item => (
          <Item key={item.id} item={item} />
        ))}
        
        {gameState.monsters.map(monster => (
          <Monster key={monster.id} monster={monster} />
        ))}
        
        {!gameState.isGameOver && (
          <Player player={gameState.player} />
        )}
      </div>
      
      {(gameState.isGameOver || gameState.isVictory) && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className={`text-center p-8 rounded-2xl ${gameState.isVictory ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-red-500 to-pink-600'} text-white shadow-2xl`}>
            <h2 className="text-4xl font-bold mb-4">
              {gameState.isVictory ? '🎉 恭喜通关！' : '💀 游戏结束'}
            </h2>
            <p className="text-xl mb-2">
              {gameState.isVictory ? '你成为仙帝！' : '再接再厉！'}
            </p>
            <p className="text-lg">最终积分: {gameState.player.points}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
