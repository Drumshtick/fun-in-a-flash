const initState = {
  disabled: false
};

const disableAnswerSubmitReducer = (state = initState, action) => {

  if (action.type === 'DISABLE_ANSWER_BTN') {
    return { disabled: true };
  }

  if (action.type === 'ENABLE_ANSWER_BTN') {
    return { disabled: false };
  }

  return state;
};

export default disableAnswerSubmitReducer;
