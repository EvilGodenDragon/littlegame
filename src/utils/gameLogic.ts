import { Player, Monster, Item, Pet, GameState, LEVEL_NAMES, LEVEL_EMOJIS, MONSTER_EMOJIS } from '@/types/game';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initGame = (): GameState => {
  const player: Player = {
    id: generateId(),
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2,
    level: 0,
    points: 0,
    hp: 100,
    maxHp: 100,
    speed: 5,
    emoji: LEVEL_EMOJIS[0],
  };

  const monsters: Monster[] = [];
  const numMonsters = 15;
  
  for (let i = 0; i < numMonsters; i++) {
    const level = Math.min(Math.floor(i / 3), 4);
    monsters.push({
      id: generateId(),
      x: Math.random() * (GAME_WIDTH - 60) + 30,
      y: Math.random() * (GAME_HEIGHT - 60) + 30,
      level: level,
      points: (level + 1) * 10,
      emoji: MONSTER_EMOJIS[level],
      speed: 1 + level * 0.5,
      direction: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      isAlive: true,
    });
  }

  const items: Item[] = [
    { id: generateId(), x: Math.random() * (GAME_WIDTH - 40) + 20, y: Math.random() * (GAME_HEIGHT - 40) + 20, type: 'points', value: 50, emoji: '💎', isCollected: false },
    { id: generateId(), x: Math.random() * (GAME_WIDTH - 40) + 20, y: Math.random() * (GAME_HEIGHT - 40) + 20, type: 'hp', value: 30, emoji: '❤️', isCollected: false },
    { id: generateId(), x: Math.random() * (GAME_WIDTH - 40) + 20, y: Math.random() * (GAME_HEIGHT - 40) + 20, type: 'speed', value: 1, emoji: '⚡', isCollected: false },
    { id: generateId(), x: Math.random() * (GAME_WIDTH - 40) + 20, y: Math.random() * (GAME_HEIGHT - 40) + 20, type: 'points', value: 30, emoji: '✨', isCollected: false },
  ];

  return {
    player,
    monsters,
    items,
    pet: null,
    isGameOver: false,
    isVictory: false,
  };
};

export const checkCollision = (obj1: { x: number; y: number }, obj2: { x: number; y: number }, radius1 = 25, radius2 = 25): boolean => {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < radius1 + radius2;
};

export const updateMonsterPosition = (monster: Monster): Monster => {
  let newX = monster.x + monster.direction.x * monster.speed;
  let newY = monster.y + monster.direction.y * monster.speed;
  let newDirection = { ...monster.direction };

  if (newX < 30 || newX > GAME_WIDTH - 30) {
    newDirection.x = -newDirection.x;
    newX = Math.max(30, Math.min(GAME_WIDTH - 30, newX));
  }
  if (newY < 30 || newY > GAME_HEIGHT - 30) {
    newDirection.y = -newDirection.y;
    newY = Math.max(30, Math.min(GAME_HEIGHT - 30, newY));
  }

  if (Math.random() < 0.02) {
    newDirection = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
  }

  return {
    ...monster,
    x: newX,
    y: newY,
    direction: newDirection,
  };
};

export const updatePlayerLevel = (player: Player): Player => {
  let newLevel = 0;
  const points = player.points;
  
  if (points >= 500) newLevel = 5;
  else if (points >= 300) newLevel = 4;
  else if (points >= 150) newLevel = 3;
  else if (points >= 80) newLevel = 2;
  else if (points >= 30) newLevel = 1;

  return {
    ...player,
    level: newLevel,
    emoji: LEVEL_EMOJIS[newLevel],
  };
};
