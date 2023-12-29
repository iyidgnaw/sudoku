
export default function generateSudoku() {
  var sudoku = require('sudoku');

  const solution = convertTo2DArray(sudoku.makepuzzle());

  return solution;
}

function convertTo2DArray(oneDArray) {
  const rows = 9;
  const cols = 9;
  const twoDArray = [];

  for (let i = 0; i < rows; i++) {
    twoDArray[i] = [];
    for (let j = 0; j < cols; j++) {
      // 检查当前元素是否为null，如果是，则替换为0
      twoDArray[i][j] = oneDArray[i * cols + j] === null ? 0 : oneDArray[i * cols + j];
    }
  }

  return twoDArray;
}