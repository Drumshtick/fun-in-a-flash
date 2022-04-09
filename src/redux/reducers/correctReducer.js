const initState = {
  correct: false
}

const correctReducer = (state = initState, action) => {
  
  if (action.type === 'CORRECT_ANSWER') {
    console.log("correct: true")
    return { correct: true }
  }

  return state;
};

export default correctReducer;
