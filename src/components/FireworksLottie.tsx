import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import fireworks from '../../public/lottie/98350-fireworks.json';
import {State} from '../redux/store';
import {connect} from 'react-redux';
import sleep from '../helpers/sleep';

import styles from '../styles/FireworksLottie.module.scss';

const FIREWORKS_STOP_DELAY = parseInt(process.env.NEXT_PUBLIC_FIREWORKS_STOP_DELAY);

interface FireworksLottie {
  madeHighScore: boolean,
  view: string
}

const mapStateToProps = (state: State) => {
  return {
    madeHighScore: state.madeHighScore.madeHighScore,
    view: state.view.view
  };
};

const FireworksLottie: React.FC<FireworksLottie> = ({ madeHighScore, view }) => {
  const [ play, setPlay ] = useState(false);

  useEffect(() => {
    const controlLottie = async (): Promise<null> => {
      if (view !== 'done') return;
      setPlay(true);
      await sleep(FIREWORKS_STOP_DELAY);
      setPlay(false);
    };

    if (madeHighScore) {
      controlLottie();
    }
  }, [madeHighScore, view])

  return (
    <Lottie
      animationData={fireworks}
      loop={true}
      autoplay={true}
      className={play ? styles.lottie : styles.hidden}
    />
  );
};

export default connect(mapStateToProps)(FireworksLottie);
