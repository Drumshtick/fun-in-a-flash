import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { NEW_QUESTION } from '../../redux/actions/addendActionTypes';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import { CORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
import { DECREASE_SCORE, RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import sleep from '../../helpers/sleep';
import clearSleepIds from '../../helpers/clearSleepIds';
const CONSTANTS = {
  'INITIAL_SCORE': parseInt(process.env.NEXT_PUBLIC_INITIAL_SCORE),
  'REDUCE_SCORE_BY': parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_BY),
  'REDUCE_INTERVAL': parseInt(process.env.NEXT_PUBLIC_REDUCE_INTERVAL),
  'TOTAL_INTERVALS': () => {
    return this['INITIAL_SCORE'] / this['REDUCE_SCORE_BY']
  }
}

function mapStateToProps(state) {
  return {
    value1: state.addend.value1,
    value2: state.addend.value2,
    answer: state.input.answer,
    score: state.score.score
  };
}

const Play = ({
  dispatch,
  answer,
  value1,
  value2
}) => {

  const scoreDropper = useCallback(() => {
    const { TOTAL_INTERVALS, REDUCE_INTERVAL  } = CONSTANTS
    const sleepIds = [];
    for (let i = 0; i < TOTAL_INTERVALS; i++) {
      const sleepId = sleep(REDUCE_INTERVAL * (i + 1) )
      .then(() => {
        dispatch(DECREASE_SCORE());
      });
      sleepIds.push(sleepId);
    }
    return sleepIds
  }, [ dispatch ])





  useEffect(() => {
    const startQuestions = () => {
      console.log("HERE");
      dispatch(RESET_SCORE());
      dispatch(NEW_QUESTION());
      const sleepIds = scoreDropper();
      return sleepIds;
    };

    var sleepIds = startQuestions()
    return () => {
      clearSleepIds(sleepIds);
    }
  }, [ dispatch, scoreDropper ]);

  useEffect(() => {

    const newQuestion = () => {
      dispatch(CORRECT_ANSWER());
      dispatch(NEW_QUESTION());
      dispatch(RESET_GUESS());
      return scoreDropper();
    };

    if (parseInt(answer) === parseInt(value1) + parseInt(value2)) {
      console.log('CORRECT!');
      var sleepIds = newQuestion();
      return;
    }
    console.log('INCORRECT');
    return () => {
      clearSleepIds(sleepIds);
    }
  }, [ answer, value1, value2, dispatch, scoreDropper ]);

  return (
    <div className={styles.container}>
      <GameHeader />
      <QuestionArea />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
