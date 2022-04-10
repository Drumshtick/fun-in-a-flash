import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/Stats.module.scss';

const TOTAL_QUESTIONS = process.env.NEXT_PUBLIC_TOTAL_QUESTIONS

const Stats = ({
  view,
  accuracy,
  totalScore,
  highScore,
}) => {
  return (
    <div
      className={view === 'welcome' ? styles.welcomeContainer : styles.doneContainer}
    >
      <p className={styles.scoreLabel}>
        {
          view === 'welcome' ? (
            'CURRENT HIGH SCORE'
          ) : (
            'TOTAL SCORE'
          )
          }
      </p>
      <div className={styles.scoreValue}>
        <h2>{view === 'welcome' ? highScore : totalScore}</h2>
        <StarsIcon />
      </div>
      <p className={styles.scoreLabel}>
        CORRECT ANSWERS
      </p>
      <div className={styles.accuracy}>
        <h2>{accuracy}/{TOTAL_QUESTIONS}</h2>
        <StarsIcon />
      </div>
    </div>
  );
};

export default Stats;
