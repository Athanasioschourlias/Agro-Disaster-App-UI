import axios, { AxiosInstance } from "axios"


// Use environment variables directly
const API_PORT = 3000
const BASE_URL = "localhost"

const instance: AxiosInstance = axios.create({
    baseURL: `http://${BASE_URL}:${API_PORT}/api/v1`,
    headers: {
        "Access-Control-Allow-Origin":"*"
    }
})

instance.interceptors.response.use(
    response => response.data,
    error => {
        console.error(error)
        throw error
    }
)

export default instance

