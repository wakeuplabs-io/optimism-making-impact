import { Login } from './login';
import { useUserStore } from '@/state';
import Logout from './logout';

export const AuthSection = () => {
  const { isAuthenticated } = useUserStore((state) => state);

  return isAuthenticated() ? <Logout /> : <Login />;
};
