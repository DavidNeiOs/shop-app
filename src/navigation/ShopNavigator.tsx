import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";

import { AdminNavigator } from "./AdminNavigator";
import { ProductNavigator } from "./ProductNavigator";
import { OrdersNavigator } from "./OrdersNavigator";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../store/auth/actions";

export type ShopParamList = {
  Orders: undefined;
  Products: undefined;
  Admin: undefined;
};

const Drawer = createDrawerNavigator<ShopParamList>();

export const ShopNavigator: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView>
              <DrawerItemList {...props} />
              <Button
                title="Log out"
                color={Colors.primary}
                onPress={() => dispatch(logout())}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
