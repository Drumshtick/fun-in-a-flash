import Lottie from 'lottie-react';
import fireworks from '../../public/lottie/98350-fireworks.json';
import { connect } from 'react-redux';
import { PLAY_FIREWORKS, STOP_FIREWORKS } from '../redux/actions/lottieActionsTypes';
import sleep from '../helpers/sleep';

import styles from '../styles/FireworksLottie.module.scss';

const FIREWORKS_DELAY = parseInt(process.env.NEXT_PUBLIC_FIREWORKS_DELAY);

const mapStateToProps = (state) => {
  return {
    play: state.lottie.fireworks,
    played: state.lottie.fireworksPlayed,
    madeHighScore: state.madeHighScore.madeHighScore
  };
};

const FireworksLottie = ({ play, played, dispatch, madeHighScore }) => {
  console.log(FIREWORKS_DELAY)
  console.log(madeHighScore && !played)
  const controlLottie = async () => {
    await sleep(FIREWORKS_DELAY);
    dispatch(PLAY_FIREWORKS());
    await sleep(FIREWORKS_DELAY);
    dispatch(STOP_FIREWORKS());
  };

  if (madeHighScore && !played) {
    controlLottie();
  }

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
