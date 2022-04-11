import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/KeyboardInput.module.scss';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/InputActionTypes';
import isNumber from '../../helpers/isNumber';
import debounce from '../../helpers/debounce';
const MAX_CHAR = process.env.NEXT_PUBLIC_MAX_ANSWER_LENGTH;



function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    view: state.view.view,
    scoreInterval: state.scoreInterval.ID,
  };
}

const KeyboardInput = ({
  answer,
  dispatch,
  reviewAnswer,
  view,
  submitAnswer,
  scoreInterval
}) => {

  const formatValue = (value) => {
    return (
      value === '' ? '' : parseInt(answer).toLocaleString('en-US')
    );
  }

  const handleKeyDown = useCallback((e) => {
    const { key } = e;
    e.stopPropagation();
    if (view !== 'play') return;
    const specialKeys = {
      'Backspace': () => dispatch(DELETE_NUMBER()),
      'Delete': () => dispatch(DELETE_NUMBER()),
      'Escape': () => dispatch(RESET_GUESS()),
      // 'Enter': () => submitAnswer
    }

    if (specialKeys[key]) {
      specialKeys[key]();
      return;
    }

  }, [ dispatch ]);

  const handleKeyPress = function(e) {
    const { key } = e;
    e.stopPropagation();
    e.preventDefault();
    if (view !== 'play') return;
    if (isNumber(key) && answer.length < MAX_CHAR) {
      dispatch(INPUT_NUMBER(key));
    }
    if (key === 'Enter') {
      submitAnswer();
    }

  };

  useEffect(() => {
    if (reviewAnswer && typeof window !== undefined) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keypress', debounce(handleKeyPress, 500));
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keypress', debounce(handleKeyPress, 500));
    };
  }, [ handleKeyDown, handleKeyPress ]);1

  return (
    <input
      type='text'
      readOnly
      className={styles.questionField}
      value={reviewAnswer ? reviewAnswer : formatValue(answer)}
      onKeyDown={e => handleKeyDown(e)}
      onKeyPress={e => handleKeyPress(e)}
      ref={element => element && element.focus()}
    />
  );
};

export default connect(mapStateToProps)(KeyboardInput);
