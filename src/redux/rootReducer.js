import { combineReducers } from "redux";
import { priceReducer } from "./priceReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
   priceReducer,
  cartReducer,
});
