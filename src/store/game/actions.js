import { database } from '../src/firebase';

import {
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
} from './constants';

export const getBoardSuccess = (
  board,
) => ({
  type: GET_BOARD_SUCCESS,
  payload: board,
});

export const getBoardFailure = (error) => ({
  type: GET_BOARD_FAILURE,
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
