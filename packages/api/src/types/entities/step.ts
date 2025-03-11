import { Prisma } from '@prisma/client';

export type CompleteStep = Prisma.StepGetPayload<{
  include: {
    cards: { include: { attribute: true; keywords: true } };
    infographics: true;
    items: { include: { attribute: true } };
    smartListFilter: { include: { attributes: true } };
  };
}>;
