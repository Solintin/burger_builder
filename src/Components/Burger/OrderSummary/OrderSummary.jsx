import React from "react";
import Button from "../../UI/Button/Button"
import './OrderSummary.css'

function OrderSummary(props) {
  const styles = {
    textTransform: "capitalize",
    fontWeight: "bold",
    listStyle: "none",
  };
  const ingredientSummary = Object.keys(props.ingredient);
  const Summary = ingredientSummary.map((key) => {
    return (
      <li key={key}>
        <span>{key}</span>: {props.ingredient[key]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <p>Your burger contains the following ingredient Summary</p>
      <ul style={styles}>{Summary}</ul>
      <strong> Total Price : ${props.totalPrice.toFixed(2)} </strong>
      <p>Continue to Checkout ?</p>
      <div className='button-container'>
        <Button btnType='Danger' Clicked={props.handleCancelOrder}>  CANCEL</Button>
        <Button btnType='Success' Clicked={props.handleContinueOrder}>CONTINUE</Button>
      </div>
    </div>
  );
}

export default OrderSummary;
