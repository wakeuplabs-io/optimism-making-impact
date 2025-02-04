import { smartListsController } from '@/controllers/smart-lists/controller.js';
import { Router } from 'express';

export const smartListsRouter = Router();

smartListsRouter.get('/by-category/:id', smartListsController.getByCategoryId);
