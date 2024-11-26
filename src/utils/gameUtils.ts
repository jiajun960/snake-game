import { Snake, Position, Direction, GRID_SIZE, CANVAS_SIZE, INITIAL_SNAKE_LENGTH } from '../types/game';

export const createInitialSnake = (): Snake => {
  const centerX = Math.floor(CANVAS_SIZE / GRID_SIZE / 2);
  const centerY = Math.floor(CANVAS_SIZE / GRID_SIZE / 2);
  
  const body: Position[] = [];
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    body.push({ x: centerX, y: centerY + i });
  }
  
  return {
    body,
    direction: 'UP'
  };
};

export const generateFood = (snake: Snake): Position => {
  const maxPosition = CANVAS_SIZE / GRID_SIZE;
  let food: Position;
  
  do {
    food = {
      x: Math.floor(Math.random() * maxPosition),
      y: Math.floor(Math.random() * maxPosition)
    };
  } while (snake.body.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
};

export const moveSnake = (snake: Snake): Position[] => {
  const newBody = [...snake.body];
  const head = { ...newBody[0] };

  switch (snake.direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  newBody.unshift(head);
  newBody.pop();
  return newBody;
};

export const checkCollision = (snake: Snake): boolean => {
  const head = snake.body[0];
  const maxPosition = CANVAS_SIZE / GRID_SIZE - 1;

  // 检查是否撞墙
  if (
    head.x < 0 ||
    head.x > maxPosition ||
    head.y < 0 ||
    head.y > maxPosition
  ) {
    return true;
  }

  // 检查是否撞到自己
  return snake.body.slice(1).some(
    segment => segment.x === head.x && segment.y === head.y
  );
};

export const hasEatenFood = (snake: Snake, food: Position): boolean => {
  const head = snake.body[0];
  return head.x === food.x && head.y === food.y;
};

export const getGameSpeed = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 200;
    case 'medium':
      return 150;
    case 'hard':
      return 100;
    default:
      return 150;
  }
};
