import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { ProductsNavProps } from "../../navigation/ShopNavigator";
import { useTypedSelector } from "../../store";
import { Colors } from "../../constants/colors";

interface ProductDetailsScreenProps
  extends ProductsNavProps<"ProductDetails"> {}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
}) => {
  const { productId } = route.params;
  const selectedProduct = useTypedSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return selectedProduct ? (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>${selectedProduct.description}</Text>
    </ScrollView>
  ) : (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
