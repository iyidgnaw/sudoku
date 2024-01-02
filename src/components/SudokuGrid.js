import React from 'react';
import SudokuCell from './SudokuCell';


const SudokuGrid = ({ sudoku, onChange, isDisabled }) => {
  return (
    <table className="sudoku-grid">
      <tbody>
        {sudoku.map((row, rowIndex) => (
          <tr key={rowIndex} className={`sudoku-row ${rowIndex % 3 === 2 ? 'sudoku-row-3' : ''}`}>
            {row.map((cell, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`} className={`${colIndex % 3 === 2 ? 'sudoku-cell-3' : 'sudoku-cell'}`}>
                <SudokuCell
                  value={cell}
                  onChange={(value) => onChange(value, rowIndex, colIndex)}
                  isDisabled={isDisabled(rowIndex, colIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default SudokuGrid;