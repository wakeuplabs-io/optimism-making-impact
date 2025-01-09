import { createWithMiddlewares } from '@/state/create-with-middlewares';

interface StepsState {
  isAdmin: boolean;
}

interface UserActions {
  toggleUserAdmin: () => void;
}

type UserStore = StepsState & UserActions;

export const useUserStore = createWithMiddlewares<UserStore>((set) => ({
  isAdmin: true,
  toggleUserAdmin: () => {
    set((state) => ({ isAdmin: !state.isAdmin }));
  },
}));
