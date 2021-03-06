import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, State } from '../redux/store';
import { SET_HIGH_SCORE } from '../redux/actions/highScoreActionTypes';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { IconButton, Snackbar, Alert } from '@mui/material';
import styles from '../styles/Home.module.scss';
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));
const Play = dynamic(() => import('../components/Play/Play'));
const FireworksLottie = dynamic(() => import('../components/FireworksLottie'));
import useFullScreenAPI from '../hooks/useFullScreenAPI';
import useDeviceCheck from '../hooks/useDeviceCheck';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import localStorageCheck from '../helpers/localStorageCheck';

const mapStateToProps = (state: State) => {
  return {
    view: state.view.view,
    scoreInterval: state.scoreInterval.ID,
    newHighScore: state.madeHighScore.madeHighScore,
    highScore: state.highScore.highScore
  }
};

interface HomeProps {
  view: string,
  dispatch: AppDispatch,
  newHighScore: boolean,
  highScore: number
}

const Home: React.FC<HomeProps> = ({view, dispatch, newHighScore, highScore}) => {
  const {isMobile} = useDeviceCheck();
  const {isFullScreen, handleErrorSnackClose, toggleFullScreen, openError, fullScreenError} = useFullScreenAPI();

  useEffect(() => {
    if (typeof window !== undefined && localStorageCheck('localStorage')) {
      const highScore: string = JSON.parse(window.localStorage.getItem('HighScore'));
      if (highScore) {
        dispatch(SET_HIGH_SCORE(highScore))
        return;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newHighScore && highScore && localStorageCheck('localStorage')) {
      window.localStorage.setItem('HighScore', JSON.stringify(highScore));
    }
  }, [newHighScore, highScore]);

  return (
    <div
      className={`${styles.gameContainer} ${isMobile && styles.mobile}`}
    >
      <Head>
        <title>Fun in a flash</title>
        <meta name="description" content="A math flash card app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        view !== 'play' ?
        <GameInfo /> :
        <Play />
      }
      <div
        className={`${styles.OpenFullScreen} ${view === 'play' && styles.playOpenFullScreen}`}
      >
        <IconButton onClick={toggleFullScreen}>
          {
            isFullScreen ?
            <FullscreenExitIcon /> :
            <FullscreenIcon />
          }
        </IconButton>
      </div>
      <div className={styles.errorSnack}>
        <Snackbar sx={{width: '97%'}} open={openError} onClose={handleErrorSnackClose}>
          <Alert onClose={handleErrorSnackClose} severity={'error'} sx={{ width: '100%' }}>
            {fullScreenError}
          </Alert>
        </Snackbar>
      </div>
      <FireworksLottie />
    </div>
  )
};

export default connect(mapStateToProps)(Home);
