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
export type AppDispatch = typeof store.dispatch;
export type State = {
  view?: {view: string},
  totalScore?: {totalScore: number},
  highScore?: {highScore: number},
  input?: {answer: string},
  score?: {score: number},
  scoreInterval?: {ID: number},
  results: {correct: number, results: Array<Results>},
  newHighScore: {madeHighScore: boolean},
  madeHighScore: {madeHighScore: boolean},
}
export type  Results = {
  value1: number,
  value2: number,
  answer: number,
  score: number,
  correct: boolean,
}
