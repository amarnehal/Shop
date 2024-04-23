import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
    filteredByPrice: [],
    filterByCategory: [],
  },
  reducers: {
    filterProducts: (state, action) => {
      const { payload: price } = action;
      if (state.data != null) {
        state.filteredByPrice = state.data.filter((product) => {
          return product.price <= price;
        });
      }
    },
    filterProductsByCategory: (state, action) => {
      const { payload: category } = action;
      console.log("action.payload", category);
      if (state?.data != null) {
        state.filterByCategory = state?.data?.filter((product) => {
          return product.category === category;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export const { filterProducts, filterProductsByCategory } =
  productSlice.actions;
export default productSlice.reducer;
