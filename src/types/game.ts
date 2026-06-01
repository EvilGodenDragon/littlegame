export interface Player {
  id: string;
  x: number;
  y: number;
  level: number;
  points: number;
  hp: number;
  maxHp: number;
  speed: number;
  emoji: string;
}

export interface Monster {
  id: string;
  x: number;
  y: number;
  level: number;
  points: number;
  emoji: string;
  speed: number;
  direction: { x: number; y: number };
  isAlive: boolean;
}

export interface Item {
  id: string;
  x: number;
  y: number;
  type: 'points' | 'hp' | 'speed';
  value: number;
  emoji: string;
  isCollected: boolean;
}

export interface Pet {
  id: string;
  x: number;
  y: number;
  emoji: string;
  isActive: boolean;
}

export interface GameState {
  player: Player;
  monsters: Monster[];
  items: Item[];
  pet: Pet | null;
  isGameOver: boolean;
  isVictory: boolean;
}

export const LEVEL_NAMES = ['平民', '修士', '真人', '宗师', '仙君', '仙帝'];
export const LEVEL_EMOJIS = ['🧑', '👤', '🧙', '⚡', '👑', '🐉'];
export const MONSTER_EMOJIS = ['🐀', '🐺', '🐍', '🦅', '🐉'];
