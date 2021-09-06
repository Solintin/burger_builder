import * as actionTypes from "./actions";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: name,
  };
};

export const setIngredient = (ing) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    payload: ing,
  };
};
export const fectchIngredientFailed = (errMsg) => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    payload: errMsg
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    return axios.get(
        "https:///burger-builder-ab33e-default-rtdb.firebaseio.com/ingredient.json"
      )
      .then((res) => {
        console.log('hi');
        dispatch(setIngredient(res.data) );
      })
      .catch((err) => {
        dispatch(fectchIngredientFailed() );

      });
  };
};
