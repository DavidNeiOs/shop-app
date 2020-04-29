import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { Center } from "../../components/UI/Center";
import { Colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { setDidTryAl, authenticate } from "../../store/auth/actions";

interface StartupScreenProps {}

export const StartupScreen: React.FC<StartupScreenProps> = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(setDidTryAl());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAl());
        return;
      }

      dispatch(authenticate(token, userId));
    };

    tryLogin();
  }, [dispatch]);
  return (
    <Center>
      <ActivityIndicator size="large" color={Colors.primary} />
    </Center>
  );
};
