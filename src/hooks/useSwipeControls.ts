import { useEffect, useState } from "react";
import { Direction } from "../types/game";

interface TouchPosition {
  x: number;
  y: number;
}

export const useSwipeControls = (
  setDirection: (direction: Direction) => void,
  isPlaying: boolean
) => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({
        x: touch.clientX,
        y: touch.clientY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart || !isPlaying) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > 30) {
          const newDirection = deltaX > 0 ? Direction.Right : Direction.Left;
          setDirection(newDirection);
          setTouchStart(null);
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > 30) {
          const newDirection = deltaY > 0 ? Direction.Down : Direction.Up;
          setDirection(newDirection);
          setTouchStart(null);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [touchStart, setDirection, isPlaying]);
};
