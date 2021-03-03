import * as t from './action-types';
import * as c from '~constants';

/*
** INITIAL STATE
*/

const initialState = {
  isPlaying: false,
  size: c.BOARD_SIZE,
  shipCount: c.MAX_SHIP_COUNT,
  [c.TYPE_MINI_SHIP]: {
    max: c.NUM_MINI_SHIPS,
    num: c.NUM_MINI_SHIPS,
    type: c.TYPE_MINI_SHIP,
    cells: c.NUM_CELLS_MINI_SHIPS,
  },
  [c.TYPE_SMALL_SHIP]: {
    max: c.NUM_SMALL_SHIPS,
    num: c.NUM_SMALL_SHIPS,
    type: c.TYPE_SMALL_SHIP,
    cells: c.NUM_CELLS_SMALL_SHIPS,
  },
  [c.TYPE_MEDIUM_SHIP]: {
    max: c.NUM_MEDIUM_SHIPS,
    num: c.NUM_MEDIUM_SHIPS,
    type: c.TYPE_MEDIUM_SHIP,
    cells: c.NUM_CELLS_MEDIUM_SHIPS,
  },
  [c.TYPE_BIG_SHIP]: {
    max: c.NUM_BIG_SHIPS,
    num: c.NUM_BIG_SHIPS,
    type: c.TYPE_BIG_SHIP,
    cells: c.NUM_CELLS_BIG_SHIPS,
  },
  players: [c.PLAYER1, c.PLAYER2],
  [c.PLAYER1]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    name: c.PLAYER1_NAME,
    autoPlay: false,
    autoPlayAttack: {},
    lastAttackValue: c.HERE_IS_LOSER,
    progress: 100,
    firedShips: 0,
  },
  [c.PLAYER2]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    name: c.PLAYER2_NAME,
    autoPlay: true,
    autoPlayAttack: {},
    lastAttackValue: c.HERE_IS_LOSER,
    progress: c.MAX_LIFE,
    firedShips: 0,
  },
  activePlayer: c.PLAYER1,
  user: c.PLAYER1,
  storageKey: c.GAME_STORAGE_KEY,
  isShipNumValid: false,
  isGameOver: false,
  records: [],
  actualShipNum: 0,
};

/*
** HANDLERS
*/

const handlers = {
  [t.RESET_IS_PLAYING]: (state) => ({
    ...state,
    isPlaying: !state.isPlaying,
  }),
  [t.SET_RANDOM_SHIP_POSITIONS]: (state, { payload: { rows, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows,
    },
  }),
  [t.COUNT_ATTACK]: (state, { payload: { player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      attacksNum: state[player].attacksNum + 1,
    },
  }),
  [t.COUNT_FIRED_SHIPS]: (state, { payload: { player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      firedShips: state[player].firedShips + 1,
    },
  }),
  [t.HIT_SHIP]: (state, { payload: { id, num, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows: {
        ...state[player].rows,
        [num]: {
          ...state[player].rows[num],
          [id]: c.HERE_IS_FIRE,
        },
      },
    },
    [state.activePlayer]: {
      ...state[state.activePlayer],
      attacks: [...state[state.activePlayer].attacks, { num, id, value: c.HERE_IS_LOSER }],
    },
  }),
  [t.MISS_HIT]: (state, { payload: { id, num, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows: {
        ...state[player].rows,
        [num]: {
          ...state[player].rows[num],
          [id]: c.HERE_IS_LOSER,
        },
      },
    },
    [state.activePlayer]: {
      ...state[state.activePlayer],
      attacks: [...state[state.activePlayer].attacks, { num, id, value: c.HERE_IS_LOSER }],
    },
    activePlayer: +!state.activePlayer,
  }),
  [t.AUTO_ATTACK]: (state, {
    payload: {
      enemy, num, id, value,
    },
  }) => {
    let newActivePlayer = enemy;
    let newFiredShips = state[enemy].firedShips;
    let newLife = state[enemy].progress;
    if (value === c.HERE_IS_FIRE) {
      newActivePlayer = +!enemy;
      newFiredShips += 1;
      newLife = ((state.actualShipNum - newFiredShips) * 100) / state.actualShipNum;
    }
    return {
      ...state,
      [enemy]: {
        ...state[enemy],
        rows: {
          ...state[enemy].rows,
          [num]: {
            ...state[enemy].rows[num],
            [id]: value,
          },
        },
        firedShips: newFiredShips,
        progress: newLife,
      },
      [+!enemy]: {
        ...state[+!enemy],
        lastAttackValue: value,
        attacks: [...state[+!enemy].attacks, { num, id, value }],
        attacksNum: state[+!enemy].attacksNum + 1,
      },
      activePlayer: newActivePlayer,
    };
  },
  [t.RESET_VALID_SHIP_NUM]: (state) => ({
    ...state,
    isShipNumValid: !state.isShipNumValid,
  }),
  [t.RESET_ACTUAL_SHIP_NUM]: (state, action) => ({
    ...state,
    actualShipNum: action.payload,
  }),
  [t.RESET_AUTO_PLAY]: (state) => ({
    ...state,
    [c.PLAYER1]: {
      ...state[c.PLAYER1],
      autoPlay: !state[c.PLAYER1].autoPlay,
    },
    [c.PLAYER2]: {
      ...state[c.PLAYER2],
      autoPlay: true,
    },
  }),
  [t.RESET_SHIP_NUM]: (state, { payload: { type, value } }) => ({
    ...state,
    [type]: {
      ...state[type],
      num: Number(value),
    },
  }),
  [t.RESET_ACTIVE_PLAYER]: (state) => ({
    ...state,
    activePlayer: c.PLAYER1,
  }),
  [t.RESET_LIFE]: (state, { payload: { player, fired } }) => {
    const newFired = fired + 1;
    const newLife = ((state.actualShipNum - newFired) * 100) / state.actualShipNum;
    return {
      ...state,
      [player]: {
        ...state[player],
        progress: newLife,
      },
    };
  },
  [t.SAVE_TO_RECORDS]: (state, { payload: { userAttacks, date, time } }) => {
    const newRecords = state.records;
    if (!newRecords.length) {
      newRecords.push({ userAttacks, date, time });
    }
    if (newRecords <= c.MAX_RECORDS_NUM) {
      newRecords.unshift({ userAttacks, date, time });
      for (let i = 1; i < newRecords.length; i += 1) {
        const current = newRecords[i];
        let j = i;
        while (j > 0 && newRecords[j - 1].userAttacks > current.userAttacks) {
          newRecords[j] = newRecords[j - 1];
          j -= 1;
        }
        newRecords[j] = current;
      }
      if (newRecords.length > 10) {
        newRecords.pop();
      }
    }
    return {
      ...state,
      records: newRecords,
    };
  },
  [t.RESET_PROGRESS]: (state) => ({
    ...state,
    isGameOver: false,
    [c.TYPE_MINI_SHIP]: {
      max: c.NUM_MINI_SHIPS,
      num: c.NUM_MINI_SHIPS,
      type: c.TYPE_MINI_SHIP,
      cells: c.NUM_CELLS_MINI_SHIPS,
    },
    [c.TYPE_SMALL_SHIP]: {
      max: c.NUM_SMALL_SHIPS,
      num: c.NUM_SMALL_SHIPS,
      type: c.TYPE_SMALL_SHIP,
      cells: c.NUM_CELLS_SMALL_SHIPS,
    },
    [c.TYPE_MEDIUM_SHIP]: {
      max: c.NUM_MEDIUM_SHIPS,
      num: c.NUM_MEDIUM_SHIPS,
      type: c.TYPE_MEDIUM_SHIP,
      cells: c.NUM_CELLS_MEDIUM_SHIPS,
    },
    [c.TYPE_BIG_SHIP]: {
      max: c.NUM_BIG_SHIPS,
      num: c.NUM_BIG_SHIPS,
      type: c.TYPE_BIG_SHIP,
      cells: c.NUM_CELLS_BIG_SHIPS,
    },
    [c.PLAYER1]: {
      ...state[c.PLAYER1],
      rows: {},
      name: c.PLAYER1_NAME,
      attacks: Array(0),
      attacksNum: 0,
      firedShips: 0,
      autoPlay: false,
      autoPlayAttack: {},
      lastAttackValue: c.HERE_IS_LOSER,
      progress: c.MAX_LIFE,
    },
    [c.PLAYER2]: {
      ...state[c.PLAYER2],
      rows: {},
      name: c.PLAYER2_NAME,
      attacks: Array(0),
      attacksNum: 0,
      firedShips: 0,
      autoPlay: true,
      autoPlayAttack: {},
      lastAttackValue: c.HERE_IS_LOSER,
      progress: c.MAX_LIFE,
    },
  }),
  [t.SET_GAME_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [t.GAME_OVER]: (state) => ({
    ...state,
    isGameOver: true,
  }),
  [t.SET_PLAYER_STATE]: (state, { payload: { player, newState } }) => ({
    ...state,
    [player]: {
      ...state.player,
      ...newState,
    },
  }),
  DEFAULT: (state) => state,
};

const gameReducer = (
  state = initialState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default gameReducer;
