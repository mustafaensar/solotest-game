import React, { useState } from "react";
import "./App.css";
import Peg from "./components/Peg";

const App = () => {
  const initialBoard = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPeg, setSelectedPeg] = useState(null);

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    if (board[fromRow][fromCol] !== 1 || board[toRow][toCol] !== 0)
      return false;
    if (
      (Math.abs(fromRow - toRow) === 2 && fromCol === toCol) ||
      (Math.abs(fromCol - toCol) === 2 && fromRow === toRow)
    ) {
      const jumpRow = fromRow + (toRow - fromRow) / 2;
      const jumpCol = fromCol + (toCol - fromCol) / 2;
      return board[jumpRow][jumpCol] === 1;
    }
    return false;
  };

  const handlePegClick = (rowIndex, cellIndex) => {
    if (
      selectedPeg &&
      selectedPeg[0] === rowIndex &&
      selectedPeg[1] === cellIndex
    ) {
      // If the same peg is clicked twice, deselect it
      setSelectedPeg(null);
    } else if (selectedPeg) {
      const [fromRow, fromCol] = selectedPeg;
      if (isValidMove(fromRow, fromCol, rowIndex, cellIndex)) {
        const newBoard = board.map((row) => [...row]);
        newBoard[fromRow][fromCol] = 0;
        newBoard[rowIndex][cellIndex] = 1;
        const jumpRow = fromRow + (rowIndex - fromRow) / 2;
        const jumpCol = fromCol + (cellIndex - fromCol) / 2;
        newBoard[jumpRow][jumpCol] = 0;
        setBoard(newBoard);
        setSelectedPeg(null);
      } else {
        console.log("Invalid move");
        setSelectedPeg(null);
      }
    } else {
      setSelectedPeg([rowIndex, cellIndex]);
    }
  };

  const shouldDisplayPeg = (row, col) => {
    // Define corners that should not display pegs
    const invalidCorners = [
      [0, 0],
      [0, 1],
      [0, 5],
      [0, 6],
      [1, 0],
      [1, 1],
      [1, 5],
      [1, 6],
      [5, 0],
      [5, 1],
      [5, 5],
      [5, 6],
      [6, 0],
      [6, 1],
      [6, 5],
      [6, 6],
    ];

    // Check if the current position is one of the invalid corners
    return !invalidCorners.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="App">
      <h1>Solotest Game</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <Peg
                key={cellIndex}
                hasPeg={cell === 1}
                isVisible={shouldDisplayPeg(rowIndex, cellIndex)}
                isSelected={
                  selectedPeg &&
                  selectedPeg[0] === rowIndex &&
                  selectedPeg[1] === cellIndex
                }
                onClick={() => handlePegClick(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
