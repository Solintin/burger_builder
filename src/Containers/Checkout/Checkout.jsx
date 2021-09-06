import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import Contact from "../Contact/Contact";
import { connect } from "react-redux";


export class Checkout extends Component {






  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    const purchasedRedirect = this.props.purchasedRed ? <Redirect to='/' />: null
    if (this.props.storeIngredient) {
      summary = (
        <div>

          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.storeIngredient}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={Contact}
          />
        </div>
      );
    }
    return <div>
      {summary}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    storeIngredient: state.burgerBuilder.ingredients,
    purchasedRed : state.order.purchased,
  };
};



export default connect(mapStateToProps , null)(Checkout);
