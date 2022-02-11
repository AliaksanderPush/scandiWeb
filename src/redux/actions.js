import { PRODUCTS_LOAD, CURRENCY_LOAD } from "./types";

export const productLoaded = (newProduct) => {
  return {
    type: PRODUCTS_LOAD,
    payload: newProduct,
  };
};

export const currencyLoaded = (val) => {
  console.log("achions>>", val);
  return {
    type: CURRENCY_LOAD,
    data: val,
  };
};
