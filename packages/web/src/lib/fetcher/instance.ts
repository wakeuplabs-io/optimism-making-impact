import { useUserStore } from '@/state';
import axios from 'axios';

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

fetcher.interceptors.request.use((config) => {
  //interceptor that adds the auth token to the request
  const authToken = useUserStore.getState().user?.authToken;

  if (authToken) {
    config.headers.Authorization = authToken;
  }

  return config;
});

export { fetcher };
