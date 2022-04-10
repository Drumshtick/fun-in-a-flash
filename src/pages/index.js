import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
// Dynamic imports allows the loading of modules on demand, prevents loading of unused code 
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));
const Play = dynamic(() => import('../components/Play/Play'));

const mapStateToProps = (state) => {
  return {
    view: state.view.view
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
      
    </div>
  )
};

export default connect(mapStateToProps)(Home);
