import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navigation = props => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand className="text-white" href="#home">
        Recipe Listing App
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="bg-light"
      ></Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/">
            Home
          </NavLink>
          <NavLink
            className="d-inline p-2 bg-dark text-white"
            to="/create-new-category"
          >
            Create New Category
          </NavLink>
          <NavLink
            className="d-inline p-2 bg-dark text-white"
            //href="/create-new-recipe"
            to="/create-new-recipe"
          >
            Create New Recipe
          </NavLink>
          <NavLink
            className="d-inline p-2 bg-dark text-white"
            //href="/recipe-listing"
            to="/recipe-listing"
          >
            Recipe Listing
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navigation;
