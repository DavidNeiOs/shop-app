import React, {
  useState,
  useCallback,
  useReducer,
  Reducer,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { Center } from "../../components/UI/Center";
import { AdminNavProps } from "../../navigation/AdminNavigator";
import { Input } from "../../components/Input";
import { useTypedSelector } from "../../store";
import { createProduct, updateProduct } from "../../store/product/actions";
import {
  FormActionTypes,
  FORM_INPUT_UPDATE,
  State as FormState,
} from "./ReducerTypes";
import { Colors } from "../../constants/colors";

const formReducer: Reducer<FormState, FormActionTypes> = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValidities = {
      ...state.inputValidities,
      [action.payload.key]: action.payload.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: {
        ...state.inputValues,
        [action.payload.key]: action.payload.text,
      },
      inputValidities: updatedValidities,
      formIsValid,
    };
  }
  return state;
};

interface EditProductScreenProps extends AdminNavProps<"EditProduct"> {}

export const EditProductScreen: React.FC<EditProductScreenProps> = ({
  route,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const prodId = route.params?.productId;
  const editedProduct = useTypedSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const handleSubmit = useCallback(async () => {
    const { inputValues, formIsValid } = formState;
    if (!formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            prodId!,
            inputValues.title,
            inputValues.description,
            inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          createProduct(
            inputValues.title,
            inputValues.description,
            inputValues.imageUrl,
            Number(inputValues.price) || 0
          )
        );
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [navigation, formState]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={handleSubmit}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, handleSubmit]);

  const handleInputChange = useCallback(
    (name: string, text: string, isValid: boolean) => {
      formDispatch({
        type: FORM_INPUT_UPDATE,
        payload: {
          key: name,
          text,
          isValid,
        },
      });
    },
    [formDispatch]
  );

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Center>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            name="title"
            label="Title"
            errorText="Cannot be empty"
            autoCapitalize="sentences"
            required
            autoCorrect
            returnKeyType="next"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={Boolean(editedProduct)}
          />
          <Input
            label="Image Url"
            name="imageUrl"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={Boolean(editedProduct)}
            errorText="Cannot be empty"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required
          />
          {editedProduct ? null : (
            <Input
              label="Price"
              name="price"
              onInputChange={handleInputChange}
              errorText="Cannot be empty"
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0}
            />
          )}
          <Input
            label="Description"
            name="description"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={Boolean(editedProduct)}
            errorText="Cannot be empty"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="done"
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
