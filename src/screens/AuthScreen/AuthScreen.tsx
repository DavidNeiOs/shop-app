import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Input } from "../../components/Input";
import { Card } from "../../components/UI/Card";
import { Colors } from "../../constants/colors";

interface AuthScreenProps {}

export const AuthScreen: React.FC<AuthScreenProps> = ({}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              name="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              name="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Log in"
                onPress={() => {}}
                color={Colors.primary}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                onPress={() => {}}
                color={Colors.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
