import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  Product as IProduct,
  ADD_PRODUCT,
  ProductActionTypes,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
  SetProductsAction,
  UpdateProductAction,
  DeleteProductAction,
} from "./types";
import Product from "../../models/product";

export function addProduct(product: IProduct): ProductActionTypes {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export const deleteProduct = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, DeleteProductAction>
) => {
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/products/${id}.json`,
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
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await fetch(
    "https://rn-complete-4c566.firebaseio.com/products.json",
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
    },
  });
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => async (dispatch: ThunkDispatch<{}, {}, UpdateProductAction>) => {
  const response = await fetch(
    `https://rn-complete-4c566.firebaseio.com/products/${id}.json`,
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

export const fetchProducts = () => async (
  dispatch: ThunkDispatch<{}, {}, SetProductsAction>
) => {
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
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  } catch (err) {
    throw err;
  }
};
