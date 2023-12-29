import React, { useState, useEffect } from 'react';
import SudokuGrid from './components/SudokuGrid';
import generateSudoku from './components/generateSudoku';
import checkSudoku from './components/checkSudoku';


function App() {
  const [sudoku, setSudoku] = useState(generateSudoku());
  const [isValid, setIsValid] = useState(false);
  const [staticSudoku, setStaticSudoku] = useState(sudoku);

  // 处理用户输入
  const handleCellChange = (value, row, col) => {
    const newSudoku = [...sudoku];
    newSudoku[row][col] = parseInt(value);
    setSudoku(newSudoku);
  };

  // 当用户输入改变时更新状态
  useEffect(() => {
    newStatic(sudoku);
  }, []);

  const newStatic = () => {
    setStaticSudoku(JSON.parse(JSON.stringify(sudoku)));
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <SudokuGrid sudoku={sudoku} onChange={handleCellChange} isDisabled={(row, col) => staticSudoku[row][col] !== 0}/>
    </div>
  );
}

export default App;