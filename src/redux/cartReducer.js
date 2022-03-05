import { ADD_TO_CARD, INCREMENT_PRODUCT, DECREMENT_PRODUCT,CHANGE_CURRENCY } from "./types";
import {isCurrensy} from '../helpers/helpers';


const initialState = {
  cart: [],
  id: "",
};

export const cartReducer = (state = initialState, { attr, id, type, symbol }) => {
   switch (type) {
    case ADD_TO_CARD:
      const ind = state.cart.findIndex((item) => item.id === attr.id);
      if (ind !== -1) {
        const array = [...state.cart];
        array[ind].count = array[ind].count + 1;
        array[ind].selCurr.curr += array[ind].price;
        return {
          ...state,
          cart: array,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, attr],
        };
      }

    case INCREMENT_PRODUCT:
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === id);
      const newCart = [...cart];
      newCart[index].count = newCart[index].count + 1;
      newCart[index].selCurr.curr += newCart[index].price;
      return {
        ...state,
        cart: newCart,
      };
    case DECREMENT_PRODUCT: {
      const { cart } = state;
      const index = cart.findIndex((item) => item.id === id);
      if (cart[index].count > 1) {
        const newCart = [...cart];
        newCart[index].count = newCart[index].count - 1;
        newCart[index].selCurr.curr -= newCart[index].price;
        return {
          ...state,
          cart: newCart,
        };
      } else {
        const newCart = cart.filter((item) => item.id !== id);
        return {
          ...state,
          cart: newCart,
        };
      }
    }

    case CHANGE_CURRENCY: {
      const { cart } = state;
      let arr = [...cart];
      const updateCart = arr.map(item => {
       return isCurrensy(item, symbol)
       
      })
      return {
        ...state,
        cart: updateCart,
      };
    }

    default:
      return state;
  }
};
