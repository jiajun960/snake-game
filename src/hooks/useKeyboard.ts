import { useEffect } from 'react';
import { Direction } from '../types/game';

const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};

export const useKeyboard = (
  isPlaying: boolean,
  setDirection: (direction: Direction) => void,
  currentDirection: Direction
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isPlaying) return;

      let newDirection: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newDirection = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newDirection = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newDirection = 'RIGHT';
          break;
      }

      if (newDirection && OPPOSITE_DIRECTIONS[newDirection] !== currentDirection) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, setDirection, currentDirection]);
};
