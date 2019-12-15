import React from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";

const categories = props => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home" className="bg-secondary text-white">
        Create New Recipe
      </Nav.Link>
      <Nav.Link eventKey="link-1" className="bg-secondary text-white">
        Link
      </Nav.Link>
      <Nav.Link eventKey="link-2" className="bg-secondary text-white">
        Link
      </Nav.Link>
      <Nav.Link></Nav.Link>
    </Nav>
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
)(categories);
