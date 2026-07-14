import axios from "axios";

console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;