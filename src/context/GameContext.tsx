import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snake, Position } from '../types/game';
import { createInitialSnake, generateFood, moveSnake, checkCollision, hasEatenFood } from '../utils/gameUtils';

interface GameState {
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  snake: Snake;
  food: Position;
  highScore: number;
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  endGame: () => void;
  setDifficulty: (difficulty: GameState['difficulty']) => void;
  setDirection: (direction: Snake['direction']) => void;
  updateGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    isPlaying: false,
    isPaused: false,
    difficulty: 'medium',
    snake: createInitialSnake(),
    food: { x: 0, y: 0 },
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0')
  });

  const startGame = useCallback(() => {
    const initialSnake = createInitialSnake();
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      score: 0,
      snake: initialSnake,
      food: generateFood(initialSnake)
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => {
      const newHighScore = prev.score > prev.highScore ? prev.score : prev.highScore;
      localStorage.setItem('snakeHighScore', newHighScore.toString());
      return {
        ...prev,
        isPlaying: false,
        highScore: newHighScore
      };
    });
  }, []);

  const setDifficulty = useCallback((difficulty: GameState['difficulty']) => {
    setGameState(prev => ({
      ...prev,
      difficulty
    }));
  }, []);

  const setDirection = useCallback((direction: Snake['direction']) => {
    setGameState(prev => ({
      ...prev,
      snake: {
        ...prev.snake,
        direction
      }
    }));
  }, []);

  const updateGame = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    setGameState(prev => {
      const newSnakeBody = moveSnake(prev.snake);
      const newSnake = { ...prev.snake, body: newSnakeBody };

      if (checkCollision(newSnake)) {
        const newHighScore = prev.score > prev.highScore ? prev.score : prev.highScore;
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return {
          ...prev,
          isPlaying: false,
          highScore: newHighScore
        };
      }

      if (hasEatenFood(newSnake, prev.food)) {
        return {
          ...prev,
          score: prev.score + 10,
          snake: {
            ...newSnake,
            body: [...newSnakeBody, prev.snake.body[prev.snake.body.length - 1]]
          },
          food: generateFood(newSnake)
        };
      }

      return { ...prev, snake: newSnake };
    });
  }, [gameState.isPlaying, gameState.isPaused]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        pauseGame,
        endGame,
        setDifficulty,
        setDirection,
        updateGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
