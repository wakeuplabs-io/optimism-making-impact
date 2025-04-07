import { User } from './types';
import { UserContext } from './user-context';
import { AUTH_TOKEN_KEY, IS_DEVELOPMENT } from '@/config';
import {
  AUTHENTICATION_ERROR_DESCRIPTION,
  AUTHENTICATION_ERROR_TITLE,
  AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
  AUTHENTICATION_SUCCESS_DESCRIPTION,
  AUTHENTICATION_SUCCESS_TITLE,
} from '@/contexts/user/texts';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { LocalStorageService } from '@/services/local-storage';
import { signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth';
import { useState, ReactNode, useEffect } from 'react';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdminModeEnabled, setIsAdminModeEnabled] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const signOut = async () => {
    await amplifySignOut();
    LocalStorageService.removeItem(AUTH_TOKEN_KEY);
  };

  const toggleAdminMode = () => {
    if (!IS_DEVELOPMENT) {
      if (!user?.isAdmin) return;
    }
    setIsAdminModeEnabled((prev) => !prev);
  };

  useEffect(() => {
    const fetchAuth = async () => {
      const userWasLoggedIn = !!user;

      if (!userWasLoggedIn) setIsLoading(true);
      const authSession = await fetchAuthSession({ forceRefresh: true });

      if (!authSession?.tokens?.idToken) {
        setIsLoading(false);
        setUser(null);
        LocalStorageService.removeItem(AUTH_TOKEN_KEY);
        return;
      }

      const idToken = authSession.tokens.idToken;

      const { status, user: newUser } = await AuthService.validate({ token: idToken.toString() });

      if (status === 'error' || !newUser.isAdmin) {
        toast({
          title: AUTHENTICATION_ERROR_TITLE,
          description: status === 'error' ? AUTHENTICATION_ERROR_DESCRIPTION : AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
          variant: 'destructive',
        });
        setTimeout(() => {
          setIsLoading(false);
          setUser(null);
          setIsAdminModeEnabled(false);
          signOut();
          LocalStorageService.removeItem(AUTH_TOKEN_KEY);
        }, 1000);
        return;
      }

      setIsLoading(false);
      setUser(newUser);

      LocalStorageService.setItem(AUTH_TOKEN_KEY, newUser.authToken);

      if (!userWasLoggedIn) {
        toast({
          title: AUTHENTICATION_SUCCESS_TITLE,
          description: AUTHENTICATION_SUCCESS_DESCRIPTION,
        });
        setIsAdminModeEnabled(true);
        return;
      }
    };

    fetchAuth();
  }, []);

  return <UserContext.Provider value={{ isLoading, isAdminModeEnabled, user, toggleAdminMode, signOut }}>{children}</UserContext.Provider>;
};
