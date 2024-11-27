import { useEffect } from "react";
import { Direction } from "../types/game";

const OPPOSITE_DIRECTION = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left
};

export const useKeyboard = (
  setDirection: (direction: Direction) => void,
  currentDirection: Direction | null,
  isPlaying: boolean
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isPlaying) return;

      let newDirection: Direction | null = null;

      switch (event.key) {
        case "ArrowUp":
          newDirection = Direction.Up;
          break;
        case "ArrowDown":
          newDirection = Direction.Down;
          break;
        case "ArrowLeft":
          newDirection = Direction.Left;
          break;
        case "ArrowRight":
          newDirection = Direction.Right;
          break;
      }

      if (
        newDirection &&
        currentDirection &&
        OPPOSITE_DIRECTION[newDirection] !== currentDirection
      ) {
        setDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setDirection, currentDirection, isPlaying]);
};
