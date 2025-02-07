import { useUserStore } from '@/state';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';

export const AuthSection = () => {
  const { isLoading, user } = useUserStore((state) => state);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user.authToken ? (
    <div>
      <p className='font-bold'>Welcome {user.name}</p>
      <br />
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  ) : (
    <button onClick={() => signInWithRedirect({ provider: 'Google' })}>Log In</button>
  );
};
