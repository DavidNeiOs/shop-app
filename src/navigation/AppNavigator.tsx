import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator } from "./ShopNavigator";
import { AuthNavigator } from "./AuthNavigator";

interface AppNavigatorProps {}

export const AppNavigator: React.FC<AppNavigatorProps> = ({}) => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
