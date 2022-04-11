import React, { useState } from 'react';
import Swipe from 'react-easy-swipe';
import debounce from '../../helpers/debounce';
import { Button } from '@mui/material';
import { InfoHeader, Stats } from './index';
import { QuestionArea } from '../Play/index';

import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_PLAY } from '../../redux/actions/viewActionTypes';
import { RESET_RESULTS } from '../../redux/actions/setResultsActionTypes';
import { RESET_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import CasinoIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import styles from '../../styles/GameInfo.module.scss';

const MIN_SWIPE_DELTA = parseInt(process.env.NEXT_PUBLIC_SWIPE_MIN_DELTA);
const DEBOUNCE_DELAY = parseInt(process.env.NEXT_PUBLIC_DEBOUNCE_SWIPE_DELAY);


const mapStateToProps = (state) => {
  return {
    view: state.view.view,
    totalScore: state.totalScore.totalScore,
    accuracy: state.results.correct,
    results: state.results.results,
    highScore: state.highScore.highScore,
    madeHighScore: state.madeHighScore.madeHighScore
  };
}


const GameInfo = ({
  view,
  dispatch,
  totalScore,
  accuracy,
  results,
  highScore,
  madeHighScore
}) => {
  const [ openReview, setOpenReview ] = useState(false);
  const [ activeResult, setActiveResult ] = useState(0)
  const maxResult = results.length;
  const onSwipeMove = (position) => {
    if (position.x < 0 && position.x < (MIN_SWIPE_DELTA * -1)) {
      handleNextResult();
    }

    if (position.x > 0 && position.x > MIN_SWIPE_DELTA) {
      handleLastResult();
    }
  };

  const handlePlay = () => {
    setOpenReview(false);
    dispatch(RESET_RESULTS());
    dispatch(RESET_TOTAL_SCORE());
    dispatch(SWITCH_VIEW_TO_PLAY());
  };

  const handleReview = () => {
    if (!openReview) {
      setOpenReview(true);
      return;
    }
    setOpenReview(false);
    setActiveResult(0);
  };

  const handleNextResult = () => {
    if (activeResult + 1 === maxResult) {
      return;
    }
    setActiveResult(activeResult + 1);
  }; 

  const handleLastResult = () => {
    if (activeResult + 1 === 1) {
      return;
    }
    setActiveResult(activeResult - 1);
  };

  return (
    <Swipe
      onSwipeMove={debounce(onSwipeMove, DEBOUNCE_DELAY)}
      className={styles.mainContainer}
    >
      <InfoHeader
        view={view}
        madeHighScore={madeHighScore}
        totalScore={totalScore}
      />
      {view === 'welcome' && (
        <Stats
          view={view}
          highScore={highScore}
        />
      )}
      { view === 'done' && (!openReview ? (
          <Stats
            view={view}
            totalScore={totalScore}
            accuracy={accuracy}
            highScore={highScore}
          />
        ) : (
          <div className={styles.reviewContainer}>
            <QuestionArea reviewState={results[activeResult]} correct={results[activeResult].correct} />
            <Button
              className={activeResult + 1 === maxResult ? styles.disabled : styles.nextBtn}
              onClick={handleNextResult}
            >
              <ArrowRightIcon />
            </Button>
            <Button
              disabled={activeResult === 0}
              className={activeResult === 0 ? styles.disabled : styles.lastBtn}
              onClick={handleLastResult}
            >
              <ArrowLeftIcon />
            </Button>
          </div>
        ))
      }
      { view === 'done' && (
        <div className={styles.reviewButtonContainer}>
          <Button
            className={styles.reviewButton}
            onClick={handleReview}
          >
            {openReview ? 'close results' : 'review results'}
            <SearchIcon />
          </Button>
        </div>
      )}
      <div className={styles.playButtonContainer}>
        <Button
          className={styles.playButton}
          onClick={handlePlay}
        >
          {view === 'done' ? 'play again' : 'start game'}
          <CasinoIcon />
        </Button>
      </div>
    </Swipe>
  );
};

export default connect(mapStateToProps)(GameInfo);
