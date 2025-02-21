import { stepsController } from '@/controllers/steps/steps-controller.js';
import { Router } from 'express';

export const stepsRouter = Router();

// TODO: remove the folder, is just one file

stepsRouter.get('/', stepsController.getAll);
stepsRouter.get('/:id', stepsController.getOne);
stepsRouter.post('/', stepsController.create);
stepsRouter.put('/:id', stepsController.update);
stepsRouter.delete('/:id', stepsController.deleteOne);
