import React from "react";
import classes from "./Input.module.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "CKEditor":
      inputElement = (
        <CKEditor
          editor={ClassicEditor}
          className={inputClasses}
          {...props.elementConfig}
          data={props.value}
          onChange={props.changed}
          //   onChange={(event, editor) => {
          //     const data = editor.getData();
          //     console.log(data);
          //   }}
        ></CKEditor>
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>{props.errorMessage}</p>
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
