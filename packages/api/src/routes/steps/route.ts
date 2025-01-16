import { stepsController } from '@/controllers/steps/steps-controller.js';
import { Router } from 'express';

export const stepsRouter = Router();

stepsRouter.get('/', stepsController.getAll);
stepsRouter.post('/', stepsController.create);
stepsRouter.put('/:id', stepsController.update);
stepsRouter.delete('/:id', stepsController.deleteOne);
