import { AUTH_TOKEN_KEY } from '@/config';
import { LocalStorageService } from '@/services/local-storage';
import axios from 'axios';

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

fetcher.interceptors.request.use((config) => {
  const authToken = LocalStorageService.getItem<string>(AUTH_TOKEN_KEY);

  if (authToken) {
    config.headers.Authorization = authToken;
  }

  return config;
});

fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      setTimeout(() => {
        LocalStorageService.removeItem(AUTH_TOKEN_KEY);
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export { fetcher };
