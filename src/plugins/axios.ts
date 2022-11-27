import axios, { type AxiosInstance } from "axios"

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:2020/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": ""
  },
})

export default apiClient
