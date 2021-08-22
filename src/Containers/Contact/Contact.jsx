import React, { Component } from "react";
import Button from "../../Components/UI/Button/Button";
import axios from "../../axios-orders";
import "./Contact.css";
import Spinner from "../../Components/UI/Spinner/Spinner";
export class Contact extends Component {
  state = {
    name: "",
    email: "",
    address: {
      str: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredient,
      price: this.state.totalPrice,
      customer: {
        name: "Alley Soliu",
        address: {
          street: "Niger State",
          zipCode: 123456,
          country: "Nigeria",
        },
        email: "alley@test.com",
      },
      deliveryMethod: "Home",
    };
    axios
      .post(`/orders.json`, order)
      .then((response) => {
        this.setState({ loading: false });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="" placeholder="Your name" />
        <input type="ُemail" name="" placeholder="Your Email" />
        <input type="text" name="" placeholder="Street" />
        <input type="text" name="" placeholder="Postal code" />
        <Button btnType="Success" Clicked={this.orderHandler}>
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

export default Contact;
