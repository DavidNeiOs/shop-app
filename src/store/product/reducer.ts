import { ProductsState, ProductActionTypes, ADD_PRODUCT } from "./types";
import PRODUCTS from "../../data/products"

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.id === 'u1')
}

export default (state = initialState, action: ProductActionTypes) => {
  switch(action.type) {
    case ADD_PRODUCT:
      return {
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload]
      }
    default:
      return state;
  }
}