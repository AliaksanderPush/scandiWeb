import { CURRENCY_LOAD } from "./types";

const initialState = {
  currency: "USD",
};

export const priceReducer = (state = initialState, action) => {
  console.log("priceReducer>>>", action);
  switch (action.type) {
    case CURRENCY_LOAD:
      return {
        ...state,
        currency: action.data,
      };
    default:
      return state;
  }
};
