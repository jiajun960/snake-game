export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

export interface Position {
  x: number;
  y: number;
}

export type GameState = "empty" | "snake" | "food";

export interface GameConfig {
  boardSize: number;
  initialSnakePosition: Position;
  initialDirection: Direction;
  speed: number;
}

export interface GameStats {
  score: number;
  highScore: number;
}
