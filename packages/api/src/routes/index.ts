import { authRouter } from './auth/route.js';
import { usersRouter } from './users/route.js';
import { attributesRouter } from '@/routes/attributes/route.js';
import { cardsRouter } from '@/routes/cards/route.js';
import { categoriesRouter } from '@/routes/categories/route.js';
import { infographicsRouter } from '@/routes/infographics/route.js';
import { itemsRouter } from '@/routes/items/route.js';
import { keywordsRouter } from '@/routes/keywords/route.js';
import { roundsRouter } from '@/routes/rounds/route.js';
import { smartListFiltersRouter } from '@/routes/smart-list-filters/route.js';
import { stepsRouter } from '@/routes/steps/route.js';
import { testRouter } from '@/routes/test/route.js';
import { Router } from 'express';

const router = Router();

router.use('/attributes', attributesRouter);
router.use('/cards', cardsRouter);
router.use('/categories', categoriesRouter);
router.use('/infographics', infographicsRouter);
router.use('/items', itemsRouter);
router.use('/keywords', keywordsRouter);
router.use('/rounds', roundsRouter);
router.use('/smart-list-filters', smartListFiltersRouter);
router.use('/steps', stepsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.use('/test', testRouter);

export default router;
