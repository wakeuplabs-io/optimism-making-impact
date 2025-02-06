import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { fetchAuthSession } from 'aws-amplify/auth';

interface StepsState {
  isLoading: false;
  user: {
    isAdmin: boolean;
    authToken: string;
    userName: string;
    userEmail: string;
  };
}

interface UserActions {
  toggleUserAdmin: () => void;
  fetchAuth: () => Promise<void>;
}

type UserStore = StepsState & UserActions;

const initialUserState = {
  isAdmin: false,
  authToken: '',
  userName: '',
  userEmail: '',
};

export const useUserStore = createWithMiddlewares<UserStore>((set) => ({
  user: initialUserState,
  isLoading: false,
  fetchAuth: async () => {
    set(() => ({ isLoading: true }));

    const authSession = await fetchAuthSession({ forceRefresh: true });

    if (!authSession.tokens?.idToken) {
      set(() => ({ isLoading: false, user: initialUserState }));
      return;
    }

    set(() => ({
      isLoading: false,
      user: {
        isAdmin: false,
        authToken: authSession.tokens.idToken.toString(),
        userName: authSession.tokens.idToken.payload['name'],
        userEmail: authSession.tokens.idToken.payload['email'],
      },
    }));
  },
  toggleUserAdmin: () => {
    set((state) => ({ user: { isAdmin: !state.user.isAdmin } }));
  },
}));
