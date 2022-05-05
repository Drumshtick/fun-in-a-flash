interface GameStateTypes {
  addends: {
    value1: null | number,
    value2: null | number,
  },
  answerCorrect: boolean,
  questionCount: number
}

interface ActionTypes {
  type: string,
  value1?: number,
  value2?: number
}

interface QuestionCountAction {
  type: 'INCREASE_QUESTION_COUNT',
}

interface CorrectAnswerAction {
  type: 'CORRECT_ANSWER'
}

interface IncorrectAnswerAction {
  type: 'INCORRECT_ANSWER'
}

interface ResetCorrectAnswerAction {
  type: 'RESET_CORRECT_ANSWER'
}

interface SetAddendAction {
  type: 'SET_ADDENDS',
  value1: null | number,
  value2: null | number
}

const initGameState: GameStateTypes = {
  addends: {
    value1: null,
    value2: null,
  },
  answerCorrect: null,
  questionCount: 0
}


const gameStateReducer = (state: GameStateTypes, action: ActionTypes):  GameStateTypes => {
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

const INCREASE_QUESTION_COUNT = (): QuestionCountAction => ({ type: 'INCREASE_QUESTION_COUNT'});
const CORRECT_ANSWER = (): CorrectAnswerAction => ({ type: 'CORRECT_ANSWER'});
const INCORRECT_ANSWER = (): IncorrectAnswerAction => ({ type: 'INCORRECT_ANSWER'});
const RESET_CORRECT_ANSWER = (): ResetCorrectAnswerAction => ({ type: 'RESET_CORRECT_ANSWER'});
const SET_ADDENDS = (value1: number, value2: number): SetAddendAction => ({ type: 'SET_ADDENDS', value1, value2});

export {
  INCREASE_QUESTION_COUNT,
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  RESET_CORRECT_ANSWER,
  SET_ADDENDS,
  gameStateReducer,
  initGameState
};
