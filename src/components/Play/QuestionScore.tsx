import React from 'react';
import {connect} from 'react-redux';
import {State} from '../../redux/store';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '../../styles/QuestionScore.module.scss';

function mapStateToProps(state: State) {
  return {
    score: state.score.score,
    view: state.view.view
  };
}

interface QuestionScore {
  score: number,
  reviewScore: number,
  view: string,
  changeScore: boolean
}

const QuestionScore: React.FC<QuestionScore> = ({ score, reviewScore, view, changeScore }) => {
  return (
    <div className={`${styles.score} ${changeScore && styles.scoreChange} ${score <= 100 && styles.lowScore}`}>
      <p>
        {view === 'done' ? reviewScore : (score === 0 ? '----' : score)}
      </p>
      <StarsIcon />
    </div>
  );
}


export default connect(mapStateToProps)(QuestionScore);
