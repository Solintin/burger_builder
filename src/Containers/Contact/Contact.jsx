import React, { Component } from "react";
import Button from "../../Components/UI/Button/Button";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import "./Contact.css";
import errorHandler from "../../Components/Hoc/errorHandler/errorHandler";
import * as actionTypes from "../../Store/Action/orderAct";

import Spinner from "../../Components/UI/Spinner/Spinner";
import Form from "../../Components/Navigation/Forms/Form";
export class Contact extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },

        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip COde",
        },
        value: "",
        validation: {
          required: true,
          length: 5,
          // maxLength : 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "jane.doe@gmail.com",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    isFormValid: false,
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    const { orderForm } = this.state;
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    // order Information array
    const order = {
      ingredient: this.props.storeIngredient,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.props.onOrderBurger(order);
  };
  checkValidity = (value, rules, config) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== " " && value.length > 0;
    }
    if (rules.length) {
      isValid = value.length === 5 && (value >= 0 || value <= 9);
    }
    // if(rules.minLength){
    //   isValid =  value.length >= rules.minLength
    // }

    return isValid;
  };
  inputChangeHandler = (event, inputIdentifier) => {
    const { value } = event.target;

    //copying state
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    // state Mutator - value
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;

    //mutate Validity -

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.elementConfig
    );
    //Check for Overrall Form Validity
    let formValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formValid = updatedOrderForm[inputIdentifier].valid && formValid;
    }

    //returning copied state
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm, isFormValid: formValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.handleSubmit}>
        {formElementArray.map((formElement) => (
          <Form
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            name={formElement.id}
            key={formElement.id}
            Invalid={
              formElement.config.validation &&
              formElement.config.touched &&
              !formElement.config.valid
            }
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}

        <Button
          btnType="Success"
          Clicked={this.orderHandler}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      <Spinner />;
    }
    return (
      <div className="contact">
        <h4>Please Enter Your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storeIngredient: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading : state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actionTypes.purchaseBurger(orderData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Contact, axios));
