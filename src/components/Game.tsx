import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import Board from './Board';
import Controls from './Controls';
import Score from './Score';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Game: React.FC = () => {
  const { gameOver } = useGame();

  return (
    <GameContainer>
      <Score />
      <Board />
      <Controls />
      {gameOver && <div>Game Over!</div>}
    </GameContainer>
  );
};

export default Game;