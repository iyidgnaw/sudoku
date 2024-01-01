import { getSudoku } from 'sudoku-gen';

export function generateSudoku() {
  // var sudoku = require("sudoku");
  // const solution = convertTo2DArray(sudoku.makepuzzle());

  const sudoku = getSudoku('easy');
  const solution = convertTo2DArraySudokuGen(sudoku.puzzle);

  return solution;
}

function convertTo2DArraySudokuGen(sudoku) {
  const rows = 9;
  const cols = 9;
  const twoDArray = [];

  for (let i = 0; i < rows; i++) {
    twoDArray[i] = [];
    for (let j = 0; j < cols; j++) {
      twoDArray[i][j] =
      sudoku.charAt(i * cols + j) === '-' ? 0 : sudoku.charAt(i * cols + j);
    }
  }

  return twoDArray; 
}

function convertTo2DArray(oneDArray) {
  const rows = 9;
  const cols = 9;
  const twoDArray = [];

  for (let i = 0; i < rows; i++) {
    twoDArray[i] = [];
    for (let j = 0; j < cols; j++) {
      // 检查当前元素是否为null，如果是，则替换为0
      twoDArray[i][j] =
        oneDArray[i * cols + j] === null ? 0 : oneDArray[i * cols + j];
    }
  }

  return twoDArray;
}

export function checkSudoku(sudoku) {
  // 检查每一行
  for (let i = 0; i < 9; i++) {
    const row = new Set();
    for (let j = 0; j < 9; j++) {
      if (!row.has(sudoku[i][j])) {
        row.add(sudoku[i][j]);
      } else {
        return false;
      }
    }
  }

  // 检查每一列
  for (let j = 0; j < 9; j++) {
    const col = new Set();
    for (let i = 0; i < 9; i++) {
      if (!col.has(sudoku[i][j])) {
        col.add(sudoku[i][j]);
      } else {
        return false;
      }
    }
  }

  // 检查每一个3x3宫格
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const box = [];
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          box.push(sudoku[x][y]);
        }
      }
      if (!new Set(box).size === 9) {
        return false;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] !== 0) {
        count++;
      }
    }
  }
  return count === 81;
}
