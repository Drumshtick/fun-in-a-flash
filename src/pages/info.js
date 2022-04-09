import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
import { connect } from 'react-redux';
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));

function mapStateToProps(state) {
  return {
    answer: state.input.answer
  }
}

const Info = (props) => {
  return (
    <div className={styles.gameContainer}>
      <GameInfo />
    </div>
  );
};

export default connect(mapStateToProps)(Info);
