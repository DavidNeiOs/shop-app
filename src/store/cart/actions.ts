import Product from "../../models/product";
import { ADD_TO_CART } from "./types";

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}