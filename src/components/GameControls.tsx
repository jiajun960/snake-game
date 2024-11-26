import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const Score = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

const DifficultySelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  margin: 10px 0;
`;

const GameControls: React.FC = () => {
  const { gameState, startGame, pauseGame, setDifficulty } = useGame();

  return (
    <ControlsContainer>
      <Score>分数: {gameState.score}</Score>
      {gameState.highScore > 0 && (
        <Score>最高分: {gameState.highScore}</Score>
      )}
      
      {!gameState.isPlaying ? (
        <>
          <DifficultySelect
            value={gameState.difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            disabled={gameState.isPlaying}
          >
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </DifficultySelect>
          <Button onClick={startGame}>开始游戏</Button>
        </>
      ) : (
        <Button onClick={pauseGame}>
          {gameState.isPaused ? '继续' : '暂停'}
        </Button>
      )}
    </ControlsContainer>
  );
};

export default GameControls;
