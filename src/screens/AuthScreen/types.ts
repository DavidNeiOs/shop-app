export interface State {
  inputValues: {
    email: string;
    password: string;
  };
  inputValidities: {
    [key: string]: boolean;
    email: boolean;
    password: boolean;
  };
  formIsValid: boolean;
}

// ACTIONS
export const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

type UpdateAction = {
  type: typeof FORM_INPUT_UPDATE;
  payload: {
    key: string;
    isValid: boolean;
    text: string;
  };
};

export type FormActionTypes = UpdateAction;
