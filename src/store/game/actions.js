import * as c from '~constants';
import * as t from './action-types';

import { showLoader, hideLoader, alertError } from '~store/app/actions';
import randomizeShips from '~utils';
import { setLocal, getLocal } from '~utils/localStorage-helpers';
import getRandomAttack from '~utils/auto-play';

export const resetIsPlaying = () => ({
  type: t.RESET_IS_PLAYING,
  payload: undefined,
});

export const setRandomShipPositions = (
  player, rows,
) => ({
  type: t.SET_RANDOM_SHIP_POSITIONS,
  payload: { player, rows },
});

export const resetAutoPlay = () => ({
  type: t.RESET_AUTO_PLAY,
  payload: undefined,
});

export const resetIsShipNumValid = () => ({
  type: t.RESET_VALID_SHIP_NUM,
  payload: undefined,
});

export const countAttacks = (player) => ({
  type: t.COUNT_ATTACK,
  payload: { player },
});

export const countFired = (player) => ({
  type: t.COUNT_FIRED_SHIPS,
  payload: { player },
});

export const setRandom = (
  player, numMiniShip, numSmallShip, numMediumShip, numBigShip, size = c.BOARD_SIZE,
) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const rows = await randomizeShips(size, numMiniShip, numSmallShip, numMediumShip, numBigShip);
    dispatch(setRandomShipPositions(player, rows));
    dispatch(hideLoader());
  } catch (error) {
    throw new Error(error);
  }
};

export const getHit = (id, num, player) => ({
  type: t.HIT_SHIP,
  payload: { id, num, player },
});

export const missHit = (id, num, player) => ({
  type: t.MISS_HIT,
  payload: { id, num, player },
});

export const setRandomAttack = (enemy, num, id, value) => ({
  type: t.AUTO_ATTACK,
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
  type: t.RESET_ACTIVE_PLAYER,
  payload: undefined,
});

export const resetProgress = () => ({
  type: t.RESET_PROGRESS,
  payload: undefined,
});

export const resetLife = ({ player, fired }) => ({
  type: t.RESET_LIFE,
  payload: { player, fired },
});

export const resetShipNum = (type, value) => ({
  type: t.RESET_SHIP_NUM,
  payload: { type, value },
});

export const resetGame = () => async (dispatch) => {
  try {
    dispatch(resetActivePlayer());
    dispatch(resetProgress());
  } catch (error) {
    throw new Error(error);
  }
};

export const writeSuccess = () => ({
  type: t.WRITE_SUCCESS,
  payload: undefined,
});

export const writeFailure = () => ({
  type: t.WRITE_FAILURE,
  payload: undefined,
});

export const readSuccess = () => ({
  type: t.READ_SUCCESS,
  payload: undefined,
});

export const readFailure = () => ({
  type: t.READ_FAILURE,
  payload: undefined,
});

export const resetValidShipNum = (num) => ({
  type: t.RESET_VALID_SHIP_NUM,
  payload: num,
});

export const gameOver = () => ({
  type: t.GAME_OVER,
  payload: undefined,
});

export const saveToRecords = () => ({
  type: t.SAVE_TO_RECORDS,
  payload: undefined,
});

export const validateShipsNum = (miniShip, smallShip, mediumShip, bigShip) => async (dispatch) => {
  if (+miniShip === 0 && +smallShip === 0 && +mediumShip === 0 && +bigShip === 0) {
    dispatch(alertError('Minimum ship count 1. Please select at least 1 ship.'));
  } else {
    const num = +miniShip + +smallShip + +mediumShip + +bigShip;
    dispatch(resetValidShipNum(num));
  }
};

export const writeLocal = (state, id) => async (dispatch) => {
  try {
    await setLocal(state, id);
    dispatch(writeSuccess());
  } catch {
    dispatch(writeFailure());
  }
};

export const setPlayerState = (player, newState) => ({
  type: t.SET_PLAYER_STATE,
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
  type: t.SET_GAME_STATE,
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
