import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { Card } from "../UI/Card";
import { Product } from "../../store/product/types";
import { TouchableButton } from "../TouchableButton";

interface ProductItemProps {
  product: Product;
  onSelect: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onSelect,
  children,
}) => {
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableButton onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: product.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableButton>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});
