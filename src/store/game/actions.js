import {
  BOARD_SIZE,
} from '~constants';
import {
  HIDE_LOADER,
  SHOW_LOADER,
  SET_RANDOM_SHIP_POSITIONS,
  HIT_SHIP,
  COUNT_ATTACK,
  MISS_HIT,
  AUTO_ATTACK,
  RESET_ACTIVE_PLAYER,
  WRITE_SUCCESS,
  WRITE_FAILURE,
  READ_SUCCESS,
  READ_FAILURE,
  ALERT_MESSAGE,
  SET_PLAYER_STATE,
  SET_GAME_STATE,
} from './actions-constants';

import randomizeShips from '~utils';
import { setLocal, getLocal } from '~utils/localStorage-helpers';
import getRandomAttack from '~utils/auto-play';

export const setRandomShipPositions = (
  player, rows,
) => ({
  type: SET_RANDOM_SHIP_POSITIONS,
  payload: { player, rows },
});

export const showLoader = () => ({
  type: SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
  payload: undefined,
});

export const countAttacks = (player) => ({
  type: COUNT_ATTACK,
  payload: player,
});

export const setRandom = (player, size = BOARD_SIZE) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const rows = await randomizeShips(size);
    dispatch(setRandomShipPositions(player, rows));
    dispatch(hideLoader());
  } catch (error) {
    throw new Error(error);
  }
};

export const getHit = (id, num, player) => ({
  type: HIT_SHIP,
  payload: { id, num, player },
});

export const missHit = (id, num, player) => ({
  type: MISS_HIT,
  payload: { id, num, player },
});

export const setRandomAttack = (enemy, num, id, value) => ({
  type: AUTO_ATTACK,
  payload: {
    enemy, num, id, value,
  },
});

export const randomPlay = (enemy, size, rows, attacks) => async (dispatch) => {
  try {
    const { num, id, value } = await getRandomAttack(size, rows, attacks);
    dispatch(setRandomAttack(enemy, num, id, value));
  } catch (error) {
    throw new Error(error);
  }
};

export const resetActivePlayer = () => ({
  type: RESET_ACTIVE_PLAYER,
  payload: undefined,
});

export const resetGame = () => async (dispatch) => {
  try {
    dispatch(resetActivePlayer());
  } catch (error) {
    throw new Error(error);
  }
};

export const writeSuccess = () => ({
  type: WRITE_SUCCESS,
  payload: undefined,
});

export const writeFailure = () => ({
  type: WRITE_FAILURE,
  payload: undefined,
});

export const readSuccess = () => ({
  type: READ_SUCCESS,
  payload: undefined,
});

export const readFailure = () => ({
  type: READ_FAILURE,
  payload: undefined,
});

export const alertError = (message) => ({
  type: ALERT_MESSAGE,
  payload: message,
});

export const writeLocal = (state, id) => async (dispatch) => {
  try {
    await setLocal(state, id);
    dispatch(writeSuccess());
  } catch {
    dispatch(writeFailure());
  }
};

export const setPlayerState = (player, newState) => ({
  type: SET_PLAYER_STATE,
  payload: { player, newState },
});

export const readLocalPlayerState = (player) => async (dispatch) => {
  try {
    const response = await getLocal(player);
    const { game } = await response.json();
    dispatch(setPlayerState(player, game[player]));
    dispatch(readSuccess());
  } catch (error) {
    dispatch(readFailure());
    dispatch(alertError(error.toString()));
  }
};

export const setGameState = (state) => ({
  type: SET_GAME_STATE,
  payload: state,
});

export const readLocalGameState = (key) => async (dispatch) => {
  try {
    const response = await getLocal(key);
    const { game } = await response.json();
    dispatch(setGameState(game[key]));
    dispatch(readSuccess());
  } catch (error) {
    dispatch(readFailure());
    dispatch(alertError(error.toString()));
  }
};
