import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState } from './types/game';
import { initGame, checkCollision, updateMonsterPosition, updatePlayerLevel } from './utils/gameLogic';
import GameCanvas from './components/GameCanvas';
import StatusBar from './components/StatusBar';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

function App() {
  const [gameState, setGameState] = useState<GameState>(() => initGame());
  const keysPressed = useRef<Set<string>>(new Set());
  const animationRef = useRef<number>();

  const restartGame = useCallback(() => {
    setGameState(initGame());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState.isGameOver || gameState.isVictory) {
      return;
    }

    const gameLoop = () => {
      setGameState(prevState => {
        if (prevState.isGameOver || prevState.isVictory) {
          return prevState;
        }

        let newPlayer = { ...prevState.player };
        
        if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
          newPlayer.y = Math.max(25, newPlayer.y - newPlayer.speed);
        }
        if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
          newPlayer.y = Math.min(GAME_HEIGHT - 25, newPlayer.y + newPlayer.speed);
        }
        if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
          newPlayer.x = Math.max(25, newPlayer.x - newPlayer.speed);
        }
        if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
          newPlayer.x = Math.min(GAME_WIDTH - 25, newPlayer.x + newPlayer.speed);
        }

        const newMonsters = prevState.monsters.map(monster => {
          if (!monster.isAlive) return monster;
          return updateMonsterPosition(monster);
        });

        let updatedMonsters = [...newMonsters];
        let updatedItems = [...prevState.items];
        let updatedPlayer = { ...newPlayer };

        updatedMonsters.forEach((monster, index) => {
          if (!monster.isAlive) return;
          if (checkCollision(updatedPlayer, monster)) {
            if (monster.level <= updatedPlayer.level) {
              updatedPlayer.points += monster.points;
              updatedPlayer = updatePlayerLevel(updatedPlayer);
              updatedMonsters[index] = { ...monster, isAlive: false };
            } else {
              updatedPlayer.hp -= 20;
            }
          }
        });

        updatedItems.forEach((item, index) => {
          if (item.isCollected) return;
          if (checkCollision(updatedPlayer, item, 25, 15)) {
            if (item.type === 'points') {
              updatedPlayer.points += item.value;
              updatedPlayer = updatePlayerLevel(updatedPlayer);
            } else if (item.type === 'hp') {
              updatedPlayer.hp = Math.min(updatedPlayer.maxHp, updatedPlayer.hp + item.value);
            } else if (item.type === 'speed') {
              updatedPlayer.speed += item.value;
            }
            updatedItems[index] = { ...item, isCollected: true };
          }
        });

        const isVictory = updatedMonsters.filter(m => m.isAlive).length === 0;
        const isGameOver = !isVictory && updatedPlayer.hp <= 0;

        return {
          ...prevState,
          player: updatedPlayer,
          monsters: updatedMonsters,
          items: updatedItems,
          isVictory,
          isGameOver,
        };
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.isGameOver, gameState.isVictory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mb-2 drop-shadow-lg">
            ✨ 修仙大作战 ✨
          </h1>
          <p className="text-purple-300 text-lg">吞噬低阶怪物，不断提升修为！</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 space-y-6 border border-purple-500/30">
          <StatusBar gameState={gameState} />

          <div className="flex justify-center">
            <GameCanvas gameState={gameState} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={restartGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-yellow-400"
            >
              {gameState.isGameOver || gameState.isVictory ? '🎮 再来一局' : '🔄 重新开始'}
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border border-purple-400/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              📖 游戏说明
            </h3>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>使用 <kbd className="bg-gray-700 px-2 py-1 rounded border border-gray-600">WASD</kbd> 或 <kbd className="bg-gray-700 px-2 py-1 rounded border border-gray-600">方向键</kbd> 控制移动</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">⚔️</span>
                <span>只能吞噬比你等级低的怪物</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">💎</span>
                <span>收集道具获得积分、生命和速度加成</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>消灭所有怪物即可通关成为仙帝！</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6 text-purple-400 text-sm">
          平民 → 修士 → 真人 → 宗师 → 仙君 → 仙帝
        </div>
      </div>
    </div>
  );
}

export default App;
