import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isGameOver: boolean;
  food: Position;
  score: number;
  nextDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
}

const GameCanvas = styled.canvas`
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #f0f0f0;
  max-width: 100%;
  height: auto;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
`;

const ScoreText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-template-rows: repeat(3, 60px);
  gap: 5px;
  margin-top: 20px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ControlButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: rgba(76, 175, 80, 0.8);
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  
  &:active {
    background-color: rgba(76, 175, 80, 1);
  }
`;

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameSize] = useState({ width: 600, height: 400 });
  const gridSize = 20;

  const [gameState, setGameState] = useState<GameState>({
    snake: [
      { x: 15, y: 10 },
      { x: 14, y: 10 },
      { x: 13, y: 10 },
    ],
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    isGameOver: false,
    food: { x: 5, y: 5 },
    score: 0
  });

  const drawSnake = (ctx: CanvasRenderingContext2D) => {
    gameState.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4CAF50' : '#81C784';
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    });
  };

  const drawFood = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(
      gameState.food.x * gridSize,
      gameState.food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    ctx.fillStyle = '#ffffff';
    ctx.font = `${gridSize * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      '衡',
      gameState.food.x * gridSize + gridSize / 2,
      gameState.food.y * gridSize + gridSize / 2
    );
  };

  const generateFood = useCallback((): Position => {
    const maxX = Math.floor(gameSize.width / gridSize);
    const maxY = Math.floor(gameSize.height / gridSize);
    
    while (true) {
      const food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
      };
      
      if (!gameState.snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        return food;
      }
    }
  }, [gameSize.width, gameSize.height, gridSize, gameState.snake]);

  const resetGame = () => {
    setGameState({
      snake: [
        { x: 15, y: 10 },
        { x: 14, y: 10 },
        { x: 13, y: 10 },
      ],
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      isGameOver: false,
      food: generateFood(),
      score: 0
    });
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.isGameOver) return;

    const oppositeDirections = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    };

    const newDirection = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT'
    }[event.key] as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

    if (newDirection && oppositeDirections[newDirection] !== gameState.direction) {
      setGameState(prev => ({ ...prev, nextDirection: newDirection }));
    }
  }, [gameState.isGameOver, gameState.direction]);

  const handleTouchStart = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    const event = {
      key: {
        'UP': 'ArrowUp',
        'DOWN': 'ArrowDown',
        'LEFT': 'ArrowLeft',
        'RIGHT': 'ArrowRight'
      }[direction]
    } as KeyboardEvent;
    
    handleKeyPress(event);
  };

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      const moveDirection = prev.nextDirection;

      switch (moveDirection) {
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

      if (
        head.x < 0 ||
        head.x >= gameSize.width / gridSize ||
        head.y < 0 ||
        head.y >= gameSize.height / gridSize
      ) {
        return { ...prev, isGameOver: true };
      }

      if (newSnake.some((segment, index) => 
        index !== 0 && segment.x === head.x && segment.y === head.y
      )) {
        return { ...prev, isGameOver: true };
      }

      if (head.x === prev.food.x && head.y === prev.food.y) {
        newSnake.unshift(head);
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(),
          score: prev.score + 10,
          direction: moveDirection
        };
      }

      newSnake.unshift(head);
      newSnake.pop();

      return { ...prev, snake: newSnake, direction: moveDirection };
    });
  }, [gameSize.width, gameSize.height, gridSize, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = gameSize.width;
    canvas.height = gameSize.height;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, gameSize.width, gameSize.height);

    ctx.strokeStyle = '#ddd';

    for (let x = 0; x <= gameSize.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gameSize.height);
      ctx.stroke();
    }

    for (let y = 0; y <= gameSize.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(gameSize.width, y);
      ctx.stroke();
    }

    drawFood(ctx);
    drawSnake(ctx);
  }, [gameSize, gameState, gridSize]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        handleKeyPress(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    const gameLoop = setInterval(() => {
      if (!gameState.isGameOver) {
        moveSnake();
      }
    }, 200);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop);
    };
  }, [gameState.isGameOver, handleKeyPress, moveSnake]);

  return (
    <GameContainer>
      <h1>贪吃蛇游戏</h1>
      <ScoreText>得分: {gameState.score}</ScoreText>
      <GameCanvas ref={canvasRef} />
      {gameState.isGameOver && (
        <>
          <ScoreText>游戏结束!</ScoreText>
          <Button onClick={resetGame}>重新开始</Button>
        </>
      )}
      <ControlsContainer>
        <div />
        <ControlButton onTouchStart={() => handleTouchStart('UP')}>↑</ControlButton>
        <div />
        <ControlButton onTouchStart={() => handleTouchStart('LEFT')}>←</ControlButton>
        <div />
        <ControlButton onTouchStart={() => handleTouchStart('RIGHT')}>→</ControlButton>
        <div />
        <ControlButton onTouchStart={() => handleTouchStart('DOWN')}>↓</ControlButton>
        <div />
      </ControlsContainer>
    </GameContainer>
  );
};

export default Game;