import { axiosInstance } from "./index.js";

const getStatus = async () => await axiosInstance.get('/api/status');

export { getStatus };

