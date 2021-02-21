import {
  GET_ROWS_SUCCESS,
  GET_ROWS_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
  SET_RANDOM_SHIP_POSITIONS,
} from './actions-constants';
import {
  PLAYER1,
  PLAYER2,
} from '~constants';

const initialState = {
  [PLAYER1]: {
    rows: {},
  },
  [PLAYER2]: {
    rows: {},
  },
  isLoading: false,
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
