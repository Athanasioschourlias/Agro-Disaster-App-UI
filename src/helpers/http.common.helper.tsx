import axios, { AxiosInstance } from "axios"


// Use environment variables directly
const API_PORT = 8081
const BASE_URL = "localhost"

const instance: AxiosInstance = axios.create({
    baseURL: `http://${BASE_URL}:${API_PORT}`,
    headers: {
        "Access-Control-Allow-Origin":`http://${BASE_URL}:${API_PORT}`,
    }
})

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Check if the authorization bearer token exists
        const authToken = localStorage.getItem('AuthToken');

        if (authToken) {
            // Modify the config to include the authorization header
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        // Log the modified request config
        console.log('Modified Request is being sent:', config);

        // You can further modify the config or do other things here
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    response => response,
    error => {
        // Do something with response error
        console.log(error)
        return Promise.reject(error);
    }
);

// instance.interceptors.response.use(
//     response => response.data,
//     error => {
//         console.error(error)
//         throw error
//     }
// )

export default instance

