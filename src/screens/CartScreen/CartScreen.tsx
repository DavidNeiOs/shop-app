import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../store";
import { removeFromCart } from "../../store/cart/actions";
import { Colors } from "../../constants/colors";
import { CartItem } from "../../components/CartItem";
interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const cartTotalAmount = useTypedSelector((state) => state.cart.totalAmaount);
  const cartItems = useTypedSelector((state) => {
    const itemsArr = [];
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

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {}}
          color={Colors.accent}
          disabled={!cartItems.length}
        />
      </View>
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
