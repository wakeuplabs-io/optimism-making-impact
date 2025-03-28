import { COLOR_MAP, ExtendedColor } from '@/config';
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
