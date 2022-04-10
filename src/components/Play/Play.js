import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { NEW_QUESTION } from '../../redux/actions/addendActionTypes';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import { CORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
import { DECREASE_SCORE, RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import { INCREASE_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { INCREASE_QUESTION_COUNT } from '../../redux/actions/questionActionTypes';
import { SET_INTERVAL_ID, CLEAR_INTERVAL_ID } from '../../redux/actions/intervalActionTypes';
import { INCREASE_ACCURACY } from '../../redux/actions/accuracyActionTypes';
import { SWITCH_VIEW_TO_DONE } from '../../redux/actions/viewActionTypes';
import { PUSH_QUESTION } from '../../redux/actions/setResultsActionTypes';

const CONSTANTS = {
  TOTAL_QUESTIONS: parseInt(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS),
  INITIAL_SCORE: parseInt(process.env.NEXT_PUBLIC_INITIAL_SCORE),
  REDUCE_SCORE_BY: parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_BY),
  REDUCE_INTERVAL: parseInt(process.env.NEXT_PUBLIC_REDUCE_INTERVAL),
  TOTAL_INTERVALS: function() {
    return CONSTANTS.INITIAL_SCORE / CONSTANTS.REDUCE_SCORE_BY;
  }
}

function mapStateToProps(state) {
  return {
    value1: state.addend.value1,
    value2: state.addend.value2,
    answer: state.input.answer,
    score: state.score.score,
    totalScore: state.totalScore.totalScore,
    questionNumber: state.question.questionNumber,
    interval: state.interval.ID
  };
}

const Play = ({
  dispatch,
  answer,
  value1,
  value2,
  questionNumber,
  score,
  totalScore,
  interval,
}) => {
  const scoreDropper = useCallback(async () => {
    const { REDUCE_INTERVAL } = CONSTANTS;
    const intervalID = setInterval(() => {
      dispatch(DECREASE_SCORE());
    }, REDUCE_INTERVAL);
    dispatch(SET_INTERVAL_ID(intervalID));
  }, [ dispatch ])


  const startQuestions = useCallback(() => {
    // first question
    if (interval) {
      clearInterval(interval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    dispatch(INCREASE_QUESTION_COUNT())
    dispatch(NEW_QUESTION());
    scoreDropper();
  }, [ dispatch, scoreDropper, score ]);

  const newQuestion = useCallback(() => {
    if (interval) {
      clearInterval(interval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    dispatch(CORRECT_ANSWER());
    dispatch(INCREASE_TOTAL_SCORE(score));
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    dispatch(INCREASE_QUESTION_COUNT());
    dispatch(NEW_QUESTION());
    dispatch(RESET_GUESS());
    scoreDropper();
  }, [ dispatch, score, scoreDropper ]);

  useEffect(() => {
    // Start Game
    if (questionNumber === 0) {
      startQuestions();
    }
  }, [ dispatch, scoreDropper, questionNumber, startQuestions, totalScore ]);

  useEffect(() => {
    // On correct answer
    if (parseInt(answer) === parseInt(value1) + parseInt(value2)) {
      console.log('CORRECT!');
      dispatch(INCREASE_ACCURACY());
      dispatch(PUSH_QUESTION({
        value1,
        value2,
        answer,
        score
      }));
      newQuestion();
      return;
    }
    console.log('INCORRECT');
  }, [ answer, value1, value2, dispatch, scoreDropper, score, newQuestion ]);

  useEffect(() => {
    if (score <= 0) {
      newQuestion();
      dispatch(PUSH_QUESTION({
        value1,
        value2,
        answer,
        score: 0
      }));
    }
  }, [ score, newQuestion ])

  useEffect(() => {
    if (questionNumber >= CONSTANTS.TOTAL_QUESTIONS) {
      dispatch(SWITCH_VIEW_TO_DONE());
    }
  }, [ questionNumber ]);

  return (
    <div className={styles.container}>
      <GameHeader />
      <QuestionArea />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
