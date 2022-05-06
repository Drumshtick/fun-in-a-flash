import React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../styles/EnterAnswer.module.scss';

interface EnterAnswer {
  submitAnswer: Function,
  disableSubmit: boolean
}

const EnterAnswer: React.FC<EnterAnswer> = ({ submitAnswer, disableSubmit }) => {
  return (
    //@ts-ignore
    <IconButton
      className={`${styles.btn} ${disableSubmit && styles.clicked}`}
      disabled={disableSubmit}
      onClick={submitAnswer}
    >
      <CheckCircleIcon />
    </IconButton>
  );
};

export default EnterAnswer;
