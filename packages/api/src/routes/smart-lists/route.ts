import { smartListFiltersController } from '@/controllers/smart-lists/controller.js';
import { Router } from 'express';

export const smartListFiltersRouter = Router();

smartListFiltersRouter.get('/by-category/:id', smartListFiltersController.getByCategoryId);
