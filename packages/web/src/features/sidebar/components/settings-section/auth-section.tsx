import { Login } from './login';
import Logout from './logout';
import { useUserStore } from '@/state';

export const AuthSection = () => {
  const { user } = useUserStore((state) => state);

  return user?.authToken ? <Logout /> : <Login />;
};
