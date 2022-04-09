const initState = {
  answer: ''
}

const inputReducer = (state = initState, action) => {

  const types = {
    'INPUT_NUMBER': () => {
      if (action.value.length === 1) {
        return { answer: state.answer + action.value};
      }

      return { answer: action.value };
    }, 
    'DELETE_NUMBER': () => {
      if (
        state.answer.length === 1 ||
        state.answer === ''
        ) return {answer: ''};

      const newState = [...state.answer];
      const lastItem = newState.length - 1
      newState.splice(lastItem, 1)
      
      return { answer: newState.join('') };
    },
    'RESET_GUESS': () => {return { answer: state.answer = '' }}
  };

  // console.log("new answer state:", !types[action.type] ? state : types[action.type]())
  return !types[action.type] ? state : types[action.type]();
};

export default inputReducer;
