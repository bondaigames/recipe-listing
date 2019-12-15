import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
// import Category from "./containers/Categories/Category/Category";
// import Categories from "./containers/Categories/Categories";
import CreateNewRecipe from "./containers/CreateNewRecipe/CreateNewRecipe";
import { Route, Switch } from "react-router-dom";
import CreateNewCategory from "./containers/Categories/CreateNewCategory/CreateNewCategory";
import RecipeListing from "./containers/RecipeListing/RecipeListing";

function App() {
  return (
    <div>
      <Container>
        <Navigation />
        <Row>
          {/* <Col xs={0} md={3}></Col> */}
          <Col xs={12} md={12}>
            <Switch>
              <Route
                path="/create-new-recipe"
                component={CreateNewRecipe}
              ></Route>
              <Route
                path="/create-new-category"
                component={CreateNewCategory}
              ></Route>
              <Route path="/recipe-listing" component={RecipeListing}></Route>
            </Switch>
          </Col>
        </Row>
        <Footer></Footer>
      </Container>
    </div>
  );
}

export default App;
