import React from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/GameHeader.module.scss';

function mapStateToProps(state) {
  return {
    // State needed in StartGame here
    // count: state.count
  };
}

const GameHeader = () => {
  return (
    <div className={styles.container}>
      <header>
        <CloseIcon className={styles.close} />
        <div className={styles.scoreTotalContainer}>
          <p className={styles.scoreTotalLabel}>SCORE</p>
          <div className={styles.scoreTotalValue}>
            <p>1074</p>
            <StarsIcon />
          </div>
        </div>
        <div className={styles.scoreTotalContainer}>
          <p className={styles.scoreTotalLabel}>QUESTION</p>
          <div className={styles.scoreTotalValue}>
            <p>5/6</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default connect(mapStateToProps)(GameHeader);
