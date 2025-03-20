import { BADGE_COLORS, BadgeColorType, COLOR_MAP, ExtendedColor } from '@/config';
import { CompleteCard } from '@/types/cards';
import { Keyword } from '@/types/keywords';
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

export function capitalizeFirst(string: string) {
  const lower = string.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Utility function to select a badge color based on the input string.
 * @param {string} input - The string used to determine the color.
 * @returns {string} - A color from the BADGE_COLORS array.
 */
export function getRandomBadgeColor(input: string): BadgeColorType {
  // Simple hash function to convert string to a number
  const hash = Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const index = hash % BADGE_COLORS.length;

  return BADGE_COLORS[index];
}

export function extractUniqueKeywordsFromCards(cards: CompleteCard[]): Keyword[] {
  return cards
    .flatMap((card) => card.keywords)
    .reduce<Keyword[]>((acc, current) => {
      if (!acc.some((item) => item.id === current.id)) acc.push(current);

      return acc;
    }, []);
}

export function getRoundName(roundId: number) {
  return `Round ${roundId}`;
}

export function getColor(color: ExtendedColor): string {
  return COLOR_MAP[color];
}
