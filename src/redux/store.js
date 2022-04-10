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
  setResultsReducer,
  openReviewReducer,
  activeResultReducer,
  highScoreReducer,
  newHighScoreReducer
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
    results: setResultsReducer,
    activeResult: activeResultReducer,
    openReview: openReviewReducer,
    highScore: highScoreReducer,
    madeHighScore: newHighScoreReducer
});

export const store = createStore(rootReducer);
