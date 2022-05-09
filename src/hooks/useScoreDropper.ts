import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { DECREASE_SCORE } from '../redux/actions/scoreActionTypes';
import { SET_INTERVAL_ID } from '../redux/actions/scoreIntervalActionTypes';
import CONSTANTS from '../helpers/constants';

const {
  REDUCE_INTERVAL
} = CONSTANTS;

const useScoreDropper = (score: number, disableSubmit: boolean) => {
  const dispatch: AppDispatch = useDispatch();
  const [ dropScore, setDropScore ] = useState(false);

  const scoreDropper = (): void => {
    setDropScore(true)
  };

  useEffect(() => {
    if (!dropScore) return;
    const ID: ReturnType<typeof setTimeout> = setTimeout(() => {
        dispatch(DECREASE_SCORE())
      }, REDUCE_INTERVAL)
    dispatch(SET_INTERVAL_ID(ID));
    return () => {
      clearTimeout(ID);
    };
  }, [dropScore, dispatch, score])

  return {scoreDropper, setDropScore};
};

export default useScoreDropper;
