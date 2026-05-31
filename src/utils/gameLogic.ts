import { Tile, GameState } from '@/types/game';

// 方块类型 - 10种不同的动物表情
export const TILE_TYPES = ['🐑', '🐄', '🐖', '🐔', '🐕', '🐈', '🐰', '🐿️', '🦔', '🦊'];

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 检查方块是否被覆盖（是否为顶层）
export const isTopTile = (tile: Tile, allTiles: Tile[]): boolean => {
  if (tile.isRemoved) return false;
  
  // 检查是否有其他方块在它上方（更大的layer值，并且位置重叠）
  return !allTiles.some(t => 
    !t.isRemoved && 
    t.layer > tile.layer &&
    Math.abs(t.x - tile.x) < 1 &&
    Math.abs(t.y - tile.y) < 1
  );
};

// 初始化游戏
export const initGame = (): GameState => {
  const tiles: Tile[] = [];
  const gridSize = 5;
  const layers = 3;
  
  // 生成方块池（每种类型有6个，共60个方块）
  const tilePool: string[] = [];
  TILE_TYPES.forEach(type => {
    for (let i = 0; i < 6; i++) {
      tilePool.push(type);
    }
  });
  
  // 打乱顺序
  for (let i = tilePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
  }
  
  let poolIndex = 0;
  
  // 生成多层方块
  for (let layer = 0; layer < layers; layer++) {
    const offset = layer * 0.3; // 每层偏移一点
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // 随机决定是否在这个位置放下方块（避免太满）
        if (Math.random() > 0.3 && poolIndex < tilePool.length) {
          tiles.push({
            id: generateId(),
            type: tilePool[poolIndex],
            x: x + offset,
            y: y + offset,
            layer: layer,
            isRemoved: false
          });
          poolIndex++;
        }
      }
    }
  }
  
  // 如果方块池还有剩余，随机放置
  while (poolIndex < tilePool.length) {
    tiles.push({
      id: generateId(),
      type: tilePool[poolIndex],
      x: Math.random() * (gridSize - 1),
      y: Math.random() * (gridSize - 1),
      layer: Math.floor(Math.random() * layers),
      isRemoved: false
    });
    poolIndex++;
  }
  
  return {
    tiles,
    slot: [],
    eliminatedPairs: 0,
    isGameOver: false,
    isVictory: false
  };
};

// 处理方块点击
export const handleTileClick = (state: GameState, tileId: string): GameState => {
  if (state.isGameOver || state.isVictory) return state;
  
  const tile = state.tiles.find(t => t.id === tileId);
  if (!tile || tile.isRemoved || !isTopTile(tile, state.tiles)) {
    return state;
  }
  
  // 添加到槽位
  const newSlot = [...state.slot, tile.type];
  
  // 移除方块
  const newTiles = state.tiles.map(t => 
    t.id === tileId ? { ...t, isRemoved: true } : t
  );
  
  // 检查消除
  let processedSlot = [...newSlot];
  let eliminatedPairs = state.eliminatedPairs;
  
  // 检查是否有3个相同的
  const typeCount: Record<string, number> = {};
  processedSlot.forEach(type => {
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  
  // 找出需要消除的类型
  const typesToRemove: string[] = [];
  Object.entries(typeCount).forEach(([type, count]) => {
    if (count >= 3) {
      typesToRemove.push(type);
    }
  });
  
  // 执行消除
  if (typesToRemove.length > 0) {
    let tempSlot = [...processedSlot];
    typesToRemove.forEach(type => {
      let removeCount = 3;
      tempSlot = tempSlot.filter(item => {
        if (item === type && removeCount > 0) {
          removeCount--;
          eliminatedPairs++;
          return false;
        }
        return true;
      });
    });
    processedSlot = tempSlot;
  }
  
  // 检查游戏结束条件
  const remainingTiles = newTiles.filter(t => !t.isRemoved).length;
  const isVictory = remainingTiles === 0;
  const isGameOver = !isVictory && processedSlot.length >= 7;
  
  return {
    ...state,
    tiles: newTiles,
    slot: processedSlot,
    eliminatedPairs,
    isGameOver,
    isVictory
  };
};
