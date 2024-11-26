import React from 'react';
import styled from 'styled-components';
import { GameProvider } from './context/GameContext';
import Game from './components/Game';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContainer>
        <Game />
      </AppContainer>
    </GameProvider>
  );
};

export default App;
