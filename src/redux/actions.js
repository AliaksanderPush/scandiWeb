import {
  PRODUCTS_LOAD,
  CURRENCY_LOAD,
  ADD_TO_CARD,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  CHANGE_CURRENCY,
} from "./types";

export const productLoaded = (id, price) => {
  console.log("acsion>>", id, price);
  return {
    type: PRODUCTS_LOAD,
    id: id,
    price: price,
    //payload: newProduct,
  };
};

export const currencyLoaded = (val) => {
  return {
    type: CURRENCY_LOAD,
    data: val,
  };
};

export const addToCart = (value) => {
  return {
    type: ADD_TO_CARD,
    attr: value,
  };
};

export const incrementProd = (ProdId) => {
  return {
    type: INCREMENT_PRODUCT,
    id: ProdId,
  };
};
export const decrementProd = (ProdId) => {
  return {
    type: DECREMENT_PRODUCT,
    id: ProdId,
  };
};

export const changeCurrensy = (id, coast) => {
  console.log("achions>>", id, coast);
  return {
    type: CHANGE_CURRENCY,
    currId: id,
    newCurrensy: coast,
  };
};
