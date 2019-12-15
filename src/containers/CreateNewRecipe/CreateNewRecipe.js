import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import { Button } from "react-bootstrap";
import axios from "../../axios/recipes/axios-recipes";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class CreateNewRecipe extends Component {
  _isMount = false;
  state = {
    recipeForm: {
      recipeName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Please enter recipe name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 200,
          errorMessage:
            "Recipe name should be filled between 5 to 200 characters"
        },
        valid: false,
        touched: false
      },
      category: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "-1", displayValue: "Select a category" }]
        },
        value: "",
        validation: {},
        valid: true
      },
      ingredients: {
        elementType: "CKEditor",
        elementConfig: {
          type: "classic"
          //   placeholder: "Please enter ingredients",
          //   rows: 5
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    this._isMount = true;
    axios
      .get("/categories.json")
      .then(res => {
        const updatedRecipeForm = Object.assign({}, this.state.recipeForm);
        // const updatedRecipeForm = {
        //   ...this.state.recipeForm
        // };
        // const fetchedCategories = [
        //   ...updatedRecipeForm["category"]["elementConfig"]["options"]
        // ];
        //console.log(fetchedCategories);

        // for (let key in res.data) {
        //   fetchedCategories.push({
        //     displayValue: res.data[key].categoryName,
        //     value: key
        //   });
        // }

        const valueArray = Object.keys(res.data).map(key => {
          return {
            displayValue: res.data[key].categoryName,
            value: key
          };
        });

        const fetchedCategories = [
          ...updatedRecipeForm["category"]["elementConfig"]["options"],
          ...valueArray
        ];
        console.log(fetchedCategories);

        updatedRecipeForm["category"]["elementConfig"][
          "options"
        ] = fetchedCategories;
        if (this._isMount) {
          this.setState({
            loading: false,
            recipeForm: updatedRecipeForm
          });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  recipeHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for (let formElementIndentifier in this.state.recipeForm) {
      formData[formElementIndentifier] = this.state.recipeForm[
        formElementIndentifier
      ].value;
    }

    formData["createdDate"] = new Date();
    // const recipe = {
    //   recipe: formData
    // };

    axios
      .post("/recipes.json", formData)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, editor, inputIdentifier) => {
    const updatedRecipeForm = {
      ...this.state.recipeForm
    };
    const updatedFormElement = {
      ...updatedRecipeForm[inputIdentifier]
    };
    if (updatedFormElement.elementType === "CKEditor") {
      updatedFormElement.value = editor.getData();
    } else {
      updatedFormElement.value = event.target.value;
    }
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedRecipeForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedRecipeForm) {
      formIsValid = updatedRecipeForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ recipeForm: updatedRecipeForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.recipeForm) {
      formElementArray.push({
        id: key,
        config: this.state.recipeForm[key]
      });
    }
    let form = (
      <form onSubmit={this.recipeHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidation={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.validation.errorMessage}
            changed={(event, editor) =>
              this.inputChangedHandler(event, editor, formElement.id)
            }
          />
        ))}
        <Button type="submit" disabled={!this.state.formIsValid}>
          Submit
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4>Create New Recipe</h4>
        {form}
      </div>
    );
  }
}

export default withErrorHandler(CreateNewRecipe, axios);
