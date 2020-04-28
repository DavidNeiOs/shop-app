import { Order, OrdersState, OrdersActionTypes, ADD_ORDER } from "./types";

const initialState: OrdersState = {
  orders: [],
};

export default (state = initialState, action: OrdersActionTypes) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder: Order = {
        id: action.orderData.id,
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: action.orderData.date,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
