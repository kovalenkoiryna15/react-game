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
} from './actions-constants';

import randomizeShips from '~utils';

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
