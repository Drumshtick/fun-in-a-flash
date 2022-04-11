import { createStore, combineReducers } from 'redux';
import {
  inputReducer,
  addendReducer,
  correctReducer,
  scoreReducer,
  questionReducer,
  totalScoreReducer,
  scoreIntervalReducer,
  viewReducer,
  accuracyReducer,
  setResultsReducer,
  openReviewReducer,
  activeResultReducer,
  highScoreReducer,
  newHighScoreReducer,
  lottieReducer
} from './reducers/index';

const rootReducer = combineReducers({
    input: inputReducer,
    addend: addendReducer,
    answerCorrect: correctReducer,
    score: scoreReducer,
    totalScore: totalScoreReducer,
    question: questionReducer,
    scoreInterval: scoreIntervalReducer,
    view: viewReducer,
    accuracy: accuracyReducer,
    results: setResultsReducer,
    activeResult: activeResultReducer,
    openReview: openReviewReducer,
    highScore: highScoreReducer,
    madeHighScore: newHighScoreReducer,
    lottie: lottieReducer,
});

export const store = createStore(rootReducer);
