const initState = {
  results: [], 
  correct: 0
};

const setResultsReducer = (state = initState, action) => {

  const types = {
    PUSH_QUESTION: () => ({
      results: [
        ...state.results,
        action.value
      ],
        correct: state.correct
      }),
      PUSH_CORRECT_QUESTION: () => ({
      results: [
        ...state.results,
        action.value
      ],
        correct: state.correct + 1
      }),
    RESET_RESULTS: () => ({ results: initState.results, correct: initState.correct })
  }

  return !types[action.type] ? state : types[action.type]();
  
};

export default setResultsReducer;
