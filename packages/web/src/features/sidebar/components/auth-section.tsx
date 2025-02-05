import { signInWithRedirect, getCurrentUser, AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export const AuthSection = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleSignIn = async () => {
    const result = await signInWithRedirect({ provider: 'Google' });
    console.log('Auth result', result);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        if (!session) {
          console.log('no session');
          return;
        }
        const user = await getCurrentUser();
        console.log();
        console.log('asd', user);
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return user ? <p>hello ${user.username}</p> : <button onClick={handleSignIn}>Log In</button>;
};
