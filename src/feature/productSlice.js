import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products', // this name does NOT affect useSelector
  initialState: {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    total: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
