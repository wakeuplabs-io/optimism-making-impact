import { isValidImageUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';

/**
 * Custom hook to validate an image URL.
 * @param src - The image URL to validate.
 * @returns An object with `isValid` and `isLoading` states.
 */
export function useImageIsValid(src: string) {
  const [isValid, setIsValid] = useState<boolean>(false); // Default to false (not valid)
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initially loading

  useEffect(() => {
    async function validateImageUrl() {
      setIsLoading(true);
      const valid = await isValidImageUrl(src);
      setIsValid(valid);
      setIsLoading(false);
    }

    validateImageUrl();
  }, [src]);

  return { isValid, isLoading };
}
