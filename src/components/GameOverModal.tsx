import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Score = styled.h2`
  color: #4CAF50;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  onRestart
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h1>游戏结束!</h1>
        <Score>得分: {score}</Score>
        <p>最高分: {highScore}</p>
        <Button onClick={onRestart}>重新开始</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GameOverModal; 