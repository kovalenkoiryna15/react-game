import {
  upperCaseAlp,
  HERE_IS_SEE,
  HERE_IS_SHIP,
  HERE_IS_FIRE,
  HERE_IS_BUFFER,
  HERE_IS_LOSER,
} from '~constants';

function filterNoAttackedCells(rows, size) {
  const newRows = Object.entries(rows)
    .map((row) => [row[0], Object.entries(row[1])
      .filter((col) => col[1] === 0
        || col[1] === 2
        || col[1] === 1)]);
  let oneRow = newRows.slice(1, size + 1);
  oneRow = oneRow.map((row) => row[1]
    .map((col) => ({ num: row[0], id: col[0], value: col[1] })));

  return oneRow.reduce((newArray, position) => [...newArray, ...position], []);
}

function formateRows(rows) {
  const newRows = Object.entries(rows)
    .map((row) => [row[0], Object.entries(row[1])]);
  return newRows;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomPosition(cells) {
  let index = 0;
  if (cells.length > 1) {
    index = getRandomInt(cells.length);
  }
  const { value } = cells[index];
  let endValue;
  if (value === HERE_IS_SHIP) {
    endValue = HERE_IS_FIRE;
  }
  if (value === HERE_IS_SEE || value === HERE_IS_BUFFER) {
    endValue = HERE_IS_LOSER;
  }
  return { num: cells[index].num, id: cells[index].id, value: endValue };
}

function checkForHit(attacks) {
  attacks.reverse();
  let last4Attacks = [...attacks];
  if (attacks.length > 4) {
    last4Attacks = attacks.slice(0, 4);
  }
  const lastFired = last4Attacks.find((position) => position.value === HERE_IS_FIRE);
  if (lastFired) {
    return lastFired;
  }
  return 0;
}

function checkForSee(prevHit, rows, cols) {
  let top;
  let bottom;
  let left;
  let right;
  const noAttacked = [];
  if (prevHit.num + 1 < cols.length) {
    bottom = { num: prevHit.num + 1, id: prevHit.id };
    const cell = rows[bottom.num][1]
      .find((col) => (col[1] === HERE_IS_SEE || col[1] === HERE_IS_BUFFER
        || col[1] === HERE_IS_SHIP)
        && col[0] === bottom.id);
    if (cell) {
      noAttacked.push({ num: bottom.num, id: bottom.id, value: cell[1] });
    }
  }
  if (prevHit.num - 1 > 0) {
    top = { num: prevHit.num - 1, id: prevHit.id };
    const cell = rows[top.num][1]
      .find((col) => (col[1] === HERE_IS_SEE || col[1] === HERE_IS_BUFFER
        || col[1] === HERE_IS_SHIP)
        && col[0] === top.id);
    if (cell) {
      noAttacked.push({ num: top.num, id: top.id, value: cell[1] });
    }
  }
  if (cols.indexOf(prevHit.id) - 1 > 0) {
    left = { num: prevHit.num, id: cols[cols.indexOf(prevHit.id) - 1] };
    const cell = rows[left.num][1]
      .find((col) => (col[1] === HERE_IS_SEE || col[1] === HERE_IS_BUFFER
        || col[1] === HERE_IS_SHIP)
        && col[0] === left.id);
    if (cell) {
      noAttacked.push({ num: left.num, id: left.id, value: cell[1] });
    }
  }
  if (cols.indexOf(prevHit.id) + 1 < cols.length) {
    right = { num: prevHit.num, id: cols[cols.indexOf(prevHit.id) + 1] };
    const cell = rows[right.num][1]
      .find((col) => (col[1] === HERE_IS_SEE || col[1] === HERE_IS_BUFFER
        || col[1] === HERE_IS_SHIP)
        && col[0] === right.id);
    if (cell) {
      noAttacked.push({ num: right.num, id: right.id, value: cell[1] });
    }
  }
  return noAttacked;
}

export default function getRandomAttack(size, rows, attacks) {
  const cols = upperCaseAlp.slice(0, size);
  const noAttackedCells = filterNoAttackedCells(rows, size);

  // проверить 4 последние attacks с конца массива на наличие FIRE value
  // взять последнее попадание и проверить 4 соседние ячейки на атаки LOSER
  // если все LOSER - рандом, если нет - продолжить обстрел то есть стрелять туда где SEE

  let nextAttack;
  if (attacks.length) {
    const prevHit = checkForHit(attacks);
    if (prevHit) {
      const formattedRows = formateRows(rows, size);
      const noAttacked = checkForSee(prevHit, formattedRows, cols);
      if (!noAttacked.length) {
        nextAttack = getRandomPosition(noAttackedCells, size);
      } else {
        let index = 0;
        if (noAttacked.length > 1) {
          index = getRandomInt(noAttacked.length);
        }
        nextAttack = noAttacked[index];
        if (nextAttack.value === HERE_IS_SHIP) {
          nextAttack.value = HERE_IS_FIRE;
        }
        if (nextAttack.value === HERE_IS_SEE || nextAttack.value === HERE_IS_BUFFER) {
          nextAttack.value = HERE_IS_LOSER;
        }
      }
    } else {
      nextAttack = getRandomPosition(noAttackedCells, size);
    }
  } else {
    nextAttack = getRandomPosition(noAttackedCells, size);
  }
  return nextAttack;
}
