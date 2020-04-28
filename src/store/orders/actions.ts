import { ThunkDispatch } from "redux-thunk";
import { ADD_ORDER, OrderItem, AddOrderAction } from "./types";

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
