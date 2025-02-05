import { keywordsController } from '@/controllers/keywords/controller.js';
import { Router } from 'express';

export const keywordsRouter = Router();

keywordsRouter.get('/:id', keywordsController.getByStepId);
keywordsRouter.delete('/:id', keywordsController.deleteOne);
