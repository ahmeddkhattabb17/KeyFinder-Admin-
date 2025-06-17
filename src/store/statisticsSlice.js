import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statisticsData: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatisticsData: (state, action) => {
      state.statisticsData = action.payload;
      state.error = null;
    },
    setStatisticsError: (state, action) => {
      state.error = action.payload;
    },
    setStatisticsLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { 
  setStatisticsData, 
  setStatisticsError, 
  setStatisticsLoading 
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
