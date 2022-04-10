import React from 'react';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/EnterAnswer.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EnterAnswer = ({ submitAnswer }) => {
  return (
    <IconButton
      className={styles.btn}
      onClick={submitAnswer}
    >
      <CheckCircleIcon />
    </IconButton>
  );
};

export default EnterAnswer;
