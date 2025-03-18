import { Prisma } from '@optimism-making-impact/prisma';

export type CompleteStep = Prisma.StepGetPayload<{
  include: {
    cards: { include: { attribute: true; keywords: true } };
    infographics: true;
    items: { include: { attribute: true } };
    smartListFilter: { include: { attributes: true } };
  };
}>;
