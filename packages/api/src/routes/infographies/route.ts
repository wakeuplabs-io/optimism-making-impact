import { infographiesController } from '@/controllers/infographies/controller.js';
import { Router } from 'express';

// TODO: remove the folder, is just one file

export const infographiesRouter = Router();

infographiesRouter.post('/', infographiesController.create);
infographiesRouter.put('/:id(\\d+)', infographiesController.update);
infographiesRouter.put('/bulk', infographiesController.updateBulk);
infographiesRouter.delete('/:id', infographiesController.deleteOne);
