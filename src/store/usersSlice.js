import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    brokers: [],
    buyers: [],
  },
  reducers: {
    setBrokers: (state, action) => {
      state.brokers = action.payload;
    },
    clearBrokers: (state) => {
      state.brokers = [];
    },
    setBuyers: (state, action) => {
      state.buyers = action.payload;
    },
    clearBuyers: (state) => {
      state.buyers = [];
    },
  },
});

export const { setBrokers, clearBrokers, setBuyers, clearBuyers } =
  usersSlice.actions;
export default usersSlice.reducer;
