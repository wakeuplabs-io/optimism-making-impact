import { duplicateRound } from '@/lib/prisma/duplicate-round.js';
import { getCompleteRound, getLastCompleteRound } from '@/lib/prisma/helpers.js';
import { describe, expect, test } from 'vitest';

describe('Duplicate round', async () => {
  const lastRound = await getLastCompleteRound();
  if (!lastRound) throw new Error('No last round found');

  const newRoundId = await duplicateRound(lastRound);

  const originalRound = await getCompleteRound(lastRound.id);
  const duplicatedRound = await getCompleteRound(newRoundId);

  if (!originalRound || !duplicatedRound) throw new Error('Original or duplicated round not found');

  test('Round fields should match except for IDs and timestamps', () => {
    expect(duplicatedRound.link1).toBe(originalRound.link1);
    expect(duplicatedRound.link2).toBe(originalRound.link2);
    expect(duplicatedRound.id).toBe(originalRound.id + 1);
    expect(duplicatedRound.createdAt).not.toBe(originalRound.createdAt);
    expect(duplicatedRound.updatedAt).not.toBe(originalRound.updatedAt);
  });

  test('Categories should be duplicated correctly', () => {
    expect(duplicatedRound.categories.length).toBe(originalRound.categories.length);
    duplicatedRound.categories.forEach((category, index) => {
      const originalCategory = originalRound.categories[index];
      expect(category.name).toBe(originalCategory.name);
      expect(category.icon).toBe(originalCategory.icon);
      expect(category.id).not.toBe(originalCategory.id);
      expect(category.roundId).toBe(duplicatedRound.id);
      expect(category.steps.length).toBe(originalCategory.steps.length);
    });
  });

  test('Steps, infographics, items, cards, and keywords should be duplicated correctly', () => {
    const originalSteps = originalRound.categories.flatMap((category) => category.steps);
    const duplicatedSteps = duplicatedRound.categories.flatMap((category) => category.steps);

    expect(duplicatedSteps.length).toBe(originalSteps.length);

    duplicatedSteps.forEach((step, index) => {
      const originalStep = originalSteps[index];

      expect(step.title).toBe(originalStep.title);
      expect(step.icon).toBe(originalStep.icon);
      expect(step.position).toBe(originalStep.position);
      expect(step.type).toBe(originalStep.type);
      expect(step.id).not.toBe(originalStep.id);
      expect(step.categoryId).not.toBe(originalStep.categoryId);

      // Infographics
      expect(step.infographics.length).toBe(originalStep.infographics.length);
      step.infographics.forEach((infographic, i) => {
        expect(infographic.markdown).toBe(originalStep.infographics[i].markdown);
        expect(infographic.image).toBe(originalStep.infographics[i].image);
        expect(infographic.position).toBe(originalStep.infographics[i].position);
        expect(infographic.stepId).toBe(step.id);
        expect(infographic.id).not.toBe(originalStep.infographics[i].id);
      });

      // Items
      expect(step.items.length).toBe(originalStep.items.length);
      step.items.forEach((item, i) => {
        expect(item.markdown).toBe(originalStep.items[i].markdown);
        expect(item.position).toBe(originalStep.items[i].position);
        expect(item.id).not.toBe(originalStep.items[i].id);
        expect(item.stepId).toBe(step.id);
        expect(item.attributeId).not.toBe(originalStep.items[i].attributeId);
      });

      // Cards and keywords
      expect(step.cards.length).toBe(originalStep.cards.length);
      step.cards.forEach((card, i) => {
        expect(card.title).toBe(originalStep.cards[i].title);
        expect(card.markdown).toBe(originalStep.cards[i].markdown);
        expect(card.strength).toBe(originalStep.cards[i].strength);
        expect(card.position).toBe(originalStep.cards[i].position);
        expect(card.id).not.toBe(originalStep.cards[i].id);
        expect(card.stepId).toBe(step.id);

        // Keywords
        card.keywords.forEach((keyword, k) => {
          const originalCard = originalStep.cards[i];

          expect(keyword.value).toBe(originalCard.keywords[k].value);
          expect(keyword.id).not.toBe(originalCard.keywords[k].id);
        });
      });
    });
  });

  test('Smart lists and their attributes should be duplicated correctly', () => {
    const originalSteps = originalRound.categories.flatMap((category) => category.steps);
    const duplicatedSteps = duplicatedRound.categories.flatMap((category) => category.steps);

    duplicatedSteps.forEach((step, index) => {
      const originalStep = originalSteps[index];

      if (step.smartList) {
        expect(originalStep.smartList).toBeDefined();
        expect(step.smartList.title).toBe(originalStep.smartList?.title);
        expect(step.smartList.id).not.toBe(originalStep.smartList?.id);

        // Compare attributes within the smart list
        expect(step.smartList.attributes.length).toBe(originalStep.smartList?.attributes.length);
        step.smartList.attributes.forEach((attribute, attrIndex) => {
          const originalAttribute = originalStep.smartList?.attributes[attrIndex];

          expect(attribute.value).toBe(originalAttribute?.value);
          expect(attribute.description).toBe(originalAttribute?.description);
          expect(attribute.color).toBe(originalAttribute?.color);
          expect(attribute.id).not.toBe(originalAttribute?.id);
          expect(attribute.smartListId).toBe(step.smartList?.id);
        });
      } else {
        expect(originalStep.smartList).toBeFalsy();
      }
    });
  });
});
