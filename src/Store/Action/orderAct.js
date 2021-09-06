import * as actionTypes from "./actions";
import axios from "../../axios-orders";

//purchase Action Creators 
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () =>{
    return {
        type : actionTypes.PURCHASE_BURGER_START 
    }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
      dispatch(purchaseBurgerStart())
    axios
      .post(`/orders.json`, orderData)
      .then((response) => {
          console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(purchaseBurgerFailed(err))
      });
  };
};


export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

//Fectch Orders Action Creators

export const fetchOrdersSuccess = ( orderData) => {
    return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orderData: orderData,
    };
  };
  
  export const fetchOrdersFailed = (error) => {
    return {
      type: actionTypes.FETCH_ORDERS_FAILED,
      error: error,
    };
  };
  
  export const fetchOrdersStart = () =>{
      return {
          type : actionTypes.FETCH_ORDERS_INIT 
      }
  }
  
  export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart())
        axios.get("/orders.json")
        .then((res) => {
          let fetchedOrders = [];
          for (let key in res.data) {
            fetchedOrders.push({
              ...res.data[key],
              id: key,
            });
          }
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchOrdersFailed(err))
        });
    };
  };
  