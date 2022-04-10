const initState = {
  results: []
};

const setResultsReducer = (state = initState, action) => {

  if (action.type === 'PUSH_QUESTION') {
    return {
      results: [...state.results, action.value]
    };
  }

  if (action.type === 'RESET_RESULTS') {
    return {
      results: initState.results
    };
  }

  return state;
};

export default setResultsReducer;
