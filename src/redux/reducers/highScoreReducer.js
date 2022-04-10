const initState = {
  highScore: 0,
};

const highScoreReducer = (state = initState, action) => {

  if (action.type === 'SET_HIGH_SCORE') {
    return { highScore: action.value }
  }

  return state;
};

export default highScoreReducer;
