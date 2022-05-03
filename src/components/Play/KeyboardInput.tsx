import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/KeyboardInput.module.scss';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/inputActionTypes';
import isNumber from '../../helpers/isNumber';
const MAX_CHAR = process.env.NEXT_PUBLIC_MAX_ANSWER_LENGTH;



function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    view: state.view.view,
    scoreInterval: state.scoreInterval.ID,
  };
}

const formatValue = (value) => {
  return (
    value === '' ? '' : parseInt(value).toLocaleString('en-US')
  );
}

const KeyboardInput = ({
  answer,
  dispatch,
  reviewAnswer,
  view,
  submitAnswer,
}) => {
  const handleKeyDown = useCallback((e) => {
    const { key } = e;
    e.stopPropagation();
    const specialKeys: {
      'Backspace': Function,
      'Delete': Function,
      'Escape': Function
    } = {
      'Backspace': (): void => dispatch(DELETE_NUMBER()),
      'Delete': (): void => dispatch(DELETE_NUMBER()),
      'Escape': (): void => dispatch(RESET_GUESS()),
    }

    if (specialKeys[key]) {
      specialKeys[key]();
      return;
    }

  }, [ dispatch ]);


  const handleKeyPress = useCallback(function(e) {
    const { key }: { key: string } = e;
    e.stopPropagation();
    if (isNumber(key) && answer.length < MAX_CHAR) {
      dispatch(INPUT_NUMBER(key));
    }
    if (key === 'Enter') {
      submitAnswer();
    }
  }, [ dispatch, submitAnswer, answer ]);


  useEffect(() => {
    if (reviewAnswer && typeof window !== undefined) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [ handleKeyDown, handleKeyPress, reviewAnswer ]);

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
