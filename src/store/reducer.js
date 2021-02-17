import { combineReducers } from 'redux';

import gameReducer from '~store/game/reducer';

const rootReducer = combineReducers({
  game: gameReducer,
  // user: userReducer,
});

export default rootReducer;
