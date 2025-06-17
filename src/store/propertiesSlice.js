import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.error = null;
    },
    setPropertiesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPropertiesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProperties, setPropertiesLoading, setPropertiesError } = propertiesSlice.actions;
export default propertiesSlice.reducer; 