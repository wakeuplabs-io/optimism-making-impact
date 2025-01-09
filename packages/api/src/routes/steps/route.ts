import { stepsController } from '@/controllers/steps.js';
import { Router } from 'express';

export const stepsRouter = Router();

stepsRouter.get('/:roundId', stepsController.getOneById);
