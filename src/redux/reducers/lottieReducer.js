const initState = {
  fireworks: false,
  fireworksPlayed: false
};

const lottieReducer = (state = initState, action) => {

  if (action.type === 'PLAY_FIREWORKS') {
    return { fireworks: true, fireworksPlayed: true };
  }

  if (action.type === 'STOP_FIREWORKS') {
    return { fireworks: false, fireworksPlayed: true };
  }

  if (action.type === 'RESET_PLAYED_FIREWORKS') {
    return { fireworks: false, fireworksPlayed: false };
  }

  return state;
};

export default lottieReducer;
