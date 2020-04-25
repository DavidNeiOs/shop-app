import { Product, ADD_PRODUCT, ProductActionTypes, DELETE_PRODUCT } from "./types"

export function addProduct(product: Product): ProductActionTypes {
  return {
    type: ADD_PRODUCT,
    payload: product
  }
}

export function deleteProduct(id: string): ProductActionTypes {
  return {
    type: DELETE_PRODUCT,
    pid: id
  }
}