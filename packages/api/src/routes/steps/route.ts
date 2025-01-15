import { stepsController } from '@/controllers/steps/index.js';
import { Router } from 'express';

export const stepsRouter = Router();

stepsRouter.get('/:roundId', stepsController.getByRoundId);
stepsRouter.post('/', stepsController.create);
stepsRouter.put('/:id', stepsController.update);
stepsRouter.delete('/:id', stepsController.deleteOne);
