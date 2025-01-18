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
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // If the image loads successfully, it is a valid image
    img.onerror = () => resolve(false); // If an error occurs while loading, it's not a valid image
    img.src = url; // Trigger the loading of the image
  });
}

export function capitalizeFirst(string: string) {
  const lower = string.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
