import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DECREASE_SCORE } from '../redux/actions/scoreActionTypes';
import { SET_INTERVAL_ID } from '../redux/actions/scoreIntervalActionTypes';

const REDUCE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_REDUCE_SCORE_INTERVAL);

const useScoreDropper = () => {
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
    dispatch(SET_INTERVAL_ID(intervalID));
    return () => {
      clearInterval(intervalID);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dropScore) return;
    if (time - questionStartTime >= REDUCE_INTERVAL) {
      setQuestionStartTime(time);
      dispatch(DECREASE_SCORE());
    }
  }, [dropScore, time, questionStartTime, dispatch]);

  return {scoreDropper, setDropScore, setQuestionStartTime};
};

export default useScoreDropper;
