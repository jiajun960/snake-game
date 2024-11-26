import { useEffect } from 'react';
import { Direction } from '../types/game';

export const useSwipeControls = (
  isPlaying: boolean,
  setDirection: (direction: Direction) => void,
  currentDirection: Direction
) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPlaying) return;

      e.preventDefault();
      
      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // 需要有足够的滑动距离才触发方向改变
      const minSwipeDistance = 30;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (Math.abs(deltaX) > minSwipeDistance) {
          const newDirection = deltaX > 0 ? 'RIGHT' : 'LEFT';
          if (
            (newDirection === 'RIGHT' && currentDirection !== 'LEFT') ||
            (newDirection === 'LEFT' && currentDirection !== 'RIGHT')
          ) {
            setDirection(newDirection);
          }
        }
      } else {
        // 垂直滑动
        if (Math.abs(deltaY) > minSwipeDistance) {
          const newDirection = deltaY > 0 ? 'DOWN' : 'UP';
          if (
            (newDirection === 'DOWN' && currentDirection !== 'UP') ||
            (newDirection === 'UP' && currentDirection !== 'DOWN')
          ) {
            setDirection(newDirection);
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlaying, setDirection, currentDirection]);
};
