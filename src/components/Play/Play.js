import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/Play.module.scss';
import { GameHeader, QuestionArea, GameInput } from './index';

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
      <QuestionArea />
      <GameInput />
    </div>  
  );
};

export default connect(mapStateToProps)(Play);
