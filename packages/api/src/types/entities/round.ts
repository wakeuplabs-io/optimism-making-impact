import { Prisma } from '@prisma/client';

export type CompleteRound = Prisma.RoundGetPayload<{
  include: {
    categories: {
      include: {
        steps: {
          include: {
            cards: { include: { attribute: true; keywords: true } };
            infographics: true;
            items: { include: { attribute: true } };
            smartListFilter: { include: { attributes: true } };
          };
        };
      };
    };
  };
}>;
