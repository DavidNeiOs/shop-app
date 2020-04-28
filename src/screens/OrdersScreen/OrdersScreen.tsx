import React, { useEffect, useState } from "react";
import { Platform, FlatList, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { Center } from "../../components/UI/Center";
import { useTypedSelector } from "../../store";
import { OrdersNavProps } from "../../navigation/OrdersNavigator";
import { OrderItem } from "../../components/OrderItem";
import { fetchOrders } from "../../store/orders/actions";
import { ThunkDispatch } from "redux-thunk";
import { OrdersState, OrdersActionTypes } from "../../store/orders/types";
import { Colors } from "../../constants/colors";

interface OrdersScreenProps extends OrdersNavProps<"Orders"> {}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useTypedSelector((state) => state.orders.orders);
  const dispatch = useDispatch<
    ThunkDispatch<OrdersState, undefined, OrdersActionTypes>
  >();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

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

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.date}
          items={item.items}
        />
      )}
    />
  );
};
