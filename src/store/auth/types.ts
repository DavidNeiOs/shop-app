// STATE
export interface AuthState {
  token: null | string;
  userId: null | string;
}

// ACTIONS
export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

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

export type AuthActions = SignUpAction | LogInAction;
