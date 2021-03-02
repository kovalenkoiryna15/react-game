import * as t from './action-types';
import * as c from '~constants';

/*
** INITIAL STATE
*/

const initialState = {
  isLoading: false,
  alert: undefined,
  isSound: true,
  isMusic: true,
  isWelcomeVisible: false,
  isRecordsVisible: false,
  isFinishVisible: false,
  isOptionsVisible: false,
  shipColor: c.DEFAULT_SHIP_COLOR,
  bgImageUrl: c.DEFAULT_BACKGROUND_IMAGE_URL,
  bgUrls: c.BG_URLS,
};

/*
** HANDLERS
*/

const handlers = {
  [t.HIDE_LOADER]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.SHOW_LOADER]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.ALERT_MESSAGE]: (state, { payload }) => ({
    ...state,
    alert: payload,
  }),
  [t.CLEAR_ALERT_MESSAGE]: (state) => ({
    ...state,
    alert: '',
  }),
  [t.TOGGLE_WELCOME_MODAL]: (state) => ({
    ...state,
    isWelcomeVisible: !state.isWelcomeVisible,
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
  [t.RESET_SOUND]: (state) => ({
    ...state,
    isSound: !state.isSound,
  }),
  [t.RESET_MUSIC]: (state) => ({
    ...state,
    isMusic: !state.isMusic,
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
  DEFAULT: (state) => state,
};

const appReducer = (
  state = initialState, action,
) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default appReducer;
