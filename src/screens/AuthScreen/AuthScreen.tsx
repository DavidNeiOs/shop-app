import React, {
  Reducer,
  useReducer,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import { Input } from "../../components/Input";
import { Card } from "../../components/UI/Card";
import { Colors } from "../../constants/colors";
import { signup, login } from "../../store/auth/actions";
import { State, FormActionTypes, FORM_INPUT_UPDATE } from "./types";

const formReducer: Reducer<State, FormActionTypes> = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValidities = {
      ...state.inputValidities,
      [action.payload.key]: action.payload.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: {
        ...state.inputValues,
        [action.payload.key]: action.payload.text,
      },
      inputValidities: updatedValidities,
      formIsValid,
    };
  }
  return state;
};

interface AuthScreenProps {}

export const AuthScreen: React.FC<AuthScreenProps> = ({}) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (name: string, text: string, isValid: boolean) => {
      formDispatch({
        type: FORM_INPUT_UPDATE,
        payload: {
          key: name,
          text,
          isValid,
        },
      });
    },
    [formDispatch]
  );

  const handleAuth = async () => {
    const { email, password } = formState.inputValues;
    setError(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        await dispatch(signup(email, password));
      } else {
        await dispatch(login(email, password));
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              name="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email"
              onInputChange={handleInputChange}
              initialValue=""
            />
            <Input
              name="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={handleInputChange}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign up" : "Log in"}
                  onPress={handleAuth}
                  color={Colors.primary}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "log in" : "sign up"}`}
                onPress={() => {
                  setIsSignup((prev) => !prev);
                }}
                color={Colors.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
