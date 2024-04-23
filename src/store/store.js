import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categorySlice";
import productDetailReducer from "./features/productDetailSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
});
export default store;
