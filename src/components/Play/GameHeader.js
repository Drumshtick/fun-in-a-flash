import React from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/GameHeader.module.scss';

const TOTAL_QUESTIONS = process.env.NEXT_PUBLIC_TOTAL_QUESTIONS;

function mapStateToProps(state) {
  return {
    questionNumber: state.question.questionNumber,
    totalScore: state.totalScore.totalScore
  };
}

const GameHeader = ({ questionNumber, totalScore }) => {
  return (
    <header className={styles.container}>
      <CloseIcon className={styles.close} />
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
