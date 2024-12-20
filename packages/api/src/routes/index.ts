import { roundsRouter } from '@/routes/rounds/route.js';
import { testRouter } from '@/routes/test/route.js';
import { Router } from 'express';

const router = Router();

router.use('/test', testRouter);
router.use('/rounds', roundsRouter);

export default router;
