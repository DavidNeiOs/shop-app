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
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"

interface AddToCartAction {
  type: typeof ADD_TO_CART,
  product: Product
}

interface RemoveFromCart {
  type: typeof REMOVE_FROM_CART
  pid: string  
}

export type CartActionTypes = AddToCartAction | RemoveFromCart