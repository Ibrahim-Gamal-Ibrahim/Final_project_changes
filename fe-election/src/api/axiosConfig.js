import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://frontend:8080',
});

export default axiosInstance;
