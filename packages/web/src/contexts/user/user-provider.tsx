import { User } from './types';
import { AUTH_TOKEN_KEY, IS_DEVELOPMENT } from '@/config';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { LocalStorageService } from '@/services/local-storage';
import { Editors, Role, UsersService } from '@/services/users-service';
import {
  AUTHENTICATION_ERROR_DESCRIPTION,
  AUTHENTICATION_ERROR_TITLE,
  AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
  AUTHENTICATION_SUCCESS_DESCRIPTION,
  AUTHENTICATION_SUCCESS_TITLE,
} from '@/contexts/user/texts';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth';
import { AxiosError } from 'axios';
import { useState, ReactNode, useEffect } from 'react';
import { UserContext } from './user-context';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdminModeEnabled, setIsAdminModeEnabled] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [adminUsers, setAdminUsers] = useState<Editors[]>([]);

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
  const grantAdmin = async (email: string) => {
    await optimisticUpdate({
      getStateSlice: () => adminUsers,
      updateFn: (adminUsers) => [...adminUsers, { email, role: Role.ADMIN }],
      setStateSlice: (adminUsers) => setAdminUsers(adminUsers),
      apiCall: () => UsersService.grantAdmin({ email }),
      onError: onUpdatesError,
    });
  };
  const revokeAdmin = async (email: string) => {
    await optimisticUpdate({
      getStateSlice: () => adminUsers,
      updateFn: (adminUsers) => adminUsers.filter((adminUser) => adminUser.email !== email),
      setStateSlice: (adminUsers) => setAdminUsers(adminUsers),
      apiCall: () => UsersService.revokeAdmin({ email }),
      onError: onUpdatesError,
    });
  };
  const getAdminUsers = async () => {
    setIsLoading(true);
    try {
      const adminUsers = await UsersService.getEditors();
      setAdminUsers(adminUsers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      setIsLoading(false);
    }
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

  return (
    <UserContext.Provider
      value={{ isLoading, isAdminModeEnabled, user, adminUsers, getAdminUsers, revokeAdmin, grantAdmin, toggleAdminMode, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

const onUpdatesError = (error: unknown) => {
  const title = 'Failed to create step';
  let description = 'Unknown error';

  if (error instanceof AxiosError) {
    description = error.response?.data.error.message;
  }

  toast({ title, description, variant: 'destructive' });
};
