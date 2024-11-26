export const GRID_SIZE = 20;
export const CANVAS_SIZE = 400;
export const INITIAL_SNAKE_LENGTH = 3;

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  body: Position[];
  direction: Direction;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
