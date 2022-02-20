import { ADD_TO_CARD } from "./types";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  console.log("CartReducer>>>", action.attr);
  switch (action.type) {
    case ADD_TO_CARD:
      return {
        ...state,
        cart: [...state.cart, action.attr],
      };
    default:
      return state;
  }
};
