const initState = {
  correct: 0
};

const accuracyReducer = (state = initState, action) => {
  if (action.type === 'INCREASE_ACCURACY') {
    return { correct: state.correct + 1 };
  }

  if (action.type === 'RESET_ACCURACY') {
    return { correct: initState.correct };
  }

  return state;
};

export default accuracyReducer;
