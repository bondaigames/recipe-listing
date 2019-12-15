import React, { Component } from "react";
import { Table, Pagination } from "react-bootstrap";
import axios from "../../axios/recipes/axios-recipes";
import Spinner from "../../components/UI/Spinner/Spinner";

class RecipeListing extends Component {
  state = {
    recipes: {},
    total: 0,
    per_page: 5,
    current_page: 1,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        '/recipes.json?orderBy="createdDate"&limitToLast=' + this.state.per_page
      )
      .then(res => {
        console.log(res.data);
        const updatedRecipes = { ...this.state.recipes, ...res.data };
        this.setState({ loading: false, recipes: updatedRecipes });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  componentDidUpdate() {
    console.log("test123", this.state.recipes);
    // axios
    //   .get(
    //     '/recipes.json?orderBy="createdDate"&endAt="2019-09-29T16:10:32.386Z"&limitToLast=10'
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     const updatedRecipes = { ...this.state.recipes, ...res.data };
    //     this.setState({ loading: false, recipes: updatedRecipes });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    const recipeData = Object.keys(this.state.recipes).map((key, index) => {
      return (
        <tr key={key}>
          <td>{index + 1}</td>
          <td>{this.state.recipes[key].recipeName}</td>
        </tr>
      );
    });

    let active = 1;
    let items = [];

    const numberOfPage = Math.ceil(Object.keys(this.state.recipes).length / 10);
    console.log("number page: ", numberOfPage);
    for (let number = 1; number <= numberOfPage; number++) {
      items = [
        ...items,
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      ];
    }

    // this.setState({ total: numberOfPage });

    const paginationBasic = (
      <div className="d-flex align-items-center justify-content-center">
        <Pagination>{items}</Pagination>
      </div>
    );

    let form = (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Recipe Name</th>
            </tr>
          </thead>
          <tbody>{recipeData}</tbody>
        </Table>
        {paginationBasic}
      </div>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div>
        <h4>Recipe Listing</h4>
        {form}
      </div>
    );
  }
}

export default RecipeListing;
