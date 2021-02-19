import { database } from '../src/firebase';

import {
  GET_ROWS_SUCCESS,
  GET_ROWS_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
} from './constants';

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
