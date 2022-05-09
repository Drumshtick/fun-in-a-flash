import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {KeyboardInput, QuestionScore, EnterAnswer, ResultPrompt} from './index';
import Swipe, {SwipePosition, SwipeEvent} from 'react-easy-swipe';
import styles from '../../styles/QuestionArea.module.scss';
const MIN_SWIPE_DELTA: number = parseInt(process.env.NEXT_PUBLIC_SWIPE_MIN_DELTA);

function mapStateToProps(state) {
  return {
    answer: state.input.answer,
    view: state.view.view,
  };
}

interface ReviewState {
  answer: number,
  score: number,
  value1: number,
  value2: number,
}

interface QuestionArea {
  value1?: number,
  value2?: number,
  reviewState?: ReviewState,
  submitAnswer?: Function,
  view?: string,
  correct: boolean,
  disableSubmit?: boolean,
  changeQuestion?: boolean,
  changeScore?: boolean,
  animationStateDispatch?: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionArea: React.FC<QuestionArea> = ({
  value1,
  value2,
  reviewState,
  submitAnswer,
  view,
  correct,
  disableSubmit,
  changeQuestion,
  changeScore,
  animationStateDispatch
}) => {
  const [ activeSwipe, setActiveSwipe ] = useState(false);
  const [ swipeAction, setSwipeAction ] = useState(false);
  const onSwipeMove = (position: SwipePosition ,e: SwipeEvent): void => {
    if (activeSwipe || !submitAnswer) return;
    setActiveSwipe(true);
    if (position.x < 0 && position.x < (MIN_SWIPE_DELTA * -1)) {
      setSwipeAction(true);
      submitAnswer();
    }
    setActiveSwipe(false);
  };
  
  useEffect(() => {
    let timerID: NodeJS.Timer
    if (swipeAction) {
      timerID = setTimeout(() => {
        setSwipeAction(false);
      }, 500)
    }

    return () => {
      clearTimeout(timerID);
    };
  }, [swipeAction]);

  return (
    // @ts-ignore
    <Swipe
      className={`${styles.container} ${swipeAction && styles.swiping}`}
      onSwipeMove={onSwipeMove}
    >
      <QuestionScore reviewScore={view === 'done' && reviewState.score} changeScore={changeScore}/>
      {correct !== null && <ResultPrompt correct={correct} />}
      {!reviewState && <EnterAnswer submitAnswer={submitAnswer} disableSubmit={disableSubmit} />}
      <div className={`${styles.questionContainer} ${changeQuestion && styles.questionChange}`}>
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
