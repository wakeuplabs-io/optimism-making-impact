import { signInWithRedirect, getCurrentUser, AuthUser, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export const AuthSection = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession({ forceRefresh: true });
        if (!session.tokens) {
          console.log('no session');
          return;
        }

        console.log(session);
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return user ? (
    <div>
      <p>hello ${user.username}</p>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  ) : (
    <button onClick={() => signInWithRedirect({ provider: 'Google' })}>Log In</button>
  );
};
