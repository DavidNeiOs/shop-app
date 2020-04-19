import { Item as CartItem } from "../cart/types";

export interface OrderItem {
  productId: string
  productTitle: string
  productPrice: number
  quantity: number
  sum: number
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  date: Date
}

export interface OrdersState {
  orders: Order[]
}

// Actions
export const ADD_ORDER = "ADD_ORDER"

interface AddOrderAction {
  type: typeof ADD_ORDER
  orderData: {
    items: OrderItem[],
    amount: number
  }
}

export type OrdersActionTypes = AddOrderAction