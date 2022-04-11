import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_WELCOME } from '../../redux/actions/viewActionTypes';
import { INCORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
import { RESET_GUESS } from '../../redux/actions/inputActionTypes';
import { CLEAR_INTERVAL_ID } from '../../redux/actions/scoreIntervalActionTypes';
import { RESET_QUESTION_COUNT } from '../../redux/actions/questionActionTypes';
import { RESET_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { RESET_ACCURACY } from '../../redux/actions/accuracyActionTypes';
import { RESET_CORRECT } from '../../redux/actions/correctActionTypes';
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/GameHeader.module.scss';

const TOTAL_QUESTIONS = process.env.NEXT_PUBLIC_TOTAL_QUESTIONS;

const mapStateToProps = (state) => {
  return {
    questionNumber: state.question.questionNumber,
    totalScore: state.totalScore.totalScore,
    scoreInterval: state.scoreInterval.ID
  };
}

const GameHeader = ({
  questionNumber,
  totalScore,
  dispatch,
  scoreInterval
}) => {

  const handleClick = () => {
    if (scoreInterval) {
      clearTimeout(scoreInterval);
    }
    dispatch(SWITCH_VIEW_TO_WELCOME());
    dispatch(RESET_CORRECT());
    dispatch(INCORRECT_ANSWER());
    dispatch(RESET_GUESS());
    dispatch(CLEAR_INTERVAL_ID());
    dispatch(RESET_QUESTION_COUNT());
    dispatch(RESET_TOTAL_SCORE());
    dispatch(RESET_ACCURACY());
  };

  return (
    <header className={styles.container}>
      <Button
        className={styles.leaveGameButton}
        onClick={handleClick}
      >
        <CloseIcon className={styles.close} />
      </Button>
      <div className={styles.scoreTotalContainer}>
        <p className={styles.scoreTotalLabel}>SCORE</p>
        <div className={styles.scoreTotalValue}>
          <p>{totalScore}</p>
          <StarsIcon />
        </div>
      </div>
      <div className={styles.scoreTotalContainer}>
        <p className={styles.scoreTotalLabel}>QUESTION</p>
        <div className={styles.scoreTotalValue}>
          <p>{questionNumber}/{TOTAL_QUESTIONS}</p>
        </div>
      </div>
    </header>
  );
};

export default connect(mapStateToProps)(GameHeader);
