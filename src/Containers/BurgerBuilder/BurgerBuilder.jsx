import React, { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Modal from "../../Components/UI/Modal/Modal";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../Store/Action/bugerBuilderAct";
import * as orderAction from "../../Store/Action/orderAct";
// import axios from 'axios';

import Spinner from "../../Components/UI/Spinner/Spinner";
import errorHandler from "../../Components/Hoc/errorHandler/errorHandler";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  // LifeCycles

  //Handlers
  handleContinueOrder = () => {
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
  };
  handleBackdropClick = () => {
    this.setState({ purchasing: false });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  updatePurchaseState = () => {
    const ingredientCopy = { ...this.props.storeIngredients };
    const ingredientVal = Object.values(ingredientCopy);
    const sum = ingredientVal.reduce((sum, el) => {
      return (sum += el);
    }, 0);
    console.log(sum);
    return sum <= 0;
  };
  // handleAddIngredient = (type) => {
  //   const oldCount = this.state.ingredient[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredient,
  //   };
  //   updatedIngredient[type] = updatedCount;

  //   const PriceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   let newPrice = oldPrice + PriceAddition;

  //   this.setState(
  //     {
  //       ingredient: updatedIngredient,
  //       totalPrice: newPrice,
  //     },
  //     () => this.updatePurchaseState()
  //   );
  // };
  // handleRemoveIngredient = (type) => {
  // const oldCount = this.state.ingredient[type];
  // if (oldCount <= 0) {
  //   return;
  // }
  // const updatedCount = oldCount - 1;
  // const updatedIngredient = {
  //   ...this.state.ingredient,
  // };
  // updatedIngredient[type] = updatedCount;

  // const PriceDeduction = INGREDIENT_PRICES[type];
  // const oldPrice = this.state.totalPrice;
  // let newPrice = oldPrice - PriceDeduction;

  // this.setState(
  //   {
  //     ingredient: updatedIngredient,
  //     totalPrice: newPrice,
  //   },
  //   () => this.updatePurchaseState()
  // );
  // };
  componentDidMount() {
    this.props.onInitIngredients();
    this.updatePurchaseState();
  }
  render() {
    //Logic handling Less than burger Ingredients
    const disabledInfo = {
      ...this.props.storeIngredients,
    };
    for (let val in disabledInfo) {
      disabledInfo[val] = disabledInfo[val] <= 0 ? true : false;
    }
    let orderSummary = null;

    // the burger Component is to have spinner whilst the burger fetches from backend
    // also displays error if error occured in fetch
    let burger = this.props.fetchError ? (
      <p
        style={{
          marginTop: "70px",
          textAlign: "center",
          color: "red",
        }}
      >
        Error While Loading Burger
      </p>
    ) : (
      <Spinner />
    );

    // burger Component  and summary enables after data fetch is true
    if (this.props.storeIngredients) {
      burger = (
        <>
          <Burger ingredients={this.props.storeIngredients} />
          <BuildControls
            handleAddIngredient={this.props.onIngredientsAdded}
            handleRemoveIngredient={this.props.onIngredientsRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseState={this.updatePurchaseState()}
            purchaseHandler={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredient={this.props.storeIngredients}
          handleCancelOrder={this.handleBackdropClick}
          handleContinueOrder={this.handleContinueOrder}
          totalPrice={this.props.totalPrice}
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
const mapDispatchToProps = (dispatch) => {
  return {
    // onIngredientsAdded: (ingName) =>
    //   dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    // onIngredientsRemove: (ingName) =>
    //   dispatch({
    //     type: actionTypes.REMOVE_INGREDIENT,
    //     ingredientName: ingName,
    //   }),
    onIngredientsAdded: (ingName) =>
      dispatch(actionTypes.addIngredient(ingName)),
    onIngredientsRemove: (ingName) =>
      dispatch(actionTypes.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchased: () => dispatch(orderAction.purchaseInit())

  };
};

const mapStateToProps = (state) => {
  return {
    storeIngredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    fetchError: state.burgerBuilder.fetchError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
