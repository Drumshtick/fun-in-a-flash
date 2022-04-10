import React, { useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import styles from '../../styles/QuestionArea.module.scss';
import { KeyboardInput, QuestionScore } from './index';

function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    value1: state.addend.value1,
    value2: state.addend.value2,
    correct: state.answerCorrect.correct
  };
}



const QuestionArea = ({
  dispatch,
  value1,
  value2,
  correct,
  reviewState
}) => {



  useEffect(() => {
    if (correct) {
      dispatch(RESET_GUESS());
    }
  }, [ correct, dispatch ])



  return (
    <div className={styles.container}>
      <QuestionScore reviewScore={reviewState && reviewState.score} />
      <div className={styles.questionContainer}>
        <p>{reviewState ? reviewState.value1 : value1}</p>
        <div>
          <span>+</span><p>{reviewState ? reviewState.value2 : value2}</p>
        </div>
      </div>
      <KeyboardInput reviewAnswer={reviewState && reviewState.answer} />
    </div>
  );
};



export default connect(mapStateToProps)(QuestionArea);
