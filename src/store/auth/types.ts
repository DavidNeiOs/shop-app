// ACTIONS
export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

export interface SignUpAction {
  type: typeof SIGN_UP;
}

export interface LogInAction {
  type: typeof LOG_IN;
}

export type AuthActions = SignUpAction | LogInAction;
