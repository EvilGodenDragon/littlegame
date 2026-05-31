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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-sky-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰气泡 */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-20 right-1/4 w-24 h-24 bg-gradient-to-br from-green-200/40 to-teal-200/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="w-full max-w-lg relative z-10">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-3 drop-shadow-lg">
            ✨🐑 羊了个羊 🐑✨
          </h1>
          <p className="text-gray-700 text-lg font-medium">点击方块收集，凑齐3个相同的自动消除！</p>
        </div>

        {/* 游戏容器 */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border-4 border-white/50">
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
                px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 
                text-white font-bold text-xl rounded-2xl shadow-2xl 
                hover:shadow-3xl hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 
                transform hover:scale-110 active:scale-95 transition-all duration-300
                relative overflow-hidden group
              "
            >
              {/* 按钮光泽效果 */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl"></div>
              
              {/* 按钮内容 */}
              <span className="relative z-10 flex items-center gap-2">
                {gameState.isGameOver || gameState.isVictory ? '🎮 再来一局' : '🔄 重新开始'}
              </span>
            </button>
          </div>
        </div>

        {/* 规则说明 */}
        <div className="mt-6 bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-pink-50/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-3 border-yellow-200/50">
          <h3 className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-pink-600 mb-4 flex items-center gap-2">
            📖 游戏规则：
          </h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-3 text-gray-700 font-medium">
              <span className="text-2xl">1️⃣</span>
              <span>点击顶层（闪亮的）方块将其放入槽位</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 font-medium">
              <span className="text-2xl">2️⃣</span>
              <span>槽位中凑齐3个相同方块会自动消除</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 font-medium">
              <span className="text-2xl">3️⃣</span>
              <span>槽位最多容纳7个方块，满了就失败</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 font-medium">
              <span className="text-2xl">🏆</span>
              <span>消除所有方块即可通关！</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
