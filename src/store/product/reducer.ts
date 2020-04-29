import {
  ProductsState,
  ProductActionTypes,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "./types";
import Product from "../../models/product";
import reactotron from "../../../ReactotronConfig";

const initialState: ProductsState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (prod) => prod.ownerId === action.userId
        ),
      };
    case ADD_PRODUCT:
      return {
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        action.payload.ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.imageUrl,
        action.payload.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductsIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductsIndex] = updatedProduct;
      //@ts-ignore
      reactotron.log(productIndex, updatedUserProducts, updatedProduct);
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    default:
      return state;
  }
};
