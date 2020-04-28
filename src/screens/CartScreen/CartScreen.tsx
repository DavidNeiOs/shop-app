import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../store";
import { removeFromCart } from "../../store/cart/actions";
import { Colors } from "../../constants/colors";
import { CartItem } from "../../components/CartItem";
import { addOrder } from "../../store/orders/actions";
import { OrderItem } from "../../store/orders/types";
import { Card } from "../../components/UI/Card";

interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useTypedSelector((state) => state.cart.totalAmaount);
  const cartItems = useTypedSelector((state) => {
    const itemsArr: OrderItem[] = [];
    for (const key in state.cart.items) {
      const { title, price, quantity, sum } = state.cart.items[key];
      itemsArr.push({
        productId: key,
        productTitle: title,
        productPrice: price,
        quantity,
        sum,
      });
    }
    return itemsArr.sort((itemA, itemB) =>
      itemA.productId > itemB.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const handleSendOrder = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${(Math.round(cartTotalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            onPress={handleSendOrder}
            color={Colors.accent}
            disabled={!cartItems.length}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => {
              dispatch(removeFromCart(item.productId));
            }}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
