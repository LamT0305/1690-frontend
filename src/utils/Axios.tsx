import axios from "axios";


const END_POINT = "https://smart-car-parking-back-end.onrender.com/api/v1/parking-space"
// Create a custom axiosInstance of Axios
const axiosInstance = axios.create({
  baseURL: END_POINT, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // Example header
  },
});

// Add request interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the config here before the request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors if needed
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here before it's returned
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
