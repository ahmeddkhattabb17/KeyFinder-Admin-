import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buyersData: null,
  loading: false,
  error: null,
};

const buyersSlice = createSlice({
  name: 'buyers',
  initialState,
  reducers: {
    setBuyersData: (state, action) => {
      state.buyersData = action.payload;
      state.error = null;
    },
    setBuyersError: (state, action) => {
      state.error = action.payload;
    },
    setBuyersLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setBuyersData,
  setBuyersError,
  setBuyersLoading
} = buyersSlice.actions;

export default buyersSlice.reducer; 