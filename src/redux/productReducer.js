import { PRODUCTS_LOAD } from "./types";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  console.log("prodReduser>>", action);
  switch (action.type) {
    case PRODUCTS_LOAD:
      return {
        ...state,
        products: [...state.products, action],
      };
    default:
      return state;
  }
};
