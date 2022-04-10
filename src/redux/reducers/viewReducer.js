const initState = {
  view: 'done'
};

const viewReducer = (state = initState, action) => {
  
  const types = {
    'SWITCH_VIEW_TO_PLAY': () => {return { view: 'play' }},
    'SWITCH_VIEW_TO_WELCOME': () => {return { view: 'welcome' }},
    'SWITCH_VIEW_TO_DONE': () => {return { view: 'done' }},
  };


  return !types[action.type] ? state : types[action.type]();
};

export default viewReducer;
