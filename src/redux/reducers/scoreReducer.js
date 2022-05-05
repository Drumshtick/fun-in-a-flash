const REDUCE_SCORE_VALUE = parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_BY);
const INITIAL_SCORE = parseInt(process.env.NEXT_PUBLIC_INITIAL_SCORE);

const initState = {
  score: INITIAL_SCORE
};

const scoreReducer = (state = initState, action) => {
  
  if (action.type === 'DECREASE_SCORE') {
    return { score: state.score - REDUCE_SCORE_VALUE};
  }

  if (action.type === 'RESET_SCORE') {
    return { score: initState.score + action.value}
  }

  return { score: state.score };
};

export default scoreReducer;
