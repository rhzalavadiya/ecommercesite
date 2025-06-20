import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const token = localStorage.getItem('token');
export const login = createAsyncThunk(
  'auth/login',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', userData);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
    initialState: {
        user: null,
        token: token,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default authSlice.reducer;