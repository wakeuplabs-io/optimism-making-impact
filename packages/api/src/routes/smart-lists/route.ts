import { smartListsController } from '@/controllers/smart-lists/controller.js';
import { Router } from 'express';

export const smartListsRouter = Router();

// TODO: remove the folder, is just one file

smartListsRouter.get('/by-category/:id', smartListsController.getByCategoryId);
