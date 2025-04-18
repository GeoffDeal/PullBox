import axios from "axios";

const api = axios.create({
  baseURL: "https://pullboxbackend-production.up.railway.app/",
  timeout: 10000,
});

export default api;
