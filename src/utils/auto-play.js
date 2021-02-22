import {
  upperCaseAlp,
  HERE_IS_SEE,
  HERE_IS_SHIP,
  HERE_IS_FIRE,
  HERE_IS_BUFFER,
} from '~constants';

function filterNoAttackedCells(rows, size) {
  const newRows = Object.entries(rows)
    .map((row) => [row[0], Object.entries(row[1])
      .filter((col) => col[1] === HERE_IS_SEE
        || col[1] === HERE_IS_SHIP
        || col[1] === HERE_IS_BUFFER)]);
  return newRows.slice(1, size + 1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCol(row) {
  return getRandomInt(row.length);
}

function getRandomRow(size) {
  return getRandomInt(size);
}

function getRandomPosition(cells, size) {
  const num = getRandomRow(size);
  const id = getRandomCol(cells[num]);
  return { num: num + 1, id: cells[num][1][id][0], value: 1 /* ????? */ };
}

function checkForHit(attacks) {
  const last4Attacks = attacks.slice(attacks.length - 4, attacks.length);
  return last4Attacks.reverse().find((position) => position.value === HERE_IS_FIRE);
}

function checkForSee(prevHit, noAttackedCells, cols) {
  let top;
  let bottom;
  let left;
  let right;
  const noAttacked = [];
  if (prevHit.num + 1 < cols.length) {
    bottom = { num: prevHit.num + 1, id: prevHit.id };
    const cell = noAttackedCells[bottom.num][1]
      .filter((col) => col[1] === HERE_IS_SEE && col[0] === bottom.id);
    noAttacked.push(cell);
  }
  if (prevHit.num - 1 > 0) {
    top = { num: prevHit.num - 1, id: prevHit.id };
    const cell = noAttackedCells[top.num][1]
      .filter((col) => col[1] === HERE_IS_SEE && col[0] === top.id);
    noAttacked.push(cell);
  }
  if (cols.indexOf(prevHit.id) - 1 > 0) {
    left = { num: prevHit.num, id: cols[cols.indexOf(prevHit.id) - 1] };
    const cell = noAttackedCells[left.num][1]
      .filter((col) => col[1] === HERE_IS_SEE && col[0] === left.id);
    noAttacked.push(cell);
  }
  if (cols.indexOf(prevHit.id) + 1 < cols.length) {
    right = { num: prevHit.num, id: cols[cols.indexOf(prevHit.id) + 1] };
    const cell = noAttackedCells[right.num][1]
      .filter((col) => col[1] === HERE_IS_SEE && col[0] === right.id);
    noAttacked.push(cell);
  }
  return noAttacked;
}

export default function getRandomAttack(size, rows, attacks) {
  const cols = upperCaseAlp.slice(0, size);
  const noAttackedCells = filterNoAttackedCells(rows, size);

  // проверить 4 последние attacks с конца массива на наличие FIRE value
  // взять последнее попадание и проверить 4 соседние ячейки на атаки LOSER
  // если все LOSER - рандом, если нет - продолжить обстрел то есть стрелять туда где SEE

  const nextAttacks = [];
  if (attacks.length) {
    const prevHit = checkForHit(attacks);
    const nonCheckedCells = checkForSee(prevHit, noAttackedCells, cols);
    if (!nonCheckedCells.length) {
      const nextAttack = getRandomPosition(noAttackedCells, size);
      // вставить value, если попадание
      // обновить noAttackedCells
      // вызвать снова getRandomPosition
      nextAttacks.push(nextAttack);
    } else {
      const index = 0;
      const nextAttack = nonCheckedCells[index];
      // вставить value, если попадание
      // обновить noAttackedCells
      // вызвать снова getRandomPosition
      nextAttacks.push(nextAttack);
    }
  } else {
    const nextAttack = getRandomPosition(noAttackedCells, size);
    // вставить value, если попадание
    // обновить noAttackedCells
    // вызвать снова getRandomPosition
    nextAttacks.push(nextAttack);
  }
  return nextAttacks;
}
