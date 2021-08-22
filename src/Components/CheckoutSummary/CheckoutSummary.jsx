import React from "react";
import Burger from "../Burger/Burger";
import "./CheckoutSummary.css";
import Button from "../UI/Button/Button";

function CheckoutSummary(props) {
    console.log(props);

  return (
    <div className="checkout-summary">
      <h1>We hope it taste well</h1>
      <div style={{ width: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <div className="btn">
      <Button btnType="Danger" Clicked={props.checkoutCancelled} >
        CANCEL
      </Button>
      <Button btnType="Success" Clicked={props.checkoutContinued}>SUCCESS</Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
