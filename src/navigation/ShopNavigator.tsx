import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ProductNavigator } from "./ProductNavigator";
import { OrdersNavigator } from "./OrdersNavigator";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export type ShopParamList = {
  Orders: undefined;
  Products: undefined;
};

const Drawer = createDrawerNavigator<ShopParamList>();

export const ShopNavigator: React.FC<{}> = ({}) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.primary,
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
