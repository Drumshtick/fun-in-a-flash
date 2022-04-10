import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_PLAY } from '../../redux/actions/viewActionTypes';
import { OPEN_REVIEW, CLOSE_REVIEW } from '../../redux/actions/openReivewActionTypes';
import { NEXT_RESULT, PREV_RESULT, RESET_ACTIVE } from '../../redux/actions/activeResultActionTypes';
import CasinoIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { InfoHeader, Stats, ReviewResults } from './index';
import styles from '../../styles/GameInfo.module.scss';
import { QuestionArea } from '../Play/index';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckIcon from '@mui/icons-material/Check';

const mapStateToProps = (state) => {
  return {
    view: state.view.view,
    totalScore: state.totalScore.totalScore,
    accuracy: state.accuracy.correct,
    openReview: state.openReview.open,
    results: state.results.results,
    activeResult: state.activeResult.active,
    highScore: state.highScore.highScore
  };
}


const GameInfo = ({
  view,
  dispatch,
  totalScore,
  accuracy,
  openReview,
  results,
  activeResult,
  highScore
}) => {
  const maxResult = results.length;
  console.log('maxResult: ', maxResult);
  console.log('activeResult: ', activeResult);
  const handlePlay = () => {
    dispatch(SWITCH_VIEW_TO_PLAY());
  };

  const handleReview = () => {
    if (!openReview) {
      dispatch(OPEN_REVIEW());
      return;
    }
    dispatch(CLOSE_REVIEW());
    dispatch(RESET_ACTIVE());
  };

  const handleNextResult = () => {
    if (activeResult + 1 === maxResult) {
      return;
    }
    dispatch(NEXT_RESULT());
  }; 

  const handleLastResult = () => {
    if (activeResult + 1 === 1) {
      return;
    }
    dispatch(PREV_RESULT());

  };

  return (
    <div className={styles.mainContainer}>
      <InfoHeader view={view} />
      { !openReview ? (
        <Stats
          view={view}
          totalScore={totalScore}
          accuracy={accuracy}
          highScore={highScore}
        />
        ) : (
          <div className={styles.reviewContainer}>
            <QuestionArea reviewState={results[activeResult]} />
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
            <div
              className={results[activeResult].answer === '' ? styles.isIncorrect : styles.isCorrect}
            >
              {results[activeResult].answer === '' ? <DoNotDisturbIcon /> : <CheckIcon />}
            </div>
          </div>
        )
      }
      { view === 'done' && (
        <div className={styles.reviewButtonContainer}>
          <Button
            className={styles.reviewButton}
            onClick={handleReview}
          >
            review answers
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
    </div>
  );
};

export default connect(mapStateToProps)(GameInfo);
