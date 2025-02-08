interface UserState {
  isLoading: boolean;
  isAdminModeEnabled: boolean;
  user: {
    isAdmin: boolean;
    authToken: string;
    name: string;
    email: string;
  };
}

interface UserActions {
  toggleUserAdmin: () => void;
  fetchAuth: () => Promise<void>;
  isAuthenticated: () => boolean;
  toggleAdminMode: () => void;
}

export type UserStore = UserState & UserActions;
