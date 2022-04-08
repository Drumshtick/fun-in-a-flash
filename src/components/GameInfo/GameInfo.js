import React from 'react';
import { connect } from 'react-redux';
import StarsIcon from '@mui/icons-material/Stars';
import CasinoIcon from '@mui/icons-material/Casino';
import { Button } from '@mui/material';
import styles from '../../styles/GameInfo.module.scss';

function mapStateToProps(state) {
  return {
    // State needed in StartGame here
    // count: state.count
  };
}


const GameInfo = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <p>Fun in a flash:</p>
        <h1>Math Cards!</h1>
      </div>
      <div className={styles.highScoreContainer}>
        <p className={styles.highScoreLabel}>CURRENT HIGH SCORE</p>
        <div className={styles.highScoreValue}>
          <h2>1208</h2>
          <StarsIcon />
        </div>
      </div>
      <div className={styles.playButtonContainer}>
        <Button
          className={styles.playButton}
        >
          start game
          <CasinoIcon />
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(GameInfo);
