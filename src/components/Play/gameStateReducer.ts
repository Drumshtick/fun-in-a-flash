interface GameStateTypes {
  addends: {
    value1: null | number,
    value2: null | number,
  },
  answerCorrect: boolean,
  questionCount: number
}

interface actionTypes {
  type: string,
  value1?: null | number,
  value2?: null | number
}

const initGameState: GameStateTypes = {
  addends: {
    value1: null,
    value2: null,
  },
  answerCorrect: null,
  questionCount: 0
}


const gameStateReducer = (state, action: actionTypes):  GameStateTypes => {
  if (action.type === 'INCREASE_QUESTION_COUNT') {
    return { ...state, questionCount: state.questionCount + 1 }
  }

  if (action.type === 'CORRECT_ANSWER') {
    return { ...state, answerCorrect: true };
  }

  if (action.type === 'INCORRECT_ANSWER') {
    return { ...state, answerCorrect: false };
  }

  if (action.type === 'RESET_CORRECT_ANSWER') {
    return { ...state, answerCorrect: null };
  }

  if (action.type === 'SET_ADDENDS') {
    return { ...state, addends: {value1: action.value1, value2: action.value2} };
  }

  return state;
};

const INCREASE_QUESTION_COUNT = (): actionTypes => ({ type: 'INCREASE_QUESTION_COUNT'});
const CORRECT_ANSWER = (): actionTypes => ({ type: 'CORRECT_ANSWER'});
const INCORRECT_ANSWER = (): actionTypes => ({ type: 'INCORRECT_ANSWER'});
const RESET_CORRECT_ANSWER = (): actionTypes => ({ type: 'RESET_CORRECT_ANSWER'});
const SET_ADDENDS = (value1, value2): actionTypes => ({ type: 'SET_ADDENDS', value1, value2});

export {
  INCREASE_QUESTION_COUNT,
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  RESET_CORRECT_ANSWER,
  SET_ADDENDS,
  gameStateReducer,
  initGameState
};
