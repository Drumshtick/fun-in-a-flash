import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    // State needed in StartGame here
    // count: state.count
  };
}


const StartGame = () => {
  return (
    <div></div>
  );
};

export default connect(mapStateToProps)(StartGame);
