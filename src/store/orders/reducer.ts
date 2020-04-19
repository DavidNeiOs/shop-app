import { Order, OrdersState, OrdersActionTypes, ADD_ORDER } from "./types";

const initialState: OrdersState = {
  orders: []
}

export default (state = initialState, action: OrdersActionTypes) => {
  switch (action.type) {
    case ADD_ORDER: 
    const newOrder: Order = { id: new Date().toString(), items: action.orderData.items, totalAmount: action.orderData.amount, date: new Date()}
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state
  }
}