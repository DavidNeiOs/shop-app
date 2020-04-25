import React from "react";
import { Platform, Text, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { useTypedSelector } from "../../store";
import { OrdersNavProps } from "../../navigation/OrdersNavigator";

interface OrdersScreenProps extends OrdersNavProps<"Orders"> {}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const orders = useTypedSelector((state) => state.orders.orders);

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
      data={orders}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};
