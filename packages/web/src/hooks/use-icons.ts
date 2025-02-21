import { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

export function useIcons() {
  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(LucideIcons).map(([key, value]) => [key.toLowerCase(), value as React.ComponentType])
      ),
    []
  );
}
