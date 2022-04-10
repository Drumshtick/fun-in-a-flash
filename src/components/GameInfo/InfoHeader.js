import React from 'react';
import styles from '../../styles/InfoHeader.module.scss';

const InfoHeader = ({ view }) => {
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
            'high score!'
          )
        }
      </h1>
    </header>
  );
};

export default InfoHeader;
