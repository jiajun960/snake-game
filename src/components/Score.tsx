import React from "react";
import styled from "styled-components";
import { useGame } from "../context/GameContext";

const ScoreContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const HighScore = styled.div`
  font-size: 18px;
  color: #666;
`;

const Score: React.FC = () => {
  const { score, highScore } = useGame();

  return (
    <ScoreContainer>
      <div>Score: {score}</div>
      <HighScore>High Score: {highScore}</HighScore>
    </ScoreContainer>
  );
};

export default Score;
