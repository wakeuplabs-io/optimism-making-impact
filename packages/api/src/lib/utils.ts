import { CompleteStep } from '@/types/entities/step.js';

/**
 * Given an array of steps, returns a Set of all the keyword IDs
 * that exist on the cards within those steps.
 *
 * @param steps An array of CompleteStep objects.
 * @returns A Set of all the keyword IDs on the steps.
 */
export function getKeywordsIdsFromSteps(steps: CompleteStep[]): Set<number> {
  const oldKeywordIds = new Set<number>();

  for (const step of steps) {
    for (const card of step.cards) {
      for (const keyword of card.keywords) {
        oldKeywordIds.add(keyword.id);
      }
    }
  }

  return oldKeywordIds;
}

/**
 * Given an array of steps, creates a Map that maps each keyword ID to an
 * object with `id` and `value` properties.
 *
 * @param steps An array of CompleteStep objects.
 * @returns A Map of keyword IDs to objects with `id` and `value` properties.
 */
export function buildKeywordMap(steps: CompleteStep[]): Map<number, { id: number; value: string }> {
  const keywordDataById = new Map<number, { id: number; value: string }>();

  for (const step of steps) {
    for (const card of step.cards) {
      for (const kw of card.keywords) {
        keywordDataById.set(kw.id, { id: kw.id, value: kw.value });
      }
    }
  }

  return keywordDataById;
}
