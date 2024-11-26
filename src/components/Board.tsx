import React from "react";
import styled from "styled-components";
import { useGame } from "../context/GameContext";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 1px;
  background-color: #ccc;
  border: 2px solid #333;
`;

const Cell = styled.div<{ isSnake: boolean; isFood: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${({ isSnake, isFood }) =>
    isSnake ? "#4CAF50" : isFood ? "#f44336" : "#fff"};
`;

const Board: React.FC = () => {
  const { board } = useGame();

  return (
    <BoardContainer>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            isSnake={cell === "snake"}
            isFood={cell === "food"}
          />
        ))
      )}
    </BoardContainer>
  );
};

export default Board;
