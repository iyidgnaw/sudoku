import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import { generateSudoku } from "./Utils";
import { useParams } from "react-router-dom";

function Game() {
  const [staticSudoku, setStaticSudoku] = useState([]);
  const [history, setHistory] = useState(() => {
    let history = [];
    let s = generateSudoku();
    history.push(s);
    setStaticSudoku(JSON.parse(JSON.stringify(s)));
    return history;
  });
  const [current, setCurrent] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const params = useParams();
  const id = params.id;

  // Change Handling
  const handleCellChange = (value, row, col) => {
    let sudoku = history[current];
    const newSudoku = JSON.parse(JSON.stringify(sudoku));
    newSudoku[row][col] = parseInt(value);
    let newHistory = history.slice(0, current + 1);
    newHistory.push(newSudoku);
    setHistory(newHistory);
  };

  // Hooks
  useEffect(() => {
    setCurrent(history.length - 1);
  }, [history]);

  useEffect(() => {
    console.log("current pointer is changed!")
    console.log(current);
    console.log(history[current]);
  }, [current]);

  // Button Reactions
  const restartGame = () => {
    const newSudoku = generateSudoku();
    setStaticSudoku(JSON.parse(JSON.stringify(newSudoku)));
    setHistory([newSudoku]);
  };

  const backwards = () => {
    setCurrent(current > 0 ? current - 1 : current);
  };

  const forwards = () => {
    setCurrent(current < history.length - 1 ? current + 1 : current);
  };

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <h3>Session Id: {id}</h3>
      <h3>Steps recorded: {history.length}</h3>
      <button onClick={restartGame}>Restart</button>
      <button onClick={backwards}>Step Back</button>
      <button onClick={forwards}>Continue</button>
      <SudokuGrid
        sudoku={current >= history.length ? history[history.length - 1] : history[current]}
        onChange={handleCellChange}
        isDisabled={(row, col) => staticSudoku[row][col] !== 0}
      />
    </div>
  );
}

export default Game;
