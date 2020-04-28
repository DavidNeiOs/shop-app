export interface Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

// ACTIONS
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  pid: string;
}

export interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  payload: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: Product[];
}

// Add more actions like this | DeleteProductAction | UpdateProd...
export type ProductActionTypes =
  | AddProductAction
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
  | SetProductsAction;
