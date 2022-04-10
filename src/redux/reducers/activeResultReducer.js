const initState = {
  active: 0
};

const activeResultReducer = (state = initState, action) => {
  const types = {
    'NEXT_RESULT': () => {
      return { active: state.active + 1 };
    },
    'PREV_RESULT': () => {
      return { active: state.active - 1 };
    },
    'RESET_ACTIVE': () => {
      return { active: initState.active };
    }
  };

  return !types[action.type] ? state : types[action.type]();
};

export default activeResultReducer;
