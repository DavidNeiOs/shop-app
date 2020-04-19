import { CartState, ADD_TO_CART, CartActionTypes, Item } from "./types";
import Product from "../../models/product";

const initialState: CartState = {
  items: {},
  totalAmaount: 0
}

export default (state = initialState, action: CartActionTypes) => {
  switch(action.type) {
    case ADD_TO_CART:
      const { items, totalAmaount } = state
      const { id, title, price } = action.product

      let updatedOrNewItem: Item

      if(items[id]) {
        updatedOrNewItem = { ...items[id], quantity: items[id].quantity + 1, title, sum: items[id].sum + price}
      } else {
        updatedOrNewItem = { title, price, quantity: 1, sum: price }
      }

      return {
        ...state,
        items: { ...items, [id]: updatedOrNewItem },
        totalAmaount: totalAmaount + price
      }
    default:
      return state
  }
}