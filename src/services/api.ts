import axios from "axios";

const api = axios.create({
  // baseURL: "https://backend-kanbanbu-production.up.railway.app",
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  },
});

export default api;
