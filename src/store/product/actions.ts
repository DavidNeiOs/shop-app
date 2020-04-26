import {
  Product,
  ADD_PRODUCT,
  ProductActionTypes,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "./types";

export function addProduct(product: Product): ProductActionTypes {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export function deleteProduct(id: string): ProductActionTypes {
  return {
    type: DELETE_PRODUCT,
    pid: id,
  };
}

export function createProduct(
  title: string,
  description: string,
  imageUrl: string,
  price: number
) {
  return {
    type: CREATE_PRODUCT,
    payload: {
      title,
      description,
      imageUrl,
      price,
    },
  };
}

export function updateProduct(
  id: string,
  title: string,
  description: string,
  imageUrl: string
) {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  };
}
