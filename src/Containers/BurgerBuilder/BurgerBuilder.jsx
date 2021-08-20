import React, { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Modal from "../../Components/UI/Modal/Modal";
import axios from "../../axios-orders";
// import axios from 'axios';

import Spinner from "../../Components/UI/Spinner/Spinner";
import errorHandler from "../../Components/Hoc/errorHandler/errorHandler";

const INGREDIENT_PRICES = {
  salad: 10,
  bacon: 5,
  cheese: 7,
  meat: 10,
};

export class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 10,
    purchaseable: false,
    purchasing: false,
    loading: false,
    fetchError: false,
  };
  // LifeCycles

  //Handlers
  handleContinueOrder = () => {
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
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };
  handleBackdropClick = () => {
    this.setState({ purchasing: false });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  updatePurchaseState = () => {
    const ingredientCopy = { ...this.state.ingredient };
    const ingredientVal = Object.values(ingredientCopy);
    const sum = ingredientVal.reduce((sum, el) => {
      return (sum += el);
    }, 0);
    this.setState({ purchaseable: sum <= 0 ? true : false });
  };
  handleAddIngredient = (type) => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;

    const PriceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + PriceAddition;

    this.setState(
      {
        ingredient: updatedIngredient,
        totalPrice: newPrice,
      },
      () => this.updatePurchaseState()
    );
  };
  handleRemoveIngredient = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;

    const PriceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - PriceDeduction;

    this.setState(
      {
        ingredient: updatedIngredient,
        totalPrice: newPrice,
      },
      () => this.updatePurchaseState()
    );
  };
  componentDidMount() {
    axios
      .get(
        "https:///burger-builder-ab33e-default-rtdb.firebaseio.com/ingredient.json"
      )
      .then((res) => {
        this.setState({ ingredient: res.data });
      }).catch((err) => { this.setState({fetchError : true}) });
    this.updatePurchaseState();
  }
  render() {
    //Logic handling Less than burger Ingredients
    const disabledInfo = {
      ...this.state.ingredient,
    };
    for (let val in disabledInfo) {
      disabledInfo[val] = disabledInfo[val] <= 0 ? true : false;
    }
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // the burger Component is to have spinner whilst the burger fetches from backend
    // also displays error if error occured in fetch  
    let burger = this.state.fetchError ? <p style={ {
      marginTop : '70px', textAlign : "center", color : 'red'
    }}>Error While Loading Burger</p> :  <Spinner />;

    // burger Component  and summary enables after data fetch is true
    if (this.state.ingredient) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredient} />

          <BuildControls
            handleAddIngredient={this.handleAddIngredient}
            handleRemoveIngredient={this.handleRemoveIngredient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseState={this.state.purchaseable}
            purchaseHandler={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredient={this.state.ingredient}
          handleCancelOrder={this.handleBackdropClick}
          handleContinueOrder={this.handleContinueOrder}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div>
        <Modal show={this.state.purchasing} Clicked={this.handleBackdropClick}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default errorHandler(BurgerBuilder, axios);
