import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, FlatList } from "react-native";

import { useTypedSelector } from "../../store";
import { ProductItem } from "../../components/ProductItem";
import { ProductsNavProps } from "../../navigation/ShopNavigator";
import { addToCart } from "../../store/cart/actions";

interface ProductsOverviewScreenProps
  extends ProductsNavProps<"ProductsOverview"> {}

export const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({
  navigation,
}: ProductsOverviewScreenProps) => {
  const products = useTypedSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}
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
