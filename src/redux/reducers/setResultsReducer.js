const initState = {
  results: [
  {
    value1: 13,
    value2: 6,
    answer: 19,
    score: 180
  },
  {
    value1: 12,
    value2: 5,
    answer: 17,
    score: 170
  }
  ]
};

const setResultsReducer = (state = initState, action) => {

  if (action.type === 'PUSH_QUESTION') {
    return {
      results: [...state.results, action.value]
    };
  }

  if (action.type === 'RESET_QUESTIONS') {
    return {
      results: initState.results
    };
  }

  return state;
};

export default setResultsReducer;
