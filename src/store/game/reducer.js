import {
  GET_ROWS_SUCCESS,
  GET_ROWS_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_RANDOM_SHIP_POSITIONS,
  HIT_SHIP,
  COUNT_ATTACK,
  MISS_HIT,
  AUTO_ATTACK,
} from './actions-constants';
import {
  PLAYER1,
  PLAYER2,
  HERE_IS_FIRE,
  HERE_IS_LOSER,
  PLAYER1_NAME,
  PLAYER2_NAME,
  BOARD_SIZE,
} from '~constants';

const initialState = {
  size: BOARD_SIZE,
  players: [PLAYER1, PLAYER2],
  [PLAYER1]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    turns: 1,
    name: PLAYER1_NAME,
    autoPlay: false,
    autoPlayAttack: {},
  },
  [PLAYER2]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    turns: 0,
    name: PLAYER2_NAME,
    autoPlay: true,
    autoPlayAttack: {},
  },
  isLoading: false,
  activePlayer: PLAYER1,
  user: PLAYER1,
  error: undefined,
};

const handlers = {
  [SET_RANDOM_SHIP_POSITIONS]: (state, { payload: { rows, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows,
    },
  }),
  [COUNT_ATTACK]: (state, action) => {
    const player = action.payload;
    return {
      ...state,
      [player]: {
        ...state[player],
        attacksNum: state[player].attacksNum + 1,
      },
    };
  },
  [HIT_SHIP]: (state, { payload: { id, num, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows: {
        ...state[player].rows,
        [num]: {
          ...state[player].rows[num],
          [id]: HERE_IS_FIRE,
        },
      },
      attacks: [...state[player].attacks, { num, id, value: HERE_IS_FIRE }],
    },
  }),
  [MISS_HIT]: (state, { payload: { id, num, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows: {
        ...state[player].rows,
        [num]: {
          ...state[player].rows[num],
          [id]: HERE_IS_LOSER,
        },
      },
      attacks: [...state[player].attacks, { num, id, value: HERE_IS_LOSER }],
    },
    [+!state.activePlayer]: {
      ...state[+!state.activePlayer],
      turns: state[+!state.activePlayer].turns + 1,
    },
    activePlayer: +!state.activePlayer,
    attacksNum: 0,
  }),
  [AUTO_ATTACK]: (state, {
    payload: {
      player, num, id, value,
    },
  }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows: {
        ...state[player].rows,
        [num]: {
          ...state[player].rows[num],
          [id]: value,
        },
      },
    },
    activePlayer: +!state.activePlayer,
  }),
  [GET_ROWS_SUCCESS]: (state, { payload: rows }) => ({
    ...state,
    rows,
  }),
  [GET_ROWS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
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
