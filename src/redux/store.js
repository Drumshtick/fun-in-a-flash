import { createStore, combineReducers } from 'redux';
import {
  inputReducer,
  addendReducer,
  correctReducer,
  scoreReducer,
  questionReducer,
  totalScoreReducer,
  intervalReducer
} from './reducers/index';
const rootReducer = combineReducers({
    input: inputReducer,
    addend: addendReducer,
    answerCorrect: correctReducer,
    score: scoreReducer,
    totalScore: totalScoreReducer,
    question: questionReducer,
    interval: intervalReducer
});

export const store = createStore(rootReducer);
