import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

import { ProductsOverviewScreen } from "../screens/ProductsOverViewScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import { CartScreen } from "../screens/CartScreen";
import { screenOptions } from "./StackNavigationOptions";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ShopParamList } from "./ShopNavigator";

export type ProductsParamList = {
  ProductsOverview: undefined;
  ProductDetails: {
    productId: string;
    productTitle: string;
  };
  Cart: undefined;
};

export type ProductsNavProps<T extends keyof ProductsParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProductsParamList, T>,
    DrawerNavigationProp<ShopParamList>
  >;
  route: RouteProp<ProductsParamList, T>;
};

const Stack = createStackNavigator<ProductsParamList>();

export const ProductNavigator: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
  );
};
