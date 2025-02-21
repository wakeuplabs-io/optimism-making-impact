import { Prisma } from '@prisma/client';

// TODO: put in the prisma folder

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
