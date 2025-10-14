// api.js
import axios from "axios";

const adminRoute = "admin";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-meta": import.meta.env.X_META,
  },
});

const adminApi = axios.create({
  ...api.defaults,
  baseURL: `${api.defaults.baseURL}/${adminRoute}`,
  headers: {
    "Content-Type": "application/json",
    "x-meta": import.meta.env.X_META,
  },
});

export { api, adminApi };
