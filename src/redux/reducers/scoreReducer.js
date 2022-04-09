const REDUCE_SCORE_VALUE = process.env.NEXT_PUBLIC_REDUCE_SCORE_BY

const initState = {
  score: 200
};

const scoreReducer = (state = initState, action) => {
  
  if (action.type === 'DECREASE_SCORE') {
    return { score: state.score - REDUCE_SCORE_VALUE};
  }

  return { score: state.score };
};

export default scoreReducer;
