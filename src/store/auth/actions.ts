import { AsyncStorage } from "react-native";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AuthActions, SET_DID_TRY_AL, AUTHENTICATE } from "./types";
import { RootState } from "..";

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};

export const authenticate = (token: string, userId: string): AuthActions => {
  return {
    type: AUTHENTICATE,
    userId,
    token,
  };
};

type ThunkResult<R> = ThunkAction<R, RootState, undefined, AuthActions>;

export const signup = (
  email: string,
  password: string
): ThunkResult<Promise<any>> => async (dispatch) => {
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

  dispatch(authenticate(resData.idToken, resData.localId));
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

  dispatch(authenticate(resData.idToken, resData.localId));
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
};

export const setDidTryAl = (): AuthActions => {
  return {
    type: SET_DID_TRY_AL,
  };
};
