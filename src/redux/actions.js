import { PRODUCTS_LOAD, CURRENCY_LOAD, ADD_TO_CARD } from "./types";

export const productLoaded = (newProduct) => {
  return {
    type: PRODUCTS_LOAD,
    payload: newProduct,
  };
};

export const currencyLoaded = (val) => {
  return {
    type: CURRENCY_LOAD,
    data: val,
  };
};

export const addToCart = (value) => {
  console.log("achions>>", value);
  return {
    type: ADD_TO_CARD,
    prod: value,
  };
};
