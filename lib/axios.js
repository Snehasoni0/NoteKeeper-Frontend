import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://notekeeper-server-a5t0.onrender.com',
    withCredentials: true,
});

export default axiosInstance;


