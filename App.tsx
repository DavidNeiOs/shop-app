import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/store";
import { ShopNavigator } from "./src/navigation/ShopNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
