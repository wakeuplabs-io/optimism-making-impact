import { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

export function useIcons(): { [k: string]: LucideIcons.LucideIcon } {
  return useMemo(
    () => Object.fromEntries(Object.entries(LucideIcons).map(([key, value]) => [key.toLowerCase(), value as LucideIcons.LucideIcon])),
    [],
  );
}
