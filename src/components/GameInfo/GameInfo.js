import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_VIEW_TO_PLAY } from '../../redux/actions/viewActionTypes';
import { OPEN_REVIEW, CLOSE_REVIEW } from '../../redux/actions/openReivewActionTypes';
import { NEXT_RESULT, PREV_RESULT, RESET_ACTIVE_RESULT } from '../../redux/actions/activeResultActionTypes';
import { RESET_QUESTION_COUNT } from '../../redux/actions/questionActionTypes';
import { RESET_RESULTS } from '../../redux/actions/setResultsActionTypes';
import { RESET_SCORE } from '../../redux/actions/scoreActionTypes';
import { RESET_TOTAL_SCORE } from '../../redux/actions/totalScoreActionTypes';
import { RESET_ACCURACY } from '../../redux/actions/accuracyActionTypes';
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
    highScore: state.highScore.highScore,
    madeHighScore: state.madeHighScore.madeHighScore
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
  highScore,
  madeHighScore
}) => {
  const maxResult = results.length;

  const handlePlay = () => {
    dispatch(RESET_QUESTION_COUNT());
    dispatch(RESET_RESULTS());
    dispatch(RESET_ACCURACY());
    dispatch(RESET_SCORE());
    dispatch(RESET_ACTIVE_RESULT());
    dispatch(RESET_TOTAL_SCORE());
    dispatch(CLOSE_REVIEW());
    dispatch(SWITCH_VIEW_TO_PLAY());
  };

  const handleReview = () => {
    if (!openReview) {
      dispatch(OPEN_REVIEW());
      return;
    }
    dispatch(CLOSE_REVIEW());
    dispatch(RESET_ACTIVE_RESULT());
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
              className={results[activeResult].correct ? styles.isCorrect : styles.isIncorrect}
            >
              {results[activeResult].correct ? <CheckIcon /> : <DoNotDisturbIcon />}
            </div>
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
    </div>
  );
};

export default connect(mapStateToProps)(GameInfo);
