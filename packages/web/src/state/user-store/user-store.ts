import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth/service';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { UserStore } from './types';

const initialUserState = {
  isAdmin: false,
  authToken: '',
  name: '',
  email: '',
};

export const useUserStore = createWithMiddlewares<UserStore>((set, get) => ({
  user: initialUserState,
  isLoading: false,
  fetchAuth: async () => {
    set(() => ({ isLoading: true }));

    const authSession = await fetchAuthSession({ forceRefresh: true });

    if (!authSession?.tokens?.idToken) {
      set(() => ({ isLoading: false, user: initialUserState }));
      return;
    }

    const idToken = authSession.tokens.idToken;
    //login in our backend
    const validation = await AuthService.validate({ token: idToken.toString() });

    if (validation.status === 'error') {
      toast({ title: 'Authentication Error', description: 'Failed to authenticate your user. Signing out', variant: 'destructive' });
      setTimeout(() => {
        signOut();
      }, 1000);
      return;
    }

    set(() => ({
      isLoading: false,
      user: validation.user,
    }));
  },
  toggleUserAdmin: () => {
    set((state) => ({ user: { ...state.user, isAdmin: !state.user.isAdmin } }));
  },
  isAuthenticated: () => !!get().user.authToken,
}));
