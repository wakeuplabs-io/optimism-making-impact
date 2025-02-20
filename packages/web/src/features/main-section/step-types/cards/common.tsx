import { strengthItems } from '@/types';

export const strengthOptions = strengthItems.map(({ value }) => ({ label: value.toLowerCase(), value }));
