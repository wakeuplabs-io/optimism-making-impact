import { UserStore } from './types';
import { IS_DEVELOPMENT } from '@/config';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';

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

      const validation = await AuthService.validate({ token: idToken.toString() });

      if (validation.status === 'error') {
        toast({ title: 'Authentication Error', description: 'Failed to authenticate your user. Signing out.', variant: 'destructive' });
        setTimeout(() => {
          signOut();
        }, 1000);
        return;
      }

      set(() => ({ isLoading: false, user: validation.user }));

      if (!userWasLoggedIn) {
        // Display success toast if the user wasn't logged in before.
        toast({
          title: 'Welcome!',
          description: validation.user.isAdmin ? 'You have access to edit the site.' : 'You can start exploring the site.',
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
