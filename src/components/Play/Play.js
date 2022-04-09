import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { NEW_QUESTION } from '../../redux/actions/addendActionTypes';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import { CORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
function mapStateToProps(state) {
  return {
    value1: state.addend.value1,
    value2: state.addend.value2,
    answer: state.input.answer
  };
}

const Play = ({
  dispatch,
  answer,
  value1,
  value2
}) => {

  useEffect(() => {
    dispatch(NEW_QUESTION());
  }, [ dispatch ]);

  useEffect(() => {
    if (parseInt(answer) === parseInt(value1) + parseInt(value2)) {
      console.log("CORRECT!");
      dispatch(CORRECT_ANSWER());
      dispatch(NEW_QUESTION());
      dispatch(RESET_GUESS());
      return;
    }
    console.log("INCORRECT");
  }, [ answer, value1, value2, dispatch ]);

  return (
    <div className={styles.container}>
      <GameHeader />
      <QuestionArea />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
