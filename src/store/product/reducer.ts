import { ProductsState, ProductActionTypes, ADD_PRODUCT, DELETE_PRODUCT } from "./types";
import PRODUCTS from "../../data/products"

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action: ProductActionTypes) => {
  switch(action.type) {
    case ADD_PRODUCT:
      return {
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload]
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
        availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid)
      }
    default:
      return state;
  }
}