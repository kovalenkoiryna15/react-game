// import { database } from '../src/firebase';

import {
  // PLAYER1,
  // PLAYER2,
  BOARD_SIZE,
} from '~constants';
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

import randomizeShips from '~utils';
import getRandomAttack from '~utils/auto-play';

export const setRandomShipPositions = (
  player, rows,
) => ({
  type: SET_RANDOM_SHIP_POSITIONS,
  payload: { player, rows },
});

export const getRowsSuccess = (
  board,
) => ({
  type: GET_ROWS_SUCCESS,
  payload: board,
});

export const getRowsFailure = (error) => ({
  type: GET_ROWS_FAILURE,
  payload: error,
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
    dispatch(showLoader());
    const rows = await randomizeShips(size);
    dispatch(setRandomShipPositions(player, rows));
    dispatch(hideLoader());
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

export const setRandomAttack = (player, num, id, value) => ({
  type: AUTO_ATTACK,
  payload: {
    player, num, id, value,
  },
});

export const randomPlay = (player, size, rows, attacks) => async (dispatch) => {
  try {
    const array = await getRandomAttack(size, rows, attacks);
    array.forEach(({ num, id, value }) => dispatch(setRandomAttack(player, num, id, value)));
  } catch (error) {
    throw new Error(error);
  }
};
