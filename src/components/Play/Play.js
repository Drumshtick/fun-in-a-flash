import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { RESET_GUESS } from '../../redux/actions/inputActionTypes';
import { DECREASE_SCORE, RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import { INCREASE_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { SET_INTERVAL_ID, CLEAR_INTERVAL_ID } from '../../redux/actions/scoreIntervalActionTypes';
import { SWITCH_VIEW_TO_DONE } from '../../redux/actions/viewActionTypes';
import { PUSH_QUESTION, PUSH_CORRECT_QUESTION } from '../../redux/actions/setResultsActionTypes';
import { SET_HIGH_SCORE } from '../../redux/actions/highScoreActionTypes';
import { NEW_HIGH_SCORE, NEW_HIGH_SCORE_RESET } from '../../redux/actions/newHighScoreActionTypes.js';
import makeQuestion from "../../helpers/makeQuestion";

import sleep from '../../helpers/sleep';
const CONSTANTS = {
  SUCCESS_MARKER_DURATION: parseInt(process.env.NEXT_PUBLIC_DURATION_SUCCESS_INDICATOR),
  TOTAL_QUESTIONS: parseInt(process.env.NEXT_PUBLIC_TOTAL_QUESTIONS),
  INITIAL_SCORE: parseInt(process.env.NEXT_PUBLIC_INITIAL_SCORE),
  REDUCE_SCORE_BY: parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_BY),
  REDUCE_INTERVAL: parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_INTERVAL),
  TOTAL_INTERVALS: function() {
    return CONSTANTS.INITIAL_SCORE / CONSTANTS.REDUCE_SCORE_BY;
  }
}

function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    score: state.score.score,
    totalScore: state.totalScore.totalScore,
    scoreInterval: state.scoreInterval.ID,
    highScore: state.highScore.highScore,
    view: state.view.view
  };
}

const Play = ({
  dispatch,
  answer,
  score,
  totalScore,
  scoreInterval,
  highScore,
  view
}) => {
  const [ disableSubmit, setDisableSubmit ] = useState(false);
  const [ questionCount, setQuestionCount ] = useState(0);
  const [ answerCorrect, setAnswerCorrect ] = useState(null);
  const [ addends, setAddends ] = useState({});
  const scoreDropper = useCallback(async () => {
    if (view !== 'play') return;

    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    const { REDUCE_INTERVAL } = CONSTANTS;
    const intervalID = setInterval(() => {
      dispatch(DECREASE_SCORE());
    }, REDUCE_INTERVAL);

    dispatch(SET_INTERVAL_ID(intervalID));
  }, [ dispatch, scoreInterval, view ])


  const startQuestions = useCallback(() => {
    // first question
    dispatch(NEW_HIGH_SCORE_RESET());
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    setQuestionCount(questionCount+ 1)

    const { value1, value2 } = makeQuestion();
    setAddends({ value1, value2 });
    scoreDropper();
  }, [ dispatch, scoreDropper, score, scoreInterval, questionCount ]);

  const newQuestion = useCallback(() => {
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
    if (score !== CONSTANTS.INITIAL_SCORE) dispatch(RESET_SCORE());
    setQuestionCount(questionCount+ 1);

    const { value1, value2 } = makeQuestion();
    setAddends({ value1, value2 });
    dispatch(RESET_GUESS());
    scoreDropper();
  }, [ dispatch, score, scoreDropper, scoreInterval, questionCount ]);

  const submitAnswer = async () => {
    if (disableSubmit) {
      return;
    }

    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
    setDisableSubmit(true);
    if (scoreInterval) {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }

    const correct = (
      parseInt(answer) === parseInt(addends.value1) + parseInt(addends.value2)
      );

    if (correct) {
      dispatch(INCREASE_TOTAL_SCORE(score));
      setAnswerCorrect(true);
      await sleep(SUCCESS_MARKER_DURATION);
      dispatch(PUSH_CORRECT_QUESTION({
        value1: addends.value1,
        value2: addends.value2,
        answer,
        score: correct ? score : 0,
        correct
      }));
    }

    if (!correct) {
      setAnswerCorrect(false);
      await sleep(SUCCESS_MARKER_DURATION);
      dispatch(PUSH_QUESTION({
        value1: addends.value1,
        value2: addends.value2,
        answer,
        score: correct ? score : 0,
        correct
      }));
    }
    
    setDisableSubmit(false);
    setAnswerCorrect(null);
    newQuestion();
    return;
  };
  
  const endQuestion = useCallback(async () => {
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
      if (scoreInterval) {
        clearInterval(scoreInterval);
        dispatch(CLEAR_INTERVAL_ID());
      }
      setAnswerCorrect(false);
      await sleep(SUCCESS_MARKER_DURATION);
      setAnswerCorrect(null);
      newQuestion();
      dispatch(PUSH_QUESTION({
        value1: addends.value1,
        value2: addends.value2,
        answer,
        score: 0,
        correct: false
      }));
  }, [ answer, dispatch, scoreInterval, newQuestion, addends ]);

  useEffect(() => {
    // Start Game
    if (questionCount === 0) {
      startQuestions();
    }
  }, [ dispatch, scoreDropper, questionCount, startQuestions, totalScore ]);


  useEffect(() => {
    if (score <= 0) {
      endQuestion();
    }
  }, [ score, endQuestion ])

  useEffect(() => {
    if (questionCount > CONSTANTS.TOTAL_QUESTIONS) {
      if (highScore < totalScore) {
        dispatch(NEW_HIGH_SCORE());
        dispatch(SET_HIGH_SCORE(totalScore));
      }
      if (scoreInterval) {
        clearInterval(scoreInterval);
        dispatch(CLEAR_INTERVAL_ID());
      }
      dispatch(SWITCH_VIEW_TO_DONE());
    }
  }, [ questionCount, scoreInterval, dispatch, highScore, totalScore ]);

  return (
    <div className={styles.container}>
      <GameHeader questionCount={questionCount} />
      <QuestionArea
        submitAnswer={submitAnswer}
        correct={answerCorrect}
        value1={addends.value1}
        value2={addends.value2}
        disableSubmit={disableSubmit}
      />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
