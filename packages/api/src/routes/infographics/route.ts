import { infographicsController } from '@/controllers/infographics/controller.js';
import { Router } from 'express';

export const infographicsRouter = Router();

infographicsRouter.post('/', infographicsController.create);
infographicsRouter.put('/:id(\\d+)', infographicsController.update);
infographicsRouter.put('/bulk', infographicsController.updateBulk);
infographicsRouter.delete('/:id', infographicsController.deleteOne);
