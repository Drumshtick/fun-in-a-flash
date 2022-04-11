import React from "react";
import { connect } from 'react-redux';
import { KeyboardInput, QuestionScore, EnterAnswer, ResultPrompt } from './index';
import Swipe from 'react-easy-swipe';
import debounce from '../../helpers/debounce';
import styles from '../../styles/QuestionArea.module.scss';

const MIN_SWIPE_DELTA = parseInt(process.env.NEXT_PUBLIC_SWIPE_MIN_DELTA);

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
  
  const onSwipeMove = (position, event) => {
    if (!submitAnswer) return;

    if (position.x < 0 && position.x < (MIN_SWIPE_DELTA * -1)) {
      submitAnswer();
    }
  };

  return (
    <Swipe
      className={styles.container}
      onSwipeMove={debounce(onSwipeMove, 750)}
    >
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
  </Swipe>
  );
};



export default connect(mapStateToProps)(QuestionArea);
