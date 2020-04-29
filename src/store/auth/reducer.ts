import {
  AuthState,
  AuthActions,
  LOG_IN,
  SIGN_UP,
  SET_DID_TRY_AL,
  AUTHENTICATE,
} from "./types";

const initialState: AuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
