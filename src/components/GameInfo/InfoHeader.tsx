import React, {useEffect, useState} from 'react';
import styles from '../../styles/InfoHeader.module.scss';

interface InfoHeader {
  view: string,
  madeHighScore: boolean,
  totalScore: number
}

const InfoHeader: React.FC<InfoHeader> = ({ view, madeHighScore, totalScore }) => {
  const [ message, setMessage ] = useState('');

  useEffect(() => {

    if (!madeHighScore && totalScore < 300) {
      setMessage('Try again!');
      return;
    }

    if (madeHighScore) {
      setMessage('high score!');
      return;
    }
    
    setMessage('well done!');
    
  }, [madeHighScore, totalScore]);

  return (
    <header className={styles.header}>
      {
        view === 'welcome' && 
        <p>Fun in a flash:</p>
      }
      <h1
        className={view === 'done' ? styles.done : ''}
      >
        {
          view === 'welcome' ?
          'math cards!' :
          message
        }
      </h1>
    </header>
  );
};

export default InfoHeader;
