import axios from "axios"

export const API = axios.create({
    baseURL: "https://task-manager-54qt.onrender.com/api"
})

// Adding error handling interceptors
API.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            console.error("Resource not found")
        } else if (error.response?.status === 400) {
            console.error("Bad request:", error.response.data.error)
        } else if (error.response?.status === 500) {
            console.error("Server error")
        }
        return Promise.reject(error)
    }
)