import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import statisticsReducer from "./statisticsSlice";
import appointmentsReducer from "./appointmentsSlice";
import usersReducer from "./usersSlice";
import buyersReducer from './buyersSlice';
import brokersReducer from './brokersSlice';
import projectsReducer from './projectsSlice';
import propertiesReducer from "./propertiesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    statistics: statisticsReducer,
    appointments: appointmentsReducer,
    users: usersReducer,
    buyers: buyersReducer,
    brokers: brokersReducer,
    projects: projectsReducer,
    properties: propertiesReducer,
  },
});

export default store;
