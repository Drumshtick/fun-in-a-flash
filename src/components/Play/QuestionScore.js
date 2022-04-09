import React from 'react';
import { connect } from 'react-redux';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/QuestionScore.module.scss';

function mapStateToProps(state) {
  return {
    score: state.score.score,
  };
}

const QuestionScore = ({ score }) => {
  return (
    <div className={styles.score}>
      <p>{score}</p>
      <StarsIcon />
    </div>
  );
}


export default connect(mapStateToProps)(QuestionScore);
