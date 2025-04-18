import axios from "axios";

const url =
  import.meta.env.VITE_APIURL ||
  "https://pullboxbackend-production.up.railway.app/";

const api = axios.create({
  baseURL: url,
  timeout: 10000,
});

export default api;
