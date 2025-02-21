import { cardsController } from '@/controllers/cards/controller.js';
import { Router } from 'express';

// TODO: remove the folder, is just one file

export const cardsRouter = Router();

cardsRouter.post('/', cardsController.create);
cardsRouter.put('/:id', cardsController.update);
cardsRouter.delete('/:id', cardsController.deleteOne);
