import { createStore, combineReducers, compose } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux"

import Reactotron from "../../ReactotronConfig"
import productsReducer from "./product/reducer";
import cartReducer from "./cart/reducers"

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

let middleware: any
if(__DEV__) {
  middleware = compose(Reactotron.createEnhancer!())
} else {
  middleware = compose()
}


export const store = createStore(rootReducer, middleware)
