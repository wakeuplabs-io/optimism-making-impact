import { categoriesRouter } from '@/routes/categories/route.js';
import { roundsRouter } from '@/routes/rounds/route.js';
import { testRouter } from '@/routes/test/route.js';
import { Router } from 'express';

const router = Router();

router.use('/test', testRouter);
router.use('/rounds', roundsRouter);
router.use('/categories', categoriesRouter);

export default router;
