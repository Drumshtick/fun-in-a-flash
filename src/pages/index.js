import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
// Dynamic imports allows the loading of modules on demand, prevents loading of unused code 
const GameInfo = dynamic(() => import('../components/GameInfo/GameInfo'));
const Play = dynamic(() => import('../components/Play/Play'));
export default function Home() {
  return (
    <div className={styles.gameContainer}>
      <Head>
        <title>Fun in a flash</title>
        <meta name="description" content="A math flash card app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <GameInfo /> */}
      <Play />
    </div>
  )
}
