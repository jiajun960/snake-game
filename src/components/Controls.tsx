import React, { useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../context/GameContext";
import { Direction } from "../types/game";

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

const Controls: React.FC = () => {
  const { startGame, pauseGame, resetGame, changeDirection, gameStarted, gamePaused } = useGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection(Direction.Up);
          break;
        case "ArrowDown":
          changeDirection(Direction.Down);
          break;
        case "ArrowLeft":
          changeDirection(Direction.Left);
          break;
        case "ArrowRight":
          changeDirection(Direction.Right);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [changeDirection]);

  return (
    <ControlsContainer>
      {!gameStarted ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : (
        <>
          <Button onClick={gamePaused ? startGame : pauseGame}>
            {gamePaused ? "Resume" : "Pause"}
          </Button>
          <Button onClick={resetGame}>Reset</Button>
        </>
      )}
    </ControlsContainer>
  );
};

export default Controls;
