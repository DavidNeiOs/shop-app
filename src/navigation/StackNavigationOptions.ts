import { Platform } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";

import { Colors } from "../constants/colors";

export const screenOptions: StackNavigationOptions = {
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
}