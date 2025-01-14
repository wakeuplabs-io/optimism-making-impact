import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        categories: true,
      },
    });

    apiResponse.success(res, { rounds });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.$transaction(async (prisma) => {
      const lastRound = await prisma.round.findFirst({
        orderBy: { createdAt: 'desc' },
        include: {
          categories: { include: { attributes: true } },
          steps: {
            include: {
              infographies: true,
              items: { include: { attribute: true } },
              cards: { include: { attribute: true, cardKeywords: { include: { keyword: true } } } },
            },
          },
        },
      });

      if (!lastRound) {
        const createdRound = await prisma.round.create({
          data: { name: 'Round 1', icon: '' },
        });

        apiResponse.success(res, { message: 'Round created successfully', round: createdRound });
        return;
      }

      const nextRoundNumber = lastRound.id + 1;
      const { categories, steps } = lastRound;

      // Step 1: Create Round with Basic Categories and Steps
      const newRound = await prisma.round.create({
        data: {
          name: `Round ${nextRoundNumber}`,
          icon: '',
          link1: lastRound.link1,
          link2: lastRound.link2,
          categories: {
            create: categories.map(({ name, icon }) => ({
              name,
              icon,
            })),
          },
          steps: {
            create: steps.map(({ title, icon, position, type }) => ({
              title,
              icon,
              position,
              type,
            })),
          },
        },
        include: {
          categories: true,
          steps: true,
        },
      });

      // Step 2: Update Categories with Attributes
      await Promise.all(
        categories.map(async (category, index) => {
          const newCategory = newRound.categories[index];
          await prisma.category.update({
            where: { id: newCategory.id },
            data: {
              attributes: {
                create: category.attributes.map(({ value }) => ({
                  value,
                })),
              },
            },
          });
        }),
      );

      // Step 3: Update Steps with Infographies, Items, and Cards
      await Promise.all(
        steps.map(async (step, index) => {
          const newStep = newRound.steps[index];
          await prisma.step.update({
            where: { id: newStep.id },
            data: {
              infographies: {
                create: step.infographies.map(({ markdown, image, position }) => ({
                  markdown,
                  image,
                  position,
                })),
              },
              items: {
                create: step.items.map(({ markdown, position, attribute }) => ({
                  markdown,
                  position,
                  attribute: {
                    connect: { id: attribute.id },
                  },
                })),
              },
              cards: {
                create: step.cards.map(({ title, markdown, position, strength, attribute, cardKeywords }) => ({
                  title,
                  markdown,
                  position,
                  strength,
                  attribute: {
                    connect: { id: attribute.id },
                  },
                  cardKeywords: {
                    create: cardKeywords.map(({ keyword }) => ({
                      keyword: {
                        connect: { id: keyword.id },
                      },
                    })),
                  },
                })),
              },
            },
          });
        }),
      );

      apiResponse.success(res, { message: 'Round created successfully', data: newRound }, 201);
    });
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { ...data } = req.body; // TODO: validate input

    const edited = await prisma.round.update({
      where: {
        id: Number(id),
      },
      data,
    });

    apiResponse.success(res, { message: 'Round edited successfully', data: edited }, 201);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // TODO: validate input

    const deleted = await prisma.round.delete({
      where: {
        id: Number(id),
      },
    });

    apiResponse.success(res, { message: 'Round deleted.', data: deleted }, 201);
  } catch (error) {
    next(error);
  }
}

export const roundsController = {
  getAll,
  create,
  update,
  deleteOne,
};
