import React, { useState, useEffect } from "react";
import {
  Platform,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { ProductItem } from "../../components/ProductItem";
import { useTypedSelector } from "../../store";
import { AdminNavProps } from "../../navigation/AdminNavigator";
import { Colors } from "../../constants/colors";
import { deleteProduct } from "../../store/product/actions";
import { Center } from "../../components/UI/Center";

interface UserProductsScreenProps extends AdminNavProps<"UserProduct"> {}

export const UserProductsScreen: React.FC<UserProductsScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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
        onPress: async () => {
          setLoading(true);
          setError(null);
          try {
            await dispatch(deleteProduct(id));
            setLoading(false);
          } catch (err) {
            setLoading(false);
            setError(err.message);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  if (userProducts.length === 0) {
    return (
      <Center>
        <Text>No products found. Start creating 🎩</Text>
      </Center>
    );
  }

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
