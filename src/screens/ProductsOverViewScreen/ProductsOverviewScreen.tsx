import React from "react";
import { useDispatch } from "react-redux";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useTypedSelector } from "../../store";
import { ProductItem } from "../../components/ProductItem";
import { ProductsNavProps } from "../../navigation/ProductNavigator";
import { addToCart } from "../../store/cart/actions";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
interface ProductsOverviewScreenProps
  extends ProductsNavProps<"ProductsOverview"> {}

export const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({
  navigation,
}: ProductsOverviewScreenProps) => {
  const products = useTypedSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

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
