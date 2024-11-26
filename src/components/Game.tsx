// ... 其他 imports ...
import { useSwipeControls } from '../hooks/useSwipeControls';

const Game: React.FC = () => {
  const { gameState, updateGame, setDirection } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 添加键盘控制
  useKeyboard(
    gameState.isPlaying && !gameState.isPaused,
    setDirection,
    gameState.snake.direction
  );

  // 添加触摸控制
  useSwipeControls(
    gameState.isPlaying && !gameState.isPaused,
    setDirection,
    gameState.snake.direction
  );

  // ... 其余代码保持不变 ...
};
