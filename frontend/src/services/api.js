import axios from "axios";

const adminRoute = "admin";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const commonHeaders = {
  "Content-Type": "application/json",
  "X-Meta": import.meta.env.VITE_X_META,
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
