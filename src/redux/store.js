import { createStore, combineReducers } from 'redux';
import {
  inputReducer,
  scoreReducer,
  totalScoreReducer,
  scoreIntervalReducer,
  viewReducer,
  setResultsReducer,
  highScoreReducer,
  newHighScoreReducer,
} from './reducers/index';

export const rootReducer = combineReducers({
    input: inputReducer,
    score: scoreReducer,
    totalScore: totalScoreReducer,
    scoreInterval: scoreIntervalReducer,
    view: viewReducer,
    results: setResultsReducer,
    highScore: highScoreReducer,
    madeHighScore: newHighScoreReducer,
});

export const store = createStore(rootReducer);
