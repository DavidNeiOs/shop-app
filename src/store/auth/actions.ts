import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AuthActions, SIGN_UP, LOG_IN } from "./types";

export const signup = (email: string, password: string) => async (
  dispatch: ThunkDispatch<{}, undefined, AuthActions>
) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0Cyni2CQXk09zU6bQCKRUmMyOd_RCQrI",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!response.ok) {
    const errResData = await response.json();
    const errorId = errResData.error.message;
    let message = "Something went wrong";
    if (errorId === "EMAIL_EXISTS") {
      message = "This email exists already. Try logging in";
    }
    if (errorId === "INVALID_PASSWORD") {
      message = "This password is not valid";
    }
    throw new Error(message);
  }

  const resData = await response.json();

  dispatch({ type: SIGN_UP });
};

export const login = (email: string, password: string) => async (
  dispatch: ThunkDispatch<{}, undefined, AuthActions>
) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0Cyni2CQXk09zU6bQCKRUmMyOd_RCQrI",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!response.ok) {
    const errResData = await response.json();
    const errorId = errResData.error.message;
    let message = "Something went wrong";
    if (errorId === "EMAIL_NOT_FOUND") {
      message = "This email could not be found";
    }
    if (errorId === "INVALID_PASSWORD") {
      message = "This password is not valid";
    }
    throw new Error(message);
  }

  const resData = await response.json();

  dispatch({ type: LOG_IN });
};
