const initState = {
  answer: ''
}

const keyboardReducer = (state = initState, action) => {
  console.log('keyboardReducer', state, action);

  const types = {
    'INPUT_NUMBER': () => {return {answer: state.answer + action.value}}, 
    'DELETE_NUMBER': () => {
      if (state.answer === '') return {answer: ''};

      const newState = [...state.answer];
      const lastItem = newState.length - 1
      newState.splice(lastItem, 1)
      
      return {answer: newState.join('')}},
    'RESET_GUESS': () => {return {answer: state.answer = '' }}
  };

  return !types[action.type] ? state : types[action.type]();
};

export default keyboardReducer;
