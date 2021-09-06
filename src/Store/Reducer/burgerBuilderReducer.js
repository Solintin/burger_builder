import * as actionTypes from "../Action/actions";

const initialState = {
INGREDIENT_PRICES : {
        salad: 10,
        bacon: 5,
        cheese: 7,
        meat: 10,
      },
  totalPrice: 20,
  ingredients: null,
  loading: false,
  fetchError: false,
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice : state.totalPrice +  state.INGREDIENT_PRICES[action.payload]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice : state.totalPrice - state.INGREDIENT_PRICES[action.payload]

      };
      case actionTypes.SET_INGREDIENT:
        return {
          ...state,
          ingredients : action.payload,
          fetchError : false,
          totalPrice : 40
        }
      case actionTypes.FETCH_INGREDIENT_FAILED:
        return {
          ...state,
          fetchError : true
        }
    default:
      return state;
  }
};

export default burgerBuilderReducer;
