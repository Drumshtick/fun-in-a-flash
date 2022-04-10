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
  accuracyReducer,
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
    accuracy: accuracyReducer,
});

export const store = createStore(rootReducer);
