import { Product, ADD_PRODUCT, ProductActionTypes } from "./types"

export function addProduct(product: Product): ProductActionTypes {
  return {
    type: ADD_PRODUCT,
    payload: product
  }
}