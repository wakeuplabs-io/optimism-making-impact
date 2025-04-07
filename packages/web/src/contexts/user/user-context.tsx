import { UserContextType } from './types';
import { createContext } from 'react';

export const UserContext = createContext<UserContextType | undefined>(undefined);
