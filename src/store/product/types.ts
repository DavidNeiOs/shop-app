export interface Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface ProductsState {
  availableProducts: Product[],
  userProducts: Product[]
}

// ACTIONS
export const ADD_PRODUCT = 'ADD_PRODUCT'

interface AddProductAction {
  type: typeof ADD_PRODUCT
  payload: Product
}


// Add more actions like this | DeleteProductAction | UpdateProd...
export type ProductActionTypes = AddProductAction