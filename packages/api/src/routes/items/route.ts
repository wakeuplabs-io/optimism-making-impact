import { itemsController } from '@/controllers/items/controller.js';
import { Router } from 'express';

// TODO: remove the folder, is just one file

export const itemsRouter = Router();

itemsRouter.post('/', itemsController.create);
itemsRouter.put('/:id', itemsController.update);
itemsRouter.delete('/:id', itemsController.deleteOne);
