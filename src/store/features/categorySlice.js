import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error in fetching categories", error);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log("error occured", action.payload);
      state.isError = true;
    });
  },
});
export default categorySlice.reducer;
