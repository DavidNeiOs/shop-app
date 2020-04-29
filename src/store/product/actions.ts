import { ThunkAction } from "redux-thunk";

import {
  Product as IProduct,
  ADD_PRODUCT,
  ProductActionTypes,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "./types";
import Product from "../../models/product";
import { RootState } from "..";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, ProductActionTypes>;

export function addProduct(product: IProduct): ProductActionTypes {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export const deleteProduct = (id: string): ThunkResult<Promise<any>> => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  dispatch({
    type: DELETE_PRODUCT,
    pid: id,
  });
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
): ThunkResult<Promise<any>> => async (dispatch, getState) => {
  const auth = getState().auth;
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/products.json?auth=${auth.token}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: auth.userId,
      }),
    }
  );

  const resData = await response.json();

  dispatch({
    type: CREATE_PRODUCT,
    payload: {
      id: resData.name,
      title,
      description,
      imageUrl,
      price,
      ownerId: auth.userId!,
    },
  });
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
): ThunkResult<Promise<any>> => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  dispatch({
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  });
};

export const fetchProducts = (): ThunkResult<Promise<any>> => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.userId;
  try {
    const response = await fetch(
      "https://rn-complete-4c566.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts, userId: userId! });
  } catch (err) {
    throw err;
  }
};
