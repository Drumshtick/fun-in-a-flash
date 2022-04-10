import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_WELCOME } from '../../redux/actions/viewActionTypes';
import { INCORRECT_ANSWER } from '../../redux/actions/correctActionTypes';
import { RESET_GUESS } from '../../redux/actions/InputActionTypes';
import { CLEAR_INTERVAL_ID } from '../../redux/actions/intervalActionTypes';
import { RESET_QUESTION_COUNT } from '../../redux/actions/questionActionTypes';
import { RESET_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { RESET_ACCURACY } from '../../redux/actions/accuracyActionTypes';
import CloseIcon from '@mui/icons-material/Close';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/GameHeader.module.scss';

const TOTAL_QUESTIONS = process.env.NEXT_PUBLIC_TOTAL_QUESTIONS;

const mapStateToProps = (state) => {
  return {
    questionNumber: state.question.questionNumber,
    totalScore: state.totalScore.totalScore,
    view: state.view.view
  };
}

const GameHeader = ({
  questionNumber,
  totalScore,
  view,
  dispatch
}) => {

  const handleClick = () => {
    dispatch(SWITCH_VIEW_TO_WELCOME());
    dispatch(INCORRECT_ANSWER());
    dispatch(RESET_GUESS());
    dispatch(CLEAR_INTERVAL_ID());
    dispatch(RESET_QUESTION_COUNT());
    dispatch(RESET_TOTAL_SCORE());
    dispatch(RESET_ACCURACY());
  };

  return (
    <header className={styles.container}>
      <button
        onClick={handleClick}
      >
        <CloseIcon className={styles.close} />
      </button>
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
