import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../../styles/Stats.module.scss';

const TOTAL_QUESTIONS: string = process.env.NEXT_PUBLIC_TOTAL_QUESTIONS

interface Stats {
  view: string,
  accuracy?: number,
  totalScore?: number,
  highScore: number,
}

const Stats: React.FC<Stats> = ({
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
      {view === 'done' && (
        <p className={styles.scoreLabel}>
          CORRECT ANSWERS
        </p>
      )}
      {view === 'done' && (
        <div className={styles.accuracy}>
          <h2>{accuracy}/{TOTAL_QUESTIONS}</h2>
          <CheckIcon />
        </div>
      )}
    </div>
  );
};

export default Stats;
