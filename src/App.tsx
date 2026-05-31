import React, { useState, useEffect } from 'react';
import { GameState } from './types/game';
import { initGame, handleTileClick } from './utils/gameLogic';
import GameBoard from './components/GameBoard';
import SlotBar from './components/SlotBar';
import StatusBar from './components/StatusBar';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => initGame());

  const onTileClick = (id: string) => {
    setGameState(prev => handleTileClick(prev, id));
  };

  const restartGame = () => {
    setGameState(initGame());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
            🐑 羊了个羊
          </h1>
          <p className="text-gray-600">点击方块收集，凑齐3个相同的自动消除！</p>
        </div>

        {/* 游戏容器 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-6">
          {/* 状态栏 */}
          <StatusBar state={gameState} />

          {/* 游戏面板 */}
          <GameBoard tiles={gameState.tiles} onTileClick={onTileClick} />

          {/* 槽位栏 */}
          <SlotBar slot={gameState.slot} />

          {/* 游戏结束/胜利提示 */}
          {(gameState.isGameOver || gameState.isVictory) && (
            <div className={`
              text-center p-6 rounded-2xl ${
                gameState.isVictory 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400' 
                  : 'bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-400'
              }
            `}>
              <h2 className="text-2xl font-bold mb-2">
                {gameState.isVictory ? '🎉 恭喜通关！' : '😢 游戏结束'}
              </h2>
              <p className="text-gray-700 mb-4">
                {gameState.isVictory 
                  ? '你太厉害了，消除了所有方块！' 
                  : '槽位已满，再试一次吧！'}
              </p>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex justify-center">
            <button
              onClick={restartGame}
              className="
                px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
                text-white font-bold rounded-xl shadow-lg 
                hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 
                transform hover:scale-105 transition-all duration-300
              "
            >
              {gameState.isGameOver || gameState.isVictory ? '再来一局' : '重新开始'}
            </button>
          </div>
        </div>

        {/* 规则说明 */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-sm text-gray-600">
          <h3 className="font-bold text-gray-700 mb-2">📖 游戏规则：</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>点击顶层（亮着的）方块将其放入槽位</li>
            <li>槽位中凑齐3个相同的方块会自动消除</li>
            <li>槽位最多容纳7个方块，满了就失败</li>
            <li>消除所有方块即可通关！</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
