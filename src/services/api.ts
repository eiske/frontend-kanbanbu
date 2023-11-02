import axios from 'axios';
import { getUserToken } from './utils';

const api = axios.create({
    baseURL: 'https://backend-kanbanbu-production.up.railway.app',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer',
    },
});

api.interceptors.request.use((config) => {
    const tokenResponse = getUserToken();

    if (config.headers && tokenResponse) {
        config.headers.Authorization = `Bearer ${tokenResponse}`;
    }
    return config;
});

export default api;
