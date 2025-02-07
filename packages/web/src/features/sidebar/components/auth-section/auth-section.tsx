// import { useUserStore } from '@/state';
import { signOut } from 'aws-amplify/auth';
import { Login } from './login';
import { useUserStore } from '@/state';

export const AuthSection = () => {
  const { user } = useUserStore((state) => state);

  return user.authToken ? (
    <div>
      <p className='font-bold'>Welcome {user.name}</p>
      <br />
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  ) : (
    <Login />
  );
};
