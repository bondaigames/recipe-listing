import React from "react";
import { connect } from "react-redux";

const categoryabc = props => {
  return (
    <div>
      <button onClick={props.onIncrementCounter}>Counter++</button>
      {props.ctr}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ctr: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(categoryabc);
