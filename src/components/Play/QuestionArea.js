import React from "react";
import { connect } from 'react-redux';
import styles from '../../styles/QuestionArea.module.scss';

function mapStateToProps(state) {
  return {
    answer: state.answer
  };
}

const QuestionArea = (props) => {
  console.log(props.answer)
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <p>38</p>
        <div>
          <span>+</span><p>22</p>
        </div>
      </div>
      <input
        className={styles.questionField}
        value={props.answer}
      />
    </div>
  );
};



export default connect(mapStateToProps)(QuestionArea);
