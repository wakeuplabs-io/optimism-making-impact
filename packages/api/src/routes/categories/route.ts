import { categoriesController } from '@/controllers/categories.js';
import { Router } from 'express';

export const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.delete('/:id', categoriesController.deleteOne);
