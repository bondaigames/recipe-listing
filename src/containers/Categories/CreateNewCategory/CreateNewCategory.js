import React, { Component } from "react";
import axios from "../../../axios/recipes/axios-recipes";
import Input from "../../../components/UI/Input/Input";
import { Button } from "react-bootstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class CreateNewCategory extends Component {
  state = {
    categoryForm: {
      categoryName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Please enter category name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 200,
          errorMessage:
            "Category name should be filled between 5 to 200 characters"
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

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

  categoryHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for (let formElementIndentifier in this.state.categoryForm) {
      formData[formElementIndentifier] = this.state.categoryForm[
        formElementIndentifier
      ].value;
    }
    formData["createdDate"] = new Date();
    axios
      .post("/categories.json", formData)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, editor, inputIdentifier) => {
    const updatedCategoryForm = {
      ...this.state.categoryForm
    };
    const updatedFormElement = {
      ...updatedCategoryForm[inputIdentifier]
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
    updatedCategoryForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedCategoryForm) {
      formIsValid = updatedCategoryForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      categoryForm: updatedCategoryForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.categoryForm) {
      formElementArray.push({
        id: key,
        config: this.state.categoryForm[key]
      });
    }

    let form = (
      <form onSubmit={this.categoryHandler}>
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
        <h4>Create New Category</h4>
        {form}
      </div>
    );
  }
}

export default withErrorHandler(CreateNewCategory, axios);
