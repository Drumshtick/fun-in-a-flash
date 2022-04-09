import React, { useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/InputActionTypes';
import styles from '../../styles/QuestionArea.module.scss';
import StarsIcon from '@mui/icons-material/Stars';
import { KeyboardInput } from './index';

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
  correct
}) => {




  useEffect(() => {
    if (correct) {
      dispatch(RESET_GUESS());
    }
  }, [ correct, dispatch ])



  return (
    <div className={styles.container}>
      <div className={styles.score}>
        <p>200</p>
        <StarsIcon />
      </div>
      <div className={styles.questionContainer}>
        <p>{value1}</p>
        <div>
          <span>+</span><p>{value2}</p>
        </div>
      </div>
      <KeyboardInput />
    </div>
  );
};



export default connect(mapStateToProps)(QuestionArea);
