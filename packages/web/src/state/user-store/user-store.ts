import { optimisticUpdate } from '../utils/optimistic-update';
import {
  AUTHENTICATION_ERROR_DESCRIPTION,
  AUTHENTICATION_ERROR_TITLE,
  AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
  AUTHENTICATION_SUCCESS_DESCRIPTION,
  AUTHENTICATION_SUCCESS_TITLE,
} from './texts';
import { UserState, UserStore } from './types';
import { AUTH_TOKEN_KEY, IS_DEVELOPMENT } from '@/config';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { LocalStorageService } from '@/services/local-storage';
import { Role, UsersService } from '@/services/users-service';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth';
import { AxiosError } from 'axios';

const persistConfig = { name: 'user' };
const onUpdatesError = (error: unknown) => {
  const title = 'Failed to create step';
  let description = 'Unknown error';

  if (error instanceof AxiosError) {
    description = error.response?.data.error.message;
  }

  toast({ title, description, variant: 'destructive' });
};

const initialState: UserState = {
  user: null,
  adminUsers: [],
  isLoading: false,
  isAdminModeEnabled: false,
};

export const useUserStore = createWithMiddlewares<UserStore>(
  (set, get) => ({
    ...initialState,
    fetchAuth: async () => {
      const userWasLoggedIn = Boolean(get().user);

      if (!userWasLoggedIn) set(() => ({ isLoading: true }));

      const authSession = await fetchAuthSession({ forceRefresh: true });

      if (!authSession?.tokens?.idToken) {
        set(() => ({ isLoading: false, user: null }));
        LocalStorageService.removeItem(AUTH_TOKEN_KEY);
        return;
      }

      const idToken = authSession.tokens.idToken;

      const { status, user } = await AuthService.validate({ token: idToken.toString() });

      if (status === 'error' || !user.isAdmin) {
        toast({
          title: AUTHENTICATION_ERROR_TITLE,
          description: status === 'error' ? AUTHENTICATION_ERROR_DESCRIPTION : AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
          variant: 'destructive',
        });
        setTimeout(() => {
          set(() => ({ isLoading: false, user: null, isAdminModeEnabled: false }));
          get().signOut();
          LocalStorageService.removeItem(AUTH_TOKEN_KEY);
        }, 1000);
        return;
      }

      set(() => ({ isLoading: false, user }));

      LocalStorageService.setItem(AUTH_TOKEN_KEY, user.authToken);

      if (!userWasLoggedIn) {
        toast({
          title: AUTHENTICATION_SUCCESS_TITLE,
          description: AUTHENTICATION_SUCCESS_DESCRIPTION,
        });
        set({ isAdminModeEnabled: true });
        return;
      }
    },
    signOut: async () => {
      await amplifySignOut();
      LocalStorageService.removeItem(AUTH_TOKEN_KEY);
    },
    clearState: () => {
      set(() => initialState);
    },
    toggleAdminMode: () => {
      const user = get().user;

      if (!IS_DEVELOPMENT) {
        if (!user?.isAdmin) return;
      }

      set((state) => ({ isAdminModeEnabled: !state.isAdminModeEnabled }));
    },
    grantAdmin: async (email: string) => {
      await optimisticUpdate({
        getStateSlice: () => get().adminUsers,
        updateFn: (adminUsers) => [...adminUsers, { email, role: Role.ADMIN }],
        setStateSlice: (adminUsers) => set(() => ({ adminUsers })),
        apiCall: () => UsersService.grantAdmin({ email }),
        onError: onUpdatesError,
      });
    },
    revokeAdmin: async (email: string) => {
      await optimisticUpdate({
        getStateSlice: () => get().adminUsers,
        updateFn: (adminUsers) => adminUsers.filter((adminUser) => adminUser.email !== email),
        setStateSlice: (adminUsers) => set(() => ({ adminUsers })),
        apiCall: () => UsersService.revokeAdmin({ email }),
        onError: onUpdatesError,
      });
    },
    getAdminUsers: async () => {
      set(() => ({ isLoading: true }));
      try {
        const adminUsers = await UsersService.getEditors();
        set(() => ({ adminUsers, isLoading: false }));
      } catch (error) {
        console.error('Error fetching admin users:', error);
        set(() => ({ isLoading: false }));
      }
    },
  }),
  persistConfig,
);
