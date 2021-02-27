import {
  HIDE_LOADER,
  SHOW_LOADER,
  SET_RANDOM_SHIP_POSITIONS,
  HIT_SHIP,
  COUNT_ATTACK,
  MISS_HIT,
  AUTO_ATTACK,
  RESET_ACTIVE_PLAYER,
  RESET_PROGRESS,
  ALERT_MESSAGE,
  SET_PLAYER_STATE,
  SET_GAME_STATE,
  RESET_IS_PLAYING,
  RESET_SOUND,
  TOGGLE_RECORDS_MODAL,
  TOGGLE_FINISH_MODAL,
} from './actions-constants';
import {
  PLAYER1,
  PLAYER2,
  HERE_IS_FIRE,
  HERE_IS_LOSER,
  PLAYER1_NAME,
  PLAYER2_NAME,
  BOARD_SIZE,
  GAME_STORAGE_KEY,
} from '~constants';

const initialState = {
  size: BOARD_SIZE,
  players: [PLAYER1, PLAYER2],
  [PLAYER1]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    name: PLAYER1_NAME,
    autoPlay: false,
    autoPlayAttack: {},
    lastAttackValue: HERE_IS_LOSER,
    progress: 100,
  },
  [PLAYER2]: {
    rows: {},
    attacks: [],
    attacksNum: 0,
    name: PLAYER2_NAME,
    autoPlay: true,
    autoPlayAttack: {},
    lastAttackValue: HERE_IS_LOSER,
    progress: 100,
  },
  isLoading: false,
  isPlaying: false,
  activePlayer: PLAYER1,
  user: PLAYER1,
  alert: undefined,
  storageKey: GAME_STORAGE_KEY,
  isSound: true,
  isRecordsVisible: false,
  isFinishVisible: false,
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
    },
    [state.activePlayer]: {
      ...state[state.activePlayer],
      attacks: [...state[state.activePlayer].attacks, { num, id, value: HERE_IS_LOSER }],
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
    [state.activePlayer]: {
      ...state[state.activePlayer],
      attacks: [...state[state.activePlayer].attacks, { num, id, value: HERE_IS_LOSER }],
    },
    activePlayer: +!state.activePlayer,
  }),
  [AUTO_ATTACK]: (state, {
    payload: {
      enemy, num, id, value,
    },
  }) => {
    let newActivePlayer = enemy;
    if (value === HERE_IS_FIRE) {
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
  [ALERT_MESSAGE]: (state, { payload }) => ({
    ...state,
    alert: payload,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [RESET_IS_PLAYING]: (state) => ({
    ...state,
    isPlaying: true,
  }),
  [RESET_SOUND]: (state) => ({
    ...state,
    isSound: !state.isSound,
  }),
  [TOGGLE_RECORDS_MODAL]: (state) => ({
    ...state,
    isRecordsVisible: !state.isRecordsVisible,
  }),
  [TOGGLE_FINISH_MODAL]: (state) => ({
    ...state,
    isFinishVisible: !state.isFinishVisible,
  }),
  [RESET_ACTIVE_PLAYER]: (state) => ({
    ...state,
    activePlayer: PLAYER1,
  }),
  [RESET_PROGRESS]: (state) => ({
    ...state,
    [PLAYER1]: {
      ...state[PLAYER1],
      attacks: Array(0),
      attacksNum: 0,
      autoPlay: false,
      autoPlayAttack: {},
      lastAttackValue: HERE_IS_LOSER,
      progress: 100,
    },
    [PLAYER2]: {
      ...state[PLAYER2],
      attacks: Array(0),
      attacksNum: 0,
      autoPlay: true,
      autoPlayAttack: {},
      lastAttackValue: HERE_IS_LOSER,
      progress: 100,
    },
  }),
  [SET_GAME_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_PLAYER_STATE]: (state, { payload: { player, newState } }) => ({
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
