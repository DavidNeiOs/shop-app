import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { screenOptions } from "./StackNavigationOptions";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ShopParamList } from "./ShopNavigator";
import { EditProductScreen } from "../screens/EditProductScreen";
import { UserProductsScreen } from "../screens/UserProductsScreen";

export type AdminParamList = {
  UserProduct: undefined;
  EditProduct: {
    productId?: string;
  };
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
        options={{ headerTitle: () => null }}
        component={UserProductsScreen}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          headerTitle: route.params?.productId ? "Edit Product" : "Add Product",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
