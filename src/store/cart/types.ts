import { Product } from "../product/types"

export interface Item {
  title: string,
  price: number,
  quantity: number
  sum: number
}

export interface Items {
  [name: string]: Item
}

export interface CartState {
  items: Items,
  totalAmaount: number
}

// ACTIONS
export const ADD_TO_CART = "ADD_TO_CART";

interface AddToCartAction {
  type: typeof ADD_TO_CART,
  product: Product
}

export type CartActionTypes = AddToCartAction