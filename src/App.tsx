import React from "react";
import styled from "styled-components";
import { GameProvider } from "./context/GameContext";
import Game from "./components/Game";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const GameWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContainer>
        <GameWrapper>
          <Title>Snake Game</Title>
          <Game />
        </GameWrapper>
      </AppContainer>
    </GameProvider>
  );
};

export default App;
