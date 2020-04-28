import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { screenOptions } from "./StackNavigationOptions";
import { AuthScreen } from "../screens/AuthScreen/AuthScreen";

export type AuthParamList = {
  Auth: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
const Stack = createStackNavigator<AuthParamList>();

export const AuthNavigator: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Auth"
        options={{ headerTitle: "Authenticate" }}
        component={AuthScreen}
      />
    </Stack.Navigator>
  );
};
