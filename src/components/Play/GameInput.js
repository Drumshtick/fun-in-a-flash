import React from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { connect } from 'react-redux';
import { INPUT_NUMBER, DELETE_NUMBER, RESET_GUESS } from '../../redux/actions/actionTypes';
import styles from '../../styles/GameInput.module.scss';

function mapStateToProps(state) {
  return {
    answer: state.answer
  };
}

const keyboardLayout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "clear 0 backspace"],
};

const GameInput = (props) => {
  console.log(props)
  const keyboardSpecialActions = {
    'clear': () => props.dispatch(RESET_GUESS()),
    'backspace': () => props.dispatch(DELETE_NUMBER())
  }

  const onChange = (input) => {
    props.dispatch(INPUT_NUMBER(input));
  }

  const onKeyPress = (button) => {
    if (keyboardSpecialActions[button]) {
      keyboardSpecialActions[button]();
      return;
    }

    props.dispatch(INPUT_NUMBER(button));
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

export default connect(mapStateToProps)(GameInput);

