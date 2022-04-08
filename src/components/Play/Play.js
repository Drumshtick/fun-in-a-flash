import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import StarsIcon from '@mui/icons-material/Stars';

function mapStateToProps(state) {
  return {
    // State needed in StartGame here
    // count: state.count
  };
}

const Play = () => {
  return (
    <div className={styles.container}>
      <header>
        <CloseIcon />
        <div className={styles.scoreContainer}>
          <p>SCORE</p>
          <div className={styles.scoreValue}>
            <p>1074</p>
            <StarsIcon />
          </div>
        </div>
        <div className={styles.questionCountContainer}>
          <p>QUESTION</p>
          <p className={styles.questionCount}>5/6</p>
        </div>
      </header>
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
