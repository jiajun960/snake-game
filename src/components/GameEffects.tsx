import React from 'react';
import styled, { keyframes } from 'styled-components';

const scorePopup = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
`;

const ScorePopup = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  color: ${props => props.theme.colors.secondary};
  font-size: 24px;
  font-weight: bold;
  pointer-events: none;
  animation: ${scorePopup} 0.5s ease-out forwards;
`;

const foodSparkle = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const FoodSparkle = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, ${props => props.theme.colors.food} 0%, transparent 70%);
  animation: ${foodSparkle} 1s ease-in-out infinite;
`;

interface GameEffectsProps {
  effects: Array<{
    type: 'score' | 'food';
    x: number;
    y: number;
    id: string;
  }>;
}

const GameEffects: React.FC<GameEffectsProps> = ({ effects }) => {
  return (
    <>
      {effects.map(effect => {
        if (effect.type === 'score') {
          return (
            <ScorePopup
              key={effect.id}
              x={effect.x}
              y={effect.y}
            >
              +10
            </ScorePopup>
          );
        }
        return (
          <FoodSparkle
            key={effect.id}
            x={effect.x}
            y={effect.y}
          />
        );
      })}
    </>
  );
};

export default GameEffects; 