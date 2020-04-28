import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {
  ADD_ORDER,
  OrderItem,
  AddOrderAction,
  SetOrdersAction,
  SET_ORDERS,
  Order,
  OrdersState,
} from "./types";
import { Action } from "redux";

type ThunkResult<R> = ThunkAction<R, OrdersState, undefined, Action>;

export const fetchOrders = (): ThunkResult<Promise<any>> => async (
  dispatch: ThunkDispatch<OrdersState, undefined, SetOrdersAction>
) => {
  try {
    const response = await fetch(
      "https://rn-complete-4c566.firebaseio.com/orders/u1.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedOrders: Order[] = [];

    for (const key in resData) {
      loadedOrders.push({
        id: key,
        date: new Date(resData[key].date),
        items: resData[key].cartItems,
        totalAmount: resData[key].totalAmount,
      });
    }
    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  } catch (err) {
    throw err;
  }
};

export const addOrder = (cartItems: OrderItem[], totalAmount: number) => async (
  dispatch: ThunkDispatch<{}, {}, AddOrderAction>
) => {
  const date = new Date();
  const response = await fetch(
    "https://rn-complete-4c566.firebaseio.com/orders/u1.json",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const resData = await response.json();

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date,
    },
  });
};
