// STATE
export interface AuthState {
  token: null | string;
  userId: null | string;
  didTryAutoLogin: boolean;
}

// ACTIONS
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export interface SetDidTryAl {
  type: typeof SET_DID_TRY_AL;
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions = SetDidTryAl | AuthenticateAction | LogoutAction;
