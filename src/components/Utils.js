import { getSudoku } from 'sudoku-gen';

export async function getData (key) {
  try {
    const response = await fetch('https://sudoku-master-backend.vercel.app/api/store?key=' + key, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    console.log('Value retrieved:', data);
    return data;
  } catch (error) {
    console.error('Error fetching value:', error);
  }
};

export async function setData(key, value) {
  try {
    const body = {
      "key": key,
      "value": value,
    };
    const response = await fetch('https://sudoku-master-backend.vercel.app/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to save value');
    }
    const data = await response.json();
    console.log('Value saved:', data);
  } catch (error) {
    console.error('Error saving value:', error);
  }
}


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
      sudoku.charAt(i * cols + j) === '-' ? 0 : parseInt(sudoku.charAt(i * cols + j));
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

export function instantCheck(sudoku) {
  // 检查每一行
  for (let i = 0; i < 9; i++) {
    const row = new Set();
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === '0' || sudoku[i][j] === 0) {
        continue;
      }
      if (!row.has(sudoku[i][j])) {
        row.add(sudoku[i][j]);
      } else {
        return [false, 'row', [i, j]];
      }
    }
  }

  // 检查每一列
  for (let j = 0; j < 9; j++) {
    const col = new Set();
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][j] === '0' || sudoku[i][j] === 0) {
        continue;
      }
      if (!col.has(sudoku[i][j])) {
        col.add(sudoku[i][j]);
      } else {
        return [false, 'col', [i, j]];
      }
    }
  }

  // 检查每一个3x3宫格
  const boxMap =  new Map();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxMap.set([i,j].toString(), new Set());
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === '0' || sudoku[i][j] === 0) {
        continue;
      }
      const box = boxMap.get([Math.floor(i/3),Math.floor(j/3)].toString());
      if (!box.has(sudoku[i][j])) {
        box.add(sudoku[i][j]);
      } else {
        return [false, 'box', [i, j]];
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
  return [count === 81, 'incomplete', []];
}


export function highLight(res, reason, loc) {
  if (!res) {
    console.log(loc);
    if (reason === 'row') {
      console.log('Row Error');
      for (const element of document.getElementsByClassName(`row-${loc[0]}`)) {
        blink(element);
      }
    } else if (reason === 'col') {
      console.log('Col Error');
      for (const element of document.getElementsByClassName(`col-${loc[1]}`)) {
        blink(element);
      }
    } else if (reason === 'box') {
      console.log('Box Error');
      for (const element of document.getElementsByClassName(`cell-${Math.floor(loc[0]/3)}-${Math.floor(loc[1]/3)}`)) {
        blink(element);
      }
    } else {
      console.log(reason);
    }
  }
}

export function blink(elem) {
  elem.style = 'border: 2px solid red';

  setTimeout(() => {
    elem.style = '';

    setTimeout(() => {
      elem.style = 'border: 2px solid red';

      setTimeout(() => {
        elem.style = '';
      }, 500);

    }, 500);

  }, 500);

}