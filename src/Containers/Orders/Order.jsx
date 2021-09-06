import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from "../../axios-orders";
import OrderedBurger from "../../Components/Order/OrderedBurger.jsx";
import errorHandler from "../../Components/Hoc/errorHandler/errorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from '../../Store/Action/orderAct'


export class Order extends Component {
 
  componentDidMount() {
   this.props.onFetchOrders()   
  }
  render() {
    let burgerOrdered = <Spinner />;
    if (!this.props.loading) {
      burgerOrdered = this.props.orders.map((order) => (
        <OrderedBurger
          key={order.id}
          price={Number.parseFloat(order.price)}
          ingredient={order.ingredient}
        />
      ));
    }
    return <div>{burgerOrdered}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders : () => dispatch(actions.fetchOrders())
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(errorHandler(Order, axios));
