import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";

import { ProductsNavProps } from "../../navigation/ShopNavigator";
import { useTypedSelector } from "../../store";

interface ProductDetailsScreenProps
  extends ProductsNavProps<"ProductDetails"> {}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
}) => {
  const { productId } = route.params;
  const selectedProduct = useTypedSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return (
    <View>
      <Text>{selectedProduct?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
