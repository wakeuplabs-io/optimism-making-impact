interface UserState {
  isLoading: boolean;
  user: {
    isAdmin: boolean;
    authToken: string;
    userName: string;
    email: string;
  };
}

interface UserActions {
  toggleUserAdmin: () => void;
  fetchAuth: () => Promise<void>;
}

export type UserStore = UserState & UserActions;
