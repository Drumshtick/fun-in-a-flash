import { createStore, combineReducers } from 'redux';
import {
  inputReducer,
  addendReducer,
  correctReducer,
  scoreReducer,
} from './reducers/index';
const rootReducer = combineReducers({
    input: inputReducer,
    addend: addendReducer,
    answerCorrect: correctReducer,
    score: scoreReducer
});

export const store = createStore(rootReducer);
