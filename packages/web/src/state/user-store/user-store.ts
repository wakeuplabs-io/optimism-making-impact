import { UserStore } from './types';
import { IS_DEVELOPMENT } from '@/config';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import {
  AUTHENTICATION_ERROR_DESCRIPTION,
  AUTHENTICATION_ERROR_TITLE,
  AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
  AUTHENTICATION_SUCCESS_DESCRIPTION,
  AUTHENTICATION_SUCCESS_TITLE,
} from './texts';

const persistConfig = { name: 'user' };

export const useUserStore = createWithMiddlewares<UserStore>(
  (set, get) => ({
    user: null,
    isLoading: false,
    isAdminModeEnabled: false,
    fetchAuth: async () => {
      const userWasLoggedIn = Boolean(get().user);

      if (!userWasLoggedIn) set(() => ({ isLoading: true }));

      const authSession = await fetchAuthSession({ forceRefresh: true });

      if (!authSession?.tokens?.idToken) {
        set(() => ({ isLoading: false, user: null }));
        return;
      }

      const idToken = authSession.tokens.idToken;

      const { status, user } = await AuthService.validate({ token: idToken.toString() });

      // if the authentication fails or user is not an admin, sign out the user
      if (status === 'error' || !user.isAdmin) {
        toast({
          title: AUTHENTICATION_ERROR_TITLE,
          description: status === 'error' ? AUTHENTICATION_ERROR_DESCRIPTION : AUTHENTICATION_NOT_ADMIN_ERROR_DESCRIPTION,
          variant: 'destructive',
        });
        setTimeout(() => {
          set(() => ({ isLoading: false, user: null }));
          signOut();
        }, 1000);
        return;
      }

      set(() => ({ isLoading: false, user }));

      if (!userWasLoggedIn) {
        // Display success toast if the user wasn't logged in before.
        toast({
          title: AUTHENTICATION_SUCCESS_TITLE,
          description: AUTHENTICATION_SUCCESS_DESCRIPTION,
        });
        set({ isAdminModeEnabled: true });
        return;
      }
    },
    toggleAdminMode: () => {
      const user = get().user;

      if (!IS_DEVELOPMENT) {
        if (!user?.isAdmin) return;
      }

      set((state) => ({ isAdminModeEnabled: !state.isAdminModeEnabled }));
    },
  }),
  persistConfig,
);
