const initState = {
  correct: null
}

const correctReducer = (state = initState, action) => {
  
  if (action.type === 'CORRECT_ANSWER') {
    return { correct: true };
  }

  if (action.type === 'INCORRECT_ANSWER') {
    return { correct: false };
  }

  if (action.type === 'RESET_CORRECT') {
    return { correct: initState.correct };
  }

  return state;
};

export default correctReducer;
