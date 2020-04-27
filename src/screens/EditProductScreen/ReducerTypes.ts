// STATE
export interface State {
  inputValues: {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  inputValidities: {
    [key: string]: boolean;
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
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
