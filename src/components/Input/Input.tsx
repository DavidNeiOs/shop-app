import React, { useReducer, Reducer, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { InputState, InputActions, INPUT_BLUR, INPUT_CHANGE } from "./types";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  initialValue?: string;
  initiallyValid?: boolean;
  onInputChange: (name: string, value: string, isValid: boolean) => void;
  errorText: string;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
}

const inputReducer: Reducer<InputState, InputActions> = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, value: action.text, isValid: action.isValid };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

export const Input: React.FC<InputProps> = ({
  label,
  errorText,
  onInputChange,
  name,
  ...props
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initiallyValid || false,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(name, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, name]);

  const handleTextChange = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, text, isValid });
  };

  const handleLostFocus = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={inputState.value}
        onChangeText={handleTextChange}
        onBlur={handleLostFocus}
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "firebrick",
    fontSize: 14,
  },
});
