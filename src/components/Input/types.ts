export interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

// ACTIONS
export const INPUT_CHANGE = "INPUT_CHANGE";
export const INPUT_BLUR = "INPUT_BLUR";

interface InputChangeAction {
  type: typeof INPUT_CHANGE;
  text: string;
  isValid: boolean;
}

interface InputBlurAction {
  type: typeof INPUT_BLUR;
}

export type InputActions = InputBlurAction | InputChangeAction;
