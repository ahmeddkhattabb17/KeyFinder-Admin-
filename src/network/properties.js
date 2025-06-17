import { axiosInstance } from "./index.js";

const getProperties = async (payload) => await axiosInstance.post('/api/projects/list-properties', payload);

const getPropertyById = async (id) => await axiosInstance.get(`/api/projects/property/${id}`);

const deleteProperty = async (id) => await axiosInstance.delete(`/api/projects/property/${id}`);

const addPropertyToProject = async (id, payload) => await axiosInstance.post(`/api/projects/${id}/property`, payload);

const updateProperty = async (id, payload) => await axiosInstance.put(`/api/projects/property/${id}`, payload);

export { getProperties, getPropertyById, deleteProperty, addPropertyToProject, updateProperty };