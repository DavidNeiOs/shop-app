import { createStore, combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux"

import productsReducer from "./product/reducer";

const rootReducer = combineReducers({
  products: productsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = createStore(rootReducer)

