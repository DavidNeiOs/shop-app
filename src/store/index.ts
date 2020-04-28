import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunk from "redux-thunk";

import Reactotron from "../../ReactotronConfig";
import productsReducer from "./product/reducer";
import cartReducer from "./cart/reducers";
import ordersReducer from "./orders/reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

let middleware;
if (__DEV__) {
  middleware = compose(applyMiddleware(thunk), Reactotron.createEnhancer!());
} else {
  middleware = compose(applyMiddleware(thunk));
}

export const store = createStore(rootReducer, middleware);
