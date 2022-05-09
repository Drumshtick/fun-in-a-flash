import React, { useEffect, useCallback, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, State } from '../../redux/store';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, OnscreenInput } from './index';
import { RESET_GUESS } from '../../redux/actions/inputActionTypes';
import { RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import { INCREASE_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { CLEAR_INTERVAL_ID } from '../../redux/actions/scoreIntervalActionTypes';
import { SWITCH_VIEW_TO_DONE } from '../../redux/actions/viewActionTypes';
import { PUSH_QUESTION, PUSH_CORRECT_QUESTION } from '../../redux/actions/setResultsActionTypes';
import { SET_HIGH_SCORE } from '../../redux/actions/highScoreActionTypes';
import { NEW_HIGH_SCORE, NEW_HIGH_SCORE_RESET } from '../../redux/actions/newHighScoreActionTypes.js';
import { makeQuestion } from "../../helpers/makeQuestion";
import sleep from "../../helpers/sleep";
import CONSTANTS from "../../helpers/constants";
import useScoreDropper from '../../hooks/useScoreDropper';

import {
  INCREASE_QUESTION_COUNT,
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  RESET_CORRECT_ANSWER,
  SET_ADDENDS,
  gameStateReducer,
  initGameState
} from './gameStateReducer';

function mapStateToProps(state: State) {
  return {
    answer: state.input.answer,
    score: state.score.score,
    totalScore: state.totalScore.totalScore,
    scoreInterval: state.scoreInterval.ID,
    highScore: state.highScore.highScore,
    view: state.view.view
  };
}

interface PlayProps {
  dispatch: AppDispatch,
  answer: string,
  score: number,
  totalScore: number,
  scoreInterval: number,
  highScore: number,
}

interface AnimationState {
  changeQuestion: boolean,
  changeTotalScore: boolean,
  changeScore: boolean,
}

const initAnimationState = {
  changeQuestion: false,
  changeTotalScore: false,
  changeScore: false,
}

interface ActionTypes {
  type: string
}

const animationStateReducer = (state: AnimationState, action: ActionTypes): AnimationState => {
  const types = {
    'CHANGE_Q_START': () => {return {...state, changeQuestion: true}},
    'CHANGE_Q_END' : () => {return {...state, changeQuestion: false}},
    'CHANGE_TS_START': () => {return {...state, changeTotalScore: true}},
    'CHANGE_TS_END': () => {return {...state, changeTotalScore: false}},
    'CHANGE_S_START': () => {return {...state, changeScore: true}},
    'CHANGE_S_END': () => {return {...state, changeScore: false}}
  }

  return !types[action.type] ? state : types[action.type]();
};

const Play: React.FC<PlayProps> = ({
  dispatch,
  answer,
  score,
  totalScore,
  scoreInterval,
  highScore,
}) => {
  const [gameState, gameStateDispatcher] = useReducer(gameStateReducer, initGameState);
  const {
    addends,
    answerCorrect,
    questionCount
  } = gameState;
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [animationState, animationStateDispatch] = useReducer(animationStateReducer, initAnimationState);
  const {changeQuestion, changeTotalScore, changeScore} = animationState;
  const {
    scoreDropper,
    setDropScore,
  } = useScoreDropper(score, disableSubmit);

  const startQuestions = useCallback(async () => {
    // first question
    dispatch(NEW_HIGH_SCORE_RESET());
    dispatch(RESET_SCORE());
    gameStateDispatcher(INCREASE_QUESTION_COUNT())
    const { value1, value2 }: {value1: number, value2: number} = makeQuestion();
    animationStateDispatch({type: 'CHANGE_Q_START'});
    gameStateDispatcher(SET_ADDENDS(value1, value2));
    scoreDropper();
  }, [dispatch, scoreDropper]);

  const newQuestion = useCallback(() => {
    if (disableSubmit) return;
    gameStateDispatcher(INCREASE_QUESTION_COUNT())
    const { value1, value2 }: {value1: number, value2: number} = makeQuestion();
    animationStateDispatch({type: 'CHANGE_Q_START'});
    gameStateDispatcher(SET_ADDENDS(value1, value2));
    dispatch(RESET_GUESS());
    scoreDropper();
    dispatch(RESET_SCORE());
    setDisableSubmit(false);
  }, [dispatch, scoreDropper, disableSubmit]);

  const submitAnswer = async (): Promise<null> => {
    if (disableSubmit) {
      return;
    }
    animationStateDispatch({type: 'CHANGE_Q_END'});
    animationStateDispatch({type: 'CHANGE_TS_START'});
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
    setDropScore(false);
    setDisableSubmit(true);
    const correct: boolean = parseInt(answer) === addends.value1 + addends.value2;
    if (correct) dispatch(INCREASE_TOTAL_SCORE(score));
    gameStateDispatcher(correct ? CORRECT_ANSWER() : INCORRECT_ANSWER());
    dispatch(PUSH_CORRECT_QUESTION({
      value1: addends.value1,
      value2: addends.value2,
      answer,
      score: correct ? score : 0,
      correct
    }));
    await sleep(SUCCESS_MARKER_DURATION);

    setDisableSubmit(false);
    gameStateDispatcher(RESET_CORRECT_ANSWER());
    newQuestion();
    return;
  };
  
  const handleOutOfTime = useCallback(async () => {
    dispatch(RESET_GUESS());
    setDisableSubmit(true);
    setDropScore(false);
    const { SUCCESS_MARKER_DURATION } = CONSTANTS;
    gameStateDispatcher(INCORRECT_ANSWER());
    await sleep(SUCCESS_MARKER_DURATION);
    gameStateDispatcher(RESET_CORRECT_ANSWER());
    dispatch(PUSH_QUESTION({
      value1: addends.value1,
      value2: addends.value2,
      answer,
      score: 0,
      correct: false
    }));
    newQuestion();
    }, [answer, dispatch, newQuestion, addends, setDropScore]);

  useEffect(() => {
    // Start Game
    if (questionCount === 0) {
      startQuestions();
    }
  }, [questionCount, startQuestions, answerCorrect]);


  useEffect(() => {
    // Out of time
    if (score <= 0 && !disableSubmit) {
      handleOutOfTime();
    }
  }, [score, handleOutOfTime, dispatch, disableSubmit])

  useEffect(() => {
    // End game
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
  }, [questionCount, dispatch, highScore, totalScore, scoreInterval]);

  useEffect(() => {
    if (!changeQuestion) return;
    // Change in question addends animation
    const timerID: ReturnType<typeof setTimeout> = setTimeout(() => {
        animationStateDispatch({type: 'CHANGE_Q_END'});
      }, 500)
    return () => {
      clearTimeout(timerID);
    };
  }, [changeQuestion, animationStateDispatch]);

  useEffect(() => {
    if (!changeScore) return;
    let timerID: NodeJS.Timer = setTimeout(() => {
        animationStateDispatch({type: 'CHANGE_S_END'});
      }, 500)
    return () => {
      clearTimeout(timerID);
    };
  }, [changeScore, animationStateDispatch]);

  return (
    <div className={styles.container}>
      <GameHeader
        questionCount={questionCount}
        changeTotalScore={changeTotalScore}
        animationStateDispatch={animationStateDispatch}
      />
      <QuestionArea
        submitAnswer={submitAnswer}
        correct={answerCorrect}
        value1={addends.value1}
        value2={addends.value2}
        disableSubmit={disableSubmit}
        changeQuestion={changeQuestion}
        changeTotalScore={changeTotalScore}
        changeScore={changeScore}
        animationStateDispatch={animationStateDispatch}
      />
      <OnscreenInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
