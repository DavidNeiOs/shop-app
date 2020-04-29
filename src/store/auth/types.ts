// STATE
export interface AuthState {
  token: null | string;
  userId: null | string;
  didTryAutoLogin: boolean;
}

// ACTIONS
export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const AUTHENTICATE = "AUTHENTICATE";

export interface SignUpAction {
  type: typeof SIGN_UP;
  token: string;
  userId: string;
}

export interface LogInAction {
  type: typeof LOG_IN;
  token: string;
  userId: string;
}

export interface SetDidTryAl {
  type: typeof SET_DID_TRY_AL;
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
}

export type AuthActions =
  | SignUpAction
  | LogInAction
  | SetDidTryAl
  | AuthenticateAction;
