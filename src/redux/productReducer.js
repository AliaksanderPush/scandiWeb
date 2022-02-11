import { PRODUCTS_LOAD } from "./types";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOAD:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
