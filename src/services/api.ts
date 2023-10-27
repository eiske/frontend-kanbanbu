import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-kanbanbu-production.up.railway.app",
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
  },
});

export default api;
