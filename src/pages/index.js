import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
import useFullScreenAPI from '../hooks/useFullScreenAPI';
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));
const Play = dynamic(() => import('../components/Play/Play'));
const FireworksLottie = dynamic(() => import('../components/FireworksLottie'));

const mapStateToProps = (state) => {
  return {
    view: state.view.view,
  }
};

const Home = ({ view }) => {

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
