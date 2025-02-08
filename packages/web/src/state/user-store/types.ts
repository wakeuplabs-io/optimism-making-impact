interface User {
  isAdmin: boolean;
  authToken: string;
  name: string;
  email: string;
}

interface UserState {
  isLoading: boolean;
  isAdminModeEnabled: boolean;
  user: User | null;
}

interface UserActions {
  fetchAuth: () => Promise<void>;
  toggleAdminMode: () => void;
}

export type UserStore = UserState & UserActions;
