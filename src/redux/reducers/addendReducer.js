import makeQuestion from "../../helpers/makeQuestion";

const initState = {
  value1: '',
  value2: ''
}

const addendReducer = (state = initState, action) => {

  if (action.type === 'NEW_QUESTION') {
    const { value1, value2 } = makeQuestion();
    console.log("new state: ", "value1: ", value1, "value2: ", value2)
    return { value1, value2 };
  }
  
  return state;
}

export default addendReducer;
