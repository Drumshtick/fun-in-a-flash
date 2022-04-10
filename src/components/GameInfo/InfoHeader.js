import React from 'react';
import styles from '../../styles/InfoHeader.module.scss';

const InfoHeader = ({ view, madeHighScore, totalScore }) => {

  let message = (madeHighScore === true ? 'high score!' : 'well done!');

  if (message === 'well done!' && totalScore < 300) {
    message = 'try again!';
  }

  return (
    <header className={styles.header}>
      {view === 'welcome' && (
        <p>Fun in a flash:</p>
      )}
      <h1
        className={view === 'done' ? styles.done : ''}
      >
        {
          view === 'welcome' ? (
            'math cards!'
          ) : (
            message
          )
        }
      </h1>
    </header>
  );
};

export default InfoHeader;
