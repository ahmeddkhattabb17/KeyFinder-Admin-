import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointmentsData: null,
  loading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointmentsData: (state, action) => {
      state.appointmentsData = action.payload;
      state.error = null;
    },
    setAppointmentsError: (state, action) => {
      state.error = action.payload;
    },
    setAppointmentsLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setAppointmentsData,
  setAppointmentsError,
  setAppointmentsLoading
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
