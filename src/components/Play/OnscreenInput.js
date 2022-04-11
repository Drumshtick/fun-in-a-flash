import React from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { connect } from 'react-redux';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/inputActionTypes';
import styles from '../../styles/GameInput.module.scss';

const MAX_CHAR = process.env.NEXT_PUBLIC_MAX_ANSWER_LENGTH;

function mapStateToProps(state) {
  return {
    answer: state.input.answer
  };
}

const keyboardLayout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "clear 0 backspace"],
};

const OnscreenInput = ({ dispatch, answer }) => {

  const keyboardSpecialActions = {
    'clear': () => dispatch(RESET_GUESS()),
    'backspace': () => dispatch(DELETE_NUMBER())
  };

  const onKeyPress = (button) => {
    if (keyboardSpecialActions[button]) {
      keyboardSpecialActions[button]();
      return;
    }
    if (answer.length < MAX_CHAR) {
      dispatch(INPUT_NUMBER(button));
    }
  }

  return (
    <div className={styles.container}>
      <Keyboard
        className={styles.keyboard}
        onKeyPress={onKeyPress}
        theme={`hg-theme-default hg-layout-numeric numeric-theme ${styles.keyboard}`}
        buttonTheme={[
          {
            class: styles.btn,
            buttons: '1 2 3 4  5 6 7 8 9 0 . clear'
          },
          {
            class: styles.backBtn,
            buttons: 'backspace'
          }
          ]}
        layout={keyboardLayout}
        layoutName={'default'}
      />
    </div>
  );
};

export default connect(mapStateToProps)(OnscreenInput);

