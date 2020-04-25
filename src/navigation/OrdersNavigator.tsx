import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { OrdersScreen } from "../screens/OrdersScreen";
import { screenOptions } from "./StackNavigationOptions";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ShopParamList } from "./ShopNavigator";

export type OrdersParamList = {
  Orders: undefined;
};

export type OrdersNavProps<T extends keyof OrdersParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OrdersParamList, T>,
    DrawerNavigationProp<ShopParamList>
  >;
  route: RouteProp<OrdersParamList, T>;
};
const Stack = createStackNavigator<OrdersParamList>();

export const OrdersNavigator: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Orders"
        options={{ headerTitle: "Your orders" }}
        component={OrdersScreen}
      />
    </Stack.Navigator>
  );
};
