import React, { Component } from "react";
import "./Form.css";

export class Form extends Component {
  render() {
    let inputElement = null;
   let dynamicClassName = this.props.Invalid ? 'invalid InputElement' : 'InputElement';
    switch (this.props.elementType) {
      case "input":
        inputElement = (
          <input
            onChange={this.props.changed}
            className={dynamicClassName}
            {...this.props.elementConfig}
            value={this.props.value}
            name={this.props.name}
          />
        );
        break;
      case "textarea":
        inputElement = (
          <textarea
            onChange={this.props.changed}
            className={dynamicClassName}
            {...this.prop.elementConfig}
            value={this.props.value}
            name={this.props.name}
          />
        );
        break;
      case "select":
        inputElement = (
          <select
            onChange={this.props.changed}
            className={dynamicClassName}
            value={this.props.value}
            name={this.props.name}
          >
            {this.props.elementConfig.options.map((option) => (
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
            onChange={this.props.changed}
            className={dynamicClassName}
            {...this.prop.elementConfig}
            value={this.props.value}
            name={this.props.name}
          />
        );
    }
    return (
      <div className="Input">
        <label className="Label"> {this.props.label} </label>
        {inputElement}
      </div>
    );
  }
}

export default Form;
