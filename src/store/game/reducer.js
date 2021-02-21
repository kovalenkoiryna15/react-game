import {
  GET_ROWS_SUCCESS,
  GET_ROWS_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_RANDOM_SHIP_POSITIONS,
  HIT_SHIP,
  COUNT_ATTACK,
  MISS_HIT,
} from './actions-constants';
import {
  PLAYER1,
  PLAYER2,
  HERE_IS_FIRE,
  HERE_IS_LOSER,
} from '~constants';

const initialState = {
  [PLAYER1]: {
    rows: {},
    attacks: 0,
  },
  [PLAYER2]: {
    rows: {},
    attacks: 0,
  },
  isLoading: false,
  players: [PLAYER1, PLAYER2],
  // activePlayer: PLAYER1,
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
        attacks: state[player].attacks + 1,
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
    },
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
