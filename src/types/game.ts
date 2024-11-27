export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

export type GameState = "empty" | "snake" | "food";

export interface Position {
  x: number;
  y: number;
}

export interface GameContextProps {
  board: GameState[][];
  score: number;
  highScore: number;
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  changeDirection: (direction: Direction) => void;
  gameState: {
    isPlaying: boolean;
    isPaused: boolean;
    isGameOver: boolean;
  };
  setDifficulty: (level: string) => void;
}
