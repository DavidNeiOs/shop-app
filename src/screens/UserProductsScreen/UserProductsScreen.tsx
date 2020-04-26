import React from "react";
import { Platform, FlatList, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { ProductItem } from "../../components/ProductItem";
import { useTypedSelector } from "../../store";
import { AdminNavProps } from "../../navigation/AdminNavigator";
import { Colors } from "../../constants/colors";
import { deleteProduct } from "../../store/product/actions";

interface UserProductsScreenProps extends AdminNavProps<"UserProduct"> {}

export const UserProductsScreen: React.FC<UserProductsScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const userProducts = useTypedSelector((state) => state.products.userProducts);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => navigation.navigate("EditProduct")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const handleSelect = (id: string) => {
    navigation.navigate("EditProduct", { productId: id });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Are you sure?", "Do you want to delete this item ?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onSelect={() => {
            handleSelect(item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              handleSelect(item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              handleDelete(item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};
