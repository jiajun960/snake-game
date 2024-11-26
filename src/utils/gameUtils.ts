import { Direction, Position, GameState } from "../types/game";

export const BOARD_SIZE = 20;

export const createBoard = (): GameState[][] => {
  return Array(BOARD_SIZE).fill("empty").map(() => Array(BOARD_SIZE).fill("empty"));
};

export const getNextHeadPosition = (currentHead: Position, direction: Direction): Position => {
  switch (direction) {
    case Direction.Up:
      return { x: currentHead.x, y: currentHead.y - 1 };
    case Direction.Down:
      return { x: currentHead.x, y: currentHead.y + 1 };
    case Direction.Left:
      return { x: currentHead.x - 1, y: currentHead.y };
    case Direction.Right:
      return { x: currentHead.x + 1, y: currentHead.y };
  }
};

export const isValidMove = (position: Position): boolean => {
  return (
    position.x >= 0 &&
    position.x < BOARD_SIZE &&
    position.y >= 0 &&
    position.y < BOARD_SIZE
  );
};

export const hasSnakeCollided = (head: Position, body: Position[]): boolean => {
  return body.some(segment => segment.x === head.x && segment.y === head.y);
};

export const generateRandomPosition = (): Position => {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
};

export const isFoodPosition = (position: Position, food: Position): boolean => {
  return position.x === food.x && position.y === food.y;
};

export const calculateScore = (snakeLength: number): number => {
  return (snakeLength - 1) * 10;
};

export const getInitialState = () => {
  const initialSnake = [{ x: 10, y: 10 }];
  const initialFood = generateRandomPosition();
  const initialBoard = createBoard();
  
  // Place snake and food on board
  initialSnake.forEach(pos => {
    initialBoard[pos.y][pos.x] = "snake";
  });
  initialBoard[initialFood.y][initialFood.x] = "food";

  return {
    snake: initialSnake,
    food: initialFood,
    board: initialBoard,
    direction: Direction.Right,
    score: 0,
  };
};
