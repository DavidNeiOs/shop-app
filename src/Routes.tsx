import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { Center } from "./components/center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

interface LoginProps extends AuthNavProps<"Login"> {}

function Login({ navigation }: LoginProps) {
  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="Go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

interface RegisterProps extends AuthNavProps<"Register"> {}

function Register({ navigation }: RegisterProps) {
  return (
    <Center>
      <Text>I am a register screen</Text>
      <Button
        title="Go to login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      ></Button>
    </Center>
  );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerTitle: "Sign in" }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerTitle: "Sign up" }}
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
