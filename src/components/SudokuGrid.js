import { toHaveValue } from '@testing-library/jest-dom/matchers';
import React from 'react';


const SudokuGrid = ({ sudoku, onChange, isDisabled }) => {
  return (
    <table className="sudoku-grid">
      <tbody>
        {sudoku.map((row, rowIndex) => (
          <tr key={rowIndex} className={`sudoku-row ${rowIndex % 3 === 2 ? 'sudoku-row-3' : ''}`}>
            {row.map((cell, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`} className={`sudoku-cell ${colIndex % 3 === 2 ? 'sudoku-cell-3' : ''}`}>
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

const SudokuCell = ({ value, onChange, isDisabled }) => {
  const inputDisabled = isDisabled ? { disabled: true } : {};

  const handleInputChange = (e) => {
    const input = e.target.value;
    console.log('User input received');
    console.log(input);
    // 移除非数字字符
    const number = input.replace(/[^0-9]/g, '');

    // 检查数字是否在1到9之间
    if (number.length === 1 && number >= 1 && number <= 9) {
      console.log('Valid Input');
      console.log(number);
      onChange(number);
    } else {
      // 如果输入无效，清除输入框
      e.target.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      // 如果用户按下删除键，清除输入框
      e.target.value = '';
      onChange(0);
    }
  };

  // 如果值是0，渲染一个空的输入框
  if (value === 0 || value === '0' || isNaN(value)) {
    return (
      <input
        type="number"
        value=""
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        style={{ width: '30px', height: '30px', textAlign: 'center' }}
        {...inputDisabled}
      />
    );
  }
  // 对于其他值，显示一个输入框
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => handleInputChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
      min="1"
      max="9"
      maxLength="1"
      style={{ width: '30px', height: '30px', textAlign: 'center' }}
      {...inputDisabled}
    />
  );
};

export default SudokuGrid;