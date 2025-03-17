import { Editors } from '@/services/users-service';

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
  adminUsers: Editors[];
}

export interface UserActions {
  signOut: () => Promise<void>;
  toggleAdminMode: () => void;
  grantAdmin: (email: string) => Promise<void>;
  revokeAdmin: (email: string) => Promise<void>;
  getAdminUsers: () => Promise<void>;
}

export type UserContextType = UserState & UserActions;
