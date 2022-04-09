import React, { useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import styles from '../../styles/KeyboardInput.module.scss';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/InputActionTypes';
import isNumber from "../../helpers/isNumber";

const MAX_CHAR = process.env.NEXT_PUBLIC_MAX_ANSWER_LENGTH;

function mapStateToProps(state) {
  return {
    answer: state.input.answer,
  };
}

const KeyboardInput = ({
  answer,
  dispatch
}) => {

  const formatValue = (value) => {
    return (
      value === '' ? '' : parseInt(answer).toLocaleString("en-US")
    );
  }

  const handleKeyDown = useCallback((e) => {
    e.stopPropagation();
    const { key } = e;
    const specialKeys = {
      'Backspace': () => dispatch(DELETE_NUMBER()),
      'Delete': () => dispatch(DELETE_NUMBER()),
      'Escape': () => dispatch(RESET_GUESS())
    }

    if (specialKeys[key]) {
      specialKeys[key]();
      return;
    }

  }, [ dispatch ]);

  const handleKeyPress = useCallback(e => {
    e.stopPropagation();
    const { key } = e;
    if (isNumber(key) && answer.length < MAX_CHAR) {
      dispatch(INPUT_NUMBER(key));
    }
  }, [ dispatch, answer ])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keypress', handleKeyPress);
    };
  }, [ handleKeyDown, handleKeyPress ]);

  return (
    <input
      type="text"
      readOnly
      className={styles.questionField}
      value={formatValue(answer)}
      onKeyDown={e => handleKeyDown(e)}
      onKeyPress={e => handleKeyPress(e)}
      ref={element => element && element.focus()}
    />
  );
};

export default connect(mapStateToProps)(KeyboardInput);
