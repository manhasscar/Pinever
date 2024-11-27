import { combineReducers } from 'redux';
import gameScore from '../modules/gameScore';

const rootReducer = combineReducers({
  gameScore: gameScore,
});

export default rootReducer;
