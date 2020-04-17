import React from "react";
import { View, Text, FlatList } from "react-native";

import { useTypedSelector } from "../../store";
import { ProductItem } from "../../components/ProductItem";
import { ProductsNavProps } from "../../navigation/ShopNavigator";

interface ProductsOverviewScreenProps
  extends ProductsNavProps<"ProductsOverview"> {}

export const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({
  navigation,
}: ProductsOverviewScreenProps) => {
  const products = useTypedSelector(
    (state) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onAddToCart={() => {}}
          onViewDetail={() => {
            navigation.navigate("ProductDetails", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};
