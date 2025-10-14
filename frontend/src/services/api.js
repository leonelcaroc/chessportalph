import axios from "axios";

const adminRoute = "admin";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const commonHeaders = {
  "Content-Type": "application/json",
  // "X-Meta": process.env.VITE_X_META,
  // "X-Meta": "N8yu7Pq2VxZ4tLm3!cRw5",
};

const api = axios.create({
  baseURL,
  headers: commonHeaders,
});

const adminApi = axios.create({
  baseURL: `${baseURL}/${adminRoute}`,
  headers: commonHeaders,
});

export { api, adminApi };
