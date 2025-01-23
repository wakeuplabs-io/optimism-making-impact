import { attributesRouter } from '@/routes/attributes/route.js';
import { cardsRouter } from '@/routes/cards/route.js';
import { categoriesRouter } from '@/routes/categories/route.js';
import { infographiesRouter } from '@/routes/infographies/route.js';
import { roundsRouter } from '@/routes/rounds/route.js';
import { smartListsRouter } from '@/routes/smart-lists/route.js';
import { stepsRouter } from '@/routes/steps/route.js';
import { testRouter } from '@/routes/test/route.js';
import { Router } from 'express';

const router = Router();

router.use('/attributes', attributesRouter);
router.use('/cards', cardsRouter);
router.use('/categories', categoriesRouter);
router.use('/infographies', infographiesRouter);
router.use('/rounds', roundsRouter);
router.use('/smart-lists', smartListsRouter);
router.use('/steps', stepsRouter);

router.use('/test', testRouter);

export default router;
