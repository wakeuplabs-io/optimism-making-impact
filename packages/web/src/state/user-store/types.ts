import { Editors } from '@/services/users-service';

interface User {
  isAdmin: boolean;
  authToken: string;
  name: string;
  email: string;
}

export interface UserState {
  isLoading: boolean;
  isAdminModeEnabled: boolean;
  user: User | null;
  adminUsers: Editors[];
}

export interface UserActions {
  fetchAuth: () => Promise<void>;
  clearState: () => void;
  signOut: () => Promise<void>;
  toggleAdminMode: () => void;
  grantAdmin: (email: string) => Promise<void>;
  revokeAdmin: (email: string) => Promise<void>;
  getAdminUsers: () => Promise<void>;
}

export type UserStore = UserState & UserActions;
