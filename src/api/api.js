import axios from "axios";

const url =
  import.meta.env.VITE_API_URL ||
  "https://pullboxbackend-production.up.railway.app/";

const api = axios.create({
  baseURL: url,
  timeout: 10000,
  withCredentials: true,
});

export default api;
