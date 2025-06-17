import { axiosInstance } from "./index.js";
 
const getProjectsList = async (params) => await axiosInstance.get('/api/projects', {params});

const deleteProject = async (id) => await axiosInstance.delete(`/api/projects/${id}`);

const createProject = async (payload) => await axiosInstance.post('/api/projects', payload);

const getProjectById = async (id) => await axiosInstance.get(`/api/projects/${id}`);

const updateProject = async (id, payload) => await axiosInstance.put(`/api/projects/${id}`, payload);

export { getProjectsList, deleteProject, createProject, getProjectById, updateProject };