import {
  upperCaseAlp,
  HERE_IS_SEE,
  HERE_IS_BUFFER,
  HERE_IS_SHIP,
  NUM_MINI_SHIPS,
  NUM_SMALL_SHIPS,
  NUM_MEDIUM_SHIPS,
  NUM_BIG_SHIPS,
  NUM_CELLS_MINI_SHIPS,
  NUM_CELLS_SMALL_SHIPS,
  NUM_CELLS_MEDIUM_SHIPS,
  NUM_CELLS_BIG_SHIPS,
  VERTICAL,
  HORIZONTAL,
} from '~constants';

function createEmptyRows(size, cols) {
  const rows = [];
  const colNotations = cols.map((col) => [col, col]);
  rows.push(colNotations);
  for (let a = 1; a <= size; a += 1) {
    const row = [];
    for (let b = 0; b < size; b += 1) {
      const value = 0;
      row.push([cols[b], value]);
    }
    rows.push(row);
  }
  rows.push(colNotations);
  return rows;
  /*
  [
    [
      [ 'A', 'A' ], [ 'B', 'B' ], [ 'C', 'C' ], [ 'D', 'D' ], [ 'E', 'E' ], [ 'F', 'F' ]...
    ],
    [
      [ 'A', 0 ], [ 'B', 0 ], [ 'C', 0 ], [ 'D', 0 ], [ 'E', 0 ], [ 'F', 0 ], [ 'G', 0 ]...
    ],
  ]
  */
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomAlignment() {
  const alignments = [VERTICAL, HORIZONTAL];
  const alignment = getRandomInt(2);
  return alignments[alignment];
}

function getRandomCol(cols /* [ "A", "B"...] */, checkedCols = []) {
  let col;
  if (checkedCols.length) {
    const colIndex = getRandomInt(cols.length);
    col = cols[colIndex];
    if (checkedCols.includes(col)) {
      col = getRandomCol(cols, checkedCols);
    }
  } else {
    const colIndex = getRandomInt(cols.length);
    col = cols[colIndex];
  }
  return col;
}

function getRandomRow(size, checkedRows = []) {
  let row;
  if (checkedRows.length) {
    row = (getRandomInt(size) + 1);
    if (checkedRows.includes(row)) {
      row = getRandomRow(size, checkedRows);
    }
  } else {
    row = getRandomInt(size) + 1;
  }
  return row;
}

function getBufferCells(size, rows, positions, align) {
  const cells = [];
  const cols = [...rows[0]].map((col) => col[0]);
  if (align === VERTICAL) {
    positions.forEach((position /* [ '1', [ 'A', 0] ] */, index, array) => {
      const col = position[1][0];
      const colIndex = cols.indexOf(col);
      const cellRow = position[0];
      if ((colIndex - 1) > 0) {
        cells.push([cellRow, [cols[colIndex - 1], HERE_IS_BUFFER]]);
      }
      if ((colIndex + 1) < size) {
        cells.push([cellRow, [cols[colIndex + 1], HERE_IS_BUFFER]]);
      }
      if (index === 0 && (cellRow - 1) > 0) {
        cells.push([cellRow - 1, [col, HERE_IS_BUFFER]]);
        if ((colIndex - 1) > 0) {
          cells.push([cellRow - 1, [cols[colIndex - 1], HERE_IS_BUFFER]]);
        }
        if ((colIndex + 1) < size) {
          cells.push([cellRow - 1, [cols[colIndex + 1], HERE_IS_BUFFER]]);
        }
      }
      if (index === (array.length - 1) && (cellRow + 1) < size) {
        cells.push([cellRow + 1, [col, HERE_IS_BUFFER]]);
        if ((colIndex - 1) > 0) {
          cells.push([cellRow + 1, [cols[colIndex - 1], HERE_IS_BUFFER]]);
        }
        if ((colIndex + 1) < size) {
          cells.push([cellRow + 1, [cols[colIndex + 1], HERE_IS_BUFFER]]);
        }
      }
    });
  }
  if (align === HORIZONTAL) {
    positions.forEach((position /* [ '1', [ 'A', 0] ] */, index, array) => {
      const col = position[1][0];
      const colIndex = cols.indexOf(col);
      const cellRow = position[0];
      if ((cellRow - 1) > 0) {
        cells.push([cellRow - 1, [col, HERE_IS_BUFFER]]);
      }
      if ((cellRow + 1) < size) {
        cells.push([cellRow + 1, [col, HERE_IS_BUFFER]]);
      }
      if (index === 0 && (colIndex - 1) > 0) {
        cells.push([cellRow, [cols[colIndex - 1], HERE_IS_BUFFER]]);
        if ((cellRow - 1) > 0) {
          cells.push([cellRow - 1, [cols[colIndex - 1], HERE_IS_BUFFER]]);
        }
        if ((cellRow + 1) < size) {
          cells.push([cellRow + 1, [cols[colIndex - 1], HERE_IS_BUFFER]]);
        }
      }
      if (index === (array.length - 1) && (colIndex + 1) < size) {
        cells.push([cellRow, [cols[colIndex + 1], HERE_IS_BUFFER]]);
        if ((cellRow - 1) > 0) {
          cells.push([cellRow - 1, [cols[colIndex + 1], HERE_IS_BUFFER]]);
        }
        if ((cellRow + 1) < size) {
          cells.push([cellRow + 1, [cols[colIndex + 1], HERE_IS_BUFFER]]);
        }
      }
    });
  }
  return cells;
}

function getVerticalPositions(size, rows, col, cellsNum) {
  const cells = [];
  for (let i = 1; i <= size && cells.length < cellsNum; i += 1) {
    for (let a = 0; i < size && cells.length < cellsNum; i += 1) {
      if (rows[i][a][0] === col && rows[i][a][1] === HERE_IS_SEE) {
        cells.push([i, [rows[i][a][0], HERE_IS_SHIP]]);
      }
    }
  }
  if (cells.length !== cellsNum) {
    cells.length = 0;
    return cells;
  }
  const bufferCells = getBufferCells(size, rows, cells, VERTICAL);
  return [...cells, ...bufferCells];
}

function getHorizontalPositions(size, rows, row, cellsNum) {
  const cells = [];
  for (let i = 0; i < size && cells.length < cellsNum; i += 1) {
    if (rows[row][i][1] === HERE_IS_SEE) {
      cells.push([row, [rows[row][i][0], HERE_IS_SHIP]]);
    }
  }
  if (cells.length !== cellsNum) {
    cells.length = 0;
    return cells;
  }
  const bufferCells = getBufferCells(size, rows, cells, HORIZONTAL);
  return [...cells, ...bufferCells];
}

function getShipPosition(size, rows, cellsNum, align = undefined) {
  let alignment = align;
  if (alignment === HORIZONTAL) {
    alignment = VERTICAL;
  } else if (alignment === VERTICAL) {
    alignment = HORIZONTAL;
  } else {
    alignment = getRandomAlignment();
  }

  let cellPositions = [];

  if (alignment === VERTICAL) {
    const cols = [...rows[0]].map((col) => col[0]); /* [ "A", "B"...] */
    let col = getRandomCol(cols);
    const checkedCols = [];
    checkedCols.push(col);
    cellPositions = getVerticalPositions(size, rows, col, cellsNum);
    while (checkedCols.length !== size && !cellPositions[0]) {
      col = getRandomCol(cols, checkedCols);
      checkedCols.push(col);
      cellPositions = getVerticalPositions(size, rows, col, cellsNum);
    }
    if (!cellPositions[0]) {
      const checkedRows = [];
      let row = getRandomRow(size);
      checkedRows.push(row);
      cellPositions = getHorizontalPositions(size, rows, row, cellsNum);
      while (checkedRows.length !== size && !cellPositions[0]) {
        row = getRandomRow(size, checkedRows);
        checkedRows.push(row);
        cellPositions = getHorizontalPositions(size, rows, row, cellsNum);
      }
      if (!cellPositions[0]) {
        return cellPositions;
      }
    }
  }

  if (alignment === HORIZONTAL) {
    const checkedRows = [];
    let row = getRandomRow(size);
    checkedRows.push(row);
    cellPositions = getHorizontalPositions(size, rows, row, cellsNum);
    while (checkedRows.length !== size && !cellPositions[0]) {
      row = getRandomRow(size, checkedRows);
      checkedRows.push(row);
      cellPositions = getHorizontalPositions(size, rows, row, cellsNum);
    }
    if (!cellPositions[0]) {
      const cols = [...rows[0]].map((col) => col[0]); /* [ "A", "B"...] */
      let col = getRandomCol(cols);
      const checkedCols = [];
      checkedCols.push(col);
      cellPositions = getVerticalPositions(size, rows, col, cellsNum);
      while (checkedCols.length !== size && !cellPositions[0]) {
        col = getRandomCol(cols, checkedCols);
        checkedCols.push(col);
        cellPositions = getVerticalPositions(size, rows, col, cellsNum);
      }
      if (!cellPositions[0]) {
        return cellPositions;
      }
    }
  }
  return cellPositions;
}

function getShips() {
  const ships = [];
  for (let i = 0; i < NUM_BIG_SHIPS; i += 1) {
    ships.push({ cellsNum: NUM_CELLS_BIG_SHIPS });
  }
  for (let i = 0; i < NUM_MEDIUM_SHIPS; i += 1) {
    ships.push({ cellsNum: NUM_CELLS_MEDIUM_SHIPS });
  }
  for (let i = 0; i < NUM_SMALL_SHIPS; i += 1) {
    ships.push({ cellsNum: NUM_CELLS_SMALL_SHIPS });
  }
  for (let i = 0; i < NUM_MINI_SHIPS; i += 1) {
    ships.push({ cellsNum: NUM_CELLS_MINI_SHIPS });
  }
  return ships;
}

function updateRows(rows, cellPositions) {
  let newRows = [...rows];
  cellPositions.forEach((position /* ['1', ['A', 0] */) => {
    newRows = newRows.map((row, index) => {
      if (index === position[0]) {
        const newRow = row.map((col) => {
          if (col[0] === position[1][0]) {
            return position[1];
          }
          return col;
        });
        return newRow;
      }
      return row;
    });
  });
  return newRows;
}

export default function randomizeShips(size) {
  const cols = upperCaseAlp.slice(0, size);
  let rows = createEmptyRows(size, cols);
  const ships = getShips();
  for (let i = 0; i < ships.length; i += 1) {
    let cellPositions = getShipPosition(size, rows, ships[i].cellsNum);
    if (!cellPositions[0]) {
      i = 0;
      cellPositions = getShipPosition(size, rows, ships[i].cellsNum);
    }
    rows = updateRows(rows, cellPositions);
  }
  const rowsWithShips = Object.fromEntries(
    rows.map((row, index) => [index, Object.fromEntries(row)]),
  );
  return rowsWithShips;
}
