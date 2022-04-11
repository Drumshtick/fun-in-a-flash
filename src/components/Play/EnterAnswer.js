import React from 'react';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/EnterAnswer.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EnterAnswer = ({ submitAnswer, disableSubmit }) => {
  return (
    <IconButton
      disabled={disableSubmit}
      className={styles.btn}
      onClick={submitAnswer}
    >
      <CheckCircleIcon />
    </IconButton>
  );
};

export default EnterAnswer;
