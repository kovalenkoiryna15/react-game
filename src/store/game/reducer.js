import * as t from './actions-constants';
import * as c from '~constants';

/*
** INITIAL STATE
*/

const initialState = {
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
    shipCount: c.MAX_SHIP_COUNT,
  },
  [c.PLAYER2]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    name: c.PLAYER2_NAME,
    autoPlay: true,
    autoPlayAttack: {},
    lastAttackValue: c.HERE_IS_LOSER,
    progress: 100,
    shipCount: c.MAX_SHIP_COUNT,
  },
  isLoading: false,
  activePlayer: c.PLAYER1,
  user: c.PLAYER1,
  alert: undefined,
  storageKey: c.GAME_STORAGE_KEY,
  isSound: true,
  isPlaying: false,
  isRecordsVisible: false,
  isFinishVisible: false,
  isOptionsVisible: false,
  isShipNumValid: false,
  shipColor: c.DEFAULT_SHIP_COLOR,
  bgImageUrl: c.DEFAULT_BACKGROUND_IMAGE_URL,
  bgUrls: c.BG_URLS,
};

/*
** HANDLERS
*/

const handlers = {
  [t.SET_RANDOM_SHIP_POSITIONS]: (state, { payload: { rows, player } }) => ({
    ...state,
    [player]: {
      ...state[player],
      rows,
    },
  }),
  [t.COUNT_ATTACK]: (state, action) => {
    const player = action.payload;
    return {
      ...state,
      [player]: {
        ...state[player],
        attacksNum: state[player].attacksNum + 1,
      },
    };
  },
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
    if (value === c.HERE_IS_FIRE) {
      newActivePlayer = +!enemy;
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
  [t.ALERT_MESSAGE]: (state, { payload }) => ({
    ...state,
    alert: payload,
  }),
  [t.CLEAR_ALERT_MESSAGE]: (state) => ({
    ...state,
    alert: '',
  }),
  [t.RESET_VALID_SHIP_NUM]: (state) => ({
    ...state,
    isShipNumValid: !state.isShipNumValid,
  }),
  [t.HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.RESET_IS_PLAYING]: (state) => ({
    ...state,
    isPlaying: !state.isPlaying,
  }),
  [t.RESET_SHIP_NUM]: (state, { payload: { type, value } }) => ({
    ...state,
    [type]: {
      ...state[type],
      num: value,
    },
  }),
  [t.TOGGLE_RECORDS_MODAL]: (state) => ({
    ...state,
    isRecordsVisible: !state.isRecordsVisible,
  }),
  [t.TOGGLE_FINISH_MODAL]: (state) => ({
    ...state,
    isFinishVisible: !state.isFinishVisible,
  }),
  [t.TOGGLE_OPTIONS_MODAL]: (state) => ({
    ...state,
    isOptionsVisible: !state.isOptionsVisible,
  }),
  [t.RESET_ACTIVE_PLAYER]: (state) => ({
    ...state,
    activePlayer: c.PLAYER1,
  }),
  [t.REFRESH_BACKGROUND]: (state) => {
    const currentIndex = state.bgUrls.indexOf(state.bgImageUrl);
    let urlIndex = currentIndex + 1;
    if (urlIndex === state.bgUrls.length) {
      urlIndex = 0;
    }
    const url = state.bgUrls[urlIndex];
    return {
      ...state,
      bgImageUrl: url,
    };
  },
  [t.REFRESH_SHIP_COLOR]: (state, { payload: { color } }) => ({
    ...state,
    shipColor: color,
  }),
  [t.RESET_PROGRESS]: (state) => ({
    ...state,
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
      attacks: Array(0),
      attacksNum: 0,
      autoPlay: false,
      autoPlayAttack: {},
      lastAttackValue: c.HERE_IS_LOSER,
      progress: 100,
    },
    [c.PLAYER2]: {
      ...state[c.PLAYER2],
      attacks: Array(0),
      attacksNum: 0,
      autoPlay: true,
      autoPlayAttack: {},
      lastAttackValue: c.HERE_IS_LOSER,
      progress: 100,
    },
  }),
  [t.SET_GAME_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
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
