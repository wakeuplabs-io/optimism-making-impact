export interface User {
  isAdmin: boolean;
  authToken: string;
  name: string;
  email: string;
}

export interface UserState {
  isLoading: boolean;
  isAdminModeEnabled: boolean;
  user: User | null;
}

export interface UserActions {
  signOut: () => Promise<void>;
  toggleAdminMode: () => void;
}

export type UserContextType = UserState & UserActions;
