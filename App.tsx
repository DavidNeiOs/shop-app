import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { store } from "./src/store";
import { AppNavigator } from "./src/navigation/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

if (__DEV__) {
  import("./ReactotronConfig");
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
