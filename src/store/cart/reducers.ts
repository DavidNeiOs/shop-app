import { CartState, ADD_TO_CART, CartActionTypes, Item, REMOVE_FROM_CART } from "./types";

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
    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.pid]
      const currQty = selectedItem.quantity;
      let updatedCartItems;
      if (currQty > 1) {
        //reduce it
        const updatedCartItem = { ...selectedItem, quantity: currQty - 1, sum: selectedItem.sum - selectedItem.price}
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
      } else {
        // erase it
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid]
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmaount: state.totalAmaount - selectedItem.price
      }
    default:
      return state
  }
}