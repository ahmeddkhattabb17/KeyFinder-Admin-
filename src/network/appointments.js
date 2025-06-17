import { axiosInstance } from "./index.js";

const getAppointments = async () => await axiosInstance.get('/api/appointments');

export { getAppointments };
