const initState = {
  madeHighScore: false
};

const newHighScoreReducer = (state = initState, action) => {

  if (action.type === 'NEW_HIGH_SCORE') {
    return { madeHighScore: true }
  }

  if (action.type === 'NEW_HIGH_SCORE_RESET') {
    return { madeHighScore: initState.madeHighScore }
  }

  return state;
};

export default newHighScoreReducer;
