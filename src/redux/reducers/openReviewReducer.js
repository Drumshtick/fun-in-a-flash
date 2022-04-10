const initState = {
  open: false
};

const openReviewReducer = (state = initState, action) => {

  if (action.type === 'OPEN_REVIEW') {
    return { open: true };
  }

  if (action.type === 'CLOSE_REVIEW') {
    return { open: false };
  }

  return state;
};

export default openReviewReducer;
