import { infographiesController } from '@/controllers/infographies/controller.js';
import { Router } from 'express';

export const infographiesRouter = Router();

infographiesRouter.post('/', infographiesController.create);
infographiesRouter.put('/:id', infographiesController.update);
infographiesRouter.delete('/:id', infographiesController.deleteOne);
