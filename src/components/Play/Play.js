import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader } from './index';

function mapStateToProps(state) {
  return {
    // State needed in StartGame here
    // count: state.count
  };
}

const Play = () => {
  return (
    <div className={styles.container}>
      <GameHeader />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
