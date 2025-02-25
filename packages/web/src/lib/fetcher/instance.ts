import { useUserStore } from '@/state';
import { signOut } from 'aws-amplify/auth';
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

fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      //sign out the user
      setTimeout(() => {
        signOut();
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export { fetcher };
