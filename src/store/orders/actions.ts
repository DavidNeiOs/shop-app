import { ThunkDispatch, ThunkAction } from "redux-thunk";
import {
  ADD_ORDER,
  OrderItem,
  SET_ORDERS,
  Order,
  OrdersActionTypes,
} from "./types";
import { RootState } from "..";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, OrdersActionTypes>;

export const fetchOrders = (): ThunkResult<Promise<any>> => async (
  dispatch,
  getState
) => {
  const auth = getState().auth;
  try {
    const response = await fetch(
      `https://rn-complete-4c566.firebaseio.com/orders/${auth.userId}.json?auth=${auth.token}`
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

export const addOrder = (
  cartItems: OrderItem[],
  totalAmount: number
): ThunkResult<Promise<any>> => async (dispatch, getState) => {
  const date = new Date();
  const auth = getState().auth;
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/orders/${auth.userId}.json?auth=${auth.token}`,
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
