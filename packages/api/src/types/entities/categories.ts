import { Prisma } from '@prisma/client';

export type CompleteCategory = Prisma.CategoryGetPayload<{
  include: {
    steps: {
      include: {
        cards: { include: { attribute: true; keywords: true } };
        infographies: true;
        items: { include: { attribute: true } };
        smartList: { include: { attributes: true } };
      };
    };
  };
}>;
