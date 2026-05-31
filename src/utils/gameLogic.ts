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
    Math.abs(t.x - tile.x) < 0.8 &&
    Math.abs(t.y - tile.y) < 0.8
  );
};

// 初始化游戏
export const initGame = (): GameState => {
  const tiles: Tile[] = [];
  const gridCols = 5; // 5列
  const gridRows = 4; // 4行
  const layers = 2;  // 2层，减少到2层让布局更清晰
  
  // 生成方块池（每种类型有4个，共40个方块，刚好放满）
  const tilePool: string[] = [];
  TILE_TYPES.forEach(type => {
    for (let i = 0; i < 4; i++) {
      tilePool.push(type);
    }
  });
  
  // 打乱顺序
  for (let i = tilePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
  }
  
  let poolIndex = 0;
  
  // 生成整齐的多层方块
  for (let layer = 0; layer < layers; layer++) {
    const layerOffset = 0.3; // 每层的轻微偏移
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        if (poolIndex < tilePool.length) {
          tiles.push({
            id: generateId(),
            type: tilePool[poolIndex],
            x: x + (layers - layer - 1) * layerOffset,
            y: y + (layers - layer - 1) * layerOffset,
            layer: layer,
            isRemoved: false
          });
          poolIndex++;
        }
      }
    }
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
