export interface OrderItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  sum: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  date: Date;
}

export interface OrdersState {
  orders: Order[];
}

// Actions
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: OrderItem[];
    amount: number;
    date: Date;
  };
}

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  orders: Order[];
}

export type OrdersActionTypes = AddOrderAction | SetOrdersAction;
