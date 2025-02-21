import { attributesController } from '@/controllers/attributes/controller.js';
import { Router } from 'express';

// TODO: remove the folder, is just one file

export const attributesRouter = Router();

attributesRouter.post('/', attributesController.create);
attributesRouter.put('/', attributesController.update);
attributesRouter.delete('/:id', attributesController.deleteOne);
