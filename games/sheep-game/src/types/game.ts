export interface Tile {
  id: string;
  type: string;
  x: number;
  y: number;
  layer: number;
  isRemoved: boolean;
}

export interface GameState {
  tiles: Tile[];
  slot: string[];
  eliminatedPairs: number;
  isGameOver: boolean;
  isVictory: boolean;
}
