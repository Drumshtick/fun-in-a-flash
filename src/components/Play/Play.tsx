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
import sleep from "../../helpers/sleep";
import CONSTANTS from "../../helpers/constants";
import useScoreDropper from '../../hooks/useScoreDropper';

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
  const [ addends, setAddends ] = useState({
    value1: null,
    value2: null
  });
  const {
    scoreDropper,
    setDropScore,
    setQuestionStartTime
  } = useScoreDropper();

  const startQuestions = useCallback(async () => {
      // first question
    dispatch(NEW_HIGH_SCORE_RESET());
    if (score !== CONSTANTS['INITIAL_SCORE']) dispatch(RESET_SCORE());
    setQuestionCount(questionCount + 1)

    const { value1, value2 } = makeQuestion();
    setAddends(() => {
      return {
        value1, value2
      }
    });
    scoreDropper();
  }, [ dispatch, scoreDropper, score, questionCount ]);

  const newQuestion = useCallback(() => {
    if (score !== CONSTANTS['INITIAL_SCORE']) dispatch(RESET_SCORE());

    setQuestionCount(questionCount+ 1);
    const { value1, value2 } = makeQuestion();
    setAddends({ value1, value2 });
    dispatch(RESET_GUESS());
    scoreDropper();
  }, [ dispatch, score, scoreDropper, questionCount ]);

  const submitAnswer = async () => {
    if (disableSubmit) {
      return;
    }
    const { SUCCESS_MARKER_DURATION }: { SUCCESS_MARKER_DURATION: number } = CONSTANTS;
    setDropScore(false);
    setQuestionStartTime(null);
    setDisableSubmit(true);
    const correct = (
      parseInt(answer) === parseInt(addends.value1) + parseInt(addends.value2)
      );

    if (correct) dispatch(INCREASE_TOTAL_SCORE(score));
    setAnswerCorrect(correct);
    await sleep(SUCCESS_MARKER_DURATION);
    dispatch(PUSH_CORRECT_QUESTION({
      value1: addends.value1,
      value2: addends.value2,
      answer,
      score: correct ? score : 0,
      correct
    }));

    setDisableSubmit(false);
    setAnswerCorrect(null);
    newQuestion();
    return;
  };
  
  const endQuestion = useCallback(async () => {
    setDisableSubmit(true);
    setDropScore(false);
    setQuestionStartTime(null);
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
      setAnswerCorrect(false);
      await sleep(SUCCESS_MARKER_DURATION);
      setAnswerCorrect(null);
      setDisableSubmit(false);
      newQuestion();
      dispatch(PUSH_QUESTION({
        value1: addends.value1,
        value2: addends.value2,
        answer,
        score: 0,
        correct: false
      }));
    }, [ answer, dispatch, newQuestion, addends, setDropScore, setQuestionStartTime ]);

  useEffect(() => {
    // Start Game
    if (questionCount === 0) {
      startQuestions();
    }
  }, [ dispatch, scoreDropper, questionCount, startQuestions, totalScore ]);


  useEffect(() => {
    // Out of time
    if (score <= 0) {
      endQuestion();
    }
  }, [ score, endQuestion ])

  useEffect(() => {
    // End game
    if (questionCount > CONSTANTS.TOTAL_QUESTIONS) {
      if (highScore < totalScore) {
        dispatch(NEW_HIGH_SCORE());
        dispatch(SET_HIGH_SCORE(totalScore));
        window.localStorage.setItem('HighScore', JSON.stringify(totalScore));
      }
      if (scoreInterval) {
        clearInterval(scoreInterval);
        dispatch(CLEAR_INTERVAL_ID());
      }
      dispatch(SWITCH_VIEW_TO_DONE());
    }
  }, [ questionCount, dispatch, highScore, totalScore, scoreInterval ]);



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