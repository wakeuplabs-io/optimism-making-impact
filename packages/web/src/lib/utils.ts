import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const validUrlSchema = z.string().url();

export function isValidUrl(url: unknown) {
  return validUrlSchema.safeParse(url).success;
}

/**
 * Determines if a URL points to a valid image.
 * @param url - The URL to check.
 * @returns A promise that resolves to `true` if the URL is a valid image, otherwise `false`.
 */
export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, {
      timeout: 5000, // Optional: Timeout for the request
    });

    // Check if the Content-Type header starts with "image/"
    const contentType = response.headers['content-type'];
    return contentType?.startsWith('image/') ?? false;
  } catch (error) {
    console.error('Error verifying image URL:', error);
    return false;
  }
}

// Example usage
(async () => {
  const url = 'https://example.com/image.jpg';
  const isValid = await isValidImageUrl(url);
  console.log(`Is valid image URL: ${isValid}`);
})();

export function capitalizeFirst(string: string) {
  const lower = string.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
