import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 100;
`;

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <ToggleButton onClick={onToggle}>
      {isDark ? '🌞' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle; 