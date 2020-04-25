import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { AdminNavProps } from "../../navigation/AdminNavigator";
import { useTypedSelector } from "../../store";

interface EditProductScreenProps extends AdminNavProps<"EditProduct"> {}

export const EditProductScreen: React.FC<EditProductScreenProps> = ({
  route,
  navigation,
}) => {
  const editedProduct = useTypedSelector((state) =>
    state.products.userProducts.find(
      (prod) => prod.id === route.params?.productId
    )
  );
  const [title, setTitle] = useState(editedProduct?.title || "");
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl || "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct?.description || ""
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
