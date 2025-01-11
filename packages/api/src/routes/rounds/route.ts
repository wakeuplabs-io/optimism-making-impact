import { roundsController } from '@/controllers/rounds.js';
import { Router } from 'express';

export const roundsRouter = Router();

roundsRouter.get('/', roundsController.getAll);
roundsRouter.post('/', roundsController.create);
roundsRouter.put('/:id', roundsController.update);
roundsRouter.delete('/:id', roundsController.deleteOne);
