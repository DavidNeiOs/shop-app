import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { ProductsOverviewScreen } from "../screens/ProductsOverViewScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import { CartScreen } from "../screens/CartScreen";
import { Colors } from "../constants/colors";

export type ProductsParamList = {
  ProductsOverview: undefined;
  ProductDetails: {
    productId: string;
    productTitle: string;
  };
  Cart: undefined;
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
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          options={{ headerTitle: "All Products" }}
          component={ProductsOverviewScreen}
        />
        <Stack.Screen
          name="ProductDetails"
          options={({ route }) => ({ headerTitle: route.params.productTitle })}
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="Cart"
          options={{ headerTitle: "Your Cart" }}
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
