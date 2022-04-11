import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CLEAR_INTERVAL_ID } from '../redux/actions/scoreIntervalActionTypes';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'), { ssr: false });
const Play = dynamic(() => import('../components/Play/Play'));
const FireworksLottie = dynamic(() => import('../components/FireworksLottie'));
const mapStateToProps = (state) => {
  return {
    view: state.view.view,
    scoreInterval: state.scoreInterval.ID
  }
};

const Home = ({ view, scoreInterval, dispatch }) => {

  useEffect(() => {
    if (view !== 'play') {
      clearInterval(scoreInterval);
      dispatch(CLEAR_INTERVAL_ID());
    }
  })

  return (
    <div className={styles.gameContainer}>
      <Head>
        <title>Fun in a flash</title>
        <meta name="description" content="A math flash card app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {view !== 'play' ? (
        <GameInfo />
      ) : (
        <Play />
      )}
      <FireworksLottie />
    </div>
  )
};

export default connect(mapStateToProps)(Home);
