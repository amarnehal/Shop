import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: true,
    items: [],
    quantity: 0,
    userId: null,
    isError: false,
    total: null,
  },
  reducers: {
    getUserId: (state, action) => {
      console.log("action", action.payload);
      state.userId = action.payload;
    },
    addToCart: (state, action) => {
      console.log("addToCart acion", action.payload);
      if (action.payload.userId != null) {
        state.isLoading = false;

        const existingIndex = state.items.findIndex(
          (item) => item.id === action.payload.data.id
        );
        console.log("existing Index", existingIndex);
        if (existingIndex !== -1) {
          state.items[existingIndex].quantity++;
        } else {
          const newItem = { ...action.payload.data, quantity: 1 };
          state.items.push(newItem);
          state.quantity++;
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.quantity = state.items.length;
    },
    removeAllItems: (state, action) => {
      state.items = [];
      state.quantity = 0;
    },
    totalPrice: (state, action) => {
      state.total = state.items.reduce((acc, current) => {
        return acc + current.price * current.quantity;
      }, 0);
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.productId
      );
      if (index !== -1) {
        // Create a copy of the item object
        const updatedItem = { ...state.items[index] };

        // Update the quantity of the item
        updatedItem.quantity = action.payload.quantity;

        // Replace the item in the cart array with the updated item
        state.items[index] = updatedItem;
      }
    },
  },
});
export const {
  getUserId,
  addToCart,
  removeItem,
  removeAllItems,
  totalPrice,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
