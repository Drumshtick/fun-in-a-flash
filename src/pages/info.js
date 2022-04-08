import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));

export default function Info() {
  return (
    <div className={styles.gameContainer}>
      <GameInfo />
    </div>
  );
};
