import { AuthState, AuthActions, LOG_IN, SIGN_UP } from "./types";

const initialState: AuthState = {
  token: null,
  userId: null,
};

export default (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case LOG_IN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
