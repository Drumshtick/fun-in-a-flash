const initState = {
  correct: false
}

const correctReducer = (state = initState, action) => {
  
  if (action.type === 'CORRECT_ANSWER') {
    return { correct: true }
  }

  return state;
};

export default correctReducer;
