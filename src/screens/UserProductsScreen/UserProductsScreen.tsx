import React from "react";
import { Platform, FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { ProductItem } from "../../components/ProductItem";
import { useTypedSelector } from "../../store";
import { AdminNavProps } from "../../navigation/AdminNavigator";
import reactotron from "../../../ReactotronConfig";
import { Colors } from "../../constants/colors";

interface UserProductsScreenProps extends AdminNavProps<"UserProduct"> {}

export const UserProductsScreen: React.FC<UserProductsScreenProps> = ({
  navigation,
}) => {
  const userProducts = useTypedSelector((state) => state.products.userProducts);
  //@ts-ignore
  reactotron.log(userProducts);

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
    });
  }, [navigation]);
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem product={item} onSelect={() => {}}>
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button color={Colors.primary} title="Delete" onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};
