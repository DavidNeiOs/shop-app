import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { ProductsOverviewScreen } from "../screens/ProductsOverViewScreen";
import { Colors } from "../constants/colors";

export type ProductsParamList = {
  ProductsOverview: undefined;
};

export type ProductsNavProps<T extends keyof ProductsParamList> = {
  navigation: StackNavigationProp<ProductsParamList, T>;
  route: RouteProp<ProductsParamList, T>;
};

const Stack = createStackNavigator<ProductsParamList>();

export const ShopNavigator: React.FC<{}> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          options={{ headerTitle: "All Products" }}
          component={ProductsOverviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
