const STARTING_QUESTIONS = parseInt(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS);

const initState = {
  questionNumber: 0
}

const questionReducer = (state = initState, action) => {

  if (action.type === 'INCREASE_QUESTION_COUNT') {
    return { questionNumber: state.questionNumber + 1 };
  }

  if (action.type === 'RESET_QUESTION_COUNT') {
    return { questionNumber: initialState.questionNumber };
  }

  return { questionNumber: state.questionNumber };
};

export default questionReducer;
