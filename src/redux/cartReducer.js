import { ADD_TO_CARD, INCREMENT_PRODUCT, DECREMENT_PRODUCT } from "./types";

const initialState = {
  cart: [],
  id: "",
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CARD:
      return {
        ...state,
        cart: [...state.cart, action.attr],
      };
    case INCREMENT_PRODUCT:
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === action.id);
      const newCart = [...cart];
      newCart[index].count = newCart[index].count + 1;
      newCart[index].selCurr.curr =
        newCart[index].selCurr.curr + newCart[index].price;
      return {
        ...state,
        cart: newCart,
      };
    case DECREMENT_PRODUCT: {
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === action.id);
      if (cart[index].count > 1) {
        const newCart = [...cart];
        newCart[index].count = newCart[index].count - 1;
        newCart[index].selCurr.curr =
          newCart[index].selCurr.curr - newCart[index].price;
        return {
          ...state,
          cart: newCart,
        };
      } else {
        const newCart = cart.filter((item) => item.id !== action.id);
        return {
          ...state,
          cart: newCart,
        };
      }
    }

    default:
      return state;
  }
};
