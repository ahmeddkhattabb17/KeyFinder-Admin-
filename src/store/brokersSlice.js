import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brokersData: null,
  loading: false,
  error: null,
};

const brokersSlice = createSlice({
  name: 'brokers',
  initialState,
  reducers: {
    setBrokersData: (state, action) => {
      state.brokersData = action.payload;
      state.error = null;
    },
    setBrokersError: (state, action) => {
      state.error = action.payload;
    },
    setBrokersLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setBrokersData,
  setBrokersError,
  setBrokersLoading
} = brokersSlice.actions;

export default brokersSlice.reducer; 