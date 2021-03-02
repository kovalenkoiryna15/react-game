import { combineReducers } from 'redux';

import gameReducer from '~store/game/reducer';
import appReducer from '~store/app/reducer';

const rootReducer = combineReducers({
  game: gameReducer,
  app: appReducer,
});

export default rootReducer;
