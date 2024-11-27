import React from "react";
import styled from "styled-components";
import { useGame } from "../context/GameContext";

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
`;

const GameControls: React.FC = () => {
  const { gameStarted, gamePaused, startGame, pauseGame, resetGame } = useGame();

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
      <Select onChange={(e) => console.log(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Select>
    </ControlsContainer>
  );
};

export default GameControls;
