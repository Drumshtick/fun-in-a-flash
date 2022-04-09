import { createStore, combineReducers } from 'redux';
import {
  inputReducer,
  addendReducer,
  correctReducer,
  scoreReducer,
  questionReducer,
  totalScoreReducer,
  intervalReducer,
  viewReducer,
} from './reducers/index';
const rootReducer = combineReducers({
    input: inputReducer,
    addend: addendReducer,
    answerCorrect: correctReducer,
    score: scoreReducer,
    totalScore: totalScoreReducer,
    question: questionReducer,
    interval: intervalReducer,
    view: viewReducer,
});

export const store = createStore(rootReducer);
