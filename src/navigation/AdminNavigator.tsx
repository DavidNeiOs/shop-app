import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { UserProductsScreen } from "../screens/UserProductsScreen";
import { screenOptions } from "./StackNavigationOptions";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ShopParamList } from "./ShopNavigator";

export type AdminParamList = {
  UserProduct: undefined;
};

export type AdminNavProps<T extends keyof AdminParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AdminParamList, T>,
    DrawerNavigationProp<ShopParamList>
  >;
  route: RouteProp<AdminParamList, T>;
};
const Stack = createStackNavigator<AdminParamList>();

export const AdminNavigator: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UserProduct"
        options={{ headerTitle: "Your products" }}
        component={UserProductsScreen}
      />
    </Stack.Navigator>
  );
};
