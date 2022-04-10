import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_PLAY } from '../../redux/actions/viewActionTypes';
import CasinoIcon from '@mui/icons-material/Casino';
import { Button } from '@mui/material';
import { InfoHeader, Stats } from './index';
import styles from '../../styles/GameInfo.module.scss';

const mapStateToProps = (state) => {
  return {
    view: state.view.view,
    totalScore: state.totalScore.totalScore,
    accuracy: state.accuracy.correct
  };
}


const GameInfo = ({ view, dispatch, totalScore, accuracy }) => {

  const handleClick = () => {
    dispatch(SWITCH_VIEW_TO_PLAY());
  };

  return (
    <div className={styles.mainContainer}>
      <InfoHeader view={view} />
      <Stats
        view={view}
        totalScore={totalScore}
        accuracy={accuracy}
      />
      <div className={styles.playButtonContainer}>
        <Button
          className={styles.playButton}
          onClick={handleClick}
        >
          start game
          <CasinoIcon />
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(GameInfo);
