import * as t from './action-types';

export const resetSound = () => ({
  type: t.RESET_SOUND,
  payload: undefined,
});

export const resetMusic = () => ({
  type: t.RESET_MUSIC,
  payload: undefined,
});

export const toggleWelcomeModal = () => ({
  type: t.TOGGLE_WELCOME_MODAL,
  payload: undefined,
});

export const toggleRecordsModal = () => ({
  type: t.TOGGLE_RECORDS_MODAL,
  payload: undefined,
});

export const toggleFinishModal = () => ({
  type: t.TOGGLE_FINISH_MODAL,
  payload: undefined,
});

export const toggleOptionsModal = () => ({
  type: t.TOGGLE_OPTIONS_MODAL,
  payload: undefined,
});

export const refreshBackground = () => ({
  type: t.REFRESH_BACKGROUND,
  payload: undefined,
});

export const selectShipColor = (color) => ({
  type: t.REFRESH_SHIP_COLOR,
  payload: { color },
});

export const showLoader = () => ({
  type: t.SHOW_LOADER,
  payload: undefined,
});

export const hideLoader = () => ({
  type: t.HIDE_LOADER,
  payload: undefined,
});

export const alertError = (message) => ({
  type: t.ALERT_MESSAGE,
  payload: message,
});

export const clearAlertMessage = () => ({
  type: t.CLEAR_ALERT_MESSAGE,
  payload: undefined,
});
