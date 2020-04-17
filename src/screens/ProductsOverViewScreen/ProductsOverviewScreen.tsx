import React from "react";
import { View, Text, FlatList } from "react-native";
import { useTypedSelector } from "../../store";
import { ProductItem } from "../../components/ProductItem";

interface ProductsOverviewScreenProps {}

export const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({}) => {
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
          onViewDetail={() => {}}
        />
      )}
    />
  );
};
