import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DECREASE_SCORE } from '../redux/actions/scoreActionTypes';

const REDUCE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_INTERVAL);

const useScoreDropper = () => {
  const { score } = useSelector(state => {
    return {
      score: state.score.score
    }
  });
  const dispatch = useDispatch();
  const [ time, setTime ] = useState(null);
  const [ dropScore, setDropScore ] = useState(false);
  const [ questionStartTime, setQuestionStartTime ] = useState(null);

  const scoreDropper = useCallback(() => {
    setQuestionStartTime(time);
    setDropScore(true)
  }, [ time ])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const secondsSinceEpoch = Math.round(Date.now() / 1000)
      setTime(secondsSinceEpoch);
    }, 1000);
    // Not sure why this is triggering memory leak
    // dispatch(SET_INTERVAL_ID(intervalID));
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (!dropScore) return;
    if (time - questionStartTime >= REDUCE_INTERVAL) {
      dispatch(DECREASE_SCORE());
      setQuestionStartTime(time);
    }
  }, [ dropScore, time, questionStartTime, score, dispatch ]);

  return { scoreDropper, setDropScore, setQuestionStartTime };
};

export default useScoreDropper;
// export default connect(mapStateToProps)(useScoreDropper);
