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
  isAdminModeEnabled: false,
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

    //show toast to user indicating if they are admin or viewer
    //TODO: avoid displaying the toast if the user refresh the page instead of login (will be done when persisting session in local storage)
    toast({
      title: 'Welcome!',
      description: validation.user.isAdmin ? 'You have access to edit the site.' : 'You can start exploring the site.',
    });

    set(() => ({
      isLoading: false,
      isAdminModeEnabled: validation.user.isAdmin,
      user: validation.user,
    }));
  },
  toggleUserAdmin: () => {
    set((state) => ({ user: { ...state.user, isAdmin: !state.user.isAdmin }, isAdminModeEnabled: !state.isAdminModeEnabled }));
  },
  isAuthenticated: () => !!get().user.authToken,
}));
