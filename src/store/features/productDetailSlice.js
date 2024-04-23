import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk(
  "fetchProductDetails",
  async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in fetching the single product", error);
    }
  }
);
const productDetails = createSlice({
  name: "productDetail",
  initialState: {
    isLoading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default productDetails.reducer;
