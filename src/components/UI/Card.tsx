import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  style: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
