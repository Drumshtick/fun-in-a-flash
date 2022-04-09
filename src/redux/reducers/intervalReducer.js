const initState = {
  ID: null,
};

const intervalReducer = (state = initState, action) => {

  if (action.type === 'SET_INTERVAL_ID') {
    return { ID: action.value };
  }

  if (action.type === 'CLEAR_INTERVAL_ID') {
    return { ID: initState.ID };
  }

  return { ID: state.ID };
};

export default intervalReducer;
