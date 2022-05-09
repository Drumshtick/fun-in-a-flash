import React from 'react';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../../styles/ResultPrompt.module.scss';

interface ResultPrompt {
  correct: boolean
}

const ResultPrompt: React.FC<ResultPrompt> = ({ correct }) => {
  return (
    <div className={styles.container}>
      {correct && <CheckIcon className={styles.correct}/>}
      {!correct && <DoNotDisturbIcon className={styles.incorrect}/>}
    </div>
  );
};

export default ResultPrompt;
