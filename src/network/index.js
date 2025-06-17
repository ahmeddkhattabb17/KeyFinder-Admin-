import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Response interceptor - Error:", error.response?.status);
        // Handle 401 Unauthorized errors
        // if (error.response && error.response.status === 401) {
        //     // Clear localStorage
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('user');
            
        //     // Redirect to login page
        //     window.location.href = '/login';
        // }
        return Promise.reject(error);
    }
);