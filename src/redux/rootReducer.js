import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { priceReducer } from "./priceReducer";

export const rootReducer = combineReducers({
  productReducer,
  priceReducer,
});
