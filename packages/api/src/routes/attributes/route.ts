import { attributesController } from '@/controllers/attributes/controller.js';
import { Router } from 'express';

export const attributesRouter = Router();

attributesRouter.post('/', attributesController.create);
