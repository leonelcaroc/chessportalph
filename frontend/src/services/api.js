// api.js
import axios from "axios";

const adminRoute = "admin";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const adminApi = axios.create({
  ...api.defaults,
  baseURL: `${api.defaults.baseURL}/${adminRoute}`,
});

export { api, adminApi };
