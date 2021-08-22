import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import Contact from "../Contact/Contact";
export class Checkout extends Component {
  state = {
    ingredient: null,
    price: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === "price") {
        this.setState({ price: ingredients[param[0]] });
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredient: ingredients, price: this.state.price });
  }
  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredient}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => {
            return (
              <Contact
                ingredients={this.state.ingredient}
                price={this.state.price}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
