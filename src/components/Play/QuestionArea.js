import React from "react";
import { connect } from 'react-redux';
import { KeyboardInput, QuestionScore, EnterAnswer, ResultPrompt } from './index';
import styles from '../../styles/QuestionArea.module.scss';

function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    value1: state.addend.value1,
    value2: state.addend.value2,
    correct: state.answerCorrect.correct,
    view: state.view.view
  };
}



const QuestionArea = ({
  value1,
  value2,
  reviewState,
  submitAnswer,
  view,
  correct
}) => {

  return (
    <div className={styles.container}>
      <QuestionScore reviewScore={view === 'done' && reviewState.score} />
      {correct !== null && <ResultPrompt correct={correct} />}
      {!reviewState && <EnterAnswer submitAnswer={submitAnswer} />}
      <div className={styles.questionContainer}>
        <p>{reviewState ? reviewState.value1 : value1}</p>
        <div>
          <span>+</span><p>{reviewState ? reviewState.value2 : value2}</p>
        </div>
      </div>
      <KeyboardInput
        reviewAnswer={reviewState && reviewState.answer}
        submitAnswer={submitAnswer}
      />
    </div>
  );
};



export default connect(mapStateToProps)(QuestionArea);
