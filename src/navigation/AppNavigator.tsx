import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator } from "./ShopNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { useTypedSelector } from "../store";
import { StartupScreen } from "../screens/StartupScreen";

interface AppNavigatorProps {}

export const AppNavigator: React.FC<AppNavigatorProps> = ({}) => {
  const auth = useTypedSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!auth.didTryAutoLogin && <StartupScreen />}
      {!auth.token && auth.didTryAutoLogin && <AuthNavigator />}
      {!!auth.token && <ShopNavigator />}
    </NavigationContainer>
  );
};
