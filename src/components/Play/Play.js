import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { NEW_QUESTION } from '../../redux/actions/addendActionTypes';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import { CORRECT_ANSWER, RESET_CORRECT, INCORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
import { DECREASE_SCORE, RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import { INCREASE_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { INCREASE_QUESTION_COUNT } from '../../redux/actions/questionActionTypes';
import { SET_INTERVAL_ID, CLEAR_INTERVAL_ID } from '../../redux/actions/scoreIntervalActionTypes';
import { INCREASE_ACCURACY } from '../../redux/actions/accuracyActionTypes';
import { SWITCH_VIEW_TO_DONE } from '../../redux/actions/viewActionTypes';
import { PUSH_QUESTION } from '../../redux/actions/setResultsActionTypes';
import { SET_HIGH_SCORE } from '../../redux/actions/highScoreActionTypes';
import { NEW_HIGH_SCORE, NEW_HIGH_SCORE_RESET } from '../../redux/actions/newHighScoreActionTypes.js';
import { RESET_PLAYED_FIREWORKS } from '../../redux/actions/lottieActionsTypes';

import sleep from '../../helpers/sleep';
const CONSTANTS = {
  SUCCESS_MARKER_DURATION: parseInt(process.env.NEXT_PUBLIC_DURATION_SUCCESS_INDICATOR),
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
    scoreInterval: state.scoreInterval.ID,
    highScore: state.highScore.highScore,
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
  scoreInterval,
  highScore,
}) => {
  const scoreDropper = useCallback(async () => {
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    const { REDUCE_INTERVAL } = CONSTANTS;
    const intervalID = setInterval(() => {
      dispatch(DECREASE_SCORE());
    }, REDUCE_INTERVAL);

    dispatch(SET_INTERVAL_ID(intervalID));
  }, [ dispatch, scoreInterval ])


  const startQuestions = useCallback(() => {
    // first question
    dispatch(NEW_HIGH_SCORE_RESET());
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    dispatch(INCREASE_QUESTION_COUNT())
    dispatch(NEW_QUESTION());
    scoreDropper();
  }, [ dispatch, scoreDropper, score, scoreInterval ]);

  const newQuestion = useCallback(() => {
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    dispatch(INCREASE_QUESTION_COUNT());
    dispatch(NEW_QUESTION());
    dispatch(RESET_GUESS());
    scoreDropper();
  }, [ dispatch, score, scoreDropper, scoreInterval ]);

  const submitAnswer = async () => {
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    const correct = parseInt(answer) === parseInt(value1) + parseInt(value2);
    if (correct) {
      dispatch(INCREASE_TOTAL_SCORE(score));
      dispatch(INCREASE_ACCURACY());
      dispatch(CORRECT_ANSWER());
      await sleep(SUCCESS_MARKER_DURATION);
    }
    if (!correct) {
      dispatch(INCORRECT_ANSWER());
      await sleep(SUCCESS_MARKER_DURATION);
    }
    dispatch(RESET_CORRECT());
    dispatch(PUSH_QUESTION({
      value1,
      value2,
      answer,
      score: correct ? score : 0,
      correct
    }));
    dispatch
    newQuestion();
    return;
  };

  useEffect(() => {
    // Start Game
    if (questionNumber === 0) {
      startQuestions();
    }
  }, [ dispatch, scoreDropper, questionNumber, startQuestions, totalScore ]);

  const endGame = useCallback(async () => {
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
      if (scoreInterval) {
        clearInterval(scoreInterval);
        dispatch(CLEAR_INTERVAL_ID());
      }
      dispatch(INCORRECT_ANSWER());
      await sleep(SUCCESS_MARKER_DURATION);
      dispatch(RESET_CORRECT());
      newQuestion();
      dispatch(PUSH_QUESTION({
        value1,
        value2,
        answer,
        score: 0,
        correct: false
      }));
  }, [ answer, dispatch, scoreInterval, newQuestion, value1, value2 ]);

  useEffect(() => {
    if (score <= 0) {
      endGame();
    }
  }, [ score, endGame ])

  useEffect(() => {
    if (questionNumber > CONSTANTS.TOTAL_QUESTIONS) {
      if (highScore < totalScore) {
        dispatch(RESET_PLAYED_FIREWORKS());
        dispatch(NEW_HIGH_SCORE());
        dispatch(SET_HIGH_SCORE(totalScore));
      }
      if (scoreInterval) {
        clearInterval(scoreInterval);
        dispatch(CLEAR_INTERVAL_ID());
      }
      dispatch(SWITCH_VIEW_TO_DONE());
    }
  }, [ questionNumber, scoreInterval, dispatch, highScore, totalScore ]);

  return (
    <div className={styles.container}>
      <GameHeader />
      <QuestionArea submitAnswer={submitAnswer} />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
