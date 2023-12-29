export default function checkSudoku(sudoku) {
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

  return true;
}
