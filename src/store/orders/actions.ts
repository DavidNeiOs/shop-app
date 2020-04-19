import { ADD_ORDER, OrdersActionTypes, OrderItem } from "./types";

export const addOrder = (cartItems: OrderItem[], totalAmount: number): OrdersActionTypes => {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount
    }
  }
}