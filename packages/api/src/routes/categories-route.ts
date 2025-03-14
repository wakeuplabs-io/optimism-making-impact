import { categoriesController } from '@/controllers/categories-controller.js';
import { Router } from 'express';

export const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:id', categoriesController.editOne);
categoriesRouter.delete('/:id', categoriesController.deleteOne);
