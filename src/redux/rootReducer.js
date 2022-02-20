import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { priceReducer } from "./priceReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
  productReducer,
  priceReducer,
  cartReducer,
});
