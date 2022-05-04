import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/KeyboardInput.module.scss';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/inputActionTypes';
import isNumber from '../../helpers/isNumber';
import useDeviceCheck from '../../hooks/useDeviceCheck';

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
  const isMobile = useDeviceCheck();
  const handleKeyDown = useCallback((e) => {
    const { key } = e;
    const specialKeys: {
      'Backspace': Function,
      'Delete': Function,
    } = {
      'Backspace': (): void => dispatch(DELETE_NUMBER()),
      'Delete': (): void => dispatch(DELETE_NUMBER()),
    }
    if (specialKeys[key]) {
      specialKeys[key]();
    }

  }, [ dispatch ]);


  const handleKeyPress = useCallback(function(e) {
    const { key }: { key: string } = e;
    if (isNumber(key) && answer.length < MAX_CHAR) {
      dispatch(INPUT_NUMBER(key));
    }
    if (key === 'Enter') {
      submitAnswer();
    }
  }, [ dispatch, submitAnswer, answer ]);

  return (
    <input
      type={isMobile ? 'number' : 'text'}
      className={styles.questionField}
      disabled={view === 'play' ? false: true}
      value={reviewAnswer ? reviewAnswer : formatValue(answer)}
      onKeyDown={e => handleKeyDown(e)}
      onKeyPress={e => handleKeyPress(e)}
      ref={element => {
        if (view !== 'play') return;
        element && element.focus()
      }}
    />
  );
};

export default connect(mapStateToProps)(KeyboardInput);
