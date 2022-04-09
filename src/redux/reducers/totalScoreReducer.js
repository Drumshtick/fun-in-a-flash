const initState = {
  totalScore: 0,
}

const totalScoreReducer = (state = initState, action) => {

  if (action.type === 'INCREASE_TOTAL_SCORE') {
    return { totalScore: state.totalScore + parseInt(action.value)};
  }

  if (action.type === 'RESET_TOTAL_SCORE') {
    return { totalScore: initState.totalScore }
  }

  return { totalScore: state.totalScore };
};

export default totalScoreReducer;
