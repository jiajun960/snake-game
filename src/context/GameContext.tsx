import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Direction, GameState, Position } from "../types/game";
import { createBoard, getNextHeadPosition, isValidMove, hasSnakeCollided } from "../utils/gameUtils";

interface GameContextProps {
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
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<GameState[][]>(createBoard());
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  const updateBoard = useCallback(() => {
    const newBoard = createBoard();
    snake.forEach(segment => {
      newBoard[segment.y][segment.x] = "snake";
    });
    newBoard[food.y][food.x] = "food";
    setBoard(newBoard);
  }, [snake, food]);

  const moveSnake = useCallback(() => {
    if (gamePaused || gameOver || !gameStarted) return;

    const newHead = getNextHeadPosition(snake[0], direction);

    if (!isValidMove(newHead) || hasSnakeCollided(newHead, snake.slice(1))) {
      setGameOver(true);
      setGameStarted(false);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(prev => prev + 1);
      generateFood();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [direction, snake, food, gamePaused, gameOver, gameStarted, score, highScore, generateFood]);

  useEffect(() => {
    updateBoard();
  }, [snake, food, updateBoard]);

  useEffect(() => {
    if (gameStarted && !gamePaused && !gameOver) {
      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
    }
  }, [gameStarted, gamePaused, gameOver, moveSnake]);

  const startGame = () => {
    if (gameOver) {
      resetGame();
    }
    setGameStarted(true);
    setGamePaused(false);
  };

  const pauseGame = () => {
    setGamePaused(true);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection(Direction.Right);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setGamePaused(false);
    generateFood();
  };

  const changeDirection = (newDirection: Direction) => {
    if (
      (newDirection === Direction.Up && direction !== Direction.Down) ||
      (newDirection === Direction.Down && direction !== Direction.Up) ||
      (newDirection === Direction.Left && direction !== Direction.Right) ||
      (newDirection === Direction.Right && direction !== Direction.Left)
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <GameContext.Provider
      value={{
        board,
        score,
        highScore,
        gameStarted,
        gamePaused,
        gameOver,
        startGame,
        pauseGame,
        resetGame,
        changeDirection,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
