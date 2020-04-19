import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { Product } from "../../store/product/types";
import { Colors } from "../../constants/colors";
import { TouchableButton } from "../TouchableButton";

interface ProductItemProps {
  product: Product;
  onViewDetail: () => void;
  onAddToCart: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onViewDetail,
  onAddToCart,
}) => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableButton onPress={onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: product.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View details"
                onPress={onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="Add to cart"
                onPress={onAddToCart}
              />
            </View>
          </View>
        </TouchableButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
    height: "15%",
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
    height: "25%",
    paddingHorizontal: 20,
  },
});