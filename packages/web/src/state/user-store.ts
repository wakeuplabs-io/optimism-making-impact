import { AuthService } from '@/services/auth/service';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { fetchAuthSession } from 'aws-amplify/auth';

interface StepsState {
  isLoading: boolean;
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

    if (!authSession?.tokens?.idToken) {
      set(() => ({ isLoading: false, user: initialUserState }));
      return;
    }

    const idToken = authSession.tokens.idToken;
    //login in our backend
    const { data } = await AuthService.validate({ token: idToken.toString() });

    set(() => ({
      isLoading: false,
      user: {
        isAdmin: false,
        authToken: data.jwtToken,
        userName: data.username,
        userEmail: data.email,
      },
    }));
  },
  toggleUserAdmin: () => {
    set((state) => ({ user: { isAdmin: !state.user.isAdmin } }));
  },
}));
