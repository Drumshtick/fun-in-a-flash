import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import fireworks from '../../public/lottie/98350-fireworks.json';
import { connect } from 'react-redux';
import { PLAY_FIREWORKS, STOP_FIREWORKS } from '../redux/actions/lottieActionsTypes';
import sleep from '../helpers/sleep';

import styles from '../styles/FireworksLottie.module.scss';

const FIREWORKS_START_DELAY = parseInt(process.env.NEXT_PUBLIC_FIREWORKS_START_DELAY);
const FIREWORKS_STOP_DELAY = parseInt(process.env.NEXT_PUBLIC_FIREWORKS_STOP_DELAY);

const mapStateToProps = (state) => {
  return {
    play: state.lottie.fireworks,
    played: state.lottie.fireworksPlayed,
    madeHighScore: state.madeHighScore.madeHighScore,
    view: state.view.view
  };
};

const FireworksLottie = ({ play, played, dispatch, madeHighScore, view }) => {
  
  useEffect(() => {
    const controlLottie = async () => {
      if (view !== 'done') return;
      console.log("EXECUTED")
      dispatch(PLAY_FIREWORKS());
      await sleep(FIREWORKS_STOP_DELAY);
      dispatch(STOP_FIREWORKS());
    };
    if (madeHighScore) {
      controlLottie();
    }
  }, [ madeHighScore, played, view, dispatch ])

  return (
    <Lottie
      animationData={fireworks}
      loop={true}
      autoplay={true}
      className={play ? styles.lottie : styles.hidden}
      // className={styles.lottie}
    />
  );
};

export default connect(mapStateToProps)(FireworksLottie);
