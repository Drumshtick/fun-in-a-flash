const initState = {
  correct: false
}

const correctReducer = (state = initState, action) => {
  
  if (action.type === 'CORRECT_ANSWER') {
    return { correct: true };
  }

  if (action.type === 'INCORRECT_ANSWER') {
    return { correct: false };
  }

  return state;
};

export default correctReducer;
