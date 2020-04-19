import Product from "../../models/product";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const removeFromCart = (pid: string) => {
  return {
    type: REMOVE_FROM_CART,
    pid
  }
}